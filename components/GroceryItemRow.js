import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GroceryItemRow({ item, onToggle, lang = "fr" }) {
  const isRTL = lang === "ar";
  const name = item.name?.[lang] || item.name?.fr || item.customName || "Article";

  return (
    <TouchableOpacity
      style={[styles.row, isRTL && styles.rtlRow]}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={item.checked ? "checkbox" : "square-outline"}
        size={22}
        color={item.checked ? "#10b981" : "#64748b"}
      />
      <Text
        style={[
          styles.name,
          item.checked && styles.checkedText,
          isRTL && styles.rtlText
        ]}
      >
        {name}
      </Text>
      {item.totalQuantity ? (
        <Text style={[styles.qty, item.checked && styles.checkedQty]}>
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
    backgroundColor: "#1e293b",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 12
  },
  name: {
    color: "#f8fafc",
    fontSize: 15,
    flex: 1
  },
  qty: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "700"
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "#64748b"
  },
  checkedQty: {
    color: "#475569"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});

