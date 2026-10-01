import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let Purchases = null;
if (Platform.OS !== "web") {
  try {
    Purchases = require("react-native-purchases").default || require("react-native-purchases");
  } catch (e) {
    console.warn("RevenueCat Purchases module not loaded:", e);
  }
}

// Mode gratuit / test : mettre à false pour débloquer 100% de l'appli sans popup ni achat
export const ENABLE_SUBSCRIPTIONS = false;

export const REVENUECAT_KEYS = {
  ios: "appl_fyeupvTKMGvuvRdPAtTDjmQIiXp",
  android: "" // Laisser vide en test pour éviter l'erreur de clé test sur Android release
};

export const ENTITLEMENT_IDS = ["PlanEat Pro", "pro", "premium", "planeat_pro"];

class PurchaseService {
  constructor() {
    this.isInitialized = false;
    this.isPro = true; // Débloqué par défaut pour tous les utilisateurs en phase de test
    this.listeners = new Set();
  }

  async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Si les abonnements sont désactivés ou sur le web
    if (!ENABLE_SUBSCRIPTIONS || Platform.OS === "web" || !Purchases) {
      this.isPro = true;
      this._notifyListeners();
      return;
    }

    try {
      const apiKey = Platform.OS === "ios" ? REVENUECAT_KEYS.ios : REVENUECAT_KEYS.android;
      // Ne pas configurer si la clé est vide ou est une clé de test sur un build release
      if (apiKey && !apiKey.startsWith("test_")) {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.WARN);
        await Purchases.configure({ apiKey });

        Purchases.addCustomerInfoUpdateListener((info) => {
          this._handleCustomerInfoUpdate(info);
        });

        const info = await Purchases.getCustomerInfo();
        this._handleCustomerInfoUpdate(info);
      } else {
        this.isPro = true;
        this._notifyListeners();
      }
    } catch (err) {
      console.warn("RevenueCat initialization error:", err);
      this.isPro = true;
      this._notifyListeners();
    }
  }

  _handleCustomerInfoUpdate(customerInfo) {
    if (!ENABLE_SUBSCRIPTIONS) {
      this.isPro = true;
      this._notifyListeners();
      return;
    }

    if (!customerInfo) return;
    const hasPro = ENTITLEMENT_IDS.some(
      (entId) => customerInfo.entitlements?.active?.[entId]?.isActive
    );

    this.isPro = !!hasPro;
    AsyncStorage.setItem("@planeat_is_pro", this.isPro ? "true" : "false").catch(() => {});
    this._notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.isPro);
    return () => this.listeners.delete(listener);
  }

  _notifyListeners() {
    this.listeners.forEach((l) => {
      try {
        l(this.isPro);
      } catch (e) {}
    });
  }

  async getOfferings() {
    if (!ENABLE_SUBSCRIPTIONS || Platform.OS === "web" || !Purchases) {
      return null;
    }
    try {
      if (!this.isInitialized) await this.init();
      const offerings = await Purchases.getOfferings();
      return offerings?.current || null;
    } catch (err) {
      console.warn("Error fetching offerings:", err);
      return null;
    }
  }

  async purchasePackage(pkg) {
    if (!ENABLE_SUBSCRIPTIONS || Platform.OS === "web" || !Purchases) {
      throw new Error("Paiement non supporté en phase de test");
    }
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      this._handleCustomerInfoUpdate(customerInfo);
      return this.isPro;
    } catch (err) {
      if (!err.userCancelled) {
        console.warn("Purchase error:", err);
      }
      throw err;
    }
  }

  async restorePurchases() {
    if (!ENABLE_SUBSCRIPTIONS || Platform.OS === "web" || !Purchases) {
      return this.isPro;
    }
    try {
      const customerInfo = await Purchases.restorePurchases();
      this._handleCustomerInfoUpdate(customerInfo);
      return this.isPro;
    } catch (err) {
      console.warn("Restore error:", err);
      throw err;
    }
  }

  getIsPro() {
    return this.isPro;
  }
}

export const purchaseService = new PurchaseService();
