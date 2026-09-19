import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATIONS } from "../i18n/translations";

export default function RecipeModal({ visible, recipe, onClose, lang = "fr" }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";

  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  const title = recipe.title?.[lang] || recipe.title?.fr || "Recette";
  const instructions = recipe.instructions?.[lang] || recipe.instructions?.fr || [];
  const servings = recipe.calculatedServings || 2;
  const factor = servings / 2;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, isRTL && styles.rtlRow]}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={26} color="#f8fafc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {/* Main Info Card */}
          <View style={styles.heroCard}>
            <Text style={styles.heroEmoji}>{recipe.emoji || "🍽️"}</Text>
            <Text style={[styles.recipeTitle, isRTL && styles.rtlText]}>{title}</Text>
            
            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <Ionicons name="time-outline" size={16} color="#38bdf8" />
                <Text style={styles.badgeText}>{recipe.prepTime + recipe.cookTime} {t.minutes}</Text>
              </View>

              <View style={styles.badge}>
                <Ionicons name="people-outline" size={16} color="#10b981" />
                <Text style={styles.badgeText}>{servings} {t.servingsShort}</Text>
              </View>

              <View style={styles.badge}>
                <Ionicons name="flame-outline" size={16} color="#f59e0b" />
                <Text style={styles.badgeText}>{recipe.caloriesPerPerson || 400} kcal</Text>
              </View>
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
          <View style={styles.sectionCard}>
            <View style={[styles.sectionHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="basket-outline" size={20} color="#10b981" />
              <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t.ingredients}</Text>
              <Text style={styles.servingsIndicator}>({servings} {t.servings})</Text>
            </View>

            {recipe.ingredients?.map((ing, idx) => {
              const ingName = ing.name?.[lang] || ing.name?.fr;
              const scaledQty = Math.round((ing.quantity * factor) * 10) / 10;
              const isChecked = !!checkedIngredients[idx];

              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.ingredientRow, isRTL && styles.rtlRow]}
                  onPress={() => toggleIngredient(idx)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isChecked ? "checkbox" : "square-outline"}
                    size={22}
                    color={isChecked ? "#10b981" : "#64748b"}
                  />
                  <Text style={[
                    styles.ingredientName,
                    isChecked && styles.checkedText,
                    isRTL && styles.rtlText
                  ]}>
                    {ingName}
                  </Text>
                  <Text style={[styles.ingredientQty, isChecked && styles.checkedText]}>
                    {scaledQty} {ing.unit}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Instructions */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="restaurant-outline" size={20} color="#38bdf8" />
              <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t.instructions}</Text>
            </View>

            {instructions.map((stepText, idx) => (
              <View key={idx} style={[styles.stepItem, isRTL && styles.rtlRow]}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumber}>{idx + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepText, isRTL && styles.rtlText]}>{stepText}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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
  }
});

