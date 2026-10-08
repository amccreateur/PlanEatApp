/**
 * Mistral AI Service for PlanEat
 * Communicates with the official Mistral REST API / Codestral endpoint
 */

export const DEFAULT_MISTRAL_API_KEY = "";
export const DEFAULT_MISTRAL_MODEL = "mistral-small-latest";

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
   * Nettoie et parse le JSON de façon sécurisée (avec auto-réparation en cas de troncature)
   */
  static safeJsonParse(rawContent) {
    if (!rawContent) throw new Error("Réponse vide");
    let cleaned = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();

    // Extraire uniquement le bloc JSON principal si du texte précède
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

    // Nettoyer les virgules traînantes avant les fermetures d'objets ou tableaux
    cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

    try {
      return JSON.parse(cleaned);
    } catch (primaryErr) {
      // Tentative d'auto-réparation si la réponse a été coupée / tronquée par l'API
      try {
        let fixed = cleaned;
        // Supprimer une clé ou une chaîne inachevée à la fin
        fixed = fixed.replace(/,\s*"[^"]*"?\s*$/, "");
        fixed = fixed.replace(/:\s*"[^"]*"?\s*$/, ': ""');
        fixed = fixed.replace(/,\s*$/, "");

        // Compter et équilibrer les accolades et crochets
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
    const diets = (profile?.diets || []).join(", ") || "aucun régime particulier";
    const dislikes = (profile?.dislikedFoods || []).join(", ") || "aucun";

    const cuisinesMap = {
      french: "Française & Terroir (Gratins, Quiches, Poêlées terroir, Blanquettes, Mijotés...)",
      italian: "Italienne & Méditerranée (Pastas fraîches, Risotto, Pesto, Lasagnes, Tomates séchées...)",
      oriental: "Orientale & Maghrébine (Couscous, Tajines, Kefta, Pastilla, Zaalouk, Épices douces...)",
      asian: "Asiatique & Wok (Pad Thaï, Riz sauté, Wok légumes, Teriyaki, Currys coco...)",
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

    const activeMealTypes = profile?.mealTypes && profile.mealTypes.length > 0
      ? profile.mealTypes
      : ["breakfast", "lunch", "snack", "dinner"];
    const mealTypesNames = activeMealTypes.join(", ");

    const breakfastFlavor = profile?.breakfastFlavor || "both";
    const snackFlavor = profile?.snackFlavor || "both";
    const flavorRules = [];
    if (activeMealTypes.includes("breakfast")) {
      if (breakfastFlavor === "sweet") {
        flavorRules.push("🔴 RÈGLE ABSOLUE PETIT-DÉJEUNER 100% SUCRÉ : Chaque jour, le petit-déjeuner DOIT OBLIGATOIREMENT être SUCRÉ (pancakes, bowl avoine & fruits, granola au miel, yaourt grec & coulis, smoothie bowl, tartines confiture/beurre/miel, pain perdu aux fruits). INTERDICTION FORMELLE d'inclure des œufs, de la volaille, du poulet, du poisson, de la viande, du fromage salé ou de l'avocat au petit-déjeuner !");
      } else if (breakfastFlavor === "savory") {
        flavorRules.push("🔴 RÈGLE ABSOLUE PETIT-DÉJEUNER 100% SALÉ : Chaque jour, le petit-déjeuner DOIT OBLIGATOIREMENT être SALÉ (œufs brouillés/pochés, toast avocat & œuf, omelette aux herbes & fromage frais, bagel saumon, toasts salés). INTERDICTION FORMELLE d'inclure du sucre, miel, confiture, chocolat ou gâteaux !");
      } else {
        flavorRules.push("🔵 PETIT-DÉJEUNER MIXTE : Alterner jours sucrés et jours salés selon les jours.");
      }
    }
    if (activeMealTypes.includes("snack")) {
      if (snackFlavor === "sweet") {
        flavorRules.push("🔴 RÈGLE ABSOLUE GOÛTER 100% SUCRÉ : Le goûter DOIT OBLIGATOIREMENT être SUCRÉ (fruits frais, compotes, yaourt au miel, cookies avoine, muffins légers, energy balls dattes/amandes). INTERDICTION de plats salés au goûter !");
      } else if (snackFlavor === "savory") {
        flavorRules.push("🔴 RÈGLE ABSOLUE GOÛTER 100% SALÉ : Le goûter DOIT OBLIGATOIREMENT être SALÉ (bâtonnets de carottes/concombre & houmous/tzatziki, crackers & fromage frais, mini-wrap salé). INTERDICTION de produits sucrés au goûter !");
      } else {
        flavorRules.push("🔵 GOÛTER MIXTE : Alterner collations sucrées et salées selon les jours.");
      }
    }
    const dinnerStyle = profile?.dinnerStyle || "standard";
    if (activeMealTypes.includes("dinner")) {
      if (dinnerStyle === "light") {
        flavorRules.push("🔴 RÈGLE ABSOLUE DÎNER LÉGER & DIGESTIF LE SOIR : Les dîners doivent obligatoirement être légers, réconfortants et faciles à digérer (veloutés de légumes, soupes, salades tièdes composées, papillotes de poisson blanc/citron, poêlées de légumes de saison, omelettes légères aux herbes). INTERDICTION de viandes rouges grasses, de fritures, de sauces lourdes et de portions massives de féculents le soir. Calories visées : 300 à 380 kcal par personne.");
      } else {
        flavorRules.push("🔵 DÎNER STANDARD ÉQUILIBRÉ : Repas du soir complet et gourmand.");
      }
    }
    const flavorRulesText = flavorRules.length > 0 ? `\n\nDIRECTIVES STRICTES SUR LES SAVEURS ET STYLES DE REPAS :\n${flavorRules.join("\n")}` : "";

    // Découpage en blocs de 3 à 4 jours max pour éviter la troncature de token
    const chunkSize = 3;
    const chunks = [];
    for (let i = 0; i < daysCount; i += chunkSize) {
      const startDay = i + 1;
      const endDay = Math.min(i + chunkSize, daysCount);
      chunks.push({ startDay, endDay });
    }

    const endpoint = this.getEndpoint(activeModel);

    const generateChunk = async ({ startDay, endDay }) => {
      const count = endDay - startDay + 1;
      
      const prioritizedCuisines = Object.entries(profile?.cuisines || {})
        .filter(([_, lvl]) => lvl >= 2)
        .map(([k, lvl]) => `${cuisinesMap[k] ? cuisinesMap[k].split(" (")[0] : k} (${lvl === 3 ? "Priorité Max ⭐" : "Fréquent"})`);

      const streetFoodEmphasis = (profile?.cuisines?.streetfood >= 2)
        ? "\n🍔 DIRECTIVE SPÉCIALE FAST FOOD & STREET FOOD : L'utilisateur a sélectionné Street Food / Fast Food en priorité ! Veille à proposer régulièrement des déjeuners ou dîners street food gourmets faits maison : Smash burgers au cheddar fondant, Crispy chicken burgers, Tacos français croustillants, Wraps Caesar au poulet, Paninis chauds mozzarella/pesto, Hot-dogs briochés gourmets, Club sandwiches toastés, Quesadillas dorées, Naan pizzas express, Tenders maison croustillants, Burrito bowls, Loaded fries, Kebab maison pita."
        : "";

      const chunkTheme = prioritizedCuisines.length > 0
        ? `Cuisines favorites demandées par l'utilisateur : ${prioritizedCuisines.join(", ")}.${streetFoodEmphasis}`
        : "Variation équilibrée et savoureuse pour les déjeuners et dîners.";

      const prompt = `Tu es un Chef cuisinier étoilé et nutritionniste passionné.
Génère un menu gourmand, équilibré et SANS AUCUNE RÉPÉTITION pour ${count} jours (du Jour ${startDay} au Jour ${endDay}) pour les repas suivants uniquement : [${mealTypesNames}] pour ${adults} adulte(s) et ${children} enfant(s).
${chunkTheme}
Régimes & Objectifs Santé : ${diets}.
Préférences Gastronomiques & Curseurs Culinaires :
${cuisinesText}${appliancesText}${flavorRulesText}
Aliments à exclure impérativement : ${dislikes}.
Langue principale : ${lang}.

RÈGLES D'OR DE VARIÉTÉ ET DE QUALITÉ (STRICTES) :
1. AUCUNE RÉPÉTITION : Chaque jour et chaque repas demandé doit être 100% UNIQUE et ORIGINAL.
2. REPAS DEMANDÉS : Génère uniquement des recettes pour les types de repas suivants : ${mealTypesNames}. Les autres types de repas non demandés doivent être omis ou définis à null.
3. RESPECT STRICT DES SAVEURS : Applique à la lettre les consignes Sucré / Salé indiquées ci-dessus pour le petit-déjeuner et le goûter.
4. DIVERSITÉ DES PROTÉINES & FÉCULENTS (Déjeuners & Dîners UNIQUEMENT) : Varie impérativement chaque jour pour les déjeuners et dîners :
   - Alternez entre volaille (poulet, dinde), poisson/fruits de mer (saumon, cabillaud, crevettes), légumineuses/végétarien (lentilles, pois chiches, tofu), bœuf/viande, et féculents variés (riz basmati, pâtes fraîches, quinoa, patate douce, boulgour, nouilles). Ne JAMAIS mettre de volaille, viande, poulet, saumon, thon ou avocat dans un petit-déjeuner sucré !
5. Respecte scrupuleusement les curseurs de cuisines (les gastronomies notées 'PRIORITAIRE' doivent être largement représentées, les 'EXCLU' ne doivent jamais apparaître).
6. TITRES AUTHENTIQUES & UNIQUES : Sois créatif et précis dans les intitulés des plats. Ne répète jamais le même nom de plat d'un jour à l'autre.
7. DOSAGES & PORTIONS ÉTALON (RÈGLE CRITIQUE) :
   - Toutes les quantités d'ingrédients DOIVENT ÊTRE EXPRIMÉES POUR UNE BASE ÉTALON DE 2 PERSONNES (l'application applique automatiquement le coefficient d'échelle selon le nombre d'adultes et enfants).
   - Petit-déjeuner (base 2 pers) : 2 œufs max (1 par pers) OU 1 avocat pour 2 OU 80g flocons d'avoine OU 4 tranches de pain. Doses réalistes et digestes !
   - Déjeuner/Dîner (base 2 pers) : 250g à 300g de protéine max, 140g à 160g de féculents crus, 200g à 300g de légumes.
   - Goûter (base 2 pers) : 2 fruits entiers ou 150g compote ou 40g fruits secs.
8. Ingrédients complets (4 à 7 ingrédients réalistes par plat principal : protéine, féculent, légume, herbe/épice, matière grasse). Rayons autorisés ('deptProduce', 'deptMeat', 'deptDairy', 'deptBakery', 'deptPantry', 'deptSpices', 'deptFrozen', 'deptDrinks', 'deptOther').
9. Instructions détaillées ÉTAPE PAR ÉTAPE (3 à 4 étapes précises avec découpe, temps de cuisson, assaisonnement et dressage).
${profile?.appliances?.thermomix ? "10. ROBOT CUISEUR / THERMOMIX : Fournis impérativement pour chaque recette un bloc 'thermomixInstructions' (tableau d'étapes détaillées adaptées avec durées, températures ex: 100°C ou Varoma, vitesses ex: Vit. 1 / Sens Inverse 🔄)." : ""}
11. Ajoute une astuce de chef 'chefTip' personnalisée pour chaque plat.

Format JSON attendu :
{
  "days": [
    {
      "dayIndex": ${startDay},
      "meals": {
        "breakfast": {
          "title": { "fr": "${breakfastFlavor === 'sweet' ? 'Bowl Gourmand Avoine & Fruits Rouges' : breakfastFlavor === 'savory' ? 'Omelette Moelleuse aux Fines Herbes' : 'Titre Petit-Déjeuner Jour ' + startDay}", "en": "Breakfast Title Day ${startDay}" },
          "emoji": "${breakfastFlavor === 'sweet' ? '🥣' : breakfastFlavor === 'savory' ? '🍳' : '☀️'}",
          "prepTime": 8,
          "cookTime": 5,
          "caloriesPerPerson": 350,
          "ingredients": [
            { "name": { "fr": "${breakfastFlavor === 'sweet' ? 'Flocons d avoine' : 'Oeufs frais'}", "en": "Ingredient 1" }, "quantity": 80, "unit": "g", "dept": "${breakfastFlavor === 'sweet' ? 'deptPantry' : 'deptDairy'}" }
          ],
          "instructions": {
            "fr": [
              "Étape 1 : Préparation...",
              "Étape 2 : Cuisson...",
              "Étape 3 : Finition..."
            ]
          },
          "chefTip": { "fr": "Astuce du chef..." }
        },
        "lunch": {
          "title": { "fr": "Titre Déjeuner Gourmand Jour ${startDay}", "en": "Lunch Title Day ${startDay}" },
          "emoji": "🍗",
          "prepTime": 15,
          "cookTime": 15,
          "caloriesPerPerson": 520,
          "ingredients": [
            { "name": { "fr": "Protéine ou ingrédient principal" }, "quantity": 300, "unit": "g", "dept": "deptMeat" },
            { "name": { "fr": "Féculent" }, "quantity": 200, "unit": "g", "dept": "deptPantry" },
            { "name": { "fr": "Légume" }, "quantity": 2, "unit": "pcs", "dept": "deptProduce" },
            { "name": { "fr": "Huile ou assaisonnement" }, "quantity": 2, "unit": "c.à.s", "dept": "deptPantry" }
          ],
          "instructions": {
            "fr": [
              "Étape 1 : Préparation et découpe...",
              "Étape 2 : Cuisson et assaisonnement...",
              "Étape 3 : Dressage et finition..."
            ]
          },
          ${profile?.appliances?.thermomix ? `"thermomixInstructions": {
            "fr": [
              "Étape 1 Thermomix (ex: 5 sec / Vit. 5)...",
              "Étape 2 Thermomix (ex: 12 min / 100°C / Vit. 1 🔄)..."
            ]
          },` : ""}
          "chefTip": { "fr": "Astuce du chef..." }
        },
        "snack": {
          "title": { "fr": "${snackFlavor === 'sweet' ? 'Compote Pomme-Cannelle & Amandes' : snackFlavor === 'savory' ? 'Bâtonnets de Carotte & Tzatziki' : 'Titre Goûter Jour ' + startDay}", "en": "Snack Title Day ${startDay}" },
          "emoji": "${snackFlavor === 'sweet' ? '🍎' : snackFlavor === 'savory' ? '🥕' : '☕'}",
          "prepTime": 5,
          "cookTime": 0,
          "caloriesPerPerson": 190,
          "ingredients": [
            { "name": { "fr": "${snackFlavor === 'sweet' ? 'Pommes fraîches' : 'Carottes croquantes'}" }, "quantity": 1, "unit": "portion", "dept": "deptProduce" }
          ],
          "instructions": {
            "fr": ["Préparer et déguster frais."]
          },
          "chefTip": { "fr": "Conseil snack..." }
        },
        "dinner": {
          "title": { "fr": "Titre Dîner Savoureux Jour ${startDay}", "en": "Dinner Title Day ${startDay}" },
          "emoji": "🍲",
          "prepTime": 15,
          "cookTime": 20,
          "caloriesPerPerson": 420,
          "ingredients": [
            { "name": { "fr": "Ingrédient principal dîner" }, "quantity": 250, "unit": "g", "dept": "deptProduce" },
            { "name": { "fr": "Accompagnement" }, "quantity": 150, "unit": "g", "dept": "deptDairy" }
          ],
          "instructions": {
            "fr": [
              "Étape 1 : Préparation...",
              "Étape 2 : Cuisson mijotée...",
              "Étape 3 : Dressage..."
            ]
          },
          ${profile?.appliances?.thermomix ? `"thermomixInstructions": {
            "fr": [
              "Étape 1 Thermomix...",
              "Étape 2 Thermomix..."
            ]
          },` : ""}
          "chefTip": { "fr": "Astuce du chef pour le dîner..." }
        }
      }
    }
  ]
}`;

      const systemPrompt = `Tu es un chef cuisinier créatif et nutritionniste. Tu génères des recettes originales, très variées, équilibrées et gourmandes sans aucune répétition.
${breakfastFlavor === "sweet" ? "ATTENTION CRITIQUE : Le petit-déjeuner DOIT ÊTRE 100% SUCRÉ (pancakes, avoine, fruits, granola, yaourt, tartines miel/confiture). INTERDICTION ABSOLUE de mettre des œufs salés, de la volaille, du poulet, de la viande, du poisson, ou de l'avocat au petit-déjeuner." : ""}
${breakfastFlavor === "savory" ? "ATTENTION CRITIQUE : Le petit-déjeuner DOIT ÊTRE 100% SALÉ (œufs, omelette, avocat, toasts salés, fromage frais). INTERDICTION de mettre des produits sucrés." : ""}
${snackFlavor === "sweet" ? "ATTENTION CRITIQUE : Le goûter DOIT ÊTRE 100% SUCRÉ (fruits, compote, yaourt au miel, cookies avoine)." : ""}
${snackFlavor === "savory" ? "ATTENTION CRITIQUE : Le goûter DOIT ÊTRE 100% SALÉ (crudités, houmous, crackers fromage)." : ""}
${dinnerStyle === "light" ? "ATTENTION CRITIQUE : Les dîners doivent être LÉGERS et DIGESTES (soupes, veloutés, poissons blancs, salades tièdes, légumes sautés). Jamais de viandes rouges grasses, de fritures ou de portions massives de féculents le soir. Calories visées : 300 à 380 kcal par personne." : ""}
Réponds uniquement en JSON valide conforme au schéma demandé.`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${keyToUse.trim()}`
        },
        body: JSON.stringify({
          model: activeModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          temperature: 0.85,
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

    // Déduplication stricte des plats entre tous les jours générés
    const seenTitles = new Set();
    allDays.forEach((day, dIdx) => {
      if (!day?.meals) return;
      ["breakfast", "lunch", "snack", "dinner"].forEach(type => {
        const meal = day.meals[type];
        if (!meal || !meal.title) return;
        const frTitle = typeof meal.title === "string" ? meal.title : (meal.title.fr || "");
        const normTitle = frTitle.toLowerCase().trim();

        if (seenTitles.has(normTitle)) {
          // Doublon détecté entre deux chunks ! Rendre le plat unique
          if (typeof meal.title === "object") {
            const altSuffix = ["Maison", "du Chef", "Gourmand", "aux Épices"][dIdx % 4];
            meal.title.fr = `${frTitle} (${altSuffix})`;
          }
        } else {
          seenTitles.add(normTitle);
        }
      });
    });

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

    const prompt = `Tu es un Chef cuisinier étoilé. Génère une NOUVELLE recette de chef détaillée et savoureuse pour le type de repas '${mealType}', originale et différente de '${currentTitle}'.
Foyer : ${adults} adulte(s), ${children} enfant(s).
Régimes : ${diets}.${flavorInstruction}
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
  "title": { "fr": "Titre Gourmand FR", "en": "Gourmet Title EN" },
  "emoji": "🍲",
  "prepTime": 15,
  "cookTime": 20,
  "difficulty": "easy",
  "caloriesPerPerson": 480,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1" }, "quantity": 200, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": [
      "Étape 1 : Préparation et découpe des ingrédients...",
      "Étape 2 : Cuisson à feu moyen / vif...",
      "Étape 3 : Assaisonnement et finition...",
      "Étape 4 : Dressage et dégustation..."
    ],
    "en": ["Step 1...", "Step 2...", "Step 3...", "Step 4..."]
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
    const diets = (profile?.diets || []).join(", ") || "aucun régime particulier";
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
  "title": { "fr": "Titre appétissant FR", "en": "Appetizing Title EN" },
  "emoji": "🍳",
  "prepTime": 15,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 420,
  "ingredients": [
    { "name": { "fr": "Ingrédient 1", "en": "Ingredient 1" }, "quantity": 100, "unit": "g", "dept": "deptProduce" }
  ],
  "instructions": {
    "fr": [
      "Étape 1 : Préparer et tailler les ingrédients...",
      "Étape 2 : Cuisson et assaisonnement...",
      "Étape 3 : Finition et dressage..."
    ],
    "en": ["Step 1...", "Step 2...", "Step 3..."]
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
