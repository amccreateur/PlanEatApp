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
    homeUrl: "https://www.e.leclerc",
    searchUrl: (query) => `https://www.e.leclerc/recherche?q=${encodeURIComponent(query)}`,
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
   * Nettoie le nom de l'ingrédient pour une recherche optimale dans un supermarché en ligne
   * Ex: "Tomates cerises fraîches" -> "Tomates cerises"
   */
  static cleanSearchQuery(rawName) {
    if (!rawName) return "";
    let cleaned = rawName.trim();

    // Retirer les parenthèses de quantités résiduelles
    cleaned = cleaned.replace(/\(.*?\)/g, "");

    // Retirer les préfixes courants
    cleaned = cleaned.replace(/^(gousse d'|filet de|pavé de|tranche de|boîte de|sachet de|pot de|morceau de)\s+/i, "");

    // Nettoyer les espaces multiples
    cleaned = cleaned.replace(/\s+/g, " ").trim();
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

