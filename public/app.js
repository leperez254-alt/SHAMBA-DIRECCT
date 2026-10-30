const seedProducts = [
  { id: "tomatoes", name: "Vine tomatoes", description: "Juicy, vine-ripened tomatoes grown on our family farm. Freshly harvested and packed in a 2 kg crate.", category: "Vegetables", farmerId: "green-valley", price: 180, unit: "2 kg crate", emoji: "🍅", badge: "Just harvested", color: "#f7e8df", location: "Kiambu", practice: "Integrated", stock: 24, photos: ["🍅", "🍅", "🌿"], season: "In season", approved: true },
  { id: "avocados", name: "Hass avocados", description: "Creamy Hass avocados from our Limuru orchard. Picked to order; allow a little time to ripen at home.", category: "Fruits", farmerId: "ndarugu", price: 250, unit: "6 pieces", emoji: "🥑", badge: "Farmer favourite", color: "#e9efdf", location: "Limuru", practice: "Regenerative", stock: 18, photos: ["🥑", "🥑", "🌳"], season: "In season", approved: true },
  { id: "maize", name: "Dry maize", description: "Clean, dry maize sorted and packed in a sturdy 20 kg bag for your pantry.", category: "Grains", farmerId: "mwangaza", price: 1600, unit: "20 kg bag", emoji: "🌽", badge: "Harvest of the week", color: "#f6efd9", location: "Nakuru", practice: "Integrated", stock: 12, photos: ["🌽", "🌽", "🌾"], season: "Available", approved: true },
  { id: "spinach", name: "Baby spinach", description: "Tender young spinach leaves, harvested fresh for greens, salads, and home cooking.", category: "Vegetables", farmerId: "kijani", price: 120, unit: "1 kg bundle", emoji: "🥬", badge: "Picked today", color: "#e3eee4", location: "Thika", practice: "Organic", stock: 30, photos: ["🥬", "🌱", "🥬"], season: "In season", approved: true },
  { id: "bananas", name: "Sweet bananas", description: "Naturally sweet bananas from our mixed-crop farm. Sold by the kilogram.", category: "Fruits", farmerId: "miti-bora", price: 300, unit: "1 kg bunch", emoji: "🍌", badge: "Naturally sweet", color: "#f7efd7", location: "Murang’a", practice: "Regenerative", stock: 16, photos: ["🍌", "🍌", "🌴"], season: "In season", approved: true },
  { id: "beans", name: "Rosecoco beans", description: "Carefully sorted Rosecoco beans from our family harvest, ready for your next meal.", category: "Grains", farmerId: "baraka", price: 420, unit: "2 kg bag", emoji: "🫘", badge: "Small-batch", color: "#f1e7df", location: "Embu", practice: "Integrated", stock: 20, photos: ["🫘", "🌱", "🫘"], season: "Available", approved: true },
  { id: "carrots", name: "Sweet carrots", description: "Sweet, crunchy seasonal carrots, sold in a fresh 1 kg bunch.", category: "Vegetables", farmerId: "upendo", price: 140, unit: "1 kg bunch", emoji: "🥕", badge: "Picked today", color: "#f7e6d9", location: "Naivasha", practice: "Organic", stock: 0, photos: ["🥕", "🥕", "🌱"], season: "Next harvest soon", approved: true },
  { id: "mangoes", name: "Apple mangoes", description: "Seasonal apple mangoes from our sunny orchard. Sweet fruit, packed as a set of four.", category: "Fruits", farmerId: "sunrise", price: 350, unit: "4 pieces", emoji: "🥭", badge: "In season", color: "#f4ead7", location: "Machakos", practice: "Organic", stock: 10, photos: ["🥭", "🥭", "🌳"], season: "In season", approved: true },
  { id: "pumpkin", name: "Golden pumpkin", description: "A firm golden pumpkin from our seasonal vegetable harvest.", category: "Vegetables", farmerId: "upendo", price: 280, unit: "each", emoji: "🎃", badge: "New harvest", color: "#f5e8d8", location: "Naivasha", practice: "Organic", stock: 8, photos: ["🎃", "🌿"], season: "Available", approved: false }
];

const seedProductPhotos = {
  tomatoes: "assets/product-tomatoes.jpg",
  avocados: "assets/product-avocados.jpg",
  maize: "assets/product-maize.jpg",
  spinach: "assets/product-spinach.jpg",
  bananas: "assets/product-bananas.jpg",
  beans: "assets/product-beans.jpg",
  carrots: "assets/product-carrots.jpg",
  mangoes: "assets/product-mangoes.jpg",
  pumpkin: "assets/product-pumpkin.jpg"
};

const seedFarmers = [
  { id: "green-valley", name: "Green Valley Farm", farmer: "Mary Wanjiku", location: "Kiambu", story: "A family-run farm growing vegetables with careful water use and integrated pest management.", practices: "Integrated farming", verified: true, pending: false, emoji: "🌿" },
  { id: "ndarugu", name: "Ndarugu Orchards", farmer: "Peter Kamau", location: "Limuru", story: "Our hillside orchard grows Hass avocados while protecting the soil and encouraging biodiversity.", practices: "Regenerative", verified: true, pending: false, emoji: "🥑" },
  { id: "mwangaza", name: "Mwangaza Farm", farmer: "Esther Chebet", location: "Nakuru", story: "We grow and dry maize in small batches, with a focus on quality and reliable harvests.", practices: "Integrated farming", verified: true, pending: false, emoji: "🌽" },
  { id: "kijani", name: "Kijani Growers", farmer: "David Mwangi", location: "Thika", story: "Fresh greens harvested to order from a small organic market garden.", practices: "Organic", verified: true, pending: false, emoji: "🥬" },
  { id: "miti-bora", name: "Miti Bora Farm", farmer: "Lucy Achieng", location: "Murang’a", story: "Fruit trees and mixed crops help our farm stay productive through the seasons.", practices: "Regenerative", verified: true, pending: false, emoji: "🍌" },
  { id: "baraka", name: "Baraka Family Farm", farmer: "James Mutua", location: "Embu", story: "A family bean farm supplying carefully sorted, small-batch dry goods.", practices: "Integrated farming", verified: true, pending: false, emoji: "🫘" },
  { id: "upendo", name: "Upendo Farm", farmer: "Grace Njeri", location: "Naivasha", story: "We grow seasonal vegetables with compost and thoughtful soil care.", practices: "Organic", verified: false, pending: true, emoji: "🥕" },
  { id: "sunrise", name: "Sunrise Shamba", farmer: "Amina Hassan", location: "Machakos", story: "A sunny orchard producing seasonal fruit for nearby communities.", practices: "Organic", verified: true, pending: false, emoji: "🥭" }
];

const suggestedLocations = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo",
  "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui",
  "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori",
  "Mombasa", "Murang’a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri",
  "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia", "Turkana",
  "Uasin Gishu", "Vihiga", "Wajir", "West Pokot", "Athi River", "Eldoret", "Kitale", "Limuru",
  "Malindi", "Naivasha", "Nanyuki", "Thika"
];
const deliveryFees = { Nairobi: 200, Kiambu: 300, Thika: 350, Limuru: 350, Nakuru: 450, Embu: 450, "Murang’a": 400, Naivasha: 450, Machakos: 400 };
const orderStatuses = ["Received", "Preparing", "On the way", "Delivered"];
const subscriptionPlans = {
  farmer: [
    { id: "starter", name: "Starter", price: 500, features: ["Up to 5 active listings", "Up to 5 enquiries per month", "Basic produce listings"] },
    { id: "standard", name: "Standard", price: 1000, features: ["Up to 25 active listings", "Up to 50 enquiries per month", "Direct farmer connections", "Offer management"] },
    { id: "premium", name: "Premium", price: 2500, features: ["Unlimited listings and enquiries", "Featured listings", "Priority support", "Sales reports", "Offer management", "Delivery coordination tools"] }
  ],
  business: [
    { id: "basic", name: "Basic", price: 2000, features: ["Business profile", "Browse suppliers", "Up to 10 sourcing enquiries per month"] },
    { id: "professional", name: "Professional", price: 3000, features: ["More sourcing enquiries", "Direct farmer connections", "Order management", "Offers"] },
    { id: "enterprise", name: "Enterprise", price: 5000, features: ["Unlimited enquiries", "Multiple team users", "Bulk order tools", "Analytics", "Priority support"] }
  ]
};
const storageKey = "shamba-direct-demo-v2";

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!saved || typeof saved !== "object") return {};
    return saved;
  } catch (error) {
    console.error("Could not read Shamba Direct demo data.", error);
    return {};
  }
}

async function uploadLivePhoto(file, purpose, maxDimension) {
  const dataUrl = await prepareUploadedPhoto(file, maxDimension);
  const blob = await (await fetch(dataUrl)).blob();
  const signed = await apiRequest("/uploads", {
    method: "POST",
    body: JSON.stringify({ purpose, contentType: blob.type, size: blob.size })
  });
  const response = await fetch(signed.uploadUrl, {
    method: "PUT",
    headers: signed.headers,
    body: blob
  });
  if (!response.ok) throw new Error("The photo could not be uploaded. Check the storage bucket CORS settings and try again.");
  return signed.imageUrl;
}

const liveOnly = window.SHAMBA_LIVE_ONLY === true;
const savedState = liveOnly ? {} : readSavedState();
const state = {
  products: Array.isArray(savedState.products) ? savedState.products : liveOnly ? [] : seedProducts.map((product) => ({ ...product })),
  farmers: Array.isArray(savedState.farmers) ? savedState.farmers : liveOnly ? [] : seedFarmers.map((farmer) => ({ ...farmer })),
  cart: new Map(Array.isArray(savedState.cart) ? savedState.cart : []),
  orders: Array.isArray(savedState.orders) ? savedState.orders : [],
  addresses: Array.isArray(savedState.addresses) ? savedState.addresses : [],
  favorites: new Set(Array.isArray(savedState.favorites) ? savedState.favorites : []),
  reviews: Array.isArray(savedState.reviews) ? savedState.reviews : [],
  notifications: Array.isArray(savedState.notifications) ? savedState.notifications : [],
  reports: Array.isArray(savedState.reports) ? savedState.reports : [],
  buyerProfile: savedState.buyerProfile && typeof savedState.buyerProfile === "object" ? savedState.buyerProfile : null,
  messages: Array.isArray(savedState.messages) ? savedState.messages : [],
  bulkRequests: Array.isArray(savedState.bulkRequests) ? savedState.bulkRequests : [],
  subscriptions: savedState.subscriptions && typeof savedState.subscriptions === "object"
    ? savedState.subscriptions
    : { farmers: {}, business: "basic" },
  activeFarmerId: savedState.activeFarmerId || "green-valley",
  deliveryArea: savedState.deliveryArea || "Nairobi",
  language: savedState.language === "sw" ? "sw" : "en",
  largeText: savedState.largeText === true,
  apiAvailable: false,
  csrfToken: "",
  currentUser: null,
  paymentMethods: [],
  currentSubscription: null,
  livePlanCatalog: null,
  authResetToken: new URLSearchParams(location.search).get("reset") || "",
  adminQueue: { farmers: [], products: [] },
  authMode: "login",
  category: "All produce",
  search: "",
  sort: "recommended"
};

const $ = (selector, root = document) => root.querySelector(selector);
function getProductPhoto(product) {
  return product.photoData || seedProductPhotos[product.id] || "";
}
function getSellingPrice(product) {
  const discount = Number(product.offerPercent) || 0;
  return Math.max(1, Math.round(product.price * (100 - discount) / 100));
}
function getFarmerPlan(farmerId) {
  return state.subscriptions.farmers[farmerId] || "starter";
}
function getFarmerPlanLimits(farmerId) {
  const plan = getFarmerPlan(farmerId);
  return plan === "premium" ? { listings: Infinity, enquiries: Infinity } :
    plan === "standard" ? { listings: 25, enquiries: 50 } :
      { listings: 5, enquiries: 5 };
}
function getCurrentMonthCount(entries) {
  const now = new Date();
  return entries.filter((entry) => {
    const date = new Date(entry.createdAt);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
}
const productGrid = $("#product-grid");
const categoryList = $("#category-list");
const searchForm = $("#search-form");
const searchInput = $("#search-input");
const sortSelect = $("#sort-select");
const emptyState = $("#empty-state");
const cartDrawer = $("#cart-drawer");
const cartBackdrop = $("#drawer-backdrop");
const toast = $("#toast");
const dialog = $("#app-dialog");
let toastTimer;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatPrice(amount) {
  return `KSh ${Number(amount).toLocaleString("en-KE")}`;
}

const apiBase = window.SHAMBA_API_BASE || "/api";

async function apiRequest(route, options = {}) {
  const method = options.method || "GET";
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    if (!state.csrfToken) {
      const csrfResponse = await fetch(`${apiBase}/csrf`, { credentials: "include" });
      if (!csrfResponse.ok) throw new Error("Could not start a secure session.");
      state.csrfToken = (await csrfResponse.json()).csrfToken;
    }
    headers["X-CSRF-Token"] = state.csrfToken;
  }
  const response = await fetch(`${apiBase}${route}`, { ...options, method, headers, credentials: "include" });
  if (response.status === 204) return null;
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "The server could not complete that request.");
  return result;
}

async function connectLiveBackend() {
  state.apiAvailable = false;
  $("#backend-status").textContent = liveOnly ? "Connecting to marketplace…" : "Browser demo";
  $("#backend-status").classList.remove("backend-online");
  try {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("verify")) {
      const verified = await apiRequest(`/auth/verify?token=${encodeURIComponent(urlParams.get("verify"))}`);
      state.currentUser = verified.user;
      state.authResetToken = "";
      urlParams.delete("verify");
      const query = urlParams.toString();
      history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
      showToast("Your email is verified.");
    }
    await apiRequest("/health");
    const [csrf, identity, products, farmers, methods] = await Promise.all([
      apiRequest("/csrf"),
      apiRequest("/auth/me"),
      apiRequest("/products"),
      apiRequest("/farmers"),
      apiRequest("/payments/methods")
    ]);
    state.csrfToken = csrf.csrfToken;
    state.currentUser = identity.user;
    state.paymentMethods = methods.methods;
    const paymentResult = new URLSearchParams(location.search);
    if (paymentResult.get("payment") === "cancelled" && paymentResult.get("order") && state.currentUser) {
      try {
        await apiRequest(`/payments/${encodeURIComponent(paymentResult.get("order"))}/cancel`, { method: "POST" });
      } catch (error) {
        showToast(`Could not update the cancelled payment: ${error.message}`);
      }
      paymentResult.delete("payment");
      paymentResult.delete("order");
      const cleanSearch = paymentResult.toString();
      history.replaceState(null, "", `${location.pathname}${cleanSearch ? `?${cleanSearch}` : ""}${location.hash}`);
    }
    state.products = products.products.map((product) => ({
      ...product,
      farmerId: product.farmerId,
      photoData: product.imageUrl || "",
      badge: "Farmer listing",
      color: "#e9efdf",
      season: "Available",
      approved: product.status === "active"
    }));
    state.farmers = farmers.farmers.map((farmer) => ({
      ...farmer,
      practices: farmer.practices || "Not specified",
      verified: farmer.verified,
      pending: !farmer.verified
    }));
    if (state.currentUser?.role === "farmer") {
      const [profile, ownProducts] = await Promise.all([
        apiRequest("/farmers/me"),
        apiRequest("/farmers/me/products")
      ]);
      const farmer = {
        id: state.currentUser.id,
        ...profile.profile,
        name: profile.profile?.farmName || state.currentUser.name,
        farmer: profile.profile?.farmerName || state.currentUser.name,
        location: profile.profile?.location || "",
        story: profile.profile?.story || "",
        practices: profile.profile?.practices || "",
        profilePhoto: profile.profile?.profilePhotoUrl || "",
        coverPhoto: profile.profile?.coverPhotoUrl || "",
        verified: profile.profile?.verified || false,
        pending: !profile.profile?.verified
      };
      state.farmers = [farmer, ...state.farmers.filter((entry) => entry.id !== farmer.id)];
      const knownIds = new Set(state.products.map((product) => product.id));
      ownProducts.products.forEach((product) => {
        if (knownIds.has(product.id)) return;
        state.products.push({ ...product, farmerId: farmer.id, photoData: product.imageUrl || "", badge: "Your listing", color: "#e9efdf", season: "Available", approved: product.status === "active" });
      });
      state.activeFarmerId = farmer.id;
    }
    const orders = await apiRequest("/orders").catch((error) => {
      if (error.message.includes("Sign in")) return { orders: [] };
      throw error;
    });
    state.orders = orders.orders.map(mapApiOrder);
    state.adminQueue = state.currentUser?.role === "admin"
      ? await apiRequest("/admin/review")
      : { farmers: [], products: [] };
    if (state.currentUser && ["farmer", "business"].includes(state.currentUser.role)) {
      const subscription = await apiRequest("/subscriptions/me");
      state.currentSubscription = subscription.subscription;
      state.livePlanCatalog = { type: subscription.accountType, plans: subscription.plans };
    } else {
      state.currentSubscription = null;
      state.livePlanCatalog = null;
    }
    state.apiAvailable = true;
    $("#backend-status").textContent = "Live marketplace";
    $("#backend-status").classList.add("backend-online");
    $("#account-toggle").textContent = state.currentUser ? state.currentUser.name : "Sign in";
    renderAll();
    if (state.authResetToken) {
      state.authMode = "reset-complete";
      showAccountDialog();
    }
  } catch (error) {
    console.info("Shamba Direct backend is not connected; browser demo mode remains active.", error);
    $("#backend-status").textContent = liveOnly ? "Marketplace unavailable" : "Browser demo";
    $("#backend-status").classList.remove("backend-online");
    if (liveOnly) {
      state.products = [];
      state.farmers = [];
      state.orders = [];
      state.currentUser = null;
      state.currentSubscription = null;
      state.paymentMethods = [];
      renderAll();
    }
    if (state.authResetToken) {
      state.authMode = "reset-complete";
      showAccountDialog();
    }
  }
}

function mapApiOrder(order) {
  const statusLabels = { received: "Received", preparing: "Preparing", on_the_way: "On the way", delivered: "Delivered", cancelled: "Cancelled" };
  return {
    ...order,
    createdAt: order.createdAt || order.created_at,
    total: Number(order.total ?? order.total_kes),
    subtotal: Number(order.subtotal ?? order.subtotal_kes),
    deliveryFee: Number(order.deliveryFee ?? order.delivery_fee_kes),
    area: order.area || order.delivery_area,
    deliveryDate: order.deliveryDate || order.delivery_date,
    deliveryTime: order.deliveryTime || order.delivery_time || "Any time",
    paymentPreference: order.paymentMethod || order.payment_method,
    paymentStatus: order.paymentStatus || order.payment_status,
    status: statusLabels[order.status] || order.status,
    items: Array.isArray(order.items) ? order.items : []
  };
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      products: state.products,
      farmers: state.farmers,
      cart: [...state.cart.entries()],
      orders: state.orders,
      addresses: state.addresses,
      favorites: [...state.favorites],
      reviews: state.reviews,
      notifications: state.notifications,
      reports: state.reports,
      buyerProfile: state.buyerProfile,
      messages: state.messages,
      bulkRequests: state.bulkRequests,
      subscriptions: state.subscriptions,
      activeFarmerId: state.activeFarmerId,
      deliveryArea: state.deliveryArea,
      language: state.language,
      largeText: state.largeText
    }));
    return true;
  } catch (error) {
    console.error("Could not save Shamba Direct demo data.", error);
    showToast("Could not save changes in this browser.");
    return false;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function getFarmer(id) {
  return state.farmers.find((farmer) => farmer.id === id);
}

function getProduct(id) {
  return state.products.find((product) => product.id === id);
}

function openDialog(title, eyebrow, html) {
  $("#dialog-title").textContent = title;
  $("#dialog-eyebrow").textContent = eyebrow;
  $("#dialog-content").innerHTML = html;
  dialog.showModal();
}

function renderCategories() {
  const categories = ["All produce", ...new Set(state.products
    .filter((product) => product.approved && getFarmer(product.farmerId)?.verified && !getFarmer(product.farmerId)?.pending)
    .map((product) => product.category)
    .filter(Boolean))];
  if (!categories.includes(state.category)) state.category = "All produce";
  categoryList.innerHTML = categories.map((category) => {
    const selected = state.category === category;
    return `<button class="category-button${selected ? " selected" : ""}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${selected}">${escapeHtml(category)}</button>`;
  }).join("");
}

function renderFilterLocations() {
  const select = $("#location-filter");
  const current = select.value;
  const locations = [...new Set([...suggestedLocations, ...state.products.filter((product) => product.approved && getFarmer(product.farmerId)?.verified).map((product) => product.location)])].sort();
  select.innerHTML = `<option value="">All locations</option>${locations.map((location) => `<option value="${escapeHtml(location)}">${escapeHtml(location)}</option>`).join("")}`;
  if (locations.includes(current)) select.value = current;
}

function getVisibleProducts() {
  const query = state.search.trim().toLocaleLowerCase();
  const maxPrice = Number($("#price-filter").value);
  const location = $("#location-filter").value;
  const practice = $("#practice-filter").value;
  const visible = state.products.filter((product) => {
    const farmer = getFarmer(product.farmerId);
    const searchable = `${product.name} ${product.category} ${farmer?.name || ""} ${product.location}`.toLocaleLowerCase();
    return product.approved && farmer?.verified && !farmer.pending &&
      (state.category === "All produce" || product.category === state.category) &&
      (!query || searchable.includes(query)) &&
      getSellingPrice(product) <= maxPrice &&
      (!location || product.location === location) &&
      (!practice || product.practice === practice) &&
      (!$("#stock-filter").checked || product.stock > 0);
  });
  if (state.sort === "price-low") visible.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") visible.sort((a, b) => b.price - a.price);
  return visible;
}

function renderProducts() {
  const visible = getVisibleProducts();
  $("#results-count").textContent = `${visible.length} ${visible.length === 1 ? "harvest" : "harvests"} to explore`;
  $("#price-value").textContent = Number($("#price-filter").value) >= 2000 ? "Any" : `≤ ${formatPrice(Number($("#price-filter").value))}`;
  emptyState.hidden = visible.length > 0;
  productGrid.hidden = visible.length === 0;
  productGrid.innerHTML = visible.map((product) => {
    const farmer = getFarmer(product.farmerId);
    const favorite = state.favorites.has(product.id);
    const photo = getProductPhoto(product);
    const stockText = product.stock > 0 ? `${product.stock} available` : "Next harvest soon";
    return `
      <article class="product-card">
        <button class="product-visual" type="button" data-gallery="${escapeHtml(product.id)}" style="--visual-bg:${escapeHtml(product.color)}" aria-label="View ${escapeHtml(product.name)} photos">
          <span class="product-badge">${escapeHtml(product.badge)}</span>${photo ? `<img class="product-photo" src="${escapeHtml(photo)}" alt="${product.photoData ? `Farmer-uploaded photo of ${escapeHtml(product.name)}` : `Sample photo of ${escapeHtml(product.name)}`}" loading="lazy"><span class="product-photo-label">${product.photoData ? "Farmer photo" : "Sample photo"}</span>` : `<span class="product-photo-missing">Real product photo not added</span>`}
          <span class="gallery-hint">View gallery</span>
        </button>
        <div class="product-content">
          <div class="product-overline"><p class="product-category">${escapeHtml(product.category)}</p><button class="favorite-button${favorite ? " favorited" : ""}" type="button" data-favorite="${escapeHtml(product.id)}" aria-label="${favorite ? "Remove from" : "Add to"} saved items">${favorite ? "♥" : "♡"}</button></div>
          <h3 class="product-title"><button class="plain-link" type="button" data-product="${escapeHtml(product.id)}">${escapeHtml(product.name)}</button></h3>
          <p class="product-description">${escapeHtml(product.description || "Fresh produce, grown and prepared by your local farmer.")}</p>
          <p class="product-farm"><button class="plain-link" type="button" data-farmer="${escapeHtml(product.farmerId)}">${escapeHtml(farmer?.name || "Local farm")}</button> · ${escapeHtml(product.location)}</p>
          <p class="stock-line${product.stock === 0 ? " out-of-stock" : ""}">${escapeHtml(stockText)} · ${escapeHtml(product.season)}</p>
          <div class="product-bottom">
            <p class="product-price">${formatPrice(getSellingPrice(product))}${product.offerPercent ? `<del>${formatPrice(product.price)}</del>` : ""}<span class="product-unit">per ${escapeHtml(product.unit)}</span></p>
            <button class="add-button" type="button" data-add="${escapeHtml(product.id)}" aria-label="Add ${escapeHtml(product.name)} to basket" ${product.stock <= 0 ? "disabled" : ""}>+</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

function getCartTotals() {
  return [...state.cart.entries()].reduce((totals, [id, quantity]) => {
    const product = getProduct(id);
    if (!product) return totals;
    totals.count += quantity;
    totals.subtotal += getSellingPrice(product) * quantity;
    return totals;
  }, { count: 0, subtotal: 0 });
}

function renderCart() {
  const items = [...state.cart.entries()].filter(([id]) => getProduct(id));
  const totals = getCartTotals();
  $("#cart-count").textContent = totals.count;
  $("#cart-total").textContent = formatPrice(totals.subtotal);
  $("#cart-empty").hidden = items.length > 0;
  $("#cart-items").hidden = items.length === 0;
  $("#checkout-button").disabled = items.length === 0;
  $("#cart-items").innerHTML = items.map(([id, quantity]) => {
    const product = getProduct(id);
    const photo = getProductPhoto(product);
    return `<div class="cart-item">${photo ? `<img class="cart-item-photo" src="${escapeHtml(photo)}" alt="">` : `<span class="cart-item-photo-missing" aria-hidden="true"></span>`}<div><p class="cart-item-name">${escapeHtml(product.name)}</p><p class="cart-item-meta">${formatPrice(getSellingPrice(product))} · ${escapeHtml(product.unit)}</p><div class="quantity-control" aria-label="Quantity for ${escapeHtml(product.name)}"><button type="button" data-quantity="${escapeHtml(id)}" data-change="-1" aria-label="Remove one">−</button><span>${quantity}</span><button type="button" data-quantity="${escapeHtml(id)}" data-change="1" aria-label="Add one">+</button></div></div><span class="cart-item-price">${formatPrice(getSellingPrice(product) * quantity)}</span></div>`;
  }).join("");
}

function setCartOpen(open) {
  cartDrawer.classList.toggle("open", open);
  cartDrawer.setAttribute("aria-hidden", String(!open));
  cartBackdrop.hidden = !open;
  requestAnimationFrame(() => cartBackdrop.classList.toggle("visible", open));
  document.body.classList.toggle("drawer-open", open);
  if (open) $("#cart-close").focus();
}

function getRating(productId) {
  const ratings = state.reviews.filter((review) => review.productId === productId);
  if (!ratings.length) return "No reviews yet";
  const average = ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length;
  return `${average.toFixed(1)} ★ (${ratings.length} ${ratings.length === 1 ? "review" : "reviews"})`;
}

function showProduct(productId, reviewOrderId = "") {
  const product = getProduct(productId);
  if (!product) return;
  const farmer = getFarmer(product.farmerId);
  const photo = getProductPhoto(product);
  const related = state.products.filter((entry) => entry.approved && entry.id !== product.id && (entry.category === product.category || entry.farmerId === product.farmerId)).slice(0, 3);
  const reviews = state.reviews.filter((review) => review.productId === product.id);
  const reviewOrder = state.orders.find((order) => order.id === reviewOrderId && order.status === "Delivered" && order.items.some((item) => item.productId === product.id));
  const alreadyReviewed = reviewOrder && state.reviews.some((review) => review.orderId === reviewOrder.id && review.productId === product.id);
  openDialog(product.name, "Harvest details", `
    <div class="detail-hero" style="--visual-bg:${escapeHtml(product.color)}">${photo ? `<img src="${escapeHtml(photo)}" alt="${product.photoData ? `Farmer-uploaded photo of ${escapeHtml(product.name)}` : `Sample photo of ${escapeHtml(product.name)}`}">` : `<div class="product-photo-missing">Real product photo not added</div>`}<p>${product.photoData ? "Photo uploaded by the farmer." : photo ? "Sample produce photo; replace with a photo from this farm." : "A real product photo has not been added yet."}</p></div>
    <div class="detail-meta"><span>${escapeHtml(product.category)}</span><span>${escapeHtml(product.practice)}</span><span>${escapeHtml(product.location)}</span></div>
    <p><strong>${formatPrice(getSellingPrice(product))}</strong>${product.offerPercent ? ` <del>${formatPrice(product.price)}</del>` : ""} per ${escapeHtml(product.unit)} · ${product.stock > 0 ? `${product.stock} available` : "Currently out of stock"}</p>
    <p class="listing-description">${escapeHtml(product.description || "Fresh produce from the farm.")}</p>
    <p>Harvest: ${escapeHtml(product.season)}. Grown by <button class="inline-action" type="button" data-farmer="${escapeHtml(product.farmerId)}">${escapeHtml(farmer?.name || "local farmer")}</button>.</p>
    ${!liveOnly ? `<p class="rating-line">${escapeHtml(getRating(product.id))}</p>` : ""}
    <div class="related-products"><h3>Related harvests</h3>${related.length ? related.map((entry) => `<button class="related-chip" type="button" data-product="${escapeHtml(entry.id)}">${escapeHtml(entry.name)} · ${formatPrice(getSellingPrice(entry))}</button>`).join("") : "<p>More related produce coming soon.</p>"}</div>
    ${!liveOnly ? `<div class="review-list"><h3>Buyer reviews</h3>${reviews.length ? reviews.map((review) => `<p class="review-entry"><strong>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</strong> ${escapeHtml(review.text)}</p>`).join("") : "<p>No reviews yet. Be the first after placing an order.</p>"}</div>` : ""}
    ${!liveOnly && reviewOrder ? alreadyReviewed ? `<p class="demo-banner">You have already reviewed this item for order ${escapeHtml(reviewOrder.id)}.</p>` : `<form class="review-form" data-review="${escapeHtml(product.id)}" data-order-id="${escapeHtml(reviewOrder.id)}"><h3>Review your delivered order</h3><label>Rating<select name="rating" required><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label><label>Your review<textarea name="text" rows="2" maxlength="240" required placeholder="Share your experience"></textarea></label><button class="button button-outline" type="submit">Save verified demo review</button></form>` : !liveOnly ? `<p class="muted-note">Reviews are available after a demo order is marked delivered.</p>` : ""}
  `);
}

function showGallery(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const photo = getProductPhoto(product);
  const caption = product.photoData ? "Photo uploaded by the farmer. It is not AI-generated." : "Sample produce photo; replace it with a photo from this farm.";
  openDialog(product.name, product.photoData ? "Farmer-uploaded product photo" : "Sample produce photo", `${photo ? `<div class="gallery-stage photo-stage"><img src="${escapeHtml(photo)}" alt="${product.photoData ? `Farmer-uploaded photo of ${escapeHtml(product.name)}` : `Sample photo of ${escapeHtml(product.name)}`}"></div>` : `<div class="gallery-stage"><span class="product-photo-missing">Real product photo not added</span></div>`}<p class="muted-note">${caption}</p>`);
}

function showFarmer(farmerId) {
  const farmer = getFarmer(farmerId);
  if (!farmer) return;
  const listings = state.products.filter((product) => product.farmerId === farmer.id && product.approved);
  const messages = liveOnly ? [] : state.messages.filter((message) => message.farmerId === farmer.id);
  openDialog(farmer.name, "Meet the farmer", `${farmer.coverPhoto ? `<img class="farmer-cover-photo" src="${escapeHtml(farmer.coverPhoto)}" alt="Real photo of ${escapeHtml(farmer.farmer)} working with crops">` : `<div class="farmer-cover-empty">A farm photo will be added by this farmer.</div>`}<div class="farmer-profile-hero">${farmer.profilePhoto ? `<img src="${escapeHtml(farmer.profilePhoto)}" alt="Photo of ${escapeHtml(farmer.farmer)}">` : `<span>${escapeHtml(farmer.emoji || "🌱")}</span>`}<div><strong>${escapeHtml(farmer.farmer)}</strong><p>${escapeHtml(farmer.location)} · ${liveOnly ? "Farmer profile" : farmer.verified ? "Sample profile reviewed" : "Profile awaiting sample review"}</p></div></div><p>${escapeHtml(farmer.story)}</p><p><strong>Growing practices:</strong> ${escapeHtml(farmer.practices)}</p>${!liveOnly ? `<button class="button button-outline" type="button" data-message-farmer="${escapeHtml(farmer.id)}">Message this farmer (demo)</button>` : ""}<div class="related-products"><h3>Available from this farm</h3>${listings.length ? listings.map((product) => `<button class="related-chip" type="button" data-product="${escapeHtml(product.id)}">${escapeHtml(product.name)} · ${formatPrice(getSellingPrice(product))}</button>`).join("") : "<p>No current listings.</p>"}</div>${messages.length ? `<div class="message-history"><h3>Saved local messages</h3>${messages.slice(-3).map((message) => `<p><strong>${escapeHtml(message.from)}:</strong> ${escapeHtml(message.text)}</p>`).join("")}</div>` : ""}`);
}

function showAccountDialog() {
  if (liveOnly && !state.apiAvailable) {
    openDialog("Marketplace unavailable", "Secure account service not connected", `<p>The live service is temporarily unavailable. Please try again later.</p>`);
    return;
  }
  if (state.apiAvailable) {
    if (state.currentUser) {
      openDialog("Your account", "Secure shared account", `
        <p><strong>${escapeHtml(state.currentUser.name)}</strong><br>${escapeHtml(state.currentUser.email)} · ${escapeHtml(state.currentUser.role)}</p>
        <p class="muted-note">Your account is stored in the shared marketplace database. Passwords are never stored in this browser.</p>
        <button class="button button-outline" id="sign-out-button" type="button">Sign out</button>
      `);
      return;
    }
    const registering = state.authMode === "register";
    const resetting = state.authMode === "reset-request" || state.authMode === "reset-complete" || state.authMode === "resend-verification";
    if (state.authMode === "reset-complete") {
      openDialog("Choose a new password", "Secure password recovery", `
        <form id="auth-reset-complete-form" class="checkout-form">
          <label>New password<input name="password" type="password" minlength="12" maxlength="128" autocomplete="new-password" required></label>
          <button class="button button-dark" type="submit">Reset password</button>
        </form>
      `);
      return;
    }
    if (resetting) {
      const verifyingEmail = state.authMode === "resend-verification";
      openDialog(verifyingEmail ? "Resend verification email" : "Reset your password", "Secure account recovery", `
        <p>${verifyingEmail ? "We’ll send a verification link if this account needs one." : "We’ll email a single-use password reset link if a verified account matches."}</p>
        <form id="auth-reset-request-form" class="checkout-form">
          <label>Email<input name="email" type="email" maxlength="254" autocomplete="email" required></label>
          <button class="button button-dark" type="submit">${verifyingEmail ? "Send verification email" : "Send reset link"}</button>
        </form>
        <button class="text-button" type="button" data-auth-mode="login">Return to sign in</button>
      `);
      return;
    }
    openDialog(registering ? "Create your account" : "Sign in", "Shamba Direct shared marketplace", `
      ${registering ? `<p class="muted-note">Use a unique password with at least 12 characters. Verify your email before signing in.</p>` : ""}
      <form id="auth-form" class="checkout-form">
        ${registering ? `<label id="registration-name-label">Your name or business contact<input name="name" maxlength="80" autocomplete="name" required></label>
          <label>Account type<select name="role" id="auth-role"><option value="buyer">Buyer</option><option value="farmer">Farmer</option><option value="business">Miller / bulk buyer</option></select></label>
          <div id="farmer-registration-fields" hidden>
            <label>Farm / business name<input name="farmName" maxlength="80"></label>
            <label>Farm location / operating area<input name="location" maxlength="100"></label>
          </div>` : ""}
        <label>Email<input name="email" type="email" maxlength="254" autocomplete="email" required></label>
        <label>Password<input name="password" type="password" minlength="${registering ? "12" : "1"}" maxlength="128" autocomplete="${registering ? "new-password" : "current-password"}" required></label>
        <button class="button button-dark" type="submit">${registering ? "Create account" : "Sign in"}</button>
      </form>
      <div class="auth-links">
        <button class="text-button" type="button" data-auth-mode="${registering ? "login" : "register"}">${registering ? "Already registered? Sign in" : "New to Shamba Direct? Create an account"}</button>
        ${registering ? "" : `<button class="text-button" type="button" data-auth-mode="reset-request">Forgot password?</button><button class="text-button" type="button" data-auth-mode="resend-verification">Resend verification email</button>`}
      </div>
    `);
    return;
  }
  const profile = state.buyerProfile || {};
  openDialog("Buyer account", "Local demo profile · no password or online account", `
    <p class="demo-banner">This prototype does not have secure sign-in or shared accounts. This profile stays in this browser only. Do not enter a password.</p>
    <form id="buyer-profile-form" class="checkout-form">
      <label>Your name<input name="name" maxlength="80" autocomplete="name" value="${escapeHtml(profile.name || "")}" required></label>
      <label>Email (optional)<input name="email" type="email" maxlength="120" autocomplete="email" value="${escapeHtml(profile.email || "")}"></label>
      <button class="button button-dark" type="submit">Save local profile</button>
    </form>
    ${profile.name ? `<button class="button button-outline" id="clear-buyer-profile" type="button">Remove local profile</button>` : ""}
    <p class="muted-note">Sign in is unavailable until the live account service is connected.</p>
  `);
}

function showFarmerMessageForm(farmerId) {
  const farmer = getFarmer(farmerId);
  if (!farmer) return;
  openDialog(`Message ${farmer.name}`, "Demo messaging · saved on this device only", `
    <p class="demo-banner">Messages are stored locally for this prototype. The farmer will not receive this message.</p>
    <form id="farmer-message-form" class="checkout-form" data-farmer-id="${escapeHtml(farmer.id)}">
      <label>Your name<input name="from" maxlength="80" value="${escapeHtml(state.buyerProfile?.name || "")}" required></label>
      <label>Message<textarea name="text" rows="4" maxlength="500" required placeholder="Ask about harvest, pickup, or product details"></textarea></label>
      <button class="button button-dark" type="submit">Save message locally</button>
    </form>
    ${state.messages.filter((message) => message.farmerId === farmer.id).slice(-5).map((message) => `<article class="message-entry"><strong>${escapeHtml(message.from)}</strong><small>${escapeHtml(new Date(message.createdAt).toLocaleString())}</small><p>${escapeHtml(message.text)}</p></article>`).join("")}
  `);
}

function downloadTextFile(filename, content, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadOrderReceipt(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId);
  if (!order) return showToast("Order not found.");
  const lines = [
    liveOnly ? "SHAMBA DIRECT — ORDER SUMMARY" : "SHAMBA DIRECT — DEMO RECEIPT",
    `Order: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    `Status: ${order.status}`,
    `Fulfillment: ${order.fulfillment === "pickup" ? "Farm pickup" : "Delivery"}`,
    `Location: ${order.area}`,
    `Scheduled: ${order.deliveryDate || "To be arranged"} · ${order.deliveryTime}`,
    "",
    ...order.items.map((item) => `${item.name} × ${item.quantity} @ ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`),
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Delivery: ${formatPrice(order.deliveryFee)}`,
    `Total: ${formatPrice(order.total)}`,
    `Payment method: ${order.paymentPreference || order.paymentMethod || "Not specified"}`,
    `Payment status: ${order.paymentStatus || "demo only"}`,
    "",
    liveOnly ? "Order summary; not a tax invoice." : "Demo receipt only. No payment or delivery has been processed."
  ];
  downloadTextFile(`${order.id}-receipt.txt`, lines.join("\r\n"));
}

function downloadSalesReport() {
  const rows = [["Order ID", "Date", "Farmer", "Product", "Quantity", "Unit price KSh", "Line total KSh", "Status"]];
  state.orders.forEach((order) => order.items.forEach((item) => {
    const farmer = getFarmer(item.farmerId);
    rows.push([order.id, new Date(order.createdAt).toISOString(), farmer?.name || "", item.name, String(item.quantity), String(item.price), String(item.quantity * item.price), order.status]);
  }));
  if (rows.length === 1) return showToast("No saved demo orders to include yet.");
  const csv = rows.map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  downloadTextFile("shamba-direct-demo-sales.csv", csv, "text/csv;charset=utf-8");
}

function notify(message) {
  state.notifications.unshift({ id: crypto.randomUUID(), message, date: new Date().toISOString(), read: false });
  state.notifications = state.notifications.slice(0, 30);
  persist();
}

function renderFarmers() {
  const activeFarmers = state.farmers.filter((farmer) => farmer.verified && !farmer.pending);
  $("#farmer-grid").innerHTML = activeFarmers.map((farmer) => {
    const count = state.products.filter((product) => product.farmerId === farmer.id && product.approved).length;
    return `<button class="farmer-card" type="button" data-farmer="${escapeHtml(farmer.id)}">${farmer.coverPhoto ? `<img class="farmer-card-cover" src="${escapeHtml(farmer.coverPhoto)}" alt="Real farm photo from ${escapeHtml(farmer.name)}" loading="lazy">` : `<span class="farmer-cover-empty card-cover-empty">${liveOnly ? "Farm photo not added" : "Add a real farm photo"}</span>`}<span class="farmer-card-identity">${farmer.profilePhoto ? `<img class="farmer-card-photo" src="${escapeHtml(farmer.profilePhoto)}" alt="">` : `<span class="farmer-avatar">${escapeHtml(farmer.emoji || "🌱")}</span>`}<span><span class="farmer-card-name">${escapeHtml(farmer.name)} ${liveOnly ? "" : `<span class="verified-badge" title="Sample profile reviewed">✓</span>`}</span><span class="farmer-card-meta">${escapeHtml(farmer.location)} · ${count} listings</span></span></span><span class="farmer-card-story">${escapeHtml(farmer.story)}</span><span class="farmer-card-link">Meet the farmer →</span></button>`;
  }).join("");
}

function renderOrders() {
  const orderList = $("#order-list");
  if (!state.orders.length) {
    orderList.innerHTML = `<div class="empty-panel"><span>📦</span><h3>No orders yet</h3><p>${liveOnly ? "Your order history and tracking will appear here after checkout." : "Your demo order history and tracking will appear here after checkout."}</p><a class="button button-outline" href="#market">Explore produce</a></div>`;
  } else {
    orderList.innerHTML = [...state.orders].reverse().map((order) => {
      const progress = orderStatuses.indexOf(order.status);
      const paymentStatus = order.paymentStatus ? order.paymentStatus.replaceAll("_", " ") : "";
      const paymentAction = state.apiAvailable && order.paymentMethod === "mpesa" && order.paymentStatus === "pending"
        ? `<button class="button button-outline" type="button" data-check-payment="${escapeHtml(order.id)}">Check M-Pesa payment</button>`
        : "";
      const nextStatus = { Received: "preparing", Preparing: "on_the_way", "On the way": "delivered" }[order.status];
      const fulfillmentAction = liveOnly && state.currentUser?.role === "farmer" && nextStatus
        && (order.paymentStatus === "paid" || order.paymentMethod === "cash_on_delivery")
        ? `<button class="button button-outline" type="button" data-live-status="${escapeHtml(order.id)}" data-next-status="${nextStatus}">Mark ${nextStatus.replaceAll("_", " ")}</button>`
        : "";
      return `<article class="order-card"><div class="order-heading"><div><p class="eyebrow">Order ${escapeHtml(order.id)}</p><h3>${escapeHtml(new Date(order.createdAt).toLocaleDateString())} · ${formatPrice(order.total)}</h3></div><span class="status-pill">${escapeHtml(order.status)}</span></div>${paymentStatus ? `<p class="order-meta">Payment: ${escapeHtml(paymentStatus)} · ${escapeHtml(order.paymentMethod || "")}</p>` : ""}<p class="order-meta">${order.items.map((item) => `${escapeHtml(item.name)} × ${item.quantity}`).join(" · ")}</p><p class="order-meta">${order.fulfillment === "pickup" ? "Farm pickup" : "Delivery"} · ${escapeHtml(order.area)} · ${escapeHtml(order.deliveryDate || "Date to be arranged")} · ${escapeHtml(order.deliveryTime)}</p><div class="order-progress">${orderStatuses.map((status, index) => `<span class="${index <= progress ? "complete" : ""}">${escapeHtml(status)}</span>`).join("")}</div><div class="order-actions">${paymentAction}${fulfillmentAction}<button class="button button-outline" type="button" data-track="${escapeHtml(order.id)}">${state.apiAvailable ? "Refresh order" : "Refresh demo tracking"}</button><button class="button button-outline" type="button" data-receipt="${escapeHtml(order.id)}">Download receipt</button>${!liveOnly ? `<button class="button button-outline" type="button" data-reorder="${escapeHtml(order.id)}">Reorder items</button><button class="button button-outline" type="button" data-order-review="${escapeHtml(order.id)}">Review items</button>` : ""}${!state.apiAvailable && order.status !== "Delivered" ? `<button class="button button-outline" type="button" data-advance="${escapeHtml(order.id)}">Advance demo status</button>` : ""}</div></article>`;
    }).join("");
  }

  const supportOrder = $("#support-order");
  supportOrder.innerHTML = `<option value="">Choose an order</option>${state.orders.map((order) => `<option value="${escapeHtml(order.id)}">${escapeHtml(order.id)} · ${formatPrice(order.total)}</option>`).join("")}`;
  $("#saved-address-list").innerHTML = state.addresses.length ? state.addresses.map((address, index) => `<div class="saved-address"><span>⌖ ${escapeHtml(address.street)}, ${escapeHtml(address.area)}</span><button class="text-button" type="button" data-remove-address="${index}">Remove</button></div>`).join("") : `<p class="muted-note">No saved addresses yet. Save one at checkout.</p>`;
}

function renderFarmerDashboard() {
  const farmer = getFarmer(state.activeFarmerId) || state.farmers.find((entry) => entry.verified && !entry.pending) || state.farmers[0];
  if (!farmer) {
    $("#farmer-dashboard").innerHTML = `<div class="empty-panel"><h3>${liveOnly ? "Sign in with a farmer account" : "No farmer profile selected"}</h3><p>${liveOnly ? "Create a farmer account or sign in to manage live listings and your profile." : "Farmer tools will appear once a farmer profile exists."}</p></div>`;
    return;
  }
  const listings = state.products.filter((product) => product.farmerId === farmer.id);
  const sales = state.orders.filter((order) => !liveOnly || order.paymentStatus === "paid")
    .flatMap((order) => order.items).filter((item) => item.farmerId === farmer.id);
  const earnings = sales.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const pendingOrders = state.orders.filter((order) => order.status !== "Delivered").length;
  const farmerOptions = state.farmers.map((entry) => `<option value="${escapeHtml(entry.id)}" ${entry.id === farmer.id ? "selected" : ""}>${escapeHtml(entry.name)}${entry.verified ? "" : " · pending review"}</option>`).join("");
  const hasProfile = Boolean(farmer.farmer && farmer.name && farmer.location && farmer.story);
  const hasRealListing = listings.some((product) => product.id.startsWith("crop-"));
  const welcomeComplete = Boolean(farmer.coverPhoto && hasRealListing);
  $("#farmer-dashboard").innerHTML = `
    ${!liveOnly ? `<div class="farmer-switcher"><label for="active-farmer">Demo farmer account</label><select id="active-farmer">${farmerOptions}</select></div>` : ""}
    ${!welcomeComplete ? `<section class="farmer-welcome" aria-labelledby="farmer-welcome-title">
      <div class="welcome-copy"><p class="eyebrow">Your farmer space</p><h3 id="farmer-welcome-title">Welcome to Shamba Direct, ${escapeHtml(farmer.farmer.split(" ")[0] || "farmer")}.</h3><p>This is your starting point to tell buyers about your farm and share what you grow. Make it yours with your own words and real photos.</p></div>
      <div class="welcome-checklist">
        <div class="welcome-step${hasProfile ? " done" : ""}"><span>${hasProfile ? "✓" : "1"}</span><div><strong>Introduce yourself</strong><small>Add your name, farm, location, and story.</small></div></div>
        <div class="welcome-step${farmer.coverPhoto ? " done" : ""}"><span>${farmer.coverPhoto ? "✓" : "2"}</span><div><strong>Show your farm at work</strong><small>Add a real photo of you working with your crops. No AI-generated images.</small></div></div>
        <div class="welcome-step${hasRealListing ? " done" : ""}"><span>${hasRealListing ? "✓" : "3"}</span><div><strong>Publish your first crop listing</strong><small>Write a description and upload your own product photo.</small></div></div>
      </div>
      <div class="welcome-actions">
        <button class="button button-dark" type="button" data-onboarding-photo>${farmer.coverPhoto ? "Change farm cover photo" : "Add a real farm photo"}</button>
        <button class="button button-outline" type="button" data-new-listing="${escapeHtml(farmer.id)}">${hasRealListing ? "Add another listing" : "Create my first listing"}</button>
      </div>
      ${!liveOnly ? `<p class="welcome-demo-note">Welcome setup is saved in this browser demo only.</p>` : ""}
    </section>` : ""}
    <div class="stat-card"><span>${liveOnly ? "Paid sales" : "Demo sales"}</span><strong>${formatPrice(earnings)}</strong></div>
    <div class="stat-card"><span>Active listings</span><strong>${listings.filter((item) => item.approved).length}</strong></div>
    <div class="stat-card"><span>Orders to fulfill</span><strong>${pendingOrders}</strong></div>
    <div class="payout-note"><strong>${liveOnly ? "Sales total" : "Payout estimate"}</strong><p>${liveOnly ? `${formatPrice(earnings)} from paid orders. Farmer payouts are coordinated outside the marketplace.` : `${formatPrice(earnings)} gross in this demo. No payout or transfer is processed.`}</p></div>
    <form class="farmer-profile-form" id="farmer-profile-form">
      <div class="profile-form-heading"><div>${farmer.profilePhoto ? `<img class="profile-form-photo" src="${escapeHtml(farmer.profilePhoto)}" alt="Current farmer profile photo">` : `<span class="farmer-avatar">${escapeHtml(farmer.emoji)}</span>`}<span><strong>Edit your farmer profile</strong><small>Use a real photo of yourself or your farm.</small></span></div></div>
      <label>Your name<input name="farmer" maxlength="80" value="${escapeHtml(farmer.farmer)}" required></label>
      <label>Farm / business name<input name="name" maxlength="80" value="${escapeHtml(farmer.name)}" required></label>
      <label>Farm location, town, or village<input name="location" list="kenya-locations" maxlength="80" value="${escapeHtml(farmer.location)}" required></label>
      <label>About you and your farm<textarea name="story" rows="3" maxlength="700" required>${escapeHtml(farmer.story)}</textarea></label>
      <label>Growing practices<input name="practices" maxlength="120" value="${escapeHtml(farmer.practices)}"></label>
      <label class="photo-upload-label">Real profile photo<input id="profile-photo-input" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" capture="user"><span>Take or upload a genuine photo. JPEG, PNG, WebP or AVIF; up to 8 MB.</span></label>
      <div id="profile-photo-preview" class="photo-preview" hidden></div>
      <label class="photo-upload-label">Real farm cover photo — you working with crops<input id="farm-cover-photo-input" name="coverPhoto" type="file" accept="image/jpeg,image/png,image/webp,image/avif" capture="environment"><span>Upload or take a real photo of yourself working in your field or harvest. JPEG, PNG, WebP or AVIF; up to 8 MB.</span></label>
      <div id="farm-cover-photo-preview" class="photo-preview cover-photo-preview" hidden></div>
      <datalist id="kenya-locations">${suggestedLocations.map((location) => `<option value="${escapeHtml(location)}"></option>`).join("")}</datalist>
      <button class="button button-dark" type="submit">Save farmer profile</button>
    </form>
    <div class="listing-manager">
      <h3>Manage listings · ${escapeHtml(farmer.name)}</h3>
      ${listings.map((product) => `<div class="listing-row"><span>${getProductPhoto(product) ? `<img class="listing-thumb" src="${escapeHtml(getProductPhoto(product))}" alt="">` : `<span class="listing-photo-missing">Photo needed</span>`} ${escapeHtml(product.name)}${product.approved ? "" : " · pending review"}</span><label>Price <input type="number" min="1" step="1" data-edit-price="${escapeHtml(product.id)}" value="${product.price}"></label><label>Stock <input type="number" min="0" step="1" data-edit-stock="${escapeHtml(product.id)}" value="${product.stock}"></label><button class="button button-outline" type="button" data-save-listing="${escapeHtml(product.id)}">Save details</button><label class="listing-description-edit">Listing description<textarea data-edit-description="${escapeHtml(product.id)}" maxlength="700" rows="2">${escapeHtml(product.description || "")}</textarea></label></div>`).join("")}
      <button class="button button-dark" type="button" data-new-listing="${escapeHtml(farmer.id)}">Add a crop listing</button>
    </div>`;
}

function showNewListingForm(farmerId) {
  const farmer = getFarmer(farmerId);
  if (!farmer) return;
  const categoryOptions = [...new Set(state.products.map((product) => product.category).filter(Boolean))]
    .map((category) => `<option value="${escapeHtml(category)}"></option>`).join("");
  openDialog("Add a crop", "Farmer listing · use your own photo", `
    <p class="demo-banner">List any crop or farm product—there is no fixed crop catalogue. Upload a real photo taken by you; the demo will not generate or AI-edit it.</p>
    <form id="new-listing-form" class="checkout-form">
      <label>Crop / product name<input name="name" maxlength="80" placeholder="For example: purple passion fruit" required></label>
      <label>Category<input name="category" list="crop-categories" maxlength="40" placeholder="Type any category" required></label>
      <datalist id="crop-categories">${categoryOptions}</datalist>
      <label>Price (KSh)<input name="price" type="number" min="1" step="1" required></label>
      <label>Unit / pack size<input name="unit" maxlength="40" placeholder="For example: 1 kg, 10 cobs, each" required></label>
      <label>Available quantity<input name="stock" type="number" min="0" step="1" value="1" required></label>
      <label>Farm location, town, or village<input name="location" list="kenya-locations" maxlength="80" value="${escapeHtml(farmer.location)}" placeholder="Type your own location" required></label>
      <datalist id="kenya-locations">${suggestedLocations.map((location) => `<option value="${escapeHtml(location)}"></option>`).join("")}</datalist>
      <label>Description<textarea name="description" rows="4" maxlength="700" placeholder="Describe how you grow it, freshness, size, quality, and how you pack it." required></textarea><span class="muted-note">Write your own honest product description. Up to 700 characters.</span></label>
      <label>Growing practice<input name="practice" maxlength="50" value="${escapeHtml(farmer.practices)}" placeholder="Optional details"></label>
      <label>Harvest / availability<input name="season" maxlength="50" value="Available" required></label>
      <label class="photo-upload-label">Actual product photo<input id="product-photo-input" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" capture="environment" required><span>${liveOnly && state.apiAvailable ? "Your photo is uploaded to the secure farm image store." : "Take a photo or choose one from your device. JPEG, PNG, WebP or AVIF; up to 8 MB."}</span></label>
      <div id="product-photo-preview" class="photo-preview" hidden></div>
      <button class="button button-dark" type="submit">Save crop listing</button>
      <p class="muted-note">${state.apiAvailable ? "New listings are saved on the marketplace and remain hidden until reviewed." : "New listings are drafts until reviewed."}</p>
    </form>`);
}

async function prepareUploadedPhoto(file, maxDimension = 1000) {
  if (!file || !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
    throw new Error("Choose a JPEG, PNG, WebP, or AVIF product photo.");
  }
  if (file.size > 8 * 1024 * 1024) throw new Error("Choose an image smaller than 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare this photo.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", maxDimension <= 500 ? 0.68 : 0.76);
  } finally {
    bitmap.close();
  }
}

function previewUploadedPhoto(input, preview, description) {
  const file = input.files?.[0];
  if (!file) {
    preview.hidden = true;
    preview.replaceChildren();
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 8 * 1024 * 1024) {
    input.value = "";
    preview.hidden = true;
    return showToast("Choose a JPEG, PNG, WebP, or AVIF image smaller than 8 MB.");
  }
  const image = document.createElement("img");
  image.alt = description;
  image.src = URL.createObjectURL(file);
  image.onload = () => URL.revokeObjectURL(image.src);
  preview.replaceChildren(image);
  preview.hidden = false;
}

function renderAdmin() {
  if (liveOnly) {
    const pendingFarmers = state.adminQueue.farmers;
    const pendingProducts = state.adminQueue.products;
    $("#admin-grid").innerHTML = `<div class="admin-panel"><h3>Farmer profiles awaiting review (${pendingFarmers.length})</h3>${pendingFarmers.length ? pendingFarmers.map((farmer) => `<div class="admin-row"><span><strong>${escapeHtml(farmer.name)}</strong><small>${escapeHtml(farmer.farmer)} · ${escapeHtml(farmer.location)}</small></span><button class="button button-outline" type="button" data-approve-farmer="${escapeHtml(farmer.id)}">Verify farmer</button></div>`).join("") : "<p>Nothing waiting for review.</p>"}</div><div class="admin-panel"><h3>Listings awaiting review (${pendingProducts.length})</h3>${pendingProducts.length ? pendingProducts.map((product) => `<div class="admin-row"><span class="admin-product-label">${product.imageUrl ? `<img class="listing-thumb" src="${escapeHtml(product.imageUrl)}" alt="">` : `<span class="listing-photo-missing">Photo missing</span>`}<span><strong>${escapeHtml(product.name)}</strong><small>${formatPrice(product.price)} · ${escapeHtml(product.farmName)}</small></span></span><button class="button button-outline" type="button" data-approve-product="${escapeHtml(product.id)}">Approve listing</button><button class="button button-outline" type="button" data-reject-product="${escapeHtml(product.id)}">Reject</button></div>`).join("") : "<p>Nothing waiting for review.</p>"}</div>`;
    return;
  }
  const pendingProducts = state.products.filter((product) => !product.approved);
  const pendingFarmers = state.farmers.filter((farmer) => farmer.pending || !farmer.verified);
  $("#admin-grid").innerHTML = `<div class="admin-panel"><h3>Farmer profiles awaiting review (${pendingFarmers.length})</h3>${pendingFarmers.length ? pendingFarmers.map((farmer) => `<div class="admin-row"><span>${escapeHtml(farmer.emoji)} <strong>${escapeHtml(farmer.name)}</strong><small>${escapeHtml(farmer.farmer)} · ${escapeHtml(farmer.location)}</small></span><button class="button button-outline" type="button" data-approve-farmer="${escapeHtml(farmer.id)}">Approve demo</button></div>`).join("") : "<p>Nothing waiting for review.</p>"}</div><div class="admin-panel"><h3>Listings awaiting review (${pendingProducts.length})</h3>${pendingProducts.length ? pendingProducts.map((product) => `<div class="admin-row"><span class="admin-product-label">${getProductPhoto(product) ? `<img class="listing-thumb" src="${escapeHtml(getProductPhoto(product))}" alt="">` : `<span class="listing-photo-missing">Photo needed</span>`}<span><strong>${escapeHtml(product.name)}</strong><small>${formatPrice(product.price)} · ${escapeHtml(getFarmer(product.farmerId)?.name || "Farmer")}</small></span></span><button class="button button-outline" type="button" data-approve-product="${escapeHtml(product.id)}">Approve demo</button></div>`).join("") : "<p>Nothing waiting for review.</p>"}</div><div class="admin-disclaimer">Demo moderation only: approval here is not a real identity, food-safety, or regulatory verification.</div>`;
}

function renderSupportReports() {
  $("#support-reports").innerHTML = state.reports.length ? `<h3>Saved reports</h3>${state.reports.map((report, index) => `<article class="report-card"><strong>${escapeHtml(report.orderId)} · ${escapeHtml(report.issue)}</strong><p>${escapeHtml(report.details)}</p><small>${escapeHtml(new Date(report.createdAt).toLocaleString())} · ${escapeHtml(report.status || "Open")} · Local demo only</small>${report.status !== "Resolved" ? `<button class="button button-outline" type="button" data-resolve-report="${index}">Mark resolved (demo)</button>` : ""}</article>`).join("")}` : "";
}

const seasonalMonths = {
  tomatoes: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
  avocados: [3, 4, 5, 6, 7, 8, 9],
  maize: [1, 2, 3, 8, 9, 10, 11, 12],
  spinach: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  bananas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  beans: [1, 2, 3, 4, 8, 9, 10, 11, 12],
  carrots: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
  mangoes: [11, 12, 1, 2, 3, 4],
  pumpkin: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12]
};
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function renderMarketInsights() {
  const productSelect = $("#insight-product");
  if (!productSelect) return;
  const selectedProductId = productSelect.value || state.products[0]?.id;
  productSelect.innerHTML = state.products.map((product) => `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)}</option>`).join("");
  productSelect.value = getProduct(selectedProductId) ? selectedProductId : state.products[0]?.id;
  const product = getProduct(productSelect.value);
  if (!product) return;
  const locationSelect = $("#insight-location");
  const locations = [...new Set(state.products.map((entry) => entry.location).filter(Boolean))].sort();
  const selectedLocation = locationSelect.value || state.deliveryArea;
  locationSelect.innerHTML = locations.map((location) => `<option value="${escapeHtml(location)}">${escapeHtml(location)}</option>`).join("");
  locationSelect.value = locations.includes(selectedLocation) ? selectedLocation : locations[0];
  const inSeason = new Set(seasonalMonths[product.id] || []);
  const currentMonth = new Date().getMonth() + 1;
  $("#season-calendar").innerHTML = `<p><strong>${escapeHtml(product.name)}</strong> in ${escapeHtml(locationSelect.value || "your area")} · current month: ${monthNames[currentMonth - 1]}</p><div class="season-months">${monthNames.map((month, index) => `<span class="${inSeason.has(index + 1) ? "in-season" : ""}${index + 1 === currentMonth ? " current-month" : ""}">${month}</span>`).join("")}</div><small>Seasonality is a general sample guide, not a local harvest guarantee. Confirm availability with the farmer.</small>`;
  const priceFactors = [0.92, 0.96, 1.02, 0.98, 1.08, 1.04];
  const bars = priceFactors.map((factor, index) => {
    const price = Math.round(product.price * factor);
    const height = Math.max(12, Math.round(price / (product.price * 1.15) * 100));
    return `<div class="price-bar-wrap"><span>${formatPrice(price)}</span><div class="price-bar" style="height:${height}%"></div><small>${monthNames[(currentMonth - priceFactors.length + index + 12) % 12]}</small></div>`;
  }).join("");
  $("#price-history").innerHTML = `<h3>Illustrative recent price trend · ${escapeHtml(product.name)}</h3><div class="price-bars" role="img" aria-label="Illustrative six-month price guide">${bars}</div><small>Sample estimates based on the listing price—not verified market data or a price prediction.</small>`;
}

function renderBulkEnquiries() {
  const farmerSelect = $("#bulk-farmer");
  if (!farmerSelect) return;
  const farmers = state.farmers.filter((farmer) => farmer.verified && !farmer.pending);
  farmerSelect.innerHTML = farmers.map((farmer) => `<option value="${escapeHtml(farmer.id)}">${escapeHtml(farmer.name)}</option>`).join("");
  $("#bulk-enquiries").innerHTML = state.bulkRequests.length
    ? `<h3>Saved enquiries on this device</h3>${state.bulkRequests.map((request) => `<article class="bulk-enquiry"><strong>${escapeHtml(request.product)} · ${escapeHtml(request.quantity)}</strong><p>${escapeHtml(request.business)} · ${escapeHtml(getFarmer(request.farmerId)?.name || "Farmer")}</p><small>${escapeHtml(request.status)} · ${escapeHtml(new Date(request.createdAt).toLocaleString())}</small></article>`).join("")}`
    : "";
}

function renderSubscriptions() {
  const planType = $("#plan-account-type");
  if (!planType) return;
  const androidApp = window.SHAMBA_ANDROID_APP === true;
  const type = liveOnly
    ? (state.livePlanCatalog?.type || (state.currentUser?.role === "farmer" ? "farmer" : state.currentUser?.role === "business" ? "business" : planType.value))
    : planType.value;
  planType.value = type;
  const plans = liveOnly && state.livePlanCatalog ? state.livePlanCatalog.plans.map((plan) => ({
    ...plan,
    features: subscriptionPlans[type].find((item) => item.id === plan.id)?.features || []
  })) : subscriptionPlans[type];
  const currentPlan = liveOnly
    ? state.currentSubscription?.planId
    : type === "farmer" ? getFarmerPlan(state.activeFarmerId) : state.subscriptions.business || "basic";
  const status = state.currentSubscription?.status;
  $("#plan-grid").innerHTML = plans.map((plan) => `<article class="plan-card${plan.id === currentPlan ? " selected-plan" : ""}"><p class="eyebrow">${type === "farmer" ? "Farmer plan" : "Miller & bulk buyer plan"}</p><h3>${escapeHtml(plan.name)}</h3><p class="plan-price">${formatPrice(plan.price)}<small> / month</small></p><ul>${plan.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul><button class="button ${plan.id === currentPlan ? "button-outline" : "button-dark"}" type="button" data-plan-type="${type}" data-plan="${plan.id}" ${liveOnly && (!state.apiAvailable || androidApp) ? "disabled" : ""}>${liveOnly ? androidApp ? "Not available in app yet" : !state.apiAvailable ? "Payments unavailable" : plan.id === currentPlan ? `${status || "Selected"} plan` : state.currentUser ? "Choose plan" : "Sign in to subscribe" : plan.id === currentPlan ? "Currently selected (demo)" : "Select plan (demo)"}</button></article>`).join("")
    + (liveOnly && state.currentSubscription?.status === "active" ? `<button class="button button-outline" id="cancel-subscription" type="button">Cancel at end of paid period</button>` : "");
  const sectionLabel = $("#subscriptions .demo-label");
  if (sectionLabel && liveOnly) sectionLabel.textContent = state.currentSubscription?.status === "active"
    ? `Active plan · ${state.currentSubscription.provider === "mpesa_manual" ? "manual monthly renewal" : "Stripe billing"}`
    : androidApp ? "Monthly plans · Google Play Billing not configured" : state.apiAvailable ? "Monthly plans · live checkout" : "Monthly plans · checkout unavailable";
  const note = $("#subscription-note");
  if (note && liveOnly) {
    note.textContent = androidApp
      ? "Plans are shown for information. Subscription purchases in the Android app will be enabled after Google Play Billing and purchase verification are implemented."
      : state.apiAvailable
      ? state.currentUser
        ? ["farmer", "business"].includes(state.currentUser.role)
          ? "Choose a package to continue to payment. Card plans renew automatically; M-Pesa renewals are manual each month."
          : "These are the available packages. Sign in with a farmer or miller/bulk-buyer account to subscribe."
        : "Browse the packages and prices. Sign in or create a farmer or miller/bulk-buyer account to subscribe."
      : "Packages and prices are shown for reference. Subscription checkout is unavailable until the live marketplace is connected.";
  }
}

function renderLanguage() {
  const sw = state.language === "sw";
  document.documentElement.lang = sw ? "sw" : "en";
  $("#language-toggle").textContent = sw ? "English" : "Kiswahili";
  $("#account-toggle").textContent = state.apiAvailable
    ? (state.currentUser?.name || (sw ? "Ingia" : "Sign in"))
    : (sw ? "Akaunti yangu" : "My account");
  $("#accessibility-toggle").textContent = sw ? (state.largeText ? "Maandishi ya kawaida" : "Maandishi makubwa") : (state.largeText ? "Normal text" : "Larger text");
  $("#accessibility-toggle").setAttribute("aria-pressed", String(state.largeText));
  document.body.classList.toggle("large-text", state.largeText);
  const labels = sw
    ? { market: "Soko", farmers: "Wakulima", tools: "Zana za mkulima", orders: "Maagizo", admin: "Msimamizi", marketTitle: "Mazao mapya kwako", farmersTitle: "Kutana na wakulima", ordersTitle: "Historia na ufuatiliaji wa maagizo", search: "Tafuta mboga, nafaka, mashamba..." }
    : { market: "Marketplace", farmers: "Farmers", tools: "Farmer tools", orders: "Orders", admin: "Admin", marketTitle: "Fresh picks for you", farmersTitle: "Meet the farmers", ordersTitle: "Order history & tracking", search: "Search vegetables, grains, farms..." };
  const nav = [["#market", "market"], ["#farmers", "farmers"], ["#farmer-tools", "tools"], ["#orders", "orders"], ["#admin", "admin"]];
  nav.forEach(([href, key]) => { const link = $(`.main-nav a[href="${href}"]`); if (link) link.textContent = labels[key]; });
  $("#market .section-heading h2").textContent = labels.marketTitle;
  $("#farmers .section-heading h2").textContent = labels.farmersTitle;
  $("#orders .section-heading h2").textContent = labels.ordersTitle;
  searchInput.placeholder = labels.search;
}

function renderNotifications() {
  const unread = state.notifications.filter((item) => !item.read).length;
  $("#notification-count").textContent = unread ? String(unread) : "";
  $("#notification-count").hidden = unread === 0;
}

function renderAll() {
  $("#header-location").textContent = state.deliveryArea;
  renderCategories();
  renderFilterLocations();
  renderProducts();
  renderCart();
  renderFarmers();
  renderOrders();
  renderFarmerDashboard();
  renderAdmin();
  renderSupportReports();
  renderMarketInsights();
  renderBulkEnquiries();
  renderSubscriptions();
  renderNotifications();
  renderLanguage();
  if (liveOnly) {
    $("#farmer-tools").hidden = state.currentUser?.role !== "farmer";
    $("#admin").hidden = state.currentUser?.role !== "admin";
    $("#farmer-reports").hidden = state.currentUser?.role !== "farmer";
    $("#orders").hidden = !state.currentUser || !["buyer", "farmer", "business"].includes(state.currentUser.role);
    $("#market-insights").hidden = true;
    $("#bulk-orders").hidden = true;
    $("#support").hidden = true;
    $("#farmer-reports").hidden = true;
    $("#notification-toggle").hidden = true;
  }
}

function showPlanPaymentDialog(planType, planId) {
  if (!liveOnly) {
    showToast("Plan selection is a local demo and does not activate a subscription.");
    return;
  }
  if (window.SHAMBA_ANDROID_APP === true) {
    showToast("In-app subscriptions are unavailable until Google Play Billing is integrated.");
    return;
  }
  if (!state.currentUser) {
    showToast("Create an account and verify your email before choosing a plan.");
    state.authMode = "login";
    showAccountDialog();
    return;
  }
  if ((planType === "farmer" && state.currentUser.role !== "farmer")
      || (planType === "business" && state.currentUser.role !== "business")) {
    showToast("Choose a plan that matches your farmer or miller/bulk-buyer account.");
    return;
  }
  if (state.currentSubscription?.status === "active") {
    showToast("Cancel your current plan before changing plans.");
    return;
  }
  const methods = state.paymentMethods.filter((method) => method.available && ["card", "mpesa"].includes(method.id));
  if (!methods.length) {
    showToast("Card or M-Pesa subscription billing is not configured yet.");
    return;
  }
  openDialog("Choose plan payment", "Monthly subscription · KSh", `
    <p>Card payments renew automatically through Stripe. M-Pesa plans require you to make a new payment manually every month.</p>
    <form id="subscription-checkout-form" class="checkout-form" data-plan-type="${escapeHtml(planType)}" data-plan-id="${escapeHtml(planId)}">
      <label>Payment method<select name="paymentMethod">${methods.map((method) => `<option value="${escapeHtml(method.id)}">${method.id === "mpesa" ? "M-Pesa · manual monthly renewal" : "Card · automatic monthly renewal"}</option>`).join("")}</select></label>
      ${methods.some((method) => method.id === "mpesa") ? `<label id="subscription-phone-label">M-Pesa phone<input name="phone" type="tel" inputmode="numeric" placeholder="2547XXXXXXXX" pattern="\\+?[0-9]{10,15}" maxlength="16"></label>` : ""}
      <button class="button button-dark" type="submit">Continue to payment</button>
    </form>
  `);
  const paymentSelect = $("#subscription-checkout-form [name='paymentMethod']");
  const phoneLabel = $("#subscription-phone-label");
  if (phoneLabel) {
    phoneLabel.hidden = paymentSelect.value !== "mpesa";
    phoneLabel.querySelector("input").required = paymentSelect.value === "mpesa";
  }
}

function getDeliveryDetails() {
  const area = $("#checkout-area")?.value || "Nairobi";
  const fulfillment = $("#checkout-fulfillment")?.value || "delivery";
  const fee = fulfillment === "pickup" ? 0 : deliveryFees[area] ?? 500;
  const day = new Date();
  day.setDate(day.getDate() + (area === "Nairobi" ? 1 : 2));
  return { area, fee, fulfillment, estimate: day.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }) };
}

function showCheckout() {
  const totals = getCartTotals();
  if (!totals.count) return;
  if (liveOnly && !state.apiAvailable) return showToast("The marketplace service is not available. Checkout is disabled.");
  if (state.apiAvailable && state.currentUser?.role !== "buyer") {
    showToast(state.currentUser ? "Sign in with a buyer account to place an order." : "Create or sign in to a buyer account before checkout.");
    if (!state.currentUser) showAccountDialog();
    return;
  }
  const liveMode = state.apiAvailable;
  const availableMethods = state.paymentMethods.filter((method) => method.available);
  if (liveMode && !availableMethods.length) return showToast("No payment method is configured on the server yet.");
  const locations = [...new Set([...suggestedLocations, state.deliveryArea, ...state.addresses.map((address) => address.area)])].filter(Boolean).sort();
  const options = locations.map((area) => `<option value="${escapeHtml(area)}"></option>`).join("");
  const paymentOptions = liveMode
    ? availableMethods.map((method) => `<option value="${escapeHtml(method.id)}">${escapeHtml(method.label)}</option>`).join("")
    : `<option value="mpesa">M-Pesa (not connected)</option><option value="cash_on_delivery">Cash on delivery (demo only)</option>`;
  const earliestDate = new Date();
  earliestDate.setDate(earliestDate.getDate() + 1);
  const minDate = `${earliestDate.getFullYear()}-${String(earliestDate.getMonth() + 1).padStart(2, "0")}-${String(earliestDate.getDate()).padStart(2, "0")}`;
  openDialog("Delivery details", liveMode ? "Secure checkout" : "Demo checkout · no payment", `
    <p class="${liveMode ? "muted-note" : "demo-banner"}">${liveMode ? "Your order is shared with the marketplace. Online payment is processed by the selected provider; never enter your payment PIN in this app." : "Use test details only. This saves a sample order in this browser; your contact fields are not saved or sent. No payment is charged and no farmer is contacted."}</p>
    <form id="checkout-form" class="checkout-form">
      <label>Your name<input name="name" autocomplete="name" required maxlength="80" value="${escapeHtml(state.currentUser?.name || "")}"></label>
      <label>Phone number<input name="phone" type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX" maxlength="18" required></label>
      <label>Fulfillment<select id="checkout-fulfillment" name="fulfillment"><option value="delivery">Delivery</option><option value="pickup">Farm pickup (demo)</option></select></label>
      <label>Delivery area, town, or village<input id="checkout-area" name="area" list="kenya-locations" maxlength="80" value="${escapeHtml(state.deliveryArea)}" required placeholder="Type your town or village"></label>
      <label id="checkout-street-label">Street / estate / landmark<input name="street" autocomplete="street-address" required maxlength="160"></label>
      <label>Preferred date<input name="deliveryDate" type="date" min="${minDate}" value="${minDate}" required></label>
      <label>Preferred delivery time<select name="deliveryTime"><option>Any time</option><option>Morning (8am–12pm)</option><option>Afternoon (12pm–5pm)</option><option>Evening (5pm–8pm)</option></select></label>
      <label>Payment method<select name="${liveMode ? "paymentMethod" : "payment"}" id="checkout-payment">${paymentOptions}</select></label>
      ${liveMode && availableMethods.some((method) => method.id === "mpesa") ? `<label id="mpesa-phone-label">M-Pesa phone number<input name="paymentPhone" type="tel" inputmode="numeric" placeholder="2547XXXXXXXX" pattern="\\+?[0-9]{10,15}" maxlength="16"></label>` : ""}
      ${!liveMode ? `<label class="save-address-option"><input name="saveAddress" type="checkbox" checked> Save this address on this device</label>` : ""}
      <div class="delivery-estimate" id="delivery-estimate"></div>
      <div class="checkout-breakdown"><span>Produce subtotal</span><strong>${formatPrice(totals.subtotal)}</strong><span>Delivery fee (estimate)</span><strong id="checkout-fee">${formatPrice(deliveryFees.Nairobi)}</strong><span>Estimated total</span><strong id="checkout-total">${formatPrice(totals.subtotal + deliveryFees.Nairobi)}</strong></div>
      <button class="button button-dark" type="submit">${liveMode ? "Place order" : "Save demo order"}</button>
      ${!liveMode ? `<p class="muted-note">Never enter your M-Pesa PIN or payment credentials in this demo.</p>` : ""}
    </form>
    <datalist id="kenya-locations">${options}</datalist>
    ${state.addresses.length ? `<div class="address-picker"><h3>Saved addresses</h3>${state.addresses.map((address) => `<button class="related-chip" type="button" data-use-address="${escapeHtml(address.area)}" data-street="${escapeHtml(address.street)}">${escapeHtml(address.street)}, ${escapeHtml(address.area)}</button>`).join("")}</div>` : ""}
  `);
  const mpesaPhone = $("#mpesa-phone-label");
  if (mpesaPhone) mpesaPhone.hidden = $("#checkout-payment").value !== "mpesa";
  updateDeliveryEstimate();
}

function updateDeliveryEstimate() {
  const estimate = $("#delivery-estimate");
  if (!estimate) return;
  const { area, fee, estimate: deliveryDate } = getDeliveryDetails();
  const subtotal = getCartTotals().subtotal;
  const isPickup = $("#checkout-fulfillment")?.value === "pickup";
  const streetLabel = $("#checkout-street-label");
  if (streetLabel) {
    streetLabel.hidden = isPickup;
    streetLabel.querySelector("input").required = !isPickup;
  }
  $("#checkout-fee").textContent = `${formatPrice(fee)}${!isPickup && deliveryFees[area] === undefined ? " (rough estimate)" : ""}`;
  $("#checkout-total").textContent = formatPrice(subtotal + fee);
  estimate.textContent = isPickup
    ? `Farm pickup in ${area} is selected. Pickup coordination is not connected in this demo; confirm details with the farmer.`
    : `Estimated delivery to ${area}: ${deliveryDate}. ${deliveryFees[area] === undefined ? "Location not on the sample list; a rough fee is shown." : "Fee is an illustrative estimate."}`;
}

function saveOrder(formData) {
  const totals = getCartTotals();
  const { area, fee, fulfillment } = getDeliveryDetails();
  const street = String(formData.get("street")).trim();
  const items = [...state.cart.entries()].map(([id, quantity]) => {
    const product = getProduct(id);
    return { productId: id, name: product.name, quantity, price: getSellingPrice(product), farmerId: product.farmerId };
  });
  const order = {
    id: `SD-${Date.now().toString().slice(-7)}`,
    createdAt: new Date().toISOString(),
    street,
    area,
    fulfillment,
    deliveryDate: String(formData.get("deliveryDate")),
    deliveryTime: String(formData.get("deliveryTime")),
    paymentPreference: String(formData.get("payment")),
    items,
    subtotal: totals.subtotal,
    deliveryFee: fee,
    total: totals.subtotal + fee,
    status: "Received"
  };
  state.deliveryArea = area;
  state.orders.push(order);
  items.forEach((item) => {
    const product = getProduct(item.productId);
    if (product) product.stock = Math.max(0, product.stock - item.quantity);
  });
  if (formData.get("saveAddress") === "on" && !state.addresses.some((address) => address.street === street && address.area === area)) {
    state.addresses.push({ street, area });
  }
  state.cart.clear();
  notify(`Demo order ${order.id} saved. No payment or delivery request was sent.`);
  persist();
  renderAll();
  dialog.close();
  setCartOpen(false);
  showToast(`Demo order ${order.id} saved on this device.`);
  location.hash = "orders";
}

async function saveLiveOrder(formData) {
  const { area, fulfillment } = getDeliveryDetails();
  const result = await apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify({
      name: String(formData.get("name")).trim(),
      phone: String(formData.get("phone")).trim(),
      fulfillment,
      area,
      address: String(formData.get("street") || "").trim(),
      deliveryDate: String(formData.get("deliveryDate") || ""),
      deliveryTime: String(formData.get("deliveryTime") || "Any time"),
      paymentMethod: String(formData.get("paymentMethod")),
      paymentPhone: String(formData.get("paymentPhone") || "").replace(/\s/g, ""),
      items: [...state.cart.entries()].map(([productId, quantity]) => ({ productId, quantity }))
    })
  });
  const order = mapApiOrder(result.order);
  state.orders.push(order);
  state.cart.clear();
  state.deliveryArea = area;
  renderAll();
  persist();
  dialog.close();
  setCartOpen(false);
  if (result.redirectUrl) {
    window.location.assign(result.redirectUrl);
    return;
  }
  const paymentText = result.payment?.status === "pending"
    ? (result.payment.message || "Your payment is awaiting confirmation.")
    : result.payment?.instructions || "Your order has been saved.";
  openDialog(
    `Order ${order.id}`,
    result.payment?.status === "pending" ? "Payment awaiting confirmation" : "Order saved",
    `<p>${escapeHtml(paymentText)}</p><p><strong>Total:</strong> ${formatPrice(order.total)}</p><p class="muted-note">Payment status: ${escapeHtml(order.paymentStatus || result.payment?.status || "pending")}. Do not make a second payment for this order.</p>`
  );
  location.hash = "orders";
}

function advanceOrder(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId);
  if (!order) return;
  const next = orderStatuses[Math.min(orderStatuses.indexOf(order.status) + 1, orderStatuses.length - 1)];
  if (next === order.status) return;
  order.status = next;
  notify(`Demo order ${order.id} status changed to ${next}.`);
  persist();
  renderAll();
  showToast(`Demo tracking updated: ${next}`);
}

function toggleFavorite(productId) {
  const product = getProduct(productId);
  if (state.favorites.has(productId)) {
    state.favorites.delete(productId);
    showToast(`${product?.name || "Item"} removed from saved items.`);
  } else {
    state.favorites.add(productId);
    showToast(`${product?.name || "Item"} saved. We'll flag restocks in this demo.`);
  }
  persist();
  renderProducts();
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderProducts();
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.search = searchInput.value;
  renderProducts();
});
searchInput.addEventListener("input", () => { state.search = searchInput.value; renderProducts(); });
sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; renderProducts(); });
["price-filter", "location-filter", "practice-filter", "stock-filter"].forEach((id) => {
  $(`#${id}`).addEventListener("input", renderProducts);
  $(`#${id}`).addEventListener("change", renderProducts);
});

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const product = getProduct(addButton.dataset.add);
    if (!product || product.stock <= 0) return;
    const quantity = state.cart.get(product.id) || 0;
    if (quantity >= product.stock) return showToast("Basket quantity is at the available stock limit.");
    state.cart.set(product.id, quantity + 1);
    persist();
    renderCart();
    showToast(`${product.name} added to your basket`);
    return;
  }
  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) return toggleFavorite(favoriteButton.dataset.favorite);
  const galleryButton = event.target.closest("[data-gallery]");
  if (galleryButton) return showGallery(galleryButton.dataset.gallery);
  const farmerButton = event.target.closest("[data-farmer]");
  if (farmerButton) return showFarmer(farmerButton.dataset.farmer);
  const productButton = event.target.closest("[data-product]");
  if (productButton) showProduct(productButton.dataset.product);
});

$("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  const product = getProduct(button.dataset.quantity);
  const quantity = (state.cart.get(button.dataset.quantity) || 0) + Number(button.dataset.change);
  if (quantity <= 0) state.cart.delete(button.dataset.quantity);
  else if (product && quantity <= product.stock) state.cart.set(button.dataset.quantity, quantity);
  else return showToast("That quantity is not available.");
  persist();
  renderCart();
});

$("#cart-toggle").addEventListener("click", () => setCartOpen(true));
$("#cart-close").addEventListener("click", () => setCartOpen(false));
cartBackdrop.addEventListener("click", () => setCartOpen(false));
$("#checkout-button").addEventListener("click", showCheckout);
$("#clear-filters").addEventListener("click", () => {
  state.category = "All produce";
  state.search = "";
  searchInput.value = "";
  $("#price-filter").value = "2000";
  $("#location-filter").value = "";
  $("#practice-filter").value = "";
  $("#stock-filter").checked = false;
  renderAll();
});

$("#farmer-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-farmer]");
  if (button) showFarmer(button.dataset.farmer);
});

$("#account-toggle").addEventListener("click", () => {
  state.authMode = "login";
  showAccountDialog();
});

$("#plan-account-type").addEventListener("change", renderSubscriptions);

$("#plan-grid").addEventListener("click", (event) => {
  const planButton = event.target.closest("[data-plan]");
  if (planButton) {
    showPlanPaymentDialog(planButton.dataset.planType, planButton.dataset.plan);
    return;
  }
  if (event.target.closest("#cancel-subscription")) {
    apiRequest("/subscriptions/cancel", { method: "POST" }).then((result) => {
      showToast(result.message);
      return connectLiveBackend();
    }).catch((error) => showToast(error.message));
  }
});

$("#dialog-content").addEventListener("click", (event) => {
  const renewalStatusButton = event.target.closest("[data-renewal-status]");
  if (renewalStatusButton) {
    apiRequest(`/subscriptions/mpesa-renewals/${encodeURIComponent(renewalStatusButton.dataset.renewalStatus)}`).then(async (result) => {
      if (result.status === "paid") {
        await connectLiveBackend();
        showToast("M-Pesa subscription payment confirmed.");
      } else {
        showToast(`Renewal status: ${result.status}.`);
      }
    }).catch((error) => showToast(error.message));
    return;
  }
  const authModeButton = event.target.closest("[data-auth-mode]");
  if (authModeButton) {
    state.authMode = authModeButton.dataset.authMode;
    showAccountDialog();
    return;
  }
  if (event.target.closest("#sign-out-button")) {
    apiRequest("/auth/logout", { method: "POST" }).then(() => {
      state.currentUser = null;
      state.csrfToken = "";
      state.orders = [];
      state.cart.clear();
      $("#backend-status").textContent = "Shared API connected";
      $("#account-toggle").textContent = "Sign in";
      renderAll();
      dialog.close();
      showToast("You have signed out.");
    }).catch((error) => showToast(error.message));
    return;
  }
  const messageButton = event.target.closest("[data-message-farmer]");
  if (messageButton) return showFarmerMessageForm(messageButton.dataset.messageFarmer);
  const farmerButton = event.target.closest("[data-farmer]");
  if (farmerButton) return showFarmer(farmerButton.dataset.farmer);
  const productButton = event.target.closest("[data-product]");
  if (productButton) return showProduct(productButton.dataset.product);
  const addressButton = event.target.closest("[data-use-address]");
  if (addressButton) {
    $("#checkout-area").value = addressButton.dataset.useAddress;
    $('#checkout-form [name="street"]').value = addressButton.dataset.street;
    updateDeliveryEstimate();
  }
});

$("#dialog-content").addEventListener("change", (event) => {
  if (event.target.id === "auth-role") {
    const fields = $("#farmer-registration-fields");
    const needsOrganization = event.target.value !== "buyer";
    fields.hidden = !needsOrganization;
    fields.querySelectorAll("input").forEach((input) => { input.required = needsOrganization; });
  }
  if (event.target.id === "checkout-area" || event.target.id === "checkout-fulfillment") updateDeliveryEstimate();
  if (event.target.id === "checkout-payment") {
    const mpesaPhone = $("#mpesa-phone-label");
    if (mpesaPhone) {
      mpesaPhone.hidden = event.target.value !== "mpesa";
      mpesaPhone.querySelector("input").required = event.target.value === "mpesa";
    }
  }
  if (event.target.name === "paymentMethod" && event.target.closest("#subscription-checkout-form")) {
    const phoneLabel = $("#subscription-phone-label");
    if (phoneLabel) {
      phoneLabel.hidden = event.target.value !== "mpesa";
      phoneLabel.querySelector("input").required = event.target.value === "mpesa";
    }
  }
});

$("#dialog-content").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  if (form.id === "auth-form") {
    const registering = state.authMode === "register";
    const role = String(formData.get("role") || "buyer");
    const payload = {
      email: String(formData.get("email")).trim(),
      password: String(formData.get("password"))
    };
    if (registering) {
      payload.role = role;
      payload.name = String(formData.get("name")).trim();
      if (role === "farmer") {
        payload.farmName = String(formData.get("farmName")).trim();
        payload.location = String(formData.get("location")).trim();
      }
    }
    apiRequest(registering ? "/auth/register" : "/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }).then(async (result) => {
      if (registering) {
        openDialog("Check your email", "Verify your account to continue", `<p>${escapeHtml(result.message)}</p><button class="button button-outline" type="button" data-auth-mode="resend-verification">Resend verification email</button>`);
        return;
      }
      state.currentUser = result.user;
      state.csrfToken = (await apiRequest("/csrf")).csrfToken;
      $("#account-toggle").textContent = result.user.name;
      dialog.close();
      await connectLiveBackend();
      showToast(registering ? "Account created." : "Signed in.");
    }).catch((error) => showToast(error.message));
    return;
  }
  if (form.id === "auth-reset-request-form") {
    const endpoint = state.authMode === "resend-verification"
      ? "/auth/verification/resend"
      : "/auth/password-reset/request";
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify({ email: String(formData.get("email")).trim() })
    }).then((result) => {
      openDialog("Check your email", "Account instructions requested", `<p>${escapeHtml(result.message)}</p><button class="button button-outline" type="button" data-auth-mode="login">Return to sign in</button>`);
    }).catch((error) => showToast(error.message));
    return;
  }
  if (form.id === "auth-reset-complete-form") {
    apiRequest("/auth/password-reset/complete", {
      method: "POST",
      body: JSON.stringify({ token: state.authResetToken, password: String(formData.get("password")) })
    }).then((result) => {
      state.authResetToken = "";
      history.replaceState(null, "", `${location.pathname}${location.hash}`);
      state.authMode = "login";
      showAccountDialog();
      showToast(result.message);
    }).catch((error) => showToast(error.message));
    return;
  }
  if (form.id === "subscription-checkout-form") {
    const paymentMethod = String(formData.get("paymentMethod"));
    apiRequest("/subscriptions/checkout", {
      method: "POST",
      body: JSON.stringify({
        planId: form.dataset.planId,
        paymentMethod,
        phone: String(formData.get("phone") || "").replace(/\s/g, "")
      })
    }).then(async (result) => {
      dialog.close();
      if (result.redirectUrl) {
        window.location.assign(result.redirectUrl);
        return;
      }
      await connectLiveBackend();
      openDialog("M-Pesa renewal requested", "Manual monthly renewal", `<p>${escapeHtml(result.message)}</p><p>Approve the M-Pesa prompt. Your plan becomes active only after payment is confirmed.</p><button class="button button-outline" type="button" data-renewal-status="${escapeHtml(result.renewalId)}">Check renewal status</button>`);
    }).catch((error) => showToast(error.message));
    return;
  }
  if (form.id === "buyer-profile-form") {
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    if (email && !form.elements.namedItem("email").validity.valid) return showToast("Enter a valid email address.");
    state.buyerProfile = { name, email };
    if (!persist()) return;
    dialog.close();
    renderLanguage();
    showToast("Local demo profile saved. No online account was created.");
    return;
  }
  if (form.id === "farmer-message-form") {
    state.messages.push({
      farmerId: form.dataset.farmerId,
      from: String(formData.get("from")).trim(),
      text: String(formData.get("text")).trim(),
      createdAt: new Date().toISOString()
    });
    if (!persist()) return;
    showFarmerMessageForm(form.dataset.farmerId);
    showToast("Message saved locally. The farmer was not contacted.");
    return;
  }
  if (form.id === "checkout-form") {
    const phone = form.elements.namedItem("phone");
    phone.setCustomValidity("");
    if (!/^\+?[0-9\s()-]{9,18}$/.test(phone.value.trim())) {
      phone.setCustomValidity("Enter a phone number using digits and optional spaces, parentheses, or hyphens.");
      phone.reportValidity();
      return;
    }
    if (state.apiAvailable) {
      saveLiveOrder(formData).catch((error) => showToast(error.message));
      return;
    }
    return saveOrder(formData);
  }
  if (form.id === "new-listing-form") {
    if (state.apiAvailable) {
      const farmerId = state.activeFarmerId;
      const product = {
        name: String(formData.get("name")).trim(),
        category: String(formData.get("category")).trim(),
        location: String(formData.get("location")).trim(),
        description: String(formData.get("description")).trim(),
        price: Number(formData.get("price")),
        unit: String(formData.get("unit")).trim(),
        stock: Number(formData.get("stock"))
      };
      if (!Number.isFinite(product.price) || product.price <= 0 || !Number.isInteger(product.stock) || product.stock < 0) {
        return showToast("Check the price and whole-number stock amount.");
      }
      const file = formData.get("photo");
      uploadLivePhoto(file, "product", 1000).then(async (imageUrl) => {
        product.imageUrl = imageUrl;
        const result = await apiRequest("/products", { method: "POST", body: JSON.stringify(product) });
        state.products.push({
          ...result.product,
          farmerId,
          photoData: imageUrl,
          badge: "Pending review",
          color: "#e9efdf",
          season: String(formData.get("season")).trim() || "Available",
          approved: false
        });
        renderAll();
        dialog.close();
        showToast("Listing submitted and saved to the shared marketplace for review.");
      }).catch((error) => showToast(error.message));
      return;
    }
    const file = formData.get("photo");
    prepareUploadedPhoto(file).then((photoData) => {
      const farmerId = state.activeFarmerId;
      const name = String(formData.get("name")).trim();
      const category = String(formData.get("category")).trim();
      const location = String(formData.get("location")).trim();
      const description = String(formData.get("description")).trim();
      if (!name || !category || !location || !description) return showToast("Add a crop name, category, location, and description.");
      const product = {
        id: `crop-${crypto.randomUUID()}`,
        name,
        description,
        category,
        farmerId,
        price: Number(formData.get("price")),
        unit: String(formData.get("unit")).trim(),
        emoji: "🌱",
        badge: "New listing",
        color: "#e9efdf",
        location,
        practice: String(formData.get("practice")).trim() || "Not specified",
        stock: Number(formData.get("stock")),
        photos: [],
        photoData,
        season: String(formData.get("season")).trim(),
        approved: false
      };
      if (!Number.isFinite(product.price) || product.price <= 0 || !Number.isInteger(product.stock) || product.stock < 0 || !product.unit || !product.season) {
        return showToast("Check the price, unit, stock, and availability details.");
      }
      state.products.push(product);
      if (!persist()) {
        state.products.pop();
        return showToast("The photo could not be saved. Try a smaller image.");
      }
      renderAll();
      dialog.close();
      showToast(`${name} saved as a draft for review.`);
    }).catch((error) => {
      console.error("Could not process farmer product photo.", error);
      showToast(error instanceof Error ? error.message : "Could not process this photo.");
    });
    return;
  }
  if (form.matches("[data-review]")) {
    const orderId = form.dataset.orderId;
    const order = state.orders.find((entry) => entry.id === orderId && entry.status === "Delivered" && entry.items.some((item) => item.productId === form.dataset.review));
    if (!order || state.reviews.some((review) => review.orderId === orderId && review.productId === form.dataset.review)) return showToast("Reviews require an eligible delivered order and can only be saved once per item.");
    state.reviews.push({ orderId, productId: form.dataset.review, rating: Number(formData.get("rating")), text: String(formData.get("text")).trim(), createdAt: new Date().toISOString() });
    persist();
    showProduct(form.dataset.review, orderId);
    showToast("Review saved on this device.");
  }
});

$("#dialog-content").addEventListener("input", (event) => {
  if (event.target.id === "checkout-area" || event.target.id === "checkout-fulfillment") updateDeliveryEstimate();
  if (event.target.name === "phone") event.target.setCustomValidity("");
});

$("#dialog-content").addEventListener("change", (event) => {
  if (event.target.id === "product-photo-input") {
    previewUploadedPhoto(event.target, $("#product-photo-preview"), "Preview of the farmer's product photo");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-dialog]")) dialog.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) setCartOpen(false);
});

$("#order-list").addEventListener("click", (event) => {
  const liveStatus = event.target.closest("[data-live-status]");
  if (liveStatus) {
    apiRequest(`/orders/${encodeURIComponent(liveStatus.dataset.liveStatus)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: liveStatus.dataset.nextStatus })
    }).then(() => connectLiveBackend()).catch((error) => showToast(error.message));
    return;
  }
  const receipt = event.target.closest("[data-receipt]");
  if (receipt) {
    downloadOrderReceipt(receipt.dataset.receipt);
    return;
  }
  const checkPayment = event.target.closest("[data-check-payment]");
  if (checkPayment) {
    apiRequest(`/payments/mpesa/status/${encodeURIComponent(checkPayment.dataset.checkPayment)}`).then((result) => {
      const order = state.orders.find((entry) => entry.id === result.orderId);
      if (order) order.paymentStatus = result.paymentStatus;
      renderOrders();
      showToast(`Payment status: ${String(result.paymentStatus).replaceAll("_", " ")}.`);
    }).catch((error) => showToast(error.message));
    return;
  }
  const refresh = event.target.closest("[data-track]");
  if (refresh) {
    if (state.apiAvailable) {
      connectLiveBackend().catch((error) => showToast(error.message));
      return;
    }
    const order = state.orders.find((entry) => entry.id === refresh.dataset.track);
    showToast(order ? `Latest saved demo status: ${order.status}.` : "Order not found.");
  }
  const advance = event.target.closest("[data-advance]");
  if (advance) advanceOrder(advance.dataset.advance);
  const reorder = event.target.closest("[data-reorder]");
  if (reorder) {
    const order = state.orders.find((entry) => entry.id === reorder.dataset.reorder);
    if (!order) return;
    order.items.forEach((item) => {
      const product = getProduct(item.productId);
      if (!product || product.stock <= 0) return;
      const current = state.cart.get(item.productId) || 0;
      state.cart.set(item.productId, Math.min(product.stock, current + item.quantity));
    });
    persist();
    renderCart();
    setCartOpen(true);
  }
  const reviewOrder = event.target.closest("[data-order-review]");
  if (reviewOrder) {
    const order = state.orders.find((entry) => entry.id === reviewOrder.dataset.orderReview && entry.status === "Delivered");
    const item = order?.items.find((entry) => getProduct(entry.productId) && !state.reviews.some((review) => review.orderId === order.id && review.productId === entry.productId));
    if (item) showProduct(item.productId, order.id);
    else showToast("Reviews are available for unreviewed items after delivery.");
  }
});

$("#saved-address-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-address]");
  if (!button) return;
  state.addresses.splice(Number(button.dataset.removeAddress), 1);
  persist();
  renderOrders();
  showToast("Saved address removed.");
});

$("#farmer-dashboard").addEventListener("click", (event) => {
  const photoAction = event.target.closest("[data-onboarding-photo]");
  if (photoAction) {
    $("#farmer-profile-form").scrollIntoView({ behavior: "smooth", block: "center" });
    $("#farm-cover-photo-input")?.click();
    return;
  }
  const saveButton = event.target.closest("[data-save-listing]");
  if (saveButton) {
    const product = getProduct(saveButton.dataset.saveListing);
    if (!product) return;
    const price = Number($(`[data-edit-price="${product.id}"]`).value);
    const stock = Number($(`[data-edit-stock="${product.id}"]`).value);
    const description = $(`[data-edit-description="${product.id}"]`).value.trim();
    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0 || !description) return showToast("Enter a valid price, whole-number stock, and listing description.");
    const previousStock = product.stock;
    product.price = price;
    product.stock = stock;
    product.description = description;
    if (previousStock === 0 && stock > 0) {
      state.favorites.has(product.id) && notify(`${product.name} is back in stock.`);
    }
    if (state.apiAvailable) {
      apiRequest(`/products/${encodeURIComponent(product.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ price, stock, description })
      }).then(() => {
        renderAll();
        showToast("Listing updated in the shared marketplace.");
      }).catch((error) => showToast(error.message));
      return;
    }
    persist();
    renderAll();
    showToast("Listing updated in this browser.");
  }
  const newListing = event.target.closest("[data-new-listing]");
  if (newListing) showNewListingForm(newListing.dataset.newListing);
});

$("#farmer-dashboard").addEventListener("submit", (event) => {
  if (event.target.id !== "farmer-profile-form") return;
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const farmer = getFarmer(state.activeFarmerId);
  if (!farmer) return showToast("Select a farmer profile first.");
  const updateProfile = ([profilePhoto, coverPhoto]) => {
    farmer.farmer = String(formData.get("farmer")).trim();
    farmer.name = String(formData.get("name")).trim();
    farmer.location = String(formData.get("location")).trim();
    farmer.story = String(formData.get("story")).trim();
    farmer.practices = String(formData.get("practices")).trim() || "Not specified";
    if (profilePhoto) farmer.profilePhoto = profilePhoto;
    if (coverPhoto) farmer.coverPhoto = coverPhoto;
    if (state.apiAvailable) {
      apiRequest("/farmers/me", {
        method: "PATCH",
        body: JSON.stringify({
          farmName: farmer.name,
          farmerName: farmer.farmer,
          location: farmer.location,
          story: farmer.story,
          practices: farmer.practices,
          ...(profilePhoto ? { profilePhotoUrl: profilePhoto } : {}),
          ...(coverPhoto ? { coverPhotoUrl: coverPhoto } : {})
        })
      }).then(() => {
        state.products.filter((product) => product.farmerId === farmer.id).forEach((product) => { product.location = farmer.location; });
        renderAll();
        showToast("Farmer profile updated in the shared marketplace.");
      }).catch((error) => showToast(error.message));
      return;
    }
    state.products.filter((product) => product.farmerId === farmer.id).forEach((product) => {
      product.location = farmer.location;
    });
    if (!persist()) return;
    renderAll();
    showToast("Farmer profile updated on this device.");
  };
  const profilePhoto = formData.get("photo");
  const coverPhoto = formData.get("coverPhoto");
  if (state.apiAvailable) {
    const profileUpload = profilePhoto instanceof File && profilePhoto.size > 0
      ? uploadLivePhoto(profilePhoto, "profile", 500)
      : Promise.resolve("");
    const coverUpload = coverPhoto instanceof File && coverPhoto.size > 0
      ? uploadLivePhoto(coverPhoto, "cover", 1200)
      : Promise.resolve("");
    Promise.all([profileUpload, coverUpload]).then(updateProfile).catch((error) => showToast(error.message));
    return;
  }
  const profileUpload = profilePhoto instanceof File && profilePhoto.size > 0
    ? prepareUploadedPhoto(profilePhoto, 500)
    : Promise.resolve("");
  const coverUpload = coverPhoto instanceof File && coverPhoto.size > 0
    ? prepareUploadedPhoto(coverPhoto, 1200)
    : Promise.resolve("");
  Promise.all([profileUpload, coverUpload]).then(updateProfile).catch((error) => {
      console.error("Could not process farmer profile photo.", error);
      showToast(error instanceof Error ? error.message : "Could not process this profile photo.");
  });
});

$("#farmer-dashboard").addEventListener("change", (event) => {
  if (event.target.id === "profile-photo-input" || event.target.id === "farm-cover-photo-input") {
    const isCover = event.target.id === "farm-cover-photo-input";
    previewUploadedPhoto(
      event.target,
      isCover ? $("#farm-cover-photo-preview") : $("#profile-photo-preview"),
      isCover ? "Preview of the real farmer working with crops cover photo" : "Preview of the farmer's real profile photo"
    );
    return;
  }
  if (event.target.id !== "active-farmer") return;
  state.activeFarmerId = event.target.value;
  persist();
  renderFarmerDashboard();
});

$("#bulk-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const lines = $("#bulk-input").value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const updates = [];
  for (const line of lines) {
    const [id, priceText, stockText, ...extra] = line.split(",").map((part) => part.trim());
    const product = getProduct(id);
    const price = Number(priceText);
    const stock = Number(stockText);
    if (!product || extra.length || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
      return showToast(`Invalid CSV row: ${line}`);
    }
    updates.push({ product, price, stock });
  }
  updates.forEach(({ product, price, stock }) => {
    const wasOutOfStock = product.stock === 0;
    product.price = price;
    product.stock = stock;
    if (wasOutOfStock && stock > 0 && state.favorites.has(product.id)) notify(`${product.name} is back in stock.`);
  });
  persist();
  renderAll();
  connectLiveBackend();
  $("#bulk-input").value = "";
  showToast(`${updates.length} listing${updates.length === 1 ? "" : "s"} updated in this browser.`);
});

$("#admin-grid").addEventListener("click", (event) => {
  const farmerButton = event.target.closest("[data-approve-farmer]");
  if (farmerButton) {
    if (liveOnly) {
      apiRequest(`/admin/farmers/${encodeURIComponent(farmerButton.dataset.approveFarmer)}/verification`, {
        method: "PATCH",
        body: JSON.stringify({ verified: true })
      }).then(() => connectLiveBackend()).catch((error) => showToast(error.message));
      return;
    }
    const farmer = getFarmer(farmerButton.dataset.approveFarmer);
    if (!farmer) return;
    farmer.pending = false;
    farmer.verified = true;
    persist();
    renderAll();
    showToast("Demo profile marked reviewed. This is not a real identity check.");
  }
  const productButton = event.target.closest("[data-approve-product]");
  if (productButton) {
    if (liveOnly) {
      apiRequest(`/admin/products/${encodeURIComponent(productButton.dataset.approveProduct)}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "active" })
      }).then(() => connectLiveBackend()).catch((error) => showToast(error.message));
      return;
    }
    const product = getProduct(productButton.dataset.approveProduct);
    if (!product) return;
    product.approved = true;
    persist();
    renderAll();
    const farmer = getFarmer(product.farmerId);
    showToast(farmer?.verified && !farmer.pending ? "Demo listing approved and visible in the marketplace." : "Demo listing approved; its farmer profile still needs review.");
  }
  const rejectButton = event.target.closest("[data-reject-product]");
  if (rejectButton && liveOnly) {
    apiRequest(`/admin/products/${encodeURIComponent(rejectButton.dataset.rejectProduct)}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "rejected" })
    }).then(() => connectLiveBackend()).catch((error) => showToast(error.message));
  }
});

$("#support-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.reports.unshift({ orderId: String(data.get("order")), issue: String(data.get("issue")), details: String(data.get("details")).trim(), createdAt: new Date().toISOString() });
  persist();
  renderSupportReports();
  event.currentTarget.reset();
  showToast("Support report saved in this browser; it was not sent to a support team.");
});

$("#notification-toggle").addEventListener("click", () => {
  const content = state.notifications.length ? state.notifications.map((item) => `<article class="notification-item${item.read ? "" : " unread"}"><strong>${escapeHtml(item.message)}</strong><small>${escapeHtml(new Date(item.date).toLocaleString())}</small></article>`).join("") : `<div class="empty-panel"><span>🔔</span><p>No notifications yet. Saved-item restocks and demo order updates will appear here.</p></div>`;
  openDialog("Notifications", "Updates on this device", `${content}<p class="muted-note">These are local demo alerts. Email and SMS delivery are not configured.</p>`);
  state.notifications.forEach((item) => { item.read = true; });
  persist();
  renderNotifications();
});

$("#checkout-button").setAttribute("aria-haspopup", "dialog");
$("#cart-toggle").setAttribute("aria-controls", "cart-drawer");
$("#notification-toggle").setAttribute("aria-haspopup", "dialog");

const heroPhoto = $(".hero-photo");
if (heroPhoto) {
  const heroPhotos = [
    { src: "assets/farm-hero.jpg", alt: "Green cultivated fields stretching across the countryside" },
    { src: "assets/farm-hero-harvest.jpg", alt: "Golden grain growing in a sunlit farm field" }
  ];
  let heroPhotoIndex = 0;
  const nextHeroPhoto = new Image();
  nextHeroPhoto.src = heroPhotos[1].src;

  window.setInterval(() => {
    heroPhotoIndex = (heroPhotoIndex + 1) % heroPhotos.length;
    heroPhoto.src = heroPhotos[heroPhotoIndex].src;
    heroPhoto.alt = heroPhotos[heroPhotoIndex].alt;
  }, 120000);
}

renderAll();
