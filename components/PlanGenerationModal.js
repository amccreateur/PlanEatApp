import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { THEMES } from "../utils/theme";
import { TRANSLATIONS } from "../i18n/translations";
import { adService } from "../services/adService";
import { StorageService } from "../utils/storage";

export default function PlanGenerationModal({
  visible,
  onClose,
  onSelectExpress,
  onSelectAi,
  onStartAiAd,
  onOpenPaywall,
  isPro = false,
  themeMode = "dark",
  lang = "fr"
}) {
  const insets = useSafeAreaInsets();
  const theme = THEMES[themeMode] || THEMES.dark;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [aiLimitStatus, setAiLimitStatus] = useState({ allowed: true, daysRemaining: 0 });

  React.useEffect(() => {
    if (visible) {
      StorageService.checkCanGenerateAiPlan(isPro).then(setAiLimitStatus);
    }
  }, [visible, isPro]);

  const handleLaunchAiWithReward = async () => {
    // Si abonné Pro, pas de pub et illimité : génération directe
    if (isPro) {
      onSelectAi();
      onClose();
      return;
    }

    // Si l'utilisateur Free a déjà consommé sa génération IA de la semaine
    if (!aiLimitStatus.allowed) {
      onClose();
      if (onOpenPaywall) onOpenPaywall();
      return;
    }

    setIsLoadingAd(true);
    // 1. Déclencher immédiatement la génération IA en arrière-plan pendant la vidéo
    if (onStartAiAd) {
      try {
        onStartAiAd();
      } catch (e) {
        console.warn("Erreur pré-lancement IA:", e);
      }
    }

    // 2. Afficher la vidéo récompensée AdMob
    try {
      await adService.showRewardedVideo({
        onRewarded: () => {
          setIsLoadingAd(false);
          onSelectAi();
          onClose();
        },
        onDismiss: () => {
          setIsLoadingAd(false);
        },
        onFail: () => {
          setIsLoadingAd(false);
          // En cas de non-disponibilité de pub, offrir gracieusement l'action
          onSelectAi();
          onClose();
        }
      });
    } catch (err) {
      setIsLoadingAd(false);
      onSelectAi();
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.backdrop,
          {
            paddingBottom: Math.max(insets.bottom, 20),
            paddingTop: Math.max(insets.top, 20)
          }
        ]}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: theme.cardBg, borderColor: theme.border }
          ]}
        >
          {/* Bouton Fermer */}
          <TouchableOpacity
            style={[styles.closeBtn, { backgroundColor: theme.cardBgAlt }]}
            onPress={onClose}
            disabled={isLoadingAd}
          >
            <Ionicons name="close" size={20} color={theme.textSub} />
          </TouchableOpacity>

          {/* En-tête */}
          <View style={styles.header}>
            <View style={[styles.mainIconBadge, { backgroundColor: "rgba(124, 58, 237, 0.12)" }]}>
              <Ionicons name="restaurant" size={28} color="#a855f7" />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>
              {t.choosePlanMode || "Mode de génération"}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSub }]}>
              {t.choosePlanModeSubtitle || "Choisissez comment concevoir votre semaine :"}
            </Text>
          </View>

          {/* OPTION 1 : Menu Express (Local) */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              { backgroundColor: theme.cardBgAlt, borderColor: theme.border }
            ]}
            onPress={() => {
              onClose();
              onSelectExpress();
            }}
            disabled={isLoadingAd}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeaderRow}>
              <View style={[styles.optionIconCircle, { backgroundColor: "rgba(16, 185, 129, 0.15)" }]}>
                <Ionicons name="flash" size={22} color="#10b981" />
              </View>
              <View style={styles.optionTitleCol}>
                <View style={styles.titleBadgeRow}>
                  <Text style={[styles.optionTitle, { color: theme.text }]}>
                    {t.expressPlanTitle || "Menu Express"}
                  </Text>
                  <View style={styles.instantBadge}>
                    <Text style={styles.instantBadgeText}>
                      {t.expressPlanBadge || "Instantané"}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.optionDesc, { color: theme.textSub }]}>
                  {t.expressPlanDesc || "Génération immédiate à partir du catalogue local de recettes équilibrées. 100% hors-ligne."}
                </Text>
              </View>
            </View>

            <View style={styles.btnExpressWrapper}>
              <View style={styles.btnExpress}>
                <Ionicons name="checkmark-circle-outline" size={17} color="#10b981" />
                <Text style={styles.btnExpressText}>
                  {t.expressPlanBtn || "Générer en 1 clic"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* OPTION 2 : Menu Sur-Mesure Chef IA (Gemini 2.5 Flash) */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              styles.optionCardAi,
              { backgroundColor: theme.cardBgAlt, borderColor: "#a855f7" }
            ]}
            onPress={handleLaunchAiWithReward}
            disabled={isLoadingAd}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["rgba(124, 58, 237, 0.08)", "rgba(168, 85, 247, 0.18)"]}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.optionHeaderRow}>
              <View style={[styles.optionIconCircle, { backgroundColor: "rgba(168, 85, 247, 0.2)" }]}>
                <Ionicons name="sparkles" size={22} color="#c084fc" />
              </View>
              <View style={styles.optionTitleCol}>
                <View style={styles.titleBadgeRow}>
                  <Text style={[styles.optionTitle, { color: "#c084fc" }]}>
                    {t.aiChefPlanTitle || "Chef IA Gemini ✨"}
                  </Text>
                  <View style={[
                    styles.rewardBadge,
                    isPro && styles.proBadge,
                    !isPro && !aiLimitStatus.allowed && styles.limitBadge
                  ]}>
                    <Ionicons
                      name={isPro ? "star" : (!aiLimitStatus.allowed ? "time-outline" : "videocam")}
                      size={12}
                      color="#ffffff"
                    />
                    <Text style={styles.rewardBadgeText}>
                      {isPro
                        ? (t.aiChefPlanBadgePro || "Inclus Pro ⭐")
                        : (!aiLimitStatus.allowed
                            ? `⏳ Dispo dans ${aiLimitStatus.daysRemaining}j`
                            : (t.aiChefPlanBadgeFree || "Court extrait vidéo"))}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.optionDesc, { color: theme.textSub }]}>
                  {!isPro && !aiLimitStatus.allowed
                    ? (lang === "fr"
                        ? "1 menu IA offert par semaine utilisé. Passez à Pro pour une IA illimitée ou choisissez le Menu Express !"
                        : "1 free AI menu per week used. Upgrade to Pro for unlimited AI or pick Express Menu!")
                    : (t.aiChefPlanDesc || "Menu 100% sur-mesure créé en direct par l'IA selon vos régimes, portions et cuisines favorites.")}
                </Text>
              </View>
            </View>

            <LinearGradient
              colors={
                !isPro && !aiLimitStatus.allowed
                  ? ["#d97706", "#7c3aed"]
                  : ["#7c3aed", "#9333ea"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.aiActionBtn}
            >
              {isLoadingAd ? (
                <View style={styles.btnRow}>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={styles.aiActionBtnText}>
                    {t.generatingAiPlan || "Préparation du Chef IA..."}
                  </Text>
                </View>
              ) : (
                <View style={styles.btnRow}>
                  <Ionicons
                    name={isPro ? "sparkles" : (!aiLimitStatus.allowed ? "star" : "play-circle")}
                    size={18}
                    color="#ffffff"
                  />
                  <Text style={styles.aiActionBtnText}>
                    {isPro
                      ? (t.aiChefPlanBtnPro || "Générer avec le Chef IA")
                      : (!aiLimitStatus.allowed
                          ? (lang === "fr" ? "⭐ Passer à Pro pour l'IA illimitée" : "⭐ Upgrade to Pro for Unlimited AI")
                          : (t.aiChefPlanBtnFree || "Regarder la vidéo & Créer le menu"))}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Lien PlanEat Pro pour les utilisateurs Free */}
          {!isPro && onOpenPaywall && (
            <TouchableOpacity
              style={styles.proLinkBtn}
              onPress={() => {
                onClose();
                onOpenPaywall();
              }}
            >
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text style={styles.proLinkText}>
                {lang === "fr"
                  ? "Passez à PlanEat Pro pour l'IA illimitée sans vidéo"
                  : "Upgrade to PlanEat Pro for unlimited AI without ads"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  card: {
    width: "100%",
    maxWidth: 440,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 18
      },
      android: {
        elevation: 10
      }
    })
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10
  },
  header: {
    alignItems: "center",
    marginBottom: 18
  },
  mainIconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 12
  },
  optionCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    marginBottom: 12,
    overflow: "hidden"
  },
  optionCardAi: {
    borderWidth: 1.8
  },
  optionHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12
  },
  optionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  optionTitleCol: {
    flex: 1
  },
  titleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 4,
    flexWrap: "wrap"
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "800"
  },
  instantBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.18)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  instantBadgeText: {
    color: "#10b981",
    fontSize: 11,
    fontWeight: "700"
  },
  rewardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#7c3aed",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  proBadge: {
    backgroundColor: "#059669"
  },
  limitBadge: {
    backgroundColor: "#d97706"
  },
  rewardBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700"
  },
  optionDesc: {
    fontSize: 12,
    lineHeight: 17
  },
  btnExpressWrapper: {
    marginTop: 2
  },
  btnExpress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)"
  },
  btnExpressText: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "700"
  },
  aiActionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  aiActionBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700"
  },
  proLinkBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 8
  },
  proLinkText: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center"
  }
});

