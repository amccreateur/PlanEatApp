import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { adService } from "../services/adService";
import { purchaseService } from "../services/purchaseService";

let BannerAd = null;
let BannerAdSize = null;

if (Platform.OS !== "web") {
  try {
    const GoogleAds = require("react-native-google-mobile-ads");
    BannerAd = GoogleAds.BannerAd;
    BannerAdSize = GoogleAds.BannerAdSize;
  } catch (e) {}
}

export default function BannerAdView({ style, isPro: isProProp }) {
  const [isPro, setIsPro] = useState(isProProp !== undefined ? isProProp : purchaseService.getIsPro());
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (isProProp !== undefined) {
      setIsPro(isProProp);
    }
  }, [isProProp]);

  useEffect(() => {
    const unsubscribe = purchaseService.subscribe((proStatus) => {
      setIsPro(proStatus);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Si l'utilisateur est abonné Pro ou si on est sur le Web / sans module AdMob, ne rien afficher
  if (isPro || Platform.OS === "web" || !BannerAd || !BannerAdSize) {
    return null;
  }

  const unitId = adService.getBannerAdUnitId();

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false
        }}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => {
          setAdLoaded(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "hidden"
  }
});
