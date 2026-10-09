/**
 * Drive Service for PlanEat
 * Manages supported French Drive stores, search URL generation and query optimization.
 */

export const DRIVE_STORES = [
  {
    id: "leclerc",
    name: "E.Leclerc Drive",
    shortName: "E.Leclerc",
    color: "#0066c0",
    badgeColor: "#ffcc00",
    textColor: "#ffffff",
    homeUrl: "https://www.leclercdrive.fr",
    searchUrl: (query) => `https://www.leclercdrive.fr`,
    logoEmoji: "🔵"
  },
  {
    id: "carrefour",
    name: "Carrefour Drive",
    shortName: "Carrefour",
    color: "#004e9a",
    badgeColor: "#e2001a",
    textColor: "#ffffff",
    homeUrl: "https://www.carrefour.fr/courses",
    searchUrl: (query) => `https://www.carrefour.fr/s?q=${encodeURIComponent(query)}`,
    logoEmoji: "🔴"
  },
  {
    id: "coursesu",
    name: "Courses U Drive",
    shortName: "Courses U",
    color: "#0085ca",
    badgeColor: "#ffffff",
    textColor: "#ffffff",
    homeUrl: "https://www.coursesu.com/drive/home",
    searchUrl: (query) => `https://www.coursesu.com/search?q=${encodeURIComponent(query)}`,
    logoEmoji: "🔷"
  },
  {
    id: "auchan",
    name: "Auchan Drive",
    shortName: "Auchan",
    color: "#e1001a",
    badgeColor: "#22c55e",
    textColor: "#ffffff",
    homeUrl: "https://www.auchan.fr",
    searchUrl: (query) => `https://www.auchan.fr/recherche?text=${encodeURIComponent(query)}`,
    logoEmoji: "🟢"
  },
  {
    id: "intermarche",
    name: "Intermarché Drive",
    shortName: "Intermarché",
    color: "#cc0000",
    badgeColor: "#1e293b",
    textColor: "#ffffff",
    homeUrl: "https://www.intermarche.com/drive",
    searchUrl: (query) => `https://www.intermarche.com/recherche?q=${encodeURIComponent(query)}`,
    logoEmoji: "🟠"
  }
];

export class DriveService {
  /**
   * Nettoie et extrait les mots-clés essentiels d'un ingrédient pour les moteurs de recherche Drive
   * Ex: "Filets de saumon frais" -> "saumon"
   * Ex: "Gousses d'ail" -> "ail"
   * Ex: "Tomates cerises fraîches" -> "Tomates cerises"
   * Ex: "Crème fraîche liquide" -> "Crème fraîche liquide"
   * Ex: "Huile d'olive vierge extra" -> "Huile d'olive"
   */
  static cleanSearchQuery(rawName) {
    if (!rawName) return "";
    let cleaned = rawName.trim();

    // 1. Supprimer les parenthèses et leur contenu (ex: "(environ 200g)", "(bio)", "(facultatif)")
    cleaned = cleaned.replace(/\(.*?\)/g, "");

    // 2. Gérer les alternatives : "Pain complet ou de campagne" -> "Pain complet"
    if (/\s+(ou|ou\s+bien|\/)\s+/i.test(cleaned)) {
      cleaned = cleaned.split(/\s+(ou|ou\s+bien|\/)\s+/i)[0];
    }

    // 3. Supprimer les préfixes de découpes, contenants et portions avec quantités optionnelles
    cleaned = cleaned.replace(/^(?:\d+[\s\/\.,\d]*\s*)?(blancs?\s+d['’]|jaunes?\s+d['’]|blancs?\s+de\s+|jaunes?\s+de\s+|filets?\s+de\s+|filets?\s+d['’]|pavés?\s+de\s+|pavés?\s+d['’]|paves?\s+de\s+|tranches?\s+de\s+|tranches?\s+d['’]|morceaux?\s+de\s+|morceaux?\s+d['’]|gousses?\s+d['’]|gousses?\s+de\s+|sachets?\s+de\s+|sachets?\s+d['’]|boîtes?\s+de\s+|boites?\s+de\s+|pots?\s+de\s+|bâtonnets?\s+de\s+|branches?\s+de\s+|feuilles?\s+de\s+|dés?\s+de\s+|cubes?\s+de\s+|cuillères?\s+de\s+|pincées?\s+de\s+|tasses?\s+de\s+|verres?\s+de\s+|brins?\s+de\s+|poignées?\s+de\s+|bottes?\s+de\s+|bouquets?\s+de\s+|rondelles?\s+de\s+|lamelles?\s+de\s+|quartiers?\s+de\s+|escalopes?\s+de\s+|escalopes?\s+d['’]|aiguillettes?\s+de\s+|cuisses?\s+de\s+|côtes?\s+de\s+|rôtis?\s+de\s+)/i, "");

    // 4. Supprimer les unités de mesure brutes (ex: "200g de", "1L de")
    cleaned = cleaned.replace(/^(?:\d+[\s\/\.,\d]*\s*)(g|kg|ml|cl|l|c\.à\.s|c\.a\.s|cas|cac|c\.à\.c|c\.a\.c)\s+(d'|d’|de\s+la\s+|de\s+l'|de\s+l’|du\s+|des\s+|de\s+)?/i, "");

    // 5. Supprimer les états de cuisson, préparation et adjectifs qualificatifs
    cleaned = cleaned.replace(/(?<!crème\s+)(frais|fraîche|fraiche|fraîches|fraiches)\b/gi, "");
    cleaned = cleaned.replace(/\b(en\s+neige(?:\s+ferme)?|en\s+poudre|en\s+morceaux|en\s+dés|en\s+tranches|en\s+bâtonnets|en\s+rondelles|en\s+cube|en\s+cubes|en\s+boîte|en\s+conserve|au\s+plat|au\s+four|à\s+la\s+coque|a\s+la\s+coque)\b/gi, "");
    cleaned = cleaned.replace(/(?<!\bpetits?\s+)(mini|minis|petit|petite|petits|petites|grand|grande|grands|grandes|moyen|moyens|moyenne|moyennes)\b/gi, "");
    cleaned = cleaned.replace(/(?:^|[\s,;:.!?])(?:bio|biologique|surgelés|surgelées|surgelé|surgelée|râpés|râpées|râpé|râpée|émincés|émincées|émincé|émincée|concassés|concassées|concassé|concassée|coupés|coupées|coupé|coupée|cuits|cuites|cuit|cuite|grillés|grillées|grillé|grillée|toastés|toastées|toasté|toastée|rôtis|rôties|rôti|rôtie|poêlés|poêlées|poêlé|poêlée|dorés|dorées|doré|dorée|fondants|fondantes|fondant|fondante|moelleuses|moelleux|moelleuse|grecs|grecques|grec|grecque|entiers|entier|nature|maison|extra|vierge\s+extra|au\s+choix|selon\s+goût|environ|égouttés|égouttées|égoutté|égouttée|rincés|rincées|rincé|rincée|pelés|pelées|pelé|pelée|épluchés|épluchées|épluché|épluchée|dénoyautés|dénoyautées|dénoyauté|dénoyautée|tièdes|tiède|chauds|chaudes|chaud|chaude|froids|froides|froid|froide|battus|battues|battu|battue|durs|dures|dur|dure|mollets|mollet|brouillés|brouillées|brouillé|brouillée|pochés|pochées|poché|pochée|séchés|séchées|séché|séchée|déshydratés|déshydratées|déshydraté|déshydratée|effilés|effilées|effilé|effilée|moulus|moulues|moulu|moulue|finement|grossièrement)(?=$|[\s,;:.!?])/gi, " ");

    // 6. Remplacement des pluriels fréquents par leur forme singulière reconnue par les moteurs Drive
    cleaned = cleaned.replace(/^pains\s+/i, "Pain ");
    cleaned = cleaned.replace(/^bagels\s+/i, "Bagel ");
    cleaned = cleaned.replace(/^steaks\s+hachés\b/i, "Steak haché");
    cleaned = cleaned.replace(/^steaks\b/i, "Steak");
    cleaned = cleaned.replace(/^avocats\s+/i, "Avocat ");
    cleaned = cleaned.replace(/^oignons\s+/i, "Oignon ");
    cleaned = cleaned.replace(/^concombres\s+/i, "Concombre ");
    cleaned = cleaned.replace(/^poivrons\s+/i, "Poivron ");
    cleaned = cleaned.replace(/^courgettes\s+/i, "Courgette ");
    cleaned = cleaned.replace(/^aubergines\s+/i, "Aubergine ");
    cleaned = cleaned.replace(/^carottes\s+/i, "Carotte ");
    cleaned = cleaned.replace(/^pommes\s+de\s+terre\b/i, "Pomme de terre");
    cleaned = cleaned.replace(/^(?:œufs?|oeufs?)\b/i, "Oeufs");

    // 7. Nettoyer les ponctuations et espaces multiples
    cleaned = cleaned.replace(/[,;:.!?&]/g, " ");
    cleaned = cleaned.replace(/\s+/g, " ").trim();

    // Fallback si la chaîne devient vide
    if (!cleaned) {
      cleaned = rawName.replace(/\(.*?\)/g, "").trim();
    }

    return cleaned;
  }

  /**
   * Génère des suggestions de mots-clés intelligents et d'alternatives pour un ingrédient
   * Ex: "Pains pita" -> ["Pain pita", "Pita"]
   * Ex: "Lait d'amande ou demi-écrémé" -> ["Lait d'amande", "Lait demi-écrémé"]
   * Ex: "Pain complet ou de campagne" -> ["Pain complet", "Pain de campagne"]
   */
  static getSearchSuggestions(rawName) {
    if (!rawName) return [];
    const list = [];
    const withoutParens = rawName.replace(/\(.*?\)/g, "").trim();

    if (/\s+(ou|ou\s+bien|\/)\s+/i.test(withoutParens)) {
      const parts = withoutParens.split(/\s+(ou|ou\s+bien|\/)\s+/i);
      const firstPart = parts[0];
      const firstClean = this.cleanSearchQuery(firstPart);
      if (firstClean) list.push(firstClean);

      for (let i = 1; i < parts.length; i++) {
        const p = parts[i];
        if (!p || /^(ou|ou\s+bien|\/)$/i.test(p)) continue;
        let partClean = this.cleanSearchQuery(p.replace(/^(de|d'|d’)\s+/i, ""));
        if (partClean.length > 2) {
          if (/demi-écrémé|écrémé|entier|végétal/i.test(partClean) && !/lait/i.test(partClean) && /lait/i.test(firstClean)) {
            list.push("Lait " + partClean);
          } else if (/campagne|complet|mie/i.test(partClean) && !/pain/i.test(partClean) && /pain/i.test(firstClean)) {
            list.push("Pain de " + partClean);
          } else {
            list.push(partClean);
          }
        }
      }
    } else {
      const primary = this.cleanSearchQuery(withoutParens);
      if (primary) list.push(primary);

      // Suggestions contextuelles supplémentaires
      if (/pita/i.test(primary) && primary !== "Pita") {
        list.push("Pita");
      }
      if (/tortilla/i.test(primary)) {
        list.push("Tortillas");
        list.push("Fajitas");
        list.push("Wrap");
      }
      if (/bagel/i.test(primary) && primary !== "Bagel") {
        list.push("Bagel");
      }
      if (/oeufs?|œufs?/i.test(primary)) {
        list.push("Oeufs plein air");
      }
      if (/pain\s+complet/i.test(primary)) {
        list.push("Pain de mie complet");
      }
    }

    const parenMatch = rawName.match(/\((.*?)\)/);
    if (parenMatch) {
      const inside = parenMatch[1];
      const subParts = inside.split(/\s*(?:ou|\/|,)\s*/i);
      for (const sp of subParts) {
        const c = this.cleanSearchQuery(sp);
        if (c && c.length > 2 && !list.includes(c)) list.push(c);
      }
    }

    return list.filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
  }

  /**
   * Retourne la liste des magasins supportés
   */
  static getStores() {
    return DRIVE_STORES;
  }

  /**
   * Trouve un magasin par son ID
   */
  static getStoreById(storeId) {
    return DRIVE_STORES.find(s => s.id === storeId) || DRIVE_STORES[0];
  }
}

