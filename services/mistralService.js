/**
 * Mistral AI Service for PlanEat
 * Communicates with the official Mistral REST API / Codestral endpoint
 */

export const DEFAULT_MISTRAL_API_KEY = "oJZSFumYzCJu0mK054kieW9FiSo3qBiI";
export const DEFAULT_MISTRAL_MODEL = "codestral-latest";

export class MistralService {
  static getEndpoint(model) {
    if (model && (model.startsWith("codestral") || model.includes("codestral"))) {
      return "https://codestral.mistral.ai/v1/chat/completions";
    }
    return "https://api.mistral.ai/v1/chat/completions";
  }

  /**
   * Teste la validité de la clé API Mistral
   */
  static async testApiKey(apiKey, model = DEFAULT_MISTRAL_MODEL) {
    const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_MISTRAL_API_KEY;
    if (!keyToUse || keyToUse.length < 5) {
      return { success: false, error: "Clé API vide ou trop courte" };
    }

    const activeModel = model || DEFAULT_MISTRAL_MODEL;
    const endpoint = this.getEndpoint(activeModel);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${keyToUse.trim()}`
        },
        body: JSON.stringify({
          model: activeModel,
          messages: [
            { role: "user", content: "Réponds uniquement par: PONG" }
          ],
          max_tokens: 10
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData.detail || errorData.message || `Erreur HTTP ${response.status}`;
        return {
          success: false,
          error: typeof errMsg === "object" ? JSON.stringify(errMsg) : errMsg
        };
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Impossible de contacter l'API Mistral"
      };
    }
  }

  /**
   * Nettoie et parse le JSON de façon sécurisée (supprime les virgules traînantes et markdown)
   */
  static safeJsonParse(rawContent) {
    if (!rawContent) throw new Error("Réponse vide");
    let cleaned = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
    // Nettoyer les virgules traînantes avant les fermetures d'objets ou tableaux
    cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(cleaned);
  }

  /**
   * Génère un planning complet de repas via Mistral AI
   */
  static async generateMealPlan({
    profile,
    durationWeeks = 1,
    apiKey,
    model = DEFAULT_MISTRAL_MODEL,
    lang = "fr"
  }) {
    const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_MISTRAL_API_KEY;
    const activeModel = model || DEFAULT_MISTRAL_MODEL;
    const daysCount = durationWeeks * 7;
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || ["dietBalanced"]).join(", ");
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";

    // Découpage en blocs de 2 à 3 jours en parallèle (vitesse max, 0 erreur de tokens)
    const chunkSize = 3;
    const chunks = [];
    for (let i = 0; i < daysCount; i += chunkSize) {
      const startDay = i + 1;
      const endDay = Math.min(i + chunkSize, daysCount);
      chunks.push({ startDay, endDay });
    }

    const endpoint = this.getEndpoint(activeModel);

    const generateChunk = async ({ startDay, endDay }) => {
      const prompt = `Génère ${endDay - startDay + 1} jours de repas (du Jour ${startDay} au Jour ${endDay}, 4 repas par jour : breakfast, lunch, snack, dinner) pour ${adults} adulte(s) et ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Langue : ${lang}.

RÈGLES IMPORTANTES :
1. Réponds UNIQUEMENT avec un objet JSON valide.
2. Inclus 2 à 4 ingrédients par plat avec rayon ('deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther').
3. Instructions courtes (1 ou 2 phrases claires).

Format JSON attendu :
{
  "days": [
    {
      "dayIndex": ${startDay},
      "meals": {
        "breakfast": {
          "title": { "fr": "Bowl Avoine & Fruits" },
          "emoji": "🥣",
          "prepTime": 10,
          "cookTime": 0,
          "caloriesPerPerson": 350,
          "ingredients": [
            { "name": { "fr": "Flocons d'avoine" }, "quantity": 80, "unit": "g", "dept": "deptPantry" },
            { "name": { "fr": "Lait" }, "quantity": 150, "unit": "ml", "dept": "deptDairy" }
          ],
          "instructions": { "fr": ["Mélanger les ingrédients.", "Déguster frais."] }
        },
        "lunch": {
          "title": { "fr": "Salade César Poulet" },
          "emoji": "🥗",
          "prepTime": 15,
          "cookTime": 10,
          "caloriesPerPerson": 480,
          "ingredients": [
            { "name": { "fr": "Poulet" }, "quantity": 300, "unit": "g", "dept": "deptMeat" },
            { "name": { "fr": "Salade Romaine" }, "quantity": 1, "unit": "pcs", "dept": "deptProduce" }
          ],
          "instructions": { "fr": ["Cuire le poulet.", "Mélanger avec la salade et assaisonner."] }
        },
        "snack": {
          "title": { "fr": "Pomme & Amandes" },
          "emoji": "🍎",
          "prepTime": 5,
          "cookTime": 0,
          "caloriesPerPerson": 160,
          "ingredients": [{ "name": { "fr": "Pommes" }, "quantity": 2, "unit": "pcs", "dept": "deptProduce" }],
          "instructions": { "fr": ["Couper en tranches."] }
        },
        "dinner": {
          "title": { "fr": "Velouté de Courgettes" },
          "emoji": "🍲",
          "prepTime": 10,
          "cookTime": 20,
          "caloriesPerPerson": 310,
          "ingredients": [
            { "name": { "fr": "Courgettes" }, "quantity": 3, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Crème fraîche" }, "quantity": 50, "unit": "g", "dept": "deptDairy" }
          ],
          "instructions": { "fr": ["Cuire les courgettes et mixer avec la crème."] }
        }
      }
    }
  ]
}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${keyToUse.trim()}`
        },
        body: JSON.stringify({
          model: activeModel,
          messages: [
            { role: "system", content: "Tu es un chef cuisinier. Réponds uniquement en JSON valide." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 8192,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg = err.detail || err.message || `Erreur Mistral API (${response.status})`;
        throw new Error(typeof msg === "object" ? JSON.stringify(msg) : msg);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("Réponse vide de Mistral");
      return this.safeJsonParse(content);
    };

    const chunkResults = await Promise.all(chunks.map(c => generateChunk(c)));
    const allDays = chunkResults.flatMap(res => res.days || []);
    return { days: allDays };
  }

  /**
   * Génère une alternative créative pour un seul repas via Mistral AI
   */
  static async swapSingleMeal({
    currentMeal,
    mealType,
    profile,
    apiKey,
    model = DEFAULT_MISTRAL_MODEL,
    lang = "fr"
  }) {
    const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_MISTRAL_API_KEY;
    const activeModel = model || DEFAULT_MISTRAL_MODEL;
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || ["dietBalanced"]).join(", ");
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";
    const currentTitle = currentMeal?.title?.fr || currentMeal?.title?.en || "le plat précédent";

    const prompt = `Génère une NOUVELLE recette de substitution pour le type de repas '${mealType}', différente de '${currentTitle}'.
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Langue principale : ${lang}.

RÈGLES IMPORTANTES :
- Réponds UNIQUEMENT en JSON valide.
- dept autorisés : 'deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther'.
- Quantités données pour 2 portions de base.

Format JSON attendu :
{
  "title": { "fr": "Nouveau Titre FR", "en": "New Title EN", "ar": "العنوان الجديد" },
  "emoji": "🍲",
  "prepTime": 15,
  "cookTime": 20,
  "difficulty": "easy",
  "caloriesPerPerson": 450,
  "ingredients": [
    { "name": { "fr": "Ingrédient", "en": "Ingredient", "ar": "مكون" }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": ["..."],
    "en": ["..."],
    "ar": ["..."]
  }
}`;

    const endpoint = this.getEndpoint(activeModel);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${keyToUse.trim()}`
      },
      body: JSON.stringify({
        model: activeModel,
        messages: [
          { role: "system", content: "Tu es un chef cuisinier. Réponds uniquement en JSON valide." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = err.detail || err.message || `Erreur Mistral API (${response.status})`;
      throw new Error(typeof msg === "object" ? JSON.stringify(msg) : msg);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    return this.safeJsonParse(content);
  }

  /**
   * Génère une recette anti-gaspillage à partir d'ingrédients du frigo
   */
  static async generateFridgeRecipe({
    ingredients = [],
    mealType = "lunch",
    profile,
    apiKey,
    model = DEFAULT_MISTRAL_MODEL,
    lang = "fr"
  }) {
    const keyToUse = (apiKey && apiKey.trim()) || DEFAULT_MISTRAL_API_KEY;
    const activeModel = model || DEFAULT_MISTRAL_MODEL;
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || ["dietBalanced"]).join(", ");
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";
    const fridgeItems = ingredients.join(", ");

    const prompt = `Tu es un chef cuisinier expert en cuisine anti-gaspillage pour PlanEat.
L'utilisateur a ces ingrédients dans son réfrigérateur/placard : [${fridgeItems}].
Génère une recette délicieuse, inventive et facile qui utilise au maximum ces ingrédients (en ajoutant si besoin uniquement des basiques de cuisine comme sel, poivre, huile, eau).
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Type de repas : ${mealType}.
Langue principale : ${lang}.

RÈGLES STRICTES :
- Réponds UNIQUEMENT en JSON valide.
- dept autorisés : 'deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther'.
- Quantités données pour 2 portions de base.

Format JSON attendu :
{
  "title": { "fr": "Titre en français", "en": "English title", "ar": "العنوان بالعربية" },
  "emoji": "🍳",
  "prepTime": 15,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 420,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1", "ar": "مكون 1" }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": ["Étape 1...", "Étape 2..."],
    "en": ["Step 1...", "Step 2..."],
    "ar": ["خطوة 1...", "خطوة 2..."]
  }
} `;

    const endpoint = this.getEndpoint(activeModel);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${keyToUse.trim()}`
      },
      body: JSON.stringify({
        model: activeModel,
        messages: [
          { role: "system", content: "Tu es un chef cuisinier anti-gaspillage. Réponds uniquement en JSON valide." },
          { role: "user", content: prompt }
        ],
        temperature: 0.75,
        max_tokens: 1800,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = err.detail || err.message || `Erreur Mistral API (${response.status})`;
      throw new Error(typeof msg === "object" ? JSON.stringify(msg) : msg);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    return this.safeJsonParse(content);
  }
}
