import { RECIPES_CATALOG } from "./defaultRecipes.js";
import { MistralService } from "./mistralService.js";
import { DriveService } from "./driveService.js";

export class AIPlannerService {
  /**
   * Calcule le coefficient de portions total pour le foyer
   */
  static calculateHouseholdServings(profile) {
    const adults = Math.max(1, profile?.adults || 2);
    const childrenAges = profile?.childrenAges || [];
    
    let childFactor = 0;
    childrenAges.forEach(age => {
      const a = parseInt(age, 10);
      if (isNaN(a) || a < 4) childFactor += 0.4;
      else if (a < 10) childFactor += 0.7;
      else childFactor += 1.0;
    });

    return parseFloat((adults + childFactor).toFixed(1));
  }

  /**
   * Filtre les recettes selon les régimes et aliments exclus
   */
  static filterRecipes(profile, mealType = null) {
    const diets = profile?.diets || [];
    const dislikes = (profile?.dislikedFoods || []).map(d => d.toLowerCase().trim());

    return RECIPES_CATALOG.filter(recipe => {
      if (mealType) {
        if (mealType === "lunch" || mealType === "dinner") {
          if (recipe.mealType !== "lunch" && recipe.mealType !== "dinner") return false;
        } else if (recipe.mealType !== mealType) {
          return false;
        }
      }

      // Vérifier les régimes stricts
      if (diets.includes("dietHalal") && !recipe.tags.includes("dietHalal")) return false;
      if (diets.includes("dietNoPork") && (recipe.tags.includes("pork") || recipe.ingredients.some(i => (i.name.fr || "").toLowerCase().includes("porc") || (i.name.fr || "").toLowerCase().includes("bacon") || (i.name.fr || "").toLowerCase().includes("jambon")))) return false;
      if (diets.includes("dietVegetarian") && !recipe.tags.includes("dietVegetarian") && !recipe.tags.includes("dietVegan")) return false;
      if (diets.includes("dietVegan") && !recipe.tags.includes("dietVegan")) return false;
      if (diets.includes("dietGlutenFree") && !recipe.tags.includes("dietGlutenFree")) return false;
      if (diets.includes("dietLactoseFree") && !recipe.tags.includes("dietLactoseFree") && !recipe.tags.includes("dietVegan")) return false;
      if (diets.includes("dietKeto") && !recipe.tags.includes("dietLowCarb") && !recipe.tags.includes("dietKeto")) return false;

      // Exclusions selon les curseurs de cuisines (niveau 0 = exclu)
      if (profile?.cuisines) {
        if (profile.cuisines.oriental === 0 && (recipe.tags.includes("oriental") || recipe.tags.includes("maghreb"))) return false;
        if (profile.cuisines.asian === 0 && (recipe.tags.includes("asian") || recipe.tags.includes("wok"))) return false;
        if (profile.cuisines.italian === 0 && recipe.tags.includes("italian")) return false;
        if (profile.cuisines.french === 0 && recipe.tags.includes("french")) return false;
        if (profile.cuisines.mexican === 0 && recipe.tags.includes("mexican")) return false;
        if (profile.cuisines.indian === 0 && recipe.tags.includes("indian")) return false;
        if (profile.cuisines.streetfood === 0 && recipe.tags.includes("streetfood")) return false;
      }

      // Préférences de saveur (sucré / salé) pour petit-déjeuner et goûter
      if (recipe.mealType === "breakfast" && profile?.breakfastFlavor && profile.breakfastFlavor !== "both") {
        const text = `${recipe.title?.fr || ""} ${recipe.title?.en || ""} ${recipe.tags?.join(" ") || ""}`.toLowerCase();
        const isSavory = (
          recipe.tags?.includes("flavorSavory") ||
          text.includes("œuf") || text.includes("oeuf") || text.includes("avocat") ||
          text.includes("omelette") || text.includes("fromage") || text.includes("saumon") ||
          text.includes("truite") || text.includes("shakshuka") || text.includes("bagel")
        );
        if (profile.breakfastFlavor === "sweet" && isSavory) return false;
        if (profile.breakfastFlavor === "savory" && !isSavory) return false;
      }

      if (recipe.mealType === "snack" && profile?.snackFlavor && profile.snackFlavor !== "both") {
        const text = `${recipe.title?.fr || ""} ${recipe.title?.en || ""} ${recipe.tags?.join(" ") || ""}`.toLowerCase();
        const isSavory = (
          recipe.tags?.includes("flavorSavory") ||
          text.includes("tzatziki") || text.includes("houmous") || text.includes("concombre") ||
          text.includes("carotte") || text.includes("fromage") || text.includes("crackers") ||
          text.includes("wrap")
        );
        if (profile.snackFlavor === "sweet" && isSavory) return false;
        if (profile.snackFlavor === "savory" && !isSavory) return false;
      }

      // Préférence Dîner Léger
      if (recipe.mealType === "dinner" && profile?.dinnerStyle === "light") {
        if (recipe.caloriesPerPerson && recipe.caloriesPerPerson > 460) return false;
      }

      // Vérifier les aliments exclus
      if (dislikes.length > 0) {
        const hasDisliked = recipe.ingredients.some(ing => {
          const names = [ing.name.fr, ing.name.en].join(" ").toLowerCase();
          return dislikes.some(d => d && names.includes(d));
        });
        if (hasDisliked) return false;
      }

      return true;
    });
  }

  /**
   * Vérifie et corrige automatiquement tout repas non conforme aux règles strictes de saveurs (Sucré / Salé)
   */
  static sanitizeMeal(meal, type, profile, servings = 2, fallbackIndex = 0) {
    if (!meal) return null;

    // 1. Validation Petit-Déjeuner
    if (type === "breakfast" && profile?.breakfastFlavor && profile.breakfastFlavor !== "both") {
      const titleStr = (typeof meal.title === "string" ? meal.title : (meal.title?.fr || meal.title?.en || "")).toLowerCase();
      const ingStr = (meal.ingredients || []).map(i => (typeof i.name === "string" ? i.name : (i.name?.fr || i.name?.en || "")).toLowerCase()).join(" ");
      const fullText = `${titleStr} ${ingStr} ${(meal.tags || []).join(" ")}`.toLowerCase();

      const hasSavoryKeywords = (
        fullText.includes("poulet") || fullText.includes("dinde") || fullText.includes("volaille") ||
        fullText.includes("viande") || fullText.includes("poisson") || fullText.includes("saumon") ||
        fullText.includes("thon") || fullText.includes("crevette") || fullText.includes("avocat") ||
        fullText.includes("benedict") || fullText.includes("bénédicte") || fullText.includes("omelette") ||
        fullText.includes("brouillé") || fullText.includes("poché") || fullText.includes("bacon") ||
        fullText.includes("jambon") || fullText.includes("fromage râpé") || fullText.includes("cheddar") ||
        fullText.includes("feta") || fullText.includes("mozzarella") || fullText.includes("poivron") ||
        fullText.includes("tomate") || fullText.includes("oignon") || fullText.includes("ail") ||
        fullText.includes("sel & poivre") || fullText.includes("épices") || fullText.includes("shakshuka")
      );

      // Si l'utilisateur voulait du sucré et que le plat généré est salé
      if (profile.breakfastFlavor === "sweet" && hasSavoryKeywords) {
        const sweetCatalog = this.filterRecipes(profile, "breakfast").filter(r => {
          const t = `${r.title?.fr || ""} ${r.title?.en || ""}`.toLowerCase();
          return !t.includes("avocat") && !t.includes("œuf") && !t.includes("oeuf") && !t.includes("omelette");
        });
        const pool = sweetCatalog.length > 0 ? sweetCatalog : RECIPES_CATALOG.filter(r => r.mealType === "breakfast" && r.id !== "b2");
        const replacement = pool[fallbackIndex % pool.length];
        return {
          ...replacement,
          id: `sweet_breakfast_${Date.now()}_${fallbackIndex}`,
          calculatedServings: servings
        };
      }

      // Si l'utilisateur voulait du salé et que le plat généré est sucré
      if (profile.breakfastFlavor === "savory" && !hasSavoryKeywords) {
        const savoryCatalog = this.filterRecipes(profile, "breakfast").filter(r => {
          const t = `${r.title?.fr || ""} ${r.title?.en || ""}`.toLowerCase();
          return t.includes("avocat") || t.includes("œuf") || t.includes("oeuf") || t.includes("omelette");
        });
        const pool = savoryCatalog.length > 0 ? savoryCatalog : RECIPES_CATALOG.filter(r => r.mealType === "breakfast" && r.id === "b2");
        const replacement = pool[fallbackIndex % pool.length];
        return {
          ...replacement,
          id: `savory_breakfast_${Date.now()}_${fallbackIndex}`,
          calculatedServings: servings
        };
      }
    }

    // 2. Validation Goûter
    if (type === "snack" && profile?.snackFlavor && profile.snackFlavor !== "both") {
      const titleStr = (typeof meal.title === "string" ? meal.title : (meal.title?.fr || meal.title?.en || "")).toLowerCase();
      const ingStr = (meal.ingredients || []).map(i => (typeof i.name === "string" ? i.name : (i.name?.fr || i.name?.en || "")).toLowerCase()).join(" ");
      const fullText = `${titleStr} ${ingStr}`.toLowerCase();

      const hasSavoryKeywords = (
        fullText.includes("tzatziki") || fullText.includes("houmous") || fullText.includes("hummus") ||
        fullText.includes("concombre") || fullText.includes("carotte") || fullText.includes("fromage") ||
        fullText.includes("crackers") || fullText.includes("wrap") || fullText.includes("avocat") ||
        fullText.includes("sel")
      );

      if (profile.snackFlavor === "sweet" && hasSavoryKeywords) {
        const sweetCatalog = this.filterRecipes(profile, "snack");
        const pool = sweetCatalog.length > 0 ? sweetCatalog : RECIPES_CATALOG.filter(r => r.mealType === "snack");
        const replacement = pool[fallbackIndex % pool.length];
        return {
          ...replacement,
          id: `sweet_snack_${Date.now()}_${fallbackIndex}`,
          calculatedServings: servings
        };
      }

      if (profile.snackFlavor === "savory" && !hasSavoryKeywords) {
        const savoryCatalog = this.filterRecipes(profile, "snack");
        const pool = savoryCatalog.length > 0 ? savoryCatalog : RECIPES_CATALOG.filter(r => r.mealType === "snack");
        const replacement = pool[fallbackIndex % pool.length];
        return {
          ...replacement,
          id: `savory_snack_${Date.now()}_${fallbackIndex}`,
          calculatedServings: servings
        };
      }
    }

    // 3. Validation Dîner Léger
    if (type === "dinner" && profile?.dinnerStyle === "light") {
      const titleStr = (typeof meal.title === "string" ? meal.title : (meal.title?.fr || meal.title?.en || "")).toLowerCase();
      const ingStr = (meal.ingredients || []).map(i => (typeof i.name === "string" ? i.name : (i.name?.fr || i.name?.en || "")).toLowerCase()).join(" ");
      const fullText = `${titleStr} ${ingStr}`.toLowerCase();

      const isHeavy = (
        meal.caloriesPerPerson > 500 ||
        fullText.includes("burger") || fullText.includes("frite") || fullText.includes("raclette") ||
        fullText.includes("tartiflette") || fullText.includes("fondue")
      );

      if (isHeavy) {
        const lightCatalog = this.filterRecipes(profile, "dinner").filter(r => (r.caloriesPerPerson || 400) <= 400);
        if (lightCatalog.length > 0) {
          const replacement = lightCatalog[fallbackIndex % lightCatalog.length];
          return {
            ...replacement,
            id: `light_dinner_${Date.now()}_${fallbackIndex}`,
            calculatedServings: servings
          };
        }
      }
    }

    return meal;
  }

  /**
   * Génère un planning complet (Mistral AI ou Local déterministe avec variété)
   */
  static async generateMealPlan(profile, durationWeeks = 1, aiConfig = null, lang = "fr") {
    const servings = this.calculateHouseholdServings(profile);
    const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    // 1. Tenter la génération avec Mistral AI si configuré
    if (aiConfig?.engine === "mistral" && aiConfig?.mistralApiKey) {
      try {
        const mistralResult = await MistralService.generateMealPlan({
          profile,
          durationWeeks,
          apiKey: aiConfig.mistralApiKey,
          model: aiConfig.mistralModel || "mistral-small-latest",
          lang
        });

        if (mistralResult?.days && Array.isArray(mistralResult.days)) {
          const activeMealTypes = profile?.mealTypes && profile.mealTypes.length > 0
            ? profile.mealTypes
            : ["breakfast", "lunch", "snack", "dinner"];

          const days = mistralResult.days.map((d, i) => {
            const weekIndex = Math.floor(i / 7) + 1;
            const dayIndexInWeek = i % 7;
            const dayKey = dayKeys[dayIndexInWeek];

            const formatMeal = (m, type) => {
              if (!activeMealTypes.includes(type) || !m) return null;
              return {
                id: `mistral_${type}_${i + 1}_${Date.now()}`,
                mealType: type,
                title: typeof m.title === "string" ? { fr: m.title, en: m.title, ar: m.title } : (m.title || { fr: "Plat" }),
                emoji: m.emoji || "🍲",
                prepTime: m.prepTime || 15,
                cookTime: m.cookTime || 20,
                difficulty: m.difficulty || "easy",
                caloriesPerPerson: m.caloriesPerPerson || 400,
                tags: profile?.diets || [],
                calculatedServings: servings,
                ingredients: (m.ingredients || []).map(ing => ({
                  name: typeof ing.name === "string" ? { fr: ing.name, en: ing.name, ar: ing.name } : (ing.name || { fr: "Ingrédient" }),
                  quantity: Number(ing.quantity) || 1,
                  unit: ing.unit || "portion",
                  dept: ing.dept || "deptProduce"
                })),
                instructions: m.instructions || { fr: ["Préparer les ingrédients", "Cuire et servir chaud."] }
              };
            };

            const rawB = formatMeal(d.meals?.breakfast, "breakfast");
            const rawL = formatMeal(d.meals?.lunch, "lunch");
            const rawS = formatMeal(d.meals?.snack, "snack");
            const rawD = formatMeal(d.meals?.dinner, "dinner");

            return {
              id: `day_${i + 1}`,
              dayNumber: i + 1,
              weekNumber: weekIndex,
              dayKey: dayKey,
              servings: servings,
              meals: {
                breakfast: this.sanitizeMeal(rawB, "breakfast", profile, servings, i),
                lunch: rawL,
                snack: this.sanitizeMeal(rawS, "snack", profile, servings, i),
                dinner: this.sanitizeMeal(rawD, "dinner", profile, servings, i)
              }
            };
          });

          const plan = {
            id: `plan_mistral_${Date.now()}`,
            createdAt: new Date().toISOString(),
            durationWeeks: durationWeeks,
            householdServings: servings,
            generatedBy: "mistral",
            days: days
          };

          const groceries = this.compileGroceries(plan);
          return { plan, groceries, error: null };
        }
      } catch (err) {
        console.warn("Échec Mistral AI:", err.message);
        // On retourne l'erreur pour que l'interface puisse notifier l'utilisateur
        const localFallback = this.generateLocalPlan(profile, durationWeeks, servings);
        return { ...localFallback, error: err.message };
      }
    }

    // 2. Génération locale avec mélange aléatoire (Variety)
    const localResult = this.generateLocalPlan(profile, durationWeeks, servings);
    return { ...localResult, error: null };
  }

  /**
   * Mélange équitable de Fisher-Yates
   */
  static shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * Trie et mélange un pool de recettes en favorisant les cuisines préférées de l'utilisateur
   */
  static getWeightedPool(recipesList, userCuisines) {
    if (!recipesList || recipesList.length === 0) return [];
    if (!userCuisines) return this.shuffle(recipesList);

    const tagMap = {
      oriental: ["oriental", "maghreb"],
      asian: ["asian", "wok"],
      italian: ["italian"],
      french: ["french"],
      mexican: ["mexican"],
      indian: ["indian"],
      streetfood: ["streetfood"]
    };

    const scored = recipesList.map(recipe => {
      let weight = 1;
      const rTags = recipe.tags || [];

      Object.entries(userCuisines).forEach(([cuisineKey, level]) => {
        const matchTags = tagMap[cuisineKey] || [cuisineKey];
        const matches = matchTags.some(t => rTags.includes(t));
        if (matches) {
          if (level === 3) weight += 15; // Favori / Prioritaire ⭐
          else if (level === 2) weight += 6;  // Souvent
          else if (level === 1) weight += 1;  // Un peu
        }
      });

      return { recipe, randomScore: Math.random() * weight };
    });

    scored.sort((a, b) => b.randomScore - a.randomScore);
    return scored.map(s => s.recipe);
  }

  /**
   * Générateur local avec distribution équilibrée, zéro doublon et variété maximale
   */
  static generateLocalPlan(profile, durationWeeks = 1, servings = 2) {
    const daysCount = durationWeeks * 7;
    const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const activeMealTypes = profile?.mealTypes && profile.mealTypes.length > 0
      ? profile.mealTypes
      : ["breakfast", "lunch", "snack", "dinner"];

    // 1. Récupération et filtrage des recettes
    const availableBreakfasts = this.filterRecipes(profile, "breakfast");
    const rawBreakfasts = availableBreakfasts.length > 0
      ? availableBreakfasts
      : RECIPES_CATALOG.filter(r => r.mealType === "breakfast");

    const availableSnacks = this.filterRecipes(profile, "snack");
    const rawSnacks = availableSnacks.length > 0
      ? availableSnacks
      : RECIPES_CATALOG.filter(r => r.mealType === "snack");

    const availableLunches = this.filterRecipes(profile, "lunch");
    const availableDinners = this.filterRecipes(profile, "dinner");
    const allFilteredMains = this.filterRecipes(profile).filter(r => r.mealType === "lunch" || r.mealType === "dinner");
    const fallbackMains = RECIPES_CATALOG.filter(r => r.mealType === "lunch" || r.mealType === "dinner");
    const mainsCatalog = allFilteredMains.length > 0 ? allFilteredMains : fallbackMains;

    // 2. Mélanges pondérés selon les curseurs de cuisines
    const userCuisines = profile?.cuisines;
    let breakfastPool = this.shuffle(rawBreakfasts);
    let snackPool = this.shuffle(rawSnacks);
    let lunchPool = this.getWeightedPool(availableLunches.length > 0 ? availableLunches : mainsCatalog, userCuisines);
    let dinnerPool = this.getWeightedPool(availableDinners.length > 0 ? availableDinners : mainsCatalog, userCuisines);
    let generalMainsPool = this.getWeightedPool(mainsCatalog, userCuisines);

    const usedMealIds = new Set();
    const days = [];

    const getNextUniqueMeal = (preferredPool, fallbackPool) => {
      // 1ère passe dans le pool préféré
      for (let i = 0; i < preferredPool.length; i++) {
        const candidate = preferredPool[i];
        if (!usedMealIds.has(candidate.id)) {
          usedMealIds.add(candidate.id);
          return candidate;
        }
      }
      // 2ème passe dans le pool de secours
      for (let i = 0; i < fallbackPool.length; i++) {
        const candidate = fallbackPool[i];
        if (!usedMealIds.has(candidate.id)) {
          usedMealIds.add(candidate.id);
          return candidate;
        }
      }
      // Si toutes les recettes ont été consommées (plans très longs), re-mélanger
      const fallback = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
      return fallback;
    };

    for (let i = 0; i < daysCount; i++) {
      const weekIndex = Math.floor(i / 7) + 1;
      const dayIndexInWeek = i % 7;
      const dayKey = dayKeys[dayIndexInWeek];

      // Réinitialiser les pools petits-déj / goûters au début de chaque semaine si nécessaire
      if (i % 7 === 0 && i > 0) {
        breakfastPool = this.shuffle(rawBreakfasts);
        snackPool = this.shuffle(rawSnacks);
      }

      let b = null;
      if (activeMealTypes.includes("breakfast")) {
        b = breakfastPool[i % breakfastPool.length];
      }

      let s = null;
      if (activeMealTypes.includes("snack")) {
        s = snackPool[i % snackPool.length];
      }

      let l = null;
      if (activeMealTypes.includes("lunch")) {
        l = getNextUniqueMeal(lunchPool, generalMainsPool);
      }

      let d = null;
      if (activeMealTypes.includes("dinner")) {
        d = getNextUniqueMeal(dinnerPool, generalMainsPool);
      }

      days.push({
        id: `day_${i + 1}`,
        dayNumber: i + 1,
        weekNumber: weekIndex,
        dayKey: dayKey,
        servings: servings,
        meals: {
          breakfast: b ? { ...b, calculatedServings: servings } : null,
          lunch: l ? { ...l, calculatedServings: servings } : null,
          dinner: d ? { ...d, calculatedServings: servings } : null,
          snack: s ? { ...s, calculatedServings: servings } : null
        }
      });
    }

    const plan = {
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
      durationWeeks: durationWeeks,
      householdServings: servings,
      generatedBy: "local",
      days: days
    };

    const groceries = this.compileGroceries(plan);
    return { plan, groceries };
  }

  /**
   * Normalise les unités culinaires courantes
   */
  static normalizeGroceryUnit(rawUnit) {
    if (!rawUnit) return "piece";
    const u = rawUnit.toLowerCase().trim().replace(/\.$/, "");
    if ([
      "piece", "pieces", "pièce", "pièces", "unite", "unites", "unité", "unités",
      "unit", "units", "pc", "pcs", "portion", "portions", "tranche", "tranches",
      "gousse", "gousses", "oeuf", "oeufs", "feuille", "feuilles", "brin", "brins",
      "botte", "bottes", "sachet", "sachets", "pot", "pots", "boite", "boites",
      "boîte", "boîtes", "pincee", "pincees", "pincée", "pincées"
    ].includes(u)) {
      return "piece";
    }
    if (["g", "gramme", "grammes", "gr", "grs"].includes(u)) return "g";
    if (["kg", "kilo", "kilos", "kilogramme", "kilogrammes"].includes(u)) return "kg";
    if (["ml", "millilitre", "millilitres"].includes(u)) return "ml";
    if (["cl", "centilitre", "centilitres"].includes(u)) return "cl";
    if (["l", "litre", "litres"].includes(u)) return "L";
    if (["c.à.s", "c.a.s", "cas", "cuillère à soupe", "cuillères à soupe", "cuillere a soupe", "cuilleres a soupe"].includes(u)) return "c.à.s";
    if (["c.à.c", "c.a.c", "cac", "cuillère à café", "cuillères à café", "cuillere a cafe", "cuilleres a cafe"].includes(u)) return "c.à.c";
    return u;
  }

  /**
   * Détermine la clé et le nom canoniques pour un ingrédient
   */
  static getCanonicalGrocery(rawName, rawUnit, rawDept) {
    const name = (rawName || "").trim();
    const unit = this.normalizeGroceryUnit(rawUnit);
    const dept = rawDept || "deptOther";

    const lower = name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // suppression des accents
      .replace(/œ/g, "oe")
      .trim();

    // ==================== 1. ÉPICERIE (deptPantry) ====================
    // Galettes de riz
    if (lower.includes("galette") && lower.includes("riz")) {
      return { canonKey: "canon_galettes_riz", name: { fr: "Galettes de riz soufflé", en: "Rice cakes", ar: "كعك الأرز" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }

    // Flocons d'avoine
    if (lower.includes("flocon") && lower.includes("avoine")) {
      return { canonKey: "canon_flocons_avoine", name: { fr: "Flocons d'avoine", en: "Rolled oats", ar: "رقائق الشوفان" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }

    // Riz
    if (lower.includes("arborio") || lower.includes("risotto")) {
      return { canonKey: "canon_riz_arborio", name: { fr: "Riz arborio (Risotto)", en: "Arborio rice", ar: "أرز أربوريو" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("riz a sushi") || lower.includes("riz rond japonais")) {
      return { canonKey: "canon_riz_sushi", name: { fr: "Riz à sushi", en: "Sushi rice", ar: "أرز السوشي" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("riz noir")) {
      return { canonKey: "canon_riz_noir", name: { fr: "Riz noir", en: "Black rice", ar: "أرز أسود" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("riz complet")) {
      return { canonKey: "canon_riz_complet", name: { fr: "Riz complet", en: "Brown rice", ar: "أرز بني" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("riz") && !lower.includes("galette") && !lower.includes("vermicelle") && !lower.includes("nouille")) {
      return { canonKey: "canon_riz_basmati", name: { fr: "Riz basmati", en: "Basmati rice", ar: "أرز بسمتي" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }

    // Pâtes & Nouilles
    if (lower.includes("nouilles de riz")) {
      return { canonKey: "canon_nouilles_riz", name: { fr: "Nouilles de riz", en: "Rice noodles", ar: "نودلز الأرز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("nouilles ramen") || lower.includes("nouilles udon") || lower.includes("nouilles chinoises")) {
      return { canonKey: "canon_nouilles_asiatiques", name: { fr: "Nouilles asiatiques", en: "Asian noodles", ar: "نودلز آسيوية" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("spaghetti") || lower.includes("tagliatelles") || lower.includes("penne") || lower.includes("lasagne") || lower.includes("cannelloni") || lower.includes("coquillettes") || lower.includes("pates compl") || lower === "pates" || lower === "pate") {
      return { canonKey: "canon_pates", name: { fr: "Pâtes", en: "Pasta", ar: "معكرونة" }, unit: "g", dept: "deptPantry", multiplier: unit === "piece" ? 50 : 1 };
    }
    if (lower.includes("gnocchi")) {
      return { canonKey: "canon_gnocchis", name: { fr: "Gnocchis à poêler", en: "Gnocchi", ar: "نيوكي" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("couscous") || lower.includes("semoule")) {
      return { canonKey: "canon_semoule_couscous", name: { fr: "Semoule de couscous", en: "Couscous semolina", ar: "كسكس" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("quinoa")) {
      return { canonKey: "canon_quinoa", name: { fr: "Quinoa", en: "Quinoa", ar: "كينوا" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Légumineuses
    if (lower.includes("pois chiche")) {
      return { canonKey: "canon_pois_chiches", name: { fr: "Pois chiches", en: "Chickpeas", ar: "حمص" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("lentille") && (lower.includes("corail") || lower.includes("rouge"))) {
      return { canonKey: "canon_lentilles_corail", name: { fr: "Lentilles corail", en: "Red lentils", ar: "عدس أحمر" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("lentille")) {
      return { canonKey: "canon_lentilles_vertes", name: { fr: "Lentilles vertes", en: "Green lentils", ar: "عدس أخضر" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("haricot") && lower.includes("rouge")) {
      return { canonKey: "canon_haricots_rouges", name: { fr: "Haricots rouges", en: "Kidney beans", ar: "فاصوليا حمراء" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("haricot") && lower.includes("noir")) {
      return { canonKey: "canon_haricots_noirs", name: { fr: "Haricots noirs", en: "Black beans", ar: "فاصوليا سوداء" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("haricot") && lower.includes("blanc")) {
      return { canonKey: "canon_haricots_blancs", name: { fr: "Haricots blancs", en: "White beans", ar: "فاصوليا بيضاء" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("mais") && !lower.includes("petale") && !lower.includes("farine") && !lower.includes("maizena")) {
      return { canonKey: "canon_mais_doux", name: { fr: "Maïs doux", en: "Sweet corn", ar: "ذرة حلوة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Oléagineux & Graines
    if (lower.includes("chia")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 15;
      else if (unit === "c.à.c") mult = 5;
      return { canonKey: "canon_graines_chia", name: { fr: "Graines de chia", en: "Chia seeds", ar: "بذور الشيا" }, unit: "g", dept: "deptPantry", multiplier: mult };
    }
    if (lower.includes("graine") && lower.includes("courge")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 15;
      return { canonKey: "canon_graines_courge", name: { fr: "Graines de courge", en: "Pumpkin seeds", ar: "بذور اليقطين" }, unit: "g", dept: "deptPantry", multiplier: mult };
    }
    if (lower.includes("sesame") && (lower.includes("graine") || lower.includes("tahini") || lower.includes("pate de sesame") || lower === "sesame")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 15;
      else if (unit === "c.à.c") mult = 5;
      return { canonKey: "canon_graines_sesame", name: { fr: "Graines de sésame", en: "Sesame seeds", ar: "سمسم" }, unit: "g", dept: "deptPantry", multiplier: mult };
    }
    if (lower.includes("amande") && (lower.includes("poudre") || lower.includes("effilee"))) {
      return { canonKey: "canon_poudre_amandes", name: { fr: "Poudre d'amandes", en: "Almond powder", ar: "مسحوق اللوز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("amande") && !lower.includes("lait") && !lower.includes("beurre") && !lower.includes("puree")) {
      return { canonKey: "canon_amandes", name: { fr: "Amandes entières", en: "Almonds", ar: "لوز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("cacahuete") && !lower.includes("beurre") && !lower.includes("sauce")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 15;
      return { canonKey: "canon_cacahuetes", name: { fr: "Cacahuètes non salées", en: "Peanuts", ar: "فول سوداني" }, unit: "g", dept: "deptPantry", multiplier: mult };
    }
    if (lower.includes("beurre de cacahuete")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 20;
      return { canonKey: "canon_beurre_cacahuete", name: { fr: "Beurre de cacahuète", en: "Peanut butter", ar: "زبدة الفول السوداني" }, unit: "g", dept: "deptPantry", multiplier: mult };
    }
    if (lower.includes("noisette")) {
      return { canonKey: "canon_noisettes", name: { fr: "Noisettes", en: "Hazelnuts", ar: "بندق" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("noix") && !lower.includes("coco") && !lower.includes("muscade") && !lower.includes("pecan")) {
      return { canonKey: "canon_noix", name: { fr: "Cerneaux de noix", en: "Walnuts", ar: "جوز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("noix de coco") || lower.includes("coco rapee")) {
      return { canonKey: "canon_coco_rapee", name: { fr: "Noix de coco râpée", en: "Grated coconut", ar: "جوز هند مبشور" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("pignon")) {
      return { canonKey: "canon_pignons", name: { fr: "Pignons de pin", en: "Pine nuts", ar: "صنوبر" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Sucres & Sucrants & Cacao
    if (lower.includes("miel")) {
      return { canonKey: "canon_miel", name: { fr: "Miel liquide", en: "Honey", ar: "عسل" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 20 : (unit === "c.à.c" ? 7 : 1) };
    }
    if (lower.includes("sirop d'erable") || lower.includes("sirop erable")) {
      return { canonKey: "canon_sirop_erable", name: { fr: "Sirop d'érable", en: "Maple syrup", ar: "شراب القيقب" }, unit: "ml", dept: "deptPantry", multiplier: unit === "c.à.s" ? 15 : 1 };
    }
    if (lower.includes("sirop d'agave") || lower.includes("sirop agave")) {
      return { canonKey: "canon_sirop_agave", name: { fr: "Sirop d'agave", en: "Agave syrup", ar: "شراب الصبار" }, unit: "ml", dept: "deptPantry", multiplier: unit === "c.à.s" ? 15 : 1 };
    }
    if (lower.includes("cacao")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 10;
      else if (unit === "c.à.c") mult = 5;
      return { canonKey: "canon_cacao_poudre", name: { fr: "Cacao en poudre non sucré", en: "Unsweetened cocoa powder", ar: "كاكاو خام" }, unit: "g", dept: "deptPantry", multiplier: mult };
    }
    if (lower.includes("chocolat noir") || lower.includes("pepites de chocolat")) {
      return { canonKey: "canon_chocolat_noir", name: { fr: "Chocolat noir 70%", en: "Dark chocolate 70%", ar: "شوكولاتة داكنة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("granola")) {
      return { canonKey: "canon_granola", name: { fr: "Granola croustillant", en: "Granola", ar: "جرانولا" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Sauces & Condiments d'épicerie
    if (lower.includes("sauce soja")) {
      let mult = 1;
      if (unit === "c.à.s") mult = 15;
      else if (unit === "c.à.c") mult = 5;
      const isSucree = lower.includes("sucre");
      return {
        canonKey: isSucree ? "canon_sauce_soja_sucree" : "canon_sauce_soja_salee",
        name: { fr: isSucree ? "Sauce soja sucrée" : "Sauce soja salée", en: isSucree ? "Sweet soy sauce" : "Soy sauce", ar: isSucree ? "صلصة صويا حلوة" : "صلصة صويا" },
        unit: "ml",
        dept: "deptPantry",
        multiplier: mult
      };
    }
    if (lower.includes("moutarde")) {
      return { canonKey: "canon_moutarde", name: { fr: "Moutarde de Dijon", en: "Dijon mustard", ar: "خردل ديجون" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("mayonnaise") || lower === "mayo") {
      return { canonKey: "canon_mayo", name: { fr: "Mayonnaise", en: "Mayonnaise", ar: "مايونيز" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("lait de coco") || lower.includes("creme de coco")) {
      return { canonKey: "canon_lait_coco", name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, unit: "ml", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("bouillon") && (lower.includes("volaille") || lower.includes("poulet"))) {
      return { canonKey: "canon_bouillon_volaille", name: { fr: "Bouillon de volaille", en: "Chicken broth", ar: "مرق دجاج" }, unit: "ml", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("bouillon")) {
      return { canonKey: "canon_bouillon_legumes", name: { fr: "Bouillon de légumes", en: "Vegetable broth", ar: "مرق خضار" }, unit: "ml", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("pesto")) {
      return { canonKey: "canon_pesto", name: { fr: "Pesto vert au basilic", en: "Basil pesto", ar: "بيستو ريحان" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("chapelure")) {
      return { canonKey: "canon_chapelure", name: { fr: "Chapelure", en: "Breadcrumbs", ar: "بقسماط" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("vinaigre de cidre")) {
      return { canonKey: "canon_vinaigre_cidre", name: { fr: "Vinaigre de cidre", en: "Apple cider vinegar", ar: "خل التفاح" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("vinaigre balsamique")) {
      return { canonKey: "canon_vinaigre_balsamique", name: { fr: "Vinaigre balsamique", en: "Balsamic vinegar", ar: "خل بلسمي" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("huile de sesame")) {
      return { canonKey: "canon_huile_sesame", name: { fr: "Huile de sésame", en: "Sesame oil", ar: "زيت سمسم" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }

    // ==================== 2. ÉPICES & CONDIMENTS (deptSpices) ====================
    if (lower.includes("cumin")) {
      return { canonKey: "canon_cumin", name: { fr: "Cumin moulu", en: "Ground cumin", ar: "كمون مطحون" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("paprika") && lower.includes("fume")) {
      return { canonKey: "canon_paprika_fume", name: { fr: "Paprika fumé", en: "Smoked paprika", ar: "بابريكا مدخنة" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("paprika")) {
      return { canonKey: "canon_paprika_doux", name: { fr: "Paprika doux", en: "Sweet paprika", ar: "بابريكا حلوة" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("curcuma")) {
      return { canonKey: "canon_curcuma", name: { fr: "Curcuma moulu", en: "Turmeric", ar: "كركم" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("cannelle")) {
      return { canonKey: "canon_cannelle", name: { fr: "Cannelle moulue", en: "Cinnamon", ar: "قرفة" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
    }
    if (lower.includes("gingembre") && !lower.includes("frais")) {
      return { canonKey: "canon_gingembre_moulu", name: { fr: "Gingembre moulu", en: "Ground ginger", ar: "زنجبيل مطحون" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
    }
    if (lower.includes("curry") && (lower.includes("rouge") || lower.includes("vert") || lower.includes("pate"))) {
      const isRouge = lower.includes("rouge");
      return {
        canonKey: isRouge ? "canon_curry_rouge" : "canon_curry_vert",
        name: { fr: isRouge ? "Pâte de curry rouge thaï" : "Pâte de curry vert thaï", en: isRouge ? "Red curry paste" : "Green curry paste", ar: isRouge ? "معجون كاري أحمر" : "معجون كاري أخضر" },
        unit: "c.à.s",
        dept: "deptSpices",
        multiplier: 1
      };
    }
    if (lower.includes("curry")) {
      return { canonKey: "canon_curry_doux", name: { fr: "Curry doux en poudre", en: "Curry powder", ar: "كاري ناعم" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("garam masala")) {
      return { canonKey: "canon_garam_masala", name: { fr: "Garam Masala", en: "Garam Masala", ar: "غارام ماسالا" }, unit: "c.à.s", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("ras el hanout") || lower.includes("epices a couscous") || lower.includes("epice couscous")) {
      return { canonKey: "canon_ras_el_hanout", name: { fr: "Ras el Hanout", en: "Ras el Hanout", ar: "رأس الحانوت" }, unit: "c.à.s", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("mexicain") || lower.includes("fajita") || lower.includes("tacos") || lower.includes("tex-mex") || lower.includes("chili")) {
      return { canonKey: "canon_epices_mexicaines", name: { fr: "Épices mexicaines (Fajitas / Chili)", en: "Mexican spice mix", ar: "بهارات مكسيكية" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("herbes de provence") || lower === "herbes") {
      return { canonKey: "canon_herbes_provence", name: { fr: "Herbes de Provence", en: "Herbes de Provence", ar: "أعشاب بروفانس" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("origan")) {
      return { canonKey: "canon_origan", name: { fr: "Origan séché", en: "Dried oregano", ar: "زعتر مجفف" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("thym") && !lower.includes("frais")) {
      return { canonKey: "canon_thym_seche", name: { fr: "Thym séché", en: "Dried thyme", ar: "زعتر بري مجفف" }, unit: "c.à.c", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("muscade")) {
      return { canonKey: "canon_muscade", name: { fr: "Noix de muscade", en: "Nutmeg", ar: "جوزة الطيب" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("piment d'espelette")) {
      return { canonKey: "canon_piment_espelette", name: { fr: "Piment d'Espelette AOP", en: "Espelette pepper", ar: "فلفل إسبليت" }, unit: "c.à.c", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("piment") && (lower.includes("doux") || lower.includes("flocon") || lower.includes("harissa"))) {
      return { canonKey: "canon_piment_doux", name: { fr: "Piment doux", en: "Chili powder", ar: "فلفل حار" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }

    // ==================== 3. TOUS LES AUTRES BASIQUES (Viandes, Laitiers, Primeur, etc.) ====================
    // ŒUFS
    if (!lower.includes("nouille") && !lower.includes("pate") && !lower.includes("biscuit") && (
      /\b(oeufs?|blancs?\s+d'oeufs?|jaunes?\s+d'oeufs?)\b/.test(lower) || lower.startsWith("oeuf")
    )) {
      let mult = 1;
      if (unit === "g") mult = 0.02;
      return { canonKey: "canon_oeufs", name: { fr: "Œufs", en: "Eggs", ar: "بيض" }, unit: "", dept: "deptDairy", multiplier: mult };
    }

    // BŒUF HACHÉ
    if (/\b(boeuf\s+hache|steaks?\s+haches?|viande\s+hachee)\b/.test(lower) || (lower.includes("boeuf") && lower.includes("hache"))) {
      let mult = 1;
      if (unit === "kg") mult = 1000;
      else if (unit === "piece") mult = 125;
      return { canonKey: "canon_boeuf_hache", name: { fr: "Bœuf haché", en: "Minced beef", ar: "لحم مفروم" }, unit: "g", dept: "deptMeat", multiplier: mult };
    }

    // BLANCS DE POULET
    if (/\b(blancs?|filets?|escalopes?)\s+de\s+poulet\b/.test(lower) || lower === "poulet" || lower === "filets de poulet") {
      let mult = 1;
      if (unit === "kg") mult = 1000;
      return { canonKey: "canon_poulet_filet", name: { fr: "Blancs de poulet", en: "Chicken breast", ar: "صدور دجاج" }, unit: unit === "piece" ? "" : "g", dept: "deptMeat", multiplier: mult };
    }

    // AIL & OIGNON
    if (/\b(ail|gousses?\s+d'ail)\b/.test(lower)) {
      return { canonKey: "canon_ail", name: { fr: "Ail", en: "Garlic", ar: "ثوم" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (/\b(oignons?|oignons?\s+jaunes?)\b/.test(lower) && !lower.includes("nouveau") && !lower.includes("rouge") && !lower.includes("fume") && !lower.includes("frit")) {
      return { canonKey: "canon_oignon", name: { fr: "Oignon", en: "Onion", ar: "بصل" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }

    // HUILE D'OLIVE & BEURRE & CRÈME & LAIT & COULIS
    if (lower.includes("huile d'olive") || lower.includes("huile olive")) {
      return { canonKey: "canon_huile_olive", name: { fr: "Huile d'olive", en: "Olive oil", ar: "زيت زيتون" }, unit: unit === "c.à.s" || unit === "c.à.c" ? "c.à.s" : (unit === "L" ? "L" : "ml"), dept: "deptPantry", multiplier: 1 };
    }
    if (/\bbeurre\b/.test(lower) && !lower.includes("cacahuete") && !lower.includes("amande")) {
      return { canonKey: "canon_beurre", name: { fr: "Beurre", en: "Butter", ar: "زبدة" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("creme fraiche") || lower.includes("creme liquide") || lower.includes("creme entiere") || lower.includes("creme fleurette")) {
      return { canonKey: "canon_creme_fraiche", name: { fr: "Crème fraîche liquide", en: "Heavy cream", ar: "كريمة طازجة" }, unit: unit === "c.à.s" ? "c.à.s" : (unit === "L" ? "L" : "ml"), dept: "deptDairy", multiplier: 1 };
    }
    if (/\blait\b/.test(lower) && !lower.includes("amande") && !lower.includes("coco") && !lower.includes("avoine") && !lower.includes("soja")) {
      return { canonKey: "canon_lait", name: { fr: "Lait demi-écrémé", en: "Semi-skimmed milk", ar: "حليب نصف دسم" }, unit: unit === "L" ? "L" : "ml", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("coulis de tomate") || lower.includes("pulpe de tomate") || lower.includes("sauce tomate") || lower.includes("tomates concassees")) {
      return { canonKey: "canon_coulis_tomate", name: { fr: "Coulis de tomate", en: "Tomato coulis", ar: "صلصة طماطم" }, unit: unit === "g" ? "g" : "ml", dept: "deptPantry", multiplier: 1 };
    }

    // FROMAGES
    if (lower.includes("parmesan") || lower.includes("parmigiano")) {
      return { canonKey: "canon_parmesan", name: { fr: "Parmesan", en: "Parmesan cheese", ar: "جبن بارميزان" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("mozzarella") || lower.includes("mozza")) {
      return { canonKey: "canon_mozzarella", name: { fr: "Mozzarella", en: "Mozzarella cheese", ar: "جبن موزاريلا" }, unit: unit === "piece" ? "" : "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("feta")) {
      return { canonKey: "canon_feta", name: { fr: "Feta", en: "Feta cheese", ar: "جبن فيتا" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }

    // POISSONS
    if (lower.includes("thon") && (lower.includes("naturel") || lower.includes("boite") || lower.includes("egoutte") || lower === "thon")) {
      return { canonKey: "canon_thon", name: { fr: "Thon au naturel", en: "Canned tuna", ar: "تونة معلبة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("saumon") && (lower.includes("pave") || lower.includes("filet") || lower === "saumon frais")) {
      return { canonKey: "canon_saumon", name: { fr: "Pavé de saumon frais", en: "Salmon fillet", ar: "سلمون طازج" }, unit: unit === "piece" ? "" : "g", dept: "deptMeat", multiplier: 1 };
    }
    if (lower.includes("crevette")) {
      return { canonKey: "canon_crevettes", name: { fr: "Crevettes décortiquées", en: "Shrimp", ar: "جمبري" }, unit: "g", dept: "deptMeat", multiplier: 1 };
    }

    // LÉGUMES & FRUITS
    if (/\bconcombres?\b/.test(lower) && !lower.includes("tzatziki")) {
      let mult = 1;
      if (unit === "g") mult = 0.005;
      return { canonKey: "canon_concombre", name: { fr: "Concombre", en: "Cucumber", ar: "خيار" }, unit: "", dept: "deptProduce", multiplier: mult };
    }
    if (/\bcourgettes?\b/.test(lower)) {
      let mult = 1;
      if (unit === "g") mult = 0.005;
      return { canonKey: "canon_courgette", name: { fr: "Courgette", en: "Zucchini", ar: "كوسة" }, unit: "", dept: "deptProduce", multiplier: mult };
    }
    if (/\baubergines?\b/.test(lower)) {
      let mult = 1;
      if (unit === "g") mult = 0.004;
      return { canonKey: "canon_aubergine", name: { fr: "Aubergine", en: "Eggplant", ar: "باذنجان" }, unit: "", dept: "deptProduce", multiplier: mult };
    }
    if (/\bpoivrons?\b/.test(lower)) {
      let mult = 1;
      if (unit === "g") mult = 0.007;
      return { canonKey: "canon_poivron", name: { fr: "Poivron", en: "Bell pepper", ar: "فلفل حلو" }, unit: "", dept: "deptProduce", multiplier: mult };
    }
    if (lower.includes("tomate cerise") || lower.includes("tomates cerises")) {
      return { canonKey: "canon_tomates_cerises", name: { fr: "Tomates cerises", en: "Cherry tomatoes", ar: "طماطم كرزية" }, unit: "g", dept: "deptProduce", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (/\btomates?\b/.test(lower) && !lower.includes("sauce") && !lower.includes("coulis") && !lower.includes("pulpe") && !lower.includes("sechee") && !lower.includes("sechees")) {
      let mult = 1;
      if (unit === "piece") mult = 150;
      return { canonKey: "canon_tomates", name: { fr: "Tomates fraîches", en: "Tomatoes", ar: "طماطم طازجة" }, unit: "g", dept: "deptProduce", multiplier: mult };
    }
    if (/\bcarottes?\b/.test(lower)) {
      let mult = 1;
      if (unit === "piece") mult = 100;
      return { canonKey: "canon_carottes", name: { fr: "Carottes", en: "Carrots", ar: "جزر" }, unit: "g", dept: "deptProduce", multiplier: mult };
    }
    if (/\bavocats?\b/.test(lower) && !lower.includes("guacamole")) {
      return { canonKey: "canon_avocat", name: { fr: "Avocat", en: "Avocado", ar: "أفوكادو" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (/\bcitrons?\b/.test(lower) && !lower.includes("vert") && !lower.includes("combava")) {
      return { canonKey: "canon_citron", name: { fr: "Citron jaune", en: "Lemon", ar: "ليمون" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("citron vert") || lower.includes("lime")) {
      return { canonKey: "canon_citron_vert", name: { fr: "Citron vert", en: "Lime", ar: "ليمون أخضر" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("champignon")) {
      return { canonKey: "canon_champignons", name: { fr: "Champignons de Paris", en: "Mushrooms", ar: "فطر" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("epinard")) {
      return { canonKey: "canon_epinards", name: { fr: "Jeunes pousses d'épinards", en: "Baby spinach", ar: "سبانخ" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("salade romaine") || lower.includes("salade verte") || lower.includes("batavia") || lower.includes("laitue")) {
      return { canonKey: "canon_salade_verte", name: { fr: "Salade verte", en: "Lettuce", ar: "خس" }, unit: unit === "piece" ? "" : "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("pomme de terre") || lower.includes("pommes de terre") || (lower.includes("patate") && !lower.includes("douce"))) {
      return { canonKey: "canon_pommes_de_terre", name: { fr: "Pommes de terre", en: "Potatoes", ar: "بطاطس" }, unit: unit === "kg" ? "kg" : "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("patate douce") || lower.includes("patates douces")) {
      return { canonKey: "canon_patate_douce", name: { fr: "Patate douce", en: "Sweet potato", ar: "بطاطا حلوة" }, unit: unit === "piece" ? "" : "g", dept: "deptProduce", multiplier: 1 };
    }
    if (/\bbananes?\b/.test(lower)) {
      return { canonKey: "canon_banane", name: { fr: "Banane", en: "Banana", ar: "موز" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (/\bpommes?\b/.test(lower) && !lower.includes("terre") && !lower.includes("pin") && !lower.includes("compote")) {
      return { canonKey: "canon_pomme_fruit", name: { fr: "Pomme", en: "Apple", ar: "تفاح" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }

    // SEL & POIVRE & FARINE & PAIN
    if (lower === "sel" || lower.startsWith("sel ") || lower === "sel fin" || lower === "sel poivre" || lower === "fleur de sel") {
      return { canonKey: "canon_sel", name: { fr: "Sel", en: "Salt", ar: "ملح" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
    if (lower === "poivre" || lower.startsWith("poivre ") || lower === "poivre noir" || lower === "poivre du moulin") {
      return { canonKey: "canon_poivre", name: { fr: "Poivre noir", en: "Black pepper", ar: "فلفل أسود" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("farine")) {
      return { canonKey: "canon_farine", name: { fr: "Farine de blé", en: "Wheat flour", ar: "دقيق قمح" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("pain de mie") || lower.includes("pain complet")) {
      return { canonKey: "canon_pain_complet", name: { fr: "Pain complet", en: "Whole wheat bread", ar: "خبز كامل" }, unit: unit === "piece" ? "" : unit, dept: "deptBakery", multiplier: 1 };
    }

    // Fallback générique
    const cleanName = DriveService.cleanSearchQuery(name);
    const cap = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    const canonKey = lower.replace(/s\b/g, "").replace(/[^a-z0-9]/g, "_") + "_" + unit;

    return { canonKey, name: { fr: cap, en: cap, ar: cap }, unit: unit === "piece" ? "" : unit, dept, multiplier: 1 };
  }

  /**
   * Compile et consolide la liste des courses par rayon et ingrédients unifiés
   */
  static compileGroceries(plan) {
    if (!plan || !plan.days) return [];
    const itemsMap = {};

    plan.days.forEach(day => {
      Object.values(day.meals).forEach(meal => {
        if (!meal || !meal.ingredients) return;
        const factor = (meal.calculatedServings || 2) / 2;

        meal.ingredients.forEach(ing => {
          const rawName = typeof ing.name === "object" ? ing.name.fr : ing.name;
          if (!rawName) return;

          // 1. Retirer le contenu des parenthèses
          let s = rawName.trim().replace(/\(.*?\)/g, "").trim();

          // 2. Nettoyer les descriptions d'états combinées (ex: 'cuit et refroidi', 'égoutté et séché')
          s = s.replace(/\b(cuit|cuits|cuite|cuites|egoutte|egouttes|egouttee|egouttees|égoutté|égouttés|égouttée|égouttées|emonde|emondes|emondee|emondees|émondé|émondés|émondée|émondées|rince|rinces|rincee|rincees|rincé|rincés|rincée|rincées|pele|peles|pelee|pelees|pelé|pelés|pelée|pelées|lave|laves|lavee|lavees|lavé|lavés|lavée|lavées)\s+et\s+(refroidi|refroidis|refroidie|refroidies|seche|seches|sechee|sechees|séché|séchés|séchée|séchées|dore|dores|doree|dorees|doré|dorés|dorée|dorées|coupe|coupes|coupee|coupees|coupé|coupés|coupée|coupées|emince|eminces|emincee|emincees|émincé|émincés|émincée|émincées)\b/gi, "$1");

          // 3. Découper sur &, +, virgule
          let parts = s.split(/\s*(?:&|\+|,)\s*/i)
            .map(p => p.trim())
            .filter(p => p.length > 0 && !/^(ou|ou bien|\/)$/i.test(p));

          // 4. Traiter les cas spéciaux comme 'sel et poivre'
          const expanded = [];
          parts.forEach(p => {
            if (/^sel\s+et\s+poivre$/i.test(p)) {
              expanded.push("Sel", "Poivre");
            } else {
              expanded.push(p);
            }
          });

          const subItems = expanded.length > 0 ? expanded : [rawName];

          subItems.forEach(partName => {
            const canon = this.getCanonicalGrocery(partName, ing.unit, ing.dept);
            const qty = ((Number(ing.quantity) || 1) * factor) * canon.multiplier;

            if (!itemsMap[canon.canonKey]) {
              itemsMap[canon.canonKey] = {
                id: `item_${Math.random().toString(36).substr(2, 9)}`,
                name: canon.name,
                totalQuantity: qty,
                unit: canon.unit,
                dept: canon.dept,
                checked: false
              };
            } else {
              itemsMap[canon.canonKey].totalQuantity += qty;
            }
          });
        });
      });
    });

    const result = Object.values(itemsMap).map(item => {
      let rounded = item.totalQuantity;
      if (item.unit === "g" || item.unit === "ml") {
        if (item.totalQuantity < 10 && item.totalQuantity > 0) {
          rounded = Math.ceil(item.totalQuantity);
        } else {
          rounded = Math.round(item.totalQuantity / 10) * 10;
        }
      } else {
        rounded = Math.round(item.totalQuantity * 10) / 10;
        if (rounded === 0 && item.totalQuantity > 0) {
          rounded = Math.round(item.totalQuantity * 100) / 100;
        }
      }
      return {
        ...item,
        totalQuantity: Math.max(0.1, rounded)
      };
    });

    return result.sort((a, b) => (a.dept || "").localeCompare(b.dept || ""));
  }

  /**
   * Remplacement d'un seul repas dans un planning existant
   */
  static async swapMeal(currentMealId, mealType, profile, currentMeal = null, aiConfig = null, lang = "fr") {
    const servings = this.calculateHouseholdServings(profile);

    // Si mode Mistral AI activé
    if (aiConfig?.engine === "mistral" && aiConfig?.mistralApiKey) {
      try {
        const generated = await MistralService.swapSingleMeal({
          currentMeal,
          mealType,
          profile,
          apiKey: aiConfig.mistralApiKey,
          model: aiConfig.mistralModel || "mistral-small-latest",
          lang
        });

        if (generated) {
          const rawSwap = {
            id: `mistral_swap_${Date.now()}`,
            mealType: mealType,
            title: typeof generated.title === "string" ? { fr: generated.title, en: generated.title, ar: generated.title } : (generated.title || { fr: "Nouveau plat" }),
            emoji: generated.emoji || "🍲",
            prepTime: generated.prepTime || 15,
            cookTime: generated.cookTime || 20,
            difficulty: generated.difficulty || "easy",
            caloriesPerPerson: generated.caloriesPerPerson || 400,
            tags: profile?.diets || [],
            calculatedServings: servings,
            ingredients: (generated.ingredients || []).map(ing => ({
              name: typeof ing.name === "string" ? { fr: ing.name, en: ing.name, ar: ing.name } : (ing.name || { fr: "Ingrédient" }),
              quantity: Number(ing.quantity) || 1,
              unit: ing.unit || "portion",
              dept: ing.dept || "deptProduce"
            })),
            instructions: generated.instructions || { fr: ["Préparer et déguster."] }
          };
          return this.sanitizeMeal(rawSwap, mealType, profile, servings, Math.floor(Math.random() * 5));
        }
      } catch (err) {
        console.warn("Échec du swap Mistral AI, repli sur local:", err.message);
      }
    }

    // Fallback local avec choix aléatoire parmi les autres recettes
    const candidates = this.filterRecipes(profile, mealType).filter(r => r.id !== currentMealId);
    if (candidates.length === 0) {
      const all = RECIPES_CATALOG.filter(r => r.mealType === mealType && r.id !== currentMealId);
      return all.length > 0 ? all[Math.floor(Math.random() * all.length)] : RECIPES_CATALOG[0];
    }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }

  /**
   * Génération de recette Anti-Gaspillage (Vide-Frigo)
   */
  static async generateFridgeRecipe(ingredients = [], mealType = "lunch", profile = null, aiConfig = null, lang = "fr") {
    const servings = this.calculateHouseholdServings(profile);

    // 1. Tenter avec Mistral AI
    if (aiConfig?.engine === "mistral" && aiConfig?.mistralApiKey) {
      try {
        const generated = await MistralService.generateFridgeRecipe({
          ingredients,
          mealType,
          profile,
          apiKey: aiConfig.mistralApiKey,
          model: aiConfig.mistralModel || "mistral-small-latest",
          lang
        });

        if (generated) {
          return {
            id: `fridge_mistral_${Date.now()}`,
            mealType: mealType,
            title: typeof generated.title === "string" ? { fr: generated.title, en: generated.title, ar: generated.title } : (generated.title || { fr: "Plat Anti-Gaspi" }),
            emoji: generated.emoji || "🍳",
            prepTime: generated.prepTime || 15,
            cookTime: generated.cookTime || 15,
            difficulty: generated.difficulty || "easy",
            caloriesPerPerson: generated.caloriesPerPerson || 420,
            tags: profile?.diets || [],
            calculatedServings: servings,
            ingredients: (generated.ingredients || []).map(ing => ({
              name: typeof ing.name === "string" ? { fr: ing.name, en: ing.name, ar: ing.name } : (ing.name || { fr: "Ingrédient" }),
              quantity: Number(ing.quantity) || 1,
              unit: ing.unit || "portion",
              dept: ing.dept || "deptProduce"
            })),
            instructions: generated.instructions || { fr: ["Préparer et cuisiner avec vos restes."] },
            isAntiWaste: true,
            fridgeInputs: ingredients
          };
        }
      } catch (err) {
        console.warn("Échec Vide-Frigo Mistral, repli local:", err.message);
      }
    }

    // 2. Fallback local intelligent : recherche de la recette du catalogue qui contient le plus d'ingrédients demandés
    const lowerInputs = ingredients.map(i => i.toLowerCase().trim());
    const validRecipes = this.filterRecipes(profile);

    let bestRecipe = null;
    let maxMatch = -1;

    validRecipes.forEach(recipe => {
      let matchCount = 0;
      recipe.ingredients.forEach(ing => {
        const fullNames = [ing.name.fr, ing.name.en, ing.name.ar].join(" ").toLowerCase();
        lowerInputs.forEach(input => {
          if (input && fullNames.includes(input)) matchCount++;
        });
      });

      if (matchCount > maxMatch) {
        maxMatch = matchCount;
        bestRecipe = recipe;
      }
    });

    const chosen = bestRecipe || validRecipes[Math.floor(Math.random() * validRecipes.length)] || RECIPES_CATALOG[0];

    return {
      ...chosen,
      id: `fridge_local_${Date.now()}`,
      calculatedServings: servings,
      isAntiWaste: true,
      fridgeInputs: ingredients
    };
  }
}
