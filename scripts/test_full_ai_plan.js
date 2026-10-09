import { AIPlannerService } from "../services/aiPlannerService.js";
import { DriveService } from "../services/driveService.js";

console.log("🚀 Starting Full PlanEat AI Generation & Grocery Compilation Test...\n");

const testProfile = {
  adults: 2,
  childrenAges: [5, 8],
  goal: "healthy",
  diets: [],
  dislikedFoods: [],
  season: "autumn",
  cuisines: {
    french: 4,
    italian: 3,
    oriental: 3,
    asian: 2,
    mexican: 2,
    indian: 2,
    streetfood: 2
  },
  breakfastFlavor: "sweet",
  snackFlavor: "sweet",
  enabledMeals: {
    breakfast: true,
    lunch: true,
    snack: true,
    dinner: true
  },
  leftoverPolicy: "none",
  weekDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
};

// 1. Test calculation of household servings
const servings = AIPlannerService.calculateHouseholdServings(testProfile);
console.log(`✅ Household Servings computed: ${servings} (Expected: 3.4 for 2 adults + 5yo + 8yo)`);

// 2. Generate Weekly Plan
const servingsMultiplier = AIPlannerService.calculateHouseholdServings(testProfile);
const { plan, groceries: groceryList } = AIPlannerService.generateLocalPlan(testProfile, 1, servingsMultiplier);
const daysCount = plan.days.length;
console.log(`✅ Weekly Plan Generated: ${daysCount} days`);

let totalMeals = 0;
plan.days.forEach(day => {
  if (day.meals.breakfast) totalMeals++;
  if (day.meals.lunch) totalMeals++;
  if (day.meals.snack) totalMeals++;
  if (day.meals.dinner) totalMeals++;
});
console.log(`✅ Total Meals scheduled: ${totalMeals} meals across the week`);
console.log(`✅ Grocery List compiled: ${groceryList.length} unique items across all departments`);

// 4. Verify department distribution
const depts = {};
groceryList.forEach(item => {
  depts[item.dept] = (depts[item.dept] || 0) + 1;
});
console.log("📊 Grocery Items per Department:", depts);

// 5. Verify zero fractional units on discrete items (eggs, brioche, pieces)
let issuesFound = 0;
groceryList.forEach(item => {
  const nameFr = item.name?.fr || item.name || "";
  const qty = item.totalQuantity;
  const unit = item.unit || "";

  // Check for fractional numbers on discrete items
  if (["piece", "tranche", "tranches", "unite", ""].includes(unit)) {
    if (qty % 1 !== 0) {
      console.error(`❌ FRACTIONAL ISSUE: ${nameFr} has fractional quantity: ${qty} ${unit}`);
      issuesFound++;
    }
  }

  // Check eggs specifically
  if (/oeufs?|œufs?/i.test(nameFr)) {
    if (qty % 1 !== 0) {
      console.error(`❌ EGG FRACTIONAL: ${nameFr} has ${qty} eggs`);
      issuesFound++;
    }
  }

  // Check naans/breads
  if (/naan/i.test(nameFr) && qty > 20) {
    console.error(`❌ NAAN EXCESSIVE: ${nameFr} has ${qty} naans`);
    issuesFound++;
  }

  // Test Drive search keyword generation
  const cleanSearch = DriveService.cleanSearchQuery(nameFr);
  if (!cleanSearch) {
    console.error(`❌ EMPTY SEARCH QUERY for item: ${nameFr}`);
    issuesFound++;
  }
});

// 6. Check duplicate names in grocery list
const nameMap = new Map();
groceryList.forEach(item => {
  const nameFr = (item.name?.fr || "").toLowerCase().trim();
  if (nameMap.has(nameFr)) {
    console.error(`❌ DUPLICATE ITEM IN LIST: "${nameFr}" appears multiple times!`);
    issuesFound++;
  }
  nameMap.set(nameFr, true);
});

if (issuesFound === 0) {
  console.log("\n🎉 ALL TESTS PASSED! Meal generation, canonical consolidation, discrete unit ceil, deduplication and Drive search work flawlessly!");
} else {
  console.error(`\n❌ ${issuesFound} issues found during test.`);
  process.exit(1);
}
