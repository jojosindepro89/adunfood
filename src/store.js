// src/store.js - Central Data Store for Àdùn Kitchen

const STORAGE_KEYS = {
  MEALS: 'adun_meals_v1',
  ORDERS: 'adun_orders_v1',
  CART: 'adun_cart_v1',
  SETTINGS: 'adun_settings_v1',
  ZONES: 'adun_delivery_zones_v1',
  STORE_OPEN: 'adun_store_open_v1',
  WISHLIST: 'adun_wishlist_v1'
};

// Initial default meals based on the design & Nigerian delicacies
const DEFAULT_MEALS = [
  {
    id: 'meal-1',
    name: 'Smoky Party Jollof',
    category: 'Rice Dishes',
    categoryKey: 'rice',
    price: 6500,
    rating: 4.9,
    reviewsCount: 318,
    tag: 'BESTSELLER',
    tagColor: 'orange',
    prepTime: '25-35 mins',
    spiceLevel: 'Medium Spicy',
    description: 'Firewood-infused party jollof with spicy grilled chicken & sweet plantain.',
    longDescription: 'Our signature slow-cooked long grain rice infused with rich smoky firewood aroma, blended plum tomatoes, scotch bonnet peppers, sweet red bell peppers and aromatic herbs. Served with a succulent grilled chicken thigh marinated in house spices and golden fried sweet plantain (dodo).',
    image: '/images/jollof.jpg',
    inStock: true,
    ordersCount: 42,
    totalSales: 273000,
    featured: true
  },
  {
    id: 'meal-2',
    name: 'Egusi & Pounded Yam',
    category: 'Soups',
    categoryKey: 'soups',
    price: 7200,
    rating: 4.8,
    reviewsCount: 264,
    tag: 'POPULAR',
    tagColor: 'orange',
    prepTime: '30-40 mins',
    spiceLevel: 'Mild Spicy',
    description: 'Rich melon seed soup with assorted meats and fluffy, hot pounded yam.',
    longDescription: 'Traditional Nigerian egusi soup prepared with hand-ground melon seeds, fresh ugu leaves, shredded dry fish, stockfish, tender beef cuts, and red palm oil. Accompanied by a silky, steaming mound of freshly pounded yam (iyan) wrapped in banana leaves.',
    image: '/images/egusi.jpg',
    inStock: true,
    ordersCount: 35,
    totalSales: 252000,
    featured: true
  },
  {
    id: 'meal-3',
    name: 'Ofada Rice Special',
    category: 'Rice Dishes',
    categoryKey: 'rice',
    price: 6000,
    rating: 4.7,
    reviewsCount: 195,
    tag: 'CHEF SPECIAL',
    tagColor: 'green',
    prepTime: '25-35 mins',
    spiceLevel: 'Hot & Spicy',
    description: 'Traditional brown rice with green pepper ayamase sauce, egg and tender meat.',
    longDescription: 'Authentic Nigerian unpolished short-grain Ofada rice wrapped in scented uma leaves, paired with our fiery Ayamase designer sauce slow-bleached in pure palm oil with green bell peppers, fermented locust beans (iru), diced shaki, beef and a seasoned boiled egg.',
    image: '/images/ofada.jpg',
    inStock: true,
    ordersCount: 28,
    totalSales: 190400,
    featured: true
  },
  {
    id: 'meal-4',
    name: 'Suya Platter',
    category: 'Grills',
    categoryKey: 'grills',
    price: 5000,
    rating: 4.9,
    reviewsCount: 412,
    tag: 'HOT',
    tagColor: 'red',
    prepTime: '15-20 mins',
    spiceLevel: 'Very Spicy',
    description: 'Spiced grilled beef skewers dusted with authentic yaji spice, served with onions.',
    longDescription: 'Tender, thinly sliced premium beef cuts chargrilled over hot embers, generously seasoned with our secret Northern Nigerian yaji peanut spice blend. Served on a rustic board with crunchy sliced red onions, fresh plum tomatoes, shredded cabbage and fresh lime wedges.',
    image: '/images/suya.jpg',
    inStock: true,
    ordersCount: 21,
    totalSales: 121800,
    featured: true
  },
  {
    id: 'meal-5',
    name: 'Family Feast Platter',
    category: 'Combos',
    categoryKey: 'combos',
    price: 28500,
    originalPrice: 35000,
    rating: 5.0,
    reviewsCount: 88,
    tag: 'FAMILY MEAL',
    tagColor: 'orange',
    prepTime: '40-50 mins',
    spiceLevel: 'Customizable',
    description: 'Get our huge family feast with party jollof, grilled chicken, plantain, moi moi and drinks for four.',
    longDescription: 'A colossal feast crafted for 4 to 6 people. Includes a mega bowl of Smoky Party Jollof Rice, 4 pieces of seasoned flame-grilled chicken, generous portions of sweet fried dodo, 4 steamed leaf-wrapped Moi Moi with boiled eggs, and 4 chilled bottles of Chapman or Zobo.',
    image: '/images/family_feast.jpg',
    inStock: true,
    ordersCount: 14,
    totalSales: 399000,
    featured: false
  },
  {
    id: 'meal-6',
    name: 'Catfish Pepper Soup',
    category: 'Soups',
    categoryKey: 'soups',
    price: 4500,
    rating: 4.7,
    reviewsCount: 142,
    tag: 'COMFORT',
    tagColor: 'orange',
    prepTime: '20-30 mins',
    spiceLevel: 'Extra Hot',
    description: 'Steaming aromatic fresh catfish broth infused with uda, uziza, and scent leaves.',
    longDescription: 'Fresh live catfish simmered gently in a fragrant, clear broth infused with traditional medicinal spices including uziza seeds, uda pods, calabash nutmeg, and fresh scent leaves. Perfect for a rainy day or evening warmth.',
    image: '/images/egusi.jpg',
    inStock: true,
    ordersCount: 18,
    totalSales: 81000,
    featured: false
  },
  {
    id: 'meal-7',
    name: 'Crispy Small Chops Platter',
    category: 'Snacks',
    categoryKey: 'snacks',
    price: 3500,
    rating: 4.9,
    reviewsCount: 220,
    tag: 'PARTY FAVOURITE',
    tagColor: 'green',
    prepTime: '15-20 mins',
    spiceLevel: 'Mild',
    description: 'Freshly fried golden puff puff, spring rolls, spicy samosas, and peppered gizzard.',
    longDescription: 'The quintessential Nigerian finger-food party combo: 6 golden, pillowy puff-puffs, 2 crispy beef spring rolls, 2 crunchy samosas, and tender spicy peppered chicken gizzards.',
    image: '/images/snacks.jpg',
    inStock: true,
    ordersCount: 30,
    totalSales: 105000,
    featured: false
  },
  {
    id: 'meal-8',
    name: 'Chilled Lagos Chapman & Zobo',
    category: 'Drinks',
    categoryKey: 'drinks',
    price: 2000,
    rating: 4.9,
    reviewsCount: 184,
    tag: 'CHILLED',
    tagColor: 'blue',
    prepTime: '5 mins',
    spiceLevel: 'Non-Spicy',
    description: 'Classic Lagos cocktail mocktail with Angostura bitters, fresh cucumber, and citrus.',
    longDescription: 'Hand-crafted Nigerian Chapman served over crushed ice with Angostura aromatic bitters, Fanta, Sprite, Ribena splash, fresh cucumber wheels, orange slices, and a maraschino cherry. Or choose our spicy clove-infused cold Zobo.',
    image: '/images/drinks.jpg',
    inStock: true,
    ordersCount: 45,
    totalSales: 90000,
    featured: false
  }
];

// Initial orders matching the admin screenshot (#AD-2048, #AD-2047, #AD-2046, #AD-2045)
const DEFAULT_ORDERS = [
  {
    id: '#AD-2048',
    customer: 'Chidi Eze',
    phone: '+234 802 345 6789',
    zone: 'Lekki Phase 1',
    address: 'Plot 12 Admiralty Way, Lekki Phase 1, Lagos',
    total: 12500,
    subtotal: 11000,
    deliveryFee: 1500,
    status: 'Preparing', // Preparing | Confirmed | Out for delivery | Delivered | Pending | Cancelled
    statusColor: 'orange',
    time: '11:20 AM',
    date: 'Tuesday, 24 June',
    notes: 'Please add extra pepper sauce on the side.',
    items: [
      { id: 'meal-1', name: 'Smoky Party Jollof', price: 6500, quantity: 1 },
      { id: 'meal-3', name: 'Ofada Rice Special', price: 6000, quantity: 1 }
    ]
  },
  {
    id: '#AD-2047',
    customer: 'Bola Adeyemi',
    phone: '+234 812 987 6543',
    zone: 'Victoria Island',
    address: 'Block 4, 1004 Estate, Victoria Island, Lagos',
    total: 8200,
    subtotal: 6700,
    deliveryFee: 1500,
    status: 'Confirmed',
    statusColor: 'blue',
    time: '10:45 AM',
    date: 'Tuesday, 24 June',
    notes: 'Call when driver arrives at the gate security.',
    items: [
      { id: 'meal-3', name: 'Ofada Rice Special', price: 6000, quantity: 1 },
      { id: 'meal-8', name: 'Chilled Lagos Chapman', price: 2000, quantity: 1 }
    ]
  },
  {
    id: '#AD-2046',
    customer: 'Ngozi Obi',
    phone: '+234 809 111 2233',
    zone: 'Ikoyi',
    address: '24 Glover Road, Ikoyi, Lagos',
    total: 19400,
    subtotal: 17600,
    deliveryFee: 1800,
    status: 'Out for delivery',
    statusColor: 'purple',
    time: '10:15 AM',
    date: 'Tuesday, 24 June',
    notes: 'Deliver to 3rd floor reception.',
    items: [
      { id: 'meal-2', name: 'Egusi & Pounded Yam', price: 7200, quantity: 1 },
      { id: 'meal-4', name: 'Suya Platter', price: 5000, quantity: 2 },
      { id: 'meal-8', name: 'Chilled Lagos Chapman', price: 2000, quantity: 1 }
    ]
  },
  {
    id: '#AD-2045',
    customer: 'Femi Lawal',
    phone: '+234 703 555 7788',
    zone: 'Ikeja',
    address: '15 Isaac John Street, GRA Ikeja, Lagos',
    total: 6500,
    subtotal: 5000,
    deliveryFee: 1500,
    status: 'Delivered',
    statusColor: 'green',
    time: '09:30 AM',
    date: 'Tuesday, 24 June',
    notes: 'Leave with estate security if not answering.',
    items: [
      { id: 'meal-4', name: 'Suya Platter', price: 5000, quantity: 1 }
    ]
  }
];

// Delivery Zones in Lagos
const DEFAULT_ZONES = [
  { id: 'zone-1', name: 'Lekki Phase 1', fee: 1500, estTime: '25-35 mins' },
  { id: 'zone-2', name: 'Victoria Island', fee: 1500, estTime: '30-40 mins' },
  { id: 'zone-3', name: 'Ikoyi', fee: 1800, estTime: '30-45 mins' },
  { id: 'zone-4', name: 'Oniru & Lekki Right', fee: 1600, estTime: '30-40 mins' },
  { id: 'zone-5', name: 'Chevron & Ikate', fee: 2000, estTime: '35-45 mins' },
  { id: 'zone-6', name: 'Ajah & Sangotedo', fee: 2800, estTime: '45-60 mins' },
  { id: 'zone-7', name: 'Yaba & Surulere', fee: 2500, estTime: '40-55 mins' },
  { id: 'zone-8', name: 'Ikeja & Maryland', fee: 3000, estTime: '45-60 mins' }
];

// Business & Kitchen Settings
const DEFAULT_SETTINGS = {
  kitchenName: 'Àdùn Kitchen',
  tagline: 'Authentic Nigerian Food, Delivered Fresh.',
  whatsappPhone: '+2348142004872', // Owner WhatsApp business phone
  displayPhone: '+234 814 200 4872',
  email: 'hello@adunkitchen.ng',
  address: 'Plot 14B Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  openingHours: 'Mon - Sat: 10:00am - 9:00pm | Sun: 12:00pm - 8:00pm',
  freeDeliveryThreshold: 35000,
  currency: '₦',
  ownerName: 'Amara Okoye',
  ownerRole: 'Owner & Head Chef'
};

class Store {
  constructor() {
    this.subscribers = [];
    this.init();
  }

  init() {
    // Load or initialize state from localStorage
    this.meals = this.load(STORAGE_KEYS.MEALS, DEFAULT_MEALS);
    this.orders = this.load(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
    this.cart = this.load(STORAGE_KEYS.CART, []);
    this.settings = this.load(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    this.zones = this.load(STORAGE_KEYS.ZONES, DEFAULT_ZONES);
    this.storeOpen = this.load(STORAGE_KEYS.STORE_OPEN, true);
    this.wishlist = this.load(STORAGE_KEYS.WISHLIST, ['meal-1']);
    this.selectedZoneId = this.zones[0]?.id || 'zone-1';
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Could not load ${key} from localStorage`, e);
      return fallback;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Could not save ${key} to localStorage`, e);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(fn => fn(this));
  }

  // --- Cart Actions ---
  addToCart(meal, quantity = 1, notes = '') {
    const existingIndex = this.cart.findIndex(item => item.id === meal.id);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
      if (notes) {
        this.cart[existingIndex].notes = notes;
      }
    } else {
      this.cart.push({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        category: meal.category,
        quantity: quantity,
        notes: notes || ''
      });
    }
    this.save(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }

  updateCartQuantity(mealId, delta) {
    const item = this.cart.find(i => i.id === mealId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter(i => i.id !== mealId);
      }
      this.save(STORAGE_KEYS.CART, this.cart);
      this.notify();
    }
  }

  removeFromCart(mealId) {
    this.cart = this.cart.filter(i => i.id !== mealId);
    this.save(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }

  clearCart() {
    this.cart = [];
    this.save(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }

  setSelectedZone(zoneId) {
    this.selectedZoneId = zoneId;
    this.notify();
  }

  getSelectedZone() {
    return this.zones.find(z => z.id === this.selectedZoneId) || this.zones[0] || { name: 'Lekki Phase 1', fee: 1500 };
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDeliveryFee() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= this.settings.freeDeliveryThreshold) return 0;
    const zone = this.getSelectedZone();
    return zone ? zone.fee : 1500;
  }

  getCartTotal() {
    return this.getCartSubtotal() + this.getDeliveryFee();
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // --- Wishlist Actions ---
  toggleWishlist(mealId) {
    if (this.wishlist.includes(mealId)) {
      this.wishlist = this.wishlist.filter(id => id !== mealId);
    } else {
      this.wishlist.push(mealId);
    }
    this.save(STORAGE_KEYS.WISHLIST, this.wishlist);
    this.notify();
  }

  isWishlisted(mealId) {
    return this.wishlist.includes(mealId);
  }

  // --- Orders Actions ---
  createOrder({ customer, phone, address, zoneName, notes = '', paymentMethod = 'Bank Transfer' }) {
    const subtotal = this.getCartSubtotal();
    const deliveryFee = this.getDeliveryFee();
    const total = subtotal + deliveryFee;
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#AD-${orderNum}`;

    const newOrder = {
      id: orderId,
      customer,
      phone,
      zone: zoneName,
      address,
      notes,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      status: 'Pending',
      statusColor: 'orange',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
      items: this.cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        notes: i.notes || ''
      }))
    };

    // Prepend to orders list
    this.orders.unshift(newOrder);
    this.save(STORAGE_KEYS.ORDERS, this.orders);

    // Update meal order counts
    this.cart.forEach(cartItem => {
      const meal = this.meals.find(m => m.id === cartItem.id);
      if (meal) {
        meal.ordersCount = (meal.ordersCount || 0) + cartItem.quantity;
        meal.totalSales = (meal.totalSales || 0) + (cartItem.price * cartItem.quantity);
      }
    });
    this.save(STORAGE_KEYS.MEALS, this.meals);

    // Clear cart
    this.clearCart();
    this.notify();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === 'Preparing') order.statusColor = 'orange';
      else if (newStatus === 'Confirmed') order.statusColor = 'blue';
      else if (newStatus === 'Out for delivery') order.statusColor = 'purple';
      else if (newStatus === 'Delivered') order.statusColor = 'green';
      else if (newStatus === 'Cancelled') order.statusColor = 'red';
      else order.statusColor = 'orange';

      this.save(STORAGE_KEYS.ORDERS, this.orders);
      this.notify();
    }
  }

  // --- Meals Admin Actions ---
  addMeal(mealData) {
    const newMeal = {
      id: `meal-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      ordersCount: 0,
      totalSales: 0,
      inStock: true,
      featured: mealData.featured || false,
      ...mealData
    };
    this.meals.unshift(newMeal);
    this.save(STORAGE_KEYS.MEALS, this.meals);
    this.notify();
    return newMeal;
  }

  updateMeal(mealId, updatedData) {
    const index = this.meals.findIndex(m => m.id === mealId);
    if (index > -1) {
      this.meals[index] = { ...this.meals[index], ...updatedData };
      this.save(STORAGE_KEYS.MEALS, this.meals);
      this.notify();
    }
  }

  deleteMeal(mealId) {
    this.meals = this.meals.filter(m => m.id !== mealId);
    this.save(STORAGE_KEYS.MEALS, this.meals);
    this.notify();
  }

  toggleMealStock(mealId) {
    const meal = this.meals.find(m => m.id === mealId);
    if (meal) {
      meal.inStock = !meal.inStock;
      this.save(STORAGE_KEYS.MEALS, this.meals);
      this.notify();
    }
  }

  // --- Settings Actions ---
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
    this.notify();
  }

  toggleStoreOpen() {
    this.storeOpen = !this.storeOpen;
    this.save(STORAGE_KEYS.STORE_OPEN, this.storeOpen);
    this.notify();
    return this.storeOpen;
  }

  updateZone(zoneId, updatedData) {
    const index = this.zones.findIndex(z => z.id === zoneId);
    if (index > -1) {
      this.zones[index] = { ...this.zones[index], ...updatedData };
      this.save(STORAGE_KEYS.ZONES, this.zones);
      this.notify();
    }
  }

  addZone(zoneData) {
    const newZone = {
      id: `zone-${Date.now()}`,
      ...zoneData
    };
    this.zones.push(newZone);
    this.save(STORAGE_KEYS.ZONES, this.zones);
    this.notify();
  }

  deleteZone(zoneId) {
    this.zones = this.zones.filter(z => z.id !== zoneId);
    this.save(STORAGE_KEYS.ZONES, this.zones);
    this.notify();
  }

  resetDemoData() {
    this.meals = [...DEFAULT_MEALS];
    this.orders = [...DEFAULT_ORDERS];
    this.zones = [...DEFAULT_ZONES];
    this.settings = { ...DEFAULT_SETTINGS };
    this.storeOpen = true;
    this.save(STORAGE_KEYS.MEALS, this.meals);
    this.save(STORAGE_KEYS.ORDERS, this.orders);
    this.save(STORAGE_KEYS.ZONES, this.zones);
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
    this.save(STORAGE_KEYS.STORE_OPEN, this.storeOpen);
    this.notify();
  }

  // Format currency helper
  formatNaira(amount) {
    return `₦${Number(amount || 0).toLocaleString('en-NG')}`;
  }

  // Generate WhatsApp Message for Order
  formatWhatsAppOrderMessage(order) {
    const itemsText = order.items.map(item => {
      const lineTotal = item.price * item.quantity;
      return `• ${item.quantity}x ${item.name} @ ${this.formatNaira(item.price)} = ${this.formatNaira(lineTotal)}`;
    }).join('\n');

    const cleanMsg = `🍽️ *NEW ORDER — ÀDÙN KITCHEN*
──────────────────────
*Order ID:* ${order.id}
*Customer:* ${order.customer}
*Phone:* ${order.phone}
*Delivery Zone:* ${order.zone}
*Delivery Address:* ${order.address}
${order.notes ? `*Special Instructions:* ${order.notes}\n` : ''}*Payment Preference:* ${order.paymentMethod || 'Bank Transfer on WhatsApp'}

*ORDER ITEMS:*
${itemsText}

──────────────────────
*Subtotal:* ${this.formatNaira(order.subtotal)}
*Delivery Fee:* ${order.deliveryFee === 0 ? 'FREE' : this.formatNaira(order.deliveryFee)}
*TOTAL TO PAY:* ${this.formatNaira(order.total)}
──────────────────────
_Kindly confirm my order and send your account details for transfer. Thank you!_`;

    return cleanMsg;
  }

  getWhatsAppLink(order) {
    const rawNumber = this.settings.whatsappPhone || '+2348142004872';
    // Clean to only digits
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = this.formatWhatsAppOrderMessage(order);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  }
}

export const store = new Store();
