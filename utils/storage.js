import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  PROFILE: "@planeat_family_profile",
  CURRENT_PLAN: "@planeat_current_plan",
  GROCERIES: "@planeat_groceries_list",
  CUSTOM_GROCERIES: "@planeat_custom_groceries",
  LANGUAGE: "@planeat_app_language",
  DIETS: "@planeat_diets",
  AI_CONFIG: "@planeat_ai_config"
};

export const DEFAULT_AI_CONFIG = {
  engine: "local", // 'local' | 'mistral'
  mistralApiKey: "",
  mistralModel: "mistral-small-latest"
};

export const DEFAULT_PROFILE = {
  adults: 2,
  children: 2,
  childrenAges: [4, 8],
  diets: ["dietBalanced", "dietHalal"],
  dislikedFoods: [],
  planDurationWeeks: 1
};

export class StorageService {
  static async getProfile() {
    try {
      const data = await AsyncStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  static async saveProfile(profile) {
    try {
      await AsyncStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
      return true;
    } catch {
      return false;
    }
  }

  static async getCurrentPlan() {
    try {
      const data = await AsyncStorage.getItem(KEYS.CURRENT_PLAN);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static async saveCurrentPlan(plan) {
    try {
      await AsyncStorage.setItem(KEYS.CURRENT_PLAN, JSON.stringify(plan));
      return true;
    } catch {
      return false;
    }
  }

  static async getGroceries() {
    try {
      const data = await AsyncStorage.getItem(KEYS.GROCERIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static async saveGroceries(groceries) {
    try {
      await AsyncStorage.setItem(KEYS.GROCERIES, JSON.stringify(groceries));
      return true;
    } catch {
      return false;
    }
  }

  static async getLanguage() {
    try {
      const lang = await AsyncStorage.getItem(KEYS.LANGUAGE);
      return lang || "fr";
    } catch {
      return "fr";
    }
  }

  static async setLanguage(lang) {
    try {
      await AsyncStorage.setItem(KEYS.LANGUAGE, lang);
      return true;
    } catch {
      return false;
    }
  }

  static async getAiConfig() {
    try {
      const data = await AsyncStorage.getItem(KEYS.AI_CONFIG);
      return data ? { ...DEFAULT_AI_CONFIG, ...JSON.parse(data) } : DEFAULT_AI_CONFIG;
    } catch {
      return DEFAULT_AI_CONFIG;
    }
  }

  static async saveAiConfig(config) {
    try {
      await AsyncStorage.setItem(KEYS.AI_CONFIG, JSON.stringify(config));
      return true;
    } catch {
      return false;
    }
  }
}

