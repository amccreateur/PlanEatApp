import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { TRANSLATIONS } from "./i18n/translations";
import { StorageService, DEFAULT_PROFILE, DEFAULT_AI_CONFIG } from "./utils/storage";
import { AIPlannerService } from "./services/aiPlannerService";
import { RECIPES_CATALOG } from "./services/defaultRecipes";

import MealCard from "./components/MealCard";
import RecipeModal from "./components/RecipeModal";
import FamilyProfileModal from "./components/FamilyProfileModal";
import GroceryItemRow from "./components/GroceryItemRow";

export default function App() {
  const [lang, setLang] = useState("fr");
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const isRTL = lang === "ar";

  const [activeTab, setActiveTab] = useState("planner"); // planner, groceries, recipes, profile
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [aiConfig, setAiConfig] = useState(DEFAULT_AI_CONFIG);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [groceries, setGroceries] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Courses manuelles / filtre
  const [newCustomItem, setNewCustomItem] = useState("");
  const [selectedGroceryDept, setSelectedGroceryDept] = useState("all");

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    const savedLang = await StorageService.getLanguage();
    setLang(savedLang);

    const savedProfile = await StorageService.getProfile();
    setProfile(savedProfile);

    const savedAiConfig = await StorageService.getAiConfig();
    setAiConfig(savedAiConfig);

    const savedPlan = await StorageService.getCurrentPlan();
    if (savedPlan) {
      setCurrentPlan(savedPlan);
      const savedGroceries = await StorageService.getGroceries();
      setGroceries(savedGroceries.length > 0 ? savedGroceries : AIPlannerService.compileGroceries(savedPlan));
    } else {
      // Génération automatique initiale
      handleGeneratePlan(savedProfile, 1, savedAiConfig, savedLang);
    }
  };

  const handleLanguageChange = async (newLang) => {
    setLang(newLang);
    await StorageService.setLanguage(newLang);
  };

  const handleSaveProfile = async (updatedProfile) => {
    setProfile(updatedProfile);
    await StorageService.saveProfile(updatedProfile);
  };

  const handleSaveAiConfig = async (updatedConfig) => {
    setAiConfig(updatedConfig);
    await StorageService.saveAiConfig(updatedConfig);
  };

  const handleGeneratePlan = async (
    customProfile = profile,
    durationWeeks = 1,
    config = aiConfig,
    activeLang = lang
  ) => {
    setIsGenerating(true);
    try {
      const { plan, groceries: compiledGroceries } = await AIPlannerService.generateMealPlan(
        customProfile,
        durationWeeks,
        config,
        activeLang
      );
      setCurrentPlan(plan);
      setGroceries(compiledGroceries);
      setSelectedWeek(1);
      setSelectedDayIndex(0);

      await StorageService.saveCurrentPlan(plan);
      await StorageService.saveGroceries(compiledGroceries);
    } catch (err) {
      console.error("Erreur lors de la génération du plan:", err);
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
    } catch {}
  };

  // Filtrage des jours pour la semaine sélectionnée
  const weekDays = currentPlan?.days?.filter(d => d.weekNumber === selectedWeek) || [];
  const currentDay = weekDays[selectedDayIndex] || weekDays[0];

  // Groupement des courses par rayons
  const filteredGroceries = selectedGroceryDept === "all"
    ? groceries
    : groceries.filter(g => g.dept === selectedGroceryDept);

  const checkedCount = groceries.filter(g => g.checked).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Top Navbar */}
      <View style={[styles.topBar, isRTL && styles.rtlRow]}>
        <View style={[styles.brandRow, isRTL && styles.rtlRow]}>
          <LinearGradient
            colors={["#10b981", "#059669"]}
            style={styles.logoBadge}
          >
            <Ionicons name="nutrition" size={20} color="#ffffff" />
          </LinearGradient>
          <View>
            <Text style={styles.brandName}>PlanEat</Text>
            <Text style={styles.brandTagline}>{t.appTagline}</Text>
          </View>
        </View>

        <View style={[styles.topActions, isRTL && styles.rtlRow]}>
          <TouchableOpacity
            style={[
              styles.engineBadge,
              aiConfig.engine === "mistral" ? styles.engineBadgeMistral : styles.engineBadgeLocal
            ]}
            onPress={() => setIsProfileModalOpen(true)}
          >
            <Ionicons
              name={aiConfig.engine === "mistral" ? "sparkles" : "hardware-chip"}
              size={13}
              color={aiConfig.engine === "mistral" ? "#c084fc" : "#38bdf8"}
            />
            <Text
              style={[
                styles.engineBadgeText,
                aiConfig.engine === "mistral" ? styles.engineBadgeTextMistral : styles.engineBadgeTextLocal
              ]}
            >
              {aiConfig.engine === "mistral" ? "Mistral" : "Local"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => setIsProfileModalOpen(true)}
          >
            <Ionicons name="people" size={18} color="#38bdf8" />
            <Text style={styles.profileBtnText}>
              {profile.adults + profile.children} {t.servingsShort}
            </Text>
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
              onPress={() => handleGeneratePlan(profile, currentPlan?.durationWeeks || 1, aiConfig, lang)}
              disabled={isGenerating}
            >
              <LinearGradient
                colors={aiConfig.engine === "mistral" ? ["#7c3aed", "#6d28d9"] : ["#0284c7", "#0369a1"]}
                style={styles.aiGradient}
              >
                {isGenerating ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <Ionicons name={aiConfig.engine === "mistral" ? "sparkles" : "flash"} size={16} color="#f8fafc" />
                    <Text style={styles.aiBtnText}>
                      {aiConfig.engine === "mistral" ? "Mistral AI" : t.generatePlan}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Durée selector */}
            <View style={styles.durationRow}>
              {[1, 2, 4].map(w => (
                <TouchableOpacity
                  key={w}
                  style={[
                    styles.durationChip,
                    (currentPlan?.durationWeeks || 1) === w && styles.durationChipActive
                  ]}
                  onPress={() => handleGeneratePlan(profile, w, aiConfig, lang)}
                >
                  <Text style={[
                    styles.durationChipText,
                    (currentPlan?.durationWeeks || 1) === w && styles.durationChipTextActive
                  ]}>
                    {w === 1 ? t.oneWeek : w === 2 ? t.twoWeeks : t.oneMonth}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Week Selector (si > 1 semaine) */}
          {(currentPlan?.durationWeeks || 1) > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekPickerScroll}>
              {Array.from({ length: currentPlan.durationWeeks }).map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.weekTabBtn,
                    selectedWeek === idx + 1 && styles.weekTabBtnActive
                  ]}
                  onPress={() => {
                    setSelectedWeek(idx + 1);
                    setSelectedDayIndex(0);
                  }}
                >
                  <Text style={[
                    styles.weekTabBtnText,
                    selectedWeek === idx + 1 && styles.weekTabBtnTextActive
                  ]}>
                    {t.week} {idx + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Day of week tabs */}
          <View style={styles.dayTabsWrapper}>
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
                    style={[styles.dayTab, isSelected && styles.dayTabActive]}
                    onPress={() => setSelectedDayIndex(idx)}
                  >
                    <Text style={[styles.dayTabShort, isSelected && styles.dayTabShortActive]}>
                      {dayName.slice(0, 3)}
                    </Text>
                    <Text style={[styles.dayTabNumber, isSelected && styles.dayTabNumberActive]}>
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
                  <Text style={styles.dayFullTitle}>
                    📅 {t[currentDay.dayKey] || currentDay.dayKey}
                  </Text>
                  <Text style={styles.dayServingsBadge}>
                    👥 {currentDay.servings} {t.servings}
                  </Text>
                </View>

                <MealCard
                  mealType="breakfast"
                  meal={currentDay.meals.breakfast}
                  onPressRecipe={() => setSelectedRecipe(currentDay.meals.breakfast)}
                  onPressSwap={() => handleSwapMeal(currentDay.id, "breakfast", currentDay.meals.breakfast)}
                  lang={lang}
                />

                <MealCard
                  mealType="lunch"
                  meal={currentDay.meals.lunch}
                  onPressRecipe={() => setSelectedRecipe(currentDay.meals.lunch)}
                  onPressSwap={() => handleSwapMeal(currentDay.id, "lunch", currentDay.meals.lunch)}
                  lang={lang}
                />

                <MealCard
                  mealType="snack"
                  meal={currentDay.meals.snack}
                  onPressRecipe={() => setSelectedRecipe(currentDay.meals.snack)}
                  onPressSwap={() => handleSwapMeal(currentDay.id, "snack", currentDay.meals.snack)}
                  lang={lang}
                />

                <MealCard
                  mealType="dinner"
                  meal={currentDay.meals.dinner}
                  onPressRecipe={() => setSelectedRecipe(currentDay.meals.dinner)}
                  onPressSwap={() => handleSwapMeal(currentDay.id, "dinner", currentDay.meals.dinner)}
                  lang={lang}
                />
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🍽️</Text>
                <Text style={styles.emptyTitle}>{t.noMealsTitle}</Text>
                <Text style={styles.emptyDesc}>{t.noMealsDesc}</Text>
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
              <Text style={styles.groceryMainTitle}>{t.groceryTitle}</Text>
              <Text style={styles.grocerySub}>
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

              {checkedCount > 0 && (
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={handleClearCheckedGroceries}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Add custom item input */}
          <View style={[styles.addGroceryRow, isRTL && styles.rtlRow]}>
            <TextInput
              style={[styles.groceryInput, isRTL && styles.rtlText]}
              placeholder={t.itemPlaceholder}
              placeholderTextColor="#64748b"
              value={newCustomItem}
              onChangeText={setNewCustomItem}
              onSubmitEditing={handleAddCustomGrocery}
            />
            <TouchableOpacity style={styles.addGroceryBtn} onPress={handleAddCustomGrocery}>
              <Ionicons name="add" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Department Filter Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptFilterScroll}>
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
                  selectedGroceryDept === dept.key && styles.deptChipActive
                ]}
                onPress={() => setSelectedGroceryDept(dept.key)}
              >
                <Text style={[
                  styles.deptChipText,
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
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🛒</Text>
                <Text style={styles.emptyTitle}>{t.noGroceriesTitle}</Text>
                <Text style={styles.emptyDesc}>{t.noGroceriesDesc}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* TAB 3 : RECETTES CATALOGUE */}
      {activeTab === "recipes" && (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.recipesContent}>
          <Text style={styles.sectionHeaderTitle}>📖 {t.tabRecipes}</Text>
          {RECIPES_CATALOG.map(rec => (
            <MealCard
              key={rec.id}
              mealType={rec.mealType}
              meal={{ ...rec, calculatedServings: AIPlannerService.calculateHouseholdServings(profile) }}
              onPressRecipe={() => setSelectedRecipe({ ...rec, calculatedServings: AIPlannerService.calculateHouseholdServings(profile) })}
              onPressSwap={() => {}}
              lang={lang}
            />
          ))}
        </ScrollView>
      )}

      {/* BOTTOM TAB BAR */}
      <View style={[styles.bottomTabBar, isRTL && styles.rtlRow]}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab("planner")}
        >
          <Ionicons
            name={activeTab === "planner" ? "calendar" : "calendar-outline"}
            size={24}
            color={activeTab === "planner" ? "#10b981" : "#64748b"}
          />
          <Text style={[styles.tabLabel, activeTab === "planner" && styles.tabLabelActive]}>
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
              color={activeTab === "groceries" ? "#10b981" : "#64748b"}
            />
            {groceries.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{groceries.length - checkedCount}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tabLabel, activeTab === "groceries" && styles.tabLabelActive]}>
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
            color={activeTab === "recipes" ? "#10b981" : "#64748b"}
          />
          <Text style={[styles.tabLabel, activeTab === "recipes" && styles.tabLabelActive]}>
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
            color="#64748b"
          />
          <Text style={styles.tabLabel}>
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
      />

      <FamilyProfileModal
        visible={isProfileModalOpen}
        profile={profile}
        aiConfig={aiConfig}
        onSave={handleSaveProfile}
        onSaveAiConfig={handleSaveAiConfig}
        onClose={() => setIsProfileModalOpen(false)}
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />
    </SafeAreaView>
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
    paddingVertical: 12,
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
    flex: 1,
    borderRadius: 14,
    overflow: "hidden"
  },
  aiGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 6
  },
  aiBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13
  },
  btnDisabled: {
    opacity: 0.6
  },
  durationRow: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    padding: 3,
    borderRadius: 12,
    gap: 4
  },
  durationChip: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8
  },
  durationChipActive: {
    backgroundColor: "#0284c7"
  },
  durationChipText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700"
  },
  durationChipTextActive: {
    color: "#ffffff"
  },
  weekPickerScroll: {
    paddingHorizontal: 16,
    marginBottom: 8
  },
  weekTabBtn: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
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
    paddingHorizontal: 16,
    marginBottom: 10
  },
  deptChip: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#334155"
  },
  deptChipActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8"
  },
  deptChipText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600"
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
    paddingVertical: 8,
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
  rtlRow: {
    flexDirection: "row-reverse"
  },
  rtlText: {
    textAlign: "right"
  }
});
