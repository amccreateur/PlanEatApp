import { Platform } from "react-native";
import { purchaseService } from "./purchaseService";

let MobileAds = null;
let BannerAd = null;
let BannerAdSize = null;
let InterstitialAd = null;
let RewardedAd = null;
let AdEventType = null;
let RewardedAdEventType = null;
let TestIds = null;

if (Platform.OS !== "web") {
  try {
    const GoogleAds = require("react-native-google-mobile-ads");
    MobileAds = GoogleAds.default || GoogleAds;
    BannerAd = GoogleAds.BannerAd;
    BannerAdSize = GoogleAds.BannerAdSize;
    InterstitialAd = GoogleAds.InterstitialAd;
    RewardedAd = GoogleAds.RewardedAd;
    AdEventType = GoogleAds.AdEventType;
    RewardedAdEventType = GoogleAds.RewardedAdEventType;
    TestIds = GoogleAds.TestIds;
  } catch (e) {
    // Graceful fallback for web or unsupported environments
  }
}

// Identifiants des Blocs d'annonces Google AdMob
// Remplacer par vos IDs de production créés sur Google AdMob
export const AD_UNIT_IDS = {
  banner: {
    ios: TestIds?.BANNER || "ca-app-pub-3940256099942544/2934735716",
    android: TestIds?.BANNER || "ca-app-pub-3940256099942544/6300978111"
  },
  interstitial: {
    ios: TestIds?.INTERSTITIAL || "ca-app-pub-3940256099942544/4411468910",
    android: TestIds?.INTERSTITIAL || "ca-app-pub-3940256099942544/1033173712"
  },
  rewarded: {
    ios: TestIds?.REWARDED || "ca-app-pub-3940256099942544/1712485313",
    android: TestIds?.REWARDED || "ca-app-pub-3940256099942544/5224354917"
  }
};

class AdService {
  constructor() {
    this.isInitialized = false;
    this.interstitialAd = null;
    this.rewardedAd = null;
    this.isInterstitialLoaded = false;
    this.isRewardedLoaded = false;
    this.lastInterstitialTime = 0;
  }

  async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (Platform.OS === "web" || !MobileAds) return;

    try {
      await MobileAds().initialize();
      this._preloadInterstitial();
      this._preloadRewarded();
    } catch (e) {
      console.warn("AdMob initialization error:", e);
    }
  }

  getBannerAdUnitId() {
    return Platform.OS === "ios" ? AD_UNIT_IDS.banner.ios : AD_UNIT_IDS.banner.android;
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

  /**
   * Affiche une publicité interstitielle plein écran (si l'utilisateur n'est pas Pro)
   * @param {Object} options
   * @param {Function} options.onComplete Callback appelé à la fermeture de la pub ou si ignorée
   * @param {number} options.minIntervalSeconds Intervalle minimum entre 2 interstitiels (défaut: 30s)
   */
  async showInterstitial({ onComplete = () => {}, minIntervalSeconds = 20 } = {}) {
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
   * Affiche une vidéo récompensée de 15-30s pour débloquer le Drive ou le Frigo
   * @param {Object} options
   * @param {Function} options.onRewarded Callback appelé quand l'utilisateur a regardé la vidéo avec succès
   * @param {Function} options.onDismiss Callback appelé si la vidéo est fermée
   * @param {Function} options.onFail Callback appelé en cas d'erreur de chargement
   */
  async showRewardedVideo({ onRewarded = () => {}, onDismiss = () => {}, onFail = () => {} } = {}) {
    // Si l'utilisateur est abonné Pro, récompense accordée instantanément sans pub
    if (purchaseService.getIsPro()) {
      onRewarded({ type: "pro_bypass", amount: 1 });
      return;
    }

    if (this.isRewardedLoaded && this.rewardedAd) {
      try {
        this._onRewardedCallback = onRewarded;
        this._onDismissCallback = onDismiss;
        this._onFailCallback = onFail;
        await this.rewardedAd.show();
      } catch (e) {
        // En cas d'erreur d'affichage, accorder le déblocage pour ne pas bloquer l'utilisateur
        onRewarded({ type: "fallback_reward", amount: 1 });
        this._preloadRewarded();
      }
    } else {
      // Si la pub n'était pas prête (ex: réseau lent ou dev), débloquer gracieusement
      onRewarded({ type: "instant_fallback", amount: 1 });
      this._preloadRewarded();
    }
  }
}

export const adService = new AdService();
