import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATIONS } from "../i18n/translations";

export default function MealCard({
  mealType,
  meal,
  onPressRecipe,
  onPressSwap,
  lang = "fr"
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";

  if (!meal) return null;

  const mealTypeLabels = {
    breakfast: { label: t.breakfast, color: "#f59e0b", icon: "sunny-outline" },
    lunch: { label: t.lunch, color: "#10b981", icon: "restaurant-outline" },
    dinner: { label: t.dinner, color: "#6366f1", icon: "moon-outline" },
    snack: { label: t.snack, color: "#ec4899", icon: "cafe-outline" }
  };

  const meta = mealTypeLabels[mealType] || mealTypeLabels.lunch;
  const title = meal.title?.[lang] || meal.title?.fr || "Repas";
  const servings = meal.calculatedServings || 2;

  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
        <View style={[styles.typeBadge, { backgroundColor: meta.color + "20" }]}>
          <Ionicons name={meta.icon} size={14} color={meta.color} />
          <Text style={[styles.typeLabel, { color: meta.color }]}>{meta.label}</Text>
        </View>

        <TouchableOpacity
          style={styles.swapBtn}
          onPress={onPressSwap}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="shuffle" size={16} color="#94a3b8" />
          <Text style={styles.swapText}>{t.swapMeal.split(" ")[0]}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.contentRow, isRTL && styles.rtlRow]}
        onPress={onPressRecipe}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>{meal.emoji || "🍽️"}</Text>
        <View style={styles.info}>
          <Text style={[styles.title, isRTL && styles.rtlText]}>{title}</Text>
          <View style={[styles.metaRow, isRTL && styles.rtlRow]}>
            <Text style={styles.metaText}>⏱️ {meal.prepTime + meal.cookTime} {t.minutes}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>🔥 {meal.caloriesPerPerson || 380} kcal</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>👥 {servings} {t.servingsShort}</Text>
          </View>
        </View>
        <Ionicons
          name={isRTL ? "chevron-back" : "chevron-forward"}
          size={18}
          color="#64748b"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: "700"
  },
  swapBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  swapText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600"
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  emoji: {
    fontSize: 32
  },
  info: {
    flex: 1
  },
  title: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  metaText: {
    color: "#94a3b8",
    fontSize: 12
  },
  metaDot: {
    color: "#475569",
    fontSize: 10
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});
