import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATIONS } from "../i18n/translations";
import { THEMES } from "../utils/theme";

export default function MealCard({
  mealType,
  meal,
  onPressRecipe,
  onPressSwap,
  lang = "fr",
  theme = "dark"
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";
  const currentTheme = THEMES[theme] || THEMES.dark;

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
    <View style={[
      styles.card,
      { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }
    ]}>
      <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
        <View style={[styles.typeBadge, { backgroundColor: meta.color + "20" }]}>
          <Ionicons name={meta.icon} size={14} color={meta.color} />
          <Text style={[styles.typeLabel, { color: meta.color }]} maxFontSizeMultiplier={1.2}>{meta.label}</Text>
        </View>

        <TouchableOpacity
          style={styles.swapBtn}
          onPress={onPressSwap}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="shuffle" size={16} color={currentTheme.textSub} />
          <Text style={[styles.swapText, { color: currentTheme.textSub }]} maxFontSizeMultiplier={1.2}>
            {t.swapMeal.split(" ")[0]}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.contentRow, isRTL && styles.rtlRow]}
        onPress={onPressRecipe}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>{meal.emoji || "🍽️"}</Text>
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              { color: currentTheme.text },
              isRTL && styles.rtlText
            ]}
            maxFontSizeMultiplier={1.2}
            numberOfLines={2}
          >
            {title}
          </Text>
          <View style={[styles.metaRow, isRTL && styles.rtlRow]}>
            <Text style={[styles.metaText, { color: currentTheme.textSub }]} maxFontSizeMultiplier={1.2}>
              ⏱️ {meal.prepTime + meal.cookTime} {t.minutes}
            </Text>
            <Text style={[styles.metaDot, { color: currentTheme.textMuted }]}>•</Text>
            <Text style={[styles.metaText, { color: currentTheme.textSub }]} maxFontSizeMultiplier={1.2}>
              🔥 {meal.caloriesPerPerson || 380} kcal
            </Text>
            <Text style={[styles.metaDot, { color: currentTheme.textMuted }]}>•</Text>
            <Text style={[styles.metaText, { color: currentTheme.textSub }]} maxFontSizeMultiplier={1.2}>
              👥 {servings} {t.servingsShort}
            </Text>
          </View>
        </View>
        <Ionicons
          name={isRTL ? "chevron-back" : "chevron-forward"}
          size={18}
          color={currentTheme.textMuted}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4
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
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6
  },
  metaText: {
    fontSize: 12
  },
  metaDot: {
    fontSize: 10
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});
