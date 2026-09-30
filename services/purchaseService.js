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

export const REVENUECAT_KEYS = {
  ios: "appl_fyeupvTKMGvuvRdPAtTDjmQIiXp",
  android: "test_BswsJFbKUxnGLOuaIJDhEOPnFcM"
};

export const ENTITLEMENT_IDS = ["PlanEat Pro", "pro", "premium", "planeat_pro"];

class PurchaseService {
  constructor() {
    this.isInitialized = false;
    this.isPro = false;
    this.listeners = new Set();
  }

  async init() {
    if (this.isInitialized) return;

    if (Platform.OS === "web" || !Purchases) {
      this.isInitialized = true;
      const cached = await AsyncStorage.getItem("@planeat_is_pro");
      this.isPro = cached === "true";
      return;
    }

    try {
      const apiKey = Platform.OS === "ios" ? REVENUECAT_KEYS.ios : REVENUECAT_KEYS.android;
      if (apiKey) {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.WARN);
        await Purchases.configure({ apiKey });
        this.isInitialized = true;

        // Listen for customer info updates
        Purchases.addCustomerInfoUpdateListener((info) => {
          this._handleCustomerInfoUpdate(info);
        });

        // Initial check
        const info = await Purchases.getCustomerInfo();
        this._handleCustomerInfoUpdate(info);
      }
    } catch (err) {
      console.warn("RevenueCat initialization error:", err);
      const cached = await AsyncStorage.getItem("@planeat_is_pro");
      this.isPro = cached === "true";
    }
  }

  _handleCustomerInfoUpdate(customerInfo) {
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
    if (Platform.OS === "web" || !Purchases) {
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
    if (Platform.OS === "web" || !Purchases) {
      throw new Error("Paiement non supporté sur le web");
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
    if (Platform.OS === "web" || !Purchases) {
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
