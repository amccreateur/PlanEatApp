/**
 * Moteur Culinaire Anti-Gaspillage (Autonomous Fridge Chef Engine)
 * Compose dynamiquement des recettes cohérentes, réalistes et gourmandes
 * à partir de N'IMPORTE QUELLE combinaison d'ingrédients du frigo.
 */

// Catégorisation culinaire des ingrédients
export function categorizeIngredient(rawName = "") {
  const n = (rawName || "").toLowerCase().trim();

  // 1. Protéines & Liants
  if (n.includes("œuf") || n.includes("oeuf") || n.includes("omelette")) return "eggs";
  if (n.includes("poulet") || n.includes("dinde") || n.includes("volaille") || n.includes("escalope")) return "poultry";
  if (n.includes("bœuf") || n.includes("boeuf") || n.includes("steak") || n.includes("viande") || n.includes("veau") || n.includes("haché")) return "red_meat";
  if (n.includes("saumon") || n.includes("thon") || n.includes("cabillaud") || n.includes("poisson") || n.includes("crevette") || n.includes("sardine")) return "fish";
  if (n.includes("fromage") || n.includes("mozzarella") || n.includes("parmesan") || n.includes("chèvre") || n.includes("feta") || n.includes("cheddar") || n.includes("emmental") || n.includes("gruyère")) return "cheese";
  if (n.includes("tofu") || n.includes("tempeh") || n.includes("seitan")) return "tofu";

  // 2. Féculents & Céréales
  if (n.includes("riz") || n.includes("basmati")) return "rice";
  if (n.includes("pâte") || n.includes("pate") || n.includes("spaghetti") || n.includes("penne") || n.includes("coquillette") || n.includes("nouille")) return "pasta";
  if (n.includes("pomme de terre") || n.includes("patate") || n.includes("pdt")) return "potatoes";
  if (n.includes("pain") || n.includes("toast") || n.includes("baguette") || n.includes("wrap") || n.includes("tortilla") || n.includes("pita")) return "bread";
  if (n.includes("quinoa") || n.includes("boulgour") || n.includes("semoule") || n.includes("couscous") || n.includes("avoine") || n.includes("lentille") || n.includes("pois chiche")) return "grains";

  // 3. Légumes verts & denses
  if (n.includes("brocoli") || n.includes("chou-fleur") || n.includes("chou") || n.includes("romanesco")) return "cabbage_broccoli";
  if (n.includes("courgette")) return "zucchini";
  if (n.includes("épinard") || n.includes("epinard") || n.includes("salade") || n.includes("roquette") || n.includes("mâche")) return "greens";
  if (n.includes("haricot vert") || n.includes("petit pois") || n.includes("pois")) return "green_beans";

  // 4. Légumes du soleil & racines
  if (n.includes("tomate") || n.includes("sauce tomate") || n.includes("coulis")) return "tomato";
  if (n.includes("poivron")) return "pepper";
  if (n.includes("aubergine")) return "eggplant";
  if (n.includes("champignon")) return "mushrooms";
  if (n.includes("carotte") || n.includes("navet") || n.includes("betterave")) return "roots";
  if (n.includes("oignon") || n.includes("échalote") || n.includes("echalote") || n.includes("ail") || n.includes("poireau")) return "alliums";

  // 5. Produits laitiers & crèmes
  if (n.includes("crème") || n.includes("creme") || n.includes("lait") || n.includes("yaourt")) return "cream";

  return "misc";
}

/**
 * Génère une recette anti-gaspi complète, appétissante et réaliste
 */
export function buildAutonomousFridgeRecipe(ingredients = [], mealType = "lunch", profile = null, lang = "fr") {
  const servings = profile?.adults ? Math.max(1, profile.adults + (profile.children || 0) * 0.7) : 2;
  const hasThermomix = !!profile?.appliances?.thermomix;
  const isLight = profile?.dinnerStyle === "light" && mealType === "dinner";

  // Nettoyage et typage des ingrédients
  const analyzed = ingredients.map(ing => {
    const rawName = typeof ing === "string" ? ing : (ing.name || "Ingrédient");
    const qty = typeof ing === "object" && ing.quantity ? ing.quantity : null;
    const unit = typeof ing === "object" ? (ing.unit || "") : "";
    const category = categorizeIngredient(rawName);
    return { name: rawName, quantity: qty, unit, category };
  });

  const categories = new Set(analyzed.map(a => a.category));
  const namesList = analyzed.map(a => a.name);
  const primaryName = analyzed[0]?.name || "Restes du frigo";
  const secondaryName = analyzed[1]?.name || "";

  // Détection des familles présentes
  const hasEggs = categories.has("eggs");
  const hasRice = categories.has("rice");
  const hasPasta = categories.has("pasta");
  const hasPotatoes = categories.has("potatoes");
  const hasBread = categories.has("bread");
  const hasPoultry = categories.has("poultry");
  const hasFish = categories.has("fish");
  const hasRedMeat = categories.has("red_meat");
  const hasCheese = categories.has("cheese");
  const hasBroccoli = categories.has("cabbage_broccoli");
  const hasZucchini = categories.has("zucchini");
  const hasTomato = categories.has("tomato");
  const hasMushrooms = categories.has("mushrooms");
  const hasGreens = categories.has("greens");
  const hasGrains = categories.has("grains");

  let archetype = "pan_fry"; // par défaut : Poêlée gourmande
  let titleFr = "";
  let emoji = "🍳";
  let prepTime = 10;
  let cookTime = 15;
  let calories = 410;
  let pantryAdditions = [];
  let stepsFr = [];
  let thermomixSteps = [];
  let chefTip = "";

  // ----------------------------------------------------
  // ARBITRAGE DE L'ARCHÉTYPE CULINAIRE
  // ----------------------------------------------------

  // CAS 1 : ŒUFS (Frittata, Omelette campagnarde, Chakchouka)
  if (hasEggs) {
    if (hasTomato && (hasZucchini || categories.has("pepper") || hasBroccoli)) {
      archetype = "shakshuka";
      emoji = "🍳";
      titleFr = `Chakchouka express aux œufs & ${secondaryName || primaryName}`;
      calories = 360;
      pantryAdditions = [
        { name: { fr: "Huile d'olive vierge", en: "Olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
        { name: { fr: "Paprika doux & Cumin", en: "Paprika & Cumin" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
        { name: { fr: "Sel & Poivre du moulin", en: "Salt & Black pepper" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
      ];
      stepsFr = [
        `Rincez et émincez vos légumes (${namesList.join(", ")}). Écrasez l'ail ou ciselez l'oignon si disponible.`,
        `Faites chauffer un filet d'huile d'olive dans une sauteuse. Faites suer les légumes pendant 6 à 8 minutes jusqu'à ce qu'ils soient tendres et légèrement fondants.`,
        `Ajoutez les épices (paprika, cumin), salez et poivrez. Formez des petits nids dans la compotée de légumes et cassez-y délicatement vos œufs.`,
        `Couvrez la poêle et laissez cuire 3 à 4 minutes à feu doux jusqu'à ce que les blancs soient pris et les jaunes encore coulants. Servez chaud immédiatement !`
      ];
      chefTip = "Servez avec du pain grillé pour saucer la compotée savoureuse et le jaune d'œuf coulant.";
    } else {
      archetype = "frittata";
      emoji = "🍳";
      titleFr = hasBroccoli
        ? `Frittata dorée aux fleurettes de brocoli`
        : `Omelette campagnarde aux restes de ${primaryName}${secondaryName ? ` & ${secondaryName}` : ""}`;
      calories = 380;
      pantryAdditions = [
        { name: { fr: "Huile d'olive ou beurre", en: "Butter or olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptDairy" },
        { name: { fr: "Herbes de Provence ou ciboulette", en: "Herbs" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
        { name: { fr: "Sel & Poivre", en: "Salt & pepper" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
      ];
      stepsFr = [
        `Détaillez vos légumes (${namesList.filter(n => !n.toLowerCase().includes("œuf")).join(", ") || primaryName}) en petits morceaux pour une cuisson homogène.`,
        `Faites revenir les légumes 5 à 7 minutes dans une poêle chaude avec un filet d'huile pour les attendrir et faire ressortir leurs sucs.`,
        `Battez vos œufs en omelette dans un bol avec sel, poivre et herbes. Versez le mélange sur les légumes dorés.`,
        `Laissez cuire à feu moyen 4 à 5 minutes en rabattant délicatement les bords vers le centre. Laissez dorer selon votre goût (baveuse ou bien prise) et servez.`
      ];
      chefTip = "Ajoutez une pointe de fromage râpé ou de chèvre sur le dessus avant de rabattre l'omelette pour encore plus de fondant.";
    }
  }

  // CAS 2 : RIZ (Wok de Riz Sauté Anti-Gaspi)
  else if (hasRice) {
    archetype = "fried_rice";
    emoji = "🍚";
    titleFr = `Riz sauté anti-gaspi au ${primaryName}${secondaryName ? ` & ${secondaryName}` : ""}`;
    calories = 440;
    pantryAdditions = [
      { name: { fr: "Huile de sésame ou tournesol", en: "Oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Sauce soja ou pincée de sel", en: "Soy sauce or salt" }, quantity: 2, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Gousses d'ail ou oignon", en: "Garlic / Onion" }, quantity: 1, unit: "gousse", dept: "deptProduce" }
    ];
    stepsFr = [
      `Découpez vos ingrédients (${namesList.join(", ")}) en petits dés de taille régulière.`,
      `Dans une grande poêle ou un wok très chaud, versez un filet d'huile et faites sauter les légumes et protéines à feu vif pendant 5 minutes.`,
      `Ajoutez votre riz cuit directement dans la poêle bien chaude en l'égrenant avec une spatule en bois.`,
      `Versez la sauce soja (ou le sel et poivre), mélangez vigoureusement pendant 3 minutes pour bien imprégner le riz et servez fumant !`
    ];
    chefTip = "Le riz de la veille légèrement séché au réfrigérateur est idéal pour obtenir un riz sauté croustillant et pas collant.";
  }

  // CAS 3 : PÂTES (Poêlée crémeuse ou Gratin de Pâtes express)
  else if (hasPasta) {
    archetype = "pasta_skillet";
    emoji = "🍝";
    titleFr = hasCheese
      ? `Gratin fondant de pâtes au ${primaryName} & fromage`
      : `Penne poêlées fondantes aux restes de ${primaryName}${secondaryName ? ` & ${secondaryName}` : ""}`;
    calories = 460;
    pantryAdditions = [
      { name: { fr: "Huile d'olive", en: "Olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Ail émincé & herbes aromatiques", en: "Garlic & herbs" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
      { name: { fr: "Sel & Poivre", en: "Salt & pepper" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ];
    stepsFr = [
      `Faites cuire ou réchauffer vos pâtes dans un fond d'eau bouillante salée si elles ne sont pas déjà cuites.`,
      `Dans une sauteuse avec un filet d'huile d'olive, faites revenir vos ingrédients (${namesList.filter(n => !n.toLowerCase().includes("pâte")).join(", ")}) pendant 5 à 7 minutes.`,
      `Ajoutez les pâtes égouttées dans la poêle avec 2 cuillères à soupe d'eau de cuisson pour créer une émulsion savoureuse.`,
      `Laissez mijoter 2 minutes en remuant pour bien napper les pâtes. Parsemez d'herbes ou de fromage avant de servir bien chaud.`
    ];
    chefTip = "L'eau de cuisson des pâtes contient de l'amidon : elle lie parfaitement tous vos légumes en une sauce onctueuse sans crème.";
  }

  // CAS 4 : POMMES DE TERRE (Poêlée Campagnarde Rissolée)
  else if (hasPotatoes) {
    archetype = "potato_skillet";
    emoji = "🥔";
    titleFr = `Poêlée campagnarde de pommes de terre rôties & ${secondaryName || primaryName}`;
    calories = 420;
    pantryAdditions = [
      { name: { fr: "Beurre ou huile de cuisson", en: "Butter or oil" }, quantity: 1, unit: "c.à.s", dept: "deptDairy" },
      { name: { fr: "Ail & persil haché", en: "Garlic & parsley" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" },
      { name: { fr: "Fleur de sel & Poivre", en: "Salt & pepper" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ];
    stepsFr = [
      `Coupez les pommes de terre et vos autres ingrédients (${namesList.join(", ")}) en rondelles ou dés réguliers.`,
      `Faites chauffer la matière grasse dans une grande poêle à feu moyen et déposez les pommes de terre. Couvrez 8 minutes pour les attendrir.`,
      `Découvrez, ajoutez les autres restes (${namesList.filter(n => !n.toLowerCase().includes("pomme de terre")).join(", ") || "légumes"}), montez le feu et laissez rissoler 5 minutes pour obtenir une belle croûte dorée.`,
      `Assaisonnez de fleur de sel, poivre et persillade juste avant d'éteindre le feu. Dégustez bien croustillant !`
    ];
    chefTip = "Ne remuez pas trop au début pour laisser les pommes de terre former leur délicieuse croûte croustillante.";
  }

  // CAS 5 : PAIN / WRAP (Bruschetta géante, Toast campagnard ou Wrap grillé)
  else if (hasBread) {
    archetype = "toast_bake";
    emoji = "🥪";
    titleFr = `Toast chaud gratiné aux restes de ${primaryName}${secondaryName ? ` & ${secondaryName}` : ""}`;
    calories = 390;
    pantryAdditions = [
      { name: { fr: "Filet d'huile d'olive", en: "Olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Gousse d'ail", en: "Garlic clove" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
      { name: { fr: "Sel, poivre & origan", en: "Herbs & seasonings" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ];
    stepsFr = [
      `Faites légèrement griller le pain au grille-pain ou à la poêle, puis frottez-le légèrement avec une demi-gousse d'ail pour le parfumer.`,
      `Faites revenir rapidement vos garnitures (${namesList.filter(n => !n.toLowerCase().includes("pain")).join(", ")}) à la poêle 4 minutes.`,
      `Répartissez la garniture chaude sur les tranches de pain, arrosez d'un filet d'huile d'olive.`,
      `Passez 3 à 4 minutes sous le grill du four ou couvrez à la poêle à feu très doux pour fondre l'ensemble.`
    ];
    chefTip = "Une excellente façon d'utiliser du pain rassis sans rien jeter.";
  }

  // CAS 6 : LÉGUMES VERTS EN MAJORITÉ (Brocoli, Courgette, Haricots verts)
  else if (hasBroccoli || hasZucchini || hasGreens) {
    if (isLight) {
      archetype = "veloute";
      emoji = "🥣";
      titleFr = hasBroccoli
        ? `Velouté réconfortant de fleurettes de brocoli`
        : `Velouté doux anti-gaspi de ${primaryName}${secondaryName ? ` & ${secondaryName}` : ""}`;
      calories = 290;
      pantryAdditions = [
        { name: { fr: "Eau ou bouillon de légumes", en: "Vegetable broth" }, quantity: 400, unit: "ml", dept: "deptPantry" },
        { name: { fr: "Filet d'huile d'olive ou crème", en: "Cream or olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptDairy" },
        { name: { fr: "Sel, poivre & muscade", en: "Nutmeg, salt & pepper" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
      ];
      stepsFr = [
        `Rincez et découpez vos légumes (${namesList.join(", ")}) en morceaux réguliers.`,
        `Dans une casserole, faites suer les légumes 3 minutes dans un filet d'huile, puis couvrez avec 400 ml d'eau ou bouillon.`,
        `Laissez frémir à couvert pendant 12 à 15 minutes jusqu'à ce que la pointe d'un couteau s'enfonce sans résistance.`,
        `Mixez finement au blender ou plongeur avec sel, poivre et une pointe de crème jusqu'à texture veloutée veloutée.`
      ];
      chefTip = "Ne jetez pas les tiges de brocoli ! Épluchez-les et coupez-les en dés, elles apportent une douceur incroyable au velouté.";
    } else {
      archetype = "pan_fry";
      emoji = "🥦";
      titleFr = hasBroccoli
        ? `Poêlée croquante de fleurettes de brocoli dorées à l'ail`
        : `Poêlée sautée de ${primaryName} persillée${secondaryName ? ` & ${secondaryName}` : ""}`;
      calories = 340;
      pantryAdditions = [
        { name: { fr: "Huile d'olive vierge", en: "Olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
        { name: { fr: "Gousses d'ail émincées", en: "Minced garlic" }, quantity: 2, unit: "gousses", dept: "deptProduce" },
        { name: { fr: "Sel fin, poivre & piment doux", en: "Seasonings" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
      ];
      stepsFr = [
        `Détaillez le ${primaryName} en fleurettes ou morceaux fins. Si c'est du brocoli, plongez-le 3 minutes dans de l'eau bouillante salée pour fixer sa belle couleur verte.`,
        `Faites chauffer l'huile d'olive dans une sauteuse à feu vif avec l'ail émincé pendant 1 minute sans faire brûler l'ail.`,
        `Ajoutez vos ingrédients (${namesList.join(", ")}) et faites sauter à feu vif pendant 6 à 8 minutes en remuant régulièrement.`,
        `Assaisonnez généreusement de sel, poivre et herbes. Servez crousti-fondant dès la sortie de la poêle.`
      ];
      chefTip = "Terminez par un filet de jus de citron frais au moment de servir pour réveiller la gourmandise des légumes verts.";
    }
  }

  // CAS 7 : PROTÉINE + LÉGUMES (Poulet, Poisson, Viande)
  else if (hasPoultry || hasFish || hasRedMeat) {
    archetype = "protein_saute";
    emoji = hasFish ? "🐟" : "🍗";
    titleFr = `Émincé doré de ${primaryName} sauté aux restes du frigo`;
    calories = 450;
    pantryAdditions = [
      { name: { fr: "Huile d'olive ou colza", en: "Cooking oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Épices au choix (curry, thym ou paprika)", en: "Spices" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
      { name: { fr: "Sel & Poivre", en: "Salt & pepper" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ];
    stepsFr = [
      `Coupez les protéines (${primaryName}) en lamelles ou dés bouchées, et émincez vos légumes restants.`,
      `Dans une poêle très chaude, faites saisir la viande ou le poisson avec l'huile 4 à 5 minutes pour bien colorer. Réservez de côté.`,
      `Dans la même poêle, faites fondre les légumes 5 minutes en récupérant les sucs de cuisson avec une cuillère d'eau.`,
      `Réincorporez les protéines dorées, ajoutez les épices, salez, poivrez et laissez mijoter ensemble 2 minutes avant de servir.`
    ];
    chefTip = "En saisissant la viande en premier puis en déglaçant les sucs avec les légumes, vous obtenez une saveur de rôtisserie maison.";
  }

  // CAS 8 : CAS GÉNÉRAL HARMONIEUX (Méli-mélo du chef)
  else {
    archetype = "pan_fry";
    emoji = "🥘";
    titleFr = `Méli-mélo poêlé du Chef aux restes de ${primaryName}${secondaryName ? ` & ${secondaryName}` : ""}`;
    calories = 360;
    pantryAdditions = [
      { name: { fr: "Huile d'olive", en: "Olive oil" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Ail ou oignon du placard", en: "Onion / Garlic" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
      { name: { fr: "Sel, poivre & herbes séchées", en: "Seasonings" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ];
    stepsFr = [
      `Coupez l'ensemble de vos ingrédients (${namesList.join(", ")}) en morceaux de taille homogène pour harmoniser la cuisson.`,
      `Dans une poêle avec un filet d'huile chaude, déposez d'abord les légumes les plus fermes puis les plus tendres.`,
      `Laissez dorer à feu moyen pendant 8 à 10 minutes en remuant régulièrement pour obtenir une cuisson dorée et fondante.`,
      `Assaisonnez de sel, poivre et herbes à votre convenance. Servez bien chaud et savourez un plat 100% fait maison sans aucun gaspillage.`
    ];
    chefTip = "Une noisette de beurre ou un filet d'huile d'olive crue en fin de cuisson apporte un brillant et un parfum irrésistibles.";
  }

  // Étapes Thermomix adaptées
  if (hasThermomix) {
    thermomixSteps = [
      `Mettre l'oignon/ail et légumes fermes dans le bol : hacher 5 sec / Vitesse 5. Racler les parois.`,
      `Ajouter 15g d'huile d'olive : rissoler 4 min / 120°C (ou Varoma) / Vitesse 1 🔄 sens inverse.`,
      `Ajouter le reste des ingrédients (${namesList.join(", ")}) avec l'assaisonnement : cuire 10 à 12 min / 100°C / Vitesse cuillère 🔄 sens inverse.`
    ];
  }

  // Assemblage de la liste d'ingrédients complète avec vos vraies quantités
  const userIngredientsFormatted = analyzed.map(ing => {
    let finalQty = ing.quantity !== null && ing.quantity !== undefined ? ing.quantity : 1;
    let finalUnit = ing.unit !== undefined && ing.unit !== null ? ing.unit : "";
    if (ing.quantity === null || ing.quantity === undefined) {
      if (ing.category === "eggs") { finalQty = 2; finalUnit = ""; }
      else if (ing.category === "cabbage_broccoli" || ing.category === "rice" || ing.category === "pasta" || ing.category === "poultry") { finalQty = 150; finalUnit = "g"; }
      else { finalQty = 1; finalUnit = ""; }
    }
    return {
      name: { fr: ing.name, en: ing.name, ar: ing.name },
      quantity: finalQty,
      unit: finalUnit,
      dept: getDeptByCategory(ing.category)
    };
  });

  const allIngredients = [...userIngredientsFormatted, ...pantryAdditions];

  return {
    id: `fridge_chef_${Date.now()}`,
    mealType: mealType || "lunch",
    title: {
      fr: titleFr,
      en: titleFr,
      ar: titleFr
    },
    emoji: emoji,
    prepTime: prepTime,
    cookTime: cookTime,
    difficulty: "easy",
    caloriesPerPerson: calories,
    tags: ["dietBalanced", "dietQuick", "dietBudget"],
    calculatedServings: Math.round(servings) || 2,
    ingredients: allIngredients,
    instructions: {
      fr: stepsFr,
      en: stepsFr,
      ar: stepsFr
    },
    thermomixInstructions: hasThermomix && thermomixSteps.length > 0 ? {
      fr: thermomixSteps,
      en: thermomixSteps,
      ar: thermomixSteps
    } : undefined,
    chefTip: {
      fr: chefTip || "Cuisiner ses restes permet d'économiser jusqu'à 30% sur son budget courses chaque semaine !",
      en: chefTip,
      ar: chefTip
    },
    isAntiWaste: true,
    fridgeInputs: ingredients
  };
}

function getDeptByCategory(cat) {
  switch (cat) {
    case "eggs":
    case "cheese":
    case "cream":
      return "deptDairy";
    case "poultry":
    case "red_meat":
    case "fish":
      return "deptMeat";
    case "rice":
    case "pasta":
    case "grains":
      return "deptPantry";
    case "bread":
      return "deptBakery";
    default:
      return "deptProduce";
  }
}
