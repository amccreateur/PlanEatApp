/**
 * Google Gemini AI Service for PlanEat
 * Communicates with Google AI Studio Gemini 1.5 / 2.0 Flash REST API
 */

export const DEFAULT_GEMINI_MODEL = "gemini-1.5-flash";

export class GeminiService {
  static getEndpoint(apiKey, model = DEFAULT_GEMINI_MODEL) {
    const activeModel = model || DEFAULT_GEMINI_MODEL;
    return `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;
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
    if (!apiKey) throw new Error("Clé API Gemini requise");
    const endpoint = this.getEndpoint(apiKey, model);
    const fridgeItems = ingredients.join(", ");
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || []).join(", ") || "aucun régime particulier";

    const prompt = `Tu es un Chef cuisinier expert anti-gaspillage pour PlanEat.
Ingrédients disponibles : [${fridgeItems}].
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régime : ${diets}. Type de repas : ${mealType}. Langue : ${lang}.

Génère une recette créative et savoureuse au format JSON :
{
  "title": { "fr": "Titre de la recette" },
  "emoji": "🍳",
  "prepTime": 15,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 420,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1" }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": [
      "1. Préparer les ingrédients...",
      "2. Cuisson...",
      "3. Dressage..."
    ]
  },
  "chefTip": { "fr": "Astuce anti-gaspi..." }
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
}

