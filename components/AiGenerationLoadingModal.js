import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { THEMES } from "../utils/theme";
import { TRANSLATIONS } from "../i18n/translations";

export default function AiGenerationLoadingModal({
  visible,
  lang = "fr",
  themeMode = "dark",
  durationWeeks = 1
}) {
  const insets = useSafeAreaInsets();
  const theme = THEMES[themeMode] || THEMES.dark;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Animated values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    { key: "step1", text: t.aiLoadingStep1 || "Analyse des profils & régimes du foyer...", icon: "nutrition-outline", color: "#10b981" },
    { key: "step2", text: t.aiLoadingStep2 || "Création des recettes sur-mesure par l'IA...", icon: "restaurant-outline", color: "#a855f7" },
    { key: "step3", text: t.aiLoadingStep3 || "Calcul des portions et ingrédients...", icon: "scale-outline", color: "#f59e0b" },
    { key: "step4", text: t.aiLoadingStep4 || "Génération de la liste de courses optimisée...", icon: "cart-outline", color: "#38bdf8" }
  ];

  useEffect(() => {
    let stepInterval = null;
    let pulseLoop = null;
    let rotateLoop = null;

    if (visible) {
      setCurrentStepIndex(0);
      progressAnim.setValue(0);

      // Start progress bar animation (smooth 0 -> 92% over 14s)
      Animated.timing(progressAnim, {
        toValue: 0.92,
        duration: 14000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false
      }).start();

      // Step switcher
      stepInterval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 3500);

      // Pulsing glow
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      );
      pulseLoop.start();

      // Rotating chef icon
      rotateLoop = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      );
      rotateLoop.start();
    } else {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
      progressAnim.setValue(0);
    }

    return () => {
      if (stepInterval) clearInterval(stepInterval);
      if (pulseLoop) pulseLoop.stop();
      if (rotateLoop) rotateLoop.stop();
    };
  }, [visible]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={[styles.backdrop, { paddingBottom: Math.max(insets.bottom, 20), paddingTop: Math.max(insets.top, 20) }]}>
        <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          
          {/* Animated Chef Glowing Icon */}
          <View style={styles.iconContainer}>
            <Animated.View
              style={[
                styles.glowCircle,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              <LinearGradient
                colors={["rgba(168, 85, 247, 0.35)", "rgba(56, 189, 248, 0.15)"]}
                style={styles.glowGradient}
              />
            </Animated.View>

            <LinearGradient
              colors={["#7c3aed", "#6366f1"]}
              style={styles.chefBadge}
            >
              <Ionicons name="sparkles" size={36} color="#ffffff" />
            </LinearGradient>
          </View>

          {/* Main Title & Subtitle */}
          <Text style={[styles.title, { color: theme.text }, isRTL && styles.rtlText]}>
            {t.aiLoadingTitle || "Votre Chef IA est aux fourneaux..."}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSub }, isRTL && styles.rtlText]}>
            {t.aiLoadingSubtitle || "Préparation d'un planning savoureux & équilibré"}
          </Text>

          {/* Progress Bar */}
          <View style={[styles.progressBarTrack, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]}>
              <LinearGradient
                colors={["#a855f7", "#38bdf8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>

          {/* Steps List */}
          <View style={styles.stepsContainer}>
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <View
                  key={step.key}
                  style={[
                    styles.stepRow,
                    isRTL && styles.rtlRow,
                    isCurrent && styles.stepRowActive,
                    { borderColor: isCurrent ? "rgba(168, 85, 247, 0.4)" : "transparent" }
                  ]}
                >
                  <View
                    style={[
                      styles.stepIconBubble,
                      {
                        backgroundColor: isCompleted
                          ? "#10b981"
                          : isCurrent
                          ? "rgba(168, 85, 247, 0.2)"
                          : theme.cardBgAlt
                      }
                    ]}
                  >
                    {isCompleted ? (
                      <Ionicons name="checkmark" size={14} color="#ffffff" />
                    ) : (
                      <Ionicons
                        name={step.icon}
                        size={14}
                        color={isCurrent ? "#c084fc" : theme.textMuted}
                      />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.stepText,
                      { color: theme.textMuted },
                      isCurrent && [styles.stepTextCurrent, { color: theme.text }],
                      isCompleted && [styles.stepTextCompleted, { color: theme.textSub }],
                      isRTL && styles.rtlText
                    ]}
                    numberOfLines={1}
                  >
                    {step.text}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Reassuring Notice Box */}
          <View style={[styles.noticeBox, { backgroundColor: "rgba(168, 85, 247, 0.1)", borderColor: "rgba(168, 85, 247, 0.25)" }]}>
            <View style={[styles.noticeHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="play-circle-outline" size={18} color="#a855f7" />
              <Text style={styles.noticeTitle}>
                {t.aiLoadingAdNoticeTitle || "Pourquoi une courte annonce ?"}
              </Text>
            </View>
            <Text style={[styles.noticeText, isRTL && styles.rtlText]}>
              {t.aiLoadingAdNoticeText || "Pendant que notre IA cuisine vos repas, une courte annonce est diffusée pour garder PlanEat 100% gratuit. Ne quittez pas l'application, tout sera prêt dans quelques secondes !"}
            </Text>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.88)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  card: {
    width: "100%",
    maxWidth: 390,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 15
  },
  iconContainer: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  glowCircle: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden"
  },
  glowGradient: {
    flex: 1,
    borderRadius: 45
  },
  chefBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 18
  },
  progressBarTrack: {
    width: "100%",
    height: 7,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 18
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4
  },
  progressGradient: {
    flex: 1,
    borderRadius: 4
  },
  stepsContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 18
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1
  },
  stepRowActive: {
    backgroundColor: "rgba(168, 85, 247, 0.08)"
  },
  stepIconBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center"
  },
  stepText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500"
  },
  stepTextCurrent: {
    fontWeight: "700"
  },
  stepTextCompleted: {
    fontWeight: "600",
    textDecorationLine: "none"
  },
  noticeBox: {
    width: "100%",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4
  },
  noticeTitle: {
    color: "#c084fc",
    fontSize: 12,
    fontWeight: "700"
  },
  noticeText: {
    color: "#cbd5e1",
    fontSize: 11,
    lineHeight: 16
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});

