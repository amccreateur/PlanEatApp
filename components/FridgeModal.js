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
  const [fridgeItems, setFridgeItems] = useState([
    { name: "Œufs", quantity: 2, unit: "" },
    { name: "Brocoli", quantity: 200, unit: "g" },
    { name: "Riz", quantity: 150, unit: "g" }
  ]);
  const [mealType, setMealType] = useState("lunch");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const quickSuggestions = [
    { name: "Œufs", emoji: "🥚", defaultQty: 2, defaultUnit: "" },
    { name: "Brocoli", emoji: "🥦", defaultQty: 200, defaultUnit: "g" },
    { name: "Courgettes", emoji: "🥒", defaultQty: 1, defaultUnit: "" },
    { name: "Riz", emoji: "🍚", defaultQty: 150, defaultUnit: "g" },
    { name: "Pâtes", emoji: "🍝", defaultQty: 150, defaultUnit: "g" },
    { name: "Tomates", emoji: "🍅", defaultQty: 2, defaultUnit: "" },
    { name: "Fromage", emoji: "🧀", defaultQty: 60, defaultUnit: "g" },
    { name: "Poulet", emoji: "🍗", defaultQty: 200, defaultUnit: "g" },
    { name: "Pommes de terre", emoji: "🥔", defaultQty: 3, defaultUnit: "" },
    { name: "Carottes", emoji: "🥕", defaultQty: 2, defaultUnit: "" },
    { name: "Oignons", emoji: "🧅", defaultQty: 1, defaultUnit: "" }
  ];

  // Détection intelligente de l'unité et quantité
  const parseInputItem = (rawText) => {
    let text = rawText.trim();
    if (!text) return null;

    // Détecte "150g riz" ou "2 tomates" ou "300 ml lait"
    const match = text.match(/^(\d+(?:[.,]\d+)?)\s*(g|kg|ml|cl|l|pcs|tranches?|pots?)?\s*(?:de\s+|d')?\s*(.+)$/i);
    if (match) {
      const qty = parseFloat(match[1].replace(",", "."));
      let unit = (match[2] || "").toLowerCase();
      const name = match[3].trim();
      const lowerName = name.toLowerCase();
      if (!unit || unit === "pcs") {
        const isWeight = isGramIngredient(lowerName);
        unit = isWeight ? "g" : "";
      }
      return { name, quantity: qty, unit };
    }

    const lower = text.toLowerCase();
    const isWeight = isGramIngredient(lower);
    return {
      name: text,
      quantity: isWeight ? 150 : 2,
      unit: isWeight ? "g" : ""
    };
  };

  // Les légumes verts, viandes, féculents et fromages sont par défaut en grammes
  const isGramIngredient = (lower) => {
    return (
      lower.includes("brocoli") ||
      lower.includes("épinard") ||
      lower.includes("epinard") ||
      lower.includes("haricot") ||
      lower.includes("chou") ||
      lower.includes("salade") ||
      lower.includes("roquette") ||
      lower.includes("riz") ||
      lower.includes("pâte") ||
      lower.includes("pate") ||
      lower.includes("farine") ||
      lower.includes("fromage") ||
      lower.includes("poulet") ||
      lower.includes("viande") ||
      lower.includes("saumon") ||
      lower.includes("boeuf") ||
      lower.includes("dinde") ||
      lower.includes("flocon") ||
      lower.includes("quinoa") ||
      lower.includes("lentille") ||
      lower.includes("pois")
    );
  };

  const handleAddItem = (itemToAdd = null) => {
    let parsed = null;
    if (itemToAdd && typeof itemToAdd === "object") {
      parsed = itemToAdd;
    } else if (itemToAdd && typeof itemToAdd === "string") {
      parsed = parseInputItem(itemToAdd);
    } else {
      parsed = parseInputItem(inputItem);
    }

    if (!parsed || !parsed.name) return;

    const existingIndex = fridgeItems.findIndex(i => i.name.toLowerCase() === parsed.name.toLowerCase());
    if (existingIndex >= 0) {
      // Si déjà présent, augmenter la quantité
      const updated = [...fridgeItems];
      updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + (parsed.quantity || 1);
      setFridgeItems(updated);
    } else {
      setFridgeItems([...fridgeItems, parsed]);
    }
    if (!itemToAdd || typeof itemToAdd !== "object") setInputItem("");
  };

  const handleUpdateQuantity = (index, delta) => {
    setFridgeItems(prev => {
      const updated = [...prev];
      const item = updated[index];
      if (!item) return prev;
      const step = item.unit === "g" || item.unit === "ml" ? 50 : 1;
      const newQty = Math.max(1, (item.quantity || step) + (delta * step));
      updated[index] = { ...item, quantity: newQty };
      return updated;
    });
  };

  const handleToggleUnit = (index) => {
    setFridgeItems(prev => {
      const updated = [...prev];
      const item = updated[index];
      if (!item) return prev;
      // Cycle intelligent : grammes (g) <-> unité unitaire ("") <-> tranche
      let nextUnit = "";
      let newQty = item.quantity;
      if (item.unit === "g") {
        nextUnit = "";
        newQty = 1;
      } else if (item.unit === "") {
        nextUnit = "g";
        newQty = 150;
      } else {
        nextUnit = "";
        newQty = 1;
      }
      updated[index] = { ...item, unit: nextUnit, quantity: newQty };
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setFridgeItems(fridgeItems.filter((_, i) => i !== index));
  };

  // Promesse de génération en tâche de fond pour temps masqué pendant la vidéo
  const pendingGenerationRef = React.useRef(null);

  const startBackgroundGeneration = () => {
    setIsGenerating(true);
    pendingGenerationRef.current = AIPlannerService.generateFridgeRecipe(
      fridgeItems,
      mealType,
      profile,
      aiConfig,
      lang,
      true // forceAi
    );
  };

  const executeGenerate = async (forceAi = false) => {
    setIsGenerating(true);
    try {
      let recipePromise = pendingGenerationRef.current;
      pendingGenerationRef.current = null;

      if (!recipePromise) {
        recipePromise = AIPlannerService.generateFridgeRecipe(
          fridgeItems,
          mealType,
          profile,
          aiConfig,
          lang,
          forceAi
        );
      }

      const recipe = await recipePromise;
      setGeneratedRecipe(recipe);
    } catch (err) {
      console.error("Erreur génération frigo:", err);
      Alert.alert("Erreur", err.message || "Impossible de générer la recette");
    } finally {
      setIsGenerating(false);
      pendingGenerationRef.current = null;
    }
  };

  const handleGenerate = () => {
    if (fridgeItems.length === 0) {
      Alert.alert("⚠️", t.fridgeEmptyIngredients);
      return;
    }
    // Génération locale instantanée par défaut (0 latence, 100% cohérent)
    executeGenerate(false);
  };

  const handleRequestAiRecipe = () => {
    if (fridgeItems.length === 0) {
      Alert.alert("⚠️", t.fridgeEmptyIngredients);
      return;
    }

    if (purchaseService.getIsPro()) {
      executeGenerate(true);
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
              📝 Ingrédients dans mon frigo & quantités :
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

            {/* Liste des ingrédients avec sélecteur de quantité */}
            {fridgeItems.length > 0 ? (
              <View style={styles.itemsListContainer}>
                {fridgeItems.map((item, idx) => (
                  <View key={idx} style={[styles.itemCardRow, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }, isRTL && styles.rtlRow]}>
                    <View style={styles.itemTitleBox}>
                      <Text style={[styles.itemDot, { color: "#38bdf8" }]}>•</Text>
                      <Text style={[styles.itemNameText, { color: theme.text }]}>{item.name}</Text>
                    </View>

                    {/* Contrôleur de Quantité (- / + et unité) */}
                    <View style={[styles.stepperContainer, isRTL && styles.rtlRow]}>
                      <TouchableOpacity
                        style={[styles.stepperBtn, { backgroundColor: theme.border }]}
                        onPress={() => handleUpdateQuantity(idx, -1)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Ionicons name="remove" size={16} color={theme.text} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.stepperValueBox, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
                        onPress={() => handleToggleUnit(idx)}
                      >
                        <Text style={[styles.stepperValueText, { color: "#38bdf8" }]}>
                          {item.quantity}{item.unit ? ` ` : ""}
                          {item.unit ? <Text style={styles.stepperUnitText}>{item.unit}</Text> : null}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.stepperBtn, { backgroundColor: theme.border }]}
                        onPress={() => handleUpdateQuantity(idx, 1)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Ionicons name="add" size={16} color={theme.text} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleRemoveItem(idx)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons name="trash-outline" size={18} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
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
              {quickSuggestions.map((sug, idx) => {
                const isSelected = fridgeItems.some(i => i.name.toLowerCase() === sug.name.toLowerCase());
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.suggestChip,
                      { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                      isSelected && styles.suggestChipSelected
                    ]}
                    onPress={() => handleAddItem({ name: sug.name, quantity: sug.defaultQty, unit: sug.defaultUnit })}
                  >
                    <Text style={styles.suggestEmoji}>{sug.emoji}</Text>
                    <Text style={[
                      styles.suggestText,
                      { color: theme.textSub },
                      isSelected && styles.suggestTextSelected
                    ]}>
                      {sug.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Type de repas */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }, isRTL && styles.rtlText]}>
              🍽️ Moment du repas :
            </Text>
            <View style={[styles.mealTypeRow, isRTL && styles.rtlRow]}>
              {[
                { key: "breakfast", label: t.breakfast, emoji: "🥣" },
                { key: "lunch", label: t.lunch, emoji: "🍲" },
                { key: "snack", label: t.snack, emoji: "🍎" },
                { key: "dinner", label: t.dinner, emoji: "🌙" }
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
                  <Text
                    style={[
                      styles.mealTypeBtnText,
                      { color: theme.textSub },
                      mealType === item.key && styles.mealTypeBtnTextActive
                    ]}
                    numberOfLines={2}
                  >
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
                onPressAiSwap={handleRequestAiRecipe}
                lang={lang}
                theme={theme}
              />

              <TouchableOpacity
                style={styles.aiReinventBtn}
                onPress={handleRequestAiRecipe}
                disabled={isGenerating}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#8b5cf6", "#6366f1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.aiReinventGradient}
                >
                  <Ionicons name="sparkles" size={18} color="#fef08a" />
                  <Text style={styles.aiReinventText}>✨ Réinventer avec le Chef IA (Gemini)</Text>
                  {!purchaseService.getIsPro() && (
                    <View style={styles.proOrAdBadge}>
                      <Text style={styles.proOrAdText}>PUB / PRO</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      <AdRewardModal
        visible={isRewardModalOpen}
        onClose={() => {
          setIsRewardModalOpen(false);
          setIsGenerating(false);
          pendingGenerationRef.current = null;
        }}
        onStartAd={startBackgroundGeneration}
        onRewardEarned={() => executeGenerate(true)}
        onOpenPaywall={onOpenPaywall}
        title="Chef Étoilé IA Gemini"
        subtitle="Regardez une courte vidéo pour débloquer une recette gastronomique réinventée par notre IA Gemini, ou passez à PlanEat Pro pour un accès illimité."
        icon="sparkles"
        iconColor="#a855f7"
        actionLabel="Réinventer avec l'IA"
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
  itemsListContainer: {
    gap: 8,
    marginBottom: 16
  },
  itemCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#334155"
  },
  itemTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
    gap: 6
  },
  itemDot: {
    fontSize: 18,
    fontWeight: "900"
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  stepperValueBox: {
    minWidth: 64,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  stepperValueText: {
    fontSize: 13,
    fontWeight: "700"
  },
  stepperUnitText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94a3b8"
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 4
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
    gap: 6
  },
  mealTypeBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#334155",
    minHeight: 68
  },
  mealTypeBtnActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#38bdf8"
  },
  mealTypeEmoji: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center"
  },
  mealTypeBtnText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14
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
  aiReinventBtn: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 4,
    elevation: 3,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  aiReinventGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8
  },
  aiReinventText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800"
  },
  proOrAdBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4
  },
  proOrAdText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});

