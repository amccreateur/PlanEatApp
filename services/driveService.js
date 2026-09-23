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
    searchUrl: (query) => `https://www.leclercdrive.fr/recherche.aspx?TexteRecherche=${encodeURIComponent(query)}`,
    logoEmoji: "🔵"
  },
  {
    id: "carrefour",
    name: "Carrefour Drive",
    shortName: "Carrefour",
    color: "#004e9a",
    badgeColor: "#e2001a",
    textColor: "#ffffff",
    homeUrl: "https://www.carrefour.fr",
    searchUrl: (query) => `https://www.carrefour.fr/r?q=${encodeURIComponent(query)}`,
    logoEmoji: "🔴"
  },
  {
    id: "coursesu",
    name: "Courses U Drive",
    shortName: "Courses U",
    color: "#0085ca",
    badgeColor: "#ffffff",
    textColor: "#ffffff",
    homeUrl: "https://www.coursesu.com",
    searchUrl: (query) => `https://www.coursesu.com/drive/recherche?q=${encodeURIComponent(query)}`,
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
    homeUrl: "https://www.intermarche.com",
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

    // 3. Supprimer les préfixes de découpes, contenants et portions avec quantités optionnelles (ex: "24 tranches de", "2 filets de")
    cleaned = cleaned.replace(/^(?:\d+[\s\/\.,\d]*\s*)?(filets?|pavés?|paves?|tranches?|morceaux?|gousses?|sachets?|boîtes?|boites?|pots?|bâtonnets?|batonnets?|branches?|feuilles?|dés?|cubes?|cuillères?|cuilleres?|pincées?|pincees?|tasses?|verres?|gouttes?|brins?|poignées?|poignees?|bottes?|bouquets?|rondelles?|lamelles?|quartiers?|morceau|tranche|filet|pave|aiguillettes?|escalopes?|blancs?|cuisses?|steaks?|côtes?|cotes?|rôtis?|rotis?)\s+(d'|d’|de\s+la\s+|de\s+l'|de\s+l’|du\s+|des\s+|de\s+)?/i, "");

    // 4. Supprimer les unités de mesure brutes (ex: "200g de", "1L de")
    cleaned = cleaned.replace(/^(?:\d+[\s\/\.,\d]*\s*)(g|kg|ml|cl|l|c\.à\.s|c\.a\.s|cas|cac|c\.à\.c|c\.a\.c)\s+(d'|d’|de\s+la\s+|de\s+l'|de\s+l’|du\s+|des\s+|de\s+)?/i, "");

    // 5. Supprimer les adjectifs qualificatifs parasites (en préservant "crème fraîche")
    cleaned = cleaned.replace(/(?<!crème\s+)(frais|fraîche|fraiche|fraîches|fraiches)\b/gi, "");
    cleaned = cleaned.replace(/\b(bio|biologique|surgelé|surgelée|surgelés|surgelées|en boîte|en conserve|râpé|râpée|râpés|râpées|émincé|émincée|émincés|émincées|haché|hachée|hachés|hachées|concassé|concassés|coupé|coupés|cuit|cuits|cuite|cuites|entier|entiers|nature|maison|extra|vierge\s+extra|au\s+choix|selon\s+goût|environ)\b/gi, "");

    // 6. Nettoyer les ponctuations et espaces multiples
    cleaned = cleaned.replace(/[,;:.!?]/g, " ");
    cleaned = cleaned.replace(/\s+/g, " ").trim();

    // Fallback si la chaîne devient vide
    if (!cleaned) {
      cleaned = rawName.replace(/\(.*?\)/g, "").trim();
    }

    return cleaned;
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

