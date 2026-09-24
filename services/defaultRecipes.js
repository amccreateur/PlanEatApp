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
  },
  {
    id: "m76",
    mealType: "dinner",
    title: {
      fr: "Poulet Yassa Sénégalais au Citron & Oignons Caramélisés",
      en: "Senegalese Yassa Chicken with Caramelized Onions & Lemon",
      ar: "دجاج ياسا السنغالي بالليمون والبصل المكرمل"
    },
    emoji: "🍗",
    prepTime: 15,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["african", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Cuisses ou aiguillettes de poulet", en: "Chicken pieces", ar: "قطع دجاج" }, quantity: 170, unit: "g", dept: "deptMeat" },
      { name: { fr: "Oignons jaunes émincés", en: "Sliced yellow onions", ar: "بصل شرائح" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Jus de 2 citrons & Moutarde de Dijon", en: "Lemon juice & mustard", ar: "عصير ليمون وخردل" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Ail, laurier & piment doux", en: "Garlic & bay leaves", ar: "ثوم وورق غار" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz blanc brisé ou jasmin", en: "White rice", ar: "أرز أبيض" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites mariner le poulet dans le jus de citron, la moutarde et l'ail.",
        "Faites griller le poulet 5 min à feu vif dans une cocotte puis réservez.",
        "Faites fondre les oignons doucement 10 min jusqu'à ce qu'ils caramélisent.",
        "Remettez le poulet avec la marinade et laissez mijoter 15 min. Servez avec du riz blanc."
      ],
      en: [
        "Marinate chicken in lemon juice, mustard, and garlic.",
        "Brown chicken in a pot for 5 mins, then set aside.",
        "Slowly caramelize onions for 10 mins until golden and soft.",
        "Return chicken and marinade, simmer for 15 mins. Serve over white rice."
      ],
      ar: [
        "انقع الدجاج في عصير الليمون والخردل والثوم.",
        "حمر الدجاج 5 دقائق في قدر ثم ارفعه جانباً.",
        "كرمل البصل على نار هادئة 10 دقائق حتى يذبل ويصبح ذهبياً.",
        "أعد الدجاج مع التتبيلة واتركه يطهى 15 دقيقة وقدمه مع الأرز."
      ]
    }
  },
  {
    id: "m77",
    mealType: "lunch",
    title: {
      fr: "Loubia Marocaine Fondante aux Haricots Blancs & Cumin",
      en: "Moroccan White Bean Stew (Loubia) with Cumin & Paprika",
      ar: "لوبيا مغربية مسبكة بالفاصوليا البيضاء والكمون"
    },
    emoji: "🍲",
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 390,
    tags: ["maghreb", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Haricots blancs cuits égouttés", en: "Cooked cannellini beans", ar: "فاصوليا بيضاء مطبوخة" }, quantity: 200, unit: "g", dept: "deptPantry" },
      { name: { fr: "Tomates fraîches râpées & Concentré", en: "Grated tomatoes & paste", ar: "طماطم طازجة ومعجون" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Ail haché, persil & coriandre", en: "Garlic & fresh herbs", ar: "ثوم وبقدونس وكزبرة" }, quantity: 30, unit: "g", dept: "deptProduce" },
      { name: { fr: "Cumin, paprika doux & huile d'olive", en: "Cumin & paprika", ar: "كمون وبابريكا وزيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Dans une sauteuse, faites revenir l'ail, les tomates et les épices dans l'huile d'olive 5 min.",
        "Ajoutez les haricots blancs et 200ml d'eau chaude.",
        "Laissez mijoter 15 minutes à feu doux jusqu'à ce que la sauce devienne bien onctueuse.",
        "Parsemez de coriandre fraîche et dégustez avec du pain marocain croustillant."
      ],
      en: [
        "Sauté garlic, grated tomatoes, and spices in olive oil for 5 mins.",
        "Add white beans and 200ml hot water.",
        "Simmer gently for 15 mins until sauce is thick and rich.",
        "Garnish with fresh cilantro and serve with crusty bread."
      ],
      ar: [
        "شوح الثوم والطماطم والبهارات في زيت الزيتون 5 دقائق.",
        "أضف الفاصوليا البيضاء وقليل من الماء الساخن.",
        "اتركها تغلي 15 دقيقة على نار هادئة حتى تتسبك الصلصة.",
        "زين بالكزبرة الطازجة وقدمها مع الخبز."
      ]
    }
  },
  {
    id: "m78",
    mealType: "lunch",
    title: {
      fr: "Shawarma Bowl au Poulet Mariné & Sauce Blanche à l'Ail",
      en: "Chicken Shawarma Bowl with Garlic Sauce & Pickled Veggies",
      ar: "شاورما باول الدجاج المتبل مع صوص الثومية والخضار"
    },
    emoji: "🥙",
    prepTime: 12,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["mediterranean", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Haut de cuisse de poulet émincé", en: "Chicken thighs sliced", ar: "شرائح دجاج شاورما" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Épices shawarma (cardamome, cumin, paprika)", en: "Shawarma spices", ar: "بهارات شاورما" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz basmati au curcuma", en: "Turmeric rice", ar: "أرز بالكركم" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Salade, tomates, concombres & sauce yaourt-ail", en: "Fresh salad & garlic sauce", ar: "سلطة وصوص ثومية" }, quantity: 80, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites sauter le poulet émincé à la poêle très chaude avec les épices shawarma 7 min jusqu'à ce qu'il soit bien doré.",
        "Déposez le riz au curcuma au fond du bol.",
        "Garnissez avec le poulet croustillant, les dés de tomates et concombres.",
        "Nappez de sauce blanche au yaourt et à l'ail."
      ],
      en: [
        "Pan-sear seasoned chicken for 7 mins over high heat until crispy and golden.",
        "Spoon turmeric rice into a bowl.",
        "Add seared chicken, diced tomatoes, and cucumbers.",
        "Drizzle generously with creamy garlic yogurt sauce."
      ],
      ar: [
        "شوح شرائح الدجاج مع بهارات الشاورما 7 دقائق في مقلاة ساخنة.",
        "ضع الأرز بالكركم في قاع الوعاء.",
        "أضف الدجاج المقرمش وقطع الطماطم والخيار.",
        "اسكب صوص الزبادي بالثوم وقدمه فوراً."
      ]
    }
  },
  {
    id: "m79",
    mealType: "lunch",
    title: {
      fr: "Gyros Grec Maison au Poulet Grillé, Tzatziki & Pain Pita",
      en: "Homemade Greek Chicken Gyros with Tzatziki & Warm Pita",
      ar: "جيروس دجاج يوناني مشوي مع خبز البيتا والتزاتزيكي"
    },
    emoji: "🥙",
    prepTime: 10,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["mediterranean", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Pains pita grecs moelleux", en: "Greek pita bread", ar: "خبز بيتا يوناني" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Aiguillettes de poulet grillées aux herbes", en: "Herb-grilled chicken", ar: "دجاج مشوي بالأعشاب" }, quantity: 140, unit: "g", dept: "deptMeat" },
      { name: { fr: "Tzatziki frais (yaourt, concombre, menthe)", en: "Fresh tzatziki", ar: "صوص تزاتزيكي" }, quantity: 50, unit: "g", dept: "deptDairy" },
      { name: { fr: "Rondelles de tomate & oignon rouge", en: "Tomato & red onion slices", ar: "طماطم وبصل أحمر" }, quantity: 50, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites griller le poulet assaisonné d'origan et d'ail 6 min à la poêle.",
        "Chauffez le pain pita 1 min au grille-pain ou à sec dans une poêle.",
        "Tartinez généreusement de tzatziki frais.",
        "Garnissez de poulet chaud, tranches de tomate et oignon rouge, repliez et dégustez."
      ],
      en: [
        "Grill chicken seasoned with oregano and garlic for 6 mins.",
        "Warm pita bread for 1 min.",
        "Spread thick tzatziki over the warm pita.",
        "Fill with grilled chicken, sliced tomatoes, and red onion, fold and enjoy."
      ],
      ar: [
        "اشو الدجاج مع الأوريجانو والثوم 6 دقائق.",
        "سخن خبز البيتا دقيقة واحدة.",
        "ادهن الخبز بصوص التزاتزيكي.",
        "احش بالدجاج والطماطم والبصل ولف السندويش."
      ]
    }
  },
  {
    id: "m80",
    mealType: "dinner",
    title: {
      fr: "Naan Pizza Croustillante Mozzarella, Tomates & Roquette",
      en: "Crispy Naan Bread Pizza with Mozzarella & Fresh Arugula",
      ar: "نان بيتزا مقرمشة بالموزاريلا والطماطم الكرزية والجرجير"
    },
    emoji: "🍕",
    prepTime: 5,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 450,
    tags: ["italian", "indian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Pain naan à l'ail ou nature", en: "Garlic or plain naan", ar: "خبز نان" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Coulis de tomate parfumé à l'origan", en: "Tomato sauce with oregano", ar: "صلصة طماطم بالزعتر" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Mozzarella di bufala ou râpée", en: "Mozzarella cheese", ar: "جبن موزاريلا" }, quantity: 60, unit: "g", dept: "deptDairy" },
      { name: { fr: "Tomates cerises & Roquette fraîche", en: "Cherry tomatoes & arugula", ar: "طماطم كرزية وجرجير" }, quantity: 40, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 210°C.",
        "Tartinez le pain naan de coulis de tomate et disposez la mozzarella et les tomates cerises coupées.",
        "Enfournez 8 à 10 minutes jusqu'à ce que le fromage soit gratiné et le naan croustillant.",
        "Ajoutez une poignée de roquette fraîche et un filet d'huile d'olive avant de servir."
      ],
      en: [
        "Preheat oven to 210°C (410°F).",
        "Spread tomato sauce over naan, top with mozzarella and halved cherry tomatoes.",
        "Bake for 8-10 mins until cheese is melted and naan is crunchy.",
        "Top with fresh arugula and a drizzle of olive oil."
      ],
      ar: [
        "سخن الفرن على 210 مئوية.",
        "ادهن خبز النان بصلصة الطماطم وضع الموزاريلا والطماطم الكرزية.",
        "اخبز 8-10 دقائق حتى يذوب الجبن ويقرمش الخبز.",
        "زين بالجرجير الطازج وزيت الزيتون وقدمه."
      ]
    }
  },
  {
    id: "m81",
    mealType: "dinner",
    title: {
      fr: "Kefta de Thon aux Herbes & Sauce Tomate Pimentée",
      en: "Spiced Tuna Meatballs in Rich Tomato Chili Sauce",
      ar: "كرات كفتة التونة بالأعشاب في صلصة طماطم حارة"
    },
    emoji: "🐟",
    prepTime: 12,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["maghreb", "mediterranean", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Thon égoutté & Œuf frais", en: "Canned tuna & egg", ar: "تونة وبيض" }, quantity: 150, unit: "g", dept: "deptPantry" },
      { name: { fr: "Chapelure, persil plat & cumin", en: "Breadcrumbs, parsley & cumin", ar: "بقسماط وبقدونس وكمون" }, quantity: 30, unit: "g", dept: "deptPantry" },
      { name: { fr: "Coulis de tomate & Harissa douce", en: "Tomato sauce & mild harissa", ar: "صلصة طماطم وهريسة" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Riz ou pommes de terre vapeur", en: "Steamed rice or potatoes", ar: "أرز أو بطاطس" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Mélangez le thon émietté avec l'œuf, la chapelure, le persil et le cumin pour former des boulettes.",
        "Faites dorer les boulettes de thon 4 min à la poêle.",
        "Versez le coulis de tomate avec une pointe de harissa et laissez mijoter 10 min.",
        "Servez chaud avec du riz ou des pommes de terre vapeur."
      ],
      en: [
        "Mix flaked tuna, egg, breadcrumbs, parsley, and cumin into balls.",
        "Pan-sear tuna meatballs for 4 mins until lightly browned.",
        "Add tomato sauce and a hint of harissa, simmer for 10 mins.",
        "Serve with steamed rice or boiled potatoes."
      ],
      ar: [
        "اخلط التونة مع البيض والبقسماط والبقدونس والكمون وشكل كرات.",
        "حمر كرات التونة 4 دقائق في المقلاة.",
        "أضف صلصة الطماطم والهريسة واتركها تغلي 10 دقائق.",
        "قدمها مع الأرز أو البطاطس المسلوقة."
      ]
    }
  },
  {
    id: "m82",
    mealType: "dinner",
    title: {
      fr: "Curry Korma Doux de Volaille aux Amandes & Riz Safrané",
      en: "Mild Chicken Korma with Ground Almonds & Saffron Rice",
      ar: "كورما الدجاج الهندي اللذيذ باللوز والأرز بالزعفران"
    },
    emoji: "🍛",
    prepTime: 12,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 530,
    tags: ["indian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Blancs de poulet en morceaux", en: "Chicken breast pieces", ar: "قطع صدر دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Poudre d'amandes & Yaourt nature", en: "Almond flour & plain yogurt", ar: "بودرة لوز وزبادي" }, quantity: 50, unit: "g", dept: "deptDairy" },
      { name: { fr: "Lait de coco & Épices korma douces", en: "Coconut milk & korma spices", ar: "حليب جوز هند وبهارات كورما" }, quantity: 100, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Riz basmati au safran ou curcuma", en: "Saffron basmati rice", ar: "أرز بسمتي بالزعفران" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer le poulet 4 min dans une sauteuse huilée avec les épices korma.",
        "Mélangez le yaourt avec la poudre d'amande et le lait de coco.",
        "Versez dans la sauteuse et laissez mijoter 12 minutes à feu très doux.",
        "Dégustez ce plat doux et onctueux avec le riz au safran."
      ],
      en: [
        "Sear chicken in oil with korma spices for 4 mins.",
        "Whisk yogurt with ground almonds and coconut milk.",
        "Pour into skillet and simmer gently for 12 mins.",
        "Serve this creamy mild curry with saffron rice."
      ],
      ar: [
        "حمر الدجاج مع بهارات الكورما 4 دقائق.",
        "اخلط الزبادي مع بودرة اللوز وحليب جوز الهند.",
        "اسكب الخليط واتركه ينضج 12 دقيقة على نار هادئة.",
        "قدم هذا الكاري الكريمي مع أرز الزعفران."
      ]
    }
  },
  {
    id: "m83",
    mealType: "lunch",
    title: {
      fr: "Penne au Pesto Verde Maison, Pignons de Pin & Parmesan",
      en: "Penne Pasta with Homemade Basil Pesto & Pine Nuts",
      ar: "بيني باستا بصلصة البيستو الخضراء والصنوبر والبارميزان"
    },
    emoji: "🍝",
    prepTime: 8,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Penne rigate de blé", en: "Penne rigate pasta", ar: "معكرونة بيني" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Pesto de basilic frais", en: "Fresh basil pesto", ar: "صلصة بيستو الريحان" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Pignons de pin grillés", en: "Toasted pine nuts", ar: "صنوبر محمص" }, quantity: 15, unit: "g", dept: "deptPantry" },
      { name: { fr: "Parmesan râpé & Tomates cerises", en: "Parmesan & cherry tomatoes", ar: "جبن بارميزان وطماطم كرزية" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites cuire les penne al dente dans l'eau bouillante salée (9 min) et réservez 2 c.à.s d'eau de cuisson.",
        "Mélangez les pâtes chaudes avec le pesto verde et l'eau de cuisson réservée pour lier la sauce.",
        "Ajoutez les tomates cerises coupées en deux.",
        "Saupoudrez de pignons de pin torréfiés et de copeaux de parmesan."
      ],
      en: [
        "Boil penne al dente (9 mins), reserving 2 tbsp of cooking water.",
        "Toss hot pasta with basil pesto and reserved water to emulsify.",
        "Fold in halved cherry tomatoes.",
        "Top with toasted pine nuts and shaved parmesan."
      ],
      ar: [
        "اسلق المعكرونة 9 دقائق واحتفظ بملعقتين من ماء السلق.",
        "اخلط المعكرونة الساخنة مع صلصة البيستو وماء السلق.",
        "أضف الطماطم الكرزية المقطعة نصفين.",
        "زين بالصنوبر المحمص والبارميزان."
      ]
    }
  },
  {
    id: "m84",
    mealType: "dinner",
    title: {
      fr: "Bœuf Sauté au Basilic Thaï (Pad Krapow) & Œuf au Plat",
      en: "Thai Basil Minced Beef (Pad Krapow) with Crispy Fried Egg",
      ar: "لحم مفروم بالريحان التايلاندي (باد كابراو) مع بيض مقلي"
    },
    emoji: "🍳",
    prepTime: 8,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Bœuf haché 5% MG", en: "Lean minced beef", ar: "لحم مفروم قليل الدسم" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Feuilles de basilic thaï ou classique", en: "Thai basil leaves", ar: "أوراق ريحان" }, quantity: 20, unit: "g", dept: "deptProduce" },
      { name: { fr: "Ail, piment doux, sauce soja et huître", en: "Garlic & soy sauce mix", ar: "ثوم وصلصة صويا" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Œuf frais au plat", en: "Fried egg", ar: "بيضة مقلية" }, quantity: 1, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Riz jasmin cuit", en: "Steamed jasmine rice", ar: "أرز الياسمين" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Dans un wok très chaud, faites sauter l'ail et le bœuf à feu vif 4 minutes.",
        "Ajoutez la sauce soja et les feuilles de basilic frais qui vont faner en 30 secondes.",
        "Faites frire un œuf au plat avec le bord croustillant et le jaune coulant.",
        "Dressez le bœuf au basilic sur le riz jasmin et posez l'œuf au plat sur le dessus."
      ],
      en: [
        "Stir-fry garlic and minced beef in a smoking hot wok for 4 mins.",
        "Add soy sauces and fresh basil leaves, tossing for 30 secs until wilted.",
        "Fry an egg with crispy lace edges and runny yolk.",
        "Serve beef over steamed jasmine rice topped with the fried egg."
      ],
      ar: [
        "شوح الثوم واللحم المفروم في مقلاة ووك ساخنة 4 دقائق.",
        "أضف صلصة الصويا وأوراق الريحان وقلب 30 ثانية.",
        "اقل بيضة حتى يقرمش طرفها ويبقى صفارها سائلاً.",
        "قدم اللحم فوق الأرز وضع البيضة المقلية في الأعلى."
      ]
    }
  },
  {
    id: "m85",
    mealType: "dinner",
    title: {
      fr: "Poulet Fondant au Citron Vert, Coco & Coriandre Fraîche",
      en: "Tender Coconut Lime Chicken with Fresh Cilantro",
      ar: "دجاج متبل بحليب جوز الهند والليمون الأخضر والكزبرة"
    },
    emoji: "🥥",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 480,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Aiguillettes de poulet", en: "Chicken strips", ar: "شرائح دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 120, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Jus et zeste de citron vert", en: "Lime juice & zest", ar: "عصير وبرش ليمون أخضر" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Courgette en demi-lunes & coriandre", en: "Zucchini & cilantro", ar: "كوسة وكزبرة" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Riz blanc ou thaï", en: "White rice", ar: "أرز أبيض" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer le poulet 4 min dans une sauteuse avec un filet d'huile.",
        "Ajoutez les demi-lunes de courgette et versez le lait de coco.",
        "Laissez mijoter 10 min, puis incorporez le jus et le zeste de citron vert hors du feu.",
        "Parsemez de coriandre fraîche et servez avec le riz chaud."
      ],
      en: [
        "Brown chicken strips in oil for 4 mins.",
        "Add zucchini slices and pour in coconut milk.",
        "Simmer for 10 mins, then stir in lime juice and zest off heat.",
        "Sprinkle fresh cilantro and serve with warm rice."
      ],
      ar: [
        "حمر شرائح الدجاج في الزيت 4 دقائق.",
        "أضف شرائح الكوسة واسكب حليب جوز الهند.",
        "اتركه يطهى 10 دقائق ثم أضف عصير الليمون الأخضر وبرشه.",
        "زين بالكزبرة الطازجة وقدمه مع الأرز الساخن."
      ]
    }
  },
  {
    id: "m86",
    mealType: "dinner",
    title: {
      fr: "Tartiflette Légère aux Pommes de Terre & Oignons Fondants",
      en: "Lighter French Tartiflette Potato & Melting Cheese Bake",
      ar: "تارتيفليت فرنسية خفيفة بالبطاطس والبصل والجبن الذائب"
    },
    emoji: "🥔",
    prepTime: 12,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Pommes de terre cuites à la vapeur", en: "Steamed potatoes", ar: "بطاطس مسلوقة" }, quantity: 220, unit: "g", dept: "deptProduce" },
      { name: { fr: "Oignons émincés caramélisés", en: "Caramelized onions", ar: "بصل مكرمل" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Fromage à tartiflette ou reblochon", en: "Reblochon cheese", ar: "جبن ريبلوشون ذائب" }, quantity: 50, unit: "g", dept: "deptDairy" },
      { name: { fr: "Crème liquide légère & Salade verte", en: "Light cream & green salad", ar: "كريمة خفيفة وسلطة" }, quantity: 40, unit: "ml", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites fondre les oignons dans une poêle avec un filet d'huile 8 min.",
        "Coupez les pommes de terre en rondelles et disposez-les dans un plat à gratin avec les oignons et la crème.",
        "Déposez les tranches de fromage sur le dessus.",
        "Enfournez 20 minutes à 190°C jusqu'à ce que le fromage soit gratiné et doré. Servez avec une salade verte."
      ],
      en: [
        "Caramelize sliced onions in oil for 8 mins.",
        "Slice potatoes and place in baking dish with onions and cream.",
        "Layer cheese slices over top.",
        "Bake for 20 mins at 190°C until bubbling and golden. Serve with green salad."
      ],
      ar: [
        "كرمل البصل في المقلاة مع قليل من الزيت 8 دقائق.",
        "قطع البطاطس شرائح وضعها في صينية مع البصل والكريمة.",
        "ضع شرائح الجبن على السطح.",
        "اخبز 20 دقيقة على 190 مئوية حتى يذوب الجبن ويتحمر، وقدمه مع سلطة خضراء."
      ]
    }
  },
  {
    id: "m87",
    mealType: "dinner",
    title: {
      fr: "Chili Con Carne Traditionnel au Bœuf & Haricots Rouges",
      en: "Classic Beef Chili Con Carne with Red Kidney Beans",
      ar: "تشيلي كون كارني تقليدي باللحم المفروم والفاصوليا الحمراء"
    },
    emoji: "🍲",
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 520,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietHighProtein", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Bœuf haché maigre", en: "Lean ground beef", ar: "لحم بقري مفروم" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Haricots rouges égouttés & Maïs", en: "Red kidney beans & corn", ar: "فاصوليا حمراء وذرة" }, quantity: 120, unit: "g", dept: "deptPantry" },
      { name: { fr: "Coulis de tomate & Poivron rouge", en: "Tomato sauce & red pepper", ar: "صلصة طماطم وفلفل أحمر" }, quantity: 140, unit: "g", dept: "deptProduce" },
      { name: { fr: "Épices chili, cumin, origan & ail", en: "Chili spices & garlic", ar: "توابل تشيلي وثوم" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Riz blanc (accompagnement)", en: "White rice", ar: "أرز أبيض" }, quantity: 60, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir le bœuf haché avec l'oignon et le poivron 5 min dans une cocotte.",
        "Ajoutez les épices chili, le coulis de tomate et les haricots rouges.",
        "Laissez mijoter 15 minutes à feu doux pour concentrer les saveurs.",
        "Servez chaud avec du riz blanc."
      ],
      en: [
        "Brown beef with onion and bell pepper for 5 mins in a pot.",
        "Add chili spices, tomato puree, and kidney beans.",
        "Simmer gently for 15 mins to develop rich flavors.",
        "Serve hot over white rice."
      ],
      ar: [
        "شوح اللحم مع البصل والفلفل 5 دقائق.",
        "أضف توابل التشيلي وصلصة الطماطم والفاصوليا الحمراء.",
        "اتركه يتسبك 15 دقيقة على نار هادئة.",
        "قدمه ساخناً مع الأرز الأبيض."
      ]
    }
  },
  {
    id: "m88",
    mealType: "dinner",
    title: {
      fr: "Soupe Thaï Tom Kha Gai au Poulet, Coco & Citronnelle",
      en: "Thai Coconut Chicken Soup (Tom Kha Gai) with Lemongrass",
      ar: "شوربة توم خا غاي التايلاندية بالدجاج وحليب جوز الهند والليمون"
    },
    emoji: "🥣",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCarb"],
    ingredients: [
      { name: { fr: "Blancs de poulet émincés", en: "Sliced chicken breast", ar: "شرائح صدر دجاج" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Lait de coco", en: "Coconut milk", ar: "حليب جوز الهند" }, quantity: 160, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Champignons de Paris en lamelles", en: "Sliced mushrooms", ar: "فطر مقطع" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Citronnelle, gingembre & jus de citron vert", en: "Lemongrass, ginger & lime", ar: "عشب الليمون وزنجبيل" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" },
      { name: { fr: "Coriandre fraîche", en: "Fresh cilantro", ar: "كزبرة طازجة" }, quantity: 10, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Portez à frémissement 250ml de bouillon avec le lait de coco, la citronnelle et le gingembre 5 min.",
        "Ajoutez les lamelles de poulet et les champignons, faites cuire 8 minutes.",
        "Terminez hors du feu avec le jus de citron vert.",
        "Versez dans des bols chauds et parsemez de coriandre fraîche."
      ],
      en: [
        "Simmer broth, coconut milk, lemongrass, and ginger for 5 mins.",
        "Add chicken strips and mushrooms, cook for 8 mins.",
        "Stir in fresh lime juice off heat.",
        "Ladle into deep bowls and top with fresh cilantro."
      ],
      ar: [
        "اغل المرق مع حليب جوز الهند والليمون والزنجبيل 5 دقائق.",
        "أضف شرائح الدجاج والفطر واطه 8 دقائق.",
        "أضف عصير الليمون الأخضر في النهاية.",
        "اسكب في أوعية عميقة وزين بالكزبرة الطازجة."
      ]
    }
  },
  {
    id: "m89",
    mealType: "dinner",
    title: {
      fr: "Filet de Loup de Mer Poêlé & Écrasé de Pommes de Terre à l'Huile d'Olive",
      en: "Pan-Seared Sea Bass Fillet with Olive Oil Crushed Potatoes",
      ar: "فيليه سمك القاروص المشوي مع بطاطس مهروسة بزيت الزيتون"
    },
    emoji: "🐟",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 440,
    tags: ["mediterranean", "french", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Filet de loup de mer ou bar", en: "Sea bass fillet", ar: "فيليه سمك قاروص" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Pommes de terre", en: "Potatoes", ar: "بطاطس" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Huile d'olive extra vierge & Fleur de sel", en: "Olive oil & sea salt", ar: "زيت زيتون وملح بحري" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Ciboulette & Quartier de citron", en: "Chives & lemon", ar: "ثوم معمر وليمون" }, quantity: 1, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites cuire les pommes de terre 15 min dans l'eau bouillante et écrasez-les grossièrement à la fourchette avec l'huile d'olive et la ciboulette.",
        "Faites poêler le loup de mer 3 min côté peau jusqu'à ce qu'il soit croustillant, puis 1 min sur l'autre face.",
        "Dressez le poisson doré sur l'écrasé de pommes de terre avec un filet de jus de citron."
      ],
      en: [
        "Boil potatoes for 15 mins and crush with a fork, olive oil, and chives.",
        "Pan-sear sea bass skin-down for 3 mins until crisp, flip for 1 min.",
        "Plate fish over crushed potatoes and squeeze fresh lemon."
      ],
      ar: [
        "اسلق البطاطس 15 دقيقة واهرسها بالشوكة مع زيت الزيتون والثوم المعمر.",
        "اشو السمك 3 دقائق من جهة الجلد حتى يقرمش ثم دقيقة للوجه الآخر.",
        "قدم السمك فوق البطاطس مع عصرة ليمون."
      ]
    }
  },
  {
    id: "m90",
    mealType: "dinner",
    title: {
      fr: "Tajine d'Agneau aux Pruneaux Caramélisés & Amandes Grillées",
      en: "Moroccan Lamb Tagine with Sweet Prunes & Toasted Almonds",
      ar: "طاجين اللحم بالبرقوق المعسل واللوز المحمص"
    },
    emoji: "🥘",
    prepTime: 15,
    cookTime: 30,
    difficulty: "medium",
    caloriesPerPerson: 560,
    tags: ["maghreb", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Morceaux d'agneau tendre (épaule)", en: "Tender lamb pieces", ar: "قطع لحم غنم" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Pruneaux dénoyautés & Miel", en: "Prunes & honey", ar: "برقوق وعسل" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Amandes entières émondées et dorées", en: "Toasted almonds", ar: "لوز محمص" }, quantity: 20, unit: "g", dept: "deptPantry" },
      { name: { fr: "Gingembre, cannelle, curcuma & oignon", en: "Tagine spices & onion", ar: "زنجبيل وقرفة وكركم وبصل" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites dorer l'agneau avec l'oignon et les épices dans une cocotte 5 min.",
        "Couvrez d'eau et laissez mijoter 25 minutes à feu doux.",
        "Dans une petite casserole, pochez les pruneaux 5 min avec une cuillère de miel et de cannelle.",
        "Dressez le tajine d'agneau fondant couronné des pruneaux confits et des amandes croquantes."
      ],
      en: [
        "Brown lamb with onion and spices in a pot for 5 mins.",
        "Cover with water and simmer covered for 25 mins until tender.",
        "Poach prunes with honey and cinnamon in a small pan for 5 mins.",
        "Serve succulent lamb topped with caramelized prunes and almonds."
      ],
      ar: [
        "حمر اللحم مع البصل والبهارات 5 دقائق.",
        "أضف الماء واتركه ينضج مغطى 25 دقيقة.",
        "عسل البرقوق مع ملعقة عسل وقرفة في قدر صغير 5 دقائق.",
        "قدم طاجين اللحم وزينه بالبرقوق المعسل واللوز المحمص."
      ]
    }
  },
  // --- PETITS DÉJEUNERS NUTRITIFS SUPPLEMENTAIRES ---
  {
    id: "b13",
    mealType: "breakfast",
    title: {
      fr: "Pain Perdu Brioché Léger à la Fleur d'Oranger & Cannelle",
      en: "Light Brioche French Toast with Orange Blossom & Cinnamon",
      ar: "فرنش توست خفيف بماء الزهر والقرفة"
    },
    emoji: "🍞",
    prepTime: 5,
    cookTime: 5,
    difficulty: "easy",
    caloriesPerPerson: 320,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Tranches de brioche ou pain complet", en: "Brioche or bread slices", ar: "شرائح بريوش أو خبز" }, quantity: 2, unit: "tranches", dept: "deptBakery" },
      { name: { fr: "Œuf frais & Lait", en: "Egg & milk", ar: "بيض وحليب" }, quantity: 1, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Eau de fleur d'oranger & Cannelle", en: "Orange blossom water & cinnamon", ar: "ماء زهر وقرفة" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Battez l'œuf avec le lait, la fleur d'oranger et la cannelle.",
        "Imbibez les tranches de pain des deux côtés.",
        "Faites dorer 2 min par face dans une poêle légèrement beurrée.",
        "Servez tiède avec quelques rondelles de fruits frais."
      ],
      en: [
        "Whisk egg with milk, orange blossom water, and cinnamon.",
        "Dip bread slices on both sides.",
        "Pan-fry for 2 mins each side in a lightly buttered pan.",
        "Serve warm with fresh fruit slices."
      ],
      ar: [
        "اخفق البيض مع الحليب وماء الزهر والقرفة.",
        "اغمس الخبز من الجانبين.",
        "حمر دقيقتين لكل جهة في مقلاة مدهونة بالزبدة.",
        "قدمه دافئاً مع شرائح الفواكه الطازجة."
      ]
    }
  },
  {
    id: "b14",
    mealType: "breakfast",
    title: {
      fr: "Bowl Granola Maison aux Noix de Pécan & Myrtilles",
      en: "Crunchy Pecan Granola Bowl with Fresh Blueberries",
      ar: "وعاء جرانولا بيتي مقرمش مع جوز البقان والتوت الأزرق"
    },
    emoji: "🥣",
    prepTime: 3,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 350,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Yaourt blanc ou végétal", en: "Yogurt", ar: "زبادي" }, quantity: 150, unit: "g", dept: "deptDairy" },
      { name: { fr: "Granola d'avoine aux noix de pécan", en: "Pecan oat granola", ar: "جرانولا الشوفان وجوز البقان" }, quantity: 40, unit: "g", dept: "deptPantry" },
      { name: { fr: "Myrtilles fraîches", en: "Fresh blueberries", ar: "توت أزرق طازج" }, quantity: 50, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Versez le yaourt dans un bol.",
        "Ajoutez le granola croustillant sur une moitié.",
        "Disposez les myrtilles fraîches sur l'autre moitié et dégustez immédiatement."
      ],
      en: [
        "Spoon yogurt into a bowl.",
        "Top one half with crunchy granola.",
        "Add fresh blueberries on the other half and enjoy."
      ],
      ar: [
        "ضع الزبادي في الوعاء.",
        "أضف الجرانولا المقرمشة في نصف الوعاء.",
        "ضع التوت الأزرق في النصف الآخر وتناوله فوراً."
      ]
    }
  },
  // --- SNACKS ET ENCAS SUPPLEMENTAIRES ---
  {
    id: "s10",
    mealType: "snack",
    title: {
      fr: "Pomme Fondante au Four à la Cannelle & Éclats de Noix",
      en: "Baked Cinnamon Apple with Toasted Walnuts",
      ar: "تفاحة مخبوزة بالفرن بالقرفة وعين الجمل"
    },
    emoji: "🍎",
    prepTime: 4,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 150,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietLowCalorie"],
    ingredients: [
      { name: { fr: "Pomme moyenne évidée", en: "Cored medium apple", ar: "تفاحة متوسطة" }, quantity: 1, unit: "pcs", dept: "deptProduce" },
      { name: { fr: "Cannelle moulue & Filet de miel", en: "Cinnamon & honey drizzle", ar: "قرفة وعسل" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
      { name: { fr: "Noix concassées", en: "Crushed walnuts", ar: "عين الجمل / جوز" }, quantity: 10, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Évidez le cœur de la pomme et déposez-la dans un petit plat à four.",
        "Saupoudrez de cannelle, ajoutez les noix concassées et une goutte de miel au centre.",
        "Faites cuire 12 min à 180°C jusqu'à ce que la pomme soit tendre et fondante."
      ],
      en: [
        "Core apple and place in a small ovenproof dish.",
        "Fill center with cinnamon, crushed walnuts, and a drop of honey.",
        "Bake for 12 mins at 180°C until soft and fragrant."
      ],
      ar: [
        "فرغ قلب التفاحة وضعها في صينية فرن.",
        "احش المنتصف بالقرفة والجوز وقليل من العسل.",
        "اخبز 12 دقيقة على 180 مئوية حتى تطرى وتصبح دافئة ولذيذة."
      ]
    }
  },
  {
    id: "s11",
    mealType: "snack",
    title: {
      fr: "Bâtonnets de Carottes Croquants & Houmous Onctueux Maison",
      en: "Crisp Carrot Sticks with Creamy Homemade Hummus",
      ar: "أصابع الجزر المقرمشة مع الحمص البيتي الناعم"
    },
    emoji: "🥕",
    prepTime: 4,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 140,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietLowCalorie", "dietQuick"],
    ingredients: [
      { name: { fr: "Carottes fraîches en bâtonnets", en: "Carrot sticks", ar: "أصابع جزر" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Houmous crémeux de pois chiches", en: "Creamy hummus", ar: "حمص متبل" }, quantity: 50, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Épluchez et coupez les carottes en bâtonnets réguliers.",
        "Déposez le houmous dans un ramequin avec un trait d'huile d'olive et de paprika.",
        "Dégustez pour un encas croquant, sain et riche en fibres."
      ],
      en: [
        "Peel and slice carrots into sticks.",
        "Spoon hummus into a small dish with paprika.",
        "Dip and enjoy a healthy crunchy high-fiber snack."
      ],
      ar: [
        "قشر الجزر وقطعه أصابع متساوية.",
        "ضع الحمص في وعاء مع رشة بابريكا.",
        "اغمس الجزر وتناوله كسناك صحي مقرمش وغني بالألياف."
      ]
    }
  },
  {
    id: "m91",
    mealType: "dinner",
    title: {
      fr: "Cannellonis Farcis Ricotta & Épinards Gratinés",
      en: "Baked Spinach & Ricotta Stuffed Cannelloni",
      ar: "كانيلوني محشوة بالسبانخ وجبن الريكوتا مخبوزة بالفرن"
    },
    emoji: "🍝",
    prepTime: 15,
    cookTime: 25,
    difficulty: "easy",
    caloriesPerPerson: 480,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Tubes de cannellonis précuits", en: "Cannelloni tubes", ar: "أنابيب كانيلوني" }, quantity: 4, unit: "pcs", dept: "deptPantry" },
      { name: { fr: "Ricotta fraîche & Épinards hachés", en: "Ricotta & chopped spinach", ar: "جبن ريكوتا وسبانخ" }, quantity: 180, unit: "g", dept: "deptDairy" },
      { name: { fr: "Coulis de tomate parfumé au basilic", en: "Tomato basil sauce", ar: "صلصة طماطم بالريحان" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Mozzarella râpée", en: "Grated mozzarella", ar: "جبن موزاريلا مبشور" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 190°C.",
        "Mélangez la ricotta avec les épinards, sel, poivre et muscade, puis farcissez les cannellonis.",
        "Nappez le fond d'un plat de coulis de tomate, déposez les cannellonis et recouvrez du reste de coulis.",
        "Saupoudrez de mozzarella et enfournez 25 minutes jusqu'à ce que le dessus soit bien gratiné."
      ],
      en: [
        "Preheat oven to 190°C (375°F).",
        "Mix ricotta, spinach, salt, pepper, and nutmeg; stuff cannelloni tubes.",
        "Layer tomato sauce in a dish, arrange stuffed tubes, top with more sauce.",
        "Sprinkle mozzarella and bake for 25 mins until golden and bubbly."
      ],
      ar: [
        "سخن الفرن على 190 مئوية.",
        "اخلط الريكوتا مع السبانخ والبهارات واحش أنابيب الكانيلوني.",
        "ضع صلصة الطماطم في الصينية ورتب الكانيلوني وغطها بباقي الصلصة.",
        "رش الموزاريلا واخبز 25 دقيقة حتى تتحمر."
      ]
    }
  },
  {
    id: "m92",
    mealType: "lunch",
    title: {
      fr: "Bowl Mexicain Végétarien Patates Douces Rôties & Avocat",
      en: "Veggie Mexican Bowl with Roasted Sweet Potatoes & Avocado",
      ar: "باول مكسيكي نباتي بالبطاطا الحلوة المشوية والأفوكادو"
    },
    emoji: "🥑",
    prepTime: 10,
    cookTime: 18,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["mexican", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Patate douce rôtie au paprika", en: "Paprika roasted sweet potato", ar: "بطاطا حلوة مشوية" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Haricots noirs & Maïs doux", en: "Black beans & corn", ar: "فاصوليا سوداء وذرة" }, quantity: 100, unit: "g", dept: "deptPantry" },
      { name: { fr: "Riz complet ou quinoa", en: "Brown rice or quinoa", ar: "أرز بني أو كينوا" }, quantity: 70, unit: "g", dept: "deptPantry" },
      { name: { fr: "Demi-avocat & Coriandre", en: "Avocado & cilantro", ar: "أفوكادو وكزبرة" }, quantity: 0.5, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Coupez la patate douce en dés, assaisonnez de paprika et huile d'olive, enfournez 18 min à 200°C.",
        "Déposez le riz au fond du bol.",
        "Ajoutez les dés de patate douce chaude, les haricots noirs, le maïs et les lamelles d'avocat.",
        "Arrosez d'un filet de jus de citron vert et de coriandre fraîche."
      ],
      en: [
        "Dice sweet potato, toss with oil and paprika, roast for 18 mins at 200°C.",
        "Place brown rice in a bowl.",
        "Top with warm sweet potatoes, black beans, corn, and avocado slices.",
        "Drizzle with fresh lime juice and cilantro."
      ],
      ar: [
        "قطع البطاطا الحلوة وتبلها واخبزها 18 دقيقة في الفرن.",
        "ضع الأرز في الوعاء.",
        "أضف البطاطا الحلوة الدافئة والفاصوليا والذرة وشرائح الأفوكادو.",
        "اسكب عصير الليمون الأخضر وزين بالكزبرة."
      ]
    }
  },
  {
    id: "m93",
    mealType: "dinner",
    title: {
      fr: "Bœuf Stroganoff Crémeux aux Champignons & Tagliatelles",
      en: "Creamy Beef Stroganoff with Sautéed Mushrooms & Tagliatelle",
      ar: "بيف ستروجانوف كريمي باللحم البقري والفطر والباستا"
    },
    emoji: "🥩",
    prepTime: 10,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 530,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Bavette ou rumsteck de bœuf émincé", en: "Beef steak strips", ar: "شرائح لحم بقري" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Champignons de Paris émincés", en: "Mushrooms", ar: "فطر مقطع" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Crème fraîche épaisse & Moutarde", en: "Sour cream & mustard", ar: "كريمة حامضة وخردل" }, quantity: 40, unit: "g", dept: "deptDairy" },
      { name: { fr: "Tagliatelles fraîches", en: "Tagliatelle pasta", ar: "باستا تالياتيلي" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites sauter les champignons et l'oignon dans une noisette de beurre 5 min.",
        "Saisissez les lamelles de bœuf à feu vif 2 minutes sans trop les cuire.",
        "Incorporez la crème, une pointe de moutarde et de paprika doux, chauffez 1 min.",
        "Servez immédiatement sur un nid de tagliatelles chaudes."
      ],
      en: [
        "Sauté mushrooms and onion in butter for 5 mins.",
        "Sear beef strips over high heat for 2 mins.",
        "Stir in cream, mustard, and paprika for 1 min.",
        "Serve hot over a nest of freshly cooked tagliatelle."
      ],
      ar: [
        "شوح الفطر والبصل في الزبدة 5 دقائق.",
        "اشو شرائح اللحم دقيقتين على نار عالية.",
        "اخلط الكريمة والخردل والبابريكا دقيقة واحدة.",
        "قدمه فوراً مع الباستا الساخنة."
      ]
    }
  },
  {
    id: "m94",
    mealType: "lunch",
    title: {
      fr: "Salade César Légère au Poulet Doré & Parmesan",
      en: "Light Chicken Caesar Salad with Crispy Croutons & Parmesan",
      ar: "سلطة سيزر خفيفة بالدجاج المشوي والبارميزان"
    },
    emoji: "🥗",
    prepTime: 10,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Blanc de poulet grillé émincé", en: "Grilled chicken breast", ar: "صدر دجاج مشوي" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Cœur de romaine croquant", en: "Romaine lettuce", ar: "خس روماني" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Copeaux de parmesan & Croûtons dorés", en: "Parmesan & baked croutons", ar: "بارميزان وقطع خبز محمصة" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Sauce césar allégée (yaourt, ail, citron)", en: "Light caesar dressing", ar: "صلصة سيزر خفيفة" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites dorer le poulet 6 min à la poêle avec sel, poivre et herbes.",
        "Coupez la salade romaine en morceaux et disposez dans un saladier.",
        "Ajoutez le poulet tiède émincé, les croûtons et les copeaux de parmesan.",
        "Nappez de sauce césar allégée au yaourt."
      ],
      en: [
        "Pan-sear chicken for 6 mins with herbs, salt and pepper.",
        "Chop romaine lettuce and place in a salad bowl.",
        "Add warm sliced chicken, croutons, and parmesan shavings.",
        "Toss with light yogurt caesar dressing."
      ],
      ar: [
        "اشو الدجاج 6 دقائق مع الأعشاب والملح.",
        "قطع الخس وضعه في صحن التقديم.",
        "أضف شرائح الدجاج والخبز المحمص وجبن البارميزان.",
        "اسكب صلصة السيزر الخفيفة وقدمها."
      ]
    }
  },
  {
    id: "m95",
    mealType: "dinner",
    title: {
      fr: "Curry Japonais Doux au Poulet & Carottes Fondantes",
      en: "Mild Japanese Chicken Curry with Carrots & Rice",
      ar: "كاري ياباني معتدل بالدجاج والجزر والأرز"
    },
    emoji: "🍛",
    prepTime: 12,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 510,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Blancs de poulet en cubes", en: "Chicken breast cubes", ar: "مكعبات دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Carottes et pommes de terre en morceaux", en: "Carrots & potatoes", ar: "جزر وبطاطس" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Curry japonais doux & bouillon", en: "Japanese curry roux & broth", ar: "كاري ياباني ومرق" }, quantity: 30, unit: "g", dept: "deptPantry" },
      { name: { fr: "Riz rond japonais cuit", en: "Japanese steamed rice", ar: "أرز ياباني" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir le poulet et les légumes dans une casserole huilée 4 min.",
        "Ajoutez 350ml d'eau et laissez mijoter 15 minutes jusqu'à ce que les carottes soient tendres.",
        "Incorporez le curry doux et mélangez 2 min jusqu'à ce que la sauce épaississe.",
        "Dressez le curry onctueux à côté d'un dôme de riz japonais."
      ],
      en: [
        "Sauté chicken and veggies in a pot for 4 mins.",
        "Add 350ml water, simmer for 15 mins until carrots are tender.",
        "Stir in mild Japanese curry until thick and glossy.",
        "Ladle next to a mound of steamed white rice."
      ],
      ar: [
        "شوح الدجاج والخضار 4 دقائق في قدر.",
        "أضف الماء واتركه ينضج 15 دقيقة حتى يطرى الجزر.",
        "اخلط معجون الكاري وقلب دقيقتين حتى تثقل الصلصة.",
        "قدم الكاري الدافئ بجانب الأرز الأبيض."
      ]
    }
  },
  {
    id: "m96",
    mealType: "dinner",
    title: {
      fr: "Tajine de Poisson Chermoula aux Poivrons & Pommes de Terre",
      en: "Moroccan Chermoula Fish Tagine with Bell Peppers",
      ar: "طاجين السمك بالشرمولة المغربية والفلفل والبطاطس"
    },
    emoji: "🐟",
    prepTime: 12,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 410,
    tags: ["maghreb", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Filet de poisson blanc épais (cabillaud/merlu)", en: "White fish fillet", ar: "فيليه سمك أبيض" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Poivron & Pomme de terre en rondelles", en: "Bell pepper & potato slices", ar: "فلفل وبطاطس شرائح" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Chermoula (persil, coriandre, ail, cumin, paprika)", en: "Chermoula herb marinade", ar: "شرمولة مغربية بالأعشاب" }, quantity: 2, unit: "c.à.s", dept: "deptSpices" },
      { name: { fr: "Tomate & Rondelle de citron", en: "Tomato & lemon slice", ar: "طماطم وليمون" }, quantity: 60, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Marinez le poisson dans la chermoula parfumée.",
        "Dans une sauteuse, disposez un lit de rondelles de pommes de terre et poivrons avec un demi-verre d'eau, laissez précuire 10 min.",
        "Déposez le poisson mariné et les rondelles de tomate sur les légumes.",
        "Couvrez et laissez mijoter 10 min jusqu'à cuisson parfaite du poisson."
      ],
      en: [
        "Coat fish in fragrant chermoula marinade.",
        "Layer potato and pepper slices in a skillet with a splash of water, cook 10 mins.",
        "Place marinated fish and tomato slices on top.",
        "Cover and simmer for 10 mins until fish is flaky."
      ],
      ar: [
        "تبل السمك بالشرمولة المغربية المعطرة.",
        "ضع شرائح البطاطس والفلفل مع قليل من الماء في المقلاة واطهها 10 دقائق.",
        "ضع السمك وشرائح الطماطم فوق الخضار.",
        "غط المقلاة 10 دقائق حتى ينضج السمك تماماً."
      ]
    }
  },
  {
    id: "m97",
    mealType: "lunch",
    title: {
      fr: "Tortilla Espagnole Traditionnelle aux Pommes de Terre",
      en: "Traditional Spanish Potato & Onion Omelette (Tortilla)",
      ar: "تورتيلا بطاطس إسبانية تقليدية بالبيض والبصل"
    },
    emoji: "🍳",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 410,
    tags: ["mediterranean", "dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 3, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Pommes de terre coupées en lamelles", en: "Thinly sliced potatoes", ar: "شرائح بطاطس رفيعة" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Oignon émincé & Huile d'olive", en: "Sliced onion & olive oil", ar: "بصل شرائح وزيت زيتون" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Salade verte d'accompagnement", en: "Green side salad", ar: "سلطة خضراء" }, quantity: 50, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites confire doucement les lamelles de pommes de terre et d'oignon dans l'huile d'olive 10 min à la poêle jusqu'à ce qu'elles soient très fondantes.",
        "Battez les œufs avec sel et poivre, versez sur les pommes de terre.",
        "Laissez cuire 4 min à feu doux, retournez à l'aide d'une assiette et faites dorer l'autre côté 2 min.",
        "Dégustez tiède ou froide avec la salade verte."
      ],
      en: [
        "Slow-cook sliced potatoes and onions in olive oil for 10 mins until meltingly soft.",
        "Whisk eggs with salt and pepper, pour over potatoes in pan.",
        "Cook for 4 mins, flip onto a plate and slide back to cook 2 mins.",
        "Serve warm or at room temperature with green salad."
      ],
      ar: [
        "اطه شرائح البطاطس والبصل في زيت الزيتون 10 دقائق حتى تطرى تماماً.",
        "اخفق البيض مع الملح واسكبه فوق البطاطس.",
        "اطه 4 دقائق ثم اقلب التورتيلا واطه الوجه الآخر دقيقتين.",
        "قدمها دافئة مع السلطة الخضراء."
      ]
    }
  },
  {
    id: "m98",
    mealType: "dinner",
    title: {
      fr: "Pavé de Thon Grillé à la Plancha & Haricots Verts Aillés",
      en: "Seared Tuna Steak with Garlic Sautéed Green Beans",
      ar: "ستيك تونة مشوي مع فاصوليا خضراء بالثوم وزيت الزيتون"
    },
    emoji: "🐟",
    prepTime: 5,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["mediterranean", "french", "dietBalanced", "dietHalal", "dietHighProtein", "dietLowCarb", "dietQuick"],
    ingredients: [
      { name: { fr: "Pavé de thon frais", en: "Fresh tuna steak", ar: "ستيك تونة طازجة" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Haricots verts frais ou surgelés", en: "Green beans", ar: "فاصوليا خضراء" }, quantity: 200, unit: "g", dept: "deptProduce" },
      { name: { fr: "Gousse d'ail, persil & huile d'olive", en: "Garlic, parsley & olive oil", ar: "ثوم وبقدونس وزيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" },
      { name: { fr: "Graines de sésame & Citron", en: "Sesame seeds & lemon", ar: "سمسم وليمون" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites cuire les haricots 5 min à l'eau bouillante et faites-les sauter 2 min à la poêle avec l'ail émincé.",
        "Dans une poêle très chaude avec un filet d'huile, saisissez le thon 1 min 30 par face pour garder un cœur rosé et fondant.",
        "Saupoudrez de sésame et servez avec les haricots verts et un quartier de citron."
      ],
      en: [
        "Boil green beans for 5 mins and sauté in garlic for 2 mins.",
        "Sear tuna steak in a smoking hot pan for 90 secs each side.",
        "Sprinkle with sesame seeds and serve with garlicky beans and lemon."
      ],
      ar: [
        "اسلق الفاصوليا 5 دقائق وشوحها مع الثوم دقيقتين.",
        "اشو ستيك التونة دقيقة ونصف لكل وجه في مقلاة ساخنة جداً.",
        "رش السمسم وقدمه مع الفاصوليا والليمون."
      ]
    }
  },
  {
    id: "m99",
    mealType: "lunch",
    title: {
      fr: "Wok de Crevettes & Nouilles Udon aux Légumes Croquants",
      en: "Shrimp & Chewy Udon Noodle Stir-Fry with Veggies",
      ar: "ووك الجمبري ونودلز الأودون بالخضار المقرمشة"
    },
    emoji: "🍤",
    prepTime: 8,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 450,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Nouilles udon fraîches", en: "Fresh udon noodles", ar: "نودلز أودون" }, quantity: 180, unit: "g", dept: "deptPantry" },
      { name: { fr: "Crevettes décortiquées", en: "Peeled shrimp", ar: "جمبري مقشر" }, quantity: 130, unit: "g", dept: "deptMeat" },
      { name: { fr: "Carottes râpées, chou & pois gourmands", en: "Stir-fry veggies", ar: "خضار مشكلة مقرمشة" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce soja sucrée & Huile de sésame", en: "Soy sauce & sesame oil", ar: "صلصة صويا وزيت سمسم" }, quantity: 2, unit: "c.à.s", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Dans un wok chaud avec l'huile de sésame, faites sauter les crevettes 2 min puis réservez.",
        "Faites sauter les légumes émincés 3 min à feu vif pour garder leur croquant.",
        "Ajoutez les nouilles udon et la sauce soja, faites sauter 2 minutes.",
        "Réincorporez les crevettes et servez bien chaud."
      ],
      en: [
        "Sear shrimp in a hot wok for 2 mins, set aside.",
        "Stir-fry crisp veggies for 3 mins.",
        "Toss in udon noodles and soy sauce, cook for 2 mins.",
        "Fold in shrimp and serve piping hot."
      ],
      ar: [
        "شوح الجمبري دقيقتين في مقلاة ووك ساخنة وضعه جانباً.",
        "شوح الخضار 3 دقائق على نار عالية.",
        "أضف نودلز الأودون وصلصة الصويا واطه دقيقتين.",
        "أعد الجمبري وقدمه ساخناً."
      ]
    }
  },
  {
    id: "m100",
    mealType: "dinner",
    title: {
      fr: "Velouté Doux de Courgettes Fondantes & Vache qui Rit",
      en: "Silky Zucchini & Melting Cheese Cream Soup",
      ar: "شوربة الكوسة الحريرية بالجبن الكريمي اللذيذ"
    },
    emoji: "🥣",
    prepTime: 5,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 240,
    tags: ["french", "dietBalanced", "dietVegetarian", "dietHalal", "dietLowCalorie", "dietQuick"],
    ingredients: [
      { name: { fr: "Courgettes fraîches non épluchées", en: "Fresh zucchinis", ar: "كوسة طازجة" }, quantity: 300, unit: "g", dept: "deptProduce" },
      { name: { fr: "Portions de fromage fondu (Vache qui rit/Kiri)", en: "Cream cheese portions", ar: "جبن مثلثات" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Bouillon de légumes", en: "Vegetable broth", ar: "مرق خضار" }, quantity: 300, unit: "ml", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Coupez les courgettes en rondelles et faites-les cuire 12 min dans le bouillon frémissant (ou au robot cuiseur).",
        "Ajoutez les portions de fromage fondu.",
        "Mixez finement jusqu'à obtenir un velouté ultra crémeux et onctueux.",
        "Servez dans des bols avec une pincée de poivre."
      ],
      en: [
        "Slice zucchinis and cook in simmering broth for 12 mins.",
        "Add cheese portions.",
        "Blend at high speed into an ultra-silky cream soup.",
        "Ladle into bowls and season with pepper."
      ],
      ar: [
        "قطع الكوسة شرائح واطهها في المرق 12 دقيقة.",
        "أضف قطع الجبن الكريمي.",
        "اخلط جيداً بالخلاط حتى تصبح كريمية وناعمة جداً.",
        "اسكب في أوعية وقدمها دافئة."
      ]
    }
  },
  // --- PETITS DEJEUNERS SUPPLEMENTAIRES ---
  {
    id: "b15",
    mealType: "breakfast",
    title: {
      fr: "Toast Œufs Brouillés Crémeux, Saumon Fumé & Ciboulette",
      en: "Creamy Scrambled Egg & Smoked Salmon Brioche Toast",
      ar: "توست البيض المخفوق الكريمي مع السلمون المدخن والشبت"
    },
    emoji: "🥪",
    prepTime: 4,
    cookTime: 4,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Pain complet ou brioché grillé", en: "Toasted bread", ar: "خبز محمص" }, quantity: 1, unit: "tranches", dept: "deptBakery" },
      { name: { fr: "Œufs frais bio", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Saumon fumé en lanières", en: "Smoked salmon", ar: "سلمون مدخن" }, quantity: 40, unit: "g", dept: "deptMeat" },
      { name: { fr: "Ciboulette fraîche & Noisette de beurre", en: "Chives & butter", ar: "ثوم معمر وزبدة" }, quantity: 1, unit: "c.à.c", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Faites brouiller doucement les œufs au beurre à feu très doux 3 min pour une texture très crémeuse.",
        "Déposez les œufs brouillés sur la tranche de pain toastée.",
        "Drappez avec les lanières de saumon fumé et parsemez de ciboulette."
      ],
      en: [
        "Slowly scramble eggs in butter over low heat for 3 mins until creamy.",
        "Spoon scrambled eggs onto toasted bread.",
        "Top with ribbons of smoked salmon and chopped chives."
      ],
      ar: [
        "اخفق البيض في الزبدة على نار هادئة 3 دقائق حتى يصبح كريمياً.",
        "ضع البيض المخفوق فوق الخبز المحمص.",
        "زين بشرائح السلمون المدخن والثوم المعمر."
      ]
    }
  },
  {
    id: "b16",
    mealType: "breakfast",
    title: {
      fr: "Pudding Chia au Lait de Coco & Coulis de Mangue",
      en: "Coconut Chia Seed Pudding with Mango Puree",
      ar: "بودينغ بذور الشيا بحليب جوز الهند وصلصة المانجو"
    },
    emoji: "🥥",
    prepTime: 5,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 290,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Graines de chia", en: "Chia seeds", ar: "بذور الشيا" }, quantity: 25, unit: "g", dept: "deptPantry" },
      { name: { fr: "Lait de coco ou d'amande", en: "Coconut or almond milk", ar: "حليب جوز هند أو لوز" }, quantity: 140, unit: "ml", dept: "deptPantry" },
      { name: { fr: "Coulis de mangue ou fruits de la passion", en: "Mango puree", ar: "صلصة مانجو" }, quantity: 40, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Mélangez les graines de chia avec le lait de coco et laissez gonfler 15 min au frais.",
        "Nappez de coulis de mangue fraîche.",
        "Dégustez ce pudding frais, onctueux et riche en oméga-3."
      ],
      en: [
        "Mix chia seeds with coconut milk and chill for 15 mins to thicken.",
        "Pour mango puree over top.",
        "Enjoy a chilled omega-3 rich breakfast."
      ],
      ar: [
        "اخلط بذور الشيا مع حليب جوز الهند واتركها 15 دقيقة في الثلاجة.",
        "اسكب صلصة المانجو الطازجة في الأعلى.",
        "تناول هذا البودينغ المنعش والغني بالأوميغا 3."
      ]
    }
  },
  // --- SNACKS SUPPLEMENTAIRES ---
  {
    id: "s12",
    mealType: "snack",
    title: {
      fr: "Compote Maison Pomme-Poire & Amandes Effilées",
      en: "Homemade Apple-Pear Compote with Toasted Almonds",
      ar: "كومبوت تفاح وإجاص بيتي مع رقائق اللوز المحمص"
    },
    emoji: "🍐",
    prepTime: 5,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 130,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietLowCalorie"],
    ingredients: [
      { name: { fr: "Pomme & Poire coupées en dés", en: "Diced apple & pear", ar: "تفاح وإجاص مكعبات" }, quantity: 180, unit: "g", dept: "deptProduce" },
      { name: { fr: "Amandes effilées grillées", en: "Sliced toasted almonds", ar: "رقائق لوز محمص" }, quantity: 10, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites compoter les fruits dans une petite casserole avec 2 c.à.s d'eau 10 minutes.",
        "Écrasez à la fourchette pour garder de la texture.",
        "Servez tiède ou frais parsemé d'amandes effilées croquantes."
      ],
      en: [
        "Simmer fruit chunks with a splash of water for 10 mins.",
        "Mash with a fork for a rustic texture.",
        "Serve with crunchy toasted almond slices."
      ],
      ar: [
        "اطه قطع الفواكه مع قليل من الماء 10 دقائق.",
        "اهرس بالشوكة للحصول على قوام متماسك.",
        "قدمه دافئاً أو بارداً مع رقائق اللوز المقرمش."
      ]
    }
  },
  {
    id: "m101",
    mealType: "lunch",
    title: {
      fr: "Couscous Perlé aux Légumes Rôtis & Feta Émiettée",
      en: "Mediterranean Pearl Couscous with Roasted Veggies & Feta",
      ar: "كسكسي الحبات الكبيرة بالخضار المشوية وجبن الفيتا"
    },
    emoji: "🥗",
    prepTime: 10,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 430,
    tags: ["mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Couscous perlé ou moghrabieh", en: "Pearl couscous", ar: "مغربية / كسكسي كبير" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Courgette, poivron & tomates cerises rôties", en: "Roasted Mediterranean veggies", ar: "خضار مشوية" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Feta grecque émiettée", en: "Crumbled feta", ar: "جبن فيتا" }, quantity: 40, unit: "g", dept: "deptDairy" },
      { name: { fr: "Huile d'olive, jus de citron & menthe", en: "Olive oil, lemon & mint", ar: "زيت زيتون وليمون ونعناع" }, quantity: 1, unit: "c.à.s", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites cuire le couscous perlé 10 min dans l'eau bouillante salée, puis égouttez.",
        "Faites rôtir les dés de légumes à la poêle avec l'huile d'olive et les herbes 8 min.",
        "Mélangez le couscous chaud avec les légumes dorés et le jus de citron.",
        "Parsemez de feta émiettée et de feuilles de menthe fraîche."
      ],
      en: [
        "Boil pearl couscous for 10 mins and drain.",
        "Pan-roast diced veggies in olive oil with herbs for 8 mins.",
        "Toss couscous with warm vegetables and lemon juice.",
        "Top with crumbled feta and fresh mint."
      ],
      ar: [
        "اسلق الكسكسي الكبير 10 دقائق وصفه.",
        "اشو الخضار في المقلاة مع زيت الزيتون والأعشاب 8 دقائق.",
        "اخلط الكسكسي مع الخضار المشوية وعصير الليمون.",
        "زين بجبن الفيتا والنعناع الطازج."
      ]
    }
  },
  {
    id: "m102",
    mealType: "dinner",
    title: {
      fr: "Escalope de Dinde Fondante à la Crème & Champignons",
      en: "Tender Turkey Cutlet in Creamy Mushroom Sauce",
      ar: "شريحة ديك رومي طرية بصلصة الفطر الكريمية"
    },
    emoji: "🍄",
    prepTime: 5,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Escalope de dinde", en: "Turkey cutlet", ar: "شريحة ديك رومي" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Champignons de Paris frais émincés", en: "Sliced mushrooms", ar: "فطر طازج" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Crème liquide légère", en: "Light cooking cream", ar: "كريمة طبخ خفيفة" }, quantity: 40, unit: "ml", dept: "deptDairy" },
      { name: { fr: "Riz basmati ou tagliatelles", en: "Basmati rice or pasta", ar: "أرز أو معكرونة" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites dorer l'escalope 3 min par face dans une poêle avec une noisette de beurre, puis réservez.",
        "Faites revenir les champignons émincés 4 min dans la même poêle.",
        "Versez la crème, assaisonnez de sel, poivre et persil, et remettez l'escalope 2 min pour la napper de sauce.",
        "Servez chaud avec du riz ou des pâtes."
      ],
      en: [
        "Sear cutlet for 3 mins each side in butter, then set aside.",
        "Sauté mushrooms in the same pan for 4 mins.",
        "Pour cream, season with parsley, salt and pepper, return cutlet for 2 mins.",
        "Serve hot over rice or pasta."
      ],
      ar: [
        "حمر شريحة اللحم 3 دقائق لكل جهة في الزبدة ثم ارفعها جانباً.",
        "شوح الفطر 4 دقائق في نفس المقلاة.",
        "اسكب الكريمة وتبل بالبقدونس والملح وأعد الشريحة دقيقتين.",
        "قدمها ساخنة مع الأرز أو الباستا."
      ]
    }
  },
  {
    id: "m103",
    mealType: "dinner",
    title: {
      fr: "Shakshuka Verte aux Épinards, Courgettes & Œufs",
      en: "Green Shakshuka with Sautéed Spinach, Zucchini & Eggs",
      ar: "شكشوكة خضراء بالسبانخ والكوسة والبيض وجبن الفيتا"
    },
    emoji: "🍳",
    prepTime: 8,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["mediterranean", "maghreb", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Œufs frais bio", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Pousses d'épinards & Courgette râpée", en: "Baby spinach & zucchini", ar: "سبانخ وكوسة مبشورة" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Feta émiettée & Oignon vert", en: "Feta & scallions", ar: "جبن فيتا وبصل أخضر" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Cumin, ail & huile d'olive", en: "Cumin, garlic & olive oil", ar: "كمون وثوم وزيت زيتون" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" }
    ],
    instructions: {
      fr: [
        "Faites suer la courgette râpée, les épinards et l'ail dans l'huile d'olive 4 min.",
        "Creusez deux puits dans la poêle verte et cassez-y les œufs.",
        "Couvrez et laissez cuire 3-4 min jusqu'à ce que les blancs soient pris.",
        "Émiettez la feta sur le dessus et dégustez avec du pain grillé."
      ],
      en: [
        "Sauté grated zucchini, spinach, and garlic in olive oil for 4 mins.",
        "Make wells in greens and crack eggs directly inside.",
        "Cover and cook for 3-4 mins until whites set.",
        "Scatter feta over top and serve with warm crusty bread."
      ],
      ar: [
        "شوح الكوسة المبشورة والسبانخ والثوم في الزيت 4 دقائق.",
        "اصنع فجوتين واكسر البيض بداخلهما.",
        "غط المقلاة 3-4 دقائق حتى يتماسك بياض البيض.",
        "رش جبن الفيتا وقدمها مع الخبز المحمص."
      ]
    }
  },
  {
    id: "m104",
    mealType: "lunch",
    title: {
      fr: "Fish Tacos Croustillants & Sauce Crémeuse Citron Vert",
      en: "Crispy Baja Fish Tacos with Creamy Lime Slaw",
      ar: "تاكوس السمك المقرمش مع صلصة الليمون الأخضر الكريمية"
    },
    emoji: "🌮",
    prepTime: 10,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["mexican", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Filet de cabillaud ou colin", en: "Cod fillet", ar: "فيليه سمك القد" }, quantity: 150, unit: "g", dept: "deptMeat" },
      { name: { fr: "Tortillas de maïs ou blé", en: "Tortillas", ar: "تورتيلا" }, quantity: 2, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Chou rouge émincé & Coriandre", en: "Red cabbage slaw & cilantro", ar: "ملفوف أحمر وكزبرة" }, quantity: 60, unit: "g", dept: "deptProduce" },
      { name: { fr: "Sauce crémeuse (yaourt, citron vert, paprika)", en: "Lime yogurt crema", ar: "صلصة ليمون بالزبادي" }, quantity: 30, unit: "g", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Assaisonnez le poisson de paprika et faites-le dorer 3 min par face à la poêle.",
        "Chauffez les tortillas à sec 30 secondes.",
        "Garnissez chaque tortilla de chou croquant, de morceaux de poisson doré et de sauce crémeuse au citron vert.",
        "Dégustez immédiatement bien chaud et croustillant."
      ],
      en: [
        "Season fish with paprika and pan-sear for 3 mins each side.",
        "Warm tortillas in a dry skillet for 30 secs.",
        "Assemble with crisp slaw, flaky fish chunks, and lime crema.",
        "Serve immediately with fresh lime wedges."
      ],
      ar: [
        "تبل السمك بالبابريكا واقله 3 دقائق لكل جانب.",
        "سخن التورتيلا 30 ثانية في مقلاة جافة.",
        "احش التورتيلا بالملفوف والسمك وصلصة الليمون الكريمية.",
        "قدم التاكوس فوراً وهو دافئ ومقرمش."
      ]
    }
  },
  {
    id: "m105",
    mealType: "dinner",
    title: {
      fr: "Risotto aux Crevettes, Safran & Zeste de Citron",
      en: "Saffron & Shrimp Risotto with Fresh Lemon Zest",
      ar: "ريزوتو الجمبري المعطر بالزعفران وبرش الليمون"
    },
    emoji: "🍤",
    prepTime: 10,
    cookTime: 20,
    difficulty: "medium",
    caloriesPerPerson: 490,
    tags: ["italian", "dietBalanced", "dietHalal", "dietHighProtein"],
    ingredients: [
      { name: { fr: "Riz arborio pour risotto", en: "Arborio rice", ar: "أرز ريزوتو" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Crevettes décortiquées", en: "Peeled shrimp", ar: "جمبري مقشر" }, quantity: 130, unit: "g", dept: "deptMeat" },
      { name: { fr: "Dose de safran ou curcuma & Zeste de citron", en: "Saffron & lemon zest", ar: "زعفران وبرش ليمون" }, quantity: 1, unit: "pincée", dept: "deptSpices" },
      { name: { fr: "Parmesan râpé & Bouillon de légumes", en: "Parmesan & broth", ar: "جبن بارميزان ومرق" }, quantity: 350, unit: "ml", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites nacrer le riz dans un filet d'huile 2 min, puis ajoutez le safran.",
        "Mouillez avec le bouillon chaud louche après louche pendant 18 min en remuant.",
        "Faites sauter les crevettes 2 min à la poêle et ajoutez-les au risotto en fin de cuisson.",
        "Liez hors du feu avec le parmesan et le zeste de citron frais."
      ],
      en: [
        "Toast arborio rice in oil for 2 mins, stir in saffron.",
        "Gradually add warm broth for 18 mins while stirring.",
        "Sear shrimp for 2 mins and fold into risotto at the end.",
        "Stir in parmesan and fresh lemon zest off heat."
      ],
      ar: [
        "حمص الأرز دقيقتين في الزيت وأضف الزعفران.",
        "أضف المرق تدريجياً مع التحريك المستمر 18 دقيقة.",
        "شوح الجمبري دقيقتين وأضفه إلى الريزوتو في النهاية.",
        "اخلط جبن البارميزان وبرش الليمون بعد رفعه عن النار."
      ]
    }
  },
  {
    id: "m106",
    mealType: "lunch",
    title: {
      fr: "Gnocchis Sauce Tomate Maison, Mozzarella & Basilic",
      en: "Pan-Fried Gnocchi in Rustic Tomato Sauce with Melted Mozzarella",
      ar: "نيوكي بصلصة الطماطم البيتي والموزاريلا الذائبة والريحان"
    },
    emoji: "🍅",
    prepTime: 5,
    cookTime: 10,
    difficulty: "easy",
    caloriesPerPerson: 460,
    tags: ["italian", "dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Gnocchis à poêler", en: "Pan-fry gnocchi", ar: "نيوكي" }, quantity: 180, unit: "g", dept: "deptPantry" },
      { name: { fr: "Coulis de tomate parfumé à l'ail", en: "Garlic tomato sauce", ar: "صلصة طماطم بالثوم" }, quantity: 120, unit: "g", dept: "deptProduce" },
      { name: { fr: "Mozzarella en dés fondants", en: "Diced mozzarella", ar: "مكعبات موزاريلا" }, quantity: 45, unit: "g", dept: "deptDairy" },
      { name: { fr: "Feuilles de basilic frais", en: "Fresh basil leaves", ar: "أوراق ريحان" }, quantity: 10, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites dorer les gnocchis 5 min dans une poêle avec une noisette de beurre.",
        "Versez le coulis de tomate chaud sur les gnocchis croustillants.",
        "Ajoutez les dés de mozzarella, couvrez 2 min pour laisser le fromage fondre.",
        "Décorez de basilic frais et servez immédiatement."
      ],
      en: [
        "Pan-sear gnocchi in butter for 5 mins until crisp.",
        "Pour warm tomato sauce over gnocchi.",
        "Top with mozzarella cubes, cover for 2 mins to melt.",
        "Garnish with fresh basil and serve."
      ],
      ar: [
        "حمر النيوكي 5 دقائق في الزبدة حتى يقرمش.",
        "اسكب صلصة الطماطم الدافئة فوق النيوكي.",
        "أضف مكعبات الموزاريلا وغط المقلاة دقيقتين حتى تذوب.",
        "زين بأوراق الريحان وقدمه فوراً."
      ]
    }
  },
  {
    id: "m107",
    mealType: "dinner",
    title: {
      fr: "Brochettes de Poulet Satay & Sauce Cacahuète Onctueuse",
      en: "Chicken Satay Skewers with Creamy Peanut Sauce",
      ar: "أسياخ دجاج ساتاي الآسيوية بصلصة الفول السوداني الغنية"
    },
    emoji: "🍢",
    prepTime: 12,
    cookTime: 8,
    difficulty: "easy",
    caloriesPerPerson: 490,
    tags: ["asian", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Aiguillettes de poulet enfilées sur piques", en: "Chicken skewers", ar: "أسياخ دجاج" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Beurre de cacahuète pur & Lait de coco", en: "Peanut butter & coconut milk", ar: "زبدة فول سوداني وحليب جوز هند" }, quantity: 50, unit: "g", dept: "deptPantry" },
      { name: { fr: "Sauce soja, curcuma & citron vert", en: "Soy sauce, turmeric & lime", ar: "صلصة صويا وكركم وليمون" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" },
      { name: { fr: "Riz jasmin cuit & Concombre frais", en: "Jasmine rice & cucumber", ar: "أرز ياسمين وخيار" }, quantity: 80, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites griller les brochettes de poulet au curcuma 7 min à la poêle huilée.",
        "Dans une petite casserole, émulsionnez le beurre de cacahuète avec le lait de coco, la sauce soja et le citron vert pour faire la sauce satay.",
        "Nappez les brochettes de sauce chaude et servez avec le riz jasmin et des rondelles de concombre frais."
      ],
      en: [
        "Pan-sear turmeric chicken skewers for 7 mins.",
        "Whisk peanut butter, coconut milk, soy sauce, and lime juice in a small pan to make satay sauce.",
        "Drizzle sauce over skewers and serve with jasmine rice and cucumber."
      ],
      ar: [
        "اشو أسياخ الدجاج المتبلة بالكركم 7 دقائق في المقلاة.",
        "اخلط زبدة الفول السوداني مع حليب جوز الهند وصلصة الصويا والليمون لتحضير صلصة الساتاي.",
        "اسكب الصلصة فوق الأسياخ وقدمها مع الأرز والخيار."
      ]
    }
  },
  {
    id: "m108",
    mealType: "dinner",
    title: {
      fr: "Curry Chana Masala aux Pois Chiches & Épinards",
      en: "Indian Chana Masala Chickpea & Spinach Curry",
      ar: "شانا ماسالا الهندية بالحمص والسبانخ والأرز البسمتي"
    },
    emoji: "🍛",
    prepTime: 8,
    cookTime: 15,
    difficulty: "easy",
    caloriesPerPerson: 420,
    tags: ["indian", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber"],
    ingredients: [
      { name: { fr: "Pois chiches cuits égouttés", en: "Cooked chickpeas", ar: "حمص مسلوق" }, quantity: 180, unit: "g", dept: "deptPantry" },
      { name: { fr: "Pousses d'épinards fraîches", en: "Fresh baby spinach", ar: "سبانخ طازجة" }, quantity: 100, unit: "g", dept: "deptProduce" },
      { name: { fr: "Tomates concassées & Garam Masala", en: "Diced tomatoes & garam masala", ar: "طماطم معصورة وجارام ماسالا" }, quantity: 150, unit: "g", dept: "deptPantry" },
      { name: { fr: "Riz basmati (accompagnement)", en: "Basmati rice", ar: "أرز بسمتي" }, quantity: 70, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Faites revenir l'ail, le gingembre et les épices garam masala 1 min dans une sauteuse.",
        "Ajoutez les tomates concassées et les pois chiches, laissez mijoter 10 minutes.",
        "Incorporez les épinards qui vont fondre en 2 minutes.",
        "Dégustez bien chaud avec le riz basmati."
      ],
      en: [
        "Sauté garlic, ginger, and garam masala for 1 min.",
        "Add tomatoes and chickpeas, simmer for 10 mins.",
        "Stir in baby spinach for 2 mins until wilted.",
        "Serve hot over fluffy basmati rice."
      ],
      ar: [
        "شوح الثوم والزنجبيل والبهارات دقيقة واحدة في قدر.",
        "أضف الطماطم والحمص واتركه يغلي 10 دقائق.",
        "أضف السبانخ وقلب دقيقتين حتى تذبل.",
        "قدمه ساخناً مع أرز البسمتي."
      ]
    }
  },
  {
    id: "m109",
    mealType: "dinner",
    title: {
      fr: "Soupe de Lentilles Corail à la Turque & Menthe Séchée",
      en: "Turkish Red Lentil Soup (Mercimek Çorbası) with Mint Butter",
      ar: "شوربة العدس التركية (ميرجيمك) بالنعناع المجفف والليمون"
    },
    emoji: "🥣",
    prepTime: 8,
    cookTime: 20,
    difficulty: "easy",
    caloriesPerPerson: 320,
    tags: ["mediterranean", "dietBalanced", "dietVegetarian", "dietHalal", "dietHighFiber", "dietLowCalorie"],
    ingredients: [
      { name: { fr: "Lentilles corail rincées", en: "Red lentils", ar: "عدس أحمر" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Carotte, oignon & pomme de terre", en: "Carrot, onion & potato", ar: "جزر وبصل وبطاطس" }, quantity: 150, unit: "g", dept: "deptProduce" },
      { name: { fr: "Beurre, menthe séchée & piment doux", en: "Mint-paprika butter drizzle", ar: "زبدة بالنعناع والبابريكا" }, quantity: 15, unit: "g", dept: "deptDairy" },
      { name: { fr: "Quartier de citron", en: "Lemon wedge", ar: "ليمون" }, quantity: 1, unit: "pcs", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Faites cuire les lentilles, la carotte et la pomme de terre dans 500ml de bouillon 18 minutes.",
        "Mixez finement jusqu'à consistance soyeuse.",
        "Faites fondre le beurre avec la menthe séchée et le piment 1 min.",
        "Versez la soupe dans des bols, nappez de beurre parfumé et servez avec du citron."
      ],
      en: [
        "Boil lentils, carrot, and potato in broth for 18 mins.",
        "Blend until velvet smooth.",
        "Melt butter with dried mint and mild paprika for 1 min.",
        "Ladle into bowls, drizzle mint butter, and serve with lemon."
      ],
      ar: [
        "اطه العدس والجزر والبطاطس في المرق 18 دقيقة.",
        "اخلط جيداً بالخلاط حتى يصبح القوام ناعماً كالحرير.",
        "ذوب الزبدة مع النعناع المجفف والبابريكا دقيقة واحدة.",
        "اسكب الشوربة وزين بصلصة الزبدة بالنعناع وقدمها مع الليمون."
      ]
    }
  },
  {
    id: "m110",
    mealType: "lunch",
    title: {
      fr: "Filet de Colin en Croûte d'Herbes & Riz Complet",
      en: "Herb-Crusted Pollock Fillet with Brown Rice & Lemon",
      ar: "فيليه سمك مع طبقة أعشاب مقرمشة مع أرز بني وليمون"
    },
    emoji: "🐟",
    prepTime: 8,
    cookTime: 12,
    difficulty: "easy",
    caloriesPerPerson: 380,
    tags: ["french", "dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Filet de colin ou cabillaud", en: "Pollock fillet", ar: "فيليه سمك" }, quantity: 160, unit: "g", dept: "deptMeat" },
      { name: { fr: "Chapelure, persil, thym & huile d'olive", en: "Herb crust mix", ar: "أعشاب وبقسماط وزيت" }, quantity: 25, unit: "g", dept: "deptPantry" },
      { name: { fr: "Riz complet cuit", en: "Cooked brown rice", ar: "أرز بني مطبوخ" }, quantity: 80, unit: "g", dept: "deptPantry" },
      { name: { fr: "Courgette sautée en dés", en: "Sautéed diced zucchini", ar: "كوسة مكعبات" }, quantity: 100, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Préchauffez le four à 200°C.",
        "Déposez le filet de poisson dans un plat, recouvrez de la croûte d'herbes et chapelure.",
        "Enfournez 12 minutes jusqu'à ce que la croûte soit bien dorée et croustillante.",
        "Servez avec le riz complet et les dés de courgettes sautées."
      ],
      en: [
        "Preheat oven to 200°C (400°F).",
        "Place fish in baking dish and top with herb breadcrumb crust.",
        "Bake for 12 mins until crust is golden and crunchy.",
        "Serve alongside brown rice and sautéed zucchini."
      ],
      ar: [
        "سخن الفرن على 200 مئوية.",
        "ضع السمك في صينية وغطه بطبقة الأعشاب والبقسماط.",
        "اخبز 12 دقيقة حتى تصبح الطبقة مقرمشة وذهبية.",
        "قدمه مع الأرز البني والكوسة المشوحة."
      ]
    }
  },
  // --- PETITS DEJEUNERS SUPPLEMENTAIRES ---
  {
    id: "b17",
    mealType: "breakfast",
    title: {
      fr: "Bagel Complet au Fromage Frais, Concombre & Truite Fumée",
      en: "Whole Grain Bagel with Cream Cheese & Smoked Trout",
      ar: "باغل الحبوب الكاملة بالجبن الكريمي وشرائح السلمون والخيار"
    },
    emoji: "🥯",
    prepTime: 4,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 360,
    tags: ["dietBalanced", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Bagel complet toasté", en: "Whole wheat bagel", ar: "خبز باغل كامل" }, quantity: 1, unit: "pcs", dept: "deptBakery" },
      { name: { fr: "Fromage frais à tartiner", en: "Cream cheese", ar: "جبن كريمي" }, quantity: 30, unit: "g", dept: "deptDairy" },
      { name: { fr: "Truite ou saumon fumé", en: "Smoked trout or salmon", ar: "سلمون مدخن" }, quantity: 40, unit: "g", dept: "deptMeat" },
      { name: { fr: "Rondelles de concombre & Aneth", en: "Cucumber & dill", ar: "خيار وشبت" }, quantity: 30, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Coupez le bagel en deux et toastez-le légèrement.",
        "Tartinez de fromage frais.",
        "Disposez les lanières de truite fumée, les rondelles de concombre et l'aneth frais."
      ],
      en: [
        "Halve and toast the bagel.",
        "Spread with cream cheese.",
        "Layer smoked trout, cucumber ribbons, and fresh dill."
      ],
      ar: [
        "اقطع الباغل نصفين وحمصه خفيفاً.",
        "ادهن بالجبن الكريمي.",
        "رتب شرائح السلمون المدخن والخيار والشبت."
      ]
    }
  },
  {
    id: "b18",
    mealType: "breakfast",
    title: {
      fr: "Pancakes Protéinés Avoine & Compote de Pommes",
      en: "Oat Protein Pancakes with Warm Spiced Applesauce",
      ar: "بان كيك الشوفان الغني بالبروتين مع صلصة التفاح الدافئة"
    },
    emoji: "🥞",
    prepTime: 5,
    cookTime: 6,
    difficulty: "easy",
    caloriesPerPerson: 330,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietHighProtein", "dietQuick"],
    ingredients: [
      { name: { fr: "Flocons d'avoine mixés", en: "Ground oats", ar: "شوفان مطحون" }, quantity: 50, unit: "g", dept: "deptPantry" },
      { name: { fr: "Fromage blanc ou yaourt grec", en: "Greek yogurt", ar: "زبادي يوناني" }, quantity: 60, unit: "g", dept: "deptDairy" },
      { name: { fr: "Œufs frais", en: "Eggs", ar: "بيض" }, quantity: 2, unit: "pcs", dept: "deptDairy" },
      { name: { fr: "Compote de pommes sans sucre ajouté", en: "Unsweetened applesauce", ar: "صلصة تفاح" }, quantity: 60, unit: "g", dept: "deptProduce" }
    ],
    instructions: {
      fr: [
        "Battez l'avoine avec le fromage blanc et les œufs.",
        "Faites cuire des petits pancakes 2 min par face dans une poêle antiadhésive huilée.",
        "Dégustez la pile de pancakes avec la compote de pommes tiède."
      ],
      en: [
        "Whisk oats with yogurt and eggs into a batter.",
        "Cook pancakes for 2 mins each side in a greased pan.",
        "Stack and top with warm applesauce."
      ],
      ar: [
        "اخفق الشوفان مع الزبادي والبيض.",
        "اطه قطع البان كيك دقيقتين لكل وجه في المقلاة.",
        "قدمها مع صلصة التفاح الدافئة."
      ]
    }
  },
  // --- SNACKS SUPPLEMENTAIRES ---
  {
    id: "s13",
    mealType: "snack",
    title: {
      fr: "Mousse Express au Chocolat Noir Intense 70%",
      en: "Quick 2-Ingredient Dark Chocolate Mousse",
      ar: "موس الشوكولاتة الداكنة 70% الخفيفة والسريعة"
    },
    emoji: "🍫",
    prepTime: 5,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 160,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal"],
    ingredients: [
      { name: { fr: "Chocolat noir 70% fondu", en: "Melted 70% dark chocolate", ar: "شوكولاتة داكنة ذائبة" }, quantity: 25, unit: "g", dept: "deptPantry" },
      { name: { fr: "Blancs d'œufs battus en neige ferme", en: "Whipped egg whites", ar: "بياض بيض مخفوق" }, quantity: 2, unit: "pcs", dept: "deptDairy" }
    ],
    instructions: {
      fr: [
        "Montez les blancs d'œufs en neige très ferme avec une pincée de sel.",
        "Incorporez délicatement le chocolat noir tiède à la spatule.",
        "Placez 20 min au frais pour une mousse aérée et intensément chocolatée."
      ],
      en: [
        "Whip egg whites into stiff peaks with a pinch of salt.",
        "Gently fold in melted dark chocolate with a spatula.",
        "Chill for 20 mins for an airy intense chocolate mousse."
      ],
      ar: [
        "اخفق بياض البيض حتى يتماسك تماماً.",
        "اخلط الشوكولاتة الذائبة برفق باستخدام ملعقة.",
        "اتركه يبرد 20 دقيقة في الثلاجة للحصول على موس خفيف ولذيذ."
      ]
    }
  },
  {
    id: "s14",
    mealType: "snack",
    title: {
      fr: "Poignée d'Amandes & Noisettes Grillées Nature",
      en: "Handful of Roasted Unsalted Almonds & Hazelnuts",
      ar: "حفنة من اللوز والبندق المحمص غير المملح"
    },
    emoji: "🥜",
    prepTime: 1,
    cookTime: 0,
    difficulty: "easy",
    caloriesPerPerson: 170,
    tags: ["dietBalanced", "dietVegetarian", "dietHalal", "dietQuick"],
    ingredients: [
      { name: { fr: "Amandes et noisettes entières non salées", en: "Raw or roasted nuts", ar: "لوز وبندق غير مملح" }, quantity: 30, unit: "g", dept: "deptPantry" }
    ],
    instructions: {
      fr: [
        "Servez une poignée de fruits à coque grillés pour un boost sain de bons lipides et d'énergie."
      ],
      en: [
        "Enjoy a handful of roasted nuts for healthy fats and clean energy."
      ],
      ar: [
        "تناول حفنة من المكسرات المحمصة للحصول على طاقة ودهون صحية."
      ]
    }
  }
,
  {
  "id": "b17",
  "mealType": "breakfast",
  "title": {
    "fr": "Shakshuka Matinale aux Poivrons & Œufs Coulants",
    "en": "Morning Shakshuka with Peppers & Runny Eggs",
    "ar": "شكشوكة الصباح بالفلفل والبيض السائل"
  },
  "emoji": "🍳",
  "prepTime": 5,
  "cookTime": 12,
  "difficulty": "easy",
  "caloriesPerPerson": 310,
  "tags": [
    "dietBalanced",
    "dietVegetarian",
    "dietHalal",
    "oriental"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Œufs frais bio",
        "en": "Fresh eggs",
        "ar": "بيض طازج"
      },
      "quantity": 2,
      "unit": "pcs",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Poivron rouge émincé",
        "en": "Red bell pepper",
        "ar": "فلفل أحمر"
      },
      "quantity": 1,
      "unit": "pcs",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Tomates concassées",
        "en": "Crushed tomatoes",
        "ar": "طماطم مهروسة"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Cumin moulu et paprika doux",
        "en": "Cumin and paprika",
        "ar": "كمون وبابريكا"
      },
      "quantity": 1,
      "unit": "c.à.c",
      "dept": "deptSpices"
    },
    {
      "name": {
        "fr": "Pain pita ou galette",
        "en": "Pita bread",
        "ar": "خبز بيتا"
      },
      "quantity": 1,
      "unit": "pcs",
      "dept": "deptBakery"
    }
  ],
  "instructions": {
    "fr": [
      "Faites suer le poivron émincé à l'huile d'olive 4 min.",
      "Ajoutez la tomate concassée, le cumin et le paprika. Laissez mijoter 5 min.",
      "Cassez les œufs sur la sauce, couvrez et laissez cuire 3-4 min jusqu'à ce que le blanc soit pris et le jaune coulant.",
      "Servez chaud directement dans la poêle avec le pain."
    ],
    "en": [
      "Sauté sliced bell pepper in olive oil for 4 mins.",
      "Add crushed tomatoes, cumin, and paprika. Simmer for 5 mins.",
      "Crack eggs into the sauce, cover and cook 3-4 mins until whites are set and yolks are runny.",
      "Serve hot with pita bread."
    ],
    "ar": [
      "قلب الفلفل في زيت الزيتون لمدة 4 دقائق.",
      "أضف الطماطم والكمون والبابريكا واتركها تتسبك 5 دقائق.",
      "اكسر البيض في الصلصة وغط المقلاة حتى ينضج البياض.",
      "قدمها ساخنة مع الخبز."
    ]
  }
},
  {
  "id": "b18",
  "mealType": "breakfast",
  "title": {
    "fr": "Pain Perdu Brioché à la Cannelle & Myrtilles",
    "en": "Cinnamon Brioche French Toast & Blueberries",
    "ar": "فرنش توست البريوش بالقرفة والتوت"
  },
  "emoji": "🍞",
  "prepTime": 5,
  "cookTime": 6,
  "difficulty": "easy",
  "caloriesPerPerson": 350,
  "tags": [
    "dietBalanced",
    "dietVegetarian",
    "dietHalal"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Tranches de brioche ou pain rassis",
        "en": "Brioche bread slices",
        "ar": "شرائح بريوش"
      },
      "quantity": 2,
      "unit": "tranches",
      "dept": "deptBakery"
    },
    {
      "name": {
        "fr": "Œuf battu",
        "en": "Egg",
        "ar": "بيض"
      },
      "quantity": 1,
      "unit": "pcs",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Lait demi-écrémé",
        "en": "Milk",
        "ar": "حليب"
      },
      "quantity": 50,
      "unit": "ml",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Cannelle moulue",
        "en": "Ground cinnamon",
        "ar": "قرفة مطحونة"
      },
      "quantity": 0.5,
      "unit": "c.à.c",
      "dept": "deptSpices"
    },
    {
      "name": {
        "fr": "Myrtilles fraîches et filet de miel",
        "en": "Blueberries & honey",
        "ar": "توت أزرق وعسل"
      },
      "quantity": 40,
      "unit": "g",
      "dept": "deptProduce"
    }
  ],
  "instructions": {
    "fr": [
      "Battez l'œuf avec le lait et la cannelle dans une assiette creuse.",
      "Imbibez les tranches de brioche des deux côtés.",
      "Faites dorer à la poêle avec une noisette de beurre 2-3 min par face.",
      "Dressez avec les myrtilles et un filet de miel."
    ],
    "en": [
      "Whisk egg, milk, and cinnamon in a shallow bowl.",
      "Dip brioche slices on both sides.",
      "Pan-fry with a touch of butter for 2-3 mins per side until golden.",
      "Serve with fresh blueberries and honey."
    ],
    "ar": [
      "اخفق البيض مع الحليب والقرفة.",
      "اغمس شرائح البريوش من الجانبين.",
      "حمرها في مقلاة مع قليل من الزبدة لمدة 2-3 دقائق لكل جانب.",
      "زين بالتوت الأزرق وقليل من العسل."
    ]
  }
},
  {
  "id": "b19",
  "mealType": "breakfast",
  "title": {
    "fr": "Pudding de Chia Coco & Mangue Exotique",
    "en": "Coconut Mango Chia Pudding",
    "ar": "بودينغ بذور الشيا بجوز الهند والمانجو"
  },
  "emoji": "🥭",
  "prepTime": 5,
  "cookTime": 0,
  "difficulty": "easy",
  "caloriesPerPerson": 280,
  "tags": [
    "dietBalanced",
    "dietVegan",
    "dietVegetarian",
    "dietGlutenFree",
    "dietHalal"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Graines de chia",
        "en": "Chia seeds",
        "ar": "بذور الشيا"
      },
      "quantity": 30,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Lait de coco ou amande",
        "en": "Coconut or almond milk",
        "ar": "حليب جوز الهند"
      },
      "quantity": 150,
      "unit": "ml",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Dés de mangue fraîche",
        "en": "Diced fresh mango",
        "ar": "قطع مانجو طازجة"
      },
      "quantity": 80,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Sirop d'agave ou érable",
        "en": "Agave syrup",
        "ar": "شراب الصبار"
      },
      "quantity": 1,
      "unit": "c.à.s",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Mélangez les graines de chia avec le lait de coco et le sirop d'agave dans un bocal.",
      "Laissez gonfler au frais (15 min ou toute la nuit).",
      "Garnissez de dés de mangue fraîche avant de déguster."
    ],
    "en": [
      "Mix chia seeds with coconut milk and agave syrup in a jar.",
      "Chill for 15 mins (or overnight) until thick.",
      "Top with fresh diced mango before serving."
    ],
    "ar": [
      "اخلط بذور الشيا مع حليب جوز الهند والشراب.",
      "اتركه يتماسك في الثلاجة 15 دقيقة أو طوال الليل.",
      "زين بقطع المانجو الطازجة وقدمه."
    ]
  }
},
  {
  "id": "s15",
  "mealType": "snack",
  "title": {
    "fr": "Energy Balls Dattes, Amandes & Cacao Cru",
    "en": "Raw Cacao & Date Energy Balls",
    "ar": "كرات الطاقة بالتمر واللوز والكاكاو"
  },
  "emoji": "🍫",
  "prepTime": 5,
  "cookTime": 0,
  "difficulty": "easy",
  "caloriesPerPerson": 180,
  "tags": [
    "dietBalanced",
    "dietVegan",
    "dietVegetarian",
    "dietGlutenFree",
    "dietHalal"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Dattes Medjool dénoyautées",
        "en": "Pitted dates",
        "ar": "تمر منزوع النوى"
      },
      "quantity": 3,
      "unit": "pcs",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Poudre d'amandes",
        "en": "Almond flour",
        "ar": "بودرة اللوز"
      },
      "quantity": 20,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Cacao en poudre non sucré",
        "en": "Unsweetened cocoa powder",
        "ar": "كاكاو خام"
      },
      "quantity": 1,
      "unit": "c.à.c",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Mixez les dattes avec la poudre d'amandes et le cacao.",
      "Formez 2 à 3 boules fermes avec les paumes des mains.",
      "Dégustez pour un coup de boost naturel et sain."
    ],
    "en": [
      "Blend dates with almond flour and cocoa powder.",
      "Roll into 2-3 firm balls using your palms.",
      "Enjoy as a wholesome natural energy boost."
    ],
    "ar": [
      "اطحن التمر مع بودرة اللوز والكاكاو.",
      "شكل 2 إلى 3 كرات بيديك.",
      "تناولها كوجبة خفيفة ومغذية."
    ]
  }
},
  {
  "id": "s16",
  "mealType": "snack",
  "title": {
    "fr": "Houmous Onctueux & Bâtonnets de Carottes Croquantes",
    "en": "Creamy Hummus & Crisp Carrot Sticks",
    "ar": "حمص كريمي مع أصابع الجزر المقرمشة"
  },
  "emoji": "🥕",
  "prepTime": 5,
  "cookTime": 0,
  "difficulty": "easy",
  "caloriesPerPerson": 150,
  "tags": [
    "dietBalanced",
    "dietVegan",
    "dietVegetarian",
    "dietGlutenFree",
    "dietHalal",
    "oriental"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Houmous traditionnel",
        "en": "Hummus",
        "ar": "حمص"
      },
      "quantity": 60,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Carottes fraîches",
        "en": "Carrots",
        "ar": "جزر طازج"
      },
      "quantity": 2,
      "unit": "pcs",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Huile d'olive et paprika",
        "en": "Olive oil & paprika",
        "ar": "زيت زيتون وبابريكا"
      },
      "quantity": 1,
      "unit": "c.à.c",
      "dept": "deptSpices"
    }
  ],
  "instructions": {
    "fr": [
      "Épluchez et taillez les carottes en fins bâtonnets.",
      "Déposez le houmous dans une coupelle avec une goutte d'huile d'olive et une pincée de paprika.",
      "Trempez les carottes croquantes pour un goûter salé sain."
    ],
    "en": [
      "Peel and cut carrots into sticks.",
      "Spoon hummus into a small bowl and drizzle with olive oil and paprika.",
      "Dip and enjoy as a nutritious savory snack."
    ],
    "ar": [
      "قشر الجزر وقطعه لأصابع رفيعة.",
      "ضع الحمص في طبق صغير مع رشة زيت زيتون وبابريكا.",
      "اغمس أصابع الجزر وتناول وجبة خفيفة لذيذة."
    ]
  }
},
  {
  "id": "l47",
  "mealType": "lunch",
  "title": {
    "fr": "Poké Bowl Saumon Frais, Avocat & Riz Vinaigré",
    "en": "Fresh Salmon & Avocado Poké Bowl",
    "ar": "بوكيه بول السلمون الطازج والأفوكادو"
  },
  "emoji": "🥗",
  "prepTime": 12,
  "cookTime": 10,
  "difficulty": "easy",
  "caloriesPerPerson": 520,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "asian",
    "dietQuick"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Pavé de saumon frais (cru ou poêlé)",
        "en": "Fresh salmon fillet",
        "ar": "شريحة سلمون طازج"
      },
      "quantity": 130,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Riz sushi ou basmati",
        "en": "Sushi or basmati rice",
        "ar": "أرز"
      },
      "quantity": 80,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Avocat tranché",
        "en": "Avocado",
        "ar": "أفوكادو"
      },
      "quantity": 0.5,
      "unit": "pcs",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Concombre et edamame",
        "en": "Cucumber and edamame",
        "ar": "خيار وإدامامي"
      },
      "quantity": 60,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Sauce soja & graines de sésame",
        "en": "Soy sauce & sesame seeds",
        "ar": "صلصة صويا وسمسم"
      },
      "quantity": 1,
      "unit": "c.à.s",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Faites cuire le riz et laissez-le tiédir.",
      "Coupez le saumon en dés réguliers et l'avocat en fines lamelles.",
      "Disposez le riz au fond du bol, puis disposez harmonieusement le saumon, l'avocat, le concombre et les edamames.",
      "Arrosez de sauce soja et parsemez de graines de sésame."
    ],
    "en": [
      "Cook rice and let cool slightly.",
      "Dice salmon and slice avocado.",
      "Assemble the bowl with rice base, topped with salmon, avocado, cucumber, and edamame.",
      "Drizzle with soy sauce and sprinkle sesame seeds."
    ],
    "ar": [
      "اطبخ الأرز واتركه يبرد قليلاً.",
      "قطع السلمون لمكعبات والأفوكادو لشرائح.",
      "رتب الأرز في الوعاء وفوقه السلمون والخضار.",
      "تبل بصلصة الصويا ورشة سمسم."
    ]
  }
},
  {
  "id": "l48",
  "mealType": "lunch",
  "title": {
    "fr": "Tacos de Poulet Grillé, Guacamole Maison & Pico de Gallo",
    "en": "Grilled Chicken Tacos with Guacamole & Pico de Gallo",
    "ar": "تاكوس الدجاج المشوي مع الغواكامولي والصلصة المكسيكية"
  },
  "emoji": "🌮",
  "prepTime": 12,
  "cookTime": 10,
  "difficulty": "easy",
  "caloriesPerPerson": 540,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "mexican",
    "dietQuick"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Filets de poulet émincés",
        "en": "Chicken breast strips",
        "ar": "شرائح صدور دجاج"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Tortillas de maïs ou blé",
        "en": "Tortillas",
        "ar": "تورتيلا"
      },
      "quantity": 2,
      "unit": "pcs",
      "dept": "deptBakery"
    },
    {
      "name": {
        "fr": "Épices mexicaines (fajitas)",
        "en": "Taco seasoning",
        "ar": "بهارات تاكوس"
      },
      "quantity": 1,
      "unit": "c.à.c",
      "dept": "deptSpices"
    },
    {
      "name": {
        "fr": "Tomate et oignon rouge en dés",
        "en": "Diced tomato & red onion",
        "ar": "طماطم وبصل أحمر"
      },
      "quantity": 80,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Avocat écrasé au citron vert",
        "en": "Guacamole",
        "ar": "أفوكادو وليمون"
      },
      "quantity": 50,
      "unit": "g",
      "dept": "deptProduce"
    }
  ],
  "instructions": {
    "fr": [
      "Faites dorer le poulet à la poêle avec les épices mexicaines pendant 6-8 min.",
      "Mélangez les dés de tomates, l'oignon rouge et la coriandre pour le pico de gallo.",
      "Réchauffez les tortillas 30 sec à la poêle.",
      "Garnissez de guacamole, de poulet chaud épicé et de pico de gallo frais."
    ],
    "en": [
      "Pan-fry seasoned chicken strips for 6-8 mins until browned.",
      "Mix diced tomato, onion, and cilantro for the salsa.",
      "Warm tortillas in a dry pan.",
      "Fill with guacamole, warm chicken, and fresh pico de gallo."
    ],
    "ar": [
      "حمر الدجاج مع البهارات المكسيكية لمدة 6-8 دقائق.",
      "اخلط الطماطم والبصل والكزبرة لتحضير الصلصة.",
      "سخن خبز التورتيلا 30 ثانية.",
      "احش التورتيلا بالغواكامولي والدجاج والصلصة."
    ]
  }
},
  {
  "id": "l49",
  "mealType": "lunch",
  "title": {
    "fr": "Wrap Falafels Croustillants & Sauce Blanche Tahini",
    "en": "Crispy Falafel Wrap with Creamy Tahini Sauce",
    "ar": "راب الفلافل المقرمشة مع صلصة الطحينة"
  },
  "emoji": "🌯",
  "prepTime": 10,
  "cookTime": 5,
  "difficulty": "easy",
  "caloriesPerPerson": 480,
  "tags": [
    "dietBalanced",
    "dietVegetarian",
    "dietHalal",
    "oriental",
    "streetfood"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Falafels cuits ou réchauffés",
        "en": "Falafels",
        "ar": "فلافل"
      },
      "quantity": 4,
      "unit": "pcs",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Grande galette tortilla ou pain libanais",
        "en": "Wrap or flatbread",
        "ar": "خبز راب"
      },
      "quantity": 1,
      "unit": "pcs",
      "dept": "deptBakery"
    },
    {
      "name": {
        "fr": "Sauce tahini ou yaourt à l'ail",
        "en": "Tahini or garlic sauce",
        "ar": "طحينة أو صلصة ثوم"
      },
      "quantity": 2,
      "unit": "c.à.s",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Salade iceberg émincée & tomate",
        "en": "Lettuce & tomato",
        "ar": "خس وطماطم"
      },
      "quantity": 70,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Pickles ou cornichons",
        "en": "Pickles",
        "ar": "مخلل"
      },
      "quantity": 20,
      "unit": "g",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Réchauffez les falafels au four ou à la poêle pour qu'ils soient bien croustillants.",
      "Étalez la sauce tahini sur la galette tiède.",
      "Ajoutez la salade, les tranches de tomate, les pickles et écrasez légèrement les falafels.",
      "Roulez le wrap fermement et toastez 1 min à la poêle."
    ],
    "en": [
      "Heat falafels until crisp.",
      "Spread tahini sauce over flatbread.",
      "Add lettuce, tomato, pickles, and slightly crushed falafels.",
      "Roll tightly and toast 1 min in a dry skillet."
    ],
    "ar": [
      "سخن الفلافل حتى تصبح مقرمشة.",
      "افرد صلصة الطحينة على الخبز.",
      "أضف الخس والطماطم والمخلل والفلافل واضغط برفق.",
      "لف الساندويتش وحمصه دقيقة في المقلاة."
    ]
  }
},
  {
  "id": "d65",
  "mealType": "dinner",
  "title": {
    "fr": "Tajine de Kefta aux Œufs & Sauce Tomate Épicée",
    "en": "Moroccan Meatball & Egg Tajine in Spiced Tomato Sauce",
    "ar": "طاجين الكفتة بالبيض وصلصة الطماطم المتبلة"
  },
  "emoji": "🥘",
  "prepTime": 12,
  "cookTime": 18,
  "difficulty": "easy",
  "caloriesPerPerson": 510,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "oriental"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Bœuf haché assaisonné (kefta)",
        "en": "Minced beef",
        "ar": "لحم مفروم كفتة"
      },
      "quantity": 180,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Tomates concassées à l'ail",
        "en": "Crushed tomatoes & garlic",
        "ar": "طماطم وثوم"
      },
      "quantity": 200,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Œufs frais",
        "en": "Eggs",
        "ar": "بيض"
      },
      "quantity": 2,
      "unit": "pcs",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Cumin, paprika, persil & coriandre",
        "en": "Spices and fresh herbs",
        "ar": "بهارات وأعشاب طازجة"
      },
      "quantity": 1,
      "unit": "c.à.s",
      "dept": "deptSpices"
    },
    {
      "name": {
        "fr": "Pain traditionnel pour saucer",
        "en": "Bread",
        "ar": "خبز"
      },
      "quantity": 1,
      "unit": "portion",
      "dept": "deptBakery"
    }
  ],
  "instructions": {
    "fr": [
      "Façonnez de petites boulettes de viande hachée assaisonnée de cumin et coriandre.",
      "Dans une sauteuse ou un tajine, faites mijoter la sauce tomate avec les épices 8 min.",
      "Déposez les boulettes de kefta et laissez cuire 6-7 min.",
      "Cassez les œufs sur le dessus, couvrez 3 min jusqu'à ce que les blancs soient pris et servez chaud."
    ],
    "en": [
      "Roll seasoned ground beef into small meatballs.",
      "Simmer tomato sauce with garlic and spices in a pan for 8 mins.",
      "Add meatballs and simmer 6-7 mins.",
      "Crack eggs on top, cover for 3 mins until whites are set, and serve."
    ],
    "ar": [
      "شكل اللحم المفروم المتبل إلى كرات صغيرة.",
      "اطبخ صلصة الطماطم مع الثوم والبهارات 8 دقائق.",
      "أضف كرات الكفتة واطهها 6-7 دقائق.",
      "اكسر البيض فوق الصلصة وغط المقلاة 3 دقائق ثم قدمها ساخنة."
    ]
  }
},
  {
  "id": "d66",
  "mealType": "dinner",
  "title": {
    "fr": "Dos de Cabillaud Rôti aux Herbes & Purée de Patate Douce",
    "en": "Herb-Crusted Cod Fillet with Sweet Potato Mash",
    "ar": "سمك القد المحمر بالأعشاب مع بيوريه البطاطا الحلوة"
  },
  "emoji": "🐟",
  "prepTime": 12,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 460,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "french",
    "dietGlutenFree"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Dos de cabillaud frais",
        "en": "Fresh cod loin",
        "ar": "فيليه سمك قد"
      },
      "quantity": 160,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Patate douce",
        "en": "Sweet potato",
        "ar": "بطاطا حلوة"
      },
      "quantity": 200,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Beurre ou huile d'olive",
        "en": "Butter or olive oil",
        "ar": "زبدة أو زيت زيتون"
      },
      "quantity": 15,
      "unit": "g",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Herbes de Provence et zeste de citron",
        "en": "Herbs & lemon zest",
        "ar": "أعشاب وبشر ليمون"
      },
      "quantity": 1,
      "unit": "c.à.c",
      "dept": "deptSpices"
    }
  ],
  "instructions": {
    "fr": [
      "Faites cuire les dés de patate douce à l'eau bouillante 12 min, puis écrasez-les avec un peu de beurre, sel et muscade.",
      "Déposez le cabillaud sur une plaque de cuisson, badigeonnez d'huile d'olive, parsemez d'herbes et de zeste de citron.",
      "Enfournez 12-14 min à 190°C.",
      "Dressez le poisson fondant sur la purée onctueuse."
    ],
    "en": [
      "Boil diced sweet potatoes for 12 mins, then mash with butter and nutmeg.",
      "Place cod on a baking sheet, brush with olive oil, sprinkle with herbs and lemon zest.",
      "Bake at 190°C (375°F) for 12-14 mins.",
      "Serve tender cod over warm mash."
    ],
    "ar": [
      "اسلق مكعبات البطاطا الحلوة 12 دقيقة ثم اهرسها مع قليل من الزبدة.",
      "ضع السمك في صينية وادهنه بزيت الزيتون والأعشاب وبشر الليمون.",
      "اخبزه في الفرن 12-14 دقيقة على حرارة 190 مئوية.",
      "قدم السمك الطري فوق البيوريه الكريمي."
    ]
  }
},
  {
  "id": "d67",
  "mealType": "dinner",
  "title": {
    "fr": "Gratin de Gnocchis Crémeux, Tomates Séchées & Mozzarella",
    "en": "Baked Gnocchi with Sun-Dried Tomatoes & Melted Mozzarella",
    "ar": "صينية النيوكي الإيطالية بالطماطم المجففة وجبن الموزاريلا"
  },
  "emoji": "🧀",
  "prepTime": 8,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 520,
  "tags": [
    "dietBalanced",
    "dietVegetarian",
    "dietHalal",
    "italian"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Gnocchis frais à poêler",
        "en": "Fresh gnocchi",
        "ar": "نيوكي طازج"
      },
      "quantity": 180,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Coulis de tomates au basilic",
        "en": "Tomato basil sauce",
        "ar": "صلصة طماطم بالريحان"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Tomates séchées émincées",
        "en": "Sun-dried tomatoes",
        "ar": "طماطم مجففة"
      },
      "quantity": 30,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Mozzarella râpée ou di bufala",
        "en": "Mozzarella",
        "ar": "جبن موزاريلا"
      },
      "quantity": 60,
      "unit": "g",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Basilic frais",
        "en": "Fresh basil",
        "ar": "ريحان طازج"
      },
      "quantity": 4,
      "unit": "feuilles",
      "dept": "deptProduce"
    }
  ],
  "instructions": {
    "fr": [
      "Mélangez les gnocchis avec le coulis de tomate et les tomates séchées dans un plat à gratin.",
      "Recouvrez généreusement de mozzarella.",
      "Enfournez 15 min à 200°C jusqu'à ce que le fromage soit gratiné et doré.",
      "Parsemez de basilic frais à la sortie du four."
    ],
    "en": [
      "Mix gnocchi, tomato sauce, and sun-dried tomatoes in a baking dish.",
      "Top with mozzarella cheese.",
      "Bake at 200°C (400°F) for 15 mins until bubbly and golden.",
      "Garnish with fresh basil."
    ],
    "ar": [
      "اخلط النيوكي مع صلصة الطماطم والطماطم المجففة في صينية فرن.",
      "غط الوجه بجبن الموزاريلا.",
      "ادخلها الفرن 15 دقيقة على حرارة 200 مئوية حتى تذوب الجبنة وتتحمر.",
      "زين بالريحان الطازج وقدمها."
    ]
  }
}
,
  {
  "id": "l50",
  "mealType": "lunch",
  "title": {
    "fr": "Pad Thaï Express aux Crevettes & Cacahuètes Concassées",
    "en": "Quick Shrimp Pad Thai with Crushed Peanuts",
    "ar": "باد تاي الروبيان السريع مع الفول السوداني"
  },
  "emoji": "🍜",
  "prepTime": 10,
  "cookTime": 10,
  "difficulty": "easy",
  "caloriesPerPerson": 490,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "asian",
    "dietQuick"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Nouilles de riz",
        "en": "Rice noodles",
        "ar": "نودلز الأرز"
      },
      "quantity": 120,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Crevettes décortiquées",
        "en": "Peeled shrimp",
        "ar": "روبيان مقشر"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Œuf battu",
        "en": "Egg",
        "ar": "بيض"
      },
      "quantity": 1,
      "unit": "pcs",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Pousses de soja & ciboulette",
        "en": "Bean sprouts & scallions",
        "ar": "بذور الصويا وبصل أخضر"
      },
      "quantity": 60,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Sauce pad thaï / soja / citron vert",
        "en": "Pad thai sauce",
        "ar": "صلصة تاي"
      },
      "quantity": 2,
      "unit": "c.à.s",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Cacahuètes grillées concassées",
        "en": "Crushed peanuts",
        "ar": "فول سوداني مجروش"
      },
      "quantity": 15,
      "unit": "g",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Réhydratez les nouilles de riz 5 min dans l'eau chaude.",
      "Dans un wok très chaud, saisissez les crevettes avec un filet d'huile 2 min.",
      "Poussez sur le côté, cassez l'œuf et brouillez-le vivement.",
      "Ajoutez les nouilles égouttées, la sauce et les pousses de soja. Sautez 2 min.",
      "Servez parsemé de cacahuètes concassées et d'un quartier de citron vert."
    ],
    "en": [
      "Soak rice noodles in warm water for 5 mins.",
      "Sear shrimp in a hot wok with oil for 2 mins.",
      "Push to the side, scramble the egg quickly.",
      "Toss in noodles, sauce, and bean sprouts. Stir-fry for 2 mins.",
      "Serve with crushed peanuts and lime wedge."
    ],
    "ar": [
      "انقع نودلز الأرز في ماء دافئ 5 دقائق.",
      "حمر الروبيان في الووك مع قليل من الزيت دقيقتين.",
      "اخفق البيض في جانب المقلاة.",
      "أضف النودلز والصلصة وبراعم الصويا وقلب دقيقتين.",
      "قدمها مع الفول السوداني وشرائح الليمون."
    ]
  }
},
  {
  "id": "l51",
  "mealType": "lunch",
  "title": {
    "fr": "Quesadillas Dorées au Poulet, Poivrons & Fromage Fondu",
    "en": "Cheesy Chicken & Bell Pepper Quesadillas",
    "ar": "كاساديا الدجاج والجبن الذائب بالفلفل الملون"
  },
  "emoji": "🧀",
  "prepTime": 8,
  "cookTime": 8,
  "difficulty": "easy",
  "caloriesPerPerson": 510,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "mexican",
    "dietQuick",
    "streetfood"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Tortillas de blé",
        "en": "Flour tortillas",
        "ar": "تورتيلا"
      },
      "quantity": 2,
      "unit": "pcs",
      "dept": "deptBakery"
    },
    {
      "name": {
        "fr": "Effiloché de poulet cuit",
        "en": "Cooked shredded chicken",
        "ar": "دجاج مطبوخ ومفتت"
      },
      "quantity": 130,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Cheddar ou mozzarella râpé",
        "en": "Shredded cheese",
        "ar": "جبن مبشور"
      },
      "quantity": 60,
      "unit": "g",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Lamelles de poivron doux",
        "en": "Bell pepper strips",
        "ar": "شرائح فلفل"
      },
      "quantity": 50,
      "unit": "g",
      "dept": "deptProduce"
    }
  ],
  "instructions": {
    "fr": [
      "Garnissez une moitié de tortilla avec le fromage, le poulet et les lamelles de poivrons.",
      "Repliez la tortilla en demi-lune.",
      "Faites dorer à feu moyen dans une poêle sans matière grasse 3-4 min par face jusqu'à ce que le fromage soit bien coulant.",
      "Coupez en triangles et dégustez chaud."
    ],
    "en": [
      "Layer cheese, chicken, and peppers over half of each tortilla.",
      "Fold in half into a semi-circle.",
      "Cook in a dry skillet over medium heat for 3-4 mins per side until crispy and melted.",
      "Slice into wedges and serve warm."
    ],
    "ar": [
      "احش نصف التورتيلا بالجبن والدجاج وشرائح الفلفل.",
      "اطو التورتيلا إلى نصف دائرة.",
      "حمرها في مقلاة جافة 3-4 دقائق لكل جانب حتى يذوب الجبن.",
      "قطعها إلى مثلثات وقدمها ساخنة."
    ]
  }
},
  {
  "id": "d68",
  "mealType": "dinner",
  "title": {
    "fr": "Couscous Express aux Légumes du Soleil & Boulettes Fondantes",
    "en": "Quick Mediterranean Veggie & Meatball Couscous",
    "ar": "كسكسي سريع بالخضار وكرات الكفتة الشهية"
  },
  "emoji": "🍲",
  "prepTime": 12,
  "cookTime": 15,
  "difficulty": "easy",
  "caloriesPerPerson": 530,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "oriental"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Semoule moyenne de blé dur",
        "en": "Couscous semolina",
        "ar": "سميد كسكسي"
      },
      "quantity": 140,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Boulettes de kefta ou bœuf",
        "en": "Beef meatballs",
        "ar": "كرات كفتة"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Courgettes et carottes en rondelles",
        "en": "Zucchini & carrots",
        "ar": "كوسة وجزر"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Pois chiches cuits",
        "en": "Cooked chickpeas",
        "ar": "حمص مسلوق"
      },
      "quantity": 70,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Épices à couscous (Ras el Hanout)",
        "en": "Couscous spice blend",
        "ar": "بهارات رأس الحانوت"
      },
      "quantity": 1,
      "unit": "c.à.s",
      "dept": "deptSpices"
    }
  ],
  "instructions": {
    "fr": [
      "Faites gonfler la semoule avec un volume égal d'eau bouillante salée et un filet d'huile d'olive (5 min) puis égrenez à la fourchette.",
      "Faites dorer les boulettes 4 min dans une sauteuse.",
      "Ajoutez les légumes, les pois chiches, les épices et 250ml d'eau. Laissez mijoter 12 min.",
      "Dressez la semoule légère et nappez du bouillon parfumé avec les légumes et boulettes."
    ],
    "en": [
      "Pour boiling salted water over semolina, cover for 5 mins, then fluff with a fork.",
      "Brown meatballs in a skillet for 4 mins.",
      "Add veggies, chickpeas, spices, and 250ml water. Simmer for 12 mins.",
      "Serve fluffy couscous topped with spiced broth, veggies, and meatballs."
    ],
    "ar": [
      "انقع السميد في ماء مغلي مملح مع زيت زيتون 5 دقائق ثم افركه بالشوكة.",
      "حمر كرات الكفتة 4 دقائق.",
      "أضف الخضار والحمص والبهارات وماء مغلي واتركها تنضج 12 دقيقة.",
      "قدم الكسكسي مسقياً بالمرق والخضار واللحم."
    ]
  }
},
  {
  "id": "d69",
  "mealType": "dinner",
  "title": {
    "fr": "Curry Doux de Poulet Tikka Masala & Riz Basmati Parfumé",
    "en": "Creamy Chicken Tikka Masala with Fragrant Basmati",
    "ar": "دجاج تيكا ماسالا الكريمي مع الأرز البسمتي المعطر"
  },
  "emoji": "🍛",
  "prepTime": 12,
  "cookTime": 18,
  "difficulty": "easy",
  "caloriesPerPerson": 540,
  "tags": [
    "dietBalanced",
    "dietHalal",
    "indian"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Filets de poulet en dés",
        "en": "Diced chicken breast",
        "ar": "مكعبات صدور دجاج"
      },
      "quantity": 160,
      "unit": "g",
      "dept": "deptMeat"
    },
    {
      "name": {
        "fr": "Sauce tomate & crème de coco (ou crème fluide)",
        "en": "Tomato sauce & coconut cream",
        "ar": "صلصة طماطم وكريمة"
      },
      "quantity": 150,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Mélange d'épices Garam Masala & curcuma",
        "en": "Garam masala & turmeric",
        "ar": "بهارات جارام ماسالا وكركم"
      },
      "quantity": 1,
      "unit": "c.à.s",
      "dept": "deptSpices"
    },
    {
      "name": {
        "fr": "Riz basmati",
        "en": "Basmati rice",
        "ar": "أرز بسمتي"
      },
      "quantity": 80,
      "unit": "g",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Faites cuire le riz basmati dans l'eau bouillante salée.",
      "Faites dorer le poulet à la poêle avec les épices 5 min.",
      "Versez le coulis de tomate et la crème. Laissez mijoter 10 min jusqu'à ce que la sauce soit onctueuse et nappante.",
      "Servez le curry chaud avec le riz basmati."
    ],
    "en": [
      "Cook basmati rice in boiling water.",
      "Sear spiced chicken pieces for 5 mins.",
      "Stir in tomato puree and cream. Simmer for 10 mins until rich and creamy.",
      "Serve hot curry over fluffy basmati rice."
    ],
    "ar": [
      "اسلق الأرز البسمتي في ماء مغلي.",
      "حمر قطع الدجاج مع البهارات 5 دقائق.",
      "أضف صلصة الطماطم والكريمة واتركها تتسبك 10 دقائق.",
      "قدم الكاري الساخن فوق الأرز البسمتي."
    ]
  }
},
  {
  "id": "d70",
  "mealType": "dinner",
  "title": {
    "fr": "Velouté Onctueux de Potimarron, Noisettes & Éclats de Châtaigne",
    "en": "Creamy Pumpkin & Chestnut Soup with Roasted Hazelnuts",
    "ar": "شوربة القرع العسلي والكستناء الكريمية مع البندق"
  },
  "emoji": "🥣",
  "prepTime": 10,
  "cookTime": 18,
  "difficulty": "easy",
  "caloriesPerPerson": 360,
  "tags": [
    "dietBalanced",
    "dietVegetarian",
    "dietHalal",
    "french",
    "dietGlutenFree"
  ],
  "ingredients": [
    {
      "name": {
        "fr": "Potimarron ou courge butternut en dés",
        "en": "Diced pumpkin",
        "ar": "قرع عسلي مقطع"
      },
      "quantity": 250,
      "unit": "g",
      "dept": "deptProduce"
    },
    {
      "name": {
        "fr": "Châtaignes cuites",
        "en": "Cooked chestnuts",
        "ar": "كستناء مطبوخة"
      },
      "quantity": 60,
      "unit": "g",
      "dept": "deptPantry"
    },
    {
      "name": {
        "fr": "Crème liquide ou coco",
        "en": "Cream or coconut milk",
        "ar": "كريمة طهي"
      },
      "quantity": 40,
      "unit": "ml",
      "dept": "deptDairy"
    },
    {
      "name": {
        "fr": "Noisettes concassées grillées",
        "en": "Toasted hazelnuts",
        "ar": "بندق محمص مجروش"
      },
      "quantity": 15,
      "unit": "g",
      "dept": "deptPantry"
    }
  ],
  "instructions": {
    "fr": [
      "Faites cuire les dés de potimarron dans 350ml de bouillon 15 min jusqu'à ce qu'ils soient tendres.",
      "Ajoutez les 3/4 des châtaignes et la crème, puis mixez finement au mixeur plongeant jusqu'à texture veloutée.",
      "Servez chaud en parsemant du reste de châtaignes émiettées et de noisettes croquantes."
    ],
    "en": [
      "Simmer pumpkin cubes in 350ml broth for 15 mins until fork-tender.",
      "Add most chestnuts and cream, blend until silky smooth.",
      "Serve hot topped with remaining chestnuts and crunchy hazelnuts."
    ],
    "ar": [
      "اطبخ القرع في مرق لمدة 15 دقيقة حتى يلين.",
      "أضف معظم الكستناء والكريمة واخلط حتى يصبح ناعماً.",
      "قدم الشوربة ساخنة مع رشة كستناء وبندق مقرمش."
    ]
  }
},
{
  id: "b19",
  mealType: "breakfast",
  title: { fr: "Pudding de Chia au Lait de Coco & Mangue", en: "Coconut Chia Pudding with Mango" },
  emoji: "🥭",
  prepTime: 5,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 290,
  tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietLactoseFree", "dietQuick"],
  ingredients: [
    { name: { fr: "Graines de chia", en: "Chia seeds" }, quantity: 40, unit: "g", dept: "deptPantry" },
    { name: { fr: "Lait de coco ou amande", en: "Coconut or almond milk" }, quantity: 200, unit: "ml", dept: "deptDairy" },
    { name: { fr: "Mangue mûre", en: "Ripe mango" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
    { name: { fr: "Sirop d'agave ou miel", en: "Agave syrup or honey" }, quantity: 1, unit: "c.à.s", dept: "deptSpices" },
    { name: { fr: "Noix de coco râpée", en: "Shredded coconut" }, quantity: 10, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Mélangez les graines de chia avec le lait végétal et le sirop d'agave.",
      "Laissez gonfler au frais 20 min (ou la veille).",
      "Déposez les dés de mangue fraîche et saupoudrez de coco."
    ],
    en: [
      "Whisk chia seeds with plant milk and agave syrup.",
      "Chill for 20 mins until thick and creamy.",
      "Top with diced fresh mango and shredded coconut."
    ]
  }
},
{
  id: "b20",
  mealType: "breakfast",
  title: { fr: "Pain Perdu Brioché à la Cannelle & Myrtilles", en: "Brioche French Toast with Blueberries" },
  emoji: "🍞",
  prepTime: 5,
  cookTime: 6,
  difficulty: "easy",
  caloriesPerPerson: 340,
  tags: ["dietBalanced", "dietVegetarian", "dietKids", "dietBudget", "dietQuick"],
  ingredients: [
    { name: { fr: "Tranches de brioche ou pain complet", en: "Brioche slices" }, quantity: 4, unit: "tranches", dept: "deptBakery" },
    { name: { fr: "Œufs frais", en: "Fresh eggs" }, quantity: 2, unit: "pièces", dept: "deptDairy" },
    { name: { fr: "Lait demi-écrémé", en: "Milk" }, quantity: 60, unit: "ml", dept: "deptDairy" },
    { name: { fr: "Cannelle moulue", en: "Cinnamon" }, quantity: 0.5, unit: "c.à.c", dept: "deptSpices" },
    { name: { fr: "Myrtilles fraîches", en: "Blueberries" }, quantity: 80, unit: "g", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Battez les œufs avec le lait et la cannelle.",
      "Trempez les tranches de brioche 15 secondes par face.",
      "Dorez à la poêle 2 min par côté et servez avec les myrtilles."
    ],
    en: [
      "Whisk eggs with milk and cinnamon.",
      "Dip brioche slices 15 seconds per side.",
      "Pan-fry for 2 mins per side until golden, top with berries."
    ]
  }
},
{
  id: "b21",
  mealType: "breakfast",
  title: { fr: "Granola Croustillant Chocolat & Yaourt Grec", en: "Chocolate Granola with Greek Yogurt" },
  emoji: "🍫",
  prepTime: 3,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 320,
  tags: ["dietBalanced", "dietVegetarian", "dietHighProtein", "dietQuick"],
  ingredients: [
    { name: { fr: "Yaourt grec ou Skyr", en: "Greek yogurt" }, quantity: 250, unit: "g", dept: "deptDairy" },
    { name: { fr: "Granola chocolat noir", en: "Dark chocolate granola" }, quantity: 60, unit: "g", dept: "deptPantry" },
    { name: { fr: "Banane", en: "Banana" }, quantity: 1, unit: "pièce", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Versez le yaourt grec dans les bols.",
      "Ajoutez le granola croustillant et les rondelles de banane."
    ],
    en: [
      "Spoon yogurt into bowls.",
      "Top with crunchy granola and banana slices."
    ]
  }
},
{
  id: "b22",
  mealType: "breakfast",
  title: { fr: "Smoothie Bowl Açaï & Fruits Rouges", en: "Açaí Berry Smoothie Bowl" },
  emoji: "🥣",
  prepTime: 5,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 280,
  tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietQuick"],
  ingredients: [
    { name: { fr: "Fruits rouges surgelés", en: "Frozen berries" }, quantity: 150, unit: "g", dept: "deptFrozen" },
    { name: { fr: "Banane", en: "Banana" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
    { name: { fr: "Lait d'avoine ou amande", en: "Oat milk" }, quantity: 100, unit: "ml", dept: "deptDairy" },
    { name: { fr: "Amandes effilées", en: "Sliced almonds" }, quantity: 15, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Mixez les fruits rouges avec la banane et le lait végétal.",
      "Versez dans un bol et décorez d'amandes effilées."
    ],
    en: [
      "Blend frozen berries with banana and oat milk.",
      "Pour into a bowl and top with almonds."
    ]
  }
},
{
  id: "b23",
  mealType: "breakfast",
  title: { fr: "Porridge Cacao, Beurre de Cacahuète & Banane", en: "Cocoa & Peanut Butter Banana Oats" },
  emoji: "🥜",
  prepTime: 5,
  cookTime: 4,
  difficulty: "easy",
  caloriesPerPerson: 350,
  tags: ["dietBalanced", "dietVegetarian", "dietHighProtein", "dietBudget", "dietQuick"],
  ingredients: [
    { name: { fr: "Flocons d'avoine", en: "Rolled oats" }, quantity: 70, unit: "g", dept: "deptPantry" },
    { name: { fr: "Lait ou boisson végétale", en: "Milk" }, quantity: 200, unit: "ml", dept: "deptDairy" },
    { name: { fr: "Cacao pur non sucré", en: "Cocoa powder" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" },
    { name: { fr: "Beurre de cacahuète", en: "Peanut butter" }, quantity: 1, unit: "c.à.s", dept: "deptPantry" },
    { name: { fr: "Banane mûre", en: "Banana" }, quantity: 1, unit: "pièce", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Chauffez l'avoine, le lait et le cacao 4 min à feu doux.",
      "Versez en bol, nappez de beurre de cacahuète et rondelles de banane."
    ],
    en: [
      "Cook oats, milk and cocoa for 4 mins over low heat.",
      "Pour into bowls and top with peanut butter and banana."
    ]
  }
},
{
  id: "b24",
  mealType: "breakfast",
  title: { fr: "Muesli Bircher Suisse Pomme & Noix", en: "Swiss Bircher Muesli Apple & Walnut" },
  emoji: "🍏",
  prepTime: 5,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 300,
  tags: ["dietBalanced", "dietVegetarian", "dietQuick"],
  ingredients: [
    { name: { fr: "Flocons d'avoine", en: "Rolled oats" }, quantity: 60, unit: "g", dept: "deptPantry" },
    { name: { fr: "Pomme", en: "Apple" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
    { name: { fr: "Yaourt nature", en: "Plain yogurt" }, quantity: 150, unit: "g", dept: "deptDairy" },
    { name: { fr: "Noix concassées", en: "Walnuts" }, quantity: 20, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Râpez la pomme et mélangez avec l'avoine et le yaourt.",
      "Saupoudrez de cerneaux de noix croquants."
    ],
    en: [
      "Grate apple and mix with oats and yogurt.",
      "Top with crunchy chopped walnuts."
    ]
  }
},
{
  id: "b25",
  mealType: "breakfast",
  title: { fr: "Shakshuka Matinale aux Poivrons & Œufs", en: "Morning Shakshuka with Eggs" },
  emoji: "🍳",
  prepTime: 5,
  cookTime: 8,
  difficulty: "easy",
  caloriesPerPerson: 320,
  tags: ["dietBalanced", "dietVegetarian", "flavorSavory", "dietQuick", "dietGlutenFree"],
  ingredients: [
    { name: { fr: "Œufs frais", en: "Fresh eggs" }, quantity: 2, unit: "pièces", dept: "deptDairy" },
    { name: { fr: "Coulis de tomates", en: "Tomato passata" }, quantity: 180, unit: "g", dept: "deptPantry" },
    { name: { fr: "Poivron rouge émincé", en: "Sliced red pepper" }, quantity: 0.5, unit: "pièce", dept: "deptProduce" },
    { name: { fr: "Cumin & Paprika", en: "Cumin & Paprika" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" }
  ],
  instructions: {
    fr: [
      "Poêlez le poivron avec les épices 3 min, versez la sauce tomate.",
      "Cassez les œufs au centre et couvrez 3-4 min jusqu'à cuisson."
    ],
    en: [
      "Sauté peppers with spices 3 mins, add tomato passata.",
      "Crack eggs into sauce and cover 3-4 mins until set."
    ]
  }
},
{
  id: "b26",
  mealType: "breakfast",
  title: { fr: "Omelette Roulée au Fromage Frais & Herbes", en: "Rolled Herb & Cream Cheese Omelet" },
  emoji: "🌿",
  prepTime: 3,
  cookTime: 4,
  difficulty: "easy",
  caloriesPerPerson: 290,
  tags: ["dietBalanced", "dietVegetarian", "flavorSavory", "dietKeto", "dietLowCarb", "dietQuick"],
  ingredients: [
    { name: { fr: "Œufs frais", en: "Eggs" }, quantity: 2, unit: "pièces", dept: "deptDairy" },
    { name: { fr: "Fromage frais type St-Moret", en: "Cream cheese" }, quantity: 40, unit: "g", dept: "deptDairy" },
    { name: { fr: "Ciboulette et persil frais", en: "Fresh chives" }, quantity: 2, unit: "c.à.s", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Battez les œufs avec les herbes, cuisez à la poêle 2 min.",
      "Garnissez de fromage frais et roulez l'omelette."
    ],
    en: [
      "Whisk eggs with herbs, cook for 2 mins in pan.",
      "Spread cream cheese and roll gently."
    ]
  }
},
{
  id: "b27",
  mealType: "breakfast",
  title: { fr: "Bagel Grillé au Saumon Fumé & Concombre", en: "Smoked Salmon & Cucumber Bagel" },
  emoji: "🥯",
  prepTime: 5,
  cookTime: 2,
  difficulty: "easy",
  caloriesPerPerson: 360,
  tags: ["dietBalanced", "flavorSavory", "dietHighProtein", "dietQuick"],
  ingredients: [
    { name: { fr: "Mini bagels ou pain complet", en: "Bagels" }, quantity: 2, unit: "pièces", dept: "deptBakery" },
    { name: { fr: "Saumon fumé ou truite", en: "Smoked salmon" }, quantity: 60, unit: "g", dept: "deptMeat" },
    { name: { fr: "Fromage frais", en: "Cream cheese" }, quantity: 30, unit: "g", dept: "deptDairy" },
    { name: { fr: "Concombre en lamelles", en: "Cucumber" }, quantity: 0.5, unit: "pièce", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Toastez les bagels, tartinez de fromage frais.",
      "Ajoutez le saumon fumé et le concombre frais."
    ],
    en: [
      "Toast bagels, spread cream cheese.",
      "Top with smoked salmon and cucumber slices."
    ]
  }
},
{
  id: "s12",
  mealType: "snack",
  title: { fr: "Energy Balls Dattes, Amandes & Coco", en: "Date, Almond & Coconut Energy Balls" },
  emoji: "🥥",
  prepTime: 5,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 180,
  tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietGlutenFree", "dietQuick"],
  ingredients: [
    { name: { fr: "Dattes Medjool", en: "Pitted dates" }, quantity: 60, unit: "g", dept: "deptProduce" },
    { name: { fr: "Poudre d'amandes", en: "Almond flour" }, quantity: 30, unit: "g", dept: "deptPantry" },
    { name: { fr: "Noix de coco râpée", en: "Shredded coconut" }, quantity: 15, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Mixez les dattes avec la poudre d'amandes.",
      "Formez des boules et roulez-les dans la noix de coco."
    ],
    en: [
      "Blend dates with almond flour.",
      "Roll into balls and coat with coconut."
    ]
  }
},
{
  id: "s13",
  mealType: "snack",
  title: { fr: "Pommes Rôties Cannelle & Amandes", en: "Warm Baked Cinnamon Apples" },
  emoji: "🍎",
  prepTime: 4,
  cookTime: 5,
  difficulty: "easy",
  caloriesPerPerson: 160,
  tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietKids", "dietQuick"],
  ingredients: [
    { name: { fr: "Pommes", en: "Apples" }, quantity: 2, unit: "pièces", dept: "deptProduce" },
    { name: { fr: "Cannelle", en: "Cinnamon" }, quantity: 1, unit: "c.à.c", dept: "deptSpices" },
    { name: { fr: "Amandes effilées", en: "Sliced almonds" }, quantity: 15, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Coupez les pommes en dés, saupoudrez de cannelle.",
      "Chauffez 3 min au micro-ondes et parsemez d'amandes."
    ],
    en: [
      "Dice apples, dust with cinnamon.",
      "Microwave for 3 mins and top with almonds."
    ]
  }
},
{
  id: "s14",
  mealType: "snack",
  title: { fr: "Cookies Express Banane, Avoine & Chocolat", en: "Banana Oat Chocolate Cookies" },
  emoji: "🍪",
  prepTime: 5,
  cookTime: 12,
  difficulty: "easy",
  caloriesPerPerson: 190,
  tags: ["dietBalanced", "dietVegetarian", "dietVegan", "dietKids", "dietBudget"],
  ingredients: [
    { name: { fr: "Banane mûre", en: "Ripe banana" }, quantity: 1, unit: "pièce", dept: "deptProduce" },
    { name: { fr: "Flocons d'avoine", en: "Rolled oats" }, quantity: 60, unit: "g", dept: "deptPantry" },
    { name: { fr: "Pépites de chocolat noir", en: "Chocolate chips" }, quantity: 20, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Écrasez la banane, mélangez avec l'avoine et le chocolat.",
      "Formez des cookies et enfournez 12 min à 180°C."
    ],
    en: [
      "Mash banana, mix with oats and chocolate.",
      "Bake for 12 mins at 180°C until golden."
    ]
  }
},
{
  id: "s15",
  mealType: "snack",
  title: { fr: "Bâtonnets de Carottes, Concombre & Houmous", en: "Veggie Sticks with Hummus" },
  emoji: "🥕",
  prepTime: 5,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 170,
  tags: ["dietBalanced", "dietVegetarian", "dietVegan", "flavorSavory", "dietQuick", "dietLowCarb"],
  ingredients: [
    { name: { fr: "Carottes", en: "Carrots" }, quantity: 2, unit: "pièces", dept: "deptProduce" },
    { name: { fr: "Concombre", en: "Cucumber" }, quantity: 0.5, unit: "pièce", dept: "deptProduce" },
    { name: { fr: "Houmous", en: "Hummus" }, quantity: 80, unit: "g", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Coupez les légumes en fins bâtonnets et trempez dans le houmous."
    ],
    en: [
      "Slice veggies into sticks and serve with hummus."
    ]
  }
},
{
  id: "s16",
  mealType: "snack",
  title: { fr: "Mini-Wrap Dinde, Fromage Frais & Mâche", en: "Turkey & Cream Cheese Mini-Wrap" },
  emoji: "🌯",
  prepTime: 4,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 190,
  tags: ["dietBalanced", "flavorSavory", "dietHighProtein", "dietQuick"],
  ingredients: [
    { name: { fr: "Mini tortillas", en: "Tortillas" }, quantity: 2, unit: "pièces", dept: "deptBakery" },
    { name: { fr: "Blanc de dinde", en: "Turkey breast" }, quantity: 2, unit: "tranches", dept: "deptMeat" },
    { name: { fr: "Fromage frais", en: "Cream cheese" }, quantity: 30, unit: "g", dept: "deptDairy" },
    { name: { fr: "Mâche fraîche", en: "Salad greens" }, quantity: 20, unit: "g", dept: "deptProduce" }
  ],
  instructions: {
    fr: [
      "Tartinez les tortillas de fromage frais, ajoutez la dinde et la mâche, roulez fermement."
    ],
    en: [
      "Spread cream cheese on tortillas, add turkey and greens, roll tightly."
    ]
  }
},
{
  id: "s17",
  mealType: "snack",
  title: { fr: "Crackers aux Graines, Chèvre Frais & Noix", en: "Seeded Crackers, Goat Cheese & Walnuts" },
  emoji: "🧀",
  prepTime: 3,
  cookTime: 0,
  difficulty: "easy",
  caloriesPerPerson: 180,
  tags: ["dietBalanced", "dietVegetarian", "flavorSavory", "dietQuick"],
  ingredients: [
    { name: { fr: "Crackers aux graines", en: "Seeded crackers" }, quantity: 4, unit: "pièces", dept: "deptPantry" },
    { name: { fr: "Fromage de chèvre frais", en: "Goat cheese" }, quantity: 40, unit: "g", dept: "deptDairy" },
    { name: { fr: "Cerneaux de noix", en: "Walnuts" }, quantity: 15, unit: "g", dept: "deptPantry" }
  ],
  instructions: {
    fr: [
      "Tartinez les crackers de fromage de chèvre frais et déposez les cerneaux de noix."
    ],
    en: [
      "Spread goat cheese over crackers and top with walnut halves."
    ]
  }
}
];
