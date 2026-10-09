import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TRANSLATIONS } from "../i18n/translations";

import { THEMES } from "../utils/theme";

export default function QuickMenuModal({
  visible,
  onClose,
  onOpenFridge,
  onOpenProfile,
  onOpenDrive,
  onOpenPaywall,
  isPro = false,
  aiConfig,
  profile,
  lang,
  onLanguageChange,
  themeMode = "dark",
  onToggleTheme
}) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, Platform.OS === "ios" ? 54 : 20);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";
  const theme = THEMES[themeMode] || THEMES.dark;

  const totalServings = (profile?.adults || 0) + (profile?.children || 0);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay, paddingTop: topInset + 8 }]}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <View style={[styles.modalCard, { backgroundColor: theme.cardBg, borderColor: theme.border, maxHeight: "92%" }]}>
                {/* Header with Title and Close button */}
                <View style={[styles.headerRow, { borderBottomColor: theme.border }, isRTL && styles.rtlRow]}>
                  <View style={[styles.headerTitleBox, isRTL && styles.rtlRow]}>
                    <View style={styles.headerIconBadge}>
                      <Ionicons name="apps" size={20} color="#10b981" />
                    </View>
                    <View>
                      <Text style={[styles.headerTitle, { color: theme.text }]}>Menu & Raccourcis</Text>
                      <Text style={[styles.headerSubtitle, { color: theme.textSub }]}>PlanEat Smart Menu</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    style={[styles.closeBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
                    onPress={onClose}
                  >
                    <Ionicons name="close" size={20} color={theme.textSub} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
                  {/* Action 1 : Remplir mon panier Drive */}
                  <TouchableOpacity
                    style={[styles.menuActionCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
                    activeOpacity={0.7}
                    onPress={() => {
                      onClose();
                      if (onOpenDrive) onOpenDrive();
                    }}
                  >
                    <LinearGradient
                      colors={["#0066c0", "#0284c7"]}
                      style={styles.actionIconBg}
                    >
                      <Ionicons name="cart" size={22} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.actionTextBox}>
                      <View style={[styles.actionTitleRow, isRTL && styles.rtlRow]}>
                        <Text style={[styles.actionTitle, { color: theme.text }]}>{t.driveOrderBtn || "Panier Drive Connecté"}</Text>
                      </View>
                      <Text style={[styles.actionDesc, { color: theme.textSub }]}>
                        Remplissage guidé sur votre supermarché en ligne
                      </Text>
                    </View>
                    <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color={theme.textMuted} />
                  </TouchableOpacity>

                  {/* Action 2 : Mode Vide-Frigo */}
                  <TouchableOpacity
                    style={[styles.menuActionCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
                    activeOpacity={0.7}
                    onPress={() => {
                      onClose();
                      onOpenFridge();
                    }}
                  >
                    <LinearGradient
                      colors={["#0284c7", "#0369a1"]}
                      style={styles.actionIconBg}
                    >
                      <Ionicons name="snow" size={22} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.actionTextBox}>
                      <View style={[styles.actionTitleRow, isRTL && styles.rtlRow]}>
                        <Text style={[styles.actionTitle, { color: theme.text }]}>{t.fridgeTitle || "Mode Vide-Frigo"}</Text>
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>Anti-Gaspi</Text>
                        </View>
                      </View>
                      <Text style={[styles.actionDesc, { color: theme.textSub }]}>
                        {t.fridgeSubtitle || "Cuisinez vos restes avec l'IA"}
                      </Text>
                    </View>
                    <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color={theme.textMuted} />
                  </TouchableOpacity>



                  {/* Action 3 : PlanEat Pro */}
                  <TouchableOpacity
                    style={[styles.menuActionCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
                    activeOpacity={0.7}
                    onPress={() => {
                      onClose();
                      if (onOpenPaywall) onOpenPaywall();
                    }}
                  >
                    <LinearGradient
                      colors={["#f59e0b", "#d97706"]}
                      style={styles.actionIconBg}
                    >
                      <Ionicons name="star" size={22} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.actionTextBox}>
                      <View style={[styles.actionTitleRow, isRTL && styles.rtlRow]}>
                        <Text style={[styles.actionTitle, { color: theme.text }]}>PlanEat Pro (Sans pub)</Text>
                        <View style={[styles.newBadge, { backgroundColor: "rgba(245, 158, 11, 0.2)" }]}>
                          <Text style={[styles.newBadgeText, { color: "#f59e0b" }]}>{isPro ? "Actif 👑" : "0,83 €/m"}</Text>
                        </View>
                      </View>
                      <Text style={[styles.actionDesc, { color: theme.textSub }]}>
                        {isPro ? "Abonnement actif • Aucune publicité" : "Supprimez toutes les publicités & vidéos"}
                      </Text>
                    </View>
                    <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color={theme.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.menuActionCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}
                    activeOpacity={0.7}
                    onPress={() => {
                      onClose();
                      onOpenProfile();
                    }}
                  >
                    <LinearGradient
                      colors={["#10b981", "#059669"]}
                      style={styles.actionIconBg}
                    >
                      <Ionicons name="people" size={22} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.actionTextBox}>
                      <View style={[styles.actionTitleRow, isRTL && styles.rtlRow]}>
                        <Text style={[styles.actionTitle, { color: theme.text }]}>{t.tabProfile || "Mon Foyer"}</Text>
                        <View style={styles.profileBadge}>
                          <Text style={styles.profileBadgeText}>
                            {totalServings} {t.servingsShort || "pers."}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.actionDesc, { color: theme.textSub }]}>
                        {profile?.adults || 2} adultes, {profile?.children || 0} enfants • Régimes & Allergies
                      </Text>
                    </View>
                    <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color={theme.textMuted} />
                  </TouchableOpacity>

                  {/* Action 5 : Thème App (Mode Sombre / Mode Blanc) */}
                  <View style={[styles.langSection, { borderTopColor: theme.border }]}>
                    <Text style={[styles.sectionLabel, { color: theme.textSub }]}>{t.themeTitle || "Thème / Mode d'affichage"}</Text>
                    <View style={[styles.langRow, isRTL && styles.rtlRow]}>
                      <TouchableOpacity
                        style={[
                          styles.langBtn,
                          { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                          themeMode === "light" && styles.themeBtnActiveLight
                        ]}
                        onPress={() => onToggleTheme && onToggleTheme("light")}
                      >
                        <Text style={styles.langFlag}>☀️</Text>
                        <Text style={[
                          styles.langBtnText,
                          { color: theme.textSub },
                          themeMode === "light" && styles.themeBtnTextActiveLight
                        ]}>
                          {t.themeLight || "Mode Blanc"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.langBtn,
                          { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                          themeMode === "dark" && styles.themeBtnActiveDark
                        ]}
                        onPress={() => onToggleTheme && onToggleTheme("dark")}
                      >
                        <Text style={styles.langFlag}>🌙</Text>
                        <Text style={[
                          styles.langBtnText,
                          { color: theme.textSub },
                          themeMode === "dark" && styles.themeBtnTextActiveDark
                        ]}>
                          {t.themeDark || "Mode Sombre"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Action 6 : Sélecteur de Langues */}
                  <View style={[styles.langSection, { borderTopColor: theme.border, marginTop: 12 }]}>
                    <Text style={[styles.sectionLabel, { color: theme.textSub }]}>Langue / Language</Text>
                    <View style={[styles.langRow, isRTL && styles.rtlRow]}>
                      <TouchableOpacity
                        style={[
                          styles.langBtn,
                          { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                          lang === "fr" && styles.langBtnActive
                        ]}
                        onPress={() => onLanguageChange("fr")}
                      >
                        <Text style={styles.langFlag}>🇫🇷</Text>
                        <Text style={[styles.langBtnText, { color: theme.textSub }, lang === "fr" && styles.langBtnTextActive]}>
                          Français
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.langBtn,
                          { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                          lang === "en" && styles.langBtnActive
                        ]}
                        onPress={() => onLanguageChange("en")}
                      >
                        <Text style={styles.langFlag}>🇬🇧</Text>
                        <Text style={[styles.langBtnText, { color: theme.textSub }, lang === "en" && styles.langBtnTextActive]}>
                          English
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10
  },
  modalContainer: {
    width: "100%",
    maxWidth: 480,
    paddingHorizontal: 16
  },
  modalCard: {
    backgroundColor: "#1e293b",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#334155"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  headerTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  headerIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800"
  },
  headerSubtitle: {
    color: "#94a3b8",
    fontSize: 12
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  menuScroll: {
    marginTop: 12
  },
  menuActionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 12
  },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  actionTextBox: {
    flex: 1
  },
  actionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2
  },
  actionTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "700"
  },
  actionDesc: {
    color: "#94a3b8",
    fontSize: 12
  },
  newBadge: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  newBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700"
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  statusBadgeMistral: {
    backgroundColor: "rgba(192, 132, 252, 0.2)"
  },
  statusBadgeLocal: {
    backgroundColor: "rgba(56, 189, 248, 0.2)"
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700"
  },
  statusBadgeTextMistral: {
    color: "#c084fc"
  },
  statusBadgeTextLocal: {
    color: "#38bdf8"
  },
  profileBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  profileBadgeText: {
    color: "#10b981",
    fontSize: 10,
    fontWeight: "700"
  },
  langSection: {
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155"
  },
  sectionLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10
  },
  langRow: {
    flexDirection: "row",
    gap: 8
  },
  langBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 6
  },
  langBtnActive: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "#10b981"
  },
  langFlag: {
    fontSize: 16
  },
  langBtnText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600"
  },
  langBtnTextActive: {
    color: "#10b981",
    fontWeight: "800"
  },
  themeBtnActiveLight: {
    backgroundColor: "rgba(2, 132, 199, 0.15)",
    borderColor: "#0284c7"
  },
  themeBtnTextActiveLight: {
    color: "#0284c7",
    fontWeight: "800"
  },
  themeBtnActiveDark: {
    backgroundColor: "rgba(147, 51, 234, 0.15)",
    borderColor: "#9333ea"
  },
  themeBtnTextActiveDark: {
    color: "#9333ea",
    fontWeight: "800"
  },
  proBannerCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  proBannerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14
  },
  proBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },
  proCrownCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  proBannerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  proBannerSubtitle: {
    color: "#ffffff",
    opacity: 0.9,
    fontSize: 11,
    marginTop: 1
  }
});

