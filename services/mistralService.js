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

    const cuisinesMap = {
      oriental: "Orientale & Maghrébine (Couscous, Tajines, Kefta, Pastilla, Zaalouk, Épices douces...)",
      asian: "Asiatique & Wok (Pad Thaï, Riz sauté, Wok légumes, Teriyaki, Currys coco...)",
      italian: "Italienne & Méditerranée (Pastas fraîches, Risotto, Pesto, Lasagnes, Tomates séchées...)",
      french: "Française & Terroir (Gratins, Quiches, Poêlées terroir, Blanquettes, Mijotés...)",
      mexican: "Mexicaine & Tex-Mex (Fajitas, Tacos, Guacamole, Quesadillas, Chili doux...)",
      indian: "Indienne & Épicée (Tikka Masala, Dahl lentilles corail, Butter Chicken, Naans...)",
      streetfood: "Street Food & Rapide Maison (Burgers gourmets maison, Wraps croustillants, Bowls...)"
    };

    const cuisineLevels = [];
    if (profile?.cuisines) {
      Object.entries(profile.cuisines).forEach(([key, lvl]) => {
        const name = cuisinesMap[key] || key;
        if (lvl === 3) cuisineLevels.push(`- ${name} : ⭐ PRIORITAIRE (Préparer un maximum de repas dans ce style)`);
        else if (lvl === 2) cuisineLevels.push(`- ${name} : FRÉQUENT (Régulièrement au menu)`);
        else if (lvl === 1) cuisineLevels.push(`- ${name} : MODÉRÉ (De temps en temps)`);
        else if (lvl === 0) cuisineLevels.push(`- ${name} : ❌ EXCLU (Ne pas proposer de plats de ce style)`);
      });
    }
    const cuisinesText = cuisineLevels.length > 0 ? cuisineLevels.join("\n") : "Cuisines variées et équilibrées";

    const activeAppliances = [];
    if (profile?.appliances?.thermomix) activeAppliances.push("Thermomix / Robot Cuiseur (fournir impérativement 'thermomixInstructions' avec durée, température en °C/Varoma, vitesse, sens inverse 🔄)");
    if (profile?.appliances?.airfryer) activeAppliances.push("Airfryer / Friteuse sans huile");
    if (profile?.appliances?.cookeo) activeAppliances.push("Cookeo / Multicuiseur sous pression");
    const appliancesText = activeAppliances.length > 0 ? `\nÉquipements de cuisine disponibles :\n${activeAppliances.map(a => `- ${a}`).join("\n")}` : "";

    // Découpage en blocs de 2 jours en parallèle pour une richesse maximale de chaque recette
    const chunkSize = 2;
    const chunks = [];
    for (let i = 0; i < daysCount; i += chunkSize) {
      const startDay = i + 1;
      const endDay = Math.min(i + chunkSize, daysCount);
      chunks.push({ startDay, endDay });
    }

    const endpoint = this.getEndpoint(activeModel);

    const generateChunk = async ({ startDay, endDay }) => {
      const prompt = `Tu es un Chef cuisinier étoilé et nutritionniste passionné.
Génère un menu gourmand et équilibré pour ${endDay - startDay + 1} jours (du Jour ${startDay} au Jour ${endDay}, avec 4 repas complets par jour : breakfast, lunch, snack, dinner) pour ${adults} adulte(s) et ${children} enfant(s).
Régimes & Objectifs Santé : ${diets}.
Préférences Gastronomiques & Curseurs Culinaires :
${cuisinesText}${appliancesText}
Aliments à exclure impérativement : ${dislikes}.
Langue : ${lang}.

EXIGENCES CULINAIRES DE HAUTE QUALITÉ :
1. Respecte scrupuleusement les curseurs de cuisines (les gastronomies notées 'PRIORITAIRE' doivent être largement représentées, les 'EXCLU' ne doivent jamais apparaître).
2. Titres gourmands, précis et appétissants (ex: "Tajine de poulet aux olives et citrons confits", "Pad Thaï sauté aux crevettes et cacahuètes", "Risotto crémeux aux asperges").
3. Ingrédients complets (4 à 7 ingrédients réalistes par plat principal : protéine, féculent, légume, herbe/épice, matière grasse).
4. Rayons autorisés ('deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther').
5. Instructions détaillées ÉTAPE PAR ÉTAPE (3 à 4 étapes précises avec découpe, temps de cuisson, puissance du feu, assaisonnement et dressage).
${profile?.appliances?.thermomix ? "6. ROBOT CUISEUR / THERMOMIX : Fournis impérativement pour chaque recette un bloc 'thermomixInstructions' (tableau d'étapes détaillées adaptées avec durées, températures ex: 100°C ou Varoma, vitesses ex: Vit. 1 / Sens Inverse 🔄)." : ""}
7. Ajoute une astuce de chef 'chefTip' pour sublimer le plat.

Format JSON attendu :
{
  "days": [
    {
      "dayIndex": ${startDay},
      "meals": {
        "breakfast": {
          "title": { "fr": "Bowl Énergétique Avoine, Banane & Beurre de Cacahuète", "en": "Energy Oatmeal Bowl with Banana & Peanut Butter", "ar": "وعاء الشوفان والموز وزبدة الفول السوداني" },
          "emoji": "🥣",
          "prepTime": 8,
          "cookTime": 5,
          "caloriesPerPerson": 380,
          "ingredients": [
            { "name": { "fr": "Flocons d'avoine" }, "quantity": 80, "unit": "g", "dept": "deptPantry" },
            { "name": { "fr": "Lait d'amande ou demi-écrémé" }, "quantity": 180, "unit": "ml", "dept": "deptDairy" },
            { "name": { "fr": "Banane" }, "quantity": 1, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Beurre de cacahuète" }, "quantity": 20, "unit": "g", "dept": "deptPantry" },
            { "name": { "fr": "Graines de chia" }, "quantity": 10, "unit": "g", "dept": "deptPantry" }
          ],
          "instructions": {
            "fr": [
              "Faire chauffer le lait avec les flocons d'avoine à feu moyen pendant 4 à 5 min en remuant régulièrement jusqu'à obtenir une texture crémeuse.",
              "Verser le porridge chaud dans un bol.",
              "Couper la banane en rondelles et la disposer harmonieusement sur le dessus.",
              "Ajouter une belle cuillère de beurre de cacahuète et saupoudrer de graines de chia avant de déguster."
            ]
          },
          "chefTip": { "fr": "Ajoutez une pointe de cannelle moulue pour rehausser naturellement la douceur sans sucre ajouté." }
        },
        "lunch": {
          "title": { "fr": "Filet de Poulet Mariné au Citron, Tagliatelles & Courgettes Grillées", "en": "Lemon Marinated Chicken Breast, Tagliatelle & Grilled Zucchini", "ar": "صدر دجاج متبل بالليمون مع المعكرونة والكوسا" },
          "emoji": "🍗",
          "prepTime": 15,
          "cookTime": 15,
          "caloriesPerPerson": 520,
          "ingredients": [
            { "name": { "fr": "Filets de poulet" }, "quantity": 300, "unit": "g", "dept": "deptMeat" },
            { "name": { "fr": "Tagliatelles fraîches" }, "quantity": 200, "unit": "g", "dept": "deptPantry" },
            { "name": { "fr": "Courgettes" }, "quantity": 2, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Citron jaune" }, "quantity": 1, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Huile d'olive vierge" }, "quantity": 2, "unit": "c.à.s", "dept": "deptPantry" },
            { "name": { "fr": "Gousses d'ail" }, "quantity": 1, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Parmesan râpé" }, "quantity": 30, "unit": "g", "dept": "deptDairy" }
          ],
          "instructions": {
            "fr": [
              "Émincer le poulet en aiguillettes et le faire mariner 10 min avec le jus d'un demi-citron, une gousse d'ail pressée et 1 c.à.s d'huile d'olive.",
              "Laver les courgettes et les tailler en fines demi-rondelles.",
              "Dans une grande poêle bien chaude, faire dorer le poulet 6 à 8 min à feu vif, puis ajouter les courgettes et cuire 5 min de plus.",
              "Faire cuire les tagliatelles 'al dente' dans de l'eau bouillante salée, les égoutter en gardant 2 c.à.s d'eau de cuisson.",
              "Mélanger les pâtes au poulet et courgettes, lier avec l'eau de cuisson et saupoudrer de parmesan frais."
            ]
          },
          ${profile?.appliances?.thermomix ? `"thermomixInstructions": {
            "fr": [
              "Mettre l'ail et un demi-citron pelé dans le bol : 5 sec / Vit. 5. Racler.",
              "Ajouter l'huile d'olive et le poulet émincé : 5 min / 120°C / Vit. Cuillère 🔄.",
              "Insérer le fouet, ajouter les courgettes en rondelles : 8 min / 100°C / Vit. Cuillère 🔄.",
              "Servir sur les tagliatelles cuites à part et saupoudrer de parmesan."
            ]
          },` : ""}
          "chefTip": { "fr": "Conservez toujours un peu d'eau de cuisson des pâtes pour émulsionner la sauce et rendre le plat ultra-onctueux." }
        },
        "snack": {
          "title": { "fr": "Tartine Toastée Ricotta, Miel & Éclats de Noix", "en": "Toasted Ricotta, Honey & Walnut Toast", "ar": "توست الريكوتا مع العسل والجوز" },
          "emoji": "🍞",
          "prepTime": 5,
          "cookTime": 3,
          "caloriesPerPerson": 210,
          "ingredients": [
            { "name": { "fr": "Pain complet ou de campagne" }, "quantity": 2, "unit": "tranches", "dept": "deptBakery" },
            { "name": { "fr": "Ricotta fraîche" }, "quantity": 60, "unit": "g", "dept": "deptDairy" },
            { "name": { "fr": "Miel liquide" }, "quantity": 1, "unit": "c.à.c", "dept": "deptPantry" },
            { "name": { "fr": "Noix concassées" }, "quantity": 15, "unit": "g", "dept": "deptPantry" }
          ],
          "instructions": {
            "fr": [
              "Faire griller les tranches de pain au grille-pain jusqu'à ce qu'elles soient bien dorées et croustillantes.",
              "Tartiner généreusement de ricotta fraîche.",
              "Napper d'un filet de miel et parsemer d'éclats de noix croquants."
            ]
          },
          "chefTip": { "fr": "Un tour de moulin à poivre noir sur la ricotta crée un contraste sucré-salé irrésistible." }
        },
        "dinner": {
          "title": { "fr": "Velouté Onctueux de Potimarron au Lait de Coco & Graines Grillées", "en": "Creamy Pumpkin Coconut Soup with Toasted Seeds", "ar": "شوربة القرع الكريمية بحليب جوز الهند" },
          "emoji": "🍲",
          "prepTime": 15,
          "cookTime": 25,
          "caloriesPerPerson": 340,
          "ingredients": [
            { "name": { "fr": "Potimarron ou courge butternut" }, "quantity": 600, "unit": "g", "dept": "deptProduce" },
            { "name": { "fr": "Lait de coco" }, "quantity": 150, "unit": "ml", "dept": "deptPantry" },
            { "name": { "fr": "Oignon jaune" }, "quantity": 1, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Bouillon de légumes" }, "quantity": 500, "unit": "ml", "dept": "deptPantry" },
            { "name": { "fr": "Graines de courge" }, "quantity": 20, "unit": "g", "dept": "deptPantry" },
            { "name": { "fr": "Huile d'olive" }, "quantity": 1, "unit": "c.à.s", "dept": "deptPantry" }
          ],
          "instructions": {
            "fr": [
              "Éplucher et émincer l'oignon. Couper le potimarron en dés réguliers (inutile d'éplucher si potimarron bio).",
              "Dans une cocotte, faire suer l'oignon dans l'huile d'olive 3 min, puis ajouter les dés de potimarron.",
              "Couvrir avec le bouillon de légumes chaud, porter à ébullition puis laisser mijoter 20 min à feu moyen.",
              "Mixer finement le velouté au mixeur plongeant en incorporant le lait de coco.",
              "Faire torréfier à sec les graines de courge dans une poêle 2 min et parsemer au moment de servir."
            ]
          },
          ${profile?.appliances?.thermomix ? `"thermomixInstructions": {
            "fr": [
              "Mettre l'oignon coupé en 2 dans le bol : 5 sec / Vit. 5. Racler.",
              "Ajouter l'huile d'olive : 3 min / 120°C / Vit. 1.",
              "Ajouter les dés de potimarron et le bouillon : 20 min / 100°C / Vit. 1.",
              "Ajouter le lait de coco : mixer 1 min / Vit. 5 à 10 progressivement en maintenant le gobelet doseur."
            ]
          },` : ""}
          "chefTip": { "fr": "Une pincée de muscade ou de gingembre frais râpé sublime la saveur douce de la courge." }
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
            { role: "system", content: "Tu es un chef cuisinier professionnel et pédagogue. Tu génères des recettes précises, complètes et savoureuses. Réponds uniquement en JSON valide." },
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
    const hasThermomix = profile?.appliances?.thermomix;

    const prompt = `Tu es un Chef cuisinier étoilé. Génère une NOUVELLE recette de chef détaillée et savoureuse pour le type de repas '${mealType}', originale et différente de '${currentTitle}'.
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Langue principale : ${lang}.

RÈGLES DE QUALITÉ :
- Réponds UNIQUEMENT en JSON valide.
- Inclus 4 à 7 ingrédients précis (avec nom, quantité pour 2 personnes, unité, dept parmi 'deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther').
- Instructions détaillées étape par étape (3 à 5 étapes claires avec découpe, cuisson, température et dressage).
${hasThermomix ? "- Inclus impérativement 'thermomixInstructions' (tableau d'étapes adaptées au robot Thermomix avec durées, températures et vitesses)." : ""}
- Ajoute une astuce du chef 'chefTip'.

Format JSON attendu :
{
  "title": { "fr": "Titre Gourmand FR", "en": "Gourmet Title EN", "ar": "العنوان بالعربية" },
  "emoji": "🍲",
  "prepTime": 15,
  "cookTime": 20,
  "difficulty": "easy",
  "caloriesPerPerson": 480,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1", "ar": "مكون 1" }, "quantity": 200, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": [
      "Étape 1 : Préparation et découpe des ingrédients...",
      "Étape 2 : Cuisson à feu moyen / vif...",
      "Étape 3 : Assaisonnement et finition...",
      "Étape 4 : Dressage et dégustation..."
    ],
    "en": ["Step 1...", "Step 2...", "Step 3...", "Step 4..."],
    "ar": ["خطوة 1...", "خطوة 2...", "خطوة 3...", "خطوة 4..."]
  },
  ${hasThermomix ? `"thermomixInstructions": {
    "fr": [
      "1. Étape Thermomix (ex: hacher ail et oignons : 5 sec / Vit. 5)...",
      "2. Étape Thermomix (ex: rissoler : 3 min / 120°C / Vit. 1 🔄)...",
      "3. Étape Thermomix (ex: cuisson : 15 min / 100°C / Vit. Cuillère 🔄)..."
    ]
  },` : ""}
  "chefTip": { "fr": "Conseil de chef pour réussir ce plat..." }
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
        max_tokens: 2500,
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
    const hasThermomix = profile?.appliances?.thermomix;

    const prompt = `Tu es un Chef cuisinier expert en cuisine anti-gaspillage créative pour PlanEat.
L'utilisateur a ces ingrédients dans son réfrigérateur/placard : [${fridgeItems}].
Génère une recette complète, délicieuse et inventive qui met en valeur ces ingrédients en ajoutant des basiques simples du placard si nécessaire (huile, ail, oignon, sel, poivre, épices).
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.
Exclusions : ${dislikes}.
Type de repas : ${mealType}.
Langue principale : ${lang}.

RÈGLES STRICTES DE QUALITÉ :
- Réponds UNIQUEMENT en JSON valide.
- Inclus 4 à 7 ingrédients précis avec quantité pour 2 personnes et rayon.
- Instructions détaillées étape par étape (3 à 4 étapes complètes de préparation et cuisson).
${hasThermomix ? "- Inclus impérativement 'thermomixInstructions' (tableau d'étapes adaptées au robot Thermomix avec durées, températures et vitesses)." : ""}
- Ajoute une astuce anti-gaspi du chef 'chefTip'.

Format JSON attendu :
{
  "title": { "fr": "Titre appétissant FR", "en": "Appetizing Title EN", "ar": "العنوان بالعربية" },
  "emoji": "🍳",
  "prepTime": 15,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 420,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1", "ar": "مكون 1" }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": [
      "Étape 1 : Préparer et tailler les ingrédients...",
      "Étape 2 : Cuisson et assaisonnement...",
      "Étape 3 : Finition et dressage..."
    ],
    "en": ["Step 1...", "Step 2...", "Step 3..."],
    "ar": ["خطوة 1...", "خطوة 2...", "خطوة 3..."]
  },
  ${hasThermomix ? `"thermomixInstructions": {
    "fr": [
      "1. Étape Thermomix (ex: 5 sec / Vit. 5)...",
      "2. Étape Thermomix (ex: 10 min / 100°C / Vit. 1 🔄)..."
    ]
  },` : ""}
  "chefTip": { "fr": "Astuce anti-gaspillage du chef..." }
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
          { role: "system", content: "Tu es un chef cuisinier anti-gaspillage. Réponds uniquement en JSON valide." },
          { role: "user", content: prompt }
        ],
        temperature: 0.75,
        max_tokens: 2500,
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
