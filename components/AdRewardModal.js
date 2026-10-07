import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { THEMES } from "../utils/theme";
import { adService } from "../services/adService";

export default function AdRewardModal({
  visible,
  onClose,
  onRewardEarned,
  onOpenPaywall,
  title = "Fonctionnalité Avancée",
  subtitle = "Regardez une courte vidéo pour débloquer cette action gratuitement, ou passez à PlanEat Pro pour un accès illimité sans publicité.",
  icon = "gift",
  iconColor = "#10b981",
  actionLabel = "Lancer",
  themeMode = "dark"
}) {
  const theme = THEMES[themeMode] || THEMES.dark;
  const [isLoadingAd, setIsLoadingAd] = React.useState(false);

  const handleWatchVideo = async () => {
    setIsLoadingAd(true);
    try {
      await adService.showRewardedVideo({
        onRewarded: (reward) => {
          setIsLoadingAd(false);
          onClose();
          if (onRewardEarned) {
            setTimeout(() => onRewardEarned(reward), 200);
          }
        },
        onDismiss: () => {
          setIsLoadingAd(false);
        },
        onFail: () => {
          setIsLoadingAd(false);
          // En cas d'erreur de chargement, débloquer gracieusement
          onClose();
          if (onRewardEarned) {
            setTimeout(() => onRewardEarned({ type: "fallback" }), 200);
          }
        }
      });
    } catch (e) {
      setIsLoadingAd(false);
      onClose();
      if (onRewardEarned) onRewardEarned({ type: "error_fallback" });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={20} color={theme.textSub} />
          </TouchableOpacity>

          {/* Icon Circle */}
          <View style={[styles.iconCircle, { backgroundColor: "rgba(16, 185, 129, 0.12)" }]}>
            <Ionicons name={icon} size={36} color={iconColor} />
          </View>

          {/* Title & Description */}
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSub }]}>{subtitle}</Text>

          {/* Action 1 : Watch Video (Free) */}
          <TouchableOpacity
            style={styles.watchVideoBtn}
            onPress={handleWatchVideo}
            disabled={isLoadingAd}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.watchVideoGradient}
            >
              {isLoadingAd ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="play-circle" size={20} color="#ffffff" />
                  <Text style={styles.watchVideoBtnText}>Regarder une vidéo (15-30s)</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Action 2 : Go Pro (No ads) */}
          <TouchableOpacity
            style={[styles.goProBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
            onPress={() => {
              onClose();
              if (onOpenPaywall) onOpenPaywall();
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="sparkles" size={16} color="#eab308" />
            <Text style={[styles.goProBtnText, { color: theme.text }]}>
              Passer à PlanEat Pro (Sans pub)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  card: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    position: "relative"
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 8
  },
  watchVideoBtn: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10
  },
  watchVideoGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    gap: 8
  },
  watchVideoBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  goProBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8
  },
  goProBtnText: {
    fontSize: 13,
    fontWeight: "700"
  }
});

