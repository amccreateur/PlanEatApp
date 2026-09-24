import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEMES } from "../utils/theme";

export default function GroceryItemRow({ item, onToggle, lang = "fr", theme = "dark" }) {
  const isRTL = lang === "ar";
  const currentTheme = THEMES[theme] || THEMES.dark;
  const name = item.name?.[lang] || item.name?.fr || item.customName || "Article";

  return (
    <TouchableOpacity
      style={[
        styles.row,
        { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border },
        isRTL && styles.rtlRow
      ]}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={item.checked ? "checkbox" : "square-outline"}
        size={22}
        color={item.checked ? "#10b981" : currentTheme.textMuted}
      />
      <Text
        style={[
          styles.name,
          { color: currentTheme.text },
          item.checked && styles.checkedText,
          isRTL && styles.rtlText
        ]}
        maxFontSizeMultiplier={1.2}
      >
        {name}
      </Text>
      {item.totalQuantity ? (
        <Text
          style={[
            styles.qty,
            { color: currentTheme.isDark ? "#38bdf8" : "#0284c7" },
            item.checked && styles.checkedQty
          ]}
          maxFontSizeMultiplier={1.2}
        >
          {item.totalQuantity} {item.unit}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    gap: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2
  },
  name: {
    fontSize: 15,
    flex: 1,
    fontWeight: "500"
  },
  qty: {
    fontSize: 14,
    fontWeight: "700"
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "#94a3b8"
  },
  checkedQty: {
    color: "#94a3b8"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});
