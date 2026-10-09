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

    // 1. Tenter la génération avec Mistral AI (par défaut ou si activé)
    if (aiConfig?.engine !== "local") {
      try {
        const mistralResult = await MistralService.generateMealPlan({
          profile,
          durationWeeks,
          apiKey: aiConfig?.mistralApiKey,
          model: aiConfig?.mistralModel || "codestral-latest",
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
    if (!rawUnit) return "";
    const u = rawUnit.toLowerCase().trim().replace(/\.$/, "");
    if ([
      "piece", "pieces", "pièce", "pièces", "unite", "unites", "unité", "unités",
      "unit", "units", "pc", "pcs", "pce", "portion", "portions", "tranche", "tranches",
      "gousse", "gousses", "oeuf", "oeufs", "feuille", "feuilles", "brin", "brins",
      "botte", "bottes", "sachet", "sachets", "pot", "pots", "boite", "boites",
      "boîte", "boîtes", "pincee", "pincees", "pincée", "pincées", "poignee", "poignée"
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

    // ==================== 1. BOULANGERIE (deptBakery) ====================
    if (lower.includes("bagel")) {
      return { canonKey: "canon_bagel", name: { fr: "Bagels", en: "Bagels", ar: "خبز البيغل" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("pita") || lower.includes("pain libanais")) {
      return { canonKey: "canon_pita", name: { fr: "Pains pita", en: "Pita bread", ar: "خبز بيتا" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("tortilla") || lower.includes("fajita") || (lower.includes("galette") && lower.includes("ble"))) {
      return { canonKey: "canon_tortillas", name: { fr: "Tortillas de blé", en: "Flour tortillas", ar: "خبز التورتيلا" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("naan")) {
      return { canonKey: "canon_naans", name: { fr: "Pains naans", en: "Naan bread", ar: "خبز النان" }, unit: "", dept: "deptBakery", multiplier: unit === "g" ? 0.01 : 1 };
    }
    if (lower.includes("burger") && (lower.includes("pain") || lower.includes("brioche"))) {
      return { canonKey: "canon_pain_burger", name: { fr: "Pains burger", en: "Burger buns", ar: "خبز البرجر" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("hot-dog") || lower.includes("hot dog")) {
      return { canonKey: "canon_pain_hotdog", name: { fr: "Pains hot-dog", en: "Hot dog buns", ar: "خبز الهوت دوغ" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("panini")) {
      return { canonKey: "canon_pain_panini", name: { fr: "Pains panini", en: "Panini bread", ar: "خبز البانيني" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("brick") || lower.includes("malsouka")) {
      return { canonKey: "canon_feuilles_brick", name: { fr: "Feuilles de brick", en: "Brick pastry sheets", ar: "أوراق الملسوقة" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("feuilletee") || lower.includes("pate feuilletee")) {
      return { canonKey: "canon_pate_feuilletee", name: { fr: "Pâte feuilletée", en: "Puff pastry", ar: "عجينة مورقة" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("brisee") || lower.includes("pate brisee")) {
      return { canonKey: "canon_pate_brisee", name: { fr: "Pâte brisée", en: "Shortcrust pastry", ar: "عجينة مكسرة" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("brioche")) {
      return { canonKey: "canon_brioche", name: { fr: "Tranches de brioche", en: "Brioche slices", ar: "شرائح بريوش" }, unit: "tranches", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("seigle")) {
      return { canonKey: "canon_pain_seigle", name: { fr: "Pain de seigle", en: "Rye bread", ar: "خبز الجاودار" }, unit: "tranches", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("campagne")) {
      return { canonKey: "canon_pain_campagne", name: { fr: "Pain de campagne", en: "Country bread", ar: "خبز ريفي" }, unit: "tranches", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("pain de mie") || lower.includes("pain complet") || lower.includes("pain traditionnel") || lower === "pain") {
      return { canonKey: "canon_pain_complet", name: { fr: "Pain complet", en: "Whole wheat bread", ar: "خبز كامل" }, unit: "tranches", dept: "deptBakery", multiplier: 1 };
    }
    if (lower.includes("galette") && lower.includes("riz")) {
      return { canonKey: "canon_galettes_riz", name: { fr: "Galettes de riz soufflé", en: "Rice cakes", ar: "كعك الأرز" }, unit: "", dept: "deptBakery", multiplier: 1 };
    }

    // ==================== 2. BOUCHERIE & POISSONNERIE (deptMeat) ====================
    // Bœuf
    if (/\b(boeuf\s+hache|steaks?\s+haches?|viande\s+hachee)\b/.test(lower) || (lower.includes("boeuf") && lower.includes("hache"))) {
      let mult = 1;
      if (unit === "kg") mult = 1000;
      else if (unit === "piece") mult = 125;
      return { canonKey: "canon_boeuf_hache", name: { fr: "Bœuf haché", en: "Minced beef", ar: "لحم مفروم" }, unit: "g", dept: "deptMeat", multiplier: mult };
    }
    if (lower.includes("kefta") || (lower.includes("boulette") && lower.includes("boeuf"))) {
      return { canonKey: "canon_kefta", name: { fr: "Boulettes de bœuf (Kefta)", en: "Beef meatballs (Kefta)", ar: "كفتة لحم" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 35 : 1 };
    }
    if (lower.includes("bavette") || lower.includes("bifteck") || lower.includes("rumsteck") || lower.includes("faux-filet") || lower.includes("pave de boeuf") || (lower.includes("boeuf") && (lower.includes("emince") || lower.includes("steak") || lower.includes("pave")))) {
      return { canonKey: "canon_boeuf_steak", name: { fr: "Bavette de bœuf", en: "Beef steak", ar: "شريحة لحم بقر" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 150 : 1 };
    }
    if (lower.includes("agneau") || lower.includes("gigot")) {
      return { canonKey: "canon_agneau", name: { fr: "Viande d'agneau", en: "Lamb meat", ar: "لحم غنم" }, unit: "g", dept: "deptMeat", multiplier: 1 };
    }

    // Volaille
    if (lower.includes("saucisse") && (lower.includes("volaille") || lower.includes("poulet") || lower.includes("dinde"))) {
      return { canonKey: "canon_saucisses_volaille", name: { fr: "Saucisses de volaille", en: "Poultry sausages", ar: "نقانق دجاج" }, unit: "", dept: "deptMeat", multiplier: 1 };
    }
    if (lower.includes("jambon de dinde") || lower.includes("blanc de dinde") || lower.includes("dinde fumee")) {
      return { canonKey: "canon_jambon_dinde", name: { fr: "Jambon de dinde", en: "Turkey breast slices", ar: "صدر حبش مدخن" }, unit: "", dept: "deptMeat", multiplier: 1 };
    }
    if (lower.includes("dinde") && (lower.includes("escalope") || lower.includes("filet") || lower.includes("morceau") || lower.includes("marine"))) {
      return { canonKey: "canon_dinde_escalope", name: { fr: "Escalopes de dinde", en: "Turkey escalopes", ar: "شرائح حبش" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 120 : (unit === "kg" ? 1000 : 1) };
    }
    if (lower.includes("cuisse") && lower.includes("poulet")) {
      return { canonKey: "canon_poulet_cuisse", name: { fr: "Cuisses de poulet", en: "Chicken thighs", ar: "أفخاذ دجاج" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 180 : (unit === "kg" ? 1000 : 1) };
    }
    if (lower.includes("poulet") || lower.includes("aiguillette")) {
      let mult = 1;
      if (unit === "kg") mult = 1000;
      else if (unit === "piece") mult = 120;
      return { canonKey: "canon_poulet_filet", name: { fr: "Blancs de poulet", en: "Chicken breasts", ar: "صدور دجاج" }, unit: "g", dept: "deptMeat", multiplier: mult };
    }

    // Poissons & Fruits de mer
    if (lower.includes("saumon fume") || lower.includes("truite fumee") || (lower.includes("truite") && lower.includes("fume")) || (lower.includes("saumon") && lower.includes("laniere"))) {
      return { canonKey: "canon_saumon_fume", name: { fr: "Saumon fumé", en: "Smoked salmon", ar: "سلمون مدخن" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 35 : 1 };
    }
    if (lower.includes("saumon") && (lower.includes("pave") || lower.includes("filet") || lower.includes("frais") || lower === "saumon")) {
      return { canonKey: "canon_saumon_frais", name: { fr: "Pavé de saumon frais", en: "Salmon fillet", ar: "سلمون طازج" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 125 : 1 };
    }
    if (lower.includes("cabillaud") || lower.includes("colin") || lower.includes("merlu") || lower.includes("poisson blanc") || lower.includes("lieu")) {
      return { canonKey: "canon_dos_cabillaud", name: { fr: "Dos de cabillaud frais", en: "Cod fillet", ar: "سمك القد" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 140 : 1 };
    }
    if (lower.includes("dorade") || lower.includes("loup de mer") || lower.includes("bar")) {
      return { canonKey: "canon_dorade_filet", name: { fr: "Filets de dorade royale", en: "Sea bream fillet", ar: "فيليه دنيس" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 130 : 1 };
    }
    if (lower.includes("truite")) {
      return { canonKey: "canon_saumon_fume", name: { fr: "Saumon fumé", en: "Smoked salmon", ar: "سلمون مدخن" }, unit: "g", dept: "deptMeat", multiplier: 1 };
    }
    if (lower.includes("thon") && (lower.includes("frais") || lower.includes("pave") || lower.includes("decongele"))) {
      return { canonKey: "canon_thon_frais", name: { fr: "Pavé de thon frais", en: "Fresh tuna steak", ar: "تونة طازجة" }, unit: "g", dept: "deptMeat", multiplier: unit === "piece" ? 130 : 1 };
    }
    if (lower.includes("crevette")) {
      return { canonKey: "canon_crevettes", name: { fr: "Crevettes décortiquées", en: "Peeled shrimp", ar: "جمبري مقشر" }, unit: "g", dept: "deptMeat", multiplier: 1 };
    }

    // ==================== 3. PRODUITS LAITIERS & FRAIS (deptDairy) ====================
    // Œufs
    if (!lower.includes("nouille") && !lower.includes("pate") && !lower.includes("biscuit") && (
      /\b(oeufs?|blancs?\s+d'oeufs?|jaunes?\s+d'oeufs?)\b/.test(lower) || lower.startsWith("oeuf")
    )) {
      let mult = 1;
      if (unit === "g") mult = 0.02;
      return { canonKey: "canon_oeufs", name: { fr: "Œufs", en: "Eggs", ar: "بيض" }, unit: "", dept: "deptDairy", multiplier: mult };
    }

    // Fromages
    if (lower.includes("parmesan") || lower.includes("parmigiano")) {
      return { canonKey: "canon_parmesan", name: { fr: "Parmesan râpé", en: "Grated parmesan", ar: "جبن بارميزان" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("mozzarella") || lower.includes("mozza")) {
      return { canonKey: "canon_mozzarella", name: { fr: "Mozzarella", en: "Mozzarella", ar: "جبن موزاريلا" }, unit: "g", dept: "deptDairy", multiplier: unit === "piece" ? 125 : 1 };
    }
    if (lower.includes("feta")) {
      return { canonKey: "canon_feta", name: { fr: "Feta AOP", en: "Feta cheese", ar: "جبن فيتا" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("cheddar")) {
      return { canonKey: "canon_cheddar", name: { fr: "Cheddar en tranches", en: "Cheddar slices", ar: "جبن شيدر" }, unit: "g", dept: "deptDairy", multiplier: unit === "piece" ? 20 : 1 };
    }
    if (lower.includes("emmental") || lower.includes("gruyere") || lower.includes("comte")) {
      return { canonKey: "canon_emmental", name: { fr: "Emmental râpé", en: "Grated Emmental", ar: "جبن إيمنتال مبشور" }, unit: "g", dept: "deptDairy", multiplier: unit === "piece" ? 25 : 1 };
    }
    if (lower.includes("chevre")) {
      return { canonKey: "canon_fromage_chevre", name: { fr: "Fromage de chèvre frais", en: "Goat cheese", ar: "جبن الماعز" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("gorgonzola") || lower.includes("bleu") || lower.includes("roquefort")) {
      return { canonKey: "canon_gorgonzola", name: { fr: "Gorgonzola doux", en: "Gorgonzola cheese", ar: "جبن جورجونزولا" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("ricotta")) {
      return { canonKey: "canon_ricotta", name: { fr: "Ricotta fraîche", en: "Ricotta", ar: "جبن ريكوتا" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("tartiflette") || lower.includes("reblochon") || lower.includes("raclette")) {
      return { canonKey: "canon_fromage_raclette", name: { fr: "Fromage à tartiflette / raclette", en: "Raclette cheese", ar: "جبن راكليت" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("vache qui rit") || lower.includes("kiri") || lower.includes("fromage fondu")) {
      return { canonKey: "canon_fromage_fondu", name: { fr: "Portions de fromage fondu", en: "Cheese spread portions", ar: "جبن مثلثات" }, unit: "", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("fromage frais") || lower.includes("st-moret") || lower.includes("cream cheese") || lower.includes("tartiner")) {
      return { canonKey: "canon_fromage_tartiner", name: { fr: "Fromage frais à tartiner", en: "Cream cheese", ar: "جبن كريمي للدهن" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("fromage blanc")) {
      return { canonKey: "canon_fromage_blanc", name: { fr: "Fromage blanc", en: "Fromage blanc", ar: "جبن أبيض طازج" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("fromage")) {
      return { canonKey: "canon_emmental", name: { fr: "Emmental râpé", en: "Grated Emmental", ar: "جبن إيمنتال مبشور" }, unit: "g", dept: "deptDairy", multiplier: unit === "piece" ? 25 : 1 };
    }

    // Yaourts & Laits & Beurre & Crème
    if (lower.includes("yaourt grec") || lower.includes("skyr")) {
      return { canonKey: "canon_yaourt_grec", name: { fr: "Yaourt grec nature", en: "Greek yogurt", ar: "زبادي يوناني" }, unit: "g", dept: "deptDairy", multiplier: unit === "piece" ? 125 : 1 };
    }
    if (lower.includes("yaourt")) {
      return { canonKey: "canon_yaourt_nature", name: { fr: "Yaourt nature", en: "Plain yogurt", ar: "زبادي طبيعي" }, unit: "g", dept: "deptDairy", multiplier: unit === "piece" ? 125 : 1 };
    }
    if (/\bbeurre\b/.test(lower) && !lower.includes("cacahuete") && !lower.includes("amande")) {
      return { canonKey: "canon_beurre", name: { fr: "Beurre doux", en: "Butter", ar: "زبدة" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if ((lower.includes("creme fraiche") || lower.includes("creme liquide") || lower.includes("creme legere") || lower.includes("creme fleurette") || lower.includes("creme entiere") || /\bcreme\b/.test(lower)) && !lower.includes("ecreme") && !lower.includes("lait") && !lower.includes("coco")) {
      return { canonKey: "canon_creme_fraiche", name: { fr: "Crème fraîche liquide", en: "Single cream", ar: "كريمة طازجة" }, unit: "ml", dept: "deptDairy", multiplier: unit === "c.à.s" ? 15 : (unit === "L" ? 1000 : 1) };
    }
    if (lower.includes("lait d'amande") || lower.includes("lait amande")) {
      return { canonKey: "canon_lait_amande", name: { fr: "Lait d'amande sans sucre", en: "Almond milk", ar: "حليب اللوز" }, unit: "ml", dept: "deptDairy", multiplier: unit === "L" ? 1000 : 1 };
    }
    if (lower.includes("lait d'avoine") || lower.includes("lait avoine")) {
      return { canonKey: "canon_lait_avoine", name: { fr: "Lait d'avoine", en: "Oat milk", ar: "حليب الشوفان" }, unit: "ml", dept: "deptDairy", multiplier: unit === "L" ? 1000 : 1 };
    }
    if (/\blait\b/.test(lower) && !lower.includes("coco") && !lower.includes("soja")) {
      return { canonKey: "canon_lait_demi_ecreme", name: { fr: "Lait demi-écrémé", en: "Semi-skimmed milk", ar: "حليب نصف دسم" }, unit: "ml", dept: "deptDairy", multiplier: unit === "L" ? 1000 : 1 };
    }

    // ==================== 4. FRUITS & LÉGUMES & FRAIS (deptProduce) ====================
    // Herbes fraîches
    if (lower.includes("ciboulette")) {
      return { canonKey: "canon_ciboulette", name: { fr: "Ciboulette fraîche", en: "Fresh chives", ar: "ثوم معمر طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 5 : (unit === "c.à.c" ? 2 : (unit === "piece" ? 15 : 1)) };
    }
    if (lower.includes("persil")) {
      return { canonKey: "canon_persil", name: { fr: "Persil frais", en: "Fresh parsley", ar: "بقدونس طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 5 : (unit === "c.à.c" ? 2 : (unit === "piece" ? 20 : 1)) };
    }
    if (lower.includes("coriandre") && (lower.includes("fraiche") || lower.includes("feuille") || lower.includes("cisel") || dept === "deptProduce" || unit === "g" || unit === "piece" || unit === "poignee")) {
      return { canonKey: "canon_coriandre_fraiche", name: { fr: "Coriandre fraîche", en: "Fresh cilantro", ar: "كزبرة طازجة" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 5 : (unit === "piece" ? 20 : 1) };
    }
    if (lower.includes("basilic") && lower.includes("thai")) {
      return { canonKey: "canon_basilic_thai", name: { fr: "Basilic thaï", en: "Thai basil", ar: "ريحان تايلاندي" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 15 : 1 };
    }
    if (lower.includes("basilic") && !lower.includes("pesto")) {
      return { canonKey: "canon_basilic_frais", name: { fr: "Basilic frais", en: "Fresh basil", ar: "ريحان طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 15 : (unit === "poignee" ? 10 : 1) };
    }
    if (lower.includes("menthe") && (lower.includes("fraiche") || lower.includes("feuille") || dept === "deptProduce" || unit === "piece" || unit === "g" || unit === "poignee" || (!lower.includes("seche") && dept !== "deptSpices"))) {
      return { canonKey: "canon_menthe_fraiche", name: { fr: "Menthe fraîche", en: "Fresh mint", ar: "نعناع طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 5 : (unit === "c.à.c" ? 2 : (unit === "piece" ? 15 : 1)) };
    }
    if (lower.includes("aneth")) {
      return { canonKey: "canon_aneth", name: { fr: "Aneth frais", en: "Fresh dill", ar: "شبت طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 5 : (unit === "c.à.c" ? 2 : (unit === "piece" ? 15 : 1)) };
    }
    if (lower.includes("citronnelle")) {
      return { canonKey: "canon_citronnelle", name: { fr: "Citronnelle", en: "Lemongrass", ar: "عشبة الليمون" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 10 : 1 };
    }
    if (lower.includes("thym") && (lower.includes("frais") || dept === "deptProduce")) {
      return { canonKey: "canon_thym_frais", name: { fr: "Thym frais", en: "Fresh thyme", ar: "زعتر طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "c.à.s" ? 5 : 1 };
    }

    // Légumes
    if (/\bconcombres?\b/.test(lower) && !lower.includes("tzatziki")) {
      return { canonKey: "canon_concombre", name: { fr: "Concombre", en: "Cucumber", ar: "خيار" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.005 : 1 };
    }
    if (/\bcourgettes?\b/.test(lower)) {
      return { canonKey: "canon_courgette", name: { fr: "Courgette", en: "Zucchini", ar: "كوسة" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.005 : 1 };
    }
    if (/\baubergines?\b/.test(lower)) {
      return { canonKey: "canon_aubergine", name: { fr: "Aubergine", en: "Eggplant", ar: "باذنجان" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.004 : 1 };
    }
    if (/\bpoivrons?\b/.test(lower)) {
      return { canonKey: "canon_poivron", name: { fr: "Poivron", en: "Bell pepper", ar: "فلفل حلو" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.007 : 1 };
    }
    if (lower.includes("tomates cerises") || lower.includes("tomate cerise")) {
      return { canonKey: "canon_tomates_cerises", name: { fr: "Tomates cerises", en: "Cherry tomatoes", ar: "طماطم كرزية" }, unit: "g", dept: "deptProduce", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (/\btomates?\b/.test(lower) && !lower.includes("sauce") && !lower.includes("coulis") && !lower.includes("pulpe") && !lower.includes("sechee") && !lower.includes("sechees") && !lower.includes("concentre")) {
      return { canonKey: "canon_tomates", name: { fr: "Tomates fraîches", en: "Tomatoes", ar: "طماطم طازجة" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 150 : 1 };
    }
    if (/\bcarottes?\b/.test(lower)) {
      return { canonKey: "canon_carottes", name: { fr: "Carottes", en: "Carrots", ar: "جزر" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 100 : (unit === "kg" ? 1000 : 1) };
    }
    if (/\bavocats?\b/.test(lower) && !lower.includes("guacamole")) {
      return { canonKey: "canon_avocat", name: { fr: "Avocat", en: "Avocado", ar: "أفوكادو" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("champignon")) {
      return { canonKey: "canon_champignons", name: { fr: "Champignons de Paris", en: "Mushrooms", ar: "فطر" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("epinard")) {
      return { canonKey: "canon_epinards", name: { fr: "Jeunes pousses d'épinards", en: "Baby spinach", ar: "سبانخ" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("brocoli")) {
      return { canonKey: "canon_brocolis", name: { fr: "Brocolis frais", en: "Fresh broccoli", ar: "بروكلي طازج" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 350 : 1 };
    }
    if (lower.includes("chou rouge")) {
      return { canonKey: "canon_chou_rouge", name: { fr: "Chou rouge", en: "Red cabbage", ar: "ملفوف أحمر" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 400 : 1 };
    }
    if (lower.includes("chou") && !lower.includes("fleur") && !lower.includes("bruxelle")) {
      return { canonKey: "canon_chou_blanc", name: { fr: "Chou blanc", en: "White cabbage", ar: "ملفوف أبيض" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 400 : 1 };
    }
    if (lower.includes("salade romaine") || lower.includes("salade verte") || lower.includes("batavia") || lower.includes("laitue") || lower.includes("coeur de romaine") || lower.includes("salade")) {
      return { canonKey: "canon_salade_verte", name: { fr: "Salade verte", en: "Lettuce", ar: "خس" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 150 : 1 };
    }
    if (lower.includes("salade iceberg") || lower.includes("iceberg")) {
      return { canonKey: "canon_salade_iceberg", name: { fr: "Salade iceberg", en: "Iceberg lettuce", ar: "خس آيسبرغ" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 200 : 1 };
    }
    if (lower.includes("roquette")) {
      return { canonKey: "canon_roquette", name: { fr: "Roquette fraîche", en: "Arugula", ar: "جرجير طازج" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("mache")) {
      return { canonKey: "canon_mache", name: { fr: "Mâche fraîche", en: "Lamb's lettuce", ar: "خس النعجة" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("patate douce") || lower.includes("patates douces")) {
      return { canonKey: "canon_patate_douce", name: { fr: "Patate douce", en: "Sweet potato", ar: "بطاطا حلوة" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 250 : (unit === "kg" ? 1000 : 1) };
    }
    if ((lower.includes("pomme") && lower.includes("terre")) || lower.includes("potatoes") || (lower.includes("patate") && !lower.includes("douce"))) {
      return { canonKey: "canon_pommes_de_terre", name: { fr: "Pommes de terre", en: "Potatoes", ar: "بطاطس" }, unit: "g", dept: "deptProduce", multiplier: unit === "kg" ? 1000 : (unit === "piece" ? 150 : 1) };
    }
    if (lower.includes("echalote")) {
      return { canonKey: "canon_echalote", name: { fr: "Échalotes", en: "Shallots", ar: "كراث أندلسي" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.04 : 1 };
    }
    if (lower.includes("oignon rouge")) {
      return { canonKey: "canon_oignon_rouge", name: { fr: "Oignon rouge", en: "Red onion", ar: "بصل أحمر" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.01 : 1 };
    }
    if (/\b(oignons?|oignons?\s+jaunes?)\b/.test(lower) && !lower.includes("frit") && !lower.includes("fume")) {
      return { canonKey: "canon_oignon", name: { fr: "Oignon jaune", en: "Yellow onion", ar: "بصل أصفر" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.01 : 1 };
    }
    if (/\b(ail|gousses?\s+d'ail)\b/.test(lower)) {
      return { canonKey: "canon_ail", name: { fr: "Ail", en: "Garlic", ar: "ثوم" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.2 : 1 };
    }
    if (lower.includes("poireau")) {
      return { canonKey: "canon_poireaux", name: { fr: "Poireaux", en: "Leeks", ar: "كراث" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 150 : 1 };
    }
    if (lower.includes("radis")) {
      return { canonKey: "canon_radis", name: { fr: "Radis", en: "Radish", ar: "فجل" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 10 : 1 };
    }
    if (lower.includes("haricot vert") || lower.includes("haricots verts")) {
      return { canonKey: "canon_haricots_verts", name: { fr: "Haricots verts", en: "Green beans", ar: "فاصوليا خضراء" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("petit pois") || lower.includes("petits pois") || lower.includes("pois doux")) {
      return { canonKey: "canon_petits_pois", name: { fr: "Petits pois", en: "Green peas", ar: "بازلاء" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("pois gourmand")) {
      return { canonKey: "canon_pois_gourmands", name: { fr: "Pois gourmands", en: "Snap peas", ar: "بازلاء الثلج" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("soja") && (lower.includes("pousse") || lower.includes("germe"))) {
      return { canonKey: "canon_pousses_soja", name: { fr: "Pousses de soja", en: "Bean sprouts", ar: "براعم الصويا" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("potimarron") || lower.includes("butternut") || lower.includes("courge")) {
      return { canonKey: "canon_potimarron", name: { fr: "Potimarron / Courge", en: "Pumpkin / Butternut", ar: "قرع عسلي" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 800 : 1 };
    }
    if (lower.includes("asperge")) {
      return { canonKey: "canon_asperges", name: { fr: "Asperges vertes", en: "Green asparagus", ar: "هليون أخضر" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("fenouil")) {
      return { canonKey: "canon_fenouil", name: { fr: "Fenouil", en: "Fennel", ar: "شمر" }, unit: "g", dept: "deptProduce", multiplier: unit === "piece" ? 250 : 1 };
    }
    if (lower.includes("celeri")) {
      return { canonKey: "canon_celeri", name: { fr: "Branche de céleri", en: "Celery stick", ar: "كرفس" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("edamame") || lower.includes("feve")) {
      return { canonKey: "canon_edamame", name: { fr: "Edamame", en: "Edamame", ar: "إدامامي" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("tofu")) {
      return { canonKey: "canon_tofu", name: { fr: "Tofu ferme", en: "Firm tofu", ar: "توفو متماسك" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }

    // Fruits
    if (/\bcitrons?\s+verts?\b/.test(lower) || lower.includes("citron vert") || lower.includes("citrons verts") || lower.includes("lime")) {
      return { canonKey: "canon_citron_vert", name: { fr: "Citron vert", en: "Lime", ar: "ليمون أخضر" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.015 : 1 };
    }
    if (/\bcitrons?\b/.test(lower) && !lower.includes("vert") && !lower.includes("combava")) {
      return { canonKey: "canon_citron_jaune", name: { fr: "Citron jaune", en: "Lemon", ar: "ليمون" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.01 : 1 };
    }
    if (/\bbananes?\b/.test(lower)) {
      return { canonKey: "canon_banane", name: { fr: "Banane", en: "Banana", ar: "موز" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.008 : 1 };
    }
    if (/\bpommes?\b/.test(lower) && !lower.includes("terre") && !lower.includes("pin") && !lower.includes("compote")) {
      return { canonKey: "canon_pomme", name: { fr: "Pomme", en: "Apple", ar: "تفاح" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.007 : 1 };
    }
    if (lower.includes("mangue")) {
      return { canonKey: "canon_mangue", name: { fr: "Mangue", en: "Mango", ar: "مانجو" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.004 : 1 };
    }
    if (lower.includes("fraise")) {
      return { canonKey: "canon_fraises", name: { fr: "Fraises", en: "Strawberries", ar: "فراولة" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("myrtille")) {
      return { canonKey: "canon_myrtilles", name: { fr: "Myrtilles", en: "Blueberries", ar: "توت أزرق" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("fruits rouges") || lower.includes("fruit rouge")) {
      return { canonKey: "canon_fruits_rouges", name: { fr: "Fruits rouges", en: "Red berries", ar: "توت بري مشكل" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("fruits de saison") || lower.includes("fruit frais de saison") || lower.includes("fruits frais")) {
      return { canonKey: "canon_fruits_saison", name: { fr: "Fruits frais de saison", en: "Fresh seasonal fruits", ar: "فواكه موسمية طازجة" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("poire") && !lower.includes("poireau")) {
      return { canonKey: "canon_poire", name: { fr: "Poire", en: "Pear", ar: "كمثرى" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.006 : 1 };
    }
    if (lower.includes("datte") || lower.includes("medjool")) {
      return { canonKey: "canon_dattes_medjool", name: { fr: "Dattes Medjool", en: "Medjool dates", ar: "تمر مجدول" }, unit: "", dept: "deptProduce", multiplier: unit === "g" ? 0.05 : 1 };
    }

    // Traiteur & Frais divers
    if (lower.includes("tzatziki")) {
      return { canonKey: "canon_tzatziki", name: { fr: "Tzatziki", en: "Tzatziki", ar: "تزاتزيكي" }, unit: "g", dept: "deptDairy", multiplier: 1 };
    }
    if (lower.includes("houmous")) {
      return { canonKey: "canon_houmous", name: { fr: "Houmous", en: "Hummus", ar: "حمص بطحينة" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("falafel")) {
      return { canonKey: "canon_falafels", name: { fr: "Falafels", en: "Falafels", ar: "فلافل" }, unit: "", dept: "deptProduce", multiplier: 1 };
    }
    if (lower.includes("guacamole")) {
      return { canonKey: "canon_guacamole", name: { fr: "Guacamole", en: "Guacamole", ar: "جواكامولي" }, unit: "g", dept: "deptProduce", multiplier: 1 };
    }

    // ==================== 5. ÉPICERIE (deptPantry) ====================
    // Féculents & Céréales
    if (lower.includes("flocon") && lower.includes("avoine")) {
      return { canonKey: "canon_flocons_avoine", name: { fr: "Flocons d'avoine", en: "Rolled oats", ar: "رقائق الشوفان" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("arborio") || lower.includes("risotto")) {
      return { canonKey: "canon_riz_arborio", name: { fr: "Riz arborio (Risotto)", en: "Arborio rice", ar: "أرز أربوريو" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("riz a sushi") || lower.includes("riz rond")) {
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
    if (lower.includes("vermicelle") || lower.includes("cheveux d'ange")) {
      return { canonKey: "canon_vermicelles", name: { fr: "Cheveux d'ange (Vermicelles)", en: "Vermicelli", ar: "شعرية" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("nouilles de riz")) {
      return { canonKey: "canon_nouilles_riz", name: { fr: "Nouilles de riz", en: "Rice noodles", ar: "نودلز الأرز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("nouille") || lower.includes("ramen") || lower.includes("udon")) {
      return { canonKey: "canon_nouilles_asiatiques", name: { fr: "Nouilles asiatiques", en: "Asian noodles", ar: "نودلز آسيوية" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("spaghetti") || lower.includes("tagliatelle") || lower.includes("penne") || lower.includes("lasagne") || lower.includes("cannelloni") || lower.includes("coquillette") || lower.includes("pates") || lower.includes("pate")) {
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
    if (lower.includes("frik") || lower.includes("ble vert")) {
      return { canonKey: "canon_ble_vert", name: { fr: "Blé vert concassé (Frik)", en: "Freekeh", ar: "فريك" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Légumineuses & Conserves
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
    if (lower.includes("mais") && !lower.includes("petale") && !lower.includes("farine") && !lower.includes("maizena") && !lower.includes("corn-flakes") && !lower.includes("corn flakes")) {
      return { canonKey: "canon_mais_doux", name: { fr: "Maïs doux", en: "Sweet corn", ar: "ذرة حلوة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("thon") && (lower.includes("naturel") || lower.includes("boite") || lower.includes("egoutte") || lower === "thon" || dept === "deptPantry")) {
      return { canonKey: "canon_thon_boite", name: { fr: "Thon au naturel", en: "Canned tuna", ar: "تونة معلبة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("tomate sechee") || lower.includes("tomates sechees")) {
      return { canonKey: "canon_tomates_sechees", name: { fr: "Tomates séchées", en: "Sun-dried tomatoes", ar: "طماطم مجففة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("coulis de tomate") || lower.includes("pulpe de tomate") || lower.includes("sauce tomate") || lower.includes("tomates concassees") || lower.includes("concentre de tomate") || lower === "concentre" || lower === "coulis") {
      return { canonKey: "canon_coulis_tomate", name: { fr: "Coulis de tomate", en: "Tomato coulis", ar: "صلصة طماطم" }, unit: "g", dept: "deptPantry", multiplier: unit === "ml" ? 1 : 1 };
    }
    if (lower.includes("huile d'olive") || lower.includes("huile olive")) {
      return { canonKey: "canon_huile_olive", name: { fr: "Huile d'olive", en: "Olive oil", ar: "زيت زيتون" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "ml" ? 0.067 : (unit === "c.à.c" ? 0.33 : 1) };
    }
    if (lower.includes("huile de sesame")) {
      return { canonKey: "canon_huile_sesame", name: { fr: "Huile de sésame", en: "Sesame oil", ar: "زيت سمسم" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("olive") && lower.includes("noire") && !lower.includes("huile")) {
      return { canonKey: "canon_olives_noires", name: { fr: "Olives noires", en: "Black olives", ar: "زيتون أسود" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("olive") && !lower.includes("huile")) {
      return { canonKey: "canon_olives_vertes", name: { fr: "Olives vertes", en: "Green olives", ar: "زيتون أخضر" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("capre")) {
      return { canonKey: "canon_capres", name: { fr: "Câpres", en: "Capers", ar: "قبار" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("pickle") || lower.includes("cornichon")) {
      return { canonKey: "canon_cornichons", name: { fr: "Cornichons", en: "Pickles", ar: "مخلل خيار" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("chataigne")) {
      return { canonKey: "canon_chataignes", name: { fr: "Châtaignes", en: "Chestnuts", ar: "كستناء" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("pruneau")) {
      return { canonKey: "canon_pruneaux", name: { fr: "Pruneaux", en: "Prunes", ar: "برقوق مجفف" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Oléagineux & Graines
    if (lower.includes("chia")) {
      return { canonKey: "canon_graines_chia", name: { fr: "Graines de chia", en: "Chia seeds", ar: "بذور الشيا" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 15 : (unit === "c.à.c" ? 5 : 1) };
    }
    if (lower.includes("graine") && lower.includes("courge")) {
      return { canonKey: "canon_graines_courge", name: { fr: "Graines de courge", en: "Pumpkin seeds", ar: "بذور اليقطين" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 15 : 1 };
    }
    if (lower.includes("sesame") || lower.includes("tahini") || lower === "graines" || lower === "graine") {
      return { canonKey: "canon_graines_sesame", name: { fr: "Graines de sésame", en: "Sesame seeds", ar: "سمسم" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 15 : (unit === "c.à.c" ? 5 : 1) };
    }
    if (lower.includes("amande") && (lower.includes("poudre") || lower.includes("effilee"))) {
      return { canonKey: "canon_poudre_amandes", name: { fr: "Poudre d'amandes", en: "Almond powder", ar: "مسحوق اللوز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("amande") && (lower.includes("puree") || lower.includes("beurre"))) {
      return { canonKey: "canon_puree_amande", name: { fr: "Purée d'amandes", en: "Almond butter", ar: "زبدة اللوز" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 20 : 1 };
    }
    if (lower.includes("amande") && !lower.includes("lait")) {
      return { canonKey: "canon_amandes", name: { fr: "Amandes entières", en: "Almonds", ar: "لوز" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("cacahuete") && !lower.includes("beurre") && !lower.includes("sauce")) {
      return { canonKey: "canon_cacahuetes", name: { fr: "Cacahuètes non salées", en: "Peanuts", ar: "فول سوداني" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 15 : 1 };
    }
    if (lower.includes("beurre de cacahuete")) {
      return { canonKey: "canon_beurre_cacahuete", name: { fr: "Beurre de cacahuète", en: "Peanut butter", ar: "زبدة الفول السوداني" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 20 : 1 };
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
    if (lower.includes("corn-flakes") || lower.includes("corn flakes") || lower.includes("petales de mais")) {
      return { canonKey: "canon_corn_flakes", name: { fr: "Pétales de maïs (Corn-Flakes)", en: "Corn flakes", ar: "رقائق الذرة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("granola")) {
      return { canonKey: "canon_granola", name: { fr: "Granola croustillant", en: "Granola", ar: "جرانولا" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("cracker")) {
      return { canonKey: "canon_crackers", name: { fr: "Crackers aux graines", en: "Seed crackers", ar: "مقرمشات بالبذور" }, unit: "", dept: "deptPantry", multiplier: 1 };
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
      return { canonKey: "canon_cacao_poudre", name: { fr: "Cacao en poudre non sucré", en: "Unsweetened cocoa powder", ar: "كاكاو خام" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 10 : (unit === "c.à.c" ? 5 : 1) };
    }
    if (lower.includes("chocolat noir") || lower.includes("pepites de chocolat")) {
      return { canonKey: "canon_chocolat_noir", name: { fr: "Chocolat noir 70%", en: "Dark chocolate 70%", ar: "شوكولاتة داكنة" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("compote")) {
      return { canonKey: "canon_compote", name: { fr: "Compote de pommes", en: "Applesauce", ar: "مربى تفاح ناعم" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }

    // Sauces & Huiles & Condiments d'épicerie
    if (lower.includes("huile d'olive") || lower.includes("huile olive")) {
      return { canonKey: "canon_huile_olive", name: { fr: "Huile d'olive", en: "Olive oil", ar: "زيت زيتون" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "ml" ? 0.067 : (unit === "c.à.c" ? 0.33 : 1) };
    }
    if (lower.includes("huile de sesame")) {
      return { canonKey: "canon_huile_sesame", name: { fr: "Huile de sésame", en: "Sesame oil", ar: "زيت سمسم" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("sauce soja")) {
      const isSucree = lower.includes("sucre");
      return {
        canonKey: isSucree ? "canon_sauce_soja_sucree" : "canon_sauce_soja_salee",
        name: { fr: isSucree ? "Sauce soja sucrée" : "Sauce soja salée", en: isSucree ? "Sweet soy sauce" : "Soy sauce", ar: isSucree ? "صلصة صويا حلوة" : "صلصة صويا" },
        unit: "ml",
        dept: "deptPantry",
        multiplier: unit === "c.à.s" ? 15 : (unit === "c.à.c" ? 5 : 1)
      };
    }
    if (lower.includes("teriyaki")) {
      return { canonKey: "canon_teriyaki", name: { fr: "Sauce Teriyaki", en: "Teriyaki sauce", ar: "صلصة ترياكي" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("sauce cacahuete")) {
      return { canonKey: "canon_sauce_cacahuete", name: { fr: "Sauce cacahuète", en: "Peanut sauce", ar: "صلصة الفول السوداني" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("moutarde")) {
      return { canonKey: "canon_moutarde", name: { fr: "Moutarde de Dijon", en: "Dijon mustard", ar: "خردل ديجون" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("mayonnaise") || lower === "mayo") {
      return { canonKey: "canon_mayo", name: { fr: "Mayonnaise", en: "Mayonnaise", ar: "مايونيز" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("ketchup")) {
      return { canonKey: "canon_ketchup", name: { fr: "Ketchup", en: "Ketchup", ar: "كاتشب" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("sauce caesar") || lower.includes("sauce cesar")) {
      return { canonKey: "canon_sauce_caesar", name: { fr: "Sauce Caesar", en: "Caesar dressing", ar: "صلصة سيزر" }, unit: "c.à.s", dept: "deptPantry", multiplier: unit === "g" ? 0.067 : 1 };
    }
    if (lower.includes("sauce algerienne") || lower.includes("samourai") || lower.includes("sauce burger")) {
      return { canonKey: "canon_sauce_algerienne", name: { fr: "Sauce algérienne", en: "Algerian sauce", ar: "صلصة جزائرية" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("sauce tartare")) {
      return { canonKey: "canon_sauce_tartare", name: { fr: "Sauce tartare", en: "Tartar sauce", ar: "صلصة تارتار" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("sauce blanche")) {
      return { canonKey: "canon_sauce_blanche", name: { fr: "Sauce blanche kebab", en: "White kebab sauce", ar: "صلصة بيضاء" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
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
    if (lower.includes("crouton")) {
      return { canonKey: "canon_croutons", name: { fr: "Croûtons dorés", en: "Croutons", ar: "خبز محمص" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("oignon frit") || lower.includes("oignons frits")) {
      return { canonKey: "canon_oignons_frits", name: { fr: "Oignons frits", en: "Fried onions", ar: "بصل مقلي" }, unit: "g", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("vinaigre de cidre")) {
      return { canonKey: "canon_vinaigre_cidre", name: { fr: "Vinaigre de cidre", en: "Apple cider vinegar", ar: "خل التفاح" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("vinaigre balsamique")) {
      return { canonKey: "canon_vinaigre_balsamique", name: { fr: "Vinaigre balsamique", en: "Balsamic vinegar", ar: "خل بلسمي" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("vinaigre")) {
      return { canonKey: "canon_vinaigre", name: { fr: "Vinaigre blanc", en: "White vinegar", ar: "خل أبيض" }, unit: "c.à.s", dept: "deptPantry", multiplier: 1 };
    }
    if (lower.includes("farine")) {
      return { canonKey: "canon_farine", name: { fr: "Farine de blé", en: "Wheat flour", ar: "دقيق قمح" }, unit: "g", dept: "deptPantry", multiplier: unit === "kg" ? 1000 : 1 };
    }
    if (lower.includes("maizena") || lower.includes("fecule")) {
      return { canonKey: "canon_maizena", name: { fr: "Fécule de maïs (Maïzena)", en: "Cornstarch", ar: "نشا الذرة" }, unit: "g", dept: "deptPantry", multiplier: unit === "c.à.s" ? 10 : (unit === "c.à.c" ? 4 : 1) };
    }
    if (lower.includes("frite")) {
      return { canonKey: "canon_frites", name: { fr: "Frites au four", en: "Oven fries", ar: "بطاطس مقلية للفرن" }, unit: "g", dept: "deptFrozen", multiplier: 1 };
    }

    // ==================== 6. ÉPICES & CONDIMENTS (deptSpices) ====================
    if (lower === "sel" || lower.startsWith("sel ") || lower === "sel fin" || lower === "sel poivre" || lower === "fleur de sel") {
      return { canonKey: "canon_sel", name: { fr: "Sel", en: "Salt", ar: "ملح" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
    if (lower === "poivre" || lower.startsWith("poivre ") || lower === "poivre noir" || lower === "poivre du moulin") {
      return { canonKey: "canon_poivre", name: { fr: "Poivre noir", en: "Black pepper", ar: "فلفل أسود" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
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
    if (lower.includes("curry") || lower.includes("korma")) {
      return { canonKey: "canon_curry_doux", name: { fr: "Curry doux en poudre", en: "Curry powder", ar: "كاري ناعم" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("garam masala")) {
      return { canonKey: "canon_garam_masala", name: { fr: "Garam Masala", en: "Garam Masala", ar: "غارام ماسالا" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("ras el hanout") || lower.includes("epices a couscous") || lower.includes("epice couscous")) {
      return { canonKey: "canon_ras_el_hanout", name: { fr: "Ras el Hanout", en: "Ras el Hanout", ar: "رأس الحانوت" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("mexicain") || lower.includes("fajita") || lower.includes("tacos") || lower.includes("tex-mex") || lower.includes("chili")) {
      return { canonKey: "canon_epices_mexicaines", name: { fr: "Épices mexicaines (Fajitas / Chili)", en: "Mexican spice mix", ar: "بهارات مكسيكية" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("shawarma")) {
      return { canonKey: "canon_epices_shawarma", name: { fr: "Épices shawarma", en: "Shawarma spice mix", ar: "بهارات شاورما" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("zaatar") || lower.includes("za'atar")) {
      return { canonKey: "canon_zaatar", name: { fr: "Épices Zaatar", en: "Zaatar spices", ar: "زعتر بالسمسم" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("chermoula")) {
      return { canonKey: "canon_chermoula", name: { fr: "Chermoula", en: "Chermoula marinade", ar: "شرمولة" }, unit: "c.à.s", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("herbes de provence") || lower === "herbes") {
      return { canonKey: "canon_herbes_provence", name: { fr: "Herbes de Provence", en: "Herbes de Provence", ar: "أعشاب بروفانس" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("origan")) {
      return { canonKey: "canon_origan", name: { fr: "Origan séché", en: "Dried oregano", ar: "زعتر مجفف" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("thym")) {
      return { canonKey: "canon_thym_seche", name: { fr: "Thym séché", en: "Dried thyme", ar: "زعتر بري مجفف" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
    }
    if (lower.includes("romarin")) {
      return { canonKey: "canon_romarin", name: { fr: "Romarin séché", en: "Dried rosemary", ar: "إكليل الجبل" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
    }
    if (lower.includes("laurier")) {
      return { canonKey: "canon_laurier", name: { fr: "Feuilles de laurier", en: "Bay leaves", ar: "ورق غار" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("sumac")) {
      return { canonKey: "canon_sumac", name: { fr: "Sumac", en: "Sumac", ar: "سماق" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
    }
    if (lower.includes("muscade")) {
      return { canonKey: "canon_muscade", name: { fr: "Noix de muscade", en: "Nutmeg", ar: "جوزة الطيب" }, unit: "", dept: "deptSpices", multiplier: 1 };
    }
    if (lower.includes("piment d'espelette")) {
      return { canonKey: "canon_piment_espelette", name: { fr: "Piment d'Espelette AOP", en: "Espelette pepper", ar: "فلفل إسبليت" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
    }
    if (lower.includes("harissa")) {
      return { canonKey: "canon_harissa", name: { fr: "Harissa", en: "Harissa", ar: "هريسة" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("piment")) {
      return { canonKey: "canon_piment_doux", name: { fr: "Piment doux", en: "Chili powder", ar: "فلفل حار" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("coriandre")) {
      return { canonKey: "canon_coriandre_moulue", name: { fr: "Coriandre moulue", en: "Ground coriander", ar: "كزبرة مطحونة" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("menthe")) {
      return { canonKey: "canon_menthe_sechee", name: { fr: "Menthe séchée", en: "Dried mint", ar: "نعناع مجفف" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("fleur d'oranger") || lower.includes("eau de fleur")) {
      return { canonKey: "canon_fleur_oranger", name: { fr: "Eau de fleur d'oranger", en: "Orange blossom water", ar: "ماء زهر البرتقال" }, unit: "c.à.s", dept: "deptSpices", multiplier: unit === "c.à.c" ? 0.33 : 1 };
    }
    if (lower.includes("bicarbonate")) {
      return { canonKey: "canon_bicarbonate", name: { fr: "Bicarbonate alimentaire", en: "Baking soda", ar: "بيكربونات الصوديوم" }, unit: "c.à.c", dept: "deptSpices", multiplier: unit === "c.à.s" ? 3 : 1 };
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

          subItems.forEach(rawPart => {
            const partName = rawPart.split(/\s+(?:ou|ou bien|\/)\s+/i)[0].trim() || rawPart;
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
      const u = (item.unit || "").trim().toLowerCase();

      if (u === "g" || u === "ml") {
        if (item.totalQuantity < 10 && item.totalQuantity > 0) {
          rounded = Math.ceil(item.totalQuantity);
        } else {
          rounded = Math.ceil(item.totalQuantity / 5) * 5;
        }
      } else if (u === "c.à.s" || u === "c.à.c") {
        rounded = Math.ceil(item.totalQuantity * 2) / 2;
      } else if (u === "l" || u === "kg") {
        rounded = Math.round(item.totalQuantity * 10) / 10;
        if (rounded === 0 && item.totalQuantity > 0) rounded = 0.1;
      } else {
        // Unités discrètes / comptables (pièces, tranches, etc.) : toujours un nombre entier supérieur ou égal à 1
        rounded = Math.ceil(item.totalQuantity);
      }

      const minQty = (u === "g" || u === "ml" || u === "l" || u === "kg" || u === "c.à.s" || u === "c.à.c") ? 0.1 : 1;

      return {
        ...item,
        totalQuantity: Math.max(minQty, rounded)
      };
    });

    return result.sort((a, b) => (a.dept || "").localeCompare(b.dept || ""));
  }

  /**
   * Remplacement d'un seul repas dans un planning existant
   */
  static async swapMeal(currentMealId, mealType, profile, currentMeal = null, aiConfig = null, lang = "fr") {
    const servings = this.calculateHouseholdServings(profile);

    // Si mode Mistral AI activé (par défaut)
    if (aiConfig?.engine !== "local") {
      try {
        const generated = await MistralService.swapSingleMeal({
          currentMeal,
          mealType,
          profile,
          apiKey: aiConfig?.mistralApiKey,
          model: aiConfig?.mistralModel || "codestral-latest",
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

    // 1. Tenter avec Mistral AI (par défaut)
    if (aiConfig?.engine !== "local") {
      try {
        const generated = await MistralService.generateFridgeRecipe({
          ingredients,
          mealType,
          profile,
          apiKey: aiConfig?.mistralApiKey,
          model: aiConfig?.mistralModel || "codestral-latest",
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
