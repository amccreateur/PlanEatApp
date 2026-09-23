import { RECIPES_CATALOG } from "./defaultRecipes.js";
import { MistralService } from "./mistralService.js";

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
    const diets = profile?.diets || ["dietBalanced"];
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
      }

      // Vérifier les aliments exclus
      if (dislikes.length > 0) {
        const hasDisliked = recipe.ingredients.some(ing => {
          const names = [ing.name.fr, ing.name.en, ing.name.ar].join(" ").toLowerCase();
          return dislikes.some(d => d && names.includes(d));
        });
        if (hasDisliked) return false;
      }

      return true;
    });
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
          const days = mistralResult.days.map((d, i) => {
            const weekIndex = Math.floor(i / 7) + 1;
            const dayIndexInWeek = i % 7;
            const dayKey = dayKeys[dayIndexInWeek];

            const formatMeal = (m, type) => {
              if (!m) return null;
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

            return {
              id: `day_${i + 1}`,
              dayNumber: i + 1,
              weekNumber: weekIndex,
              dayKey: dayKey,
              servings: servings,
              meals: {
                breakfast: formatMeal(d.meals?.breakfast, "breakfast"),
                lunch: formatMeal(d.meals?.lunch, "lunch"),
                snack: formatMeal(d.meals?.snack, "snack"),
                dinner: formatMeal(d.meals?.dinner, "dinner")
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
   * Générateur local avec shuffle pour garantir que les repas changent à chaque clic
   */
  static generateLocalPlan(profile, durationWeeks = 1, servings = 2) {
    const daysCount = durationWeeks * 7;
    const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    // Mélanger aléatoirement les recettes pour renouveler à chaque clic
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const availableBreakfasts = this.filterRecipes(profile, "breakfast");
    const safeBreakfasts = availableBreakfasts.length > 0
      ? shuffle(availableBreakfasts)
      : shuffle(RECIPES_CATALOG.filter(r => r.mealType === "breakfast"));

    const availableLunches = this.filterRecipes(profile, "lunch");
    const availableDinners = this.filterRecipes(profile, "dinner");
    const allAvailableMains = this.filterRecipes(profile).filter(r => r.mealType === "lunch" || r.mealType === "dinner");

    const safeLunches = availableLunches.length > 0 ? shuffle(availableLunches) : shuffle(allAvailableMains);
    const safeDinners = availableDinners.length > 0 ? shuffle(availableDinners) : shuffle(allAvailableMains);
    const safeMainsPool = shuffle(allAvailableMains.length > 0 ? allAvailableMains : RECIPES_CATALOG.filter(r => r.mealType === "lunch" || r.mealType === "dinner"));

    const availableSnacks = this.filterRecipes(profile, "snack");
    const safeSnacks = availableSnacks.length > 0
      ? shuffle(availableSnacks)
      : shuffle(RECIPES_CATALOG.filter(r => r.mealType === "snack"));

    const days = [];
    let mainCursor = 0;

    for (let i = 0; i < daysCount; i++) {
      const weekIndex = Math.floor(i / 7) + 1;
      const dayIndexInWeek = i % 7;
      const dayKey = dayKeys[dayIndexInWeek];

      const b = safeBreakfasts[i % safeBreakfasts.length];
      const s = safeSnacks[i % safeSnacks.length];

      // Sélectionner deux plats principaux strictement distincts pour le déjeuner et le dîner
      let l = safeMainsPool[mainCursor % safeMainsPool.length];
      mainCursor++;
      let d = safeMainsPool[mainCursor % safeMainsPool.length];
      mainCursor++;

      // Sécurité anti-doublon le même jour
      if (l.id === d.id && safeMainsPool.length > 1) {
        d = safeMainsPool[(mainCursor + 1) % safeMainsPool.length];
        mainCursor++;
      }

      days.push({
        id: `day_${i + 1}`,
        dayNumber: i + 1,
        weekNumber: weekIndex,
        dayKey: dayKey,
        servings: servings,
        meals: {
          breakfast: { ...b, calculatedServings: servings },
          lunch: { ...l, calculatedServings: servings },
          dinner: { ...d, calculatedServings: servings },
          snack: { ...s, calculatedServings: servings }
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
   * Compile et consolide la liste des courses par rayon
   */
  static compileGroceries(plan) {
    const itemsMap = {};

    plan.days.forEach(day => {
      Object.values(day.meals).forEach(meal => {
        if (!meal || !meal.ingredients) return;
        const factor = (meal.calculatedServings || 2) / 2;

        meal.ingredients.forEach(ing => {
          const nameFr = typeof ing.name === "object" ? ing.name.fr : ing.name;
          const key = (nameFr || "item") + "_" + (ing.unit || "");
          const qty = ((Number(ing.quantity) || 1) * factor);

          if (!itemsMap[key]) {
            itemsMap[key] = {
              id: `item_${Math.random().toString(36).substr(2, 9)}`,
              name: typeof ing.name === "object" ? ing.name : { fr: ing.name, en: ing.name, ar: ing.name },
              totalQuantity: qty,
              unit: ing.unit || "",
              dept: ing.dept || "deptOther",
              checked: false
            };
          } else {
            itemsMap[key].totalQuantity += qty;
          }
        });
      });
    });

    const result = Object.values(itemsMap).map(item => {
      let rounded = item.totalQuantity;
      if (item.unit === "g" || item.unit === "ml") {
        rounded = Math.round(item.totalQuantity / 10) * 10;
      } else {
        rounded = Math.round(item.totalQuantity * 10) / 10;
      }
      return {
        ...item,
        totalQuantity: rounded
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
          return {
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
