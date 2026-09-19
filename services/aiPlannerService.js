import { RECIPES_CATALOG } from "./defaultRecipes";
import { API_CONFIG } from "../config/apiConfig";

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
   * Génération de planning en direct avec Mistral AI (avec fallback local automatique)
   */
  static async generateMealPlan(profile, durationWeeks = 1, lang = "fr") {
    const servings = this.calculateHouseholdServings(profile);
    const daysCount = durationWeeks * 7;

    try {
      if (API_CONFIG.MISTRAL_API_KEY) {
        const aiPlan = await this.fetchPlanFromMistral(profile, durationWeeks, lang, servings);
        if (aiPlan && aiPlan.days && aiPlan.days.length === daysCount) {
          const groceries = this.compileGroceries(aiPlan);
          return { plan: aiPlan, groceries };
        }
      }
    } catch (e) {
      console.log("Mistral AI fallback to local catalog:", e?.message);
    }

    // Fallback local instantané
    return this.generateLocalMealPlan(profile, durationWeeks, servings);
  }

  /**
   * Appel API Mistral / Codestral pour générer un planning sur-mesure
   */
  static async fetchPlanFromMistral(profile, durationWeeks, lang, servings) {
    const daysCount = durationWeeks * 7;
    const dietsList = (profile.diets || ["dietBalanced"]).join(", ");
    const dislikesList = (profile.dislikedFoods || []).join(", ") || "aucun";
    const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const prompt = `Tu es un chef cuisinier et nutritionniste expert pour l'application PlanEat.
Génère un planning de repas équilibré et varié pour ${daysCount} jours en JSON.
Foyer: ${profile.adults || 2} adultes, ${profile.children || 0} enfants (âges: ${(profile.childrenAges || []).join(", ") || "aucun"}).
Portions totales: ${servings} personnes.
Régimes & Préférences: ${dietsList}.
Aliments strictement exclus: ${dislikesList}.
Langue: ${lang === "ar" ? "arabe" : lang === "en" ? "anglais" : "français"}.

Format JSON attendu:
{
  "days": [
    {
      "dayNumber": 1,
      "meals": {
        "breakfast": {
          "title": "${lang === "ar" ? "..." : "Titre du petit-déjeuner"}",
          "emoji": "🥣",
          "prepTime": 5,
          "cookTime": 5,
          "caloriesPerPerson": 350,
          "ingredients": [
            { "name": "${lang === "ar" ? "..." : "Nom ingrédient"}", "quantity": 100, "unit": "g", "dept": "deptPantry" }
          ],
          "instructions": ["Étape 1", "Étape 2"]
        },
        "lunch": {
          "title": "${lang === "ar" ? "..." : "Titre du déjeuner"}",
          "emoji": "🍗",
          "prepTime": 10,
          "cookTime": 15,
          "caloriesPerPerson": 520,
          "ingredients": [
            { "name": "${lang === "ar" ? "..." : "Nom ingrédient"}", "quantity": 150, "unit": "g", "dept": "deptMeat" }
          ],
          "instructions": ["Étape 1", "Étape 2"]
        },
        "snack": {
          "title": "${lang === "ar" ? "..." : "Goûter"}",
          "emoji": "🍎",
          "prepTime": 5,
          "cookTime": 0,
          "caloriesPerPerson": 180,
          "ingredients": [
            { "name": "${lang === "ar" ? "..." : "Fruit"}", "quantity": 1, "unit": "pièce", "dept": "deptProduce" }
          ],
          "instructions": ["Déguster frais"]
        },
        "dinner": {
          "title": "${lang === "ar" ? "..." : "Titre du dîner"}",
          "emoji": "🥘",
          "prepTime": 10,
          "cookTime": 20,
          "caloriesPerPerson": 480,
          "ingredients": [
            { "name": "${lang === "ar" ? "..." : "Nom ingrédient"}", "quantity": 120, "unit": "g", "dept": "deptProduce" }
          ],
          "instructions": ["Étape 1", "Étape 2"]
        }
      }
    }
  ]
}`;

    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_CONFIG.MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [
          { role: "system", content: "Tu es un assistant culinaire qui génère des plannings de repas au format JSON strict." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    const formattedDays = (content.days || []).map((d, i) => {
      const weekIndex = Math.floor(i / 7) + 1;
      const dayIndexInWeek = i % 7;
      const dayKey = dayKeys[dayIndexInWeek];

      const wrapMeal = (m) => {
        if (!m) return null;
        return {
          id: `ai_${Math.random().toString(36).substr(2, 9)}`,
          title: { [lang]: m.title, fr: m.title, en: m.title, ar: m.title },
          emoji: m.emoji || "🍽️",
          prepTime: m.prepTime || 10,
          cookTime: m.cookTime || 15,
          caloriesPerPerson: m.caloriesPerPerson || 400,
          calculatedServings: servings,
          ingredients: (m.ingredients || []).map(ing => ({
            name: { [lang]: ing.name, fr: ing.name, en: ing.name, ar: ing.name },
            quantity: ing.quantity || 1,
            unit: ing.unit || "g",
            dept: ing.dept || "deptProduce"
          })),
          instructions: {
            [lang]: m.instructions || [],
            fr: m.instructions || [],
            en: m.instructions || [],
            ar: m.instructions || []
          }
        };
      };

      return {
        id: `day_${i + 1}`,
        dayNumber: i + 1,
        weekNumber: weekIndex,
        dayKey: dayKey,
        servings: servings,
        meals: {
          breakfast: wrapMeal(d.meals?.breakfast),
          lunch: wrapMeal(d.meals?.lunch),
          dinner: wrapMeal(d.meals?.dinner),
          snack: wrapMeal(d.meals?.snack)
        }
      };
    });

    return {
      id: `plan_ai_${Date.now()}`,
      createdAt: new Date().toISOString(),
      durationWeeks: durationWeeks,
      householdServings: servings,
      isAIGenerated: true,
      days: formattedDays
    };
  }

  /**
   * Génération locale à partir du catalogue interne
   */
  static generateLocalMealPlan(profile, durationWeeks = 1, servings = 2) {
    const daysCount = durationWeeks * 7;
    const breakfasts = this.filterRecipes(profile, "breakfast");
    const mains = this.filterRecipes(profile);
    const snacks = this.filterRecipes(profile, "snack");

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
      isAIGenerated: false,
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
          const frName = ing.name?.fr || ing.name || "Article";
          const key = frName + "_" + ing.unit;
          const qty = (ing.quantity * factor);

          if (!itemsMap[key]) {
            itemsMap[key] = {
              id: `item_${Math.random().toString(36).substr(2, 9)}`,
              name: typeof ing.name === "object" ? ing.name : { fr: ing.name, en: ing.name, ar: ing.name },
              totalQuantity: qty,
              unit: ing.unit || "g",
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
  static swapMeal(currentMealId, mealType, profile) {
    const candidates = this.filterRecipes(profile, mealType).filter(r => r.id !== currentMealId);
    if (candidates.length === 0) {
      return RECIPES_CATALOG.find(r => r.mealType === mealType && r.id !== currentMealId) || RECIPES_CATALOG[0];
    }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }
}
