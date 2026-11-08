import { AppState, Platform } from "react-native";
import { purchaseService } from "./purchaseService";

let MobileAds = null;
let BannerAd = null;
let BannerAdSize = null;
let InterstitialAd = null;
let RewardedAd = null;
let AppOpenAd = null;
let AdEventType = null;
let RewardedAdEventType = null;
let TestIds = null;
let AdsConsent = null;

if (Platform.OS !== "web") {
  try {
    const GoogleAds = require("react-native-google-mobile-ads");
    MobileAds = GoogleAds.default || GoogleAds;
    BannerAd = GoogleAds.BannerAd;
    BannerAdSize = GoogleAds.BannerAdSize;
    InterstitialAd = GoogleAds.InterstitialAd;
    RewardedAd = GoogleAds.RewardedAd;
    AppOpenAd = GoogleAds.AppOpenAd;
    AdEventType = GoogleAds.AdEventType;
    RewardedAdEventType = GoogleAds.RewardedAdEventType;
    TestIds = GoogleAds.TestIds;
    AdsConsent = GoogleAds.AdsConsent;
  } catch (e) {
    // Graceful fallback for web or unsupported environments
  }
}

// Identifiants des Blocs d'annonces Google AdMob
// Remplacer par vos IDs de production créés sur Google AdMob
export const AD_UNIT_IDS = {
  banner: {
    ios: "ca-app-pub-5303925075056294/1445825405",
    android: "ca-app-pub-5303925075056294/4399291807"
  },
  interstitial: {
    ios: "ca-app-pub-5303925075056294/9132743736",
    android: "ca-app-pub-5303925075056294/5354025685"
  },
  rewarded: {
    ios: "ca-app-pub-5303925075056294/2133648168",
    android: "ca-app-pub-5303925075056294/7446392432"
  },
  appOpen: {
    ios: "ca-app-pub-5303925075056294/4632088499",
    android: "ca-app-pub-5303925075056294/3007270775"
  }
};

class AdService {
  constructor() {
    this.isInitialized = false;
    this.interstitialAd = null;
    this.rewardedAd = null;
    this.appOpenAd = null;
    this.isInterstitialLoaded = false;
    this.isRewardedLoaded = false;
    this.isAppOpenLoaded = false;
    this.lastInterstitialTime = 0;
    this.lastAppOpenTime = 0;
    this.actionCounter = 0;
  }

  async requestATTWithRetry(maxAttempts = 3, delayMs = 1500) {
    if (Platform.OS !== "ios") return;
    try {
      const TrackingTransparency = require("expo-tracking-transparency");
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const { status } = await TrackingTransparency.getTrackingPermissionsAsync();
        if (status !== "undetermined") {
          return status;
        }

        // Attendre que la vue native de l'application soit totalement active et visible
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        const res = await TrackingTransparency.requestTrackingPermissionsAsync();
        if (res.status !== "undetermined") {
          return res.status;
        }
        console.warn(`ATT request attempt ${attempt} undetermined, retrying...`);
      }
    } catch (attError) {
      console.warn("ATT permission request error:", attError);
    }
  }

  async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (Platform.OS === "web") return;

    // 1. Demande d'autorisation App Tracking Transparency (ATT) sur iOS (Guideline 2.1 Apple)
    // Toujours exécutée AVANT toute collecte ou initialisation d'AdMob
    if (Platform.OS === "ios") {
      await this.requestATTWithRetry();
    }

    if (!MobileAds) return;

    try {
      // 2. Demande de consentement RGPD / UMP officiel Google
      if (AdsConsent) {
        try {
          await AdsConsent.gatherConsent();
        } catch (consentError) {
          console.warn("AdsConsent.gatherConsent error:", consentError);
        }
      }

      // 3. Initialisation d'AdMob
      await MobileAds().initialize();
      this._preloadInterstitial();
      this._preloadRewarded();
      this._preloadAppOpen();
    } catch (e) {
      console.warn("AdMob initialization error:", e);
    }
  }

  getBannerAdUnitId() {
    return Platform.OS === "ios" ? AD_UNIT_IDS.banner.ios : AD_UNIT_IDS.banner.android;
  }

  getAppOpenAdUnitId() {
    return Platform.OS === "ios" ? AD_UNIT_IDS.appOpen.ios : AD_UNIT_IDS.appOpen.android;
  }

  getInterstitialAdUnitId() {
    return Platform.OS === "ios" ? AD_UNIT_IDS.interstitial.ios : AD_UNIT_IDS.interstitial.android;
  }

  getRewardedAdUnitId() {
    return Platform.OS === "ios" ? AD_UNIT_IDS.rewarded.ios : AD_UNIT_IDS.rewarded.android;
  }

  _preloadInterstitial() {
    if (!InterstitialAd) return;
    try {
      const unitId = this.getInterstitialAdUnitId();
      this.interstitialAd = InterstitialAd.createForAdRequest(unitId, {
        requestNonPersonalizedAdsOnly: false
      });

      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        this.isInterstitialLoaded = true;
      });

      this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
        this.isInterstitialLoaded = false;
        // Recharger automatiquement le prochain interstitiel
        setTimeout(() => this._preloadInterstitial(), 2000);
      });

      this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
        this.isInterstitialLoaded = false;
        setTimeout(() => this._preloadInterstitial(), 15000);
      });

      this.interstitialAd.load();
    } catch (e) {
      this.isInterstitialLoaded = false;
    }
  }

  _preloadRewarded() {
    if (!RewardedAd) return;
    try {
      const unitId = this.getRewardedAdUnitId();
      this.rewardedAd = RewardedAd.createForAdRequest(unitId, {
        requestNonPersonalizedAdsOnly: false
      });

      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        this.isRewardedLoaded = true;
      });

      this.rewardedAd.addAdEventListener(AdEventType.OPENED, () => {
        if (this._onAdStartedCallback) {
          this._onAdStartedCallback();
          this._onAdStartedCallback = null;
        }
      });

      this.rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
        if (this._onRewardedCallback) {
          this._onRewardedCallback(reward);
          this._onRewardedCallback = null;
        }
      });

      this.rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
        this.isRewardedLoaded = false;
        if (this._onDismissCallback) {
          this._onDismissCallback();
          this._onDismissCallback = null;
        }
        // Recharger automatiquement la prochaine vidéo récompensée
        setTimeout(() => this._preloadRewarded(), 2000);
      });

      this.rewardedAd.addAdEventListener(AdEventType.ERROR, (error) => {
        this.isRewardedLoaded = false;
        if (this._onFailCallback) {
          this._onFailCallback(error);
          this._onFailCallback = null;
        }
        setTimeout(() => this._preloadRewarded(), 15000);
      });

      this.rewardedAd.load();
    } catch (e) {
      this.isRewardedLoaded = false;
    }
  }

  _preloadAppOpen() {
    if (!AppOpenAd) return;
    try {
      const unitId = this.getAppOpenAdUnitId();
      this.appOpenAd = AppOpenAd.createForAdRequest(unitId, {
        requestNonPersonalizedAdsOnly: false
      });

      this.appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
        this.isAppOpenLoaded = true;
      });

      this.appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
        this.isAppOpenLoaded = false;
        this.lastAppOpenTime = Date.now();
        setTimeout(() => this._preloadAppOpen(), 3000);
      });

      this.appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
        this.isAppOpenLoaded = false;
        setTimeout(() => this._preloadAppOpen(), 30000);
      });

      this.appOpenAd.load();
    } catch (e) {
      this.isAppOpenLoaded = false;
    }
  }

  /**
   * Affiche une publicité interstitielle plein écran (si l'utilisateur n'est pas Pro)
   * @param {Object} options
   * @param {Function} options.onComplete Callback appelé à la fermeture de la pub ou si ignorée
   * @param {number} options.minIntervalSeconds Intervalle minimum entre 2 interstitiels (défaut: 60s)
   */
  async showInterstitial({ onComplete = () => {}, minIntervalSeconds = 60 } = {}) {
    // Si l'utilisateur est abonné Pro, ignorer immédiatement
    if (purchaseService.getIsPro()) {
      onComplete();
      return;
    }

    const now = Date.now();
    if (now - this.lastInterstitialTime < minIntervalSeconds * 1000) {
      onComplete();
      return;
    }

    if (this.isInterstitialLoaded && this.interstitialAd) {
      try {
        const unsubscribe = this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
          unsubscribe();
          this.lastInterstitialTime = Date.now();
          onComplete();
        });
        await this.interstitialAd.show();
      } catch (e) {
        onComplete();
      }
    } else {
      // Si la pub n'était pas encore chargée, continuer normalement
      this._preloadInterstitial();
      onComplete();
    }
  }

  /**
   * Enregistre une action importante (ex: swap de repas, recette frigo, export)
   * et déclenche l'interstitiel toutes les N actions (défaut: 5).
   * @param {Object} options
   * @param {number} options.triggerEveryActions Nombre d'actions requises (défaut: 5)
   * @param {Function} options.onComplete Callback appelé à la fin
   * @param {number} options.minIntervalSeconds Intervalle minimum en secondes (défaut: 60s)
   */
  async recordActionAndCheckInterstitial({ triggerEveryActions = 5, onComplete = () => {}, minIntervalSeconds = 60 } = {}) {
    if (purchaseService.getIsPro()) {
      onComplete();
      return;
    }

    this.actionCounter++;
    if (this.actionCounter >= triggerEveryActions) {
      this.actionCounter = 0;
      await this.showInterstitial({ onComplete, minIntervalSeconds });
    } else {
      onComplete();
    }
  }

  /**
   * Affiche une vidéo récompensée de 15-30s pour débloquer le Drive ou le Frigo
   * @param {Object} options
   * @param {Function} options.onRewarded Callback appelé quand l'utilisateur a regardé la vidéo avec succès
   * @param {Function} options.onDismiss Callback appelé si la vidéo est fermée
   * @param {Function} options.onFail Callback appelé en cas d'erreur de chargement
   */
  async showRewardedVideo({
    onStarted = () => {},
    onRewarded = () => {},
    onDismiss = () => {},
    onFail = () => {},
    allowFallbackReward = false,
    maxWaitMs = 3500
  } = {}) {
    // Si l'utilisateur est abonné Pro, récompense accordée instantanément sans pub
    if (purchaseService.getIsPro()) {
      onStarted();
      onRewarded({ type: "pro_bypass", amount: 1 });
      return;
    }

    // Si la vidéo est en cours de préchargement, attendre jusqu'à maxWaitMs
    if (!this.isRewardedLoaded && maxWaitMs > 0) {
      await new Promise((resolve) => {
        let elapsed = 0;
        const interval = setInterval(() => {
          elapsed += 150;
          if (this.isRewardedLoaded || elapsed >= maxWaitMs) {
            clearInterval(interval);
            resolve();
          }
        }, 150);
      });
    }

    if (this.isRewardedLoaded && this.rewardedAd) {
      try {
        this._onAdStartedCallback = onStarted;
        this._onRewardedCallback = onRewarded;
        this._onDismissCallback = onDismiss;
        this._onFailCallback = onFail;
        await this.rewardedAd.show();
        // Filet de sécurité au cas où l'événement OPENED est retardé par le bridge natif
        setTimeout(() => {
          if (this._onAdStartedCallback) {
            this._onAdStartedCallback();
            this._onAdStartedCallback = null;
          }
        }, 400);
        return;
      } catch (e) {
        console.warn("Erreur affichage rewarded ad:", e);
      }
    }

    // Si la vidéo récompensée n'est pas encore en cache, afficher l'interstitiel
    if (this.isInterstitialLoaded && this.interstitialAd) {
      try {
        this._onAdStartedCallback = onStarted;
        await this.showInterstitial({
          onComplete: () => {
            onRewarded({ type: "interstitial_reward", amount: 1 });
          },
          minIntervalSeconds: 0
        });
        if (this._onAdStartedCallback) {
          this._onAdStartedCallback();
          this._onAdStartedCallback = null;
        }
        return;
      } catch (e) {}
    }

    // Si aucune pub n'était prête en cache
    this._preloadRewarded();
    this._preloadInterstitial();

    if (allowFallbackReward) {
      onStarted();
      onRewarded({ type: "fallback_reward", amount: 1 });
    } else {
      if (onFail) {
        onFail({ reason: "not_ready" });
      }
    }
  }

  /**
   * Tente d'afficher une publicité App Open au lancement de l'application
   * Attend jusqu'à maxWaitMs que l'annonce se charge pour une transition fluide
   */
  async showAppOpenOnStartup({ maxWaitMs = 2500, minIntervalMinutes = 45 } = {}) {
    if (purchaseService.getIsPro()) return;

    const now = Date.now();
    if (this.lastAppOpenTime && (now - this.lastAppOpenTime < minIntervalMinutes * 60 * 1000)) {
      return;
    }

    if (this.isAppOpenLoaded && this.appOpenAd) {
      try {
        await this.appOpenAd.show();
        return;
      } catch (e) {}
    }

    return new Promise((resolve) => {
      let finished = false;
      const timeout = setTimeout(() => {
        if (!finished) {
          finished = true;
          resolve();
        }
      }, maxWaitMs);

      const checkInterval = setInterval(() => {
        if (this.isAppOpenLoaded && this.appOpenAd && !finished) {
          finished = true;
          clearInterval(checkInterval);
          clearTimeout(timeout);
          this.appOpenAd.show().catch(() => {}).finally(() => resolve());
        }
      }, 150);
    });
  }
}

export const adService = new AdService();

