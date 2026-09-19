import { RECIPES_CATALOG } from "./defaultRecipes";

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
      if (mealType && recipe.mealType !== mealType) {
        return false;
      }

      // Vérifier les régimes stricts
      if (diets.includes("dietHalal") && !recipe.tags.includes("dietHalal")) return false;
      if (diets.includes("dietVegetarian") && !recipe.tags.includes("dietVegetarian") && !recipe.tags.includes("dietVegan")) return false;
      if (diets.includes("dietVegan") && !recipe.tags.includes("dietVegan")) return false;
      if (diets.includes("dietGlutenFree") && !recipe.tags.includes("dietGlutenFree")) return false;

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
   * Génère un planning complet sur 1, 2 ou 4 semaines
   */
  static generateMealPlan(profile, durationWeeks = 1) {
    const servings = this.calculateHouseholdServings(profile);
    const daysCount = durationWeeks * 7;
    
    const breakfasts = this.filterRecipes(profile, "breakfast");
    const mains = this.filterRecipes(profile); // lunch or dinner
    const snacks = this.filterRecipes(profile, "snack");

    // Fallback si la sélection est trop stricte
    const safeBreakfasts = breakfasts.length > 0 ? breakfasts : RECIPES_CATALOG.filter(r => r.mealType === "breakfast");
    const safeMains = mains.length > 0 ? mains : RECIPES_CATALOG.filter(r => r.mealType === "lunch" || r.mealType === "dinner");
    const safeSnacks = snacks.length > 0 ? snacks : RECIPES_CATALOG.filter(r => r.mealType === "snack");

    const days = [];
    const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    for (let i = 0; i < daysCount; i++) {
      const weekIndex = Math.floor(i / 7) + 1;
      const dayIndexInWeek = i % 7;
      const dayKey = dayKeys[dayIndexInWeek];

      const b = safeBreakfasts[i % safeBreakfasts.length];
      const l = safeMains[(i * 2) % safeMains.length];
      const d = safeMains[(i * 2 + 1) % safeMains.length];
      const s = safeSnacks[i % safeSnacks.length];

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
        const factor = (meal.calculatedServings || 2) / 2; // base recipes calculated for 2

        meal.ingredients.forEach(ing => {
          const key = ing.name.fr + "_" + ing.unit;
          const qty = (ing.quantity * factor);

          if (!itemsMap[key]) {
            itemsMap[key] = {
              id: `item_${Math.random().toString(36).substr(2, 9)}`,
              name: ing.name,
              totalQuantity: qty,
              unit: ing.unit,
              dept: ing.dept || "deptOther",
              checked: false
            };
          } else {
            itemsMap[key].totalQuantity += qty;
          }
        });
      });
    });

    // Formater et arrondir les quantités proprement
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

    // Trier par rayon
    return result.sort((a, b) => (a.dept || "").localeCompare(b.dept || ""));
  }

  /**
   * Remplacement d'un seul repas dans un planning existant
   */
  static swapMeal(currentMealId, mealType, profile) {
    const candidates = this.filterRecipes(profile, mealType).filter(r => r.id !== currentMealId);
    if (candidates.length === 0) {
      return RECIPES_CATALOG.find(r => r.mealType === mealType && r.id !== currentMealId) || RECIPES_CATALOG[0];
    }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }
}
