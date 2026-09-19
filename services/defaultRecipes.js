export const RECIPES_CATALOG = [
  // --- PETITS DÉJEUNERS (BREAKFASTS) ---
  {
    id: "b1",
    mealType: "breakfast",
    title: {
      fr: "Bowl Avoine & Fruits Rouges",
      en: "Oatmeal & Berry Energy Bowl",
      ar: "وعاء الشوفان والتوت المشكل"
    },
    emoji: "🥣",
    prepTime: 5,
    cookTime: 5,
    difficulty: "easy",
    caloriesPerPerson: 320,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Flocons d'avoine", en: "Rolled oats", ar: "رقائق الشوفان" }, quantity: 60, unit: "g", dept: "deptPantry" },
      { name: { fr: "Lait d'amande ou demi-écrémé", en: "Milk (almond or cow)", ar: "حليب" }, quantity: 180, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Fruits rouges (frais ou surgelés)", en: "Mixed berries", ar: "توت مشكل" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Miel ou sirop d'érable", en: "Honey or maple syrup", ar: "عسل" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Graines de chia ou amandes effilées", en: "Chia seeds or almonds", ar: "بذور الشيا أو لوز" }, quantity: 15, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites chauffer les flocons d'avoine avec le lait à feu doux pendant 4-5 minutes jusqu'à consistance crémeuse.",
        "Versez dans un bol, ajoutez une cuillère de miel.",
        "Décorez avec les fruits rouges et saupoudrez de graines de chia ou amandes."
      ],
      en: [
        "Cook oats with milk in a pot over medium-low heat for 4-5 minutes until creamy.",
        "Pour into a bowl and stir in honey.",
        "Top with mixed berries and chia seeds or sliced almonds."
      ],
      ar: [
        "اطه الشوفان مع الحليب على نار هادئة لمدة 4-5 دقائق حتى يصبح قوامها كريمياً.",
        "اسكب في وعاء وأضف ملعقة من العسل.",
        "زين الوعاء بالتوت وبذور الشيا أو رقائق اللوز."
      ]
    }
  },
  {
    id: "b2",
    mealType: "breakfast",
    title: {
      fr: "Toast Avocat & Œuf Poché",
      en: "Avocado & Poached Egg Toast",
      ar: "توست الأفوكادو والبيض"
    },
    emoji: "🥑",
    prepTime: 5,
    cookTime: 5,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Pain complet ou sans gluten", en: "Whole wheat bread", ar: "خبز كامل" }, quantity: 2, unit: "tranches", dept: "deptBakery" },
      { name: { fr: "Avocat mûr", en: "Ripe avocado", ar: "أفوكادو" }, quantity: 0.5, unit: "pièce", dept: "deptProduce" },
      { name: { fr: "Œufs frais", en: "Fresh eggs", ar: "بيض طازج" }, quantity: 1, unit: "pièce", dept: "deptDairy" },
      { name: { fr: "Jus de citron", en: "Lemon juice", ar: "عصير ليمون" }, quantity: 1, unit: "c.à.c", dept: "deptProduce" },
      { name: { fr: "Flocons de piment / Sel & Poivre", en: "Salt, pepper, chili flakes", ar: "ملح، فلفل وبهارات" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites griller les tranches de pain au grille-pain.",
        "Écrasez l'avocat avec un filet de jus de citron, sel et poivre.",
        "Faites pocher ou cuire l'œuf au plat selon votre goût.",
        "Étalez l'avocat sur le pain et déposez l'œuf chaud par-dessus."
      ],
      en: [
        "Toast the bread slices until golden and crisp.",
        "Mash avocado with lemon juice, salt, and pepper.",
        "Poach or fry the egg to your preferred doneness.",
        "Spread avocado over toast and top with the warm egg."
      ],
      ar: [
        "حمص شرائح الخبز حتى تصبح ذهبية ومقرمشة.",
        "اهرس الأفوكادو مع قليل من عصير الليمون والملح والفلفل.",
        "اطه البيض مسلوقاً أو مقلياً حسب الرغبة.",
        "افرد الأفوكادو على التوست وضع البيض الدافئ فوقه."
      ]
    }
  },
  {
    id: "b3",
    mealType: "breakfast",
    title: {
      fr: "Pancakes Banane Express (3 ingrédients)",
      en: "Easy 3-Ingredient Banana Pancakes",
      ar: "بان كيك الموز السريع"
    },
    emoji: "🥞",
    prepTime: 5,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 290,
    tags: ["dietBalanced", "dietVegetarian", "dietGlutenFree", "dietHalal", "dietBudget"],
    ingredients: [
      { name: { fr: "Banane mûre", en: "Ripe banana", ar: "موز ناضج" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
      { name: { fr: "Œufs", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pièces", dept: "deptDairy" },
      { name: { fr: "Flocons d'avoine mixés", en: "Oat flour / blended oats", ar: "دقيق الشوفان" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Huile de coco ou beurre", en: "Butter or coconut oil", ar: "زبدة أو زيت" }, quantity: 5, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Écrasez la banane à la fourchette dans un bol.",
        "Ajoutez les œufs et l'avoine, mélangez jusqu'à obtenir une pâte homogène.",
        "Faites cuire de petits disques dans une poêle chaude beurrée 2 min de chaque côté."
      ],
      en: [
        "Mash the banana in a bowl with a fork.",
        "Whisk in eggs and blended oats until smooth.",
        "Cook small rounds in a greased pan for 2 mins per side until golden."
      ],
      ar: [
        "اهرس الموز في وعاء باستخدام شوكة.",
        "أضف البيض ودقيق الشوفان واخلط جيداً حتى يتجانس.",
        "اطه في مقلاة مدهونة بقليل من الزبدة لمدة دقيقتين لكل جانب."
      ]
    }
  },

  // --- DÉJEUNERS & DÎNERS (LUNCH & DINNER) ---
  {
    id: "m1",
    mealType: "lunch",
    title: {
      fr: "Poulet Tikka & Riz Basmati Parfumé",
      en: "Tikka Chicken with Fragrant Basmati",
      ar: "دجاج تيكا مع أرز بسمتي معطر"
    },
    emoji: "🍗",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 540,
    tags: ["dietBalanced", "dietHalal", "dietGlutenFree", "dietQuick"],
    ingredients: [
      { name: { fr: "Filets de poulet", en: "Chicken breast", ar: "صدور دجاج" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Riz Basmati", en: "Basmati rice", ar: "أرز بسمتي" }, quantity: 70, unit: "g", dept: "deptPantry" },
      { name: { fr: "Yaourt nature", en: "Plain yogurt", ar: "زبادي طبيعي" }, quantity: 40, unit: "g", dept: "deptDairy" },
      { name: { fr: "Épices Tikka Masala / Curry", en: "Tikka Masala spice blend", ar: "بهارات تيكا ماسالا" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Courgettes ou petits pois", en: "Zucchini or green peas", ar: "كوسة أو بازلاء" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Huile d'olive", en: "Olive oil", ar: "زيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Coupez le poulet en dés et mélangez avec le yaourt et les épices.",
        "Lancez la cuisson du riz basmati dans 1,5 fois son volume d'eau salée pendant 11 min.",
        "Poêlez les légumes et le poulet mariné 8 à 10 minutes à feu vif.",
        "Servez le poulet doré sur son lit de riz chaud."
      ],
      en: [
        "Dice the chicken and marinate with yogurt and spices.",
        "Cook basmati rice in salted boiling water for 11 minutes.",
        "Sauté vegetables and marinated chicken in an oiled pan for 8-10 minutes.",
        "Serve hot chicken over fluffy basmati rice."
      ],
      ar: [
        "قطع الدجاج إلى مكعبات واخلطها مع الزبادي والبهارات.",
        "اطه أرز البسمتي في ماء مغلي ومملح لمدة 11 دقيقة.",
        "اقل الخضار وقطع الدجاج المتبلة في مقلاة لمدة 8-10 دقائق.",
        "قدم الدجاج المشوي مع الأرز الدافئ."
      ]
    }
  },
  {
    id: "m2",
    mealType: "dinner",
    title: {
      fr: "Saumon Rôti au Four & Légumes de Saison",
      en: "Oven-Baked Salmon with Seasonal Veggies",
      ar: "سلمون مشوي بالفرن مع خضار مشكلة"
    },
    emoji: "🐟",
    prepTime: 10,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["dietBalanced", "dietHalal", "dietGlutenFree", "dietLowCarb"],
    ingredients: [
      { name: { fr: "Pavé de saumon frais", en: "Fresh salmon fillet", ar: "فيليه سلمون طازج" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Brocolis en fleurettes", en: "Broccoli florets", ar: "بروكلي" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Carottes en rondelles", en: "Sliced carrots", ar: "جزر شرائح" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Huile d'olive & Jus de citron", en: "Olive oil & lemon juice", ar: "زيت زيتون وعصير ليمون" }, quantity: 1.5, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Ail & Aneth", en: "Garlic and fresh dill", ar: "ثوم وشبت" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 200°C.",
        "Disposez les légumes et le saumon sur une plaque de cuisson avec papier sulfurisé.",
        "Arrosez d'huile d'olive, citron, ail émincé, sel et poivre.",
        "Enfournez pour 15 à 18 minutes jusqu'à ce que le saumon soit fondant."
      ],
      en: [
        "Preheat oven to 200°C (400°F).",
        "Place salmon and vegetables on a parchment-lined baking sheet.",
        "Drizzle with olive oil, lemon juice, minced garlic, salt, and pepper.",
        "Bake for 15-18 minutes until the salmon flakes easily."
      ],
      ar: [
        "سخن الفرن على حرارة 200 درجة مئوية.",
        "ضع السلمون والخضار على صينية فرن مغطاة بورق الخبز.",
        "رش زيت الزيتون وعصير الليمون والثوم المفروم والملح والفلفل.",
        "اخبز لمدة 15-18 دقيقة حتى ينضج السلمون تماماً."
      ]
    }
  },
  {
    id: "m3",
    mealType: "lunch",
    title: {
      fr: "Chakchouka Traditionnelle aux Œufs",
      en: "Traditional Shakshuka with Poached Eggs",
      ar: "شكشوكة مغاربية بالبيض والطماطم"
    },
    emoji: "🍳",
    prepTime: 8,
    cookTime: 14,
    difficulty: "easy",
    caloriesPerPerson: 380,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietBudget", "dietQuick"],
    ingredients: [
      { name: { fr: "Œufs", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pièces", dept: "deptDairy" },
      { name: { fr: "Tomates concassées en boîte", en: "Canned crushed tomatoes", ar: "طماطم معلبة مهروسة" }, quantity: 150, unit: "g", dept: "deptPantry" },
      { name: { fr: "Poivron rouge ou vert", en: "Bell pepper", ar: "فلفل حلو" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
      { name: { fr: "Oignon & Gousses d'ail", en: "Onion & garlic cloves", ar: "بصل وثوم" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
      { name: { fr: "Cumin, Paprika doux & Huile d'olive", en: "Cumin, paprika, olive oil", ar: "كمون، فلفل أحمر وزيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites revenir l'oignon et le poivron émincés dans un filet d'huile d'olive pendant 5 min.",
        "Ajoutez l'ail, le cumin, le paprika puis la sauce tomate. Laissez mijoter 5 min.",
        "Creusez 2 petits puits dans la sauce et cassez-y les œufs.",
        "Couvrez et laissez cuire 4-5 minutes jusqu'à ce que les blancs soient pris mais les jaunes coulants."
      ],
      en: [
        "Sauté diced onion and bell pepper in olive oil for 5 minutes.",
        "Add garlic, cumin, paprika, and crushed tomatoes. Simmer for 5 minutes.",
        "Make small wells in the sauce and crack the eggs in.",
        "Cover and cook 4-5 mins until egg whites are set and yolks remain runny."
      ],
      ar: [
        "شوح البصل والفلفل المقطع في زيت الزيتون لمدة 5 دقائق.",
        "أضف الثوم والكمون والبابريكا وصلصة الطماطم واتركها تغلي 5 دقائق.",
        "اصنع فتحات صغيرة في الصلصة واكسر البيض فيها.",
        "غط المقلاة واتركها 4-5 دقائق حتى ينضج بياض البيض ويبقى الصفار سائلاً."
      ]
    }
  },
  {
    id: "m4",
    mealType: "dinner",
    title: {
      fr: "Pâtes Complètes au Pesto Maison & Tomates Cerises",
      en: "Whole Wheat Pasta with Pesto & Cherry Tomatoes",
      ar: "مكرونة القمح الكامل مع البيستو والطماطم"
    },
    emoji: "🍝",
    prepTime: 5,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietBudget", "dietQuick"],
    ingredients: [
      { name: { fr: "Pâtes complètes (Penne ou Fusilli)", en: "Whole wheat pasta", ar: "مكرونة قمح كامل" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Pesto vert (basilic ou roquette)", en: "Pesto sauce", ar: "صلصة بيستو ريحان" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Tomates cerises", en: "Cherry tomatoes", ar: "طماطم كرزية" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Parmesan ou Mozzarella râpée", en: "Parmesan or mozzarella", ar: "جبن بارميزان أو موزاريلا" }, quantity: 20, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites cuire les pâtes dans un grand volume d'eau bouillante salée selon le temps indiqué (environ 9 min).",
        "Coupez les tomates cerises en deux et poêlez-les 2 min avec un filet d'huile.",
        "Égouttez les pâtes en gardant 2 cuillères d'eau de cuisson.",
        "Mélangez les pâtes chaudes avec le pesto, les tomates cerises et le fromage râpé."
      ],
      en: [
        "Boil pasta in salted water according to package directions (approx. 9 mins).",
        "Halve cherry tomatoes and lightly sauté for 2 mins in olive oil.",
        "Drain pasta, reserving 2 tbsp of cooking water.",
        "Toss hot pasta with pesto, cherry tomatoes, and grated cheese."
      ],
      ar: [
        "اسلق المكرونة في ماء مغلي ومملح لمدة 9 دقائق.",
        "اقطع الطماطم الكرزية لنصفين وشوحها في زيت الزيتون لمدة دقيقتين.",
        "صف المكرونة مع الاحتفاظ بملعقتين من ماء السلق.",
        "اخلط المكرونة الدافئة مع صلصة البيستو والطماطم والجبن المبشور."
      ]
    }
  },
  {
    id: "m5",
    mealType: "lunch",
    title: {
      fr: "Curry Végétal Pois Chiches & Épinards",
      en: "Chickpea & Spinach Coconut Curry",
      ar: "كاري الحمص والسبانخ بحليب جوز الهند"
    },
    emoji: "🍛",
    prepTime: 8,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietHalal", "dietBudget"],
    ingredients: [
      { name: { fr: "Pois chiches cuits en boîte", en: "Cooked chickpeas (canned)", ar: "حمص مسلوق معلب" }, quantity: 150, unit: "g", dept: "deptPantry" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 100, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Jeunes pousses d'épinards", en: "Fresh baby spinach", ar: "سبانخ طازجة" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Pâte de curry doux & Curcuma", en: "Mild curry paste & turmeric", ar: "معجون كاري وكركم" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz ou Pain Naan pour accompagner", en: "Rice or Naan bread", ar: "أرز أو خبز نان" }, quantity: 60, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir la pâte de curry dans une poêle 1 minute pour libérer les arômes.",
        "Ajoutez les pois chiches rincés et versez le lait de coco.",
        "Laissez mijoter à feu moyen 7 minutes.",
        "Ajoutez les épinards à la dernière minute pour qu'ils tombent doucement. Servez avec du riz."
      ],
      en: [
        "Sauté curry paste in a skillet for 1 min until fragrant.",
        "Add drained chickpeas and pour in coconut milk.",
        "Simmer over medium heat for 7 minutes.",
        "Stir in fresh spinach for the final minute until wilted. Serve with rice."
      ],
      ar: [
        "شوح معجون الكاري في مقلاة لمدة دقيقة واحدة لتفوح رائحته.",
        "أضف الحمص المصفى واسكب حليب جوز الهند.",
        "اتركه يغلي على نار متوسطة لمدة 7 دقائق.",
        "أضف السبانخ في الدقيقة الأخيرة حتى تذبل قليلاً. قدمه مع الأرز."
      ]
    }
  },
  {
    id: "m6",
    mealType: "dinner",
    title: {
      fr: "Gratin Gourmand Courgettes & Bœuf Haché",
      en: "Zucchini & Minced Beef Casserole",
      ar: "صينية الكوسة واللحم المفروم بالفرن"
    },
    emoji: "🥘",
    prepTime: 12,
    cookTime: 20,
    difficulty: "medium",
    caloriesPerPerson: 490,
    tags: ["dietBalanced", "dietHalal", "dietGlutenFree", "dietLowCarb"],
    ingredients: [
      { name: { fr: "Bœuf haché 5% ou 15%", en: "Lean minced beef", ar: "لحم مفروم" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Courgettes fraîches", en: "Fresh zucchinis", ar: "كوسة طازجة" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Coulis de tomate", en: "Tomato purée", ar: "صلصة طماطم" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Fromage râpé (Emmental ou Cheddar)", en: "Grated cheese", ar: "جبن مبشور" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Herbes de Provence & Ail", en: "Italian herbs & garlic", ar: "أعشاب وثوم" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 190°C.",
        "Faites revenir le bœuf haché avec l'ail et les herbes pendant 5 min, puis incorporez le coulis de tomate.",
        "Coupez les courgettes en fines rondelles.",
        "Dans un plat à gratin, alternez couches de courgettes et sauce bœuf-tomate.",
        "Saupoudrez de fromage râpé et enfournez pour 20 minutes jusqu'à gratiner."
      ],
      en: [
        "Preheat oven to 190°C (375°F).",
        "Brown the minced beef with garlic and herbs for 5 mins, then stir in tomato purée.",
        "Slice zucchinis thinly.",
        "In a baking dish, layer zucchini slices and minced beef sauce.",
        "Top with grated cheese and bake for 20 minutes until bubbling and golden."
      ],
      ar: [
        "سخن الفرن على حرارة 190 درجة مئوية.",
        "حمر اللحم المفروم مع الثوم والأعشاب لمدة 5 دقائق ثم أضف صلصة الطماطم.",
        "قطع الكوسة إلى شرائح رقيقة.",
        "في صينية فرن، رتب طبقات من الكوسة وصلصة اللحم بالطماطم.",
        "رش الجبن المبشور واخبز لمدة 20 دقيقة حتى يتحمر الوجه."
      ]
    }
  },

  // --- GOÛTERS & SNACKS (SNACKS) ---
  {
    id: "s1",
    mealType: "snack",
    title: {
      fr: "Energy Balls Dattes & Amandes",
      en: "Almond & Date Energy Balls",
      ar: "كرات الطاقة بالتمر واللوز"
    },
    emoji: "⚡",
    prepTime: 8,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 180,
    tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Dattes Medjool dénoyautées", en: "Pitted dates", ar: "تمر منزوع النوى" }, quantity: 40, unit: "g", dept: "deptProduce" },
      { name: { fr: "Poudre d'amandes", en: "Almond flour / ground almonds", ar: "لوز مطحون" }, quantity: 25, unit: "g", dept: "deptPantry" },
      { name: { fr: "Cacao non sucré", en: "Unsweetened cocoa powder", ar: "كاكاو خام" }, quantity: 5, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Mixez les dattes avec la poudre d'amandes et le cacao jusqu'à obtenir une pâte collante.",
        "Formez 3 petites boules entre la paume de vos mains.",
        "Dégustez immédiatement ou conservez au frais."
      ],
      en: [
        "Blend dates with ground almonds and cocoa powder into a thick paste.",
        "Roll into 3 small bite-sized balls.",
        "Enjoy immediately or store in the fridge."
      ],
      ar: [
        "اطحن التمر مع اللوز المطحون والكاكاو حتى يتكون عجين متماسك.",
        "شكله على هيئة 3 كرات صغيرة بين راحتي يديك.",
        "تناولها فوراً أو احفظها في الثلاجة."
      ]
    }
  }
];

