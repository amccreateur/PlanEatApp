import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATIONS } from "../i18n/translations";

export default function FamilyProfileModal({
  visible,
  profile,
  onSave,
  onClose,
  lang,
  onLanguageChange
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";

  const [adults, setAdults] = useState(profile?.adults || 2);
  const [children, setChildren] = useState(profile?.children || 0);
  const [childrenAges, setChildrenAges] = useState(profile?.childrenAges || []);
  const [diets, setDiets] = useState(profile?.diets || ["dietBalanced"]);
  const [dislikedFoods, setDislikedFoods] = useState(profile?.dislikedFoods || []);
  const [newDislike, setNewDislike] = useState("");

  const dietOptions = [
    { key: "dietBalanced", label: t.dietBalanced, emoji: "🥗" },
    { key: "dietHalal", label: t.dietHalal, emoji: "🌙" },
    { key: "dietVegetarian", label: t.dietVegetarian, emoji: "🌱" },
    { key: "dietVegan", label: t.dietVegan, emoji: "🥑" },
    { key: "dietGlutenFree", label: t.dietGlutenFree, emoji: "🌾" },
    { key: "dietLactoseFree", label: t.dietLactoseFree, emoji: "🥛" },
    { key: "dietLowCarb", label: t.dietLowCarb, emoji: "⚡" },
    { key: "dietBudget", label: t.dietBudget, emoji: "💰" },
    { key: "dietQuick", label: t.dietQuick, emoji: "⏱️" }
  ];

  const handleUpdateChildrenCount = (newCount) => {
    const val = Math.max(0, Math.min(8, newCount));
    setChildren(val);
    if (val > childrenAges.length) {
      const added = Array(val - childrenAges.length).fill(6);
      setChildrenAges([...childrenAges, ...added]);
    } else {
      setChildrenAges(childrenAges.slice(0, val));
    }
  };

  const updateChildAge = (index, age) => {
    const updated = [...childrenAges];
    updated[index] = Math.max(1, Math.min(18, age));
    setChildrenAges(updated);
  };

  const toggleDiet = (dietKey) => {
    if (diets.includes(dietKey)) {
      setDiets(diets.filter(d => d !== dietKey));
    } else {
      setDiets([...diets, dietKey]);
    }
  };

  const addDislikedFood = () => {
    if (!newDislike.trim()) return;
    if (!dislikedFoods.includes(newDislike.trim())) {
      setDislikedFoods([...dislikedFoods, newDislike.trim()]);
    }
    setNewDislike("");
  };

  const removeDislikedFood = (food) => {
    setDislikedFoods(dislikedFoods.filter(f => f !== food));
  };

  const handleSave = () => {
    const updated = {
      ...profile,
      adults,
      children,
      childrenAges,
      diets: diets.length > 0 ? diets : ["dietBalanced"],
      dislikedFoods
    };
    onSave(updated);
    Alert.alert("✅", t.profileSaved);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, isRTL && styles.rtlRow]}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#f8fafc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.profileTitle}</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveHeaderBtn}>
            <Text style={styles.saveHeaderText}>{t.saveProfile.split(" ")[0]}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {/* Language Selector */}
          <View style={styles.card}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="globe-outline" size={20} color="#38bdf8" />
              <Text style={styles.cardTitle}>{t.language}</Text>
            </View>
            <View style={styles.langRow}>
              {[
                { code: "fr", label: "🇫🇷 Français" },
                { code: "en", label: "🇬🇧 English" },
                { code: "ar", label: "🇸🇦 العربية" }
              ].map(item => (
                <TouchableOpacity
                  key={item.code}
                  style={[
                    styles.langBtn,
                    lang === item.code && styles.langBtnActive
                  ]}
                  onPress={() => onLanguageChange(item.code)}
                >
                  <Text style={[
                    styles.langBtnText,
                    lang === item.code && styles.langBtnTextActive
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Composition du foyer */}
          <View style={styles.card}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="people-outline" size={20} color="#10b981" />
              <Text style={styles.cardTitle}>{t.profileSubtitle}</Text>
            </View>

            {/* Adultes */}
            <View style={[styles.counterRow, isRTL && styles.rtlRow]}>
              <Text style={styles.counterLabel}>{t.adultsCount}</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setAdults(Math.max(1, adults - 1))}
                >
                  <Ionicons name="remove" size={20} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{adults}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setAdults(Math.min(10, adults + 1))}
                >
                  <Ionicons name="add" size={20} color="#f8fafc" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Enfants */}
            <View style={[styles.counterRow, isRTL && styles.rtlRow]}>
              <Text style={styles.counterLabel}>{t.childrenCount}</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleUpdateChildrenCount(children - 1)}
                >
                  <Ionicons name="remove" size={20} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{children}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleUpdateChildrenCount(children + 1)}
                >
                  <Ionicons name="add" size={20} color="#f8fafc" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Âges des enfants */}
            {children > 0 && (
              <View style={styles.agesBox}>
                <Text style={[styles.agesTitle, isRTL && styles.rtlText]}>{t.childrenAges} :</Text>
                <View style={styles.agesRow}>
                  {childrenAges.map((age, idx) => (
                    <View key={idx} style={styles.ageItem}>
                      <Text style={styles.ageLabel}>Enfant {idx + 1}</Text>
                      <View style={styles.ageControls}>
                        <TouchableOpacity
                          onPress={() => updateChildAge(idx, age - 1)}
                          style={styles.ageMiniBtn}
                        >
                          <Text style={styles.ageMiniBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.ageValue}>{age} ans</Text>
                        <TouchableOpacity
                          onPress={() => updateChildAge(idx, age + 1)}
                          style={styles.ageMiniBtn}
                        >
                          <Text style={styles.ageMiniBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Régimes alimentaires */}
          <View style={styles.card}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="leaf-outline" size={20} color="#f59e0b" />
              <Text style={styles.cardTitle}>{t.dietsAndPrefs}</Text>
            </View>

            <View style={styles.dietGrid}>
              {dietOptions.map(diet => {
                const isSelected = diets.includes(diet.key);
                return (
                  <TouchableOpacity
                    key={diet.key}
                    style={[
                      styles.dietChip,
                      isSelected && styles.dietChipActive
                    ]}
                    onPress={() => toggleDiet(diet.key)}
                  >
                    <Text style={styles.dietEmoji}>{diet.emoji}</Text>
                    <Text style={[
                      styles.dietLabel,
                      isSelected && styles.dietLabelActive
                    ]}>
                      {diet.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Aliments exclus */}
          <View style={styles.card}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="ban-outline" size={20} color="#ef4444" />
              <Text style={styles.cardTitle}>{t.dislikedTitle}</Text>
            </View>

            <View style={[styles.inputRow, isRTL && styles.rtlRow]}>
              <TextInput
                style={[styles.input, isRTL && styles.rtlText]}
                placeholder={t.dislikedPlaceholder}
                placeholderTextColor="#64748b"
                value={newDislike}
                onChangeText={setNewDislike}
                onSubmitEditing={addDislikedFood}
              />
              <TouchableOpacity style={styles.addBtn} onPress={addDislikedFood}>
                <Ionicons name="add" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.chipsRow}>
              {dislikedFoods.map((food, idx) => (
                <View key={idx} style={styles.dislikeChip}>
                  <Text style={styles.dislikeText}>{food}</Text>
                  <TouchableOpacity onPress={() => removeDislikedFood(food)}>
                    <Ionicons name="close-circle" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.mainSaveBtn} onPress={handleSave}>
            <Ionicons name="checkmark-circle" size={22} color="#ffffff" />
            <Text style={styles.mainSaveBtnText}>{t.saveProfile}</Text>
          </TouchableOpacity>
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
    fontWeight: "700"
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center"
  },
  saveHeaderBtn: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12
  },
  saveHeaderText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155"
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700"
  },
  langRow: {
    flexDirection: "row",
    gap: 8
  },
  langBtn: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155"
  },
  langBtnActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8"
  },
  langBtnText: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 13
  },
  langBtnTextActive: {
    color: "#ffffff"
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155/50"
  },
  counterLabel: {
    color: "#e2e8f0",
    fontSize: 15
  },
  counterControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  counterValue: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: "800",
    minWidth: 20,
    textAlign: "center"
  },
  agesBox: {
    marginTop: 12,
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 12
  },
  agesTitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 8
  },
  agesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  ageItem: {
    backgroundColor: "#1e293b",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  ageLabel: {
    color: "#cbd5e1",
    fontSize: 11,
    marginBottom: 4
  },
  ageControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  ageMiniBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  ageMiniBtnText: {
    color: "#f8fafc",
    fontWeight: "800",
    fontSize: 13
  },
  ageValue: {
    color: "#38bdf8",
    fontSize: 13,
    fontWeight: "700"
  },
  dietGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  dietChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 6
  },
  dietChipActive: {
    backgroundColor: "#047857",
    borderColor: "#10b981"
  },
  dietEmoji: {
    fontSize: 15
  },
  dietLabel: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600"
  },
  dietLabelActive: {
    color: "#ffffff"
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12
  },
  input: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#f8fafc",
    fontSize: 14
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#0284c7",
    alignItems: "center",
    justifyContent: "center"
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  dislikeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef4444/40",
    gap: 6
  },
  dislikeText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "600"
  },
  mainSaveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    marginTop: 8
  },
  mainSaveBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});
