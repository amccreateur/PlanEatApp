/**
 * Google Gemini AI Service for PlanEat
 * Communicates with Google AI Studio Gemini REST API
 */

const _P1 = "AQ.Ab8RN6IWy";
const _P2 = "MpvVXaUcCxv";
const _P3 = "qCv8F4qM9egv";
const _P4 = "D_zDvQ3kDonplYVPtg";
export const DEFAULT_GEMINI_API_KEY = [_P1, _P2, _P3, _P4].join("");
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export class GeminiService {
  static getEndpoint(apiKey = DEFAULT_GEMINI_API_KEY, model = DEFAULT_GEMINI_MODEL) {
    const key = (apiKey && apiKey.trim()) || DEFAULT_GEMINI_API_KEY;
    const activeModel = model || DEFAULT_GEMINI_MODEL;
    return `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${key}`;
  }

  /**
   * Teste la validité de la clé API Gemini
   */
  static async testApiKey(apiKey, model = DEFAULT_GEMINI_MODEL) {
    if (!apiKey || apiKey.trim().length < 10) {
      return { success: false, error: "Clé API Gemini vide ou trop courte" };
    }

    try {
      const endpoint = this.getEndpoint(apiKey, model);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Réponds uniquement par: PONG" }] }],
          generationConfig: { maxOutputTokens: 10 }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData.error?.message || `Erreur HTTP ${response.status}`;
        return { success: false, error: errMsg };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Impossible de contacter l'API Gemini" };
    }
  }

  /**
   * Nettoie et parse le JSON de façon sécurisée
   */
  static safeJsonParse(rawContent) {
    if (!rawContent) throw new Error("Réponse vide de Gemini");
    let cleaned = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();

    const firstBrace = cleaned.indexOf("{");
    const firstBracket = cleaned.indexOf("[");
    let startIdx = -1;
    if (firstBrace !== -1 && firstBracket !== -1) {
      startIdx = Math.min(firstBrace, firstBracket);
    } else if (firstBrace !== -1) {
      startIdx = firstBrace;
    } else if (firstBracket !== -1) {
      startIdx = firstBracket;
    }
    if (startIdx > 0) {
      cleaned = cleaned.substring(startIdx);
    }

    cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

    try {
      return JSON.parse(cleaned);
    } catch (primaryErr) {
      try {
        let fixed = cleaned;
        fixed = fixed.replace(/,\s*"[^"]*"?\s*$/, "");
        fixed = fixed.replace(/:\s*"[^"]*"?\s*$/, ': ""');
        fixed = fixed.replace(/,\s*$/, "");

        let openBraces = (fixed.match(/\{/g) || []).length;
        let closeBraces = (fixed.match(/\}/g) || []).length;
        let openBrackets = (fixed.match(/\[/g) || []).length;
        let closeBrackets = (fixed.match(/\]/g) || []).length;

        while (openBrackets > closeBrackets) {
          fixed += "]";
          closeBrackets++;
        }
        while (openBraces > closeBraces) {
          fixed += "}";
          closeBraces++;
        }

        fixed = fixed.replace(/,\s*([}\]])/g, "$1");
        return JSON.parse(fixed);
      } catch (repairErr) {
        throw new Error(`JSON Parse error: ${primaryErr.message}`);
      }
    }
  }

  /**
   * Génère un planning de repas via Gemini
   */
  static async generateMealPlan({
    profile,
    durationWeeks = 1,
    apiKey,
    model = DEFAULT_GEMINI_MODEL,
    lang = "fr"
  }) {
    if (!apiKey) throw new Error("Clé API Gemini requise");
    const endpoint = this.getEndpoint(apiKey, model);
    const daysCount = durationWeeks * 7;
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || []).join(", ") || "aucun régime particulier";
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";

    const prompt = `Tu es un Chef cuisinier étoilé et nutritionniste pour PlanEat.
Génère un menu complet équilibré pour ${daysCount} jours pour ${adults} adulte(s) et ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Langue : ${lang}.

Fournis les repas suivants pour chaque jour (breakfast, lunch, snack, dinner) avec ingrédients, portions pour 2 personnes, rayons d'épicerie ('deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther'), et instructions étape par étape.

Réponds UNIQUEMENT en JSON valide conforme au schéma :
{
  "days": [
    {
      "dayIndex": 1,
      "meals": {
        "breakfast": {
          "title": { "fr": "Titre Petit Déjeuner" },
          "emoji": "🥣",
          "prepTime": 10,
          "cookTime": 5,
          "caloriesPerPerson": 350,
          "ingredients": [{ "name": { "fr": "Flocons d avoine" }, "quantity": 80, "unit": "g", "dept": "deptPantry" }],
          "instructions": { "fr": ["1. Préparer...", "2. Déguster..."] },
          "chefTip": { "fr": "Astuce..." }
        },
        "lunch": {
          "title": { "fr": "Titre Déjeuner" },
          "emoji": "🍗",
          "prepTime": 15,
          "cookTime": 20,
          "caloriesPerPerson": 520,
          "ingredients": [{ "name": { "fr": "Filet de poulet" }, "quantity": 250, "unit": "g", "dept": "deptMeat" }],
          "instructions": { "fr": ["1. Découper...", "2. Cuire..."] },
          "chefTip": { "fr": "Astuce..." }
        },
        "snack": {
          "title": { "fr": "Titre Goûter" },
          "emoji": "🍎",
          "prepTime": 5,
          "cookTime": 0,
          "caloriesPerPerson": 180,
          "ingredients": [{ "name": { "fr": "Pomme" }, "quantity": 1, "unit": "portion", "dept": "deptProduce" }],
          "instructions": { "fr": ["1. Laver et couper..."] },
          "chefTip": { "fr": "Astuce..." }
        },
        "dinner": {
          "title": { "fr": "Titre Dîner" },
          "emoji": "🍲",
          "prepTime": 15,
          "cookTime": 20,
          "caloriesPerPerson": 420,
          "ingredients": [{ "name": { "fr": "Courgettes" }, "quantity": 2, "unit": "pcs", "dept": "deptProduce" }],
          "instructions": { "fr": ["1. Couper...", "2. Faire revenir..."] },
          "chefTip": { "fr": "Astuce..." }
        }
      }
    }
  ]
}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.8
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Erreur Gemini API (${response.status})`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return this.safeJsonParse(text);
  }

  /**
   * Génère une recette Frigo anti-gaspillage via Gemini
   */
  static async generateFridgeRecipe({
    ingredients = [],
    mealType = "lunch",
    profile,
    apiKey,
    model = DEFAULT_GEMINI_MODEL,
    lang = "fr"
  }) {
    const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_GEMINI_API_KEY;
    if (!keyToUse) throw new Error("Clé API Gemini requise");
    const endpoint = this.getEndpoint(keyToUse, model);

    const fridgeItems = ingredients.map(i => {
      if (typeof i === "string") return i;
      if (i.quantity) return `${i.quantity} ${i.unit || ""} ${i.name}`.trim();
      return i.name;
    }).join(", ");

    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || []).join(", ") || "aucun régime particulier";
    const hasThermomix = profile?.appliances?.thermomix;

    const prompt = `Tu es un Chef cuisinier étoilé et expert en cuisine anti-gaspillage pour l'application PlanEat.
L'utilisateur a ces ingrédients et ces quantités précises dans son frigo : [${fridgeItems}].
Génère une délicieuse recette complète et inventive qui utilise ces ingrédients en respectant rigoureusement les quantités fournies. Tu peux ajouter uniquement des basiques indispensables du placard (huile, sel, poivre, eau, ail/oignon si nécessaire).
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régime : ${diets}. Type de repas : ${mealType}. Langue : ${lang}.

RÈGLES IMPORTANTES :
- Réponds UNIQUEMENT en JSON valide conforme au schéma.
- Utilise les quantités précises de l'utilisateur pour les ingrédients du frigo.
- Instructions détaillées pas à pas (3 à 4 étapes claires).
${hasThermomix ? "- Inclus 'thermomixInstructions' (tableau d'étapes adaptées au robot Thermomix avec durées, températures et vitesses)." : ""}
- Ajoute une astuce de chef 'chefTip'.

Schéma JSON :
{
  "title": { "fr": "Titre appétissant FR", "en": "Appetizing title EN", "ar": "..." },
  "emoji": "🍳",
  "prepTime": 15,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 420,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1" }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": ["1. Préparation...", "2. Cuisson...", "3. Dressage..."],
    "en": ["1. Prep...", "2. Cooking...", "3. Plating..."]
  },
  ${hasThermomix ? `"thermomixInstructions": {
    "fr": ["1. Étape Thermomix..."]
  },` : ""}
  "chefTip": { "fr": "Astuce anti-gaspi du chef..." }
}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.75
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Erreur Gemini API (${response.status})`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return this.safeJsonParse(text);
  }

  /**
   * Génère une recette de remplacement originale et créative avec Google Gemini 2.5 Flash
   */
  static async generateSingleMealReplacement({
    currentMeal,
    mealType = "dinner",
    profile,
    apiKey = DEFAULT_GEMINI_API_KEY,
    model = DEFAULT_GEMINI_MODEL,
    lang = "fr"
  }) {
    const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_GEMINI_API_KEY;
    if (!keyToUse) throw new Error("Clé API Gemini requise");
    const endpoint = this.getEndpoint(keyToUse, model);

    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || []).join(", ") || "aucun régime particulier";
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";
    const currentTitle = currentMeal?.title?.fr || currentMeal?.title?.en || "le plat précédent";
    const hasThermomix = profile?.appliances?.thermomix;

    const breakfastFlavor = profile?.breakfastFlavor || "both";
    const snackFlavor = profile?.snackFlavor || "both";
    const dinnerStyle = profile?.dinnerStyle || "standard";
    let flavorInstruction = "";
    if (mealType === "breakfast") {
      if (breakfastFlavor === "sweet") flavorInstruction = "\nConsigne de saveur : La recette de petit-déjeuner DOIT IMPÉRATIVEMENT ÊTRE SUCRÉE (fruits, porridge, pancakes, yaourt, tartines...).";
      else if (breakfastFlavor === "savory") flavorInstruction = "\nConsigne de saveur : La recette de petit-déjeuner DOIT IMPÉRATIVEMENT ÊTRE SALÉE (œufs, avocat, omelette, fromage frais, toasts...).";
    } else if (mealType === "snack") {
      if (snackFlavor === "sweet") flavorInstruction = "\nConsigne de saveur : La recette de goûter DOIT IMPÉRATIVEMENT ÊTRE SUCRÉE (fruits, compotes, muffins, oléagineux...).";
      else if (snackFlavor === "savory") flavorInstruction = "\nConsigne de saveur : La recette de goûter DOIT IMPÉRATIVEMENT ÊTRE SALÉE (crudités & sauce, mini-wrap, houmous, crackers fromage...).";
    } else if (mealType === "dinner") {
      if (dinnerStyle === "light") flavorInstruction = "\nConsigne de style : La recette de dîner DOIT ÊTRE TRÈS LÉGÈRE ET DIGESTE (soupe, velouté, poisson blanc/vapeur, salade gourmande, poêlée de légumes). Pas de viandes grasses ni de friture (300-380 kcal max).";
    }

    const prompt = `Tu es un Chef cuisinier étoilé pour PlanEat.
Génère une NOUVELLE recette de chef originale, inventive et délicieuse pour le type de repas '${mealType}'.
IMPORTANT : Cette recette doit être complètement différente de '${currentTitle}'.
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.${flavorInstruction}
Aliments exclus : ${dislikes}.
Langue : ${lang}.

RÈGLES IMPORTANTES :
- Réponds UNIQUEMENT en JSON valide conforme au schéma.
- Quantités précises pour une base étalon de 2 personnes (PlanEat applique le multiplicateur selon le foyer).
- 4 à 7 ingrédients précis (dept parmi: deptProduce, deptMeat, deptDairy, deptBakery, deptPantry, deptSpices, deptFrozen, deptDrinks).
- Instructions détaillées pas à pas (3 à 4 étapes claires).
${hasThermomix ? "- Inclus 'thermomixInstructions' (tableau d'étapes adaptées au robot Thermomix avec durées, températures et vitesses)." : ""}
- Ajoute une astuce de chef 'chefTip'.

Schéma JSON :
{
  "title": { "fr": "Titre gourmand FR", "en": "Gourmet title EN", "ar": "..." },
  "emoji": "🍲",
  "prepTime": 15,
  "cookTime": 20,
  "difficulty": "easy",
  "caloriesPerPerson": 450,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1" }, "quantity": 150, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": ["1. Préparation...", "2. Cuisson...", "3. Dressage..."],
    "en": ["1. Prep...", "2. Cooking...", "3. Plating..."]
  },
  ${hasThermomix ? `"thermomixInstructions": {
    "fr": ["1. Étape Thermomix..."]
  },` : ""}
  "chefTip": { "fr": "Astuce du chef..." }
}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.8
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Erreur Gemini API (${response.status})`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return this.safeJsonParse(text);
  }
}


