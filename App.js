import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  ActivityIndicator,
  StatusBar,
  Alert,
  Platform
} from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { TRANSLATIONS } from "./i18n/translations";
import { StorageService, DEFAULT_PROFILE, DEFAULT_AI_CONFIG } from "./utils/storage";
import { AIPlannerService } from "./services/aiPlannerService";
import { RECIPES_CATALOG } from "./services/defaultRecipes";
import { THEMES } from "./utils/theme";

import MealCard from "./components/MealCard";
import RecipeModal from "./components/RecipeModal";
import FamilyProfileModal from "./components/FamilyProfileModal";
import GroceryItemRow from "./components/GroceryItemRow";
import FridgeModal from "./components/FridgeModal";
import QuickMenuModal from "./components/QuickMenuModal";
import DriveCartModal from "./components/DriveCartModal";
import PaywallModal from "./components/PaywallModal";
import BannerAdView from "./components/BannerAdView";
import AdRewardModal from "./components/AdRewardModal";
import AiGenerationLoadingModal from "./components/AiGenerationLoadingModal";
import { purchaseService } from "./services/purchaseService";
import { adService } from "./services/adService";

function MainApp() {
  const insets = useSafeAreaInsets();
  const [lang, setLang] = useState("fr");
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";

  const [themeMode, setThemeMode] = useState("dark"); // "dark" | "light"
  const currentTheme = THEMES[themeMode] || THEMES.dark;

  const [activeTab, setActiveTab] = useState("planner"); // planner, groceries, recipes, profile
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [aiConfig, setAiConfig] = useState(DEFAULT_AI_CONFIG);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedDurationWeeks, setSelectedDurationWeeks] = useState(1);
  const [groceries, setGroceries] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isFridgeModalOpen, setIsFridgeModalOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isDriveRewardModalOpen, setIsDriveRewardModalOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);

  // Courses manuelles / filtre
  const [newCustomItem, setNewCustomItem] = useState("");
  const [selectedGroceryDept, setSelectedGroceryDept] = useState("all");

  // Catalogue de recettes filtre / recherche
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState("all");

  useEffect(() => {
    loadSavedData();
    purchaseService.init();
    adService.init();
    const unsub = purchaseService.subscribe((proStatus) => {
      setIsPro(proStatus);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const loadSavedData = async () => {
    const savedLang = await StorageService.getLanguage();
    setLang(savedLang);

    const savedTheme = await StorageService.getTheme();
    if (savedTheme) {
      setThemeMode(savedTheme);
    }

    const savedProfile = await StorageService.getProfile();
    setProfile(savedProfile);

    const savedAiConfig = await StorageService.getAiConfig();
    setAiConfig(savedAiConfig);

    const savedPlan = await StorageService.getCurrentPlan();
    if (savedPlan) {
      setCurrentPlan(savedPlan);
      setSelectedDurationWeeks(savedPlan.durationWeeks || 1);
      const savedGroceries = await StorageService.getGroceries();
      const compiled = AIPlannerService.compileGroceries(savedPlan);
      // Conserver l'état coché des articles et les articles personnalisés
      const checkedNames = new Set(
        (savedGroceries || [])
          .filter(g => g.checked)
          .map(g => (g.name?.fr || g.customName || "").toLowerCase().trim())
      );
      const customItems = (savedGroceries || []).filter(g => g.id && g.id.startsWith("custom_"));
      const consolidated = compiled.map(c => ({
        ...c,
        checked: checkedNames.has((c.name?.fr || "").toLowerCase().trim())
      }));
      const fullList = [...customItems, ...consolidated];
      setGroceries(fullList);
      StorageService.saveGroceries(fullList);
    }

    // Premier lancement : si l'onboarding n'est pas fait, ouvrir la configuration
    const hasCompletedOnboarding = await StorageService.isOnboardingCompleted();
    if (!hasCompletedOnboarding) {
      setIsOnboarding(true);
      setIsProfileModalOpen(true);
    }
  };

  const handleLanguageChange = async (newLang) => {
    setLang(newLang);
    await StorageService.setLanguage(newLang);
  };

  const handleToggleTheme = async (newThemeMode) => {
    setThemeMode(newThemeMode);
    await StorageService.saveTheme(newThemeMode);
  };

  const handleSaveProfile = async (updatedProfile) => {
    setProfile(updatedProfile);
    await StorageService.saveProfile(updatedProfile);
    if (isOnboarding) {
      await StorageService.setOnboardingCompleted(true);
      setIsOnboarding(false);
    }
  };

  const handleSaveAiConfig = async (updatedConfig) => {
    setAiConfig(updatedConfig);
    await StorageService.saveAiConfig(updatedConfig);
  };

  const handleOpenDrive = () => {
    if (purchaseService.getIsPro()) {
      setIsDriveModalOpen(true);
    } else {
      setIsDriveRewardModalOpen(true);
    }
  };

  const handleGeneratePlan = async (
    customProfile = profile,
    durationWeeks = 1,
    config = aiConfig,
    activeLang = lang
  ) => {
    setIsGenerating(true);
    // Déclencher la pub avec un délai de 1.2s pour laisser l'utilisateur lire l'écran de préparation
    setTimeout(() => {
      adService.showInterstitial({ minIntervalSeconds: 15 });
    }, 1200);
    try {
      const { plan, groceries: compiledGroceries, error } = await AIPlannerService.generateMealPlan(
        customProfile,
        durationWeeks,
        config,
        activeLang
      );
      if (error) {
        Alert.alert("⚠️ Information Mistral AI", `${error}\n\nUn planning local a été généré.`);
      }
      setCurrentPlan(plan);
      setSelectedDurationWeeks(durationWeeks);
      setGroceries(compiledGroceries);
      setSelectedWeek(1);
      setSelectedDayIndex(0);

      try {
        const summary = (compiledGroceries || []).map(g => `${g.name?.fr || g.customName} (${g.totalQuantity || ''} ${g.unit || ''})`).join(', ');
        fetch("http://192.168.1.111:8088/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "NEW_GENERATED_GROCERIES", text: `Articles (${compiledGroceries.length}): ${summary}` })
        }).catch(() => {});
      } catch(e) {}

      await StorageService.saveCurrentPlan(plan);
      await StorageService.saveGroceries(compiledGroceries);
    } catch (err) {
      console.error("Erreur lors de la génération du plan:", err);
      Alert.alert("Erreur", err.message || "Erreur inconnue");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSwapMeal = async (dayId, mealType, currentMeal) => {
    if (!currentPlan) return;
    setIsGenerating(true);
    try {
      const newMeal = await AIPlannerService.swapMeal(
        currentMeal?.id,
        mealType,
        profile,
        currentMeal,
        aiConfig,
        lang
      );
      const updatedDays = currentPlan.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: {
              ...day.meals,
              [mealType]: {
                ...newMeal,
                calculatedServings: day.servings
              }
            }
          };
        }
        return day;
      });

      const updatedPlan = { ...currentPlan, days: updatedDays };
      const updatedGroceries = AIPlannerService.compileGroceries(updatedPlan);

      setCurrentPlan(updatedPlan);
      setGroceries(updatedGroceries);
      await StorageService.saveCurrentPlan(updatedPlan);
      await StorageService.saveGroceries(updatedGroceries);
      adService.recordActionAndCheckInterstitial({ triggerEveryActions: 3, minIntervalSeconds: 30 });
    } catch (err) {
      console.error("Erreur lors du swap:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleGrocery = (itemId) => {
    const updated = groceries.map(item => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setGroceries(updated);
    StorageService.saveGroceries(updated);
  };

  const handleAddCustomGrocery = () => {
    if (!newCustomItem.trim()) return;
    const newItem = {
      id: `custom_${Date.now()}`,
      customName: newCustomItem.trim(),
      dept: "deptOther",
      checked: false
    };
    const updated = [newItem, ...groceries];
    setGroceries(updated);
    StorageService.saveGroceries(updated);
    setNewCustomItem("");
  };

  const handleClearCheckedGroceries = () => {
    const updated = groceries.filter(item => !item.checked);
    setGroceries(updated);
    StorageService.saveGroceries(updated);
  };

  const handleClearAllGroceries = () => {
    setGroceries([]);
    StorageService.saveGroceries([]);
  };

  const handleReloadGroceriesFromPlan = () => {
    if (!currentPlan) return;
    const compiled = AIPlannerService.compileGroceries(currentPlan);
    setGroceries(compiled);
    StorageService.saveGroceries(compiled);
  };

  const handleClearGroceriesMenu = () => {
    if (groceries.length === 0) return;

    if (checkedCount === 0) {
      // Direct confirmation to empty all
      Alert.alert(
        t.clearAllTitle || "Vider tout le panier ?",
        t.clearAllDesc || "Voulez-vous vraiment supprimer tous les articles de votre liste de courses ?",
        [
          { text: t.cancel || "Annuler", style: "cancel" },
          {
            text: t.confirmClear || "Oui, tout vider",
            style: "destructive",
            onPress: handleClearAllGroceries
          }
        ]
      );
      return;
    }

    // Has checked items: offer choices
    Alert.alert(
      t.groceryTitle || "Liste des Courses",
      "Que souhaitez-vous supprimer ?",
      [
        {
          text: `🗑️ ${t.clearChecked || "Articles cochés"} (${checkedCount})`,
          onPress: handleClearCheckedGroceries
        },
        {
          text: `⚠️ ${t.clearAll || "Vider tout le panier"}`,
          style: "destructive",
          onPress: () => {
            Alert.alert(
              t.clearAllTitle || "Vider tout le panier ?",
              t.clearAllDesc || "Voulez-vous vraiment supprimer tous les articles de votre liste de courses ?",
              [
                { text: t.cancel || "Annuler", style: "cancel" },
                {
                  text: t.confirmClear || "Oui, tout vider",
                  style: "destructive",
                  onPress: handleClearAllGroceries
                }
              ]
            );
          }
        },
        { text: t.cancel || "Annuler", style: "cancel" }
      ]
    );
  };

  const handleShareGroceries = async () => {
    const lines = [t.shareMessageTitle, ""];
    const depts = [
      "deptProduce", "deptMeat", "deptDairy", "deptBakery",
      "deptPantry", "deptSpices", "deptFrozen", "deptDrinks", "deptOther"
    ];

    depts.forEach(deptKey => {
      const itemsInDept = groceries.filter(g => (g.dept || "deptOther") === deptKey && !g.checked);
      if (itemsInDept.length > 0) {
        lines.push(`\n${t[deptKey] || deptKey} :`);
        itemsInDept.forEach(item => {
          const name = item.name?.[lang] || item.name?.fr || item.customName;
          const qty = item.totalQuantity ? ` (${item.totalQuantity} ${item.unit})` : "";
          lines.push(`- [ ] ${name}${qty}`);
        });
      }
    });

    try {
      await Share.share({
        message: lines.join("\n")
      });
      adService.showInterstitial({ minIntervalSeconds: 30 });
    } catch {}
  };

  // Filtrage des jours pour la semaine sélectionnée
  const weekDays = currentPlan?.days?.filter(d => d.weekNumber === selectedWeek) || [];
  const currentDay = weekDays[selectedDayIndex] || weekDays[0];

  // Calculs nutritionnels et budget
  const householdServings = AIPlannerService.calculateHouseholdServings(profile);
  const currentDayCalories = currentDay ? (
    (currentDay.meals?.breakfast?.caloriesPerPerson || 0) +
    (currentDay.meals?.lunch?.caloriesPerPerson || 0) +
    (currentDay.meals?.snack?.caloriesPerPerson || 0) +
    (currentDay.meals?.dinner?.caloriesPerPerson || 0)
  ) : 0;

  const currentDayCookTime = currentDay ? (
    ((currentDay.meals?.breakfast?.prepTime || 0) + (currentDay.meals?.breakfast?.cookTime || 0)) +
    ((currentDay.meals?.lunch?.prepTime || 0) + (currentDay.meals?.lunch?.cookTime || 0)) +
    ((currentDay.meals?.snack?.prepTime || 0) + (currentDay.meals?.snack?.cookTime || 0)) +
    ((currentDay.meals?.dinner?.prepTime || 0) + (currentDay.meals?.dinner?.cookTime || 0))
  ) : 0;

  const activeMealsPerDay = (profile?.mealTypes && profile.mealTypes.length > 0) ? profile.mealTypes.length : 4;
  const estimatedWeeklyBudget = Math.round(householdServings * 7 * (activeMealsPerDay * 1.4));

  // Groupement des courses par rayons
  const filteredGroceries = selectedGroceryDept === "all"
    ? groceries
    : groceries.filter(g => g.dept === selectedGroceryDept);

  const checkedCount = groceries.filter(g => g.checked).length;

  // Filtrage du catalogue de recettes
  const filteredRecipes = RECIPES_CATALOG.filter(rec => {
    if (recipeCategoryFilter === "breakfast" && rec.mealType !== "breakfast") return false;
    if (recipeCategoryFilter === "lunch" && rec.mealType !== "lunch") return false;
    if (recipeCategoryFilter === "dinner" && rec.mealType !== "dinner") return false;
    if (recipeCategoryFilter === "snack" && rec.mealType !== "snack") return false;
    if (recipeCategoryFilter === "quick" && (rec.prepTime + rec.cookTime) > 20) return false;
    if (recipeCategoryFilter === "vegetarian" && !rec.tags?.includes("dietVegetarian") && !rec.tags?.includes("dietVegan")) return false;
    if (recipeCategoryFilter === "glutenFree" && !rec.tags?.includes("dietGlutenFree")) return false;

    if (recipeSearchQuery.trim()) {
      const q = recipeSearchQuery.toLowerCase().trim();
      const titleMatch = (rec.title?.[lang] || rec.title?.fr || "").toLowerCase().includes(q);
      const ingMatch = rec.ingredients?.some(ing => {
        const name = (ing.name?.[lang] || ing.name?.fr || (typeof ing.name === "string" ? ing.name : "")).toLowerCase();
        return name.includes(q);
      });
      return titleMatch || ingMatch;
    }

    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]} edges={["top", "left", "right"]}>
      <StatusBar barStyle={currentTheme.statusBar} backgroundColor={currentTheme.bg} />

      {/* Top Navbar */}
      <View style={[styles.topBar, { backgroundColor: currentTheme.headerBg, borderBottomColor: currentTheme.border }, isRTL && styles.rtlRow]}>
        <View style={[styles.brandRow, isRTL && styles.rtlRow]}>
          <LinearGradient
            colors={["#10b981", "#059669"]}
            style={styles.logoBadge}
          >
            <Ionicons name="nutrition" size={20} color="#ffffff" />
          </LinearGradient>
          <View>
            <Text style={[styles.brandName, { color: currentTheme.text }]}>PlanEat</Text>
            <Text style={[styles.brandTagline, { color: currentTheme.textSub }]}>{t.appTagline}</Text>
          </View>
        </View>

        <View style={[styles.topActions, isRTL && styles.rtlRow]}>
          <TouchableOpacity
            style={[styles.menuBurgerBtn, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}
            onPress={() => setIsQuickMenuOpen(true)}
          >
            <Ionicons name="menu" size={22} color={currentTheme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TAB 1 : PLANNING DES REPAS */}
      {activeTab === "planner" && (
        <View style={styles.tabContent}>
          {/* Controls bar (Générer + Durée) */}
          <View style={[styles.plannerControls, isRTL && styles.rtlRow]}>
            <TouchableOpacity
              style={[styles.aiGenerateBtn, isGenerating && styles.btnDisabled]}
              onPress={() => handleGeneratePlan(profile, selectedDurationWeeks, aiConfig, lang)}
              disabled={isGenerating}
            >
              <LinearGradient
                colors={["#7c3aed", "#6d28d9"]}
                style={styles.aiGradient}
              >
                {isGenerating ? (
                  <View style={styles.loadingBtnRow}>
                    <ActivityIndicator size="small" color="#ffffff" />
                    <Text style={styles.aiBtnText}>
                      {t.regenerating || "Génération..."}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.aiBtnText}>
                    {t.generatePlan || "Générer le menu"}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Durée selector */}
            <View style={[styles.durationRow, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border, borderWidth: 1 }]}>
              {[1, 2].map(w => (
                <TouchableOpacity
                  key={w}
                  style={[
                    styles.durationChip,
                    { backgroundColor: selectedDurationWeeks === w ? "#0284c7" : "transparent" }
                  ]}
                  onPress={() => setSelectedDurationWeeks(w)}
                >
                  <Text style={[
                    styles.durationChipText,
                    { color: selectedDurationWeeks === w ? "#ffffff" : currentTheme.textSub }
                  ]}>
                    {w === 1 ? t.oneWeek : t.twoWeeks}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Week Selector (si > 1 semaine) */}
          {(currentPlan?.durationWeeks || 1) > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekPickerScroll} contentContainerStyle={styles.weekPickerContent}>
              {Array.from({ length: currentPlan.durationWeeks }).map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.weekTabBtn,
                    { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border },
                    selectedWeek === idx + 1 && styles.weekTabBtnActive
                  ]}
                  onPress={() => {
                    setSelectedWeek(idx + 1);
                    setSelectedDayIndex(0);
                  }}
                >
                  <Text style={[
                    styles.weekTabBtnText,
                    { color: currentTheme.textSub },
                    selectedWeek === idx + 1 && styles.weekTabBtnTextActive
                  ]}>
                    {t.week} {idx + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Day of week tabs */}
          <View style={[styles.dayTabsWrapper, { borderBottomColor: currentTheme.border }]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.dayTabsScroll, isRTL && styles.rtlRow]}
            >
              {weekDays.map((day, idx) => {
                const isSelected = selectedDayIndex === idx;
                const dayName = t[day.dayKey] || day.dayKey;
                return (
                  <TouchableOpacity
                    key={day.id}
                    style={[styles.dayTab, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }, isSelected && styles.dayTabActive]}
                    onPress={() => setSelectedDayIndex(idx)}
                  >
                    <Text style={[styles.dayTabShort, { color: currentTheme.textSub }, isSelected && styles.dayTabShortActive]}>
                      {dayName.slice(0, 3)}
                    </Text>
                    <Text style={[styles.dayTabNumber, { color: currentTheme.text }, isSelected && styles.dayTabNumberActive]}>
                      {idx + 1}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Meal List for the selected day */}
          <ScrollView style={styles.mealsScroll} contentContainerStyle={styles.mealsContent}>
            {currentDay ? (
              <>
                <View style={[styles.dayHeaderRow, isRTL && styles.rtlRow]}>
                  <Text style={[styles.dayFullTitle, { color: currentTheme.text }]}>
                    📅 {t[currentDay.dayKey] || currentDay.dayKey}
                  </Text>
                  <Text style={styles.dayServingsBadge}>
                    👥 {currentDay.servings} {t.servings}
                  </Text>
                </View>

                {/* Quick Stats Pills */}
                <View style={[styles.statsRow, isRTL && styles.rtlRow]}>
                  <View style={[styles.statPill, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
                    <Ionicons name="flame" size={13} color="#f97316" />
                    <Text style={[styles.statPillText, { color: currentTheme.text }]}>{currentDayCalories} kcal</Text>
                  </View>
                  <View style={[styles.statPill, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
                    <Ionicons name="time" size={13} color="#38bdf8" />
                    <Text style={[styles.statPillText, { color: currentTheme.text }]}>{currentDayCookTime} {t.minutes}</Text>
                  </View>
                  <View style={[styles.statPill, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
                    <Ionicons name="wallet" size={13} color="#10b981" />
                    <Text style={[styles.statPillText, { color: currentTheme.text }]}>~{estimatedWeeklyBudget} €/sem</Text>
                  </View>
                </View>

                {currentDay.meals?.breakfast ? (
                  <MealCard
                    mealType="breakfast"
                    meal={currentDay.meals.breakfast}
                    onPressRecipe={() => setSelectedRecipe(currentDay.meals.breakfast)}
                    onPressSwap={() => handleSwapMeal(currentDay.id, "breakfast", currentDay.meals.breakfast)}
                    lang={lang}
                    theme={currentTheme}
                  />
                ) : null}

                {currentDay.meals?.lunch ? (
                  <MealCard
                    mealType="lunch"
                    meal={currentDay.meals.lunch}
                    onPressRecipe={() => setSelectedRecipe(currentDay.meals.lunch)}
                    onPressSwap={() => handleSwapMeal(currentDay.id, "lunch", currentDay.meals.lunch)}
                    lang={lang}
                    theme={currentTheme}
                  />
                ) : null}

                {currentDay.meals?.snack ? (
                  <MealCard
                    mealType="snack"
                    meal={currentDay.meals.snack}
                    onPressRecipe={() => setSelectedRecipe(currentDay.meals.snack)}
                    onPressSwap={() => handleSwapMeal(currentDay.id, "snack", currentDay.meals.snack)}
                    lang={lang}
                    theme={currentTheme}
                  />
                ) : null}

                {currentDay.meals?.dinner ? (
                  <MealCard
                    mealType="dinner"
                    meal={currentDay.meals.dinner}
                    onPressRecipe={() => setSelectedRecipe(currentDay.meals.dinner)}
                    onPressSwap={() => handleSwapMeal(currentDay.id, "dinner", currentDay.meals.dinner)}
                    lang={lang}
                    theme={currentTheme}
                  />
                ) : null}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🍽️</Text>
                <Text style={[styles.emptyTitle, { color: currentTheme.text }]}>{t.noMealsTitle}</Text>
                <Text style={[styles.emptyDesc, { color: currentTheme.textSub }]}>{t.noMealsDesc}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* TAB 2 : LISTE DES COURSES */}
      {activeTab === "groceries" && (
        <View style={styles.tabContent}>
          {/* Header Action Bar */}
          <View style={[styles.groceryHeaderBar, isRTL && styles.rtlRow]}>
            <View>
              <Text style={[styles.groceryMainTitle, { color: currentTheme.text }]}>{t.groceryTitle}</Text>
              <Text style={[styles.grocerySub, { color: currentTheme.textSub }]}>
                {checkedCount} / {groceries.length} {t.checkedCount}
              </Text>
            </View>

            <View style={styles.groceryHeaderActions}>
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={handleShareGroceries}
              >
                <Ionicons name="share-social-outline" size={18} color="#f8fafc" />
                <Text style={styles.shareBtnText}>{t.shareList.split(" ")[0]}</Text>
              </TouchableOpacity>

              {groceries.length > 0 && (
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={handleClearGroceriesMenu}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Banner Commande Drive */}
          {groceries.length > 0 && (
            <TouchableOpacity
              style={styles.driveBannerBtn}
              onPress={handleOpenDrive}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#0066c0", "#0284c7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.driveBannerGradient, isRTL && styles.rtlRow]}
              >
                <Ionicons name="cart" size={20} color="#ffffff" />
                <Text style={styles.driveBannerTitle}>{t.driveOrderBtn || "Remplir mon panier Drive"}</Text>
                <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={18} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Add custom item input */}
          <View style={[styles.addGroceryRow, isRTL && styles.rtlRow]}>
            <TextInput
              style={[styles.groceryInput, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border, color: currentTheme.text }, isRTL && styles.rtlText]}
              placeholder={t.itemPlaceholder}
              placeholderTextColor={currentTheme.textMuted}
              value={newCustomItem}
              onChangeText={setNewCustomItem}
              onSubmitEditing={handleAddCustomGrocery}
            />
            <TouchableOpacity style={styles.addGroceryBtn} onPress={handleAddCustomGrocery}>
              <Ionicons name="add" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Department Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.deptFilterScroll}
            contentContainerStyle={[styles.deptFilterScrollContent, isRTL && styles.rtlRow]}
          >
            {[
              { key: "all", label: t.filterAll },
              { key: "deptProduce", label: t.deptProduce },
              { key: "deptMeat", label: t.deptMeat },
              { key: "deptDairy", label: t.deptDairy },
              { key: "deptPantry", label: t.deptPantry },
              { key: "deptSpices", label: t.deptSpices },
              { key: "deptOther", label: t.deptOther }
            ].map(dept => (
              <TouchableOpacity
                key={dept.key}
                style={[
                  styles.deptChip,
                  { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border },
                  selectedGroceryDept === dept.key && styles.deptChipActive
                ]}
                onPress={() => setSelectedGroceryDept(dept.key)}
              >
                <Text style={[
                  styles.deptChipText,
                  { color: currentTheme.textSub },
                  selectedGroceryDept === dept.key && styles.deptChipTextActive
                ]}>
                  {dept.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Grocery items list */}
          <ScrollView style={styles.groceryScroll} contentContainerStyle={styles.groceryListContent}>
            {filteredGroceries.length > 0 ? (
              filteredGroceries.map(item => (
                <GroceryItemRow
                  key={item.id}
                  item={item}
                  onToggle={handleToggleGrocery}
                  lang={lang}
                  theme={currentTheme}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🛒</Text>
                <Text style={[styles.emptyTitle, { color: currentTheme.text }]}>{t.noGroceriesTitle}</Text>
                <Text style={[styles.emptyDesc, { color: currentTheme.textSub }]}>{t.noGroceriesDesc}</Text>
                {currentPlan?.days?.length > 0 && (
                  <TouchableOpacity
                    style={styles.reloadPlanGroceriesBtn}
                    onPress={handleReloadGroceriesFromPlan}
                  >
                    <Ionicons name="refresh" size={16} color="#ffffff" />
                    <Text style={styles.reloadPlanGroceriesBtnText}>{t.reloadFromPlan || "Recharger depuis mon planning"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* TAB 3 : RECETTES CATALOGUE */}
      {activeTab === "recipes" && (
        <View style={styles.tabContent}>
          {/* Search & Filter Header */}
          <View style={[styles.recipesSearchBox, { borderBottomColor: currentTheme.border }]}>
            <View style={[styles.recipesSearchInputRow, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }, isRTL && styles.rtlRow]}>
              <Ionicons name="search" size={18} color={currentTheme.textMuted} />
              <TextInput
                style={[styles.recipesSearchInput, { color: currentTheme.text }, isRTL && styles.rtlText]}
                placeholder={t.searchRecipesPlaceholder}
                placeholderTextColor={currentTheme.textMuted}
                value={recipeSearchQuery}
                onChangeText={setRecipeSearchQuery}
              />
              {recipeSearchQuery ? (
                <TouchableOpacity onPress={() => setRecipeSearchQuery("")}>
                  <Ionicons name="close-circle" size={18} color={currentTheme.textMuted} />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Filter Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recipesFilterScroll}
              contentContainerStyle={[styles.recipesFilterScrollContent, isRTL && styles.rtlRow]}
            >
              {[
                { key: "all", label: t.filterAll },
                { key: "quick", label: t.filterQuick },
                { key: "breakfast", label: t.breakfast },
                { key: "lunch", label: t.lunch },
                { key: "snack", label: t.snack },
                { key: "vegetarian", label: t.filterVegetarian },
                { key: "glutenFree", label: t.filterGlutenFree }
              ].map(filter => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.deptChip,
                    { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border },
                    recipeCategoryFilter === filter.key && styles.deptChipActive
                  ]}
                  onPress={() => setRecipeCategoryFilter(filter.key)}
                >
                  <Text
                    style={[
                      styles.deptChipText,
                      { color: currentTheme.textSub },
                      recipeCategoryFilter === filter.key && styles.deptChipTextActive
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recipes list */}
          <ScrollView style={styles.recipesScroll} contentContainerStyle={styles.recipesContent}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(rec => (
                <MealCard
                  key={rec.id}
                  mealType={rec.mealType}
                  meal={{ ...rec, calculatedServings: householdServings }}
                  onPressRecipe={() => setSelectedRecipe({ ...rec, calculatedServings: householdServings })}
                  onPressSwap={() => {}}
                  lang={lang}
                  theme={currentTheme}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={[styles.emptyTitle, { color: currentTheme.text }]}>Aucune recette trouvée</Text>
                <Text style={[styles.emptyDesc, { color: currentTheme.textSub }]}>Essayez de modifier votre recherche ou filtre.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* BANNER AD (UTILISATEURS NON-PRO) */}
      <BannerAdView isPro={isPro} style={{ width: "100%", paddingVertical: 1, backgroundColor: currentTheme.headerBg, borderTopWidth: 1, borderTopColor: currentTheme.border }} />

      {/* BOTTOM TAB BAR */}
      <View
        style={[
          styles.bottomTabBar,
          {
            backgroundColor: currentTheme.tabBarBg,
            borderTopColor: currentTheme.border,
            paddingBottom: Math.max(insets.bottom, Platform.OS === "android" ? 28 : 10) + 8,
            paddingTop: 10
          },
          isRTL && styles.rtlRow
        ]}
      >
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab("planner")}
        >
          <Ionicons
            name={activeTab === "planner" ? "calendar" : "calendar-outline"}
            size={24}
            color={activeTab === "planner" ? "#10b981" : currentTheme.textMuted}
          />
          <Text style={[styles.tabLabel, { color: currentTheme.textMuted }, activeTab === "planner" && styles.tabLabelActive]}>
            {t.tabPlanner}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab("groceries")}
        >
          <View>
            <Ionicons
              name={activeTab === "groceries" ? "cart" : "cart-outline"}
              size={24}
              color={activeTab === "groceries" ? "#10b981" : currentTheme.textMuted}
            />
            {groceries.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{groceries.length - checkedCount}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tabLabel, { color: currentTheme.textMuted }, activeTab === "groceries" && styles.tabLabelActive]}>
            {t.tabGroceries}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab("recipes")}
        >
          <Ionicons
            name={activeTab === "recipes" ? "book" : "book-outline"}
            size={24}
            color={activeTab === "recipes" ? "#10b981" : currentTheme.textMuted}
          />
          <Text style={[styles.tabLabel, { color: currentTheme.textMuted }, activeTab === "recipes" && styles.tabLabelActive]}>
            {t.tabRecipes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setIsProfileModalOpen(true)}
        >
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={currentTheme.textMuted}
          />
          <Text style={[styles.tabLabel, { color: currentTheme.textMuted }]}>
            {t.tabProfile}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODALS */}
      <RecipeModal
        visible={!!selectedRecipe}
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        lang={lang}
        themeMode={themeMode}
      />

        <FamilyProfileModal
          visible={isProfileModalOpen}
          profile={profile}
          aiConfig={aiConfig}
          onSave={handleSaveProfile}
          onSaveAiConfig={handleSaveAiConfig}
          onClose={() => {
            setIsProfileModalOpen(false);
            if (isOnboarding) {
              StorageService.setOnboardingCompleted(true);
              setIsOnboarding(false);
            }
          }}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          themeMode={themeMode}
          onToggleTheme={handleToggleTheme}
          isOnboarding={isOnboarding}
        />

        <FridgeModal
          visible={isFridgeModalOpen}
          onClose={() => setIsFridgeModalOpen(false)}
          profile={profile}
          aiConfig={aiConfig}
          lang={lang}
          themeMode={themeMode}
          onOpenPaywall={() => setIsPaywallOpen(true)}
          onOpenRecipe={(recipe) => {
            setIsFridgeModalOpen(false);
            setSelectedRecipe(recipe);
          }}
        />

        <QuickMenuModal
          visible={isQuickMenuOpen}
          onClose={() => setIsQuickMenuOpen(false)}
          onOpenFridge={() => setIsFridgeModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenDrive={handleOpenDrive}
          onOpenPaywall={() => setIsPaywallOpen(true)}
          isPro={isPro}
          aiConfig={aiConfig}
          profile={profile}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          themeMode={themeMode}
          onToggleTheme={handleToggleTheme}
        />

        <DriveCartModal
          visible={isDriveModalOpen}
          onClose={() => setIsDriveModalOpen(false)}
          groceries={groceries}
          onToggleItem={handleToggleGrocery}
          lang={lang}
          themeMode={themeMode}
        />

        <AdRewardModal
          visible={isDriveRewardModalOpen}
          onClose={() => setIsDriveRewardModalOpen(false)}
          onRewardEarned={() => setIsDriveModalOpen(true)}
          onOpenPaywall={() => setIsPaywallOpen(true)}
          title="Remplissage Panier Drive"
          subtitle="Regardez une courte vidéo pour lancer le remplissage guidé de vos courses sur le Drive, ou passez à PlanEat Pro pour un accès illimité sans publicité."
          icon="cart"
          iconColor="#0284c7"
          actionLabel="Lancer le Drive"
          themeMode={themeMode}
        />

        <PaywallModal
          visible={isPaywallOpen}
          onClose={() => setIsPaywallOpen(false)}
          themeMode={themeMode}
          onSuccess={() => setIsPro(true)}
        />

        {/* Écran immersif de préparation IA & notice publicitaire */}
        <AiGenerationLoadingModal
          visible={isGenerating}
          lang={lang}
          themeMode={themeMode}
          durationWeeks={selectedDurationWeeks}
        />
      </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b"
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  brandName: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5
  },
  brandTagline: {
    color: "#94a3b8",
    fontSize: 11
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  proHeaderBtn: {
    borderRadius: 10,
    overflow: "hidden"
  },
  proHeaderGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 10
  },
  proHeaderText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  fridgeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#0c4a6e",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0284c7"
  },
  fridgeBtnText: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "700"
  },
  menuBurgerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  menuIndicatorDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4
  },
  dotMistral: {
    backgroundColor: "#c084fc"
  },
  dotLocal: {
    backgroundColor: "#38bdf8"
  },
  engineBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1
  },
  engineBadgeMistral: {
    backgroundColor: "#3b0764",
    borderColor: "#a855f7"
  },
  engineBadgeLocal: {
    backgroundColor: "#082f49",
    borderColor: "#0284c7"
  },
  engineBadgeText: {
    fontSize: 11,
    fontWeight: "700"
  },
  engineBadgeTextMistral: {
    color: "#e9d5ff"
  },
  engineBadgeTextLocal: {
    color: "#bae6fd"
  },
  profileBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 6
  },
  profileBtnText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700"
  },
  tabContent: {
    flex: 1
  },
  plannerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8
  },
  aiGenerateBtn: {
    borderRadius: 12,
    overflow: "hidden",
    minWidth: 142
  },
  aiGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  loadingBtnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  aiBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13,
    textAlign: "center"
  },
  btnDisabled: {
    opacity: 0.6
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    padding: 3,
    borderRadius: 12,
    gap: 4
  },
  durationChip: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8
  },
  durationChipActive: {
    backgroundColor: "#0284c7"
  },
  durationChipText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center"
  },
  durationChipTextActive: {
    color: "#ffffff"
  },
  weekPickerScroll: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginBottom: 4,
    flexGrow: 0,
    maxHeight: 38
  },
  weekPickerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  weekTabBtn: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155"
  },
  weekTabBtnActive: {
    backgroundColor: "#10b981",
    borderColor: "#059669"
  },
  weekTabBtnText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700"
  },
  weekTabBtnTextActive: {
    color: "#ffffff"
  },
  dayTabsWrapper: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b"
  },
  dayTabsScroll: {
    paddingHorizontal: 16,
    gap: 8
  },
  dayTab: {
    width: 52,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "#1e293b",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155"
  },
  dayTabActive: {
    backgroundColor: "#10b981",
    borderColor: "#059669"
  },
  dayTabShort: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2
  },
  dayTabShortActive: {
    color: "#d1fae5"
  },
  dayTabNumber: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "800"
  },
  dayTabNumberActive: {
    color: "#ffffff"
  },
  mealsScroll: {
    flex: 1
  },
  mealsContent: {
    padding: 16,
    paddingBottom: 24
  },
  dayHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  dayFullTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800"
  },
  dayServingsBadge: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "700",
    backgroundColor: "#064e3b",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14
  },
  statPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#1e293b",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  statPillText: {
    color: "#f8fafc",
    fontSize: 11,
    fontWeight: "700"
  },
  groceryHeaderBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  groceryMainTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800"
  },
  grocerySub: {
    color: "#94a3b8",
    fontSize: 12
  },
  groceryHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0284c7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6
  },
  shareBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700"
  },
  clearBtn: {
    backgroundColor: "#7f1d1d",
    padding: 8,
    borderRadius: 12
  },
  driveBannerBtn: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#0284c7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6
  },
  driveBannerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10
  },
  driveBannerTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center"
  },
  addGroceryRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8
  },
  groceryInput: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#f8fafc",
    borderWidth: 1,
    borderColor: "#334155",
    fontSize: 14
  },
  addGroceryBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center"
  },
  deptFilterScroll: {
    flexGrow: 0,
    marginBottom: 10
  },
  deptFilterScrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8
  },
  deptChip: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center"
  },
  deptChipActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8"
  },
  deptChipText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700"
  },
  deptChipTextActive: {
    color: "#ffffff"
  },
  groceryScroll: {
    flex: 1
  },
  groceryListContent: {
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  recipesSearchBox: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b"
  },
  recipesSearchInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 8,
    marginBottom: 10
  },
  recipesSearchInput: {
    flex: 1,
    color: "#f8fafc",
    fontSize: 14,
    padding: 0
  },
  recipesFilterScroll: {
    flexGrow: 0,
    marginBottom: 4
  },
  recipesFilterScrollContent: {
    gap: 6
  },
  recipesScroll: {
    flex: 1
  },
  recipesContent: {
    padding: 16,
    paddingBottom: 24
  },
  sectionHeaderTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    paddingHorizontal: 16,
    justifyContent: "space-around"
  },
  tabBtn: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60
  },
  tabLabel: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3
  },
  tabLabelActive: {
    color: "#10b981"
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1
  },
  cartBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800"
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 12
  },
  emptyTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center"
  },
  emptyDesc: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20
  },
  reloadPlanGroceriesBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0284c7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 16,
    gap: 8
  },
  reloadPlanGroceriesBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});
