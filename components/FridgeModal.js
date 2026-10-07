import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TRANSLATIONS } from "../i18n/translations";
import { AIPlannerService } from "../services/aiPlannerService";
import { THEMES } from "../utils/theme";
import MealCard from "./MealCard";
import AdRewardModal from "./AdRewardModal";
import { purchaseService } from "../services/purchaseService";
import { adService } from "../services/adService";

export default function FridgeModal({
  visible,
  onClose,
  profile,
  aiConfig,
  lang = "fr",
  onOpenRecipe,
  onOpenPaywall,
  themeMode = "dark"
}) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, Platform.OS === "ios" ? 50 : 20);
  const bottomInset = Math.max(insets.bottom, Platform.OS === "android" ? 56 : 24);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";
  const theme = THEMES[themeMode] || THEMES.dark;

  const [inputItem, setInputItem] = useState("");
  const [fridgeItems, setFridgeItems] = useState(["Œufs", "Courgettes", "Riz"]);
  const [mealType, setMealType] = useState("lunch");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const quickSuggestions = [
    { name: "Œufs", emoji: "🥚" },
    { name: "Riz", emoji: "🍚" },
    { name: "Pâtes", emoji: "🍝" },
    { name: "Tomates", emoji: "🍅" },
    { name: "Fromage", emoji: "🧀" },
    { name: "Courgettes", emoji: "🥒" },
    { name: "Poulet", emoji: "🍗" },
    { name: "Pommes de terre", emoji: "🥔" },
    { name: "Carottes", emoji: "🥕" },
    { name: "Oignons", emoji: "🧅" }
  ];

  const handleAddItem = (itemToAdd = null) => {
    const text = itemToAdd || inputItem.trim();
    if (!text) return;
    if (!fridgeItems.includes(text)) {
      setFridgeItems([...fridgeItems, text]);
    }
    if (!itemToAdd) setInputItem("");
  };

  const handleRemoveItem = (index) => {
    setFridgeItems(fridgeItems.filter((_, i) => i !== index));
  };

  const executeGenerate = async () => {
    setIsGenerating(true);
    try {
      const recipe = await AIPlannerService.generateFridgeRecipe(
        fridgeItems,
        mealType,
        profile,
        aiConfig,
        lang
      );
      setGeneratedRecipe(recipe);
    } catch (err) {
      console.error("Erreur génération frigo:", err);
      Alert.alert("Erreur", err.message || "Impossible de générer la recette");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (fridgeItems.length === 0) {
      Alert.alert("⚠️", t.fridgeEmptyIngredients);
      return;
    }

    if (purchaseService.getIsPro()) {
      executeGenerate();
    } else {
      setIsRewardModalOpen(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={[styles.safeArea, { backgroundColor: theme.bg }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border, paddingTop: topInset + 6 }, isRTL && styles.rtlRow]}>
          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            onPress={onClose}
            style={[styles.closeBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>🧊 {t.fridgeTitle}</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomInset + 50 }]}
          showsVerticalScrollIndicator={true}
        >
          {/* Hero Banner */}
          <LinearGradient colors={["#0369a1", "#0284c7"]} style={styles.banner}>
            <Text style={styles.bannerEmoji}>🥬 🍳 🥕</Text>
            <Text style={styles.bannerTitle}>{t.fridgeTitle}</Text>
            <Text style={styles.bannerSubtitle}>{t.fridgeSubtitle}</Text>
          </LinearGradient>

          {/* Saisie des ingrédients */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }, isRTL && styles.rtlText]}>
              📝 Ingrédients dans mon frigo :
            </Text>

            <View style={[styles.inputRow, isRTL && styles.rtlRow]}>
              <TextInput
                style={[styles.input, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, color: theme.text }, isRTL && styles.rtlText]}
                placeholder={t.fridgeInputPlaceholder}
                placeholderTextColor={theme.textMuted}
                value={inputItem}
                onChangeText={setInputItem}
                onSubmitEditing={() => handleAddItem()}
              />
              <TouchableOpacity style={styles.addBtn} onPress={() => handleAddItem()}>
                <Ionicons name="add" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Tags des ingrédients ajoutés */}
            {fridgeItems.length > 0 ? (
              <View style={[styles.chipsWrap, isRTL && styles.rtlRow]}>
                {fridgeItems.map((item, idx) => (
                  <View key={idx} style={[styles.chip, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                    <Text style={[styles.chipText, { color: theme.text }]}>{item}</Text>
                    <TouchableOpacity onPress={() => handleRemoveItem(idx)}>
                      <Ionicons name="close-circle" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.hintText, { color: theme.textSub }, isRTL && styles.rtlText]}>
                {t.fridgeEmptyIngredients}
              </Text>
            )}

            {/* Suggestions rapides */}
            <Text style={[styles.suggestLabel, { color: theme.textSub }, isRTL && styles.rtlText]}>
              {t.fridgeSuggestionsTitle}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestScroll}>
              {quickSuggestions.map((sug, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.suggestChip,
                    { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                    fridgeItems.includes(sug.name) && styles.suggestChipSelected
                  ]}
                  onPress={() => handleAddItem(sug.name)}
                >
                  <Text style={styles.suggestEmoji}>{sug.emoji}</Text>
                  <Text style={[
                    styles.suggestText,
                    { color: theme.textSub },
                    fridgeItems.includes(sug.name) && styles.suggestTextSelected
                  ]}>
                    {sug.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Type de repas */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }, isRTL && styles.rtlText]}>
              🍽️ Moment du repas :
            </Text>
            <View style={styles.mealTypeRow}>
              {[
                { key: "breakfast", label: t.breakfast, emoji: "🥣" },
                { key: "lunch", label: t.lunch, emoji: "🍲" },
                { key: "snack", label: t.snack, emoji: "🍎" }
              ].map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.mealTypeBtn,
                    { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                    mealType === item.key && styles.mealTypeBtnActive
                  ]}
                  onPress={() => setMealType(item.key)}
                >
                  <Text style={styles.mealTypeEmoji}>{item.emoji}</Text>
                  <Text style={[
                    styles.mealTypeBtnText,
                    { color: theme.textSub },
                    mealType === item.key && styles.mealTypeBtnTextActive
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bouton de génération */}
          <TouchableOpacity
            style={[styles.generateBtn, isGenerating && styles.btnDisabled]}
            onPress={handleGenerate}
            disabled={isGenerating}
          >
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.generateGradient}
            >
              {isGenerating ? (
                <>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={styles.generateBtnText}>{t.fridgeGenerating}</Text>
                </>
              ) : (
                <>
                  <Ionicons name="sparkles" size={20} color="#ffffff" />
                  <Text style={styles.generateBtnText}>{t.fridgeGenerateBtn}</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Résultat de la recette */}
          {generatedRecipe && (
            <View style={[styles.resultCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={[styles.resultHeader, isRTL && styles.rtlRow]}>
                <Ionicons name="restaurant" size={20} color="#10b981" />
                <Text style={[styles.resultTitle, { color: theme.text }]}>{t.fridgeResultTitle}</Text>
              </View>

              <MealCard
                mealType={generatedRecipe.mealType || mealType}
                meal={generatedRecipe}
                onPressRecipe={() => onOpenRecipe(generatedRecipe)}
                onPressSwap={() => handleGenerate()}
                lang={lang}
                theme={theme}
              />
            </View>
          )}
        </ScrollView>
      </View>

      <AdRewardModal
        visible={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        onRewardEarned={() => executeGenerate()}
        onOpenPaywall={onOpenPaywall}
        title="Recette Frigo Anti-Gaspi"
        subtitle="Regardez une courte vidéo pour générer votre recette personnalisée avec vos ingrédients, ou passez à PlanEat Pro pour un accès illimité."
        icon="sparkles"
        iconColor="#10b981"
        actionLabel="Générer ma recette"
        themeMode={themeMode}
      />
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
  headerTitleBox: {
    alignItems: "center"
  },
  headerTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800"
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
  banner: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16
  },
  bannerEmoji: {
    fontSize: 36,
    marginBottom: 6
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 4
  },
  bannerSubtitle: {
    color: "#e0f2fe",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center"
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155"
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12
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
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#0284c7",
    alignItems: "center",
    justifyContent: "center"
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.4)",
    gap: 6
  },
  chipText: {
    color: "#38bdf8",
    fontSize: 13,
    fontWeight: "600"
  },
  hintText: {
    color: "#64748b",
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 12
  },
  suggestLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8
  },
  suggestScroll: {
    flexGrow: 0
  },
  suggestChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 4
  },
  suggestChipSelected: {
    backgroundColor: "#064e3b",
    borderColor: "#10b981"
  },
  suggestEmoji: {
    fontSize: 14
  },
  suggestText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "500"
  },
  suggestTextSelected: {
    color: "#34d399",
    fontWeight: "700"
  },
  mealTypeRow: {
    flexDirection: "row",
    gap: 8
  },
  mealTypeBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#334155"
  },
  mealTypeBtnActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#38bdf8"
  },
  mealTypeEmoji: {
    fontSize: 18,
    marginBottom: 2
  },
  mealTypeBtnText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600"
  },
  mealTypeBtnTextActive: {
    color: "#f8fafc",
    fontWeight: "700"
  },
  generateBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16
  },
  generateGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 8
  },
  generateBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800"
  },
  btnDisabled: {
    opacity: 0.6
  },
  resultCard: {
    marginTop: 8
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10
  },
  resultTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "800"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});

