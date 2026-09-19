/**
 * Mistral AI Service for PlanEat
 * Communicates with the official Mistral REST API: https://api.mistral.ai/v1/chat/completions
 */

export class MistralService {
  static API_URL = "https://api.mistral.ai/v1/chat/completions";

  /**
   * Teste la validité de la clé API Mistral
   */
  static async testApiKey(apiKey) {
    if (!apiKey || apiKey.trim().length < 10) {
      return { success: false, error: "Clé API vide ou trop courte" };
    }

    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: [
            { role: "user", content: "Réponds uniquement par: PONG" }
          ],
          max_tokens: 10
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `Erreur HTTP ${response.status}`
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
   * Génère un planning complet de repas via Mistral AI
   */
  static async generateMealPlan({
    profile,
    durationWeeks = 1,
    apiKey,
    model = "mistral-small-latest",
    lang = "fr"
  }) {
    const daysCount = durationWeeks * 7;
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || ["dietBalanced"]).join(", ");
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";

    const prompt = `Tu es un chef cuisinier et nutritionniste expert pour l'application PlanEat.
Génère un menu structuré pour un foyer de ${adults} adulte(s) et ${children} enfant(s) sur ${daysCount} jours (${durationWeeks} semaine(s)).
Régimes et préférences : ${diets}.
Aliments strictement exclus ou non aimés : ${dislikes}.
Langue principale demandée : ${lang}.

RÈGLES IMPORTANTES :
1. Réponds STRICTEMENT avec un objet JSON valide, sans texte d'introduction ni balises superflues.
2. Pour chaque jour (de day_1 à day_${daysCount}), fournis les 4 repas : 'breakfast', 'lunch', 'snack', 'dinner'.
3. Les rayons (dept) d'ingrédients doivent être exactement l'une de ces valeurs : 'deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther'.
4. Les quantités d'ingrédients doivent être exprimées pour 2 portions de base (l'application adaptera automatiquement au nombre de personnes).
5. Fournis un emoji pertinent pour chaque repas.

Format JSON attendu :
{
  "days": [
    {
      "dayIndex": 1,
      "meals": {
        "breakfast": {
          "title": { "fr": "Titre FR", "en": "Title EN", "ar": "العنوان" },
          "emoji": "🥣",
          "prepTime": 10,
          "cookTime": 5,
          "difficulty": "easy",
          "caloriesPerPerson": 350,
          "ingredients": [
            { "name": { "fr": "Flocons d'avoine", "en": "Oats", "ar": "شوفان" }, "quantity": 60, "unit": "g", "dept": "deptPantry" }
          ],
          "instructions": {
            "fr": ["Étape 1...", "Étape 2..."],
            "en": ["Step 1...", "Step 2..."],
            "ar": ["خطوة 1...", "خطوة 2..."]
          }
        },
        "lunch": { ... },
        "snack": { ... },
        "dinner": { ... }
      }
    }
  ]
}`;

    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: model || "mistral-small-latest",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant de planification de repas gastronomique et familial. Tu réponds exclusivement en JSON valide."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erreur Mistral API: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Réponse vide de l'API Mistral");
    }

    const cleanedJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedJson);
    return parsed;
  }

  /**
   * Génère une alternative créative pour un seul repas via Mistral AI
   */
  static async swapSingleMeal({
    currentMeal,
    mealType,
    profile,
    apiKey,
    model = "mistral-small-latest",
    lang = "fr"
  }) {
    const adults = profile?.adults || 2;
    const children = profile?.children || 0;
    const diets = (profile?.diets || ["dietBalanced"]).join(", ");
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";
    const currentTitle = currentMeal?.title?.fr || currentMeal?.title?.en || "le plat précédent";

    const prompt = `Génère une NOUVELLE recette de substitution pour le type de repas '${mealType}', différente de '${currentTitle}'.
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Langue : ${lang}.

RÈGLES :
- Réponds STRICTEMENT en JSON avec une seule recette.
- dept autorisés : 'deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther'.
- Quantités données pour 2 portions de base.

Format JSON attendu :
{
  "title": { "fr": "...", "en": "...", "ar": "..." },
  "emoji": "🍲",
  "prepTime": 15,
  "cookTime": 20,
  "difficulty": "easy",
  "caloriesPerPerson": 450,
  "ingredients": [
    { "name": { "fr": "...", "en": "...", "ar": "..." }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": ["..."],
    "en": ["..."],
    "ar": ["..."]
  }
}`;

    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: model || "mistral-small-latest",
        messages: [
          { role: "system", content: "Tu es un chef cuisinier. Réponds uniquement en JSON valide." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur Mistral API: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const cleanedJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedJson);
  }
}

