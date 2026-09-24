import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATIONS } from "../i18n/translations";
import { THEMES } from "../utils/theme";

export default function RecipeModal({
  visible,
  recipe,
  onClose,
  lang = "fr",
  themeMode = "dark"
}) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 20));
  const bottomInset = Math.max(insets.bottom, Platform.OS === "android" ? 56 : 24);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";
  const theme = THEMES[themeMode] || THEMES.dark;

  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cookingMode, setCookingMode] = useState("classic");

  const title = recipe?.title?.[lang] || recipe?.title?.fr || "Recette";
  const classicInstructions = recipe?.instructions?.[lang] || recipe?.instructions?.fr || [];
  const thermomixInstructions = recipe?.thermomixInstructions?.[lang] || recipe?.thermomixInstructions?.fr || recipe?.thermomixInstructions || [];
  const hasThermomix = Array.isArray(thermomixInstructions) && thermomixInstructions.length > 0;
  const currentInstructions = (cookingMode === "thermomix" && hasThermomix) ? thermomixInstructions : classicInstructions;

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!recipe) return null;

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const startQuickTimer = (mins) => {
    setTimerSeconds(mins * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const servings = recipe?.calculatedServings || 2;
  const factor = servings / 2;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={[styles.safeArea, { backgroundColor: theme.bg }]}>
        {/* Header avec safe inset padding pour iPhone / Dynamic Island */}
        <View style={[
          styles.header,
          {
            backgroundColor: theme.headerBg,
            borderBottomColor: theme.border,
            paddingTop: topInset + 6,
            paddingBottom: 14
          },
          isRTL && styles.rtlRow
        ]}>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomInset + 50 }]}
          showsVerticalScrollIndicator={true}
        >
          {/* Main Info Card */}
          <View style={[styles.heroCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={styles.heroEmoji}>{recipe.emoji || "🍽️"}</Text>
            <Text style={[styles.recipeTitle, { color: theme.text }, isRTL && styles.rtlText]}>{title}</Text>
            
            <View style={styles.badgesRow}>
              <View style={[styles.badge, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}>
                <Ionicons name="time-outline" size={16} color="#38bdf8" />
                <Text style={[styles.badgeText, { color: theme.textSub }]}>{recipe.prepTime + recipe.cookTime} {t.minutes}</Text>
              </View>

              <View style={[styles.badge, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}>
                <Ionicons name="people-outline" size={16} color="#10b981" />
                <Text style={[styles.badgeText, { color: theme.textSub }]}>{servings} {t.servingsShort}</Text>
              </View>

              <View style={[styles.badge, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}>
                <Ionicons name="flame-outline" size={16} color="#f59e0b" />
                <Text style={[styles.badgeText, { color: theme.textSub }]}>{recipe.caloriesPerPerson || 400} kcal</Text>
              </View>

              {hasThermomix && (
                <View style={[styles.badge, { backgroundColor: "#064e3b", borderColor: "#10b981", borderWidth: 1 }]}>
                  <Text style={[styles.badgeText, { color: "#34d399", fontWeight: "700" }]}>{t.thermomixBadge || "🤖 Thermomix"}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Quick Timer Box */}
          {timerSeconds > 0 && (
            <View style={styles.timerBox}>
              <Ionicons name="timer-outline" size={24} color="#f59e0b" />
              <Text style={styles.timerCountdown}>{formatTimer(timerSeconds)}</Text>
              <TouchableOpacity
                onPress={() => setIsTimerRunning(!isTimerRunning)}
                style={styles.timerActionBtn}
              >
                <Ionicons name={isTimerRunning ? "pause" : "play"} size={18} color="#0f172a" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setTimerSeconds(0); setIsTimerRunning(false); }}
                style={styles.timerResetBtn}
              >
                <Ionicons name="close" size={18} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          )}

          {/* Ingrédients */}
          <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.sectionHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="basket-outline" size={20} color="#10b981" />
              <Text style={[styles.sectionTitle, { color: theme.text }, isRTL && styles.rtlText]}>{t.ingredients}</Text>
              <Text style={[styles.servingsIndicator, { color: theme.textMuted }]}>({servings} {t.servings})</Text>
            </View>

            {recipe.ingredients?.map((ing, idx) => {
              const ingName = ing.name?.[lang] || ing.name?.fr;
              const scaledQty = Math.round((ing.quantity * factor) * 10) / 10;
              const isChecked = !!checkedIngredients[idx];

              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.ingredientRow, { borderBottomColor: theme.border }, isRTL && styles.rtlRow]}
                  onPress={() => toggleIngredient(idx)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isChecked ? "checkbox" : "square-outline"}
                    size={22}
                    color={isChecked ? "#10b981" : theme.textMuted}
                  />
                  <Text style={[
                    styles.ingredientName,
                    { color: theme.text },
                    isChecked && [styles.checkedText, { color: theme.textMuted }],
                    isRTL && styles.rtlText
                  ]}>
                    {ingName}
                  </Text>
                  <Text style={[styles.ingredientQty, isChecked && [styles.checkedText, { color: theme.textMuted }]]}>
                    {scaledQty} {ing.unit}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Instructions */}
          <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.sectionHeader, isRTL && styles.rtlRow, { justifyContent: "space-between" }]}>
              <View style={[styles.sectionHeaderLeft, isRTL && styles.rtlRow]}>
                <Ionicons name={cookingMode === "thermomix" ? "hardware-chip-outline" : "restaurant-outline"} size={20} color={cookingMode === "thermomix" ? "#10b981" : "#38bdf8"} />
                <Text style={[styles.sectionTitle, { color: theme.text }, isRTL && styles.rtlText]}>{t.instructions}</Text>
              </View>

              {/* Toggle Mode Classique / Thermomix si disponible */}
              {hasThermomix && (
                <View style={[styles.modeToggleContainer, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                  <TouchableOpacity
                    style={[styles.modeToggleBtn, cookingMode === "classic" && styles.modeToggleBtnActive]}
                    onPress={() => setCookingMode("classic")}
                  >
                    <Text style={[styles.modeToggleText, cookingMode === "classic" && styles.modeToggleTextActive]}>
                      🍳 {t.traditionalMode || "Classique"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modeToggleBtn, cookingMode === "thermomix" && styles.modeToggleBtnThermomixActive]}
                    onPress={() => setCookingMode("thermomix")}
                  >
                    <Text style={[styles.modeToggleText, cookingMode === "thermomix" && styles.modeToggleTextActive]}>
                      🤖 Thermomix
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {currentInstructions.map((stepText, idx) => {
              const isThermomixStep = cookingMode === "thermomix";
              return (
                <View key={idx} style={[styles.stepItem, isRTL && styles.rtlRow]}>
                  <View style={[
                    styles.stepNumberBadge,
                    isThermomixStep && { backgroundColor: "#10b981" }
                  ]}>
                    <Text style={styles.stepNumber}>{idx + 1}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepText, { color: theme.textSub }, isRTL && styles.rtlText]}>{stepText}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Astuce du Chef (Chef Tip) */}
          {(recipe.chefTip || recipe.tip) && (
            <View style={[styles.chefTipBox, { backgroundColor: theme.isDark ? "rgba(245, 158, 11, 0.12)" : "#fef3c7", borderColor: "#f59e0b" }]}>
              <Ionicons name="bulb" size={22} color="#f59e0b" style={{ marginTop: 1 }} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.chefTipTitle, { color: theme.isDark ? "#fbbf24" : "#b45309" }]}>Astuce du Chef :</Text>
                <Text style={[styles.chefTipText, { color: theme.isDark ? "#fde68a" : "#78350f" }]}>
                  {typeof (recipe.chefTip || recipe.tip) === "object"
                    ? ((recipe.chefTip || recipe.tip)[lang] || (recipe.chefTip || recipe.tip).fr || Object.values(recipe.chefTip || recipe.tip)[0])
                    : (recipe.chefTip || recipe.tip)}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b"
  },
  headerTitle: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    textAlign: "center"
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center"
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  heroCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155"
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 12
  },
  recipeTitle: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6
  },
  badgeText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "600"
  },
  timerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#78350f",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    gap: 12
  },
  timerCountdown: {
    color: "#fef3c7",
    fontSize: 22,
    fontWeight: "800",
    flex: 1
  },
  timerActionBtn: {
    backgroundColor: "#f59e0b",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  timerResetBtn: {
    padding: 6
  },
  sectionCard: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  modeToggleContainer: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 2,
    gap: 2
  },
  modeToggleBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8
  },
  modeToggleBtnActive: {
    backgroundColor: "#0284c7"
  },
  modeToggleBtnThermomixActive: {
    backgroundColor: "#10b981"
  },
  modeToggleText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700"
  },
  modeToggleTextActive: {
    color: "#ffffff"
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "700"
  },
  servingsIndicator: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "500"
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155/40",
    gap: 10
  },
  ingredientName: {
    color: "#e2e8f0",
    fontSize: 15,
    flex: 1
  },
  ingredientQty: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "700"
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "#64748b"
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12
  },
  stepNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0284c7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2
  },
  stepNumber: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 14
  },
  stepContent: {
    flex: 1
  },
  stepText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  },
  chefTipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    marginTop: 4,
    marginBottom: 16
  },
  chefTipTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4
  },
  chefTipText: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: "italic"
  }
});

