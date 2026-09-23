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
  },
  {
    id: "m16",
    mealType: "dinner",
    title: {
      fr: "Gnocchis Poêlés Croustillants, Tomates Séchées & Mozzarella",
      en: "Crispy Pan-Fried Gnocchi with Sun-Dried Tomatoes",
      ar: "نيوكي مقلي مقرمش مع الطماطم المجففة والموزاريلا"
    },
    emoji: "🥟",
    prepTime: 5,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Gnocchis à poêler", en: "Pan-fry gnocchi", ar: "نيوكي" }, quantity: 200, unit: "g", dept: "deptPantry" },
      { name: { fr: "Tomates séchées à l'huile", en: "Sun-dried tomatoes", ar: "طماطم مجففة" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Bille de mozzarella", en: "Mozzarella balls", ar: "موزاريلا" }, quantity: 80, unit: "g", dept: "deptDairy" },
      { name: { fr: "Feuilles de basilic frais", en: "Fresh basil", ar: "ريحان طازج" }, quantity: 1, unit: "poignée", dept: "deptProduce" },
      { name: { fr: "Huile d'olive", en: "Olive oil", ar: "زيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Dans une grande poêle avec un filet d'huile d'olive, faites dorer les gnocchis à feu moyen pendant 6 à 8 min jusqu'à ce qu'ils soient bien croustillants.",
        "Coupez les tomates séchées en lamelles et ajoutez-les aux gnocchis chauds.",
        "Ajoutez les billes de mozzarella coupées en deux hors du feu pour qu'elles fondent doucement.",
        "Parsemez de basilic frais et servez sans attendre."
      ],
      en: [
        "Pan-fry gnocchi in olive oil over medium heat for 6-8 mins until golden and crispy.",
        "Add sliced sun-dried tomatoes.",
        "Remove from heat and toss in halved mozzarella balls to melt gently.",
        "Garnish with fresh basil and serve immediately."
      ],
      ar: [
        "حمر النيوكي في زيت الزيتون لمدة 6-8 دقائق حتى يصبح ذهبياً ومقرمشاً.",
        "أضف شرائح الطماطم المجففة.",
        "أضف كرات الموزاريلا المقطعة لتبدأ بالذوبان.",
        "زين بالريحان الطازج وقدمه فوراً."
      ]
    }
  },
  {
    id: "m17",
    mealType: "lunch",
    title: {
      fr: "Couscous aux Légumes Fondants & Boulettes Épicées",
      en: "Couscous with Tender Vegetables & Meatballs",
      ar: "كسكسي بالخضار وكرات اللحم المتبلة"
    },
    emoji: "🍲",
    prepTime: 15,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 550,
    tags: ["oriental", "maghreb", "dietBalanced", "dietHalal"],
    ingredients: [
      { name: { fr: "Semoule de couscous", en: "Couscous semolina", ar: "سميد كسكسي" }, quantity: 120, unit: "g", dept: "deptPantry" },
      { name: { fr: "Boulettes de bœuf ou merguez", en: "Beef meatballs", ar: "كرات لحم" }, quantity: 180, unit: "g", dept: "deptMeat" },
      { name: { fr: "Courgette & Carotte", en: "Zucchini & carrot", ar: "كوسة وجزر" }, quantity: 2, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Pois chiches cuits", en: "Chickpeas", ar: "حمص" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Ras el Hanout & Concentré de tomate", en: "Ras el Hanout & tomato paste", ar: "رأس الحانوت ومعجون طماطم" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Coupez les carottes et courgettes en gros tronçons.",
        "Dans une marmite, faites revenir les boulettes et les légumes avec les épices et le concentré de tomate 5 min.",
        "Couvrez avec 500ml d'eau et laissez mijoter 20 minutes.",
        "Préparez la semoule à l'eau bouillante et servez avec les légumes fondants et le bouillon parfumé."
      ],
      en: [
        "Cut carrots and zucchinis into large pieces.",
        "Sear meatballs and vegetables with spices and tomato paste in a pot for 5 mins.",
        "Cover with water and simmer for 20 mins.",
        "Steam couscous and serve topped with rich vegetable stew."
      ],
      ar: [
        "قطع الجزر والكوسة إلى قطع متوسطة.",
        "شوح كرات اللحم والخضار والبهارات ومعجون الطماطم 5 دقائق.",
        "أضف الماء واتركه يغلي 20 دقيقة.",
        "حضر الكسكسي واسكب فوقه الخضار والمرق العطري."
      ]
    }
  },
  {
    id: "m18",
    mealType: "dinner",
    title: {
      fr: "Saumon Laqué Teriyaki & Riz Japonais Vinaigré",
      en: "Teriyaki Glazed Salmon with Japanese Rice",
      ar: "سلمون ترياكي مشوي مع الأرز الياباني"
    },
    emoji: "🍣",
    prepTime: 8,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 520,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Pavé de saumon frais", en: "Salmon fillet", ar: "فيليه سلمون" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Riz rond japonais ou basmati", en: "Rice", ar: "أرز" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Sauce Teriyaki ou soja sucrée", en: "Teriyaki sauce", ar: "صلصة ترياكي" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Concombre ou Edamame", en: "Cucumber or edamame", ar: "خيار أو فول صويا" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Graines de sésame grillées", en: "Sesame seeds", ar: "سمسم" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites cuire le riz dans de l'eau bouillante salée 12 min.",
        "Dans une poêle chaude, faites dorer le saumon côté peau 4 min, puis retournez-le.",
        "Nappez généreusement de sauce Teriyaki et laissez caraméliser 2-3 minutes à feu doux.",
        "Servez le saumon laqué sur le riz chaud avec des rondelles de concombre frais et du sésame."
      ],
      en: [
        "Cook rice for 12 mins.",
        "Pan-sear salmon skin-down for 4 mins, then flip.",
        "Glaze with Teriyaki sauce and simmer for 2-3 mins until sticky.",
        "Serve glazed salmon over warm rice with cucumber slices and sesame."
      ],
      ar: [
        "اطه الأرز لمدة 12 دقيقة.",
        "اشو السلمون في مقلاة 4 دقائق لكل جانب.",
        "اسكب صلصة الترياكي واتركه يتكرمل دقيقتين على نار هادئة.",
        "قدم السلمون فوق الأرز مع شرائح الخيار والسمسم."
      ]
    }
  },
  {
    id: "m19",
    mealType: "lunch",
    title: {
      fr: "Quiche Fondante Épinards & Chèvre Frais",
      en: "Spinach & Goat Cheese Crustless Quiche",
      ar: "كيش السبانخ والجبن"
    },
    emoji: "🥧",
    prepTime: 10,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 430,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Pâte brisée ou sans pâte", en: "Shortcrust pastry", ar: "عجينة فطيرة" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 3, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Jeunes pousses d'épinards", en: "Spinach", ar: "سبانخ" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Bûche de chèvre ou feta", en: "Goat cheese or feta", ar: "جبن ماعز" }, quantity: 80, unit: "g", dept: "deptDairy" },
      { name: { fr: "Crème liquide ou lait", en: "Cream or milk", ar: "كريمة سائلة" }, quantity: 100, unit: "ml", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 180°C.",
        "Battez les œufs avec la crème, sel, poivre et muscade.",
        "Faites tomber les épinards 2 min à la poêle et disposez-les sur le fond de pâte.",
        "Versez l'appareil à quiche, déposez les rondelles de chèvre et enfournez 25 minutes."
      ],
      en: [
        "Preheat oven to 180°C (350°F).",
        "Whisk eggs with cream, salt, pepper, and nutmeg.",
        "Sauté spinach for 2 mins and layer over pastry base.",
        "Pour egg mix, top with goat cheese slices and bake for 25 mins."
      ],
      ar: [
        "سخن الفرن على 180 مئوية.",
        "اخفق البيض مع الكريمة والملح والفلفل.",
        "شوح السبانخ دقيقتين وضعها فوق العجينة.",
        "اسكب خليط البيض ورتب قطع الجبن واخبز 25 دقيقة."
      ]
    }
  },
  {
    id: "m20",
    mealType: "dinner",
    title: {
      fr: "Pavé de Bœuf Grillé & Poêlée de Haricots Verts à l'Ail",
      en: "Grilled Beef Steak with Garlic Green Beans",
      ar: "ستيك لحم بقري مشوي مع فاصوليا خضراء بالثوم"
    },
    emoji: "🥩",
    prepTime: 5,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 470,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCarb", "dietQuick"],
    ingredients: [
      { name: { fr: "Pavé ou faux-filet de bœuf", en: "Beef steak", ar: "ستيك لحم بقري" }, quantity: 180, unit: "g", dept: "deptMeat" },
      { name: { fr: "Haricots verts frais ou surgelés", en: "Green beans", ar: "فاصوليا خضراء" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Gousses d'ail", en: "Garlic cloves", ar: "ثوم" }, quantity: 2, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Beurre ou huile d'olive", en: "Butter or olive oil", ar: "زبدة أو زيت" }, quantity: 15, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites cuire les haricots verts 6 min dans de l'eau bouillante salée, puis égouttez.",
        "Faites poêler les haricots 3 min avec une noisette de beurre et l'ail émincé.",
        "Dans une poêle très chaude, faites saisir le pavé de bœuf 2 à 3 min par face selon la cuisson souhaitée.",
        "Laissez reposer la viande 2 min et servez avec les haricots verts aillés."
      ],
      en: [
        "Boil green beans for 6 mins and drain.",
        "Sauté beans with garlic and butter for 3 mins.",
        "Sear beef steak in a hot skillet for 2-3 mins per side.",
        "Rest steak for 2 mins and serve with garlicky green beans."
      ],
      ar: [
        "اسلق الفاصوليا الخضراء 6 دقائق ثم صفها.",
        "شوح الفاصوليا مع الزبدة والثوم 3 دقائق.",
        "اشو شريحة اللحم في مقلاة ساخنة 2-3 دقائق لكل جانب.",
        "دع اللحم يرتاح دقيقتين وقدمه مع الفاصوليا."
      ]
    }
  },
  {
    id: "m21",
    mealType: "dinner",
    title: {
      fr: "Risotto Crémeux aux Champignons & Parmesan",
      en: "Creamy Mushroom & Parmesan Risotto",
      ar: "ريزوتو الفطر الكريمي مع جبن البارميزان"
    },
    emoji: "🍲",
    prepTime: 10,
    cookTime: 20,
    difficulty: "medium",
    caloriesPerPerson: 490,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Riz arborio pour risotto", en: "Arborio rice", ar: "أرز ريزوتو" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Champignons de Paris frais", en: "Mushrooms", ar: "فطر طازج" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Parmesan râpé", en: "Grated parmesan", ar: "جبن بارميزان" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Bouillon de légumes", en: "Vegetable broth", ar: "مرق خضار" }, quantity: 350, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Échalote & Huile d'olive", en: "Shallot & Olive oil", ar: "بصل وزيت زيتون" }, quantity: 1, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Émincez l'échalote et faites-la dorer dans l'huile d'olive avec les champignons.",
        "Ajoutez le riz arborio et laissez nacrer 2 minutes en remuant.",
        "Versez le bouillon louche après louche jusqu'à absorption complète (environ 18 min).",
        "Hors du feu, incorporez le parmesan râpé pour obtenir un risotto bien onctueux."
      ],
      en: [
        "Sauté chopped shallot and sliced mushrooms in olive oil.",
        "Add arborio rice and toast for 2 minutes until translucent.",
        "Gradually add warm broth ladle by ladle while stirring for 18 mins.",
        "Remove from heat and stir in parmesan cheese until velvety."
      ],
      ar: [
        "شوح البصل والفطر في زيت الزيتون.",
        "أضف أرز الريزوتو وحمصه لمدة دقيقتين.",
        "أضف المرق تدريجياً مع التحريك المستمر لمدة 18 دقيقة.",
        "ارفع عن النار واخلط جبن البارميزان حتى يصبح القوام كريمياً."
      ]
    }
  },
  {
    id: "m22",
    mealType: "lunch",
    title: {
      fr: "Tacos de Poulet Mariné & Salsa d'Avocat",
      en: "Marinated Chicken Tacos with Fresh Avocado Salsa",
      ar: "تاكوس الدجاج المتبل مع صلصة الأفوكادو"
    },
    emoji: "🌮",
    prepTime: 10,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Tortillas de maïs ou blé", en: "Tortillas", ar: "خبز تورتيلا" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Blanc de poulet émincé", en: "Chicken breast", ar: "صدر دجاج" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Avocat mûr en dés", en: "Avocado", ar: "أفوكادو" }, quantity: 0.5, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Tomate & Jus de citron vert", en: "Tomato & Lime", ar: "طماطم وليمون أخضر" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Épices mexicaines / Paprika", en: "Mexican spices", ar: "بهارات مكسيكية" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites sauter le poulet émincé à la poêle avec les épices 7 minutes jusqu'à ce qu'il soit bien doré.",
        "Dans un bol, mélangez les dés d'avocat, de tomate et le jus de citron vert.",
        "Réchauffez les tortillas à sec à la poêle 30 secondes.",
        "Garnissez les tortillas avec le poulet croustillant et la salsa fraîche."
      ],
      en: [
        "Sauté seasoned chicken in a pan for 7 mins until browned.",
        "Toss diced avocado, tomato, and lime juice in a bowl.",
        "Warm tortillas in a dry skillet for 30 secs.",
        "Fill warm tortillas with chicken and fresh avocado salsa."
      ],
      ar: [
        "شوح قطع الدجاج مع التوابل 7 دقائق حتى تنضج.",
        "اخلط قطع الأفوكادو والطماطم وعصير الليمون الأخضر.",
        "سخن التورتيلا في مقلاة جافة 30 ثانية.",
        "احش التورتيلا بالدجاج وسلطة الأفوكادو المنعشة."
      ]
    }
  },
  {
    id: "m23",
    mealType: "dinner",
    title: {
      fr: "Tajine de Poulet au Citron Confit & Olives Vertes",
      en: "Moroccan Lemon & Olive Chicken Tagine",
      ar: "طاجين الدجاج بالليمون المخلل والزيتون الأخضر"
    },
    emoji: "🥘",
    prepTime: 12,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 480,
    tags: ["maghreb", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Cuisses ou aiguillettes de poulet", en: "Chicken pieces", ar: "قطع دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Citron confit", en: "Preserved lemon", ar: "ليمون مخلل" }, quantity: 0.5, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Olives vertes dénoyautées", en: "Green olives", ar: "زيتون أخضر" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Oignon, ail, curcuma et gingembre", en: "Onion, garlic & spices", ar: "بصل وثوم وتوابل" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Coriandre fraîche", en: "Fresh cilantro", ar: "كزبرة طازجة" }, quantity: 10, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites dorer le poulet avec l'oignon émincé, l'ail et les épices dans une sauteuse 5 min.",
        "Ajoutez un verre d'eau, l'écorce de citron confit en lamelles et laissez mijoter à couvert 20 min.",
        "Ajoutez les olives vertes 5 min avant la fin pour lier la sauce.",
        "Parsemez de coriandre fraîche et dégustez avec du pain maison ou du riz."
      ],
      en: [
        "Brown chicken with onion, garlic, and spices in a pan for 5 mins.",
        "Add a splash of water and sliced preserved lemon, simmer covered for 20 mins.",
        "Stir in green olives during the last 5 minutes.",
        "Garnish with fresh cilantro and serve with warm bread or rice."
      ],
      ar: [
        "حمر الدجاج مع البصل والثوم والتوابل 5 دقائق.",
        "أضف القليل من الماء وشرائح الليمون المخلل واتركه يطهى مغطى 20 دقيقة.",
        "أضف الزيتون الأخضر في آخر 5 دقائق.",
        "زين بالكزبرة الطازجة وقدمه مع الخبز أو الأرز."
      ]
    }
  },
  {
    id: "m24",
    mealType: "lunch",
    title: {
      fr: "Pad Thaï Express aux Crevettes & Cacahuètes",
      en: "Quick Shrimp Pad Thai with Crushed Peanuts",
      ar: "باد تاي الجمبري السريع مع الفول السوداني"
    },
    emoji: "🍤",
    prepTime: 10,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Nouilles de riz plates", en: "Rice noodles", ar: "نودلز الأرز" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Crevettes décortiquées", en: "Shrimp", ar: "جمبري مقشر" }, quantity: 130, unit: "g", dept: "deptMeat" },
      { name: { fr: "Œuf frais", en: "Egg", ar: "بيض" }, quantity: 1, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Pousses de soja & Ciboulette", en: "Bean sprouts & chives", ar: "براعم الصويا وثوم معمر" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja & Cacahuètes concassées", en: "Soy sauce & peanuts", ar: "صلصة صويا وفول سوداني" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites tremper les nouilles de riz dans l'eau chaude 6 min.",
        "Dans un wok chaud huilé, faites sauter les crevettes 2 min, cassez l'œuf et brouillez-le rapidement.",
        "Ajoutez les nouilles égouttées, les pousses de soja et la sauce soja.",
        "Mélangez 2 minutes à feu vif et servez parsemé de cacahuètes concassées."
      ],
      en: [
        "Soak rice noodles in warm water for 6 mins.",
        "Sear shrimp in a hot wok for 2 mins, scramble in the egg.",
        "Add noodles, bean sprouts, and sauce, toss for 2 mins over high heat.",
        "Serve sprinkled with crushed roasted peanuts."
      ],
      ar: [
        "انقع نودلز الأرز في ماء دافئ 6 دقائق.",
        "شوح الجمبري في مقلاة ووك دقيقتين ثم اخفق البيضة معه.",
        "أضف النودلز وبراعم الصويا والصلصة وقلب على نار عالية دقيقتين.",
        "قدم الطبق مزيناً بالفول السوداني المحمص."
      ]
    }
  },
  {
    id: "m25",
    mealType: "dinner",
    title: {
      fr: "Dahl Crémeux de Lentilles Corail au Lait de Coco",
      en: "Creamy Red Lentil Coconut Dahl",
      ar: "دال العدس الأحمر الكريمي بحليب جوز الهند"
    },
    emoji: "🍛",
    prepTime: 8,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["indian", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Lentilles corail", en: "Red lentils", ar: "عدس أحمر" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 120, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Tomates concassées", en: "Diced tomatoes", ar: "طماطم مقطعة" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Curry doux, cumin & ail", en: "Curry powder, cumin & garlic", ar: "كاري وكمون وثوم" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz basmati (accompagnement)", en: "Basmati rice", ar: "أرز بسمتي" }, quantity: 60, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir l'ail et les épices dans une casserole avec un filet d'huile 1 min.",
        "Rincez les lentilles corail et ajoutez-les avec les tomates concassées et 200ml d'eau.",
        "Laissez mijoter 15 minutes à feu moyen jusqu'à ce que les lentilles soient fondantes.",
        "Versez le lait de coco, mélangez 2 min et servez avec un dôme de riz basmati."
      ],
      en: [
        "Sauté garlic and curry spices in a pot with oil for 1 min.",
        "Add rinsed red lentils, diced tomatoes, and water.",
        "Simmer for 15 mins until lentils are soft and creamy.",
        "Stir in coconut milk, cook for 2 mins, and serve over fragrant basmati rice."
      ],
      ar: [
        "شوح الثوم والتوابل مع قليل من الزيت دقيقة واحدة.",
        "أضف العدس المغسول والطماطم والماء.",
        "اتركه يغلي 15 دقيقة حتى يذوب العدس ويصبح ناعماً.",
        "أضف حليب جوز الهند وقلب دقيقتين وقدمه مع أرز بسمتي."
      ]
    }
  },
  {
    id: "m26",
    mealType: "lunch",
    title: {
      fr: "Filet de Cabillaud en Papillote & Courgettes au Thym",
      en: "Baked Cod Foil Packet with Thyme Zucchini",
      ar: "فيليه سمك القد المطهو في ورق الفرن مع الكوسة والزعتر"
    },
    emoji: "🐟",
    prepTime: 8,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["mediterranean", "french", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCarb", "dietQuick"],
    ingredients: [
      { name: { fr: "Filet de cabillaud ou colin", en: "Cod fillet", ar: "فيليه سمك القد" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Courgette moyenne", en: "Zucchini", ar: "كوسة" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Tomates cerises", en: "Cherry tomatoes", ar: "طماطم كرزية" }, quantity: 6, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Huile d'olive & Thym frais", en: "Olive oil & thyme", ar: "زيت زيتون وزعتر" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 190°C.",
        "Coupez la courgette en fines rondelles et disposez-la au centre d'une feuille de papier cuisson.",
        "Déposez le poisson, ajoutez les tomates cerises coupées, le filet d'huile d'olive, le thym, sel et poivre.",
        "Fermez la papillote hermétiquement et enfournez pour 15 minutes."
      ],
      en: [
        "Preheat oven to 190°C (375°F).",
        "Slice zucchini thinly and place on parchment paper.",
        "Top with cod fillet, cherry tomatoes, olive oil, thyme, salt and pepper.",
        "Fold the packet tightly and bake for 15 mins."
      ],
      ar: [
        "سخن الفرن على 190 مئوية.",
        "قطع الكوسة شرائح رقيقة وضعها في ورق الطهي.",
        "ضع الفيليه مع الطماطم الكرزية وزيت الزيتون والزعتر.",
        "أغلق الورق بإحكام واخبز لمدة 15 دقيقة."
      ]
    }
  },
  {
    id: "m27",
    mealType: "lunch",
    title: {
      fr: "Burger Maison Bistrot & Potatoes Rôties au Four",
      en: "Homemade Bistro Burger with Oven-Baked Potatoes",
      ar: "برغر بيتي صحي مع بطاطا ويدجز مشوية"
    },
    emoji: "🍔",
    prepTime: 12,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 560,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Pain burger brioché ou complet", en: "Burger bun", ar: "خبز برغر" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Steak haché de bœuf 5% MG", en: "Lean ground beef patty", ar: "شريحة لحم مفروم" }, quantity: 130, unit: "g", dept: "deptMeat" },
      { name: { fr: "Pommes de terre (potatoes)", en: "Potatoes", ar: "بطاطس" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Cheddar ou fromage à pâte fondue", en: "Cheddar slice", ar: "شيدر" }, quantity: 1, unit: "tranches", dept: "deptDairy" },
      { name: { fr: "Salade, rondelles de tomate & oignon", en: "Lettuce & tomato", ar: "خس وطماطم" }, quantity: 40, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Coupez les pommes de terre en quartiers, assaisonnez d'un filet d'huile et paprika, puis enfournez 18 min à 200°C.",
        "Faites griller le steak 2 min par face à la poêle, déposez la tranche de fromage dessus.",
        "Toastez légèrement le pain burger.",
        "Montez le burger avec salade, tomate, sauce légère et le steak fromagé. Servez avec les potatoes croustillantes."
      ],
      en: [
        "Cut potatoes into wedges, season with oil and paprika, roast for 18 mins at 200°C.",
        "Sear burger patty for 2 mins each side and melt cheddar on top.",
        "Toast burger buns lightly.",
        "Assemble burger with greens, tomato slice, and steak. Serve with crispy potatoes."
      ],
      ar: [
        "قطع البطاطس إلى أجنحة وتبلها واخبزها 18 دقيقة في الفرن.",
        "اشو شريحة اللحم دقيقتين لكل وجه وضع الجبن فوقها لتذوب.",
        "حمص خبز البرغر خفيفاً.",
        "رتب البرغر مع الخس والطماطم وقدمه مع البطاطا المشوية."
      ]
    }
  },
  {
    id: "m28",
    mealType: "dinner",
    title: {
      fr: "Chili Végétarien Gourmand aux Haricots Noirs & Maïs",
      en: "Rich Black Bean & Sweet Corn Veggie Chili",
      ar: "تشيلي نباتي غني بالفاصوليا السوداء والذرة"
    },
    emoji: "🍲",
    prepTime: 8,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 410,
    tags: ["mexican", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Haricots noirs ou rouges égouttés", en: "Black or red beans", ar: "فاصوليا سوداء" }, quantity: 140, unit: "g", dept: "deptPantry" },
      { name: { fr: "Maïs doux", en: "Sweet corn", ar: "ذرة حلوة" }, quantity: 60, unit: "g", dept: "deptPantry" },
      { name: { fr: "Coulis de tomate & Poivron rouge", en: "Tomato sauce & bell pepper", ar: "صلصة طماطم وفلفل رومي" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Cumin, origan et piment doux", en: "Chili spices", ar: "بهارات تشيلي وكمون" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz blanc ou complet", en: "Rice", ar: "أرز" }, quantity: 60, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir les dés de poivron avec les épices dans une casserole huilée 3 min.",
        "Ajoutez les haricots, le maïs et le coulis de tomate.",
        "Laissez mijoter 15 minutes à feu doux pour concentrer les saveurs.",
        "Servez chaud accompagné d'un bol de riz et d'un quartier de citron vert."
      ],
      en: [
        "Sauté bell pepper chunks with chili spices for 3 mins.",
        "Add beans, sweet corn, and tomato puree.",
        "Simmer gently for 15 mins until thick and hearty.",
        "Serve hot with warm rice and a lime wedge."
      ],
      ar: [
        "شوح الفلفل مع البهارات في قدر مع الزيت 3 دقائق.",
        "أضف الفاصوليا والذرة وصلصة الطماطم.",
        "اتركه يتسبك 15 دقيقة على نار هادئة.",
        "قدمه ساخناً مع الأرز وقطعة ليمون."
      ]
    }
  },
  {
    id: "m29",
    mealType: "dinner",
    title: {
      fr: "Brochettes de Poulet Yakitori & Nouilles Sautées aux Légumes",
      en: "Chicken Yakitori Skewers with Vegetable Fried Noodles",
      ar: "أسياخ دجاج ياكيتوري ونودلز مقلية بالخضار"
    },
    emoji: "🍢",
    prepTime: 10,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 480,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Filets de poulet coupés en dés", en: "Chicken cubes", ar: "مكعبات دجاج" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Sauce soja sucrée ou yakitori", en: "Sweet soy sauce", ar: "صلصة صويا حلوة" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Nouilles chinoises aux œufs", en: "Egg noodles", ar: "نودلز بالبيض" }, quantity: 70, unit: "g", dept: "deptPantry" },
      { name: { fr: "Carotte râpée & chou émincé", en: "Shredded carrot & cabbage", ar: "جزر وملفوف مبشور" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Graines de sésame", en: "Sesame seeds", ar: "سمسم" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Piquez le poulet sur des piques à brochette et nappez de sauce soja sucrée.",
        "Faites cuire les nouilles 3 min dans l'eau bouillante et égouttez.",
        "Faites griller les brochettes à la poêle 7 min en les retournant régulièrement.",
        "Faites sauter les légumes et nouilles 3 min au wok, servez avec les brochettes laquées et du sésame."
      ],
      en: [
        "Thread chicken cubes onto skewers and brush with yakitori sauce.",
        "Boil egg noodles for 3 mins and drain.",
        "Pan-sear skewers for 7 mins until caramelized.",
        "Stir-fry veggies and noodles for 3 mins, top with skewers and sesame."
      ],
      ar: [
        "شك مكعبات الدجاج في أعواد وادهنها بالصلصة الحلوة.",
        "اسلق النودلز 3 دقائق وصفها.",
        "اشو الأسياخ في المقلاة 7 دقائق حتى تتكرمل.",
        "شوح الخضار مع النودلز 3 دقائق وقدمها مع الدجاج والسمسم."
      ]
    }
  },
  {
    id: "m30",
    mealType: "lunch",
    title: {
      fr: "Shakshuka Traditionnelle aux Œufs Coulants & Feta",
      en: "Traditional Shakshuka with Poached Eggs & Feta",
      ar: "شكشوكة تقليدية بالبيض وجبن الفيتا"
    },
    emoji: "🍳",
    prepTime: 8,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 390,
    tags: ["maghreb", "mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Œufs frais bio", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Poivrons rouge et vert émincés", en: "Bell peppers", ar: "فلفل ملون" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Pulpe de tomates concassées", en: "Crushed tomatoes", ar: "طماطم معصورة" }, quantity: 150, unit: "g", dept: "deptPantry" },
      { name: { fr: "Feta émiettée", en: "Feta cheese", ar: "جبن فيتا" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Paprika doux, cumin & ail", en: "Paprika, cumin & garlic", ar: "بابريكا وكمون وثوم" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites revenir les poivrons émincés et l'ail dans l'huile d'olive 4 min.",
        "Versez les tomates concassées, les épices, sel et poivre. Laissez compoter 5 min.",
        "Creusez deux puits dans la sauce et cassez-y les œufs délicatement.",
        "Couvrez et laissez cuire 3-4 min jusqu'à ce que le blanc soit pris. Parsemez de feta et dégustez avec du pain croustillant."
      ],
      en: [
        "Sauté sliced peppers and garlic in olive oil for 4 mins.",
        "Add crushed tomatoes and spices, simmer for 5 mins.",
        "Make wells in the sauce and crack the eggs directly inside.",
        "Cover and cook for 3-4 mins until egg whites set. Crumble feta over top and serve."
      ],
      ar: [
        "شوح الفلفل والثوم في زيت الزيتون 4 دقائق.",
        "أضف الطماطم والتوابل واتركها تتسبك 5 دقائق.",
        "اصنع فجوات في الصلصة واكسر البيض بداخلها.",
        "غط المقلاة 3-4 دقائق حتى يتماسك بياض البيض، وزين بجبن الفيتا."
      ]
    }
  },
  {
    id: "m31",
    mealType: "dinner",
    title: {
      fr: "Filet de Truite Grillée & Purée Onctueuse de Patate Douce",
      en: "Grilled Trout Fillet with Creamy Sweet Potato Mash",
      ar: "فيليه سمك السلمون المرقط مع بيوريه البطاطا الحلوة"
    },
    emoji: "🐟",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Filet de truite ou saumon", en: "Trout fillet", ar: "فيليه سمك السلمون المرقط" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Patate douce épluchée", en: "Sweet potato", ar: "بطاطا حلوة" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Lait ou crème légère", en: "Milk or cream", ar: "حليب أو كريمة" }, quantity: 30, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Noix de muscade & Aneth", en: "Nutmeg & dill", ar: "جوزة الطيب وشبت" }, quantity: 1, unit: "pincée", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Coupez la patate douce en cubes et faites-la cuire 12 min à la vapeur ou dans l'eau bouillante.",
        "Écrasez la patate douce en purée avec le lait, une pincée de muscade, sel et poivre.",
        "Faites poêler le filet de truite 3 min par face avec un filet d'huile.",
        "Dressez la purée chaude avec le poisson grillé et un brin d'aneth."
      ],
      en: [
        "Cube sweet potato and boil for 12 mins until fork tender.",
        "Mash with milk, nutmeg, salt, and pepper until smooth.",
        "Pan-sear trout fillet for 3 mins each side.",
        "Serve warm mash topped with fish and fresh dill."
      ],
      ar: [
        "قطع البطاطا الحلوة واسلقها 12 دقيقة حتى تطرى.",
        "اهرس البطاطا مع الحليب وجوزة الطيب والملح.",
        "اشو فيليه السمك في مقلاة 3 دقائق لكل جانب.",
        "قدم البيوريه الساخن مع السمك المشوي والشبت."
      ]
    }
  },
  {
    id: "m32",
    mealType: "dinner",
    title: {
      fr: "Lasagnes Maison à la Bolognaise & Béchamel Légère",
      en: "Homemade Beef Bolognese Lasagna",
      ar: "لازانيا اللحم المفروم والبشاميل البيتي"
    },
    emoji: "🍝",
    prepTime: 15,
    cookTime: 30,
    difficulty: "medium",
    caloriesPerPerson: 540,
    tags: ["italian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Feuilles de lasagne précuites", en: "Lasagna sheets", ar: "شرائح لازانيا" }, quantity: 4, unit: "pcs", dept: "deptPantry" },
      { name: { fr: "Bœuf haché maigre", en: "Lean minced beef", ar: "لحم بقري مفروم" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Coulis de tomate & Oignon", en: "Tomato sauce & onion", ar: "صلصة طماطم وبصل" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Lait & Maïzena (béchamel)", en: "Milk & cornstarch", ar: "حليب ونشا" }, quantity: 120, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Mozzarella ou emmental râpé", en: "Grated cheese", ar: "جبن مبشور" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites revenir le bœuf avec l'oignon, ajoutez le coulis de tomate et laissez mijoter 8 min.",
        "Préparez une béchamel légère en chauffant le lait avec la maïzena diluée jusqu'à épaississement.",
        "Dans un plat à gratin, alternez couches de sauce bolognaise, feuilles de lasagne et béchamel.",
        "Saupoudrez de fromage râpé et enfournez 25 minutes à 180°C jusqu'à gratiner."
      ],
      en: [
        "Brown beef with onions, add tomato sauce, and simmer for 8 mins.",
        "Whisk milk with cornstarch over medium heat to make a light white sauce.",
        "Layer meat sauce, pasta sheets, and white sauce in a baking dish.",
        "Top with grated cheese and bake for 25 mins at 180°C."
      ],
      ar: [
        "شوح اللحم مع البصل وأضف صلصة الطماطم واتركه يغلي 8 دقائق.",
        "حضر بشاميل خفيف بتسخين الحليب مع النشا حتى يثقل.",
        "رتب طبقات صلصة اللحم وشرائح اللازانيا والبشاميل في صينية فرن.",
        "رش الجبن المبشور واخبز في الفرن 25 دقيقة على 180 مئوية."
      ]
    }
  },
  {
    id: "m33",
    mealType: "lunch",
    title: {
      fr: "Poke Bowl Thon Mariné, Mangue & Edamame",
      en: "Ahi Tuna Poke Bowl with Mango & Edamame",
      ar: "بوكي باول التونة المتبلة والمانجو والإدامامي"
    },
    emoji: "🥗",
    prepTime: 12,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 450,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Thon frais ou pavé décongelé de qualité", en: "Fresh tuna steak", ar: "تونة طازجة" }, quantity: 130, unit: "g", dept: "deptMeat" },
      { name: { fr: "Riz à sushi cuit et refroidi", en: "Cooked sushi rice", ar: "أرز سوشي مطبوخ" }, quantity: 90, unit: "g", dept: "deptPantry" },
      { name: { fr: "Dés de mangue fraîche", en: "Diced mango", ar: "مانجو مقطعة" }, quantity: 50, unit: "g", dept: "deptProduce" },
      { name: { fr: "Edamame ou fèves", en: "Edamame", ar: "فول إدامامي" }, quantity: 40, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja, sésame et citron vert", en: "Soy, sesame & lime dressing", ar: "صلصة صويا وسمسم" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Coupez le thon en petits cubes et faites-le mariner 5 min dans la sauce soja et huile de sésame.",
        "Disposez le riz au fond d'un grand bol.",
        "Disposez harmonieusement par sections : les cubes de thon, la mangue, les edamames et des lamelles de concombre.",
        "Arrosez du reste de marinade et parsemez de graines de sésame."
      ],
      en: [
        "Dice tuna and marinate for 5 mins in soy sauce and sesame oil.",
        "Place sushi rice in the base of a bowl.",
        "Arrange marinated tuna, mango cubes, edamame, and cucumber slices on top.",
        "Drizzle with remaining dressing and garnish with sesame seeds."
      ],
      ar: [
        "قطع التونة مكعبات وانقعها 5 دقائق في صلصة الصويا وزيت السمسم.",
        "ضع الأرز في قاع الوعاء.",
        "رتب التونة والمانجو وفول الصويا والخيار بشكل متناسق.",
        "اسكب التتبيلة وزين ببذور السمسم."
      ]
    }
  },
  {
    id: "m34",
    mealType: "dinner",
    title: {
      fr: "Gratin Dauphinois Traditionnel & Salade Croquante",
      en: "Classic French Potato Gratin Dauphinois with Green Salad",
      ar: "غراتان البطاطس الفرنسي التقليدي مع سلطة خضراء"
    },
    emoji: "🥔",
    prepTime: 12,
    cookTime: 30,
    difficulty: "easy",
    caloriesPerPerson: 440,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Pommes de terre à chair ferme", en: "Firm potatoes", ar: "بطاطس" }, quantity: 220, unit: "g", dept: "deptProduce" },
      { name: { fr: "Lait et crème liquide légère", en: "Milk & light cream", ar: "حليب وكريمة خفيفة" }, quantity: 140, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Gousse d'ail & Noix de muscade", en: "Garlic & nutmeg", ar: "ثوم وجوزة الطيب" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Salade verte (mâche ou roquette)", en: "Green salad", ar: "سلطة خضراء" }, quantity: 50, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Épluchez et émincez les pommes de terre en fines rondelles régulières.",
        "Frottez un plat à gratin avec la gousse d'ail coupée en deux.",
        "Disposez les rondelles en rosace, versez le mélange lait/crème battu avec la muscade, sel et poivre.",
        "Enfournez 30 minutes à 180°C jusqu'à ce que le dessus soit bien doré et fondant. Servez avec la salade."
      ],
      en: [
        "Peel and slice potatoes thinly.",
        "Rub a baking dish with cut garlic clove.",
        "Layer potato slices, pour milk and cream mixture seasoned with nutmeg, salt and pepper.",
        "Bake for 30 mins at 180°C until golden and tender. Serve with crisp greens."
      ],
      ar: [
        "قشر البطاطس وقطعها شرائح رقيقة.",
        "افرك صينية الفرن بفص ثوم مقطوع.",
        "رتب شرائح البطاطس واسكب خليط الحليب والكريمة وجوزة الطيب.",
        "اخبز 30 دقيقة على 180 مئوية حتى يتحمر ويصبح طرياً، وقدمه مع السلطة."
      ]
    }
  },
  {
    id: "m35",
    mealType: "dinner",
    title: {
      fr: "Curry Rouge Thaï au Poulet & Lait de Coco",
      en: "Thai Red Curry Chicken with Coconut Milk & Jasmine Rice",
      ar: "كاري الدجاج التايلاندي الأحمر بحليب جوز الهند"
    },
    emoji: "🍛",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Aiguillettes de poulet", en: "Chicken tenders", ar: "شرائح دجاج" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Pâte de curry rouge thaï", en: "Thai red curry paste", ar: "معجون كاري أحمر" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 140, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Courgette & Poivron rouge", en: "Zucchini & red pepper", ar: "كوسة وفلفل أحمر" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Riz thaï ou jasmin", en: "Jasmine rice", ar: "أرز الياسمين" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir la pâte de curry rouge 1 min dans une sauteuse chaude.",
        "Ajoutez le poulet coupé en morceaux et faites dorer 3 min.",
        "Versez le lait de coco et les légumes émincés. Laissez mijoter 10 min à feu doux.",
        "Servez ce curry très parfumé avec du riz jasmin chaud."
      ],
      en: [
        "Sauté red curry paste for 1 min in a skillet until fragrant.",
        "Add chicken chunks and sear for 3 mins.",
        "Pour coconut milk and sliced veggies, simmer for 10 mins.",
        "Serve hot over steamed jasmine rice."
      ],
      ar: [
        "شوح معجون الكاري في مقلاة دقيقة واحدة حتى تفوح رائحته.",
        "أضف قطع الدجاج وحمرها 3 دقائق.",
        "اسكب حليب جوز الهند والخضار واتركه يغلي 10 دقائق.",
        "قدم الكاري العطري مع أرز الياسمين الساخن."
      ]
    }
  },
  {
    id: "m36",
    mealType: "lunch",
    title: {
      fr: "Ratatouille Provençale Mijotée & Riz Complet",
      en: "Slow-Cooked Provencal Ratatouille with Brown Rice",
      ar: "راتاتوي الخضار البروفنسالية مع أرز كامل"
    },
    emoji: "🍆",
    prepTime: 12,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 370,
    tags: ["french", "mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Aubergine, courgette & poivron", en: "Eggplant, zucchini & pepper", ar: "باذنجان وكوسة وفلفل" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Tomates mûres concassées", en: "Crushed tomatoes", ar: "طماطم معصورة" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Huile d'olive & Herbes de Provence", en: "Olive oil & provence herbs", ar: "زيت زيتون وأعشاب بروفنس" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz complet cuit", en: "Brown rice", ar: "أرز بني كامل" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Coupez l'aubergine, la courgette et le poivron en dés réguliers.",
        "Faites revenir les légumes séparément dans l'huile d'olive avec l'ail pour qu'ils dorent bien.",
        "Réunissez tous les légumes dans une cocotte, ajoutez les tomates et les herbes de Provence.",
        "Laissez confire à feu très doux pendant 20 minutes et servez avec le riz complet."
      ],
      en: [
        "Dice eggplant, zucchini, and bell pepper.",
        "Sauté vegetables in olive oil until lightly browned.",
        "Combine in a pot, add tomatoes and herbs of provence.",
        "Simmer gently for 20 mins until melt-in-the-mouth. Serve with brown rice."
      ],
      ar: [
        "قطع الباذنجان والكوسة والفلفل مكعبات.",
        "شوح الخضار في زيت الزيتون حتى تكتسب لوناً ذهبياً.",
        "اجمع الخضار في قدر وأضف الطماطم وأعشاب البروفنس.",
        "اتركها تطهى على نار هادئة 20 دقيقة وقدمها مع الأرز الكامل."
      ]
    }
  },
  {
    id: "m37",
    mealType: "dinner",
    title: {
      fr: "Fajitas au Bœuf Émincé & Poivrons Croquants",
      en: "Sizzling Beef Fajitas with Crisp Bell Peppers",
      ar: "فاهيتا اللحم البقري مع الفلفل الملون المقرمش"
    },
    emoji: "🌯",
    prepTime: 10,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 520,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Bavette ou rumsteck de bœuf émincé", en: "Beef strips", ar: "شرائح لحم بقري" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Tortillas de blé", en: "Wheat tortillas", ar: "تورتيلا قمح" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Poivrons tricolores & Oignon rouge", en: "Bell peppers & red onion", ar: "فلفل ملون وبصل أحمر" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Épices fajitas (cumin, coriandre, paprika)", en: "Fajita spice mix", ar: "توابل فاهيتا" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites sauter les lamelles de poivrons et d'oignon 4 min à feu vif dans une poêle huilée.",
        "Ajoutez les lamelles de bœuf et les épices, saisissez 3 min sans trop cuire la viande.",
        "Chauffez les galettes de tortillas 30 secondes.",
        "Garnissez chaque tortilla de bœuf fondant et de légumes croquants, roulez et dégustez."
      ],
      en: [
        "Sauté pepper strips and onion over high heat for 4 mins.",
        "Add beef strips and fajita spices, sear for 3 mins.",
        "Warm tortillas for 30 seconds.",
        "Fill each tortilla with sizzling beef and veggies, roll and enjoy."
      ],
      ar: [
        "شوح شرائح الفلفل والبصل 4 دقائق على نار قوية.",
        "أضف شرائح اللحم والتوابل واطهها 3 دقائق.",
        "سخن خبز التورتيلا 30 ثانية.",
        "احش التورتيلا باللحم والخضار ولفها وقدمها فوراً."
      ]
    }
  },
  {
    id: "m38",
    mealType: "dinner",
    title: {
      fr: "Harira Traditionnelle aux Pois Chiches & Coriandre",
      en: "Authentic Moroccan Harira Soup with Chickpeas",
      ar: "شوربة الحريرة المغربية بالعدس والحمص والكزبرة"
    },
    emoji: "🥣",
    prepTime: 12,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 380,
    tags: ["maghreb", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Pois chiches cuits & Lentilles", en: "Chickpeas & lentils", ar: "حمص وعدس" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Tomates fraîches concassées & Concentré", en: "Tomatoes & paste", ar: "طماطم ومعجون" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Céleri, oignon, coriandre & persil", en: "Celery & herbs", ar: "كرفس وكزبرة وبقدونس" }, quantity: 50, unit: "g", dept: "deptProduce" },
      { name: { fr: "Gingembre, curcuma & cannelle", en: "Moroccan soup spices", ar: "زنجبيل وكركم وقرفة" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Cheveux d'ange ou vermicelles", en: "Vermicelli pasta", ar: "شعيرية" }, quantity: 20, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir l'oignon et le céleri avec les épices dans une marmite 3 min.",
        "Ajoutez la pulpe de tomate, les pois chiches, les lentilles et 600ml d'eau.",
        "Laissez mijoter 20 minutes à feu moyen.",
        "Ajoutez les vermicelles et la coriandre fraîche 5 min avant de servir avec un filet de jus de citron."
      ],
      en: [
        "Sauté onion and celery with spices in a pot for 3 mins.",
        "Add tomato puree, chickpeas, lentils, and water.",
        "Simmer for 20 mins over medium heat.",
        "Add vermicelli and fresh herbs for the last 5 mins. Serve with fresh lemon."
      ],
      ar: [
        "شوح البصل والكرفس مع التوابل في قدر 3 دقائق.",
        "أضف الطماطم والحمص والعدس والماء.",
        "اتركه يغلي 20 دقيقة على نار متوسطة.",
        "أضف الشعيرية والكزبرة في آخر 5 دقائق وقدمه مع عصرة ليمون."
      ]
    }
  },
  {
    id: "m39",
    mealType: "lunch",
    title: {
      fr: "Spaghetti à la Crème Légère de Parmesan & Petits Pois",
      en: "Parmesan & Sweet Pea Spaghetti",
      ar: "سباغيتي بصلصة البارميزان الخفيفة والبازلاء"
    },
    emoji: "🍝",
    prepTime: 5,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Spaghetti ou linguine", en: "Spaghetti pasta", ar: "معكرونة سباغيتي" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Petits pois doux (frais ou surgelés)", en: "Sweet peas", ar: "بازلاء حلوة" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Parmesan râpé de qualité", en: "Grated parmesan", ar: "جبن بارميزان" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Crème liquide légère", en: "Light cooking cream", ar: "كريمة طبخ خفيفة" }, quantity: 40, unit: "ml", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites cuire les spaghetti al dente dans de l'eau bouillante salée avec les petits pois (10 min).",
        "Égouttez en conservant 3 cuillères à soupe d'eau de cuisson.",
        "Mélangez les pâtes chaudes avec la crème, le parmesan et le poivre noir du moulin.",
        "Servez immédiatement pour une texture crémeuse et réconfortante."
      ],
      en: [
        "Boil spaghetti and sweet peas together for 10 mins.",
        "Drain, reserving a splash of pasta cooking water.",
        "Toss hot pasta with light cream, grated parmesan, and freshly cracked black pepper.",
        "Serve immediately while hot and creamy."
      ],
      ar: [
        "اسلق السباغيتي مع البازلاء 10 دقائق في ماء مملح.",
        "صف المعكرونة واحتفظ بقليل من ماء السلق.",
        "اخلط المعكرونة الساخنة مع الكريمة والبارميزان والفلفل الأسود.",
        "قدمها فوراً وهي ساخنة وكريمية."
      ]
    }
  },
  {
    id: "m40",
    mealType: "dinner",
    title: {
      fr: "Velouté Parfumé de Carottes & Lentilles au Cumin",
      en: "Spiced Carrot & Lentil Soup with Cumin",
      ar: "شوربة الجزر والعدس المعطرة بالكمون"
    },
    emoji: "🥣",
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 320,
    tags: ["maghreb", "french", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber", "dietLowCalorie"],
    ingredients: [
      { name: { fr: "Carottes fraîches", en: "Carrots", ar: "جزر طازج" }, quantity: 250, unit: "g", dept: "deptProduce" },
      { name: { fr: "Lentilles corail", en: "Red lentils", ar: "عدس أحمر" }, quantity: 50, unit: "g", dept: "deptPantry" },
      { name: { fr: "Cumin moulu & Curcuma", en: "Cumin & turmeric", ar: "كمون وكركم" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
      { name: { fr: "Graines de courge pour le croquant", en: "Pumpkin seeds", ar: "بذور اليقطين" }, quantity: 10, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Épluchez et coupez les carottes en rondelles.",
        "Dans une marmite (ou au robot cuiseur), faites cuire les carottes et lentilles dans 500ml de bouillon avec le cumin 20 min.",
        "Mixez finement jusqu'à obtenir un velouté très soyeux.",
        "Servez dans des bols avec quelques graines de courge grillées par-dessus."
      ],
      en: [
        "Peel and slice carrots.",
        "Cook carrots and red lentils in 500ml broth with cumin for 20 mins.",
        "Blend until silky and smooth.",
        "Ladle into bowls and top with crunchy toasted pumpkin seeds."
      ],
      ar: [
        "قشر الجزر وقطعه دوائر.",
        "اطه الجزر والعدس في المرق مع الكمون لمدة 20 دقيقة.",
        "اخلط الشوربة جيداً بالخلاط حتى تصبح ناعمة كالحرير.",
        "اسكب في أوعية وزين ببذور اليقطين المحمصة."
      ]
    }
  },
  {
    id: "m41",
    mealType: "lunch",
    title: {
      fr: "Buddha Bowl Quinoa, Pois Chiches Rôtis & Sauce Tahini",
      en: "Quinoa Buddha Bowl with Crispy Chickpeas & Tahini",
      ar: "بودا باول الكينوا والحمص المحمص وصلصة الطحينة"
    },
    emoji: "🥗",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 440,
    tags: ["mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Quinoa cuit", en: "Cooked quinoa", ar: "كينوا مطبوخة" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Pois chiches égouttés et séchés", en: "Chickpeas", ar: "حمص" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Avocat & Concombre", en: "Avocado & cucumber", ar: "أفوكادو وخيار" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Pâte de sésame (tahini) & Citron", en: "Tahini & lemon juice", ar: "طحينة وعصير ليمون" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites griller les pois chiches à la poêle avec paprika et huile d'olive 8 min jusqu'à ce qu'ils soient croustillants.",
        "Dans un bol, déposez la base de quinoa.",
        "Ajoutez les pois chiches croustillants, les tranches d'avocat et de concombre.",
        "Émulsionnez le tahini avec le jus de citron et un filet d'eau tiède, puis nappez le bowl."
      ],
      en: [
        "Roast chickpeas in a skillet with paprika and oil for 8 mins until crunchy.",
        "Place quinoa at the bottom of a bowl.",
        "Add roasted chickpeas, avocado slices, and cucumber.",
        "Whisk tahini with lemon juice and a splash of water, drizzle over bowl."
      ],
      ar: [
        "حمص الحمص في المقلاة مع البابريكا وزيت الزيتون 8 دقائق حتى يقرمش.",
        "ضع الكينوا في قاع الوعاء.",
        "أضف الحمص المقرمش وشرائح الأفوكادو والخيار.",
        "اخلط الطحينة مع الليمون والماء واسكبها فوق الطبق."
      ]
    }
  },
  {
    id: "m42",
    mealType: "dinner",
    title: {
      fr: "Wok Express de Bœuf Sauté aux Brocolis & Sésame",
      en: "Beef & Broccoli Stir-Fry with Toasted Sesame",
      ar: "ووك اللحم البقري السريع مع البروكلي والسمسم"
    },
    emoji: "🥦",
    prepTime: 8,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCarb", "dietQuick"],
    ingredients: [
      { name: { fr: "Bœuf émincé très fin", en: "Thinly sliced beef", ar: "شرائح لحم رفيعة" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Fleurettes de brocolis frais", en: "Broccoli florets", ar: "قطع بروكلي طازجة" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja & Ail râpé", en: "Soy sauce & garlic", ar: "صلصة صويا وثوم" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Huile de sésame & Graines", en: "Sesame oil & seeds", ar: "زيت وبذور سمسم" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites blanchir les brocolis 3 min dans l'eau bouillante salée, puis égouttez.",
        "Dans un wok très chaud avec l'huile de sésame, faites saisir le bœuf à feu vif 2 minutes.",
        "Ajoutez les brocolis, l'ail et la sauce soja, faites sauter le tout 2 minutes.",
        "Saupoudrez de graines de sésame et servez bien chaud."
      ],
      en: [
        "Blanch broccoli florets in boiling water for 3 mins and drain.",
        "Sear sliced beef in a smoking hot wok with sesame oil for 2 mins.",
        "Toss in broccoli, garlic, and soy sauce for another 2 mins.",
        "Top with sesame seeds and serve piping hot."
      ],
      ar: [
        "اسلق البروكلي 3 دقائق في ماء مغلي ثم صفه.",
        "شوح شرائح اللحم في مقلاة ووك ساخنة مع زيت السمسم دقيقتين.",
        "أضف البروكلي والثوم وصلصة الصويا وقلب دقيقتين.",
        "رش بذور السمسم وقدمه ساخناً."
      ]
    }
  },
  {
    id: "m43",
    mealType: "lunch",
    title: {
      fr: "Filet de Cabillaud Rôti & Sauce Légère Citron-Aneth",
      en: "Roasted Cod Fillet with Lemon-Dill Light Sauce",
      ar: "فيليه سمك القد المشوي مع صلصة الليمون والشبت الخفيفة"
    },
    emoji: "🐟",
    prepTime: 5,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 390,
    tags: ["french", "mediterranean", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Pavé de cabillaud frais", en: "Cod fillet", ar: "فيليه سمك القد" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Riz basmati parfumé", en: "Basmati rice", ar: "أرز بسمتي" }, quantity: 70, unit: "g", dept: "deptPantry" },
      { name: { fr: "Crème liquide légère ou fromage blanc", en: "Light cream", ar: "كريمة خفيفة" }, quantity: 40, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Jus de citron & Aneth frais", en: "Lemon juice & fresh dill", ar: "عصير ليمون وشبت" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites cuire le riz basmati 10 min dans l'eau bouillante salée.",
        "Faites dorer le cabillaud à la poêle avec un filet d'huile 3 min de chaque côté.",
        "Chauffez doucement la crème avec le jus de citron, l'aneth haché, sel et poivre.",
        "Nappez le poisson de sauce crémeuse au citron et servez avec le riz chaud."
      ],
      en: [
        "Cook basmati rice for 10 mins.",
        "Pan-sear cod fillet for 3 mins each side in a little olive oil.",
        "Warm light cream with lemon juice, chopped dill, salt, and pepper.",
        "Spoon velvety lemon sauce over cod and serve alongside rice."
      ],
      ar: [
        "اطه أرز البسمتي 10 دقائق.",
        "اشو فيليه السمك في المقلاة 3 دقائق لكل جهة.",
        "سخن الكريمة مع عصير الليمون والشبت والملح.",
        "اسكب الصلصة الكريمية فوق السمك وقدمه مع الأرز."
      ]
    }
  },
  {
    id: "m44",
    mealType: "dinner",
    title: {
      fr: "Tajine de Boulettes Kefta aux Œufs & Sauce Tomate",
      en: "Moroccan Kefta Meatball Tagine with Poached Eggs",
      ar: "طاجين كفتة بالبيض وصلصة الطماطم المغربية"
    },
    emoji: "🥘",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["maghreb", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Boulettes de bœuf kefta assaisonnées", en: "Spiced beef meatballs", ar: "كرات لحم كفتة" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Coulis de tomate & Tomates fraîches", en: "Tomato sauce", ar: "صلصة طماطم" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Cumin, paprika, ail & persil", en: "Cumin, paprika & herbs", ar: "كمون وبابريكا وبقدونس" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites mijoter le coulis de tomate avec l'ail, l'huile d'olive et les épices 5 min dans une poêle.",
        "Déposez les boulettes de kefta dans la sauce et laissez cuire 6 min en les retournant.",
        "Cassez les œufs sur les boulettes, couvrez et laissez cuire 3 min jusqu'à ce que les œufs soient juste pris.",
        "Parsemez de persil frais et dégustez bien chaud avec du pain marocain."
      ],
      en: [
        "Simmer tomato puree with garlic, spices, and olive oil for 5 mins.",
        "Drop in meatballs and cook for 6 mins, turning occasionally.",
        "Crack eggs over the top, cover, and cook for 3 mins until whites are set.",
        "Garnish with parsley and serve warm with crusty bread."
      ],
      ar: [
        "اترك صلصة الطماطم مع الثوم والبهارات تغلي 5 دقائق.",
        "أضف كرات الكفتة واطهها 6 دقائق مع التقليب.",
        "اكسر البيض فوق الكفتة وغط المقلاة 3 دقائق حتى ينضج البيض.",
        "زين بالبقدونس وقدمه ساخناً مع الخبز."
      ]
    }
  },
  {
    id: "m45",
    mealType: "lunch",
    title: {
      fr: "Omelette Baveuse aux Champignons & Salade Verte",
      en: "French Mushroom Omelette with Crisp Green Salad",
      ar: "أومليت الفطر الفرنسي مع سلطة خضراء"
    },
    emoji: "🍳",
    prepTime: 5,
    cookTime: 6,
    difficulty: "easy",
    caloriesPerPerson: 350,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighProtein", "dietLowCarb", "dietQuick"],
    ingredients: [
      { name: { fr: "Œufs frais bio", en: "Eggs", ar: "بيض" }, quantity: 3, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Champignons de Paris émincés", en: "Sliced mushrooms", ar: "فطر مقطع" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Beurre ou huile d'olive", en: "Butter or olive oil", ar: "زبدة أو زيت زيتون" }, quantity: 10, unit: "g", dept: "deptDairy" },
      { name: { fr: "Ciboulette & Salade verte", en: "Chives & mixed salad", ar: "ثوم معمر وسلطة" }, quantity: 50, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites dorer les champignons émincés dans une poêle avec une noisette de beurre 3 min.",
        "Battez les œufs en omelette avec sel, poivre et ciboulette.",
        "Versez les œufs sur les champignons, ramenez les bords vers le centre 2-3 min pour garder un cœur baveux.",
        "Repliez l'omelette en deux et servez immédiatement avec la salade verte assaisonnée."
      ],
      en: [
        "Sauté sliced mushrooms in butter for 3 mins until golden.",
        "Whisk eggs with salt, pepper, and chopped chives.",
        "Pour eggs into the pan, gently drawing edges towards center for 2-3 mins.",
        "Fold omelette and serve immediately with fresh green salad."
      ],
      ar: [
        "شوح الفطر في الزبدة 3 دقائق.",
        "اخفق البيض مع الملح والفلفل والثوم المعمر.",
        "اسكب البيض فوق الفطر واطهه 2-3 دقائق حتى ينضج برقة.",
        "اطو الأومليت وقدمه فوراً مع السلطة الخضراء."
      ]
    }
  },
  // --- PETITS DÉJEUNERS SUPPLÉMENTAIRES ---
  {
    id: "b8",
    mealType: "breakfast",
    title: {
      fr: "Pancakes Moelleux Banane & Sirop d'Érable",
      en: "Fluffy Banana Pancakes with Maple Syrup",
      ar: "بان كيك الموز الهش مع شراب القيقب"
    },
    emoji: "🥞",
    prepTime: 5,
    cookTime: 6,
    difficulty: "easy",
    caloriesPerPerson: 350,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Banane mûre", en: "Ripe banana", ar: "موزة ناضجة" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Flocons d'avoine mixés", en: "Oat flour", ar: "شوفان مطحون" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Sirop d'érable pur", en: "Maple syrup", ar: "شراب القيقب" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Écrasez la banane à la fourchette dans un bol.",
        "Ajoutez les œufs et les flocons d'avoine, battez pour obtenir une pâte homogène.",
        "Faites cuire des petits disques de pâte 2 min de chaque côté dans une poêle antiadhésive huilée.",
        "Dégustez la pile de pancakes avec un filet de sirop d'érable."
      ],
      en: [
        "Mash banana in a bowl.",
        "Whisk in eggs and ground oats into a smooth batter.",
        "Cook small pancakes for 2 mins each side in a lightly greased skillet.",
        "Stack and drizzle with pure maple syrup."
      ],
      ar: [
        "اهرس الموزة في وعاء.",
        "اخفق البيض ودقيق الشوفان حتى تتجانس العجينة.",
        "اطه قطع البان كيك دقيقتين لكل وجه في مقلاة مدهونة خفيفاً.",
        "قدمها دافئة مع شراب القيقب."
      ]
    }
  },
  {
    id: "b9",
    mealType: "breakfast",
    title: {
      fr: "Smoothie Bowl Exotique Mangue & Graines de Chia",
      en: "Tropical Mango Smoothie Bowl with Chia Seeds",
      ar: "سموذي باول المانجو الاستوائي مع بذور الشيا"
    },
    emoji: "🥭",
    prepTime: 5,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 310,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Mangue congelée ou fraîche", en: "Mango pieces", ar: "قطع مانجو" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Yaourt grec ou végétal", en: "Greek yogurt", ar: "زبادي يوناني" }, quantity: 120, unit: "g", dept: "deptDairy" },
      { name: { fr: "Graines de chia & Noix de coco râpée", en: "Chia & shredded coconut", ar: "بذور الشيا وجوز هند" }, quantity: 15, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Mixez la mangue avec le yaourt grec jusqu'à obtenir une crème onctueuse et glacée.",
        "Versez dans un bol.",
        "Garnissez avec les graines de chia, la noix de coco râpée et quelques tranches de fruits frais."
      ],
      en: [
        "Blend mango with Greek yogurt until thick and creamy.",
        "Pour into a bowl.",
        "Top with chia seeds, shredded coconut, and fresh fruit slices."
      ],
      ar: [
        "اخلط المانجو مع الزبادي اليوناني حتى يصبح كثيفاً وكريمياً.",
        "اسكب في وعاء.",
        "زين ببذور الشيا وجوز الهند وقطع الفواكه."
      ]
    }
  },
  // --- COLLATIONS SUPPLÉMENTAIRES ---
  {
    id: "s5",
    mealType: "snack",
    title: {
      fr: "Energy Balls Dattes, Amandes & Cacao Pur",
      en: "Raw Date, Almond & Cocoa Energy Balls",
      ar: "كرات الطاقة بالتمر واللوز والكاكاو الخام"
    },
    emoji: "🍫",
    prepTime: 8,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 180,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Dattes Medjool dénoyautées", en: "Dates", ar: "تمر" }, quantity: 3, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Amandes entières", en: "Almonds", ar: "لوز" }, quantity: 20, unit: "g", dept: "deptPantry" },
      { name: { fr: "Poudre de cacao pur 100%", en: "Raw cocoa powder", ar: "بودرة كاكاو خام" }, quantity: 1, unit: "c.à.c", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Mixez les dattes avec les amandes et le cacao dans un petit robot jusqu'à former une pâte malléable.",
        "Formez 2 à 3 boules régulières avec les mains.",
        "Placez au frais 10 min avant de déguster pour un encas sain et énergisant."
      ],
      en: [
        "Blend dates, almonds, and cocoa in a food processor until sticky.",
        "Roll into 2-3 balls between your palms.",
        "Chill for 10 mins before enjoying a healthy nutrient boost."
      ],
      ar: [
        "اطحن التمر واللوز والكاكاو في محضر الطعام حتى تتماسك.",
        "شكلها كرات صغيرة بيدك.",
        "اتركها تبرد 10 دقائق لتناول سناك صحي غني بالطاقة."
      ]
    }
  },
  {
    id: "s6",
    mealType: "snack",
    title: {
      fr: "Yaourt Grec au Miel de Fleurs & Noix Concassées",
      en: "Greek Yogurt with Wild Honey & Crushed Walnuts",
      ar: "زبادي يوناني بالعسل الطبيعي والجوز المجروش"
    },
    emoji: "🍯",
    prepTime: 3,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 190,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Yaourt grec authentique", en: "Greek yogurt", ar: "زبادي يوناني" }, quantity: 150, unit: "g", dept: "deptDairy" },
      { name: { fr: "Miel d'acacia ou de fleurs", en: "Pure honey", ar: "عسل نحل" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
      { name: { fr: "Cerneaux de noix concassés", en: "Walnuts", ar: "عين الجمل / جوز" }, quantity: 15, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Déposez le yaourt grec dans un bol ou une verrine.",
        "Versez un filet de miel doré.",
        "Saupoudrez de noix concassées pour une touche gourmande et croquante."
      ],
      en: [
        "Spoon Greek yogurt into a bowl.",
        "Drizzle with raw honey.",
        "Top with crushed walnuts for a crunchy protein snack."
      ],
      ar: [
        "ضع الزبادي اليوناني في وعاء.",
        "اسكب القليل من العسل الطبيعي.",
        "زين بقطع الجوز للحصول على قرمشة لذيذة."
      ]
    }
  },
  {
    id: "m46",
    mealType: "dinner",
    title: {
      fr: "Butter Chicken Doux & Riz Basmati Parfumé",
      en: "Mild Indian Butter Chicken with Fragrant Basmati",
      ar: "بتر تشيكن هندي ناعم مع أرز بسمتي معطر"
    },
    emoji: "🍛",
    prepTime: 12,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 520,
    tags: ["indian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Blancs de poulet coupés en dés", en: "Chicken breast cubes", ar: "مكعبات صدر دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Coulis de tomate & Beurre doux", en: "Tomato puree & butter", ar: "صلصة طماطم وزبدة" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Crème liquide entière ou yaourt", en: "Cream or yogurt", ar: "كريمة أو زبادي" }, quantity: 50, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Garam Masala, curcuma & gingembre", en: "Garam Masala & spices", ar: "بهارات جارام ماسالا" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz basmati cuit", en: "Basmati rice", ar: "أرز بسمتي" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer le poulet dans une sauteuse avec une noisette de beurre et les épices 4 min.",
        "Versez le coulis de tomate et laissez mijoter 10 min à feu doux.",
        "Incorporez la crème et une noix de beurre pour obtenir une sauce soyeuse et nappante.",
        "Servez chaud avec le dôme de riz basmati."
      ],
      en: [
        "Sear chicken cubes with butter and Garam Masala for 4 mins.",
        "Add tomato puree and simmer for 10 mins.",
        "Stir in cream and a knob of butter until velvety.",
        "Serve warm over fragrant basmati rice."
      ],
      ar: [
        "حمر الدجاج مع الزبدة والبهارات 4 دقائق.",
        "أضف صلصة الطماطم واتركه يطهى 10 دقائق.",
        "اخلط الكريمة مع الزبدة للحصول على قوام ناعم وغني.",
        "قدمه مع أرز البسمتي المعطر."
      ]
    }
  },
  {
    id: "m47",
    mealType: "dinner",
    title: {
      fr: "Ramen Express au Poulet, Œuf Mollet & Bok Choy",
      en: "Quick Chicken Ramen with Soft-Boiled Egg & Bok Choy",
      ar: "رامن الدجاج السريع مع البيض المسلوق والملفوف الصيني"
    },
    emoji: "🍜",
    prepTime: 10,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Nouilles ramen ou nouilles de blé", en: "Ramen noodles", ar: "نودلز رامن" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Aiguillettes de poulet grillées", en: "Grilled chicken strips", ar: "شرائح دجاج مشوية" }, quantity: 120, unit: "g", dept: "deptMeat" },
      { name: { fr: "Œuf frais mollet (6 min)", en: "Soft-boiled egg", ar: "بيضة نصف مسلوقة" }, quantity: 1, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Bok choy ou jeunes épinards", en: "Bok choy or spinach", ar: "ملفوف صيني أو سبانخ" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Bouillon de volaille, soja et gingembre", en: "Soy-ginger broth", ar: "مرق الدجاج والصويا" }, quantity: 400, unit: "ml", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Portez le bouillon à ébullition avec un trait de sauce soja et du gingembre râpé.",
        "Plongez les nouilles et le bok choy dans le bouillon frémissant pendant 3-4 minutes.",
        "Versez dans un grand bol à ramen.",
        "Disposez les aiguillettes de poulet dorées, l'œuf mollet coupé en deux et un peu de ciboule."
      ],
      en: [
        "Bring broth to a boil with soy sauce and grated ginger.",
        "Cook noodles and bok choy in broth for 3-4 mins.",
        "Pour into a deep ramen bowl.",
        "Top with sliced chicken, halved soft egg, and scallions."
      ],
      ar: [
        "اغل المرق مع صلصة الصويا والزنجبيل المبشور.",
        "اطه النودلز والملفوف الصيني في المرق 3-4 دقائق.",
        "اسكب في وعاء رامن عميق.",
        "رتب شرائح الدجاج ونصف بيضة مسلوقة مع البصل الأخضر."
      ]
    }
  },
  {
    id: "m48",
    mealType: "lunch",
    title: {
      fr: "Bœuf Sauté aux Oignons Fondants & Riz Parfumé",
      en: "Asian Sizzling Onion Beef with Fragrant Rice",
      ar: "لحم بقري مقلي مع البصل المكرمل والأرز المعطر"
    },
    emoji: "🥩",
    prepTime: 8,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Bœuf émincé très finement", en: "Thinly sliced beef", ar: "شرائح لحم بقري رفيعة" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Gros oignon émincé", en: "Large sliced onion", ar: "بصل شرائح" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Sauce soja & Huile de sésame", en: "Soy sauce & sesame oil", ar: "صلصة صويا وزيت سمسم" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Riz blanc ou jasmin cuit", en: "Steamed rice", ar: "أرز مطبوخ" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir les oignons émincés dans une poêle chaude 5 min jusqu'à ce qu'ils soient translucides et légèrement caramélisés.",
        "Poussez les oignons sur le côté, saisissez le bœuf à feu très vif 2 minutes.",
        "Arrosez de sauce soja et d'un filet d'huile de sésame, mélangez 1 minute.",
        "Dégustez immédiatement sur un bol de riz chaud."
      ],
      en: [
        "Sauté onions in a hot pan for 5 mins until tender and golden.",
        "Push onions aside and sear beef over high heat for 2 mins.",
        "Pour soy sauce and sesame oil, toss together for 1 min.",
        "Serve immediately over a bed of warm rice."
      ],
      ar: [
        "شوح البصل 5 دقائق حتى يذبل ويصبح ذهبياً.",
        "أزح البصل جانباً واشو شرائح اللحم على نار قوية دقيقتين.",
        "أضف صلصة الصويا وزيت السمسم وقلب دقيقة واحدة.",
        "قدمه فوراً فوق وعاء أرز ساخن."
      ]
    }
  },
  {
    id: "m49",
    mealType: "lunch",
    title: {
      fr: "Rouleaux de Printemps Frais aux Crevettes & Menthe",
      en: "Fresh Vietnamese Shrimp & Mint Spring Rolls",
      ar: "لفائف السبرينغ رول الطازجة بالجمبري والنعناع"
    },
    emoji: "🥗",
    prepTime: 15,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 330,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCalorie", "dietQuick"],
    ingredients: [
      { name: { fr: "Galettes de riz", en: "Rice paper sheets", ar: "ورق أرز" }, quantity: 3, unit: "pcs", dept: "deptPantry" },
      { name: { fr: "Crevettes cuites coupées en deux", en: "Cooked shrimp", ar: "جمبري مطبوخ" }, quantity: 120, unit: "g", dept: "deptMeat" },
      { name: { fr: "Vermicelles de riz & Carotte râpée", en: "Rice vermicelli & carrot", ar: "شعيرية أرز وجزر" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Feuilles de menthe fraîche & Salade", en: "Fresh mint & lettuce", ar: "نعناع طازج وخس" }, quantity: 30, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce cacahuète ou nem légère", en: "Peanut dipping sauce", ar: "صلصة الفول السوداني" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Trempez une galette de riz dans de l'eau tiède 10 secondes et posez-la sur un torchon propre.",
        "Déposez salade, vermicelles, carotte râpée, menthe et les crevettes.",
        "Rabattez les bords latéraux et roulez fermement vers le haut.",
        "Servez frais avec la sauce dip aux cacahuètes."
      ],
      en: [
        "Dip rice paper in warm water for 10 secs and lay on clean towel.",
        "Layer lettuce, vermicelli, carrots, mint, and halved shrimp.",
        "Fold sides in and roll tightly upwards.",
        "Serve fresh with peanut dipping sauce."
      ],
      ar: [
        "اغمس ورقة الأرز في ماء دافئ 10 ثوان وضعها على سطح نظيف.",
        "ضع الخس والشعيرية والجزر والنعناع والجمبري.",
        "اطو الجوانب ولفها بإحكام للأعلى.",
        "قدمها طازجة مع صلصة الفول السوداني."
      ]
    }
  },
  {
    id: "m50",
    mealType: "dinner",
    title: {
      fr: "Gnocchis Poêlés aux Épinards Frais & Gorgonzola Doux",
      en: "Pan-Seared Gnocchi with Baby Spinach & Mild Gorgonzola",
      ar: "نيوكي مقلي مع السبانخ الطازجة وجبن الجورجونزولا"
    },
    emoji: "🥔",
    prepTime: 5,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 480,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Gnocchis à poêler de qualité", en: "Pan-fry gnocchi", ar: "نيوكي" }, quantity: 180, unit: "g", dept: "deptPantry" },
      { name: { fr: "Jeunes pousses d'épinards", en: "Baby spinach", ar: "سبانخ صغيرة" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Gorgonzola doux ou ricotta", en: "Gorgonzola or ricotta", ar: "جبن جورجونزولا أو ريكوتا" }, quantity: 40, unit: "g", dept: "deptDairy" },
      { name: { fr: "Crème légère & Noisette de beurre", en: "Light cream & butter", ar: "كريمة خفيفة وزبدة" }, quantity: 30, unit: "ml", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites dorer les gnocchis 5 min dans une poêle avec le beurre jusqu'à ce qu'ils soient croustillants à l'extérieur.",
        "Ajoutez les épinards qui vont fondre en 2 minutes.",
        "Incorporez le gorgonzola en morceaux et la crème, laissez fondre à feu doux pour enrober les gnocchis.",
        "Servez immédiatement bien chaud avec du poivre concassé."
      ],
      en: [
        "Pan-sear gnocchi in butter for 5 mins until crisp outside and soft inside.",
        "Add baby spinach and let it wilt for 2 mins.",
        "Stir in gorgonzola and cream until melted into a creamy coating.",
        "Serve hot with cracked black pepper."
      ],
      ar: [
        "حمر النيوكي في الزبدة 5 دقائق حتى يقرمش من الخارج.",
        "أضف أوراق السبانخ واتركها تذبل دقيقتين.",
        "اخلط الجبن والكريمة حتى تذوب وتغلف النيوكي.",
        "قدمه ساخناً مع الفلفل الأسود."
      ]
    }
  },
  {
    id: "m51",
    mealType: "lunch",
    title: {
      fr: "Salade Grecque Complète aux Olives Kalamata & Feta AOP",
      en: "Traditional Greek Salad with Kalamata Olives & Feta",
      ar: "سلطة يونانية تقليدية بجبن الفيتا وزيتون كالاماتا"
    },
    emoji: "🥗",
    prepTime: 10,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Tomates mûres de saison", en: "Ripe tomatoes", ar: "طماطم طازجة" }, quantity: 2, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Concombre croquant", en: "Crisp cucumber", ar: "خيار مقرمش" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Feta grecque AOP en bloc", en: "Greek feta block", ar: "جبن فيتا يوناني" }, quantity: 60, unit: "g", dept: "deptDairy" },
      { name: { fr: "Olives Kalamata noires", en: "Kalamata olives", ar: "زيتون كالاماتا" }, quantity: 30, unit: "g", dept: "deptPantry" },
      { name: { fr: "Huile d'olive extra vierge & Origan", en: "Olive oil & oregano", ar: "زيت زيتون وزعتر بري" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Coupez les tomates et le concombre en morceaux généreux.",
        "Émincez un quart d'oignon rouge en fines lamelles.",
        "Disposez les légumes et les olives Kalamata dans une assiette creuse.",
        "Déposez une belle tranche de feta par-dessus, arrosez d'huile d'olive et saupoudrez d'origan séché."
      ],
      en: [
        "Chop tomatoes and cucumber into chunky bites.",
        "Slice a little red onion thinly.",
        "Place veggies and Kalamata olives in a shallow bowl.",
        "Crown with a thick feta block, drizzle olive oil and dust with oregano."
      ],
      ar: [
        "قطع الطماطم والخيار إلى قطع متوسطة.",
        "قطع البصل الأحمر شرائح رقيقة.",
        "ضع الخضار والزيتون في صحن التقديم.",
        "ضع قطعة الفيتا في الأعلى واسكب زيت الزيتون ورش الأوريجانو."
      ]
    }
  },
  {
    id: "m52",
    mealType: "dinner",
    title: {
      fr: "Escalope Milanaise Croustillante & Tagliatelles au Basilic",
      en: "Crispy Milanese Cutlet with Basil Tagliatelle",
      ar: "إسكالوب دجاج ميلانيز المقرمش مع باستا الريحان"
    },
    emoji: "🍝",
    prepTime: 12,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 540,
    tags: ["italian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Escalope de dinde ou poulet aplatie", en: "Thin poultry cutlet", ar: "إسكالوب دجاج رفيع" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Chapelure dorée & Œuf", en: "Breadcrumbs & egg", ar: "بقسماط وبيض" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Tagliatelles fraîches", en: "Tagliatelle pasta", ar: "باستا تالياتيلي" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Coulis de tomate & Basilic frais", en: "Tomato sauce & basil", ar: "صلصة طماطم وريحان" }, quantity: 100, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Passez l'escalope dans l'œuf battu puis dans la chapelure pour bien la paner.",
        "Faites dorer l'escalope 3-4 min par face dans une poêle huilée jusqu'à ce qu'elle soit croustillante.",
        "Faites cuire les tagliatelles al dente (3 min) et réchauffez le coulis de tomate.",
        "Servez l'escalope dorée avec les pâtes nappées de sauce tomate et de basilic frais."
      ],
      en: [
        "Dredge cutlet in beaten egg then press into breadcrumbs.",
        "Pan-fry for 3-4 mins each side until crispy and golden.",
        "Boil tagliatelle for 3 mins and warm tomato sauce.",
        "Serve crunchy cutlet alongside pasta with tomato basil sauce."
      ],
      ar: [
        "اغمس الإسكالوب في البيض المخفوق ثم في البقسماط.",
        "اقل الإسكالوب 3-4 دقائق لكل جهة حتى يقرمش ويصبح ذهبياً.",
        "اسلق المعكرونة 3 دقائق وسخن صلصة الطماطم.",
        "قدم الإسكالوب مع الباستا بصلصة الطماطم والريحان."
      ]
    }
  },
  {
    id: "m53",
    mealType: "dinner",
    title: {
      fr: "Minestrone Gourmand Toscan aux Légumes & Petites Pâtes",
      en: "Tuscan Vegetable Minestrone Soup with Ditalini Pasta",
      ar: "شوربة المينيستروني الإيطالية الغنية بالخضار والباستا"
    },
    emoji: "🥣",
    prepTime: 12,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Courgette, carotte & haricots blancs", en: "Zucchini, carrot & cannellini", ar: "كوسة وجزر وفاصوليا بيضاء" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Tomates concassées & Bouillon", en: "Diced tomatoes & broth", ar: "طماطم معصورة ومرق" }, quantity: 200, unit: "g", dept: "deptPantry" },
      { name: { fr: "Petites pâtes (coquillettes ou ditalini)", en: "Small pasta", ar: "معكرونة صغيرة" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Parmesan râpé & Huile d'olive", en: "Parmesan & olive oil", ar: "جبن بارميزان وزيت زيتون" }, quantity: 15, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Coupez les légumes en petits dés réguliers et faites-les suer 3 min dans l'huile d'olive.",
        "Ajoutez les tomates concassées, les haricots blancs et 500ml de bouillon.",
        "Laissez mijoter 12 minutes, puis ajoutez les petites pâtes pour les 8 dernières minutes.",
        "Servez bien chaud parsemé de parmesan fraîchement râpé."
      ],
      en: [
        "Dice vegetables and sauté in olive oil for 3 mins.",
        "Add canned tomatoes, white beans, and 500ml broth.",
        "Simmer for 12 mins, then toss in small pasta for the remaining 8 mins.",
        "Ladle into bowls and dust with grated parmesan."
      ],
      ar: [
        "قطع الخضار مكعبات صغيرة وشوحها في زيت الزيتون 3 دقائق.",
        "أضف الطماطم والفاصوليا البيضاء ونصف لتر مرق.",
        "اتركه يغلي 12 دقيقة ثم أضف المعكرونة واطه 8 دقائق أخرى.",
        "قدم الشوربة ساخنة مع رشة من جبن البارميزان."
      ]
    }
  },
  {
    id: "m54",
    mealType: "dinner",
    title: {
      fr: "Chorba Frik Traditionnelle à la Coriandre & Menthe",
      en: "Traditional Cracked Green Wheat Chorba Frik",
      ar: "شوربة الفريك التقليدية بالكزبرة والنعناع المجفف"
    },
    emoji: "🥣",
    prepTime: 10,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 390,
    tags: ["maghreb", "dietBalanced", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Dés d'agneau ou poulet tendre", en: "Lamb or chicken pieces", ar: "قطع لحم أو دجاج" }, quantity: 100, unit: "g", dept: "deptMeat" },
      { name: { fr: "Blé vert concassé (Frik)", en: "Cracked green wheat (frik)", ar: "فريك القمح الأخضر" }, quantity: 50, unit: "g", dept: "deptPantry" },
      { name: { fr: "Coulis de tomate & Tomates fraîches", en: "Tomato sauce & fresh tomatoes", ar: "صلصة طماطم" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Pois chiches cuits, céleri & coriandre", en: "Chickpeas, celery & cilantro", ar: "حمص وكرفس وكزبرة" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Ras el Hanout, cannelle & menthe séchée", en: "Chorba spices & dried mint", ar: "رأس الحانوت ونعناع مجفف" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites revenir la viande avec l'oignon émincé, le céleri, l'huile et les épices 4 min.",
        "Ajoutez la pulpe de tomate, les pois chiches et 600ml d'eau chaude.",
        "Rincez le frik et versez-le en pluie dans la marmite frémissante.",
        "Laissez cuire 20 minutes à feu doux en remuant de temps en temps. Saupoudrez de menthe séchée avant de servir."
      ],
      en: [
        "Brown meat with onion, celery, oil, and spices for 4 mins.",
        "Add tomato puree, chickpeas, and 600ml hot water.",
        "Rinse frik and pour into the simmering soup.",
        "Cook for 20 mins stirring occasionally. Garnish with rubbed dried mint."
      ],
      ar: [
        "شوح اللحم مع البصل والكرفس والبهارات 4 دقائق.",
        "أضف الطماطم والحمص والماء الساخن.",
        "اغسل الفريك وأضفه إلى الشوربة المغلية.",
        "اتركه يطهى 20 دقيقة على نار هادئة، وزين بالنعناع المجفف."
      ]
    }
  },
  {
    id: "m55",
    mealType: "lunch",
    title: {
      fr: "Bricks Dorées au Thon, Œuf Coulant & Persil Frais",
      en: "Crispy Tuna & Egg Brik Pastries with Green Salad",
      ar: "بريك التونة المقرمش بالبيض والجبن والبقدونس"
    },
    emoji: "🥟",
    prepTime: 8,
    cookTime: 6,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["maghreb", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Feuilles de brick (Malsouka)", en: "Brik pastry sheets", ar: "أوراق الملسوقة / ديول" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Thon au naturel égoutté", en: "Canned tuna", ar: "تونة معلبة" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Persil plat, oignon haché & câpres", en: "Parsley, onion & capers", ar: "بقدونس وبصل وكبر" }, quantity: 30, unit: "g", dept: "deptProduce" },
      { name: { fr: "Quartiers de citron & Salade", en: "Lemon & side salad", ar: "ليمون وسلطة" }, quantity: 40, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Déposez une feuille de brick dans une assiette creuse.",
        "Garnissez d'un lit de thon émietté, persil et oignon, puis cassez délicatement un œuf au centre.",
        "Repliez la feuille en triangle ou demi-lune et glissez immédiatement dans une poêle chaude huilée.",
        "Faites dorer 2 min de chaque côté pour que la feuille soit croustillante et le jaune coulant. Servez avec du citron."
      ],
      en: [
        "Place a brik sheet in a shallow plate.",
        "Add a layer of flaked tuna, parsley, and onion, then crack an egg in center.",
        "Fold into triangle and slide into a hot oiled skillet.",
        "Fry for 2 mins each side until golden and crisp. Serve with lemon wedges."
      ],
      ar: [
        "ضع ورقة البريك في صحن عميق.",
        "احش بالتونة والبقدونس والبصل واكسر بيضة في المنتصف.",
        "اطو الورقة على شكل مثلث وضعها في زيت ساخن.",
        "اقلها دقيقتين لكل جهة حتى تصبح مقرمشة وقدمها مع الليمون."
      ]
    }
  },
  {
    id: "m56",
    mealType: "dinner",
    title: {
      fr: "Poulet Rôti aux Épices Zaatar & Frites de Patates Douces",
      en: "Zaatar Roasted Chicken with Crispy Sweet Potato Fries",
      ar: "دجاج مشوي ببهارات الزعتر مع بطاطا حلوة مقرمشة"
    },
    emoji: "🍗",
    prepTime: 10,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["mediterranean", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Cuisses ou suprêmes de poulet", en: "Chicken thighs or breasts", ar: "أفخاذ أو صدور دجاج" }, quantity: 180, unit: "g", dept: "deptMeat" },
      { name: { fr: "Patate douce coupée en frites", en: "Sweet potato fries", ar: "بطاطا حلوة مقطعة أصابع" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Épices Zaatar & Huile d'olive", en: "Zaatar spice blend & oil", ar: "خلطة بهارات زعتر وزيت" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Yaourt grec à l'ail (sauce dip)", en: "Garlic yogurt dip", ar: "صوص زبادي بالثوم" }, quantity: 50, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 200°C.",
        "Massez le poulet et les frites de patates douces avec l'huile d'olive, le zaatar, sel et poivre.",
        "Disposez sur une plaque recouverte de papier cuisson et enfournez 25 minutes jusqu'à ce que le poulet soit doré et juteux.",
        "Servez avec une sauce au yaourt grec aillé et citronné."
      ],
      en: [
        "Preheat oven to 200°C (400°F).",
        "Rub chicken and sweet potato wedges with olive oil, zaatar, salt and pepper.",
        "Bake on a baking tray for 25 mins until golden and juicy.",
        "Serve with refreshing garlic yogurt dip."
      ],
      ar: [
        "سخن الفرن على 200 مئوية.",
        "تبل الدجاج والبطاطا الحلوة بزيت الزيتون والزعتر والملح.",
        "رتبها في صينية واخبزها 25 دقيقة حتى تنضج وتتحمر.",
        "قدمها مع صوص الزبادي بالثوم والليمون."
      ]
    }
  },
  {
    id: "m57",
    mealType: "lunch",
    title: {
      fr: "Falafels Maison Croustillants & Salade Fattouche",
      en: "Crispy Homemade Falafels with Fattoush Salad",
      ar: "فلافل مقرمشة بيتي مع سلطة فتوش منعشة"
    },
    emoji: "🧆",
    prepTime: 15,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 430,
    tags: ["mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Pois chiches trempés ou cuits", en: "Chickpeas", ar: "حمص منقوع أو مطبوخ" }, quantity: 150, unit: "g", dept: "deptPantry" },
      { name: { fr: "Persil, coriandre fraîche, ail & oignon", en: "Fresh herbs, garlic & onion", ar: "بقدونس وكزبرة وثوم" }, quantity: 40, unit: "g", dept: "deptProduce" },
      { name: { fr: "Cumin, coriandre moulue & bicarbonate", en: "Cumin & falafel spices", ar: "كمون وبهارات فلافل" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Salade romaine, concombre, radis & sumac", en: "Fattoush veggies & sumac", ar: "خس وخيار وفجل وسماق" }, quantity: 100, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Mixez les pois chiches avec les herbes fraîches, l'ail, l'oignon et les épices pour obtenir une pâte granuleuse.",
        "Façonnez des boulettes aplaties avec les mains.",
        "Faites dorer les falafels à la poêle avec un filet d'huile 3 min par face.",
        "Dressez avec la salade fattouche assaisonnée à l'huile d'olive, citron et sumac."
      ],
      en: [
        "Blend chickpeas with herbs, garlic, onion, and spices into a textured dough.",
        "Shape into patties with your hands.",
        "Pan-fry in hot oil for 3 mins each side until deep golden.",
        "Serve alongside fresh fattoush salad tossed in lemon sumac dressing."
      ],
      ar: [
        "اطحن الحمص مع الأعشاب والثوم والتوابل حتى تصبح عجينة متماسكة.",
        "شكل أقراص الفلافل بيدك.",
        "اقل الفلافل 3 دقائق لكل جهة حتى تصبح ذهبية ومقرمشة.",
        "قدمها مع سلطة الفتوش المنعشة بالسماق والليمون."
      ]
    }
  },
  {
    id: "m58",
    mealType: "dinner",
    title: {
      fr: "Poulet Basquaise Traditionnel Mijoté aux Poivrons",
      en: "Traditional Basque Stewed Chicken with Sweet Peppers",
      ar: "دجاج باسكيز الفرنسي المطهو مع الفلفل الحلو والطماطم"
    },
    emoji: "🍗",
    prepTime: 12,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 470,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Morceaux de poulet fermier", en: "Chicken pieces", ar: "قطع دجاج" }, quantity: 170, unit: "g", dept: "deptMeat" },
      { name: { fr: "Poivrons rouge et vert émincés", en: "Red & green peppers", ar: "فلفل أحمر وأخضر" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Tomates mûres concassées", en: "Crushed tomatoes", ar: "طماطم مقطعة" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Piment d'Espelette, ail & thym", en: "Espelette pepper & garlic", ar: "ثوم وزعتر وفلفل إسبيليت" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
      { name: { fr: "Riz blanc ou pommes de terre vapeur", en: "Steamed rice or potatoes", ar: "أرز أو بطاطس مسلوقة" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer les morceaux de poulet dans une cocotte avec l'huile d'olive 5 min, puis réservez.",
        "Faites revenir les poivrons émincés et l'ail 5 min.",
        "Remettez le poulet, ajoutez les tomates, le piment d'Espelette et le thym.",
        "Couvrez et laissez mijoter doucement 20 minutes. Servez avec du riz blanc."
      ],
      en: [
        "Brown chicken pieces in olive oil for 5 mins, then set aside.",
        "Sauté sliced peppers and garlic in the same pot for 5 mins.",
        "Return chicken, add tomatoes, Espelette pepper, and thyme.",
        "Cover and simmer for 20 mins. Serve with warm white rice."
      ],
      ar: [
        "حمر قطع الدجاج في الزيت 5 دقائق ثم ارفعها جانباً.",
        "شوح الفلفل والثوم في نفس القدر 5 دقائق.",
        "أعد الدجاج وأضف الطماطم والبهارات والزعتر.",
        "غط القدر واتركه ينضج 20 دقيقة وقدمه مع الأرز الأبيض."
      ]
    }
  },
  {
    id: "m59",
    mealType: "lunch",
    title: {
      fr: "Blanquette Fondante de Volaille aux Carottes & Champignons",
      en: "Tender Turkey Blanquette in Velvety White Sauce",
      ar: "بلانكيت الدجاج الفرنسية بصلصة بيضاء ناعمة وفطر وجزر"
    },
    emoji: "🍲",
    prepTime: 12,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Escalope de dinde ou poulet en morceaux", en: "Turkey or chicken chunks", ar: "قطع ديك رومي أو دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Carottes fraîches en rondelles", en: "Sliced carrots", ar: "جزر شرائح" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Champignons de Paris émincés", en: "Mushrooms", ar: "فطر مقطع" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Crème liquide & Jaune d'œuf", en: "Cream & egg yolk", ar: "كريمة وصفار بيض" }, quantity: 40, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Riz blanc parfumé", en: "White rice", ar: "أرز أبيض" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites pocher la volaille et les carottes dans 400ml de bouillon pendant 15 minutes.",
        "Faites sauter les champignons au beurre 4 minutes.",
        "Prélevez une louche de bouillon chaud et fouettez-la avec la crème et le jaune d'œuf hors du feu.",
        "Versez la liaison veloutée dans la cocotte pour napper la viande et les légumes. Servez avec le riz."
      ],
      en: [
        "Simmer poultry and carrots in broth for 15 mins.",
        "Sauté mushrooms in butter for 4 mins.",
        "Whisk warm broth with cream and egg yolk off heat.",
        "Stir silky sauce back into pot to coat meat and carrots. Serve over rice."
      ],
      ar: [
        "اسلق الدجاج والجزر في المرق 15 دقيقة.",
        "شوح الفطر في الزبدة 4 دقائق.",
        "اخفق قليل من المرق الدافئ مع الكريمة وصفار البيض.",
        "اسكب الصلصة الكريمية فوق الدجاج والخضار وقدمه مع الأرز."
      ]
    }
  },
  {
    id: "m60",
    mealType: "dinner",
    title: {
      fr: "Hachis Parmentier Maison au Bœuf & Purée Dorée au Four",
      en: "Classic French Beef Hachis Parmentier Potato Pie",
      ar: "هاشي بارمنتييه بيتي باللحم المفروم والبطاطس البوريه"
    },
    emoji: "🥧",
    prepTime: 15,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 520,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Bœuf haché maigre 5% MG", en: "Lean minced beef", ar: "لحم مفروم قليل الدسم" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Pommes de terre à purée", en: "Mashing potatoes", ar: "بطاطس للبيوريه" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Oignon, ail, persil & coulis", en: "Onion, garlic & herbs", ar: "بصل وثوم وبقدونس" }, quantity: 50, unit: "g", dept: "deptProduce" },
      { name: { fr: "Lait, beurre & emmental râpé", en: "Milk, butter & cheese", ar: "حليب وزبدة وجبن" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites cuire les pommes de terre 15 min dans l'eau bouillante et écrasez-les en purée avec le lait et le beurre.",
        "Faites revenir le bœuf avec l'oignon, l'ail et le persil 6 min.",
        "Dans un plat à gratin, déposez la viande hachée au fond et recouvrez de la purée.",
        "Saupoudrez de fromage et enfournez 20 min à 200°C pour gratiner."
      ],
      en: [
        "Boil potatoes for 15 mins and mash with milk and butter.",
        "Sauté minced beef with onion, garlic, and parsley for 6 mins.",
        "Spread meat in a baking dish and top with mashed potatoes.",
        "Sprinkle cheese and bake at 200°C for 20 mins until golden brown."
      ],
      ar: [
        "اسلق البطاطس 15 دقيقة واهرسها مع الحليب والزبدة.",
        "شوح اللحم المفروم مع البصل والثوم والبقدونس 6 دقائق.",
        "ضع اللحم في صينية الفرن وافرش فوقه البطاطس المهروسة.",
        "رش الجبن واخبز 20 دقيقة على 200 مئوية حتى يتحمر."
      ]
    }
  },
  {
    id: "m61",
    mealType: "dinner",
    title: {
      fr: "Velouté de Potimarron Rôti & Graines de Courge Croquantes",
      en: "Roasted Red Kuri Pumpkin Soup with Toasted Seeds",
      ar: "شوربة القرع العسلي المشوي مع بذور اليقطين المقرمشة"
    },
    emoji: "🥣",
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 290,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber", "dietLowCalorie"],
    ingredients: [
      { name: { fr: "Potimarron bio (avec la peau)", en: "Red kuri squash", ar: "قرع عسلي" }, quantity: 250, unit: "g", dept: "deptProduce" },
      { name: { fr: "Bouillon de légumes", en: "Vegetable broth", ar: "مرق خضار" }, quantity: 350, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Crème liquide ou lait de coco", en: "Cream or coconut milk", ar: "كريمة أو حليب جوز هند" }, quantity: 30, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Noix de muscade & Graines de courge", en: "Nutmeg & pumpkin seeds", ar: "جوزة الطيب وبذور يقطين" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Coupez le potimarron en cubes (la peau se mange et donne une belle couleur).",
        "Faites cuire dans le bouillon frémissant 18 minutes jusqu'à tendreté.",
        "Mixez finement avec la crème, la muscade, sel et poivre.",
        "Servez dans des bols chauds parsemé de graines de courge grillées."
      ],
      en: [
        "Dice squash into cubes (edible skin adds color).",
        "Cook in simmering broth for 18 mins until fork tender.",
        "Blend smooth with cream, nutmeg, salt, and pepper.",
        "Serve hot topped with crunchy roasted pumpkin seeds."
      ],
      ar: [
        "قطع القرع إلى مكعبات.",
        "اطه في المرق المغلي 18 دقيقة حتى يطرى.",
        "اخلط بالخلاط مع الكريمة وجوزة الطيب والملح حتى ينعم.",
        "اسكب في أوعية وزين ببذور اليقطين المحمصة."
      ]
    }
  },
  {
    id: "m62",
    mealType: "lunch",
    title: {
      fr: "Tarte Fine aux Poireaux Fondants & Pavé de Saumon",
      en: "Crisp Leek & Fresh Salmon Tart",
      ar: "تارت الكراث المكرمل وفيليه السلمون"
    },
    emoji: "🥧",
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Pâte feuilletée ou brisée", en: "Puff pastry sheet", ar: "عجينة مورقة" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Blancs de poireaux émincés", en: "Sliced leeks", ar: "كراث مقطع" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Pavé de saumon frais en dés", en: "Fresh salmon cubes", ar: "مكعبات سلمون طازج" }, quantity: 120, unit: "g", dept: "deptMeat" },
      { name: { fr: "Fromage frais ou ricotta & Moutarde", en: "Cream cheese & mustard", ar: "جبن كريمي وخردل" }, quantity: 40, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 190°C.",
        "Faites suer les poireaux 7 min à la poêle avec un filet d'huile.",
        "Étalez la pâte, tartinez de ricotta/moutarde, disposez les poireaux fondants et les dés de saumon cru.",
        "Enfournez 20 minutes jusqu'à ce que la pâte soit dorée et croustillante."
      ],
      en: [
        "Preheat oven to 190°C (375°F).",
        "Sauté leeks in a pan for 7 mins until tender.",
        "Roll out pastry, spread ricotta, layer leeks and raw salmon cubes.",
        "Bake for 20 mins until crust is crisp and golden."
      ],
      ar: [
        "سخن الفرن على 190 مئوية.",
        "شوح الكراث في المقلاة 7 دقائق حتى يذبل.",
        "افرد العجينة وادهنها بالجبن ثم وزع الكراث ومكعبات السلمون.",
        "اخبز 20 دقيقة حتى تصبح العجينة ذهبية ومقرمشة."
      ]
    }
  },
  {
    id: "m63",
    mealType: "lunch",
    title: {
      fr: "Salade Niçoise Authentique au Thon & Haricots Verts",
      en: "Authentic French Nicoise Salad with Tuna & Green Beans",
      ar: "سلطة نيسواز الفرنسية بالتونة والبيض والفاصوليا الخضراء"
    },
    emoji: "🥗",
    prepTime: 10,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 390,
    tags: ["french", "mediterranean", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Thon blanc au naturel", en: "Canned albacore tuna", ar: "تونة بيضاء" }, quantity: 120, unit: "g", dept: "deptPantry" },
      { name: { fr: "Œuf dur (cuit 9 min)", en: "Hard-boiled egg", ar: "بيضة مسلوقة" }, quantity: 1, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Haricots verts cuits froids", en: "Cooked green beans", ar: "فاصوليا خضراء مطبوخة" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Tomates, olives noires & radis", en: "Tomatoes & olives", ar: "طماطم وزيتون وفجل" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Vinaigrette à l'huile d'olive & moutarde", en: "Olive oil vinaigrette", ar: "صلصة زيت الزيتون والخردل" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites cuire les haricots verts 6 min à l'eau bouillante et plongez-les dans l'eau glacée pour fixer leur belle couleur verte.",
        "Dans une grande assiette, dressez les haricots verts, les tomates en quartiers et les rondelles de radis.",
        "Ajoutez le thon émietté, l'œuf dur coupé en deux et les olives noires.",
        "Nappez de vinaigrette à la moutarde à l'ancienne."
      ],
      en: [
        "Boil green beans for 6 mins and shock in ice water.",
        "Arrange green beans, tomato wedges, and radish slices on a platter.",
        "Top with flaked tuna, halved hard-boiled egg, and black olives.",
        "Drizzle with wholegrain mustard vinaigrette."
      ],
      ar: [
        "اسلق الفاصوليا الخضراء 6 دقائق وضعها في ماء مثلج.",
        "رتب الفاصوليا وقطع الطماطم وشرائح الفجل في طبق كبير.",
        "أضف التونة والبيض المسلوق والزيتون الأسود.",
        "اسكب صلصة الخردل وزيت الزيتون."
      ]
    }
  },
  {
    id: "m64",
    mealType: "lunch",
    title: {
      fr: "Burrito Bowl Mexicain au Bœuf Épicé & Guacamole",
      en: "Mexican Beef Burrito Bowl with Fresh Guacamole",
      ar: "بوريتو باول اللحم المفروم والأرز والجاكامولي"
    },
    emoji: "🥑",
    prepTime: 10,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Bœuf haché 5% MG assaisonné", en: "Spiced minced beef", ar: "لحم مفروم متبل" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Riz blanc à la coriandre", en: "Cilantro rice", ar: "أرز بالكزبرة" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Haricots noirs & Maïs doux", en: "Black beans & sweet corn", ar: "فاصوليا سوداء وذرة" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Avocat écrasé au citron vert (guacamole)", en: "Guacamole", ar: "جاكامولي أفوكادو" }, quantity: 60, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites dorer le bœuf à la poêle avec du cumin et paprika pendant 6 minutes.",
        "Dans un grand bol, déposez le riz à la coriandre.",
        "Disposez par sections : le bœuf chaud, les haricots noirs, le maïs et le guacamole.",
        "Arrosez d'un filet de jus de citron vert avant de déguster."
      ],
      en: [
        "Brown minced beef with cumin and paprika for 6 mins.",
        "Place cilantro rice at the bottom of a bowl.",
        "Arrange beef, black beans, sweet corn, and guacamole side by side.",
        "Squeeze fresh lime juice over everything."
      ],
      ar: [
        "شوح اللحم المفروم مع الكمون والبابريكا 6 دقائق.",
        "ضع الأرز بالكزبرة في وعاء.",
        "رتب اللحم والفاصوليا والذرة والجاكامولي.",
        "اعصر الليمون الأخضر فوق الطبق."
      ]
    }
  },
  {
    id: "m65",
    mealType: "dinner",
    title: {
      fr: "Enchiladas Gourmandes au Poulet & Coulis Gratiné",
      en: "Baked Cheesy Chicken Enchiladas",
      ar: "إنشيلادا الدجاج المخبوزة بصلصة الطماطم والجبن"
    },
    emoji: "🌯",
    prepTime: 12,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 530,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Tortillas de maïs ou blé", en: "Tortillas", ar: "تورتيلا" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Poulet cuit effiloché", en: "Shredded cooked chicken", ar: "دجاج مسحب" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Coulis de tomate aux épices mexicaines", en: "Spiced tomato sauce", ar: "صلصة طماطم مكسيكية" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Cheddar ou mozzarella râpée", en: "Shredded cheese", ar: "جبن مبشور" }, quantity: 35, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 190°C.",
        "Garnissez les tortillas de poulet effiloché avec 2 cuillères de coulis et roulez-les serrées.",
        "Déposez les rouleaux dans un plat à four, recouvrez du reste de coulis de tomate.",
        "Saupoudrez généreusement de fromage râpé et enfournez 18 minutes jusqu'à ce que le dessus soit gratiné et bouillonnant."
      ],
      en: [
        "Preheat oven to 190°C (375°F).",
        "Fill tortillas with shredded chicken and a spoon of sauce, roll tightly.",
        "Place in a baking dish, pour remaining sauce all over.",
        "Top with cheese and bake for 18 mins until bubbly and melted."
      ],
      ar: [
        "سخن الفرن على 190 مئوية.",
        "احش التورتيلا بالدجاج وقليل من الصلصة ولفها بإحكام.",
        "رتب اللفائف في صينية واسكب باقي الصلصة فوقها.",
        "رش الجبن واخبز 18 دقيقة حتى يذوب ويتحمر."
      ]
    }
  },
  {
    id: "m66",
    mealType: "lunch",
    title: {
      fr: "Quesadillas Croustillantes Poivrons, Maïs & Fromage Fondu",
      en: "Crispy Cheese, Corn & Bell Pepper Quesadillas",
      ar: "كاساديا الجبن المقرمشة بالفلفل الحلو والذرة"
    },
    emoji: "🧀",
    prepTime: 6,
    cookTime: 6,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["mexican", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Grandes galettes tortillas", en: "Flour tortillas", ar: "تورتيلا قمح" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Poivron émincé & Maïs doux", en: "Diced pepper & sweet corn", ar: "فلفل مقطع وذرة" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Fromage fondant râpé (cheddar/mozzarella)", en: "Melting cheese", ar: "جبن مبشور" }, quantity: 50, unit: "g", dept: "deptDairy" },
      { name: { fr: "Salsa de tomate fraîche", en: "Fresh salsa", ar: "صلصة سالسا طازجة" }, quantity: 40, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Posez une tortilla dans une poêle chaude, garnissez la moitié de fromage, poivrons et maïs.",
        "Repliez la tortilla en deux (demi-lune).",
        "Faites dorer 3 min de chaque côté jusqu'à ce que la galette soit croustillante et le fromage parfaitement fondu.",
        "Coupez en triangles et servez avec la salsa de tomate."
      ],
      en: [
        "Lay tortilla in a warm pan, cover half with cheese, peppers, and corn.",
        "Fold tortilla over into a half-moon.",
        "Cook for 3 mins each side until crispy and cheese is melted.",
        "Slice into wedges and serve with fresh tomato salsa."
      ],
      ar: [
        "ضع التورتيلا في مقلاة دافئة وضع الجبن والفلفل والذرة على نصفها.",
        "اطو التورتيلا نصفين.",
        "حمر 3 دقائق لكل جهة حتى تقرمش ويذوب الجبن تماماً.",
        "قطع إلى مثلثات وقدمها مع صلصة السالسا."
      ]
    }
  },
  {
    id: "m67",
    mealType: "lunch",
    title: {
      fr: "Ceviche Frais de Cabillaud à la Mangue & Coriandre",
      en: "Fresh Cod Ceviche with Mango, Lime & Cilantro",
      ar: "سيفيتشي سمك القد المنعش بالمانجو والليمون والكزبرة"
    },
    emoji: "🐟",
    prepTime: 12,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 310,
    tags: ["latin", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCalorie", "dietQuick"],
    ingredients: [
      { name: { fr: "Filet de cabillaud ultra frais en dés", en: "Fresh cod cubes", ar: "مكعبات سمك قد طازج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Jus de 2 citrons verts frais", en: "Fresh lime juice", ar: "عصير ليمون أخضر" }, quantity: 2, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Mangue mûre en petits dés", en: "Diced mango", ar: "مانجو مقطعة مكعبات" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Oignon rouge, piment doux & coriandre", en: "Red onion & cilantro", ar: "بصل أحمر وكزبرة" }, quantity: 30, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Coupez le cabillaud en petits dés réguliers et arrosez-le du jus de citron vert dans un bol.",
        "Laissez mariner 10 minutes au frais (l'acidité du citron cuit naturellement le poisson).",
        "Ajoutez les dés de mangue, l'oignon rouge émincé et la coriandre ciselée.",
        "Mélangez délicatement avec un filet d'huile d'olive et servez très frais."
      ],
      en: [
        "Dice cod into small cubes and cover with fresh lime juice in a bowl.",
        "Chill for 10 mins (lime acid cures the fish).",
        "Toss in diced mango, thin red onion, and chopped cilantro.",
        "Drizzle olive oil and serve chilled."
      ],
      ar: [
        "قطع السمك مكعبات صغيرة واغمره بعصير الليمون الأخضر في وعاء.",
        "اتركه 10 دقائق في الثلاجة (حمض الليمون يطهو السمك).",
        "أضف مكعبات المانجو والبصل الأحمر والكزبرة المفرومة.",
        "اخلط برفق مع قليل من زيت الزيتون وقدمه بارداً."
      ]
    }
  },
  {
    id: "m68",
    mealType: "dinner",
    title: {
      fr: "Bowl Saumon Rôti, Avocat, Riz Noir & Sauce Ponzu",
      en: "Roasted Salmon Bowl with Avocado, Black Rice & Ponzu",
      ar: "باول السلمون المشوي مع الأفوكادو والأرز الأسود وصوص بونزـو"
    },
    emoji: "🍣",
    prepTime: 10,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Pavé de saumon frais", en: "Salmon fillet", ar: "فيليه سلمون طازج" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Riz noir ou complet cuit", en: "Cooked black or brown rice", ar: "أرز أسود أو بني" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Demi-avocat en lamelles", en: "Avocado slices", ar: "شرائح أفوكادو" }, quantity: 0.5, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Concombre, radis & sauce soja-citron", en: "Veggies & ponzu sauce", ar: "خيار وفجل وصلصة بونزو" }, quantity: 60, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites dorer le pavé de saumon à la poêle 4 min côté peau puis 3 min de l'autre côté.",
        "Dans un bol, déposez la base de riz noir tiède.",
        "Disposez l'avocat en éventail, les rondelles de concombre et le saumon rôti.",
        "Arrosez de sauce ponzu (soja + citron vert) et parsemez de sésame."
      ],
      en: [
        "Pan-sear salmon for 4 mins skin-down, then flip for 3 mins.",
        "Place warm black rice in a bowl.",
        "Arrange fanned avocado, cucumber slices, and roasted salmon.",
        "Drizzle ponzu sauce and sprinkle with sesame."
      ],
      ar: [
        "اشو السلمون في مقلاة 4 دقائق من جهة الجلد ثم 3 دقائق للوجه الآخر.",
        "ضع الأرز الأسود الدافئ في وعاء.",
        "رتب شرائح الأفوكادو والخيار وفيليه السلمون.",
        "اسكب صلصة البونزو وزين بالسمسم."
      ]
    }
  },
  {
    id: "m69",
    mealType: "lunch",
    title: {
      fr: "Salade Tiède de Lentilles Vertes & Saumon Fumé",
      en: "Warm French Green Lentil Salad with Smoked Salmon",
      ar: "سلطة العدس الأخضر الدافئة مع السلمون المدخن والشبت"
    },
    emoji: "🥗",
    prepTime: 8,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Lentilles vertes du Puy", en: "French green lentils", ar: "عدس أخضر" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Saumon fumé en lanières", en: "Smoked salmon strips", ar: "شرائح سلمون مدخن" }, quantity: 80, unit: "g", dept: "deptMeat" },
      { name: { fr: "Échalote émincée & Ciboulette", en: "Shallot & fresh chives", ar: "بصل وثوم معمر" }, quantity: 20, unit: "g", dept: "deptProduce" },
      { name: { fr: "Huile de noix & Vinaigre de cidre", en: "Walnut oil & cider vinegar", ar: "زيت جوز وخل تفاح" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites cuire les lentilles vertes dans l'eau frémissante non salée pendant 18 minutes, puis égouttez.",
        "Mélangez les lentilles encore tièdes avec l'échalote, l'huile de noix et le vinaigre.",
        "Dressez dans une assiette et déposez délicatement les lanières de saumon fumé.",
        "Parsemez de ciboulette fraîche ciselée."
      ],
      en: [
        "Simmer green lentils in water for 18 mins and drain.",
        "Toss warm lentils with minced shallot, walnut oil, and cider vinegar.",
        "Plate lentils and drape ribbons of smoked salmon on top.",
        "Garnish with chopped fresh chives."
      ],
      ar: [
        "اطه العدس الأخضر في ماء مغلي 18 دقيقة ثم صفه.",
        "اخلط العدس الدافئ مع البصل والزيت والخل.",
        "اسكب في طبق ورتب شرائح السلمون المدخن فوقه.",
        "زين بالثوم المعمر المفروم."
      ]
    }
  },
  {
    id: "m70",
    mealType: "dinner",
    title: {
      fr: "Velouté Détox Brocolis, Courgettes & Lait d'Amande",
      en: "Detox Broccoli & Zucchini Soup with Almond Milk",
      ar: "شوربة البروكلي والكوسة الديتوكس بحليب اللوز"
    },
    emoji: "🥦",
    prepTime: 8,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 260,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber", "dietLowCalorie"],
    ingredients: [
      { name: { fr: "Brocoli frais coupé en fleurettes", en: "Broccoli florets", ar: "بروكلي طازج" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Courgette coupée en rondelles", en: "Zucchini", ar: "كوسة" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Lait d'amande sans sucre", en: "Unsweetened almond milk", ar: "حليب لوز غير محلى" }, quantity: 150, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Bouillon de légumes & Ail", en: "Broth & garlic", ar: "مرق خضار وثوم" }, quantity: 200, unit: "ml", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites cuire les brocolis et les rondelles de courgette dans le bouillon chaud avec l'ail 12 minutes.",
        "Ajoutez le lait d'amande.",
        "Mixez à haute puissance pour obtenir une texture ultra veloutée et aérée.",
        "Dégustez chaud avec un tour de moulin à poivre."
      ],
      en: [
        "Boil broccoli and zucchini in vegetable broth with garlic for 12 mins.",
        "Pour in almond milk.",
        "Blend at high speed until light, silky, and creamy.",
        "Serve hot with freshly cracked pepper."
      ],
      ar: [
        "اطه البروكلي والكوسة في مرق الخضار مع الثوم 12 دقيقة.",
        "أضف حليب اللوز.",
        "اخلط جيداً بالخلاط حتى يصبح قوامها حريرياً وخفيفاً.",
        "قدمها ساخنة مع رشة فلفل أسود."
      ]
    }
  },
  {
    id: "m71",
    mealType: "dinner",
    title: {
      fr: "Brochettes d'Agneau Mariné & Semoule Parfumée aux Herbes",
      en: "Herb-Marinated Lamb Skewers with Fluffy Couscous",
      ar: "أسياخ لحم غنم متبل بالأعشاب مع كسكسي معطر"
    },
    emoji: "🍢",
    prepTime: 12,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 520,
    tags: ["maghreb", "mediterranean", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Gigot ou épaule d'agneau en cubes", en: "Lamb cubes", ar: "مكعبات لحم غنم" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Graine de couscous moyenne", en: "Couscous grain", ar: "سميد كسكسي" }, quantity: 70, unit: "g", dept: "deptPantry" },
      { name: { fr: "Cumin, paprika doux, romarin & huile d'olive", en: "Marinade spices & herbs", ar: "كمون وبابريكا وإكليل الجبل" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Tomate grillée & Oignon", en: "Grilled tomato & onion", ar: "طماطم وبصل مشوي" }, quantity: 80, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Enfilez les dés d'agneau sur des piques en alternant avec des morceaux d'oignon.",
        "Faites griller les brochettes 7-8 min à la poêle très chaude ou au grill en les retournant.",
        "Hydratez la semoule 5 min à l'eau bouillante salée, égrenez à la fourchette avec un filet d'huile et des herbes.",
        "Dégustez les brochettes bien chaudes sur le lit de semoule parfumée."
      ],
      en: [
        "Thread lamb cubes and onion wedges onto skewers.",
        "Grill skewers in a hot skillet for 7-8 mins, turning frequently.",
        "Steam couscous with boiling water for 5 mins, fluff with a fork, olive oil, and herbs.",
        "Serve juicy skewers over fragrant couscous."
      ],
      ar: [
        "شك مكعبات اللحم والبصل في الأعواد.",
        "اشو الأسياخ في مقلاة ساخنة 7-8 دقائق مع التقليب.",
        "حضر الكسكسي بالماء المغلي والزيت والأعشاب وافركه بالشوكة.",
        "قدم أسياخ اللحم الطرية فوق الكسكسي المعطر."
      ]
    }
  },
  {
    id: "m72",
    mealType: "dinner",
    title: {
      fr: "Risotto Fondant aux Asperges Vertes & Parmesan",
      en: "Creamy Green Asparagus & Parmesan Risotto",
      ar: "ريزوتو الهليون الأخضر الكريمي مع البارميزان"
    },
    emoji: "🍲",
    prepTime: 10,
    cookTime: 20,
    difficulty: "medium",
    caloriesPerPerson: 470,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Riz arborio pour risotto", en: "Arborio rice", ar: "أرز ريزوتو" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Asperges vertes fraîches", en: "Green asparagus", ar: "هليون أخضر" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Parmesan râpé de qualité", en: "Grated parmesan", ar: "جبن بارميزان" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Bouillon de légumes chaud", en: "Warm vegetable broth", ar: "مرق خضار دافئ" }, quantity: 350, unit: "ml", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Coupez les asperges en tronçons en gardant les pointes intactes.",
        "Faites nacrer le riz dans un filet d'huile 2 min, puis ajoutez les tronçons d'asperges.",
        "Mouillez avec le bouillon chaud louche après louche pendant 18 min en remuant constamment.",
        "Ajoutez les pointes d'asperges à mi-cuisson. Hors du feu, liez avec le parmesan râpé."
      ],
      en: [
        "Cut asparagus into bite-sized chunks keeping tips whole.",
        "Toast arborio rice in oil for 2 mins, then add asparagus chunks.",
        "Gradually add warm broth ladle by ladle for 18 mins while stirring.",
        "Add tips halfway through. Finish off heat with rich grated parmesan."
      ],
      ar: [
        "قطع الهليون واحتفظ بالرؤوس سليمة.",
        "حمص الأرز دقيقتين في الزيت ثم أضف قطع الهليون.",
        "أضف المرق تدريجياً مع التحريك 18 دقيقة.",
        "أضف رؤوس الهليون في المنتصف واخلط البارميزان في النهاية."
      ]
    }
  },
  {
    id: "m73",
    mealType: "dinner",
    title: {
      fr: "Dorade Royale Grillée aux Herbes & Fenouil Braisé",
      en: "Grilled Sea Bream with Herbs & Braised Fennel",
      ar: "سمك الدنيس الملكي المشوي مع الشمر المكرمل"
    },
    emoji: "🐟",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 380,
    tags: ["mediterranean", "french", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCarb"],
    ingredients: [
      { name: { fr: "Filet de dorade royale", en: "Sea bream fillet", ar: "فيليه سمك دنيس" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Bulbe de fenouil émincé", en: "Sliced fennel bulb", ar: "شمر مقطع" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Huile d'olive, jus de citron & thym", en: "Olive oil, lemon & thyme", ar: "زيت زيتون وليمون وزعتر" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites braiser les lamelles de fenouil à la poêle avec un filet d'huile et un fond d'eau à couvert 10 min jusqu'à tendreté.",
        "Faites griller la dorade 3 min côté peau puis 2 min côté chair.",
        "Dressez le poisson sur le lit de fenouil fondant et arrosez de jus de citron frais."
      ],
      en: [
        "Braise sliced fennel in olive oil with a splash of water covered for 10 mins.",
        "Sear sea bream skin-down for 3 mins, then flip for 2 mins.",
        "Plate fish over tender braised fennel and squeeze fresh lemon juice."
      ],
      ar: [
        "اطه شرائح الشمر مغطاة في المقلاة مع قليل من الماء 10 دقائق حتى تطرى.",
        "اشو سمك الدنيس 3 دقائق لجهة الجلد ودقيقتين للوجه الآخر.",
        "قدم السمك فوق الشمر مع عصرة ليمون طازجة."
      ]
    }
  },
  {
    id: "m74",
    mealType: "lunch",
    title: {
      fr: "Riz Sauté Cantonais Express aux Petits Pois & Œufs",
      en: "Quick Cantonese Egg Fried Rice with Sweet Peas",
      ar: "أرز مقلي كانتوني سريع بالبيض والبازلاء والجزر"
    },
    emoji: "🍚",
    prepTime: 5,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["asian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Riz blanc cuit de la veille", en: "Day-old cooked white rice", ar: "أرز أبيض مطبوخ" }, quantity: 140, unit: "g", dept: "deptPantry" },
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Petits pois & dés de carottes", en: "Sweet peas & diced carrots", ar: "بازلاء ومكعبات جزر" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja & Huile de sésame", en: "Soy sauce & sesame oil", ar: "صلصة صويا وزيت سمسم" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Dans un wok très chaud avec l'huile, brouillez les œufs 1 minute et réservez.",
        "Faites sauter les petits pois et carottes 2 min à feu vif.",
        "Ajoutez le riz froid et faites-le sauter en l'égrenant 3 minutes.",
        "Réincorporez les œufs brouillés, la sauce soja et l'huile de sésame. Servez immédiatement."
      ],
      en: [
        "Scramble eggs in a hot wok with oil for 1 min, set aside.",
        "Stir-fry peas and carrots for 2 mins.",
        "Toss in cold rice and stir-fry for 3 mins breaking clumps.",
        "Fold in scrambled eggs, soy sauce, and sesame oil. Serve hot."
      ],
      ar: [
        "اخفق البيض في مقلاة ووك ساخنة دقيقة واحدة وضعه جانباً.",
        "شوح البازلاء والجزر دقيقتين على نار قوية.",
        "أضف الأرز البارد وقلبه 3 دقائق.",
        "أعد البيض وأضف صلصة الصويا وزيت السمسم وقدمه فوراً."
      ]
    }
  },
  {
    id: "m75",
    mealType: "dinner",
    title: {
      fr: "Curry Vert Thaï aux Légumes Croquants & Tofu Soyeux",
      en: "Thai Green Curry with Crisp Vegetables & Silky Tofu",
      ar: "كاري تايلاندي أخضر بالخضار والتوفو وحليب جوز الهند"
    },
    emoji: "🍛",
    prepTime: 10,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 410,
    tags: ["asian", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Tofu ferme en dés dorés", en: "Firm tofu cubes", ar: "مكعبات توفو" }, quantity: 140, unit: "g", dept: "deptProduce" },
      { name: { fr: "Pâte de curry vert thaï", en: "Thai green curry paste", ar: "معجون كاري أخضر" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 140, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Pois gourmands & Courgettes", en: "Snow peas & zucchini", ar: "بازلاء الثلج وكوسة" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Riz jasmin cuit", en: "Jasmine rice", ar: "أرز الياسمين" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer les dés de tofu à la poêle 4 min jusqu'à ce qu'ils soient croustillants.",
        "Dans une sauteuse, faites revenir la pâte de curry vert 1 min, puis versez le lait de coco.",
        "Ajoutez les légumes croquants et laissez mijoter 8 minutes.",
        "Incorporez les dés de tofu dorés et servez avec le riz jasmin."
      ],
      en: [
        "Pan-sear tofu cubes for 4 mins until crispy.",
        "Sauté green curry paste for 1 min, then stir in coconut milk.",
        "Add fresh veggies and simmer for 8 mins.",
        "Fold in crispy tofu and serve with steamed jasmine rice."
      ],
      ar: [
        "حمر مكعبات التوفو 4 دقائق حتى تقرمش.",
        "شوح معجون الكاري الأخضر دقيقة ثم أضف حليب جوز الهند.",
        "أضف الخضار واتركه يغلي 8 دقائق.",
        "اخلط التوفو المقرمش وقدمه مع أرز الياسمين."
      ]
    }
  },
  // --- PETITS DÉJEUNERS NUTRITIFS SUPPLÉMENTAIRES ---
  {
    id: "b10",
    mealType: "breakfast",
    title: {
      fr: "Tartines Seigle Beurre de Cacahuète, Banane & Chia",
      en: "Rye Toast with Peanut Butter, Banana & Chia",
      ar: "توست حبوب كاملة بزبدة الفول السوداني والموز وبذور الشيا"
    },
    emoji: "🥪",
    prepTime: 4,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Pain de seigle ou complet", en: "Rye or whole wheat bread", ar: "خبز شعير أو كامل" }, quantity: 2, unit: "tranches", dept: "deptBakery" },
      { name: { fr: "Beurre de cacahuète 100% pur", en: "Pure peanut butter", ar: "زبدة فول سوداني نقية" }, quantity: 25, unit: "g", dept: "deptPantry" },
      { name: { fr: "Banane en rondelles", en: "Banana slices", ar: "شرائح موز" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Graines de chia", en: "Chia seeds", ar: "بذور الشيا" }, quantity: 1, unit: "c.à.c", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Toastez les tranches de pain de seigle.",
        "Tartinez généreusement de beurre de cacahuète naturel.",
        "Disposez les rondelles de banane et saupoudrez de graines de chia."
      ],
      en: [
        "Toast rye bread slices.",
        "Spread with 100% pure peanut butter.",
        "Layer banana slices and sprinkle chia seeds on top."
      ],
      ar: [
        "حمص شرائح الخبز.",
        "ادهن بزبدة الفول السوداني الطبيعية.",
        "رتب شرائح الموز ورش بذور الشيا."
      ]
    }
  },
  {
    id: "b11",
    mealType: "breakfast",
    title: {
      fr: "Porridge Chaud Pomme-Cannelle & Noisettes Grillées",
      en: "Warm Apple-Cinnamon Oatmeal with Toasted Hazelnuts",
      ar: "شوفان دافئ بالتفاح والقرفة والبندق المحمص"
    },
    emoji: "🥣",
    prepTime: 5,
    cookTime: 5,
    difficulty: "easy",
    caloriesPerPerson: 340,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Flocons d'avoine", en: "Oat flakes", ar: "رقائق شوفان" }, quantity: 60, unit: "g", dept: "deptPantry" },
      { name: { fr: "Lait demi-écrémé ou d'amande", en: "Milk or almond milk", ar: "حليب أو حليب لوز" }, quantity: 180, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Pomme coupée en petits dés", en: "Diced apple", ar: "تفاح مقطع مكعبات" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Cannelle moulue & Noisettes concassées", en: "Cinnamon & hazelnuts", ar: "قرفة وبندق مجروش" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites cuire les flocons d'avoine et les dés de pomme dans le lait avec la cannelle 5 minutes à feu doux.",
        "Versez dans un bol fumant.",
        "Garnissez de noisettes grillées concassées pour un croquant parfait."
      ],
      en: [
        "Cook oats and apple cubes in milk with cinnamon for 5 mins over low heat.",
        "Pour into a warm bowl.",
        "Top with toasted crushed hazelnuts."
      ],
      ar: [
        "اطه الشوفان ومكعبات التفاح في الحليب مع القرفة 5 دقائق على نار هادئة.",
        "اسكب في وعاء دافئ.",
        "زين بالبندق المحمص المقرمش."
      ]
    }
  },
  {
    id: "b12",
    mealType: "breakfast",
    title: {
      fr: "Omelette Blanche Épinards & Feta Fondante",
      en: "Egg White, Spinach & Feta Protein Scramble",
      ar: "أومليت بياض البيض والسبانخ وجبن الفيتا"
    },
    emoji: "🍳",
    prepTime: 4,
    cookTime: 4,
    difficulty: "easy",
    caloriesPerPerson: 280,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietHighProtein", "dietLowCarb", "dietQuick"],
    ingredients: [
      { name: { fr: "Blancs d'œufs (ou 2 œufs entiers)", en: "Egg whites or whole eggs", ar: "بياض بيض أو بيض كامل" }, quantity: 3, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Jeunes pousses d'épinards", en: "Baby spinach", ar: "سبانخ صغيرة" }, quantity: 80, unit: "g", dept: "deptProduce" },
      { name: { fr: "Feta émiettée", en: "Crumbled feta", ar: "جبن فيتا" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Pain complet grillé", en: "Toasted whole grain bread", ar: "خبز كامل محمص" }, quantity: 1, unit: "tranches", dept: "deptBakery" }
    ],
    instructions: {
      fr: [
        "Faites tomber les épinards 1 min dans une poêle huilée.",
        "Versez les blancs d'œufs battus avec sel et poivre.",
        "Laissez cuire 2 minutes, parsemez de feta émiettée et repliez l'omelette.",
        "Dégustez avec une tranche de pain complet grillé."
      ],
      en: [
        "Wilt spinach in a lightly oiled pan for 1 min.",
        "Pour in beaten egg whites with salt and pepper.",
        "Cook for 2 mins, scatter feta over top and fold.",
        "Serve with toasted whole wheat bread."
      ],
      ar: [
        "شوح السبانخ دقيقة واحدة في مقلاة مدهونة.",
        "اسكب بياض البيض المخفوق مع الملح والفلفل.",
        "اطه دقيقتين ورش جبن الفيتا واطو الأومليت.",
        "قدمها مع شريحة خبز كامل محمص."
      ]
    }
  },
  // --- SNACKS ET ENCAS SAINS SUPPLÉMENTAIRES ---
  {
    id: "s7",
    mealType: "snack",
    title: {
      fr: "Bâtonnets de Concombre & Tzatziki Frais Maison",
      en: "Crisp Cucumber Sticks with Fresh Mint Tzatziki",
      ar: "أصابع الخيار المقرمشة مع صوص التزاتزيكي بالنعناع"
    },
    emoji: "🥒",
    prepTime: 4,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 110,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietLowCalorie", "dietQuick"],
    ingredients: [
      { name: { fr: "Concombre frais en bâtonnets", en: "Cucumber sticks", ar: "أصابع خيار" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Yaourt grec authentique", en: "Greek yogurt", ar: "زبادي يوناني" }, quantity: 80, unit: "g", dept: "deptDairy" },
      { name: { fr: "Gousse d'ail râpée, menthe & filet de citron", en: "Garlic, mint & lemon", ar: "ثوم ونعناع وليمون" }, quantity: 1, unit: "c.à.c", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Mélangez le yaourt grec avec l'ail râpé, la menthe ciselée, un filet de jus de citron, sel et poivre.",
        "Taillez le concombre en bâtonnets croquants.",
        "Trempez les bâtonnets dans le tzatziki frais pour un encas ultra léger."
      ],
      en: [
        "Mix Greek yogurt with minced garlic, chopped mint, lemon juice, salt and pepper.",
        "Cut cucumber into crisp sticks.",
        "Dip into chilled tzatziki for a refreshing low-calorie snack."
      ],
      ar: [
        "اخلط الزبادي اليوناني مع الثوم المبشور والنعناع وعصير الليمون والملح.",
        "قطع الخيار أصابع مقرمشة.",
        "اغمس الخيار في الصوص المنعش وتناوله كسناك خفيف."
      ]
    }
  },
  {
    id: "s8",
    mealType: "snack",
    title: {
      fr: "Galettes de Riz Chocolat Noir 70% & Purée d'Amande",
      en: "Dark Chocolate & Almond Butter Rice Cakes",
      ar: "كعكات الأرز المقرمشة بالشوكولاتة الداكنة وزبدة اللوز"
    },
    emoji: "🍫",
    prepTime: 2,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 160,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Galettes de riz complet soufflé", en: "Brown rice cakes", ar: "كعك الأرز الكامل" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Purée d'amande complète", en: "Almond butter", ar: "زبدة لوز" }, quantity: 15, unit: "g", dept: "deptPantry" },
      { name: { fr: "Carré de chocolat noir 70% râpé", en: "Dark chocolate shavings", ar: "شوكولاتة داكنة مبشورة" }, quantity: 10, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Tartinez les galettes de riz avec la purée d'amande.",
        "Saupoudrez d'éclats de chocolat noir 70%.",
        "Dégustez pour un encas croustillant et gourmand."
      ],
      en: [
        "Spread almond butter over rice cakes.",
        "Top with dark chocolate shavings.",
        "Enjoy a quick crunchy wholesome snack."
      ],
      ar: [
        "ادهن كعكات الأرز بزبدة اللوز.",
        "رش مبشور الشوكولاتة الداكنة.",
        "استمتع بسناك سريع ولذيذ ومقرمش."
      ]
    }
  },
  {
    id: "s9",
    mealType: "snack",
    title: {
      fr: "Salade Fraîche de Fruits de Saison à la Menthe",
      en: "Seasonal Fresh Fruit Salad with Lime & Mint",
      ar: "سلطة فواكه طازجة بالنعناع وعصير الليمون"
    },
    emoji: "🍓",
    prepTime: 5,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 120,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietLowCalorie", "dietQuick"],
    ingredients: [
      { name: { fr: "Fraises, melon ou pomme en dés", en: "Mixed fresh fruits", ar: "فواكه طازجة مشكلة" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Jus de citron vert & Feuilles de menthe", en: "Lime juice & fresh mint", ar: "عصير ليمون ونعناع" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Coupez les fruits frais en morceaux réguliers.",
        "Arrosez du jus de citron vert et ajoutez les feuilles de menthe fraîche ciselées.",
        "Mélangez délicatement et servez bien frais."
      ],
      en: [
        "Chop fresh fruit into bite-sized pieces.",
        "Toss with lime juice and finely sliced fresh mint.",
        "Serve chilled."
      ],
      ar: [
        "قطع الفواكه مكعبات متساوية.",
        "اسكب عصير الليمون وأضف النعناع المفروم.",
        "اخلط برفق وقدمه بارداً."
      ]
    }
  }
];



