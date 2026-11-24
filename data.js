const MENU_CONFIG = {
  restaurantName: "شيفز جريل آند برجر",
  tagline: "أصل السماش برجر والبيتزا والمشويات في مصر",
  logoEmoji: "🔥",
  logoImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
  whatsapp: "201029875726", // حط رقمك هنا (20 ثم الرقم بدون أول صفر)
  phoneDisplay: "01029875726",
  address: "مدينة نصر - شارع عباس العقاد، القاهرة",
  workingHours: "يومياً من 12 ظهراً حتى 3 فجراً",
  rating: "4.9",
  prepEstimate: "25 - 35 دقيقة",
  currency: "ج.م",
  deliveryFee: 30,
  freeDeliveryThreshold: 500, // توصيل مجاني لو الطلب عدى 500 جنيه

  marqueeItems: [
    "🔥 خصم 10% على طلبك الأول بكود: CHEF10",
    "👑 خصم 50 ج.م للطلبات فوق 350 ج.م بكود: VIP50",
    "🛵 توصيل مجاني للطلبات فوق 500 ج.م",
    "🥩 لحم بلدي طازج 100% يومياً بدون إضافات",
    "⭐ تقييم 4.9 من أكثر من 2500 عميل"
  ],

  promoCodes: {
    "CHEF10": { type: "percent", value: 10, label: "خصم 10%" },
    "VIP50": { type: "fixed", value: 50, minOrder: 350, label: "خصم 50 ج.م" }
  },

  heroSlides: [
    {
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      badge: "الأكثر طلباً 🔥",
      title: "سماش برجر على الجريل",
      subtitle: "لحم بلدي طازج مع جبنة شيدر سايحة وصوص الشيف"
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
      badge: "عرض اليوم 🍕",
      title: "بيتزا إيطالي في الفرن الحجري",
      subtitle: "عجينة مخمرة 24 ساعة مع موتزاريلا طبيعية"
    },
    {
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
      badge: "اختيار الشيف 👑",
      title: "مشويات وستيك على الفحم",
      subtitle: "تتبيلة خاصة بتدوب في البق مع صوصاتنا المميزة"
    },
    {
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      badge: "تشكيلة العائلة 🎉",
      title: "وليمة متكاملة بأعلى جودة",
      subtitle: "اطلب دلوقتي ويوصلك سخن في أسرع وقت"
    }
  ],

  floatingBgImages: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=70",
    "https://images.unsplash.com/photo-1551504734-5ee1c4a127da?auto=format&fit=crop&w=400&q=70"
  ],

  categories: [
    { id: "all", name: "الكل", icon: "🍽️" },
    { id: "burgers", name: "برجر", icon: "🍔" },
    { id: "pizza", name: "بيتزا", icon: "🍕" },
    { id: "chicken", name: "فرايد ومشويات", icon: "🍗" },
    { id: "pasta", name: "باستا", icon: "🍝" },
    { id: "tacos", name: "تاكو وسندوتشات", icon: "🌮" },
    { id: "sides", name: "مقبلات وبطاطس", icon: "🍟" },
    { id: "drinks", name: "مشروبات", icon: "🍹" },
    { id: "desserts", name: "حلويات", icon: "🍰" }
  ],

  items: [
    {
      id: 1,
      category: "burgers",
      name: "كلاسيك تشيز سماش برجر",
      description: "قطعة لحم سماش طازجة 150 جم مع شيدر أمريكي، خس، طماطم، خيار مخلل وصوص الشيف في خبز بريوش.",
      price: 135,
      oldPrice: 160,
      rating: 4.9,
      prepTime: "15 د",
      calories: 640,
      badge: "الأكثر طلباً 🔥",
      featured: true,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "single", name: "سنجل (150 جم)", addPrice: 0 },
        { id: "double", name: "دبل (300 جم)", addPrice: 65 },
        { id: "triple", name: "تربل الوحش (450 جم)", addPrice: 120 }
      ],
      addons: [
        { id: "cheese", name: "اكسترا جبنة شيدر سايحة", price: 20 },
        { id: "bacon", name: "بيكون بقري مدخن", price: 35 },
        { id: "combo", name: "تحويل لكومبو (بطاطس + بيبسي)", price: 50 },
        { id: "jalapeno", name: "هالبينو حار", price: 12 }
      ]
    },
    {
      id: 2,
      category: "burgers",
      name: "دبل ترافل آند باربيكيو برجر",
      description: "سماش برجر غرقان في صوص الباربكيو المدخن مع بصل مكرمل وحلقات بصل مقرمشة وجبنة سويسرية.",
      price: 175,
      rating: 4.8,
      prepTime: "18 د",
      calories: 790,
      badge: "اختيار الشيف 👑",
      featured: true,
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "single", name: "سنجل", addPrice: 0 },
        { id: "double", name: "دبل", addPrice: 70 }
      ],
      addons: [
        { id: "combo", name: "كومبو (بطاطس + مشروب)", price: 50 },
        { id: "mushroom", name: "مشروم سوتيه بالزبدة", price: 25 }
      ]
    },
    {
      id: 3,
      category: "burgers",
      name: "تشيكن كرسبي رانش برجر",
      description: "صدر دجاج مقرمش بتتبيلة سرية حارة أو عادية، كول سلو، تركي مدخن وصوص رانش.",
      price: 125,
      rating: 4.7,
      prepTime: "15 د",
      calories: 580,
      badge: "حار اختياري 🌶️",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "regular", name: "عادي", addPrice: 0 },
        { id: "spicy", name: "سبايسي 🌶️", addPrice: 5 },
        { id: "double", name: "دبل كرسبي", addPrice: 55 }
      ],
      addons: [
        { id: "cheese", name: "شريحة جبنة شيدر", price: 20 },
        { id: "combo", name: "كومبو (بطاطس + مشروب)", price: 50 }
      ]
    },
    {
      id: 4,
      category: "pizza",
      name: "بيتزا بيبيروني سوبريم",
      description: "عجينة إيطالية هشة مع صلصة طماطم طازجة، دبل موتزاريلا وشرائح بيبيروني بقري مقرمشة.",
      price: 185,
      oldPrice: 220,
      rating: 4.9,
      prepTime: "20 د",
      calories: 920,
      badge: "خصم 15% 🔥",
      featured: true,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "medium", name: "وسط (M)", addPrice: 0 },
        { id: "large", name: "لارج (L)", addPrice: 65 },
        { id: "xl", name: "عائلي (XL)", addPrice: 120 }
      ],
      addons: [
        { id: "stuffed", name: "أطراف محشية جبنة", price: 45 },
        { id: "ranch", name: "صوص رانش جانبي", price: 15 },
        { id: "extra_cheese", name: "اكسترا موتزاريلا", price: 35 }
      ]
    },
    {
      id: 5,
      category: "pizza",
      name: "بيتزا مارجريتا نابولي",
      description: "صلصة الطماطم الإيطالية الأصلية مع جبنة موتزاريلا فريش، أوراق ريحان وزيت زيتون بكر.",
      price: 140,
      rating: 4.8,
      prepTime: "18 د",
      calories: 740,
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "medium", name: "وسط (M)", addPrice: 0 },
        { id: "large", name: "لارج (L)", addPrice: 55 }
      ],
      addons: [
        { id: "stuffed", name: "أطراف محشية جبنة", price: 45 },
        { id: "olives", name: "زيتون ومشروم", price: 20 }
      ]
    },
    {
      id: 6,
      category: "pizza",
      name: "بيتزا فيجي فور تشيز",
      description: "مكس 4 أجبان (موتزاريلا، شيدر، ريكفورد، بارميزان) مع فلفل ألوان وزيتون أسود.",
      price: 165,
      rating: 4.7,
      prepTime: "18 د",
      calories: 810,
      badge: "جديد ✨",
      image: "https://images.unsplash.com/photo-1617470702892-e01504297e84?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "medium", name: "وسط (M)", addPrice: 0 },
        { id: "large", name: "لارج (L)", addPrice: 60 }
      ],
      addons: [
        { id: "stuffed", name: "أطراف محشية جبنة", price: 45 }
      ]
    },
    {
      id: 7,
      category: "chicken",
      name: "بوكس فرايد تشيكن كرسبي",
      description: "قطع دجاج مقلي مقرمش بخلطة التوابل الذهبية يقدم مع بطاطس، كول سلو وخبز.",
      price: 195,
      oldPrice: 230,
      rating: 4.9,
      prepTime: "20 د",
      calories: 980,
      badge: "عائلي 🔥",
      featured: true,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "3pcs", name: "3 قطع + بطاطس", addPrice: 0 },
        { id: "5pcs", name: "5 قطع + أرز + بطاطس", addPrice: 95 },
        { id: "8pcs", name: "بوكس 8 قطع عائلي", addPrice: 210 }
      ],
      addons: [
        { id: "garlic", name: "تومية كريمي", price: 15 },
        { id: "coleslaw", name: "كول سلو كبير", price: 25 }
      ]
    },
    {
      id: 8,
      category: "chicken",
      name: "أجنحة دجاج بافلو حارة",
      description: "أجنحة دجاج مقرمشة مغموسة في صوص البافلو الحار أو الباربيكيو وتقدم مع صوص رانش.",
      price: 130,
      rating: 4.8,
      prepTime: "15 د",
      calories: 620,
      badge: "حار 🌶️",
      image: "https://images.unsplash.com/photo-1608039829572-f8d0d646ff5f?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "6pcs", name: "6 قطع", addPrice: 0 },
        { id: "12pcs", name: "12 قطعة", addPrice: 110 }
      ],
      addons: [
        { id: "ranch", name: "اكسترا صوص رانش", price: 15 }
      ]
    },
    {
      id: 9,
      category: "chicken",
      name: "ريب آي ستيك مشوي على الفحم",
      description: "قطعة ستيك ريب آي مشوية على الجريل بالزبدة والأعشاب تقدم مع خضار سوتيه وصوص المشروم.",
      price: 340,
      rating: 5.0,
      prepTime: "25 د",
      calories: 850,
      badge: "فاخر 👑",
      featured: true,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "250g", name: "250 جرام", addPrice: 0 },
        { id: "400g", name: "400 جرام", addPrice: 140 }
      ],
      addons: [
        { id: "pepper_sauce", name: "صوص الفلفل الأسود", price: 25 },
        { id: "mashed", name: "ماشد بوتيتو بالكريمة", price: 40 }
      ]
    },
    {
      id: 10,
      category: "chicken",
      name: "فيليه دجاج مشوي تشيبوتلي",
      description: "صدور دجاج مشوية متبلة بصوص التشيبوتلي الكريمي تقدم مع أرز بسمتي أو بطاطس.",
      price: 180,
      rating: 4.7,
      prepTime: "18 د",
      calories: 590,
      image: "https://images.unsplash.com/photo-1612185533785-cc6f4c55030b?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "rice", name: "مع أرز بسمتي", addPrice: 0 },
        { id: "pasta", name: "مع مكرونة وايت صوص", addPrice: 25 }
      ],
      addons: []
    },
    {
      id: 11,
      category: "pasta",
      name: "باستا ألفريدو بيستو دجاج",
      description: "مكرونة إيطالية بصوص الريحان والكريمة الغنية مع قطع الدجاج المشوي وجبنة البارميزان.",
      price: 155,
      rating: 4.8,
      prepTime: "16 د",
      calories: 690,
      badge: "جديد ✨",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "extra_chicken", name: "اكسترا قطع دجاج مشوي", price: 45 },
        { id: "parmesan", name: "اكسترا بارميزان", price: 20 }
      ]
    },
    {
      id: 12,
      category: "pasta",
      name: "سباجيتي وايت صوص كاربونارا",
      description: "سباجيتي بصوص الكريمة الثقيل مع بيكون بقري مدخن وفلفل أسود مجروش.",
      price: 165,
      rating: 4.7,
      prepTime: "16 د",
      calories: 740,
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "cheese", name: "موتزاريلا في الفرن", price: 30 }
      ]
    },
    {
      id: 13,
      category: "pasta",
      name: "بيني أرابياتا ريد صوص",
      description: "مكرونة بيني بصلصة الطماطم الإيطالية الحارة بالثوم والريحان وزيت الزيتون.",
      price: 120,
      rating: 4.6,
      prepTime: "14 د",
      calories: 520,
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d62817ee?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "chicken", name: "إضافة فراخ مشوية", price: 45 }
      ]
    },
    {
      id: 14,
      category: "tacos",
      name: "تاكو لحم مكسيكي أصلي",
      description: "3 قطع تاكو محشوة بلحم مفروم متبل، صوص جواكامولي، بيكو دي جايو وجبنة شيدر.",
      price: 145,
      rating: 4.8,
      prepTime: "14 د",
      calories: 610,
      badge: "الأكثر طلباً 🔥",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a127da?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "3pcs", name: "3 قطع", addPrice: 0 },
        { id: "5pcs", name: "5 قطع", addPrice: 80 }
      ],
      addons: [
        { id: "sour", name: "صوص ساور كريم", price: 15 }
      ]
    },
    {
      id: 15,
      category: "tacos",
      name: "لوديد ناتشوز بالجبنة واللحم",
      description: "رقائق تورتيلا مقرمشة غرقانة في صوص الشيدر، لحم مكسيكي، هالبينو وجواكامولي.",
      price: 135,
      rating: 4.9,
      prepTime: "12 د",
      calories: 780,
      image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "extra_cheese", name: "اكسترا صوص جبنة", price: 25 }
      ]
    },
    {
      id: 16,
      category: "sides",
      name: "بطاطس ترافل وبارميزان",
      description: "بطاطس مقرمشة مقلية طازة متبلة بزيت الكمأة وجبنة البارميزان والروزماري.",
      price: 75,
      rating: 4.8,
      prepTime: "10 د",
      calories: 430,
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "cheddar", name: "غمسة جبنة شيدر", price: 20 }
      ]
    },
    {
      id: 17,
      category: "sides",
      name: "باكيت بطاطس ذهبية مقرمشة",
      description: "بطاطس فارم فريتس مقرمشة بتتبيلة الشيف الخاصة.",
      price: 45,
      rating: 4.7,
      prepTime: "8 د",
      calories: 320,
      image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "reg", name: "عادي", addPrice: 0 },
        { id: "large", name: "جامبو", addPrice: 25 }
      ],
      addons: []
    },
    {
      id: 18,
      category: "sides",
      name: "سلطة سيزر بالدجاج المشوي",
      description: "خس روماني فريش مع صوص السيزر الأصلي، خبز محمص بالثوم وشرائح بارميزان.",
      price: 115,
      rating: 4.7,
      prepTime: "10 د",
      calories: 360,
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "chicken", name: "اكسترا دجاج مشوي", price: 45 }
      ]
    },
    {
      id: 19,
      category: "drinks",
      name: "موهيتو ليمون نعناع أزرق",
      description: "مشروب صودا منعش مع ليمون فريش، نعناع أخضر وتلج مجروش.",
      price: 60,
      rating: 4.9,
      prepTime: "5 د",
      calories: 140,
      badge: "منعش ❄️",
      featured: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      sizes: [
        { id: "lemon", name: "ليمون نعناع", addPrice: 0 },
        { id: "berry", name: "توت أزرق", addPrice: 10 },
        { id: "passion", name: "باشن فروت", addPrice: 15 }
      ],
      addons: []
    },
    {
      id: 20,
      category: "drinks",
      name: "آيس كوفي كراميل ماكياتو",
      description: "إسبريسو مزدوج مع حليب بارد وصوص الكراميل المملح ومكعبات التلج.",
      price: 75,
      rating: 4.8,
      prepTime: "5 د",
      calories: 210,
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "shot", name: "اكسترا شوت إسبريسو", price: 20 }
      ]
    },
    {
      id: 21,
      category: "drinks",
      name: "عصير فراولة ومانجو سموثي",
      description: "فاكهة طبيعية 100% مثلجة بدون سكر مضاف.",
      price: 65,
      rating: 4.7,
      prepTime: "5 د",
      calories: 180,
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      addons: []
    },
    {
      id: 22,
      category: "drinks",
      name: "لاتيه ساخن أرتيزان",
      description: "قهوة محمصة فريش مع فوم حليب كريمي.",
      price: 55,
      rating: 4.8,
      prepTime: "5 د",
      calories: 150,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
      addons: []
    },
    {
      id: 23,
      category: "desserts",
      name: "مولتن شوكليت لافا كيك",
      description: "كيك شوكولاتة داكنة ساخن محشو شوكولاتة سايحة يقدم مع بولة آيس كريم فانيليا.",
      price: 110,
      rating: 5.0,
      prepTime: "12 د",
      calories: 540,
      badge: "الأكثر طلباً 🔥",
      featured: true,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      addons: [
        { id: "ice", name: "بولة آيس كريم إضافية", price: 25 },
        { id: "nutella", name: "اكسترا نوتيلا", price: 25 }
      ]
    },
    {
      id: 24,
      category: "desserts",
      name: "تيراميسو إيطالي كلاسيك",
      description: "طبقات بسكويت سافوياردي مشبع بالإسبريسو مع كريمة الماسكاربوني والكاكاو الفاخر.",
      price: 95,
      rating: 4.9,
      prepTime: "5 د",
      calories: 420,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
      addons: []
    },
    {
      id: 25,
      category: "desserts",
      name: "آيس كريم صنداي فادج",
      description: "3 بولات آيس كريم فانيليا وشوكولاتة مع صوص كراميل وفادج شوكولاتة ومكسرات.",
      price: 85,
      rating: 4.8,
      prepTime: "5 د",
      calories: 460,
      image: "https://images.unsplash.com/photo-1657225953401-5f95007fc8e0?auto=format&fit=crop&w=800&q=80",
      addons: []
    }
  ]
};
