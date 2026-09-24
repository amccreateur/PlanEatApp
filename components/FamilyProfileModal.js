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
  Platform,
  StatusBar
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATIONS } from "../i18n/translations";
import { MistralService } from "../services/mistralService";
import { THEMES } from "../utils/theme";

export default function FamilyProfileModal({
  visible,
  profile,
  aiConfig,
  onSave,
  onSaveAiConfig,
  onClose,
  lang,
  onLanguageChange,
  themeMode = "dark",
  onToggleTheme
}) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 20));

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";
  const theme = THEMES[themeMode] || THEMES.dark;

  const [mealTypes, setMealTypes] = useState(
    profile?.mealTypes && profile.mealTypes.length > 0
      ? profile.mealTypes
      : ["breakfast", "lunch", "snack", "dinner"]
  );
  const [adults, setAdults] = useState(profile?.adults || 2);
  const [children, setChildren] = useState(profile?.children || 0);
  const [childrenAges, setChildrenAges] = useState(profile?.childrenAges || []);
  const [diets, setDiets] = useState(profile?.diets || []);
  const [cuisines, setCuisines] = useState(profile?.cuisines || {
    french: 2,
    italian: 2,
    oriental: 2,
    asian: 2,
    mexican: 1,
    indian: 1,
    streetfood: 1
  });
  const [appliances, setAppliances] = useState(profile?.appliances || {
    thermomix: false,
    airfryer: false,
    cookeo: false
  });
  const [dislikedFoods, setDislikedFoods] = useState(profile?.dislikedFoods || []);
  const [newDislike, setNewDislike] = useState("");

  const toggleMealType = (typeKey) => {
    if (mealTypes.includes(typeKey)) {
      if (mealTypes.length <= 1) {
        Alert.alert("⚠️", t.minOneMealRequired || "Veuillez sélectionner au moins un repas.");
        return;
      }
      setMealTypes(mealTypes.filter(m => m !== typeKey));
    } else {
      setMealTypes([...mealTypes, typeKey]);
    }
  };

  const updateCuisineLevel = (cuisineKey, level) => {
    setCuisines(prev => ({
      ...prev,
      [cuisineKey]: level
    }));
  };

  const toggleAppliance = (applianceKey) => {
    setAppliances(prev => ({
      ...prev,
      [applianceKey]: !prev[applianceKey]
    }));
  };

  // Mistral AI Configuration State
  const [aiEngine, setAiEngine] = useState(aiConfig?.engine || "local");
  const [mistralApiKey, setMistralApiKey] = useState(aiConfig?.mistralApiKey || "");
  const [mistralModel, setMistralModel] = useState(aiConfig?.mistralModel || "mistral-small-latest");
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }

  const mealTypeOptions = [
    { key: "breakfast", label: t.breakfast, emoji: "☀️", color: "#f59e0b" },
    { key: "lunch", label: t.lunch, emoji: "🍲", color: "#10b981" },
    { key: "snack", label: t.snack, emoji: "🍎", color: "#ec4899" },
    { key: "dinner", label: t.dinner, emoji: "🌙", color: "#6366f1" }
  ];

  const dietOptions = [
    { key: "dietBalanced", label: t.dietBalanced, emoji: "🥗" },
    { key: "dietHalal", label: t.dietHalal, emoji: "🌙" },
    { key: "dietNoPork", label: t.dietNoPork, emoji: "🥩" },
    { key: "dietVegetarian", label: t.dietVegetarian, emoji: "🌱" },
    { key: "dietVegan", label: t.dietVegan, emoji: "🥑" },
    { key: "dietGlutenFree", label: t.dietGlutenFree, emoji: "🌾" },
    { key: "dietLactoseFree", label: t.dietLactoseFree, emoji: "🥛" },
    { key: "dietKeto", label: t.dietKeto, emoji: "🥑" },
    { key: "dietLowCarb", label: t.dietLowCarb, emoji: "📉" },
    { key: "dietHighProtein", label: t.dietHighProtein, emoji: "💪" },
    { key: "dietBudget", label: t.dietBudget, emoji: "💰" },
    { key: "dietQuick", label: t.dietQuick, emoji: "⏱️" },
    { key: "dietKids", label: t.dietKids, emoji: "🧒" }
  ];

  const cuisineList = [
    { key: "french", name: t.cuisineFrench, desc: t.cuisineFrenchDesc, emoji: "🇫🇷" },
    { key: "italian", name: t.cuisineItalian, desc: t.cuisineItalianDesc, emoji: "🇮🇹" },
    { key: "oriental", name: t.cuisineOriental, desc: t.cuisineOrientalDesc, emoji: "🇲🇦" },
    { key: "asian", name: t.cuisineAsian, desc: t.cuisineAsianDesc, emoji: "🥢" },
    { key: "mexican", name: t.cuisineMexican, desc: t.cuisineMexicanDesc, emoji: "🇲🇽" },
    { key: "indian", name: t.cuisineIndian, desc: t.cuisineIndianDesc, emoji: "🇮🇳" },
    { key: "streetfood", name: t.cuisineStreetFood, desc: t.cuisineStreetFoodDesc, emoji: "🍔" }
  ];

  const appliancesList = [
    { key: "thermomix", name: t.applianceThermomix, desc: t.applianceThermomixDesc, emoji: "🤖", color: "#10b981" },
    { key: "airfryer", name: t.applianceAirfryer, desc: t.applianceAirfryerDesc, emoji: "🌀", color: "#f59e0b" },
    { key: "cookeo", name: t.applianceCookeo, desc: t.applianceCookeoDesc, emoji: "🥘", color: "#38bdf8" }
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

  const handleTestApiKey = async () => {
    if (!mistralApiKey.trim()) {
      setTestResult({ success: false, message: t.apiKeyInvalid });
      return;
    }
    setIsTestingKey(true);
    setTestResult(null);
    const result = await MistralService.testApiKey(mistralApiKey);
    setIsTestingKey(false);
    if (result.success) {
      setTestResult({ success: true, message: t.apiKeyValid });
    } else {
      setTestResult({ success: false, message: result.error || t.apiKeyInvalid });
    }
  };

  const handleSave = () => {
    const updated = {
      ...profile,
      adults,
      children,
      childrenAges,
      mealTypes: mealTypes.length > 0 ? mealTypes : ["breakfast", "lunch", "snack", "dinner"],
      diets: diets.length > 0 ? diets : ["dietBalanced"],
      cuisines,
      appliances,
      dislikedFoods
    };
    onSave(updated);
    if (onSaveAiConfig) {
      onSaveAiConfig({
        engine: aiEngine,
        mistralApiKey: mistralApiKey.trim(),
        mistralModel
      });
    }
    Alert.alert("✅", t.profileSaved);
    onClose();
  };

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
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{t.profileTitle}</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveHeaderBtn}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.8}
          >
            <Text style={styles.saveHeaderText}>{t.saveProfile.split(" ")[0]}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {/* Theme Selector */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="color-palette-outline" size={20} color="#a855f7" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{t.themeTitle || "Thème / Apparence"}</Text>
            </View>
            <View style={styles.langRow}>
              <TouchableOpacity
                style={[
                  styles.langBtn,
                  { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                  themeMode === "light" && styles.langBtnActive
                ]}
                onPress={() => onToggleTheme && onToggleTheme("light")}
              >
                <Text style={styles.langFlag}>☀️</Text>
                <Text style={[
                  styles.langBtnText,
                  { color: theme.textSub },
                  themeMode === "light" && styles.langBtnTextActive
                ]}>
                  {t.themeLight || "Mode Blanc"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.langBtn,
                  { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                  themeMode === "dark" && styles.langBtnActive
                ]}
                onPress={() => onToggleTheme && onToggleTheme("dark")}
              >
                <Text style={styles.langFlag}>🌙</Text>
                <Text style={[
                  styles.langBtnText,
                  { color: theme.textSub },
                  themeMode === "dark" && styles.langBtnTextActive
                ]}>
                  {t.themeDark || "Mode Sombre"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Selector */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="globe-outline" size={20} color="#38bdf8" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{t.language}</Text>
            </View>
            <View style={styles.langRow}>
              {[
                { code: "fr", label: "🇫🇷 Français" },
                { code: "en", label: "🇬🇧 English" }
              ].map(item => (
                <TouchableOpacity
                  key={item.code}
                  style={[
                    styles.langBtn,
                    { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                    lang === item.code && styles.langBtnActive
                  ]}
                  onPress={() => onLanguageChange(item.code)}
                >
                  <Text style={[
                    styles.langBtnText,
                    { color: theme.textSub },
                    lang === item.code && styles.langBtnTextActive
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Composition du foyer */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="people-outline" size={20} color="#10b981" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{t.profileSubtitle}</Text>
            </View>

            {/* Adultes */}
            <View style={[styles.counterRow, { borderBottomColor: theme.border }, isRTL && styles.rtlRow]}>
              <Text style={[styles.counterLabel, { color: theme.text }]}>{t.adultsCount}</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={[styles.counterBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
                  onPress={() => setAdults(Math.max(1, adults - 1))}
                >
                  <Ionicons name="remove" size={20} color={theme.text} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{adults}</Text>
                <TouchableOpacity
                  style={[styles.counterBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
                  onPress={() => setAdults(Math.min(10, adults + 1))}
                >
                  <Ionicons name="add" size={20} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Enfants */}
            <View style={[styles.counterRow, { borderBottomColor: theme.border }, isRTL && styles.rtlRow]}>
              <Text style={[styles.counterLabel, { color: theme.text }]}>{t.childrenCount}</Text>
              <View style={styles.counterControls}>
                <TouchableOpacity
                  style={[styles.counterBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
                  onPress={() => handleUpdateChildrenCount(children - 1)}
                >
                  <Ionicons name="remove" size={20} color={theme.text} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{children}</Text>
                <TouchableOpacity
                  style={[styles.counterBtn, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, borderWidth: 1 }]}
                  onPress={() => handleUpdateChildrenCount(children + 1)}
                >
                  <Ionicons name="add" size={20} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Âges des enfants */}
            {children > 0 && (
              <View style={[styles.agesBox, { backgroundColor: theme.cardBgAlt }]}>
                <Text style={[styles.agesTitle, { color: theme.textSub }, isRTL && styles.rtlText]}>{t.childrenAges} :</Text>
                <View style={styles.agesRow}>
                  {childrenAges.map((age, idx) => (
                    <View key={idx} style={[styles.ageItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                      <Text style={[styles.ageLabel, { color: theme.textSub }]}>Enfant {idx + 1}</Text>
                      <View style={styles.ageControls}>
                        <TouchableOpacity
                          onPress={() => updateChildAge(idx, age - 1)}
                          style={[styles.ageMiniBtn, { backgroundColor: theme.cardBgAlt }]}
                        >
                          <Text style={[styles.ageMiniBtnText, { color: theme.text }]}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.ageValue}>{age} ans</Text>
                        <TouchableOpacity
                          onPress={() => updateChildAge(idx, age + 1)}
                          style={[styles.ageMiniBtn, { backgroundColor: theme.cardBgAlt }]}
                        >
                          <Text style={[styles.ageMiniBtnText, { color: theme.text }]}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Repas à planifier chaque jour */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="restaurant-outline" size={20} color="#f59e0b" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{t.mealsToPlan}</Text>
                <Text style={[styles.cardSubtitle, { color: theme.textSub }]}>{t.mealsToPlanDesc}</Text>
              </View>
            </View>

            <View style={styles.mealTypesGrid}>
              {mealTypeOptions.map(option => {
                const isSelected = mealTypes.includes(option.key);
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.mealTypeCard,
                      { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                      isSelected && { borderColor: option.color, backgroundColor: option.color + "18" }
                    ]}
                    onPress={() => toggleMealType(option.key)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.mealTypeInner, isRTL && styles.rtlRow]}>
                      <Text style={styles.mealTypeEmoji}>{option.emoji}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={[
                          styles.mealTypeLabel,
                          { color: theme.text },
                          isSelected && { color: option.color, fontWeight: "800" }
                        ]}>
                          {option.label}
                        </Text>
                      </View>
                      <Ionicons
                        name={isSelected ? "checkbox" : "square-outline"}
                        size={22}
                        color={isSelected ? option.color : theme.textMuted}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Régimes alimentaires */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="leaf-outline" size={20} color="#f59e0b" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{t.dietsAndPrefs}</Text>
            </View>

            <View style={styles.dietGrid}>
              {dietOptions.map(diet => {
                const isSelected = diets.includes(diet.key);
                return (
                  <TouchableOpacity
                    key={diet.key}
                    style={[
                      styles.dietChip,
                      { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                      isSelected && styles.dietChipActive
                    ]}
                    onPress={() => toggleDiet(diet.key)}
                  >
                    <Text style={styles.dietEmoji}>{diet.emoji}</Text>
                    <Text style={[
                      styles.dietLabel,
                      { color: theme.textSub },
                      isSelected && styles.dietLabelActive
                    ]}>
                      {diet.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Cuisines du Monde & Préférences Culinaires */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="restaurant-outline" size={20} color="#f97316" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{t.cuisinesTitle}</Text>
                <Text style={[styles.cardSubtitle, { color: theme.textSub }]}>{t.cuisinesSubtitle}</Text>
              </View>
            </View>

            <View style={styles.cuisinesList}>
              {cuisineList.map((c) => {
                const level = cuisines[c.key] !== undefined ? cuisines[c.key] : 1;
                return (
                  <View key={c.key} style={[styles.cuisineCard, { backgroundColor: theme.cardBgAlt, borderColor: theme.border }]}>
                    <View style={[styles.cuisineTopRow, isRTL && styles.rtlRow]}>
                      <Text style={styles.cuisineEmoji}>{c.emoji}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.cuisineName, { color: theme.text }]}>{c.name}</Text>
                        <Text style={[styles.cuisineDesc, { color: theme.textSub }]} numberOfLines={2}>{c.desc}</Text>
                      </View>
                    </View>

                    {/* Curseur 4 niveaux interactif */}
                    <View style={styles.cursorContainer}>
                      <View style={[styles.cursorTrack, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
                        {[
                          { val: 0, label: t.cursorLevel0, color: "#64748b" },
                          { val: 1, label: t.cursorLevel1, color: "#0284c7" },
                          { val: 2, label: t.cursorLevel2, color: "#f59e0b" },
                          { val: 3, label: t.cursorLevel3, color: "#10b981" }
                        ].map((step) => {
                          const isSelected = level === step.val;
                          return (
                            <TouchableOpacity
                              key={step.val}
                              style={[
                                styles.cursorStepBtn,
                                isSelected && { backgroundColor: step.color }
                              ]}
                              onPress={() => updateCuisineLevel(c.key, step.val)}
                              activeOpacity={0.7}
                            >
                              <Text
                                style={[
                                  styles.cursorStepText,
                                  { color: theme.textSub },
                                  isSelected && styles.cursorStepTextActive
                                ]}
                              >
                                {step.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Équipements & Robots Cuiseurs */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="hardware-chip-outline" size={20} color="#10b981" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{t.appliancesTitle}</Text>
                <Text style={[styles.cardSubtitle, { color: theme.textSub }]}>{t.appliancesSubtitle}</Text>
              </View>
            </View>

            <View style={styles.appliancesGrid}>
              {appliancesList.map((app) => {
                const isSelected = !!appliances[app.key];
                return (
                  <TouchableOpacity
                    key={app.key}
                    style={[
                      styles.applianceCard,
                      { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                      isSelected && { borderColor: app.color, backgroundColor: theme.isDark ? "rgba(16, 185, 129, 0.12)" : "#f0fdf4" }
                    ]}
                    onPress={() => toggleAppliance(app.key)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.applianceTopRow, isRTL && styles.rtlRow]}>
                      <Text style={styles.applianceEmoji}>{app.emoji}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.applianceName, { color: theme.text }]}>{app.name}</Text>
                        <Text style={[styles.applianceDesc, { color: theme.textSub }]} numberOfLines={2}>{app.desc}</Text>
                      </View>
                      <View style={[
                        styles.applianceCheckbox,
                        { borderColor: isSelected ? app.color : theme.border },
                        isSelected && { backgroundColor: app.color }
                      ]}>
                        {isSelected && <Ionicons name="checkmark" size={16} color="#ffffff" />}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Aliments exclus */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="ban-outline" size={20} color="#ef4444" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{t.dislikedTitle}</Text>
            </View>

            <View style={[styles.inputRow, isRTL && styles.rtlRow]}>
              <TextInput
                style={[styles.input, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, color: theme.text }, isRTL && styles.rtlText]}
                placeholder={t.dislikedPlaceholder}
                placeholderTextColor={theme.textMuted}
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
                <View key={idx} style={[styles.dislikeChip, { backgroundColor: theme.cardBgAlt }]}>
                  <Text style={styles.dislikeText}>{food}</Text>
                  <TouchableOpacity onPress={() => removeDislikedFood(food)}>
                    <Ionicons name="close-circle" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Configuration Moteur IA (Mistral AI) */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.cardHeader, isRTL && styles.rtlRow]}>
              <Ionicons name="sparkles" size={20} color="#a855f7" />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{t.aiSectionTitle}</Text>
            </View>

            {/* Choix du mode IA */}
            <View style={styles.engineContainer}>
              <TouchableOpacity
                style={[
                  styles.engineCard,
                  { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                  aiEngine === "local" && styles.engineCardActiveLocal,
                  isRTL && styles.rtlRow
                ]}
                onPress={() => setAiEngine("local")}
                activeOpacity={0.7}
              >
                <View style={[styles.engineIconBadge, { backgroundColor: "rgba(56, 189, 248, 0.15)" }]}>
                  <Ionicons
                    name="hardware-chip-outline"
                    size={20}
                    color="#38bdf8"
                  />
                </View>
                <View style={styles.engineTextBox}>
                  <Text
                    style={[
                      styles.engineTitle,
                      { color: theme.text },
                      aiEngine === "local" && { color: "#38bdf8" },
                      isRTL && styles.rtlText
                    ]}
                  >
                    {t.aiEngineLocal || "Catalogue Local"}
                  </Text>
                  <Text style={[styles.engineSub, { color: theme.textSub }, isRTL && styles.rtlText]}>
                    {t.localSub || "100% hors-ligne & instantané"}
                  </Text>
                </View>
                <View style={[
                  styles.engineRadio,
                  { borderColor: aiEngine === "local" ? "#38bdf8" : theme.border },
                  aiEngine === "local" && { backgroundColor: "#38bdf8" }
                ]}>
                  {aiEngine === "local" && <Ionicons name="checkmark" size={13} color="#0f172a" />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.engineCard,
                  { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                  aiEngine === "mistral" && styles.engineCardActiveMistral,
                  isRTL && styles.rtlRow
                ]}
                onPress={() => setAiEngine("mistral")}
                activeOpacity={0.7}
              >
                <View style={[styles.engineIconBadge, { backgroundColor: "rgba(168, 85, 247, 0.15)" }]}>
                  <Ionicons
                    name="cloud-outline"
                    size={20}
                    color="#a855f7"
                  />
                </View>
                <View style={styles.engineTextBox}>
                  <Text
                    style={[
                      styles.engineTitle,
                      { color: theme.text },
                      aiEngine === "mistral" && { color: "#a855f7" },
                      isRTL && styles.rtlText
                    ]}
                  >
                    {t.aiEngineMistral || "Mistral AI"}
                  </Text>
                  <Text style={[styles.engineSub, { color: theme.textSub }, isRTL && styles.rtlText]}>
                    {t.mistralSub || "Génération créative & personnalisée par IA"}
                  </Text>
                </View>
                <View style={[
                  styles.engineRadio,
                  { borderColor: aiEngine === "mistral" ? "#a855f7" : theme.border },
                  aiEngine === "mistral" && { backgroundColor: "#a855f7" }
                ]}>
                  {aiEngine === "mistral" && <Ionicons name="checkmark" size={13} color="#ffffff" />}
                </View>
              </TouchableOpacity>
            </View>

            {/* Options Mistral si sélectionné */}
            {aiEngine === "mistral" && (
              <View style={[styles.mistralSettings, { borderTopColor: theme.border }]}>
                {/* Clé API */}
                <Text style={[styles.inputLabel, { color: theme.textSub }, isRTL && styles.rtlText]}>
                  {t.mistralApiKey} :
                </Text>
                <View style={[styles.inputRow, isRTL && styles.rtlRow]}>
                  <TextInput
                    style={[styles.input, styles.apiKeyInput, { backgroundColor: theme.cardBgAlt, borderColor: theme.border, color: theme.text }, isRTL && styles.rtlText]}
                    placeholder={t.mistralApiKeyPlaceholder}
                    placeholderTextColor={theme.textMuted}
                    value={mistralApiKey}
                    onChangeText={setMistralApiKey}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                  />
                  <TouchableOpacity
                    style={[styles.testKeyBtn, isTestingKey && styles.btnDisabled]}
                    onPress={handleTestApiKey}
                    disabled={isTestingKey}
                  >
                    {isTestingKey ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Ionicons name="checkmark-done" size={20} color="#ffffff" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Résultat du test de connexion */}
                {testResult && (
                  <View
                    style={[
                      styles.testResultBox,
                      testResult.success ? styles.testSuccessBox : styles.testErrorBox,
                      isRTL && styles.rtlRow
                    ]}
                  >
                    <Ionicons
                      name={testResult.success ? "checkmark-circle" : "alert-circle"}
                      size={18}
                      color={testResult.success ? "#10b981" : "#ef4444"}
                    />
                    <Text
                      style={[
                        styles.testResultText,
                        testResult.success ? styles.testSuccessText : styles.testErrorText
                      ]}
                    >
                      {testResult.message}
                    </Text>
                  </View>
                )}

                {/* Modèle Mistral */}
                <Text style={[styles.inputLabel, { color: theme.textSub }, isRTL && styles.rtlText, { marginTop: 12 }]}>
                  {t.mistralModel} :
                </Text>
                <View style={styles.modelChipsRow}>
                  {[
                    { key: "codestral-latest", label: "⚡ Codestral (Recommandé - Ultra rapide)" },
                    { key: "mistral-small-latest", label: "Mistral Small (Équilibré)" },
                    { key: "mistral-large-latest", label: "Mistral Large (Chef Expert)" }
                  ].map(mod => (
                    <TouchableOpacity
                      key={mod.key}
                      style={[
                        styles.modelChip,
                        { backgroundColor: theme.cardBgAlt, borderColor: theme.border },
                        mistralModel === mod.key && styles.modelChipActive
                      ]}
                      onPress={() => setMistralModel(mod.key)}
                    >
                      <Text
                        style={[
                          styles.modelChipText,
                          { color: theme.textSub },
                          mistralModel === mod.key && styles.modelChipTextActive
                        ]}
                      >
                        {mod.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.mainSaveBtn} onPress={handleSave}>
            <Ionicons name="checkmark-circle" size={22} color="#ffffff" />
            <Text style={styles.mainSaveBtnText}>{t.saveProfile}</Text>
          </TouchableOpacity>
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
  cardSubtitle: {
    fontSize: 12,
    marginTop: 2
  },
  cuisinesList: {
    gap: 12
  },
  cuisineCard: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10
  },
  cuisineTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  cuisineEmoji: {
    fontSize: 24
  },
  cuisineName: {
    fontSize: 14,
    fontWeight: "700"
  },
  cuisineDesc: {
    fontSize: 11,
    marginTop: 1,
    lineHeight: 15
  },
  cursorContainer: {
    marginTop: 2
  },
  cursorTrack: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    padding: 3,
    gap: 4
  },
  cursorStepBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  cursorStepText: {
    fontSize: 11,
    fontWeight: "700"
  },
  cursorStepTextActive: {
    color: "#ffffff"
  },
  appliancesGrid: {
    gap: 10
  },
  applianceCard: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5
  },
  applianceTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  applianceEmoji: {
    fontSize: 26
  },
  applianceName: {
    fontSize: 14,
    fontWeight: "700"
  },
  applianceDesc: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15
  },
  applianceCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
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
  engineContainer: {
    gap: 8,
    marginBottom: 12
  },
  engineCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 12
  },
  engineCardActiveLocal: {
    borderColor: "#38bdf8",
    backgroundColor: "rgba(56, 189, 248, 0.08)"
  },
  engineCardActiveMistral: {
    borderColor: "#a855f7",
    backgroundColor: "rgba(168, 85, 247, 0.08)"
  },
  engineIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  engineTextBox: {
    flex: 1
  },
  engineTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 2
  },
  engineSub: {
    fontSize: 11,
    lineHeight: 15
  },
  engineRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  mistralSettings: {
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155"
  },
  inputLabel: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6
  },
  apiKeyInput: {
    fontFamily: "monospace",
    fontSize: 13
  },
  testKeyBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center"
  },
  btnDisabled: {
    opacity: 0.6
  },
  testResultBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8
  },
  testSuccessBox: {
    backgroundColor: "#064e3b/40",
    borderWidth: 1,
    borderColor: "#10b981/50"
  },
  testErrorBox: {
    backgroundColor: "#7f1d1d/40",
    borderWidth: 1,
    borderColor: "#ef4444/50"
  },
  testResultText: {
    fontSize: 12,
    fontWeight: "600"
  },
  testSuccessText: {
    color: "#34d399"
  },
  testErrorText: {
    color: "#f87171"
  },
  modelChipsRow: {
    gap: 8,
    marginTop: 4
  },
  modelChip: {
    backgroundColor: "#0f172a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  modelChipActive: {
    backgroundColor: "#3b0764",
    borderColor: "#c084fc"
  },
  modelChipText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "500"
  },
  modelChipTextActive: {
    color: "#f3e8ff",
    fontWeight: "700"
  },
  mealTypesGrid: {
    gap: 10,
    marginTop: 8
  },
  mealTypeCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  mealTypeInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  mealTypeEmoji: {
    fontSize: 24
  },
  mealTypeLabel: {
    fontSize: 15,
    fontWeight: "600"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});

