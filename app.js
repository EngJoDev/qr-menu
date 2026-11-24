let activeCategory = "all";
let searchQuery = "";
let orderType = "delivery";
let onlyFavorites = false;
let isListView = false;
let currentHeroIndex = 0;
let appliedPromo = null;

// تحميل السلة والمفضلة من المتصفح
let cart = JSON.parse(localStorage.getItem("qrmenu_cart") || "[]");
let favorites = JSON.parse(localStorage.getItem("qrmenu_favs") || "[]");

// حالة نافذة تخصيص الصنف
let modalItem = null;
let modalSizeId = null;
let modalAddonIds = new Set();
let modalQty = 1;

function saveState() {
  localStorage.setItem("qrmenu_cart", JSON.stringify(cart));
  localStorage.setItem("qrmenu_favs", JSON.stringify(favorites));
}

function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.remove("opacity-0", "-translate-y-2");
  toast.classList.add("opacity-100", "translate-y-0");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add("opacity-0", "-translate-y-2");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 2200);
}

// 1. تهيئة البراند والخلفية المتحركة
function initBrandAndAnimations() {
  document.title = `${MENU_CONFIG.restaurantName} - المنيو الإلكتروني`;
  document.getElementById("brand-name").textContent = MENU_CONFIG.restaurantName;
  document.getElementById("brand-tagline").textContent = MENU_CONFIG.tagline;
  document.getElementById("hero-rating").textContent = MENU_CONFIG.rating;
  document.getElementById("hero-prep").textContent = MENU_CONFIG.prepEstimate;
  document.getElementById("info-address").textContent = MENU_CONFIG.address;
  document.getElementById("info-hours").textContent = MENU_CONFIG.workingHours;
  document.getElementById("info-phone").textContent = MENU_CONFIG.phoneDisplay;

  const logoEl = document.getElementById("brand-logo");
  logoEl.innerHTML = MENU_CONFIG.logoImage
    ? `<img src="${MENU_CONFIG.logoImage}" alt="Logo" class="w-full h-full object-cover rounded-[14px]" />`
    : `<div class="w-full h-full flex items-center justify-center text-xl">${MENU_CONFIG.logoEmoji}</div>`;

  // حقن صور الأكل المتحركة في الخلفية
  const bgContainer = document.getElementById("floating-bg");
  const positions = [
    "top-[8%] right-[4%] w-28 h-28 float-slow",
    "top-[22%] left-[5%] w-32 h-32 float-reverse",
    "top-[45%] right-[8%] w-24 h-24 float-reverse",
    "top-[60%] left-[6%] w-36 h-36 float-slow",
    "top-[78%] right-[12%] w-28 h-28 float-slow",
    "top-[14%] left-[42%] w-20 h-20 float-reverse",
    "top-[70%] left-[45%] w-24 h-24 float-slow",
    "top-[38%] left-[25%] w-20 h-20 float-reverse"
  ];
  MENU_CONFIG.floatingBgImages.forEach((src, i) => {
    const imgWrap = document.createElement("div");
    imgWrap.className = `absolute rounded-full overflow-hidden opacity-[0.09] dark:opacity-[0.08] border border-orange-500/30 shadow-2xl ${positions[i % positions.length]}`;
    imgWrap.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="" />`;
    bgContainer.appendChild(imgWrap);
  });

  // شريط العروض المتحرك (مكرر مرتين للانسيابية)
  const marqueeTrack = document.getElementById("marquee-track");
  const marqueeContent = MENU_CONFIG.marqueeItems.map(txt => `<span class="mx-6">${txt}</span>`).join("•");
  marqueeTrack.innerHTML = `<div dir="rtl" class="flex items-center">${marqueeContent} • ${marqueeContent}</div>`;

  // سلايدر الهيرو
  const slidesContainer = document.getElementById("hero-slides-container");
  const dotsContainer = document.getElementById("hero-dots");
  slidesContainer.innerHTML = MENU_CONFIG.heroSlides.map((s, idx) => `
    <img src="${s.image}" alt="${s.title}" class="hero-slide-img absolute inset-0 w-full h-full object-cover animate-kenburns transition-opacity duration-1000 ${idx === 0 ? 'opacity-100' : 'opacity-0'}" />
  `).join("");
  dotsContainer.innerHTML = MENU_CONFIG.heroSlides.map((_, idx) => `
    <button data-hero-dot="${idx}" class="h-1.5 rounded-full transition-all ${idx === 0 ? 'w-7 bg-orange-500' : 'w-2 bg-white/40'}"></button>
  `).join("");

  updateHeroText(0);
  setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % MENU_CONFIG.heroSlides.length;
    showHeroSlide(currentHeroIndex);
  }, 4500);
}

function showHeroSlide(index) {
  currentHeroIndex = index;
  document.querySelectorAll(".hero-slide-img").forEach((img, idx) => {
    img.classList.toggle("opacity-100", idx === index);
    img.classList.toggle("opacity-0", idx !== index);
  });
  document.querySelectorAll("[data-hero-dot]").forEach((dot, idx) => {
    dot.className = idx === index ? "h-1.5 rounded-full transition-all w-7 bg-orange-500" : "h-1.5 rounded-full transition-all w-2 bg-white/40";
  });
  updateHeroText(index);
}

function updateHeroText(index) {
  const slide = MENU_CONFIG.heroSlides[index];
  document.getElementById("hero-badge").textContent = slide.badge;
  document.getElementById("hero-title").textContent = slide.title;
  document.getElementById("hero-subtitle").textContent = slide.subtitle;
}

// 2. سلايدر الأكثر مبيعاً
function renderFeatured() {
  const slider = document.getElementById("featured-slider");
  const featuredItems = MENU_CONFIG.items.filter(i => i.featured);
  slider.innerHTML = featuredItems.map(item => `
    <div data-open-item="${item.id}" class="cursor-pointer snap-start shrink-0 w-60 bg-white dark:bg-[#16161E] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-md hover:border-orange-500/60 transition group">
      <div class="relative h-32 overflow-hidden">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        ${item.badge ? `<span class="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">${item.badge}</span>` : ""}
        <span class="absolute bottom-2 right-2 text-white font-black text-sm">${item.price} ${MENU_CONFIG.currency}</span>
      </div>
      <div class="p-3">
        <h4 class="font-extrabold text-sm truncate">${item.name}</h4>
        <div class="flex items-center justify-between mt-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-bold">
          <span>⭐ ${item.rating}</span>
          <span class="text-orange-500 font-extrabold">+ اطلب الآن</span>
        </div>
      </div>
    </div>
  `).join("");
}

// 3. التصنيفات والقائمة
function renderCategories() {
  const bar = document.getElementById("categories-bar");
  bar.innerHTML = MENU_CONFIG.categories.map(cat => {
    const active = cat.id === activeCategory && !onlyFavorites;
    return `
      <button
        data-cat="${cat.id}"
        class="cat-btn shrink-0 px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 border ${
          active
            ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white border-transparent shadow-md"
            : "bg-white dark:bg-[#16161E] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-orange-500"
        }"
      >
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `;
  }).join("");
}

function renderMenu() {
  const grid = document.getElementById("menu-grid");
  grid.className = isListView
    ? "grid grid-cols-1 gap-3"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

  const q = searchQuery.trim().toLowerCase();
  const filtered = MENU_CONFIG.items.filter(item => {
    if (onlyFavorites && !favorites.includes(item.id)) return false;
    if (!onlyFavorites && activeCategory !== "all" && item.category !== activeCategory) return false;
    return !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  });

  document.getElementById("items-count-label").textContent = onlyFavorites
    ? `❤️ المفضلة (${filtered.length} صنف)`
    : `عرض ${filtered.length} صنف شهي`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-16 text-gray-400 font-bold">مفيش أصناف مطابقة حالياً 😕</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isFav = favorites.includes(item.id);
    const inCartQty = cart.filter(c => c.itemId === item.id).reduce((s, c) => s + c.qty, 0);

    if (isListView) {
      return `
        <div data-open-item="${item.id}" class="cursor-pointer bg-white dark:bg-[#16161E] rounded-2xl p-3 border border-gray-200 dark:border-white/10 shadow-sm hover:border-orange-500/60 transition flex gap-3.5 items-center group">
          <div class="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            ${item.badge ? `<span class="absolute top-1.5 right-1.5 bg-orange-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">${item.badge}</span>` : ""}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-black text-sm truncate">${item.name}</h4>
              <button data-fav="${item.id}" class="text-sm shrink-0">${isFav ? "❤️" : "🤍"}</button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">${item.description}</p>
            <div class="flex items-center justify-between mt-2.5">
              <div class="flex items-center gap-2">
                <span class="font-black text-orange-500 text-sm">${item.price} ${MENU_CONFIG.currency}</span>
                ${item.oldPrice ? `<span class="text-[11px] text-gray-400 line-through">${item.oldPrice}</span>` : ""}
              </div>
              <button data-quick-add="${item.id}" class="px-3 py-1.5 rounded-xl bg-orange-500/15 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-extrabold transition">
                ${inCartQty > 0 ? `في السلة (${inCartQty})` : "+ تخصيص وطلب"}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div data-open-item="${item.id}" class="cursor-pointer bg-white dark:bg-[#16161E] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl hover:border-orange-500/60 transition flex flex-col group">
        <div class="relative h-44 overflow-hidden bg-black">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20"></div>
          ${item.badge ? `<span class="absolute top-3 right-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-lg">${item.badge}</span>` : ""}
          <button data-fav="${item.id}" class="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-sm hover:scale-110 transition">${isFav ? "❤️" : "🤍"}</button>
          <div class="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-white text-[11px] font-bold">
            <span class="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">⭐ ${item.rating}</span>
            <span class="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">⏱️ ${item.prepTime} • 🔥 ${item.calories} كالوري</span>
          </div>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-black text-base leading-snug">${item.name}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">${item.description}</p>
          </div>
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
            <div>
              <span class="font-black text-orange-500 text-base">${item.price} ${MENU_CONFIG.currency}</span>
              ${item.oldPrice ? `<span class="text-xs text-gray-400 line-through mr-1.5">${item.oldPrice}</span>` : ""}
            </div>
            <button data-quick-add="${item.id}" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-extrabold shadow hover:brightness-110 transition">
              ${inCartQty > 0 ? `✓ بالسلة (${inCartQty})` : "+ أضف للطلب"}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 4. نافذة تخصيص الصنف
function openItemModal(itemId) {
  modalItem = MENU_CONFIG.items.find(i => i.id === itemId);
  if (!modalItem) return;

  modalQty = 1;
  modalSizeId = modalItem.sizes && modalItem.sizes.length ? modalItem.sizes[0].id : null;
  modalAddonIds = new Set();

  document.getElementById("modal-item-img").src = modalItem.image;
  document.getElementById("modal-item-name").textContent = modalItem.name;
  document.getElementById("modal-item-desc").textContent = modalItem.description;
  document.getElementById("modal-item-meta").textContent = `⭐ ${modalItem.rating} • ⏱️ ${modalItem.prepTime} • 🔥 ${modalItem.calories} كالوري`;
  document.getElementById("modal-item-note").value = "";
  document.getElementById("modal-qty-val").textContent = "1";

  const badgeEl = document.getElementById("modal-item-badge");
  if (modalItem.badge) {
    badgeEl.textContent = modalItem.badge;
    badgeEl.classList.remove("hidden");
  } else {
    badgeEl.classList.add("hidden");
  }

  document.getElementById("modal-item-fav").textContent = favorites.includes(modalItem.id) ? "❤️" : "🤍";

  // الأحجام
  const sizesSec = document.getElementById("modal-sizes-section");
  const sizesList = document.getElementById("modal-sizes-list");
  if (modalItem.sizes && modalItem.sizes.length) {
    sizesSec.classList.remove("hidden");
    renderModalSizes();
  } else {
    sizesSec.classList.add("hidden");
    sizesList.innerHTML = "";
  }

  // الإضافات
  const addonsSec = document.getElementById("modal-addons-section");
  const addonsList = document.getElementById("modal-addons-list");
  if (modalItem.addons && modalItem.addons.length) {
    addonsSec.classList.remove("hidden");
    renderModalAddons();
  } else {
    addonsSec.classList.add("hidden");
    addonsList.innerHTML = "";
  }

  updateModalLivePrice();
  const modal = document.getElementById("item-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function renderModalSizes() {
  const sizesList = document.getElementById("modal-sizes-list");
  sizesList.innerHTML = modalItem.sizes.map(sz => {
    const active = sz.id === modalSizeId;
    return `
      <button type="button" data-select-size="${sz.id}" class="p-2.5 rounded-xl border text-right flex items-center justify-between text-xs font-bold transition ${
        active ? "border-orange-500 bg-orange-500/15 text-orange-500" : "border-gray-200 dark:border-white/10"
      }">
        <span>${sz.name}</span>
        <span>${sz.addPrice > 0 ? `+${sz.addPrice} ${MENU_CONFIG.currency}` : "الأساسي"}</span>
      </button>
    `;
  }).join("");
}

function renderModalAddons() {
  const addonsList = document.getElementById("modal-addons-list");
  addonsList.innerHTML = modalItem.addons.map(ad => {
    const checked = modalAddonIds.has(ad.id);
    return `
      <button type="button" data-toggle-addon="${ad.id}" class="w-full p-2.5 rounded-xl border text-right flex items-center justify-between text-xs font-bold transition ${
        checked ? "border-orange-500 bg-orange-500/10" : "border-gray-200 dark:border-white/10"
      }">
        <span class="flex items-center gap-2">
          <span>${checked ? "☑️" : "⬜"}</span>
          <span>${ad.name}</span>
        </span>
        <span class="text-orange-500">+${ad.price} ${MENU_CONFIG.currency}</span>
      </button>
    `;
  }).join("");
}

function getModalUnitPrice() {
  let price = modalItem.price;
  if (modalSizeId && modalItem.sizes) {
    const sz = modalItem.sizes.find(s => s.id === modalSizeId);
    if (sz) price += sz.addPrice;
  }
  if (modalItem.addons) {
    modalItem.addons.forEach(ad => {
      if (modalAddonIds.has(ad.id)) price += ad.price;
    });
  }
  return price;
}

function updateModalLivePrice() {
  const total = getModalUnitPrice() * modalQty;
  document.getElementById("modal-live-price").textContent = `${total} ${MENU_CONFIG.currency}`;
}

function closeItemModal() {
  const modal = document.getElementById("item-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function addModalItemToCart() {
  if (!modalItem) return;
  const sizeObj = modalItem.sizes?.find(s => s.id === modalSizeId) || null;
  const addonObjs = (modalItem.addons || []).filter(a => modalAddonIds.has(a.id));
  const note = document.getElementById("modal-item-note").value.trim();
  const unitPrice = getModalUnitPrice();

  const key = `${modalItem.id}|${sizeObj ? sizeObj.id : ""}|${addonObjs.map(a => a.id).sort().join(",")}|${note}`;
  const existing = cart.find(c => c.key === key);
  if (existing) {
    existing.qty += modalQty;
  } else {
    cart.push({
      key,
      itemId: modalItem.id,
      name: modalItem.name,
      sizeName: sizeObj ? sizeObj.name : "",
      addonsNames: addonObjs.map(a => a.name),
      note,
      unitPrice,
      qty: modalQty
    });
  }

  saveState();
  updateCartUI();
  renderMenu();
  closeItemModal();
  showToast(`✅ تم إضافة "${modalItem.name}" للسلة`);
}

// 5. السلة والحسابات
function getSubtotal() {
  return cart.reduce((sum, c) => sum + c.unitPrice * c.qty, 0);
}

function getDiscountAmount(subtotal) {
  if (!appliedPromo) return 0;
  if (appliedPromo.minOrder && subtotal < appliedPromo.minOrder) return 0;
  if (appliedPromo.type === "percent") return Math.round((subtotal * appliedPromo.value) / 100);
  return Math.min(appliedPromo.value, subtotal);
}

function updateCartUI() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  const subtotal = getSubtotal();
  const bar = document.getElementById("cart-bar");

  if (count === 0) {
    bar.classList.add("hidden");
  } else {
    bar.classList.remove("hidden");
    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = `${subtotal} ${MENU_CONFIG.currency}`;
    const remain = MENU_CONFIG.freeDeliveryThreshold - subtotal;
    document.getElementById("cart-bar-hint").textContent = remain > 0
      ? `باقي ${remain} ${MENU_CONFIG.currency} على التوصيل المجاني 🛵`
      : "🎉 مبروك! حصلت على توصيل مجاني";
  }
}

function renderCheckoutSummary() {
  if (cart.length === 0) {
    closeCheckout();
    return;
  }

  const container = document.getElementById("modal-cart-items");
  container.innerHTML = cart.map((c, idx) => `
    <div class="py-3 flex items-start justify-between gap-2 text-sm">
      <div class="min-w-0 flex-1">
        <p class="font-extrabold">${c.name}</p>
        ${c.sizeName ? `<p class="text-[11px] text-orange-500 font-bold">الحجم: ${c.sizeName}</p>` : ""}
        ${c.addonsNames.length ? `<p class="text-[11px] text-gray-500 dark:text-gray-400">إضافات: ${c.addonsNames.join("، ")}</p>` : ""}
        ${c.note ? `<p class="text-[11px] text-amber-500">ملاحظة: ${c.note}</p>` : ""}
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="font-black text-xs">${c.unitPrice * c.qty} ${MENU_CONFIG.currency}</span>
        <div class="flex items-center gap-1 bg-gray-100 dark:bg-white/10 rounded-lg px-1.5 py-0.5">
          <button data-cart-sub="${idx}" class="w-5 h-5 font-black">-</button>
          <span class="text-xs font-black px-1">${c.qty}</span>
          <button data-cart-add="${idx}" class="w-5 h-5 font-black">+</button>
        </div>
      </div>
    </div>
  `).join("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount(subtotal);
  const afterDiscount = Math.max(0, subtotal - discount);
  const unlockedFree = subtotal >= MENU_CONFIG.freeDeliveryThreshold;
  const delivery = orderType === "delivery" ? (unlockedFree ? 0 : MENU_CONFIG.deliveryFee) : 0;
  const total = afterDiscount + delivery;

  // شريط التوصيل المجاني
  const pct = Math.min(100, Math.round((subtotal / MENU_CONFIG.freeDeliveryThreshold) * 100));
  document.getElementById("free-delivery-bar").style.width = `${pct}%`;
  document.getElementById("free-delivery-text").textContent = unlockedFree
    ? "🎉 مبروك! تم تفعيل التوصيل المجاني على طلبك"
    : `أضف أصناف بـ ${MENU_CONFIG.freeDeliveryThreshold - subtotal} ${MENU_CONFIG.currency} للحصول على توصيل مجاني 🛵`;

  document.getElementById("summary-subtotal").textContent = `${subtotal} ${MENU_CONFIG.currency}`;

  const discRow = document.getElementById("summary-discount-row");
  if (discount > 0) {
    discRow.classList.remove("hidden");
    discRow.classList.add("flex");
    document.getElementById("summary-promo-label").textContent = appliedPromo.code;
    document.getElementById("summary-discount").textContent = `-${discount} ${MENU_CONFIG.currency}`;
  } else {
    discRow.classList.add("hidden");
    discRow.classList.remove("flex");
  }

  document.getElementById("summary-delivery-row").style.display = orderType === "delivery" ? "flex" : "none";
  document.getElementById("summary-delivery").textContent = unlockedFree ? "مجاني 🎉" : `${delivery} ${MENU_CONFIG.currency}`;
  document.getElementById("summary-total").textContent = `${total} ${MENU_CONFIG.currency}`;
}

function openCheckout() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  renderCheckoutSummary();
}

function closeCheckout() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function setOrderType(type) {
  orderType = type;
  document.querySelectorAll(".order-type-btn").forEach(btn => {
    const active = btn.dataset.type === type;
    btn.className = active
      ? "order-type-btn py-2.5 px-2 rounded-xl text-xs font-extrabold border-2 border-orange-500 bg-orange-500/15 text-orange-500"
      : "order-type-btn py-2.5 px-2 rounded-xl text-xs font-extrabold border border-gray-200 dark:border-white/10 text-gray-500";
  });
  document.getElementById("address-field").classList.toggle("hidden", type !== "delivery");
  document.getElementById("table-field").classList.toggle("hidden", type !== "dinein");
  renderCheckoutSummary();
}

// 6. المفضلة والثيم والـ QR
function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    showToast("تمت الإزالة من المفضلة");
  } else {
    favorites.push(id);
    showToast("❤️ تمت الإضافة للمفضلة");
  }
  saveState();
  renderMenu();
  if (modalItem && modalItem.id === id) {
    document.getElementById("modal-item-fav").textContent = favorites.includes(id) ? "❤️" : "🤍";
  }
}

function generateQR() {
  const box = document.getElementById("qrcode-box");
  box.innerHTML = "";
  try {
    if (typeof QRCode !== "undefined") {
      new QRCode(box, {
        text: window.location.href,
        width: 190,
        height: 190,
        colorDark: "#0B0B0F",
        colorLight: "#ffffff"
      });
    } else {
      box.innerHTML = `<p class="text-xs text-gray-800 p-4">افتح الرابط من الإنترنت لتوليد QR Code</p>`;
    }
  } catch (err) {
    box.innerHTML = `<p class="text-xs text-gray-800 p-4">${window.location.href}</p>`;
  }
}

// المستمعين للأحداث
document.addEventListener("click", (e) => {
  const heroDot = e.target.closest("[data-hero-dot]");
  if (heroDot) return showHeroSlide(Number(heroDot.dataset.heroDot));

  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) {
    e.stopPropagation();
    return toggleFav(Number(favBtn.dataset.fav));
  }

  const openCard = e.target.closest("[data-open-item]");
  if (openCard) return openItemModal(Number(openCard.dataset.openItem));

  const catBtn = e.target.closest(".cat-btn");
  if (catBtn) {
    onlyFavorites = false;
    document.getElementById("fav-filter-btn").innerHTML = "<span>🤍</span>";
    activeCategory = catBtn.dataset.cat;
    renderCategories();
    renderMenu();
    return;
  }

  const sizeBtn = e.target.closest("[data-select-size]");
  if (sizeBtn) {
    modalSizeId = sizeBtn.dataset.selectSize;
    renderModalSizes();
    updateModalLivePrice();
    return;
  }

  const addonBtn = e.target.closest("[data-toggle-addon]");
  if (addonBtn) {
    const adId = addonBtn.dataset.toggleAddon;
    if (modalAddonIds.has(adId)) modalAddonIds.delete(adId);
    else modalAddonIds.add(adId);
    renderModalAddons();
    updateModalLivePrice();
    return;
  }

  const cartAdd = e.target.closest("[data-cart-add]");
  if (cartAdd) {
    cart[Number(cartAdd.dataset.cartAdd)].qty += 1;
    saveState();
    updateCartUI();
    renderCheckoutSummary();
    renderMenu();
    return;
  }

  const cartSub = e.target.closest("[data-cart-sub]");
  if (cartSub) {
    const idx = Number(cartSub.dataset.cartSub);
    cart[idx].qty -= 1;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveState();
    updateCartUI();
    renderCheckoutSummary();
    renderMenu();
    return;
  }

  const typeBtn = e.target.closest(".order-type-btn");
  if (typeBtn) setOrderType(typeBtn.dataset.type);
});

document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderMenu();
});

document.getElementById("view-toggle-btn").addEventListener("click", (e) => {
  isListView = !isListView;
  e.currentTarget.textContent = isListView ? "⊞" : "☰";
  renderMenu();
});

document.getElementById("fav-filter-btn").addEventListener("click", (e) => {
  onlyFavorites = !onlyFavorites;
  e.currentTarget.innerHTML = onlyFavorites ? "<span>❤️</span>" : "<span>🤍</span>";
  renderCategories();
  renderMenu();
});

document.getElementById("theme-toggle-btn").addEventListener("click", (e) => {
  const isDark = document.documentElement.classList.toggle("dark");
  e.currentTarget.textContent = isDark ? "☀️" : "🌙";
});

document.getElementById("close-item-modal").addEventListener("click", closeItemModal);
document.getElementById("modal-item-fav").addEventListener("click", () => modalItem && toggleFav(modalItem.id));
document.getElementById("modal-qty-plus").addEventListener("click", () => {
  modalQty += 1;
  document.getElementById("modal-qty-val").textContent = modalQty;
  updateModalLivePrice();
});
document.getElementById("modal-qty-minus").addEventListener("click", () => {
  if (modalQty > 1) modalQty -= 1;
  document.getElementById("modal-qty-val").textContent = modalQty;
  updateModalLivePrice();
});
document.getElementById("modal-add-to-cart-btn").addEventListener("click", addModalItemToCart);

document.getElementById("open-checkout-btn").addEventListener("click", openCheckout);
document.getElementById("close-checkout-btn").addEventListener("click", closeCheckout);
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  cart = [];
  appliedPromo = null;
  saveState();
  updateCartUI();
  renderMenu();
  closeCheckout();
  showToast("تم إفراغ السلة");
});

document.getElementById("apply-promo-btn").addEventListener("click", () => {
  const code = document.getElementById("promo-input").value.trim().toUpperCase();
  const msgEl = document.getElementById("promo-msg");
  const promo = MENU_CONFIG.promoCodes[code];
  const subtotal = getSubtotal();

  msgEl.classList.remove("hidden");
  if (!promo) {
    appliedPromo = null;
    msgEl.className = "text-xs font-bold mt-1.5 text-red-500";
    msgEl.textContent = "❌ كود الخصم غير صحيح. جرب CHEF10";
  } else if (promo.minOrder && subtotal < promo.minOrder) {
    appliedPromo = null;
    msgEl.className = "text-xs font-bold mt-1.5 text-amber-500";
    msgEl.textContent = `⚠️ هذا الكود متاح للطلبات فوق ${promo.minOrder} ${MENU_CONFIG.currency}`;
  } else {
    appliedPromo = { ...promo, code };
    msgEl.className = "text-xs font-bold mt-1.5 text-emerald-500";
    msgEl.textContent = `✅ تم تفعيل ${promo.label} بنجاح!`;
  }
  renderCheckoutSummary();
});

document.getElementById("open-info-btn").addEventListener("click", () => {
  generateQR();
  const m = document.getElementById("info-modal");
  m.classList.remove("hidden");
  m.classList.add("flex");
});
document.getElementById("close-info-btn").addEventListener("click", () => {
  const m = document.getElementById("info-modal");
  m.classList.add("hidden");
  m.classList.remove("flex");
});
document.getElementById("download-qr-btn").addEventListener("click", () => {
  const canvas = document.querySelector("#qrcode-box canvas");
  const img = document.querySelector("#qrcode-box img");
  const dataUrl = canvas ? canvas.toDataURL("image/png") : img?.src;
  if (!dataUrl) return;
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "restaurant-menu-qr.png";
  a.click();
});

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("form-error");
  errorEl.classList.add("hidden");

  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const address = document.getElementById("cust-address").value.trim();
  const table = document.getElementById("cust-table").value.trim();
  const notes = document.getElementById("cust-notes").value.trim();

  if (!name || !phone) {
    errorEl.textContent = "من فضلك اكتب الاسم ورقم الموبايل.";
    errorEl.classList.remove("hidden");
    return;
  }
  if (orderType === "delivery" && !address) {
    errorEl.textContent = "من فضلك اكتب عنوان التوصيل.";
    errorEl.classList.remove("hidden");
    return;
  }
  if (orderType === "dinein" && !table) {
    errorEl.textContent = "من فضلك اكتب رقم الترابيزة.";
    errorEl.classList.remove("hidden");
    return;
  }

  const subtotal = getSubtotal();
  const discount = getDiscountAmount(subtotal);
  const unlockedFree = subtotal >= MENU_CONFIG.freeDeliveryThreshold;
  const delivery = orderType === "delivery" ? (unlockedFree ? 0 : MENU_CONFIG.deliveryFee) : 0;
  const total = Math.max(0, subtotal - discount) + delivery;
  const orderId = Math.floor(1000 + Math.random() * 9000);
  const typeLabels = { delivery: "دليفري 🛵", takeaway: "تيك أواي 🛍️", dinein: "صالة 🍽️" };

  let msg = `🔥 *طلب جديد #${orderId} - ${MENU_CONFIG.restaurantName}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━\n`;
  cart.forEach(c => {
    msg += `▪️ *${c.name}* (${c.qty}×)\n`;
    if (c.sizeName) msg += `   ├ الحجم: ${c.sizeName}\n`;
    if (c.addonsNames.length) msg += `   ├ إضافات: ${c.addonsNames.join("، ")}\n`;
    if (c.note) msg += `   ├ ملاحظة: ${c.note}\n`;
    msg += `   └ السعر: ${c.unitPrice * c.qty} ${MENU_CONFIG.currency}\n`;
  });
  msg += `━━━━━━━━━━━━━━━━━━\n`;
  msg += `المجموع: ${subtotal} ${MENU_CONFIG.currency}\n`;
  if (discount > 0) msg += `الخصم (${appliedPromo.code}): -${discount} ${MENU_CONFIG.currency}\n`;
  if (orderType === "delivery") msg += `التوصيل: ${unlockedFree ? "مجاني 🎉" : `${delivery} ${MENU_CONFIG.currency}`}\n`;
  msg += `💰 *الإجمالي المطلوب: ${total} ${MENU_CONFIG.currency}*\n\n`;
  msg += `👤 *بيانات العميل:*\n`;
  msg += `الاسم: ${name}\n`;
  msg += `الموبايل: ${phone}\n`;
  msg += `نوع الطلب: ${typeLabels[orderType]}\n`;
  if (orderType === "delivery") msg += `العنوان: ${address}\n`;
  if (orderType === "dinein") msg += `الترابيزة: ${table}\n`;
  if (notes) msg += `ملاحظات عامة: ${notes}\n`;

  let targetPhone = MENU_CONFIG.whatsapp.replace(/\D/g, "");
  if (targetPhone.startsWith("01")) targetPhone = "2" + targetPhone;

  window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, "_blank");
});

initBrandAndAnimations();
renderFeatured();
renderCategories();
renderMenu();
updateCartUI();
