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
    },
    thermomixInstructions: {
      fr: [
        "Mettre 1000g d'eau dans le bol. Insérer le panier de cuisson avec le riz : 20 min / Varoma / Vit. 2.",
        "Disposer le poulet mariné et les courgettes dans le plateau du Varoma par-dessus.",
        "À la sonnerie, retirer le Varoma, égoutter le riz et servir chaud."
      ],
      en: [
        "Add 1000g water to the bowl. Insert simmering basket with rice: 20 min / Varoma / Speed 2.",
        "Place marinated chicken and sliced zucchini in the Varoma tray on top.",
        "Serve juicy steamed chicken and zucchini over hot fluffy rice."
      ],
      ar: [
        "ضع 1000 غرام ماء في الوعاء وسلة الأرز : 20 دقيقة / فاروما / سرعة 2.",
        "ضع الدجاج المتبل والكوسة في صينية الفاروما بالأعلى.",
        "قدم الدجاج الطري مع الأرز البسمتي الساخن."
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
    },
    thermomixInstructions: {
      fr: [
        "Mettre 500g d'eau dans le bol. Disposer les carottes et brocolis dans le bol du Varoma : 15 min / Varoma / Vit. 1.",
        "Ajouter le plateau Varoma avec les pavés de saumon assaisonnés : prolonger de 10 min / Varoma / Vit. 1.",
        "Napper le saumon et légumes d'un filet de citron et aneth frais."
      ],
      en: [
        "Pour 500g water into bowl. Place broccoli and carrots in Varoma dish: 15 min / Varoma / Speed 1.",
        "Insert Varoma tray with salmon fillets: steam 10 min / Varoma / Speed 1.",
        "Serve steamed tender salmon with fresh dill and lemon."
      ],
      ar: [
        "ضع 500 غرام ماء في الوعاء. ضع الخضار في الفاروما : 15 دقيقة / فاروما / سرعة 1.",
        "أضف صينية الفاروما مع السلمون : اطه 10 دقائق إضافية / فاروما / سرعة 1.",
        "قدم السلمون المطهو على البخار مع الليمون والشبت."
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
    },
    thermomixInstructions: {
      fr: [
        "Mettre l'oignon, l'ail et le poivron dans le bol : hacher 5 sec / Vit. 5. Racler les parois.",
        "Ajouter l'huile d'olive : rissoler 4 min / 120°C / Vit. 1 🔄.",
        "Ajouter les tomates, le cumin et le paprika : cuire 10 min / 100°C / Vit. Cuillère 🔄.",
        "Verser la sauce chaude dans un plat ou poêle et y casser les œufs 3 min pour garder le jaune coulant."
      ],
      en: [
        "Add onion, garlic and bell pepper: chop 5 sec / Speed 5. Scrape down.",
        "Add olive oil: sauté 4 min / 120°C / Speed 1 🔄.",
        "Add tomatoes, cumin, paprika: cook 10 min / 100°C / Spoon Speed 🔄.",
        "Transfer hot sauce to skillet and crack eggs on top for 3 mins."
      ],
      ar: [
        "ضع البصل والثوم والفلفل في الوعاء : افرم 5 ثوانٍ / سرعة 5.",
        "أضف زيت الزيتون : شوح 4 دقائق / 120 مئوية / سرعة 1 🔄.",
        "أضف الطماطم والبهارات : اطه 10 دقائق / 100 مئوية / سرعة ملعقة 🔄.",
        "اسكب الصلصة في مقلاة واكسر البيض فوقها لمدة 3 دقائق."
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
  },

  // --- NOUVEAUX PLATS DU MONDE & VARIÉTÉ MAXIMALE ---
  {
    id: "m7",
    mealType: "lunch",
    title: {
      fr: "Tajine de Poulet aux Olives & Citrons Confits",
      en: "Chicken Tagine with Olives & Preserved Lemon",
      ar: "طاجين دجاج بالزيتون والليمون المخلل"
    },
    emoji: "🥘",
    prepTime: 15,
    cookTime: 35,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["oriental", "maghreb", "dietBalanced", "dietHalal", "dietGlutenFree"],
    ingredients: [
      { name: { fr: "Cuisses ou filets de poulet", en: "Chicken pieces", ar: "قطع دجاج" }, quantity: 250, unit: "g", dept: "deptMeat" },
      { name: { fr: "Oignons émincés", en: "Sliced onions", ar: "بصل" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Olives vertes dénoyautées", en: "Green pitted olives", ar: "زيتون أخضر" }, quantity: 50, unit: "g", dept: "deptPantry" },
      { name: { fr: "Citron confit", en: "Preserved lemon", ar: "ليمون مخلل" }, quantity: 0.5, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Gingembre, Curcuma & Coriandre", en: "Ginger, turmeric, cilantro", ar: "زنجبيل، كركم وكزبرة" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Huile d'olive", en: "Olive oil", ar: "زيت زيتون" }, quantity: 1.5, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer le poulet avec l'oignon et les épices dans l'huile d'olive pendant 8 min.",
        "Ajoutez un verre d'eau, couvrez et laissez mijoter à feu doux 25 minutes.",
        "Ajoutez les olives vertes et les écorces de citron confit, laissez réduire la sauce 5 min.",
        "Servez bien chaud avec du pain frais ou de la semoule."
      ],
      en: [
        "Brown chicken with onions and spices in olive oil for 8 mins.",
        "Add a cup of water, cover and simmer on low for 25 mins.",
        "Add olives and preserved lemon slices, reduce sauce for 5 mins.",
        "Serve hot with fresh bread or couscous."
      ],
      ar: [
        "حمر الدجاج مع البصل والبهارات في زيت الزيتون لمدة 8 دقائق.",
        "أضف كوب ماء وغط الطاجين واتركه ينضج على نار هادئة 25 دقيقة.",
        "أضف الزيتون وقطع الليمون المخلل ودع الصلصة تتسبك 5 دقائق.",
        "قدمه ساخناً مع الخبز الطازج."
      ]
    },
    thermomixInstructions: {
      fr: [
        "Mettre l'oignon et 2 gousses d'ail : 5 sec / Vit. 5. Racler.",
        "Ajouter l'huile d'olive et les épices : 3 min / 120°C / Vit. 1.",
        "Insérer le fouet, ajouter le poulet et 150g d'eau : 25 min / 100°C / Vit. Cuillère 🔄.",
        "Ajouter les olives et le citron confit : 5 min / Varoma / Vit. Cuillère 🔄."
      ]
    }
  },
  {
    id: "m8",
    mealType: "dinner",
    title: {
      fr: "Pad Thaï Express aux Crevettes & Cacahuètes",
      en: "Shrimp Pad Thai with Crushed Peanuts",
      ar: "باد تاي الجمبري مع الفول السوداني"
    },
    emoji: "🥢",
    prepTime: 12,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 480,
    tags: ["asian", "wok", "dietBalanced", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Crevettes décortiquées", en: "Peeled shrimps", ar: "جمبري مقشر" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Nouilles de riz", en: "Rice noodles", ar: "نودلز الأرز" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Œuf", en: "Egg", ar: "بيض" }, quantity: 1, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Pousses de soja ou carotte râpée", en: "Bean sprouts or carrot", ar: "جزر أو صويا" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja & Jus de citron vert", en: "Soy sauce & lime juice", ar: "صلصة صويا وليمون" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Cacahuètes concassées", en: "Crushed peanuts", ar: "فول سوداني مجروش" }, quantity: 15, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Plongez les nouilles de riz 6 min dans de l'eau bouillante puis égouttez.",
        "Dans un wok très chaud avec un filet d'huile, faites sauter les crevettes 2 min puis poussez-les sur le côté.",
        "Cassez l'œuf et brouillez-le rapidement, ajoutez les nouilles, la sauce soja et le jus de citron vert.",
        "Mélangez le tout à feu vif 2 min et parsemez de cacahuètes concassées avant de servir."
      ],
      en: [
        "Soak rice noodles in boiling water for 6 mins and drain.",
        "Sear shrimps in a hot oiled wok for 2 mins, push aside.",
        "Scramble egg in wok, add noodles, soy sauce, and lime juice.",
        "Toss on high heat for 2 mins and garnish with crushed peanuts."
      ],
      ar: [
        "انقع نودلز الأرز في ماء مغلي لمدة 6 دقائق ثم صفها.",
        "شوح الجمبري في مقلاة ووك ساخنة لمدة دقيقتين.",
        "أضف البيض وقلبه ثم أضف النودلز وصلصة الصويا والليمون.",
        "قلب المكونات على نار عالية دقيقتين وزين بالفول السوداني."
      ]
    }
  },
  {
    id: "m9",
    mealType: "dinner",
    title: {
      fr: "Risotto Onctueux aux Champignons & Parmesan",
      en: "Creamy Mushroom & Parmesan Risotto",
      ar: "ريزوتو كريمي بالفطر والبارميزان"
    },
    emoji: "🍄",
    prepTime: 10,
    cookTime: 22,
    difficulty: "medium",
    caloriesPerPerson: 490,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietGlutenFree"],
    ingredients: [
      { name: { fr: "Riz Arborio ou Carnaroli", en: "Arborio risotto rice", ar: "أرز ريزوتو" }, quantity: 120, unit: "g", dept: "deptPantry" },
      { name: { fr: "Champignons de Paris", en: "Button mushrooms", ar: "فطر طازج" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Échalote", en: "Shallot", ar: "بصل صغير" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Bouillon de légumes chaud", en: "Hot vegetable broth", ar: "مرق خضار" }, quantity: 400, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Parmesan râpé", en: "Grated parmesan", ar: "بارميزان" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Beurre ou huile d'olive", en: "Butter or olive oil", ar: "زبدة أو زيت" }, quantity: 15, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites revenir l'échalote et les champignons émincés dans une sauteuse 5 min.",
        "Ajoutez le riz et faites-le nacrer 2 min jusqu'à ce qu'il devienne translucide.",
        "Versez le bouillon chaud louche après louche en remuant constamment pendant 18 min.",
        "Hors du feu, incorporez le beurre et le parmesan pour une texture ultra crémeuse."
      ],
      en: [
        "Sauté shallot and sliced mushrooms in a pan for 5 mins.",
        "Add arborio rice and toast for 2 mins until translucent.",
        "Add hot broth ladle by ladle while stirring constantly for 18 mins.",
        "Remove from heat, fold in butter and parmesan until creamy."
      ],
      ar: [
        "شوح البصل والفطر في مقلاة لمدة 5 دقائق.",
        "أضف أرز الريزوتو وحمصه دقيقتين حتى يصبح شفافاً.",
        "أضف المرق الساخن تدريجياً مع التحريك المستمر لمدة 18 دقيقة.",
        "ارفع عن النار وأضف الزبدة والبارميزان للحصول على قوام كريمي."
      ]
    },
    thermomixInstructions: {
      fr: [
        "Mettre l'échalote dans le bol : 5 sec / Vit. 5. Racler.",
        "Ajouter 20g de beurre et les champignons : 3 min / 120°C / Vit. 1 🔄.",
        "Ajouter le riz à risotto : nacrer 3 min / 120°C / Vit. 1 🔄 sans gobelet.",
        "Ajouter 400g de bouillon chaud : 16 min / 100°C / Vit. Cuillère 🔄.",
        "Ajouter le parmesan à la fin et laisser reposer 2 min dans le bol fermé."
      ]
    }
  },
  {
    id: "m10",
    mealType: "lunch",
    title: {
      fr: "Fajitas de Poulet Épicé & Poivrons Fondants",
      en: "Spiced Chicken & Bell Pepper Fajitas",
      ar: "فاهيتا الدجاج والفلفل الملون"
    },
    emoji: "🌯",
    prepTime: 10,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 530,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietKids", "dietQuick"],
    ingredients: [
      { name: { fr: "Filets de poulet", en: "Chicken strips", ar: "شرائح دجاج" }, quantity: 200, unit: "g", dept: "deptMeat" },
      { name: { fr: "Galettes tortillas de blé ou maïs", en: "Tortilla wraps", ar: "تورتيلا" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Poivron rouge et vert", en: "Bell peppers", ar: "فلفل حلو" }, quantity: 1.5, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Épices mexicaines (paprika, cumin, origan)", en: "Fajita spice mix", ar: "بهارات فاهيتا" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Crème fraîche ou Guacamole", en: "Sour cream or guacamole", ar: "كريمة أو جواكامولي" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Émincez le poulet et les poivrons en fines lanières.",
        "Dans une grande poêle bien chaude avec de l'huile, faites sauter le poulet et les poivrons avec les épices pendant 10 min à feu vif.",
        "Faites tiédir les galettes tortillas 30 secondes au micro-ondes ou à la poêle.",
        "Garnissez les galettes avec le poulet doré, les poivrons et une touche de crème fraîche."
      ],
      en: [
        "Slice chicken and bell peppers into thin strips.",
        "Sear in a hot oiled skillet with fajita spices for 10 mins over high heat.",
        "Warm tortillas for 30 seconds.",
        "Fill wraps with juicy chicken, peppers, and sour cream."
      ],
      ar: [
        "قطع الدجاج والفلفل إلى شرائح طولية رفيعة.",
        "شوح الدجاج والفلفل مع بهارات الفاهيتا على نار عالية لمدة 10 دقائق.",
        "سخن خبز التورتيلا 30 ثانية.",
        "احش التورتيلا بالدجاج والفلفل المشوي وقليل من الكريمة."
      ]
    }
  },
  {
    id: "m11",
    mealType: "dinner",
    title: {
      fr: "Cabillaud Rôti au Citron & Purée de Patates Douces",
      en: "Lemon Baked Cod with Sweet Potato Mash",
      ar: "سمك القد المشوي مع بيوريه البطاطا الحلوة"
    },
    emoji: "🐟",
    prepTime: 12,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["dietBalanced", "dietHalal", "dietGlutenFree", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Dos de cabillaud frais", en: "Fresh cod fillet", ar: "فيليه سمك قد" }, quantity: 200, unit: "g", dept: "deptMeat" },
      { name: { fr: "Patates douces", en: "Sweet potatoes", ar: "بطاطا حلوة" }, quantity: 250, unit: "g", dept: "deptProduce" },
      { name: { fr: "Jus de citron & Huile d'olive", en: "Lemon juice & olive oil", ar: "ليمون وزيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Lait ou crème liquide", en: "Milk or cream", ar: "حليب أو كريمة" }, quantity: 30, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Ciboulette fraîche", en: "Fresh chives", ar: "ثوم معمر" }, quantity: 1, unit: "c.à.c", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Épluchez et coupez les patates douces en cubes, faites-les cuire 15 min dans de l'eau bouillante salée.",
        "Déposez le cabillaud dans un plat au four, arrosez de citron, huile d'olive, sel et poivre. Enfournez 15 min à 190°C.",
        "Écrasez les patates douces avec un peu de lait, sel, poivre et ciboulette pour obtenir une purée onctueuse.",
        "Servez le poisson nacré sur le lit de purée douce."
      ],
      en: [
        "Boil diced sweet potatoes for 15 mins until tender.",
        "Bake cod with lemon and olive oil at 190°C (375°F) for 15 mins.",
        "Mash sweet potatoes with a dash of milk, salt, and chives.",
        "Serve tender baked cod over sweet potato mash."
      ],
      ar: [
        "اسلق مكعبات البطاطا الحلوة لمدة 15 دقيقة حتى تنضج.",
        "اخبز سمك القد مع الليمون وزيت الزيتون في الفرن على 190 مئوية لمدة 15 دقيقة.",
        "اهرس البطاطا الحلوة مع قليل من الحليب والملح والثوم المعمر.",
        "قدم السمك الطري فوق بيوريه البطاطا الحلوة."
      ]
    },
    thermomixInstructions: {
      fr: [
        "Mettre 500g d'eau dans le bol. Mettre les patates douces en dés dans le panier cuisson : 15 min / Varoma / Vit. 1.",
        "Placer le cabillaud assaisonné dans le plateau Varoma au-dessus : prolonger de 10 min / Varoma / Vit. 1.",
        "Vider l'eau, mixer les patates douces avec 30g de lait et 10g de beurre : 30 sec / Vit. 4."
      ]
    }
  },
  {
    id: "m12",
    mealType: "lunch",
    title: {
      fr: "Keftas de Bœuf aux Épices Douces & Semoule Fine",
      en: "Spiced Beef Keftas with Fluffy Couscous",
      ar: "كفتة اللحم المشوية مع الكسكسي"
    },
    emoji: "🍢",
    prepTime: 12,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 540,
    tags: ["oriental", "maghreb", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Bœuf haché frais 15%", en: "Minced beef", ar: "لحم مفروم" }, quantity: 200, unit: "g", dept: "deptMeat" },
      { name: { fr: "Graine de couscous moyenne", en: "Couscous semolina", ar: "سميد كسكسي" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Oignon & Menthe fraîche", en: "Onion & fresh mint", ar: "بصل ونعناع طازج" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Cumin, Paprika & Coriandre", en: "Cumin, paprika, coriander", ar: "كمون، بابريكا وكزبرة" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Tomates fraîches ou concassées", en: "Tomatoes", ar: "طماطم" }, quantity: 1, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Mélangez le bœuf haché avec l'oignon haché, la menthe et les épices. Façonnez de petites boulettes allongées.",
        "Faites cuire la semoule en versant le même volume d'eau bouillante salée, couvrez 5 min puis égrainez à la fourchette avec une noisette de beurre.",
        "Faites griller les keftas dans une poêle chaude 6 à 8 min en les retournant régulièrement.",
        "Servez les keftas bien dorées avec la semoule et des quartiers de tomates."
      ],
      en: [
        "Mix minced beef with onion, herbs and spices. Shape into small patties.",
        "Steam couscous with equal volume of boiling water for 5 mins, fluff with butter.",
        "Pan-sear keftas for 6-8 mins until browned on all sides.",
        "Serve hot keftas over fluffy couscous."
      ],
      ar: [
        "اخلط اللحم المفروم مع البصل المفروم والنعناع والبهارات وشكله على هيئة أصابع.",
        "انقع الكسكسي في ماء مغلي مملح 5 دقائق ثم فككه بالشوكة مع قليل من الزبدة.",
        "اشو الكفتة في مقلاة لمدة 6-8 دقائق حتى تنضج وتتحمر.",
        "قدم الكفتة الساخنة مع الكسكسي والطماطم."
      ]
    }
  },
  {
    id: "m13",
    mealType: "dinner",
    title: {
      fr: "Wok de Bœuf aux Légumes Croquants & Sésame",
      en: "Crispy Beef & Veggie Stir-Fry with Sesame",
      ar: "ستير فراي اللحم البقري بالخضار والسمسم"
    },
    emoji: "🥢",
    prepTime: 10,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["asian", "wok", "dietBalanced", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Bifteck ou bavette de bœuf", en: "Beef steak strips", ar: "شرائح لحم بقري" }, quantity: 180, unit: "g", dept: "deptMeat" },
      { name: { fr: "Poivron et brocolis", en: "Bell pepper and broccoli", ar: "فلفل وبروكلي" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja & Huile de sésame", en: "Soy sauce & sesame oil", ar: "صلصة صويا وزيت سمسم" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Riz thaï ou nouilles", en: "Thai rice or noodles", ar: "أرز أو نودلز" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Graines de sésame", en: "Sesame seeds", ar: "سمسم" }, quantity: 10, unit: "g", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Taillez le bœuf en très fines lamelles.",
        "Faites sauter les légumes émincés 4 min à feu vif dans un wok avec un filet d'huile.",
        "Ajoutez les lamelles de bœuf et la sauce soja, cuisez 2-3 min sans trop cuire la viande.",
        "Saupoudrez de graines de sésame et servez aussitôt avec du riz chaud."
      ],
      en: [
        "Slice beef into thin strips.",
        "Stir-fry vegetables on high heat in a wok for 4 mins.",
        "Add beef strips and soy sauce, toss for 2-3 mins.",
        "Garnish with sesame seeds and serve with hot rice."
      ],
      ar: [
        "قطع اللحم إلى شرائح رقيقة جداً.",
        "شوح الخضار في مقلاة ووك على نار عالية لمدة 4 دقائق.",
        "أضف شرائح اللحم وصلصة الصويا وقلب لمدة دقيقتين إلى 3 دقائق.",
        "رش بذور السمسم وقدمه فوراً مع الأرز الدافئ."
      ]
    }
  },
  {
    id: "m14",
    mealType: "lunch",
    title: {
      fr: "Dahl Crémeux de Lentilles Corail au Lait de Coco",
      en: "Creamy Red Lentil & Coconut Dahl",
      ar: "دال العدس الأحمر الكريمي بحليب جوز الهند"
    },
    emoji: "🍲",
    prepTime: 8,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["indian", "dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietBudget"],
    ingredients: [
      { name: { fr: "Lentilles corail", en: "Red lentils", ar: "عدس أحمر" }, quantity: 120, unit: "g", dept: "deptPantry" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 120, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Tomates concassées", en: "Canned crushed tomatoes", ar: "طماطم معلبة" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Curcuma, Cumin & Garam Masala", en: "Turmeric, cumin, garam masala", ar: "كركم وكمون وبهارات هندية" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Ail & Oignon", en: "Garlic & onion", ar: "ثوم وبصل" }, quantity: 1, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites suer l'oignon et l'ail avec les épices dans une casserole 3 min.",
        "Ajoutez les lentilles corail rincées, les tomates concassées et 250ml d'eau.",
        "Laissez mijoter 15 minutes jusqu'à ce que les lentilles soient tendres et fondantes.",
        "Incorporez le lait de coco en fin de cuisson pour lier le dahl. Servez avec du riz basmati."
      ],
      en: [
        "Sauté onion, garlic, and spices in a pot for 3 mins.",
        "Add rinsed red lentils, crushed tomatoes, and 1 cup water.",
        "Simmer for 15 mins until lentils are soft.",
        "Stir in coconut milk until creamy. Serve with basmati rice."
      ],
      ar: [
        "شوح البصل والثوم مع التوابل في قدر لمدة 3 دقائق.",
        "أضف العدس المغسول والطماطم المهروسة وكوب ماء.",
        "اتركه ينضج 15 دقيقة حتى يلين العدس تماماً.",
        "أضف حليب جوز الهند وقلب جيداً. قدمه مع أرز البسمتي."
      ]
    },
    thermomixInstructions: {
      fr: [
        "Mettre l'oignon et l'ail : 5 sec / Vit. 5. Racler.",
        "Ajouter 15g d'huile et les épices : 3 min / 120°C / Vit. 1.",
        "Ajouter les lentilles rincées, les tomates et 250g d'eau : 15 min / 100°C / Vit. 1 🔄.",
        "Ajouter le lait de coco : 2 min / 90°C / Vit. 1 🔄."
      ]
    }
  },
  {
    id: "m15",
    mealType: "lunch",
    title: {
      fr: "Burger Gourmet Maison au Bœuf & Frites au Four",
      en: "Homemade Gourmet Beef Burger with Baked Wedges",
      ar: "برغر اللحم المنزلي مع بطاطس بالفرن"
    },
    emoji: "🍔",
    prepTime: 15,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 580,
    tags: ["streetfood", "dietBalanced", "dietHalal", "dietKids"],
    ingredients: [
      { name: { fr: "Steak haché pur bœuf", en: "Beef burger patty", ar: "شريحة برغر بقري" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Pain burger brioché ou complet", en: "Burger bun", ar: "خبز برغر" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Pommes de terre pour frites", en: "Potatoes for wedges", ar: "بطاطس للفرن" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Fromage Cheddar ou Comté", en: "Cheddar slice", ar: "جبن شيدر" }, quantity: 1, unit: "tranche", dept: "deptDairy" },
      { name: { fr: "Feuille de salade & Tomate", en: "Lettuce & tomato slice", ar: "خس وطماطم" }, quantity: 1, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Coupez les pommes de terre en frites, mélangez avec 1 c.à.s d'huile, paprika et sel, enfournez à 200°C pendant 20 min.",
        "Faites griller le steak haché 3-4 min par face, déposez la tranche de fromage dessus à la fin pour la faire fondre.",
        "Toastez légèrement le pain burger à la poêle.",
        "Montez le burger avec salade, tomate, steak au fromage fondu et servez avec les frites dorées."
      ],
      en: [
        "Cut potatoes into wedges, toss with olive oil and paprika, bake at 200°C (400°F) for 20 mins.",
        "Pan-sear burger patty for 3-4 mins per side, melt cheddar slice on top.",
        "Toast burger bun lightly.",
        "Assemble burger with lettuce, tomato, cheesy patty and crispy wedges."
      ],
      ar: [
        "قطع البطاطس إلى أصابع واخلطها بزيت الزيتون والبابريكا واخبزها بالفرن 20 دقيقة.",
        "اشو شريحة البرغر 3-4 دقائق لكل جانب وضع الجبن فوقها ليذوب.",
        "حمص خبز البرغر خفيفاً.",
        "رتب البرغر بالخس والطماطم وشريحة اللحم والجبن وقدمه مع البطاطس."
      ]
    }
  },

  // --- NOUVEAUX PETITS DÉJEUNERS ---
  {
    id: "b4",
    mealType: "breakfast",
    title: {
      fr: "Omelette Moelleuse Ciboulette & Fromage Frais",
      en: "Fluffy Herb & Cream Cheese Omelet",
      ar: "أومليت بالأعشاب والجبن الطري"
    },
    emoji: "🍳",
    prepTime: 5,
    cookTime: 5,
    difficulty: "easy",
    caloriesPerPerson: 290,
    tags: ["dietBalanced", "dietVegetarian", "dietGlutenFree", "dietHalal", "dietKeto", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Œufs frais", en: "Fresh eggs", ar: "بيض" }, quantity: 2, unit: "pièces", dept: "deptDairy" },
      { name: { fr: "Fromage frais ou feta", en: "Cream cheese or feta", ar: "جبن طري أو فيتا" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Ciboulette ciselée", en: "Fresh chives", ar: "ثوم معمر" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" },
      { name: { fr: "Beurre ou huile d'olive", en: "Butter or olive oil", ar: "زبدة أو زيت" }, quantity: 5, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Battez les œufs en omelette avec sel, poivre et la ciboulette fraîche.",
        "Faites fondre le beurre dans une poêle antiadhésive à feu moyen.",
        "Versez les œufs et laissez cuire 3 min en ramenant les bords vers le centre.",
        "Ajoutez le fromage frais au milieu, pliez l'omelette en deux et servez chaud."
      ],
      en: [
        "Whisk eggs with salt, pepper, and fresh chives.",
        "Melt butter in a skillet over medium heat.",
        "Pour eggs and cook for 3 mins until soft and set.",
        "Add cream cheese to the center, fold and serve warm."
      ],
      ar: [
        "اخفق البيض مع الملح والفلفل والأعشاب.",
        "ذوب الزبدة في مقلاة على نار متوسطة.",
        "اسكب البيض واطهه لمدة 3 دقائق.",
        "أضف الجبن في المنتصف واثن الأومليت وقدمه دافئاً."
      ]
    }
  },
  {
    id: "b5",
    mealType: "breakfast",
    title: {
      fr: "Granola Croustillant, Yaourt Grec & Miel",
      en: "Crunchy Granola with Greek Yogurt & Honey",
      ar: "جرانولا مقرمشة مع الزبادي اليوناني والعسل"
    },
    emoji: "🥣",
    prepTime: 4,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 310,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Yaourt grec nature", en: "Plain Greek yogurt", ar: "زبادي يوناني" }, quantity: 150, unit: "g", dept: "deptDairy" },
      { name: { fr: "Granola aux amandes", en: "Almond granola", ar: "جرانولا باللوز" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Miel liquide", en: "Honey", ar: "عسل" }, quantity: 1, unit: "c.à.c", dept: "deptPantry" },
      { name: { fr: "Fruits frais de saison (pomme, baies)", en: "Fresh fruits", ar: "فواكه طازجة" }, quantity: 50, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Déposez le yaourt grec crémeux dans un bol.",
        "Recouvrez avec le granola croustillant et les dés de fruits frais.",
        "Nappez d'un filet de miel avant de savourer."
      ],
      en: [
        "Spoon Greek yogurt into a bowl.",
        "Top with crunchy granola and fresh fruit pieces.",
        "Drizzle with honey and enjoy."
      ],
      ar: [
        "ضع الزبادي اليوناني في وعاء.",
        "أضف الجرانولا المقرمشة وقطع الفواكه الطازجة.",
        "اسكب خيطاً من العسل واستمتع."
      ]
    }
  },

  // --- NOUVEAUX GOÛTERS / SNACKS ---
  {
    id: "s2",
    mealType: "snack",
    title: {
      fr: "Quartiers de Pomme & Beurre de Cacahuète",
      en: "Apple Slices with Peanut Butter",
      ar: "شرائح التفاح مع زبدة الفول السوداني"
    },
    emoji: "🍏",
    prepTime: 3,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 160,
    tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Pomme croquante", en: "Crisp apple", ar: "تفاحة" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Beurre de cacahuète 100%", en: "Pure peanut butter", ar: "زبدة فول سوداني" }, quantity: 20, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Lavez et coupez la pomme en quartiers réguliers.",
        "Trempez chaque quartier dans une cuillère de beurre de cacahuète crémeux."
      ],
      en: [
        "Slice apple into wedges.",
        "Dip into creamy peanut butter for a quick energizing snack."
      ],
      ar: [
        "قطع التفاحة إلى شرائح متساوية.",
        "اغمسها في زبدة الفول السوداني اللذيذة."
      ]
    }
  },
  {
    id: "s3",
    mealType: "snack",
    title: {
      fr: "Yaourt Grec au Miel & Noix Grillées",
      en: "Greek Yogurt with Honey & Toasted Walnuts",
      ar: "زبادي يوناني مع العسل والجوز المحمص"
    },
    emoji: "🍯",
    prepTime: 3,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 190,
    tags: ["dietBalanced", "dietVegetarian", "dietGlutenFree", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Yaourt grec", en: "Greek yogurt", ar: "زبادي يوناني" }, quantity: 120, unit: "g", dept: "deptDairy" },
      { name: { fr: "Cerneaux de noix", en: "Walnuts", ar: "جوز" }, quantity: 15, unit: "g", dept: "deptPantry" },
      { name: { fr: "Miel", en: "Honey", ar: "عسل" }, quantity: 1, unit: "c.à.c", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Versez le yaourt grec dans une verrine.",
        "Ajoutez les noix légèrement concassées et terminez par un filet de miel."
      ],
      en: [
        "Place Greek yogurt in a bowl.",
        "Top with crushed walnuts and drizzle with honey."
      ],
      ar: [
        "اسكب الزبادي في وعاء.",
        "أضف الجوز المجروش وعسل النحل."
      ]
    }
  }
];

