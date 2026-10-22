// src/context/AppContext.jsx - Central State Context for Àdùn Kitchen
import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEYS = {
  MEALS: 'adun_meals_react_v1',
  ORDERS: 'adun_orders_react_v1',
  CART: 'adun_cart_react_v1',
  SETTINGS: 'adun_settings_react_v1',
  ZONES: 'adun_zones_react_v1',
  STORE_OPEN: 'adun_store_open_react_v1',
  WISHLIST: 'adun_wishlist_react_v1'
};

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
    longDescription: 'Fresh live catfish simmered gently in a fragrant, clear broth infused with traditional medicinal spices including uziza seeds, uda pods, calabash nutmeg, and fresh scent leaves.',
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
    tag: 'FAVOURITE',
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
    description: 'Classic Lagos mocktail with Angostura bitters, fresh cucumber, and citrus.',
    longDescription: 'Hand-crafted Nigerian Chapman served over crushed ice with Angostura aromatic bitters, citrus slices, cucumber, and a splash of blackcurrant.',
    image: '/images/drinks.jpg',
    inStock: true,
    ordersCount: 45,
    totalSales: 90000,
    featured: false
  }
];

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
    status: 'Preparing',
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
    time: '09:30 AM',
    date: 'Tuesday, 24 June',
    notes: 'Leave with estate security if not answering.',
    items: [
      { id: 'meal-4', name: 'Suya Platter', price: 5000, quantity: 1 }
    ]
  }
];

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

const DEFAULT_SETTINGS = {
  kitchenName: 'Àdùn Kitchen',
  tagline: 'Authentic Nigerian Food, Delivered Fresh.',
  whatsappPhone: '+2348142004872',
  displayPhone: '+234 814 200 4872',
  email: 'hello@adunkitchen.ng',
  address: 'Plot 14B Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  openingHours: 'Mon - Sat: 10:00am - 9:00pm | Sun: 12:00pm - 8:00pm',
  freeDeliveryThreshold: 35000,
  currency: '₦',
  ownerName: 'Amara Okoye',
  ownerRole: 'Owner'
};

const AppContext = createContext(null);

// Browser storage is untrusted input: parse defensively and fall back when it
// has been edited, truncated, or written by an older version of the app.
const readStored = (key, fallback, isValid = () => true) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const value = JSON.parse(raw);
    return isValid(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const isArray = (value) => Array.isArray(value);

export function AppProvider({ children }) {
  // Navigation State
  const [currentView, setCurrentViewState] = useState(() => window.location.pathname === '/admin' ? 'admin' : 'storefront');
  const setCurrentView = (view) => {
    const nextPath = view === 'admin' ? '/admin' : '/';
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setCurrentViewState(view);
  };
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'menu' | 'orders' | 'delivery' | 'settings'

  // Data State with LocalStorage Persistence
  const [meals, setMeals] = useState(() => {
    return readStored(STORAGE_KEYS.MEALS, DEFAULT_MEALS, isArray);
  });

  const [orders, setOrders] = useState(() => {
    return readStored(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS, isArray);
  });

  const [cart, setCart] = useState(() => {
    return readStored(STORAGE_KEYS.CART, [], (value) => isArray(value) && value.every((item) => item && typeof item.id === 'string' && Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0));
  });

  const [settings, setSettings] = useState(() => {
    return readStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS, (value) => value && typeof value === 'object' && !Array.isArray(value));
  });

  const [zones, setZones] = useState(() => {
    return readStored(STORAGE_KEYS.ZONES, DEFAULT_ZONES, isArray);
  });

  const [storeOpen, setStoreOpen] = useState(() => {
    return readStored(STORAGE_KEYS.STORE_OPEN, true, (value) => typeof value === 'boolean');
  });

  const [wishlist, setWishlist] = useState(() => {
    return readStored(STORAGE_KEYS.WISHLIST, ['meal-1'], isArray);
  });

  const [selectedZoneId, setSelectedZoneId] = useState(zones[0]?.id || 'zone-1');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedMealDetails, setSelectedMealDetails] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handlePopState = () => setCurrentViewState(window.location.pathname === '/admin' ? 'admin' : 'storefront');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Admin Modals
  const [isAdminMealModalOpen, setIsAdminMealModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [selectedAdminOrder, setSelectedAdminOrder] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals)); } catch {}
  }, [meals]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)); } catch {}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); } catch {}
  }, [settings]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones)); } catch {}
  }, [zones]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.STORE_OPEN, JSON.stringify(storeOpen)); } catch {}
  }, [storeOpen]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist)); } catch {}
  }, [wishlist]);

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 3000);
  };

  // Helper: Currency formatting
  const formatNaira = (amount) => {
    return `₦${Number(amount || 0).toLocaleString('en-NG')}`;
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0] || { name: 'Lekki Phase 1', fee: 1500 };
  const deliveryFee = cartSubtotal === 0 ? 0 : (cartSubtotal >= settings.freeDeliveryThreshold ? 0 : selectedZone.fee);
  const cartTotal = cartSubtotal + deliveryFee;

  // Cart actions
  const addToCart = (meal, quantity = 1, notes = '') => {
    if (!storeOpen) {
      showToast('The kitchen is closed right now. Please check back during opening hours.', 'info');
      return;
    }
    if (!meal || typeof meal.id !== 'string' || !Number.isFinite(Number(meal.price)) || Number(meal.price) < 0 || !Number.isInteger(quantity) || quantity < 1 || quantity > 20 || meal.inStock === false) {
      showToast('This item is unavailable right now.', 'info');
      return;
    }
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === meal.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity,
          notes: notes || next[idx].notes
        };
        return next;
      }
      return [...prev, {
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        category: meal.category,
        quantity,
        notes: notes || ''
      }];
    });
    showToast(`Added ${quantity}x "${meal.name}" to cart!`);
  };

  const updateCartQuantity = (mealId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === mealId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (mealId) => {
    setCart(prev => prev.filter(i => i.id !== mealId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (mealId) => {
    setWishlist(prev => {
      const exists = prev.includes(mealId);
      const next = exists ? prev.filter(id => id !== mealId) : [...prev, mealId];
      showToast(exists ? 'Removed from favourites' : 'Added to favourites!');
      return next;
    });
  };

  // WhatsApp Order Generation
  const formatWhatsAppOrderMessage = (order) => {
    const itemsText = order.items.map(item => {
      const lineTotal = item.price * item.quantity;
      return `• ${item.quantity}x ${item.name} @ ${formatNaira(item.price)} = ${formatNaira(lineTotal)}`;
    }).join('\n');

    return `🍽️ *NEW ORDER — ÀDÙN KITCHEN*
──────────────────────
*Order ID:* ${order.id}
*Customer:* ${order.customer}
*Phone:* ${order.phone}
*Delivery Zone:* ${order.zone}
*Delivery Address:* ${order.address}
${order.notes ? `*Special Notes:* ${order.notes}\n` : ''}*Payment Preference:* ${order.paymentMethod || 'Bank Transfer on WhatsApp'}

*ORDER ITEMS:*
${itemsText}

──────────────────────
*Subtotal:* ${formatNaira(order.subtotal)}
*Delivery Fee:* ${order.deliveryFee === 0 ? 'FREE' : formatNaira(order.deliveryFee)}
*TOTAL TO PAY:* ${formatNaira(order.total)}
──────────────────────
_Kindly confirm my order and send your account details for transfer. Thank you!_`;
  };

  const getWhatsAppLink = (order) => {
    const rawNumber = settings.whatsappPhone || '+2348142004872';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = formatWhatsAppOrderMessage(order);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  // Create Order from Checkout
  const createOrder = ({ customer, phone, address, zoneName, notes = '', paymentMethod = 'Bank Transfer' }) => {
    const orderNum = globalThis.crypto?.randomUUID?.().slice(0, 8).toUpperCase() || `${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
    const orderId = `#AD-${orderNum}`;
    const newOrder = {
      id: orderId,
      customer,
      phone,
      zone: zoneName || selectedZone.name,
      address,
      notes,
      paymentMethod,
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      status: 'Pending',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        notes: i.notes || ''
      }))
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update meal statistics
    setMeals(prev => {
      return prev.map(m => {
        const itemInCart = cart.find(c => c.id === m.id);
        if (itemInCart) {
          return {
            ...m,
            ordersCount: (m.ordersCount || 0) + itemInCart.quantity,
            totalSales: (m.totalSales || 0) + (itemInCart.price * itemInCart.quantity)
          };
        }
        return m;
      });
    });

    clearCart();
    return newOrder;
  };

  // Admin Order Status Update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} updated to "${newStatus}"`);
  };

  // Admin Meals Actions
  const addMeal = (mealData) => {
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
    setMeals(prev => [newMeal, ...prev]);
    showToast(`Added new meal: "${newMeal.name}"!`);
    return newMeal;
  };

  const updateMeal = (mealId, updatedData) => {
    setMeals(prev => prev.map(m => m.id === mealId ? { ...m, ...updatedData } : m));
    showToast('Meal updated successfully');
  };

  const deleteMeal = (mealId) => {
    setMeals(prev => prev.filter(m => m.id !== mealId));
    showToast('Meal deleted', 'info');
  };

  const toggleMealStock = (mealId) => {
    setMeals(prev => prev.map(m => {
      if (m.id === mealId) {
        const nextStock = !m.inStock;
        showToast(`"${m.name}" is now ${nextStock ? 'In Stock' : 'Out of Stock'}`);
        return { ...m, inStock: nextStock };
      }
      return m;
    }));
  };

  const toggleStoreOpen = () => {
    setStoreOpen(prev => {
      const next = !prev;
      showToast(`Kitchen is now ${next ? 'OPEN' : 'CLOSED'}`);
      return next;
    });
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully');
  };

  const updateZone = (zoneId, zoneData) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, ...zoneData } : z));
    showToast('Delivery zone updated');
  };

  const addZone = (zoneData) => {
    const newZone = { id: `zone-${Date.now()}`, ...zoneData };
    setZones(prev => [...prev, newZone]);
    showToast('Delivery zone added');
  };

  const deleteZone = (zoneId) => {
    setZones(prev => prev.filter(z => z.id !== zoneId));
    showToast('Delivery zone removed');
  };

  const resetDemoData = () => {
    setMeals(DEFAULT_MEALS);
    setOrders(DEFAULT_ORDERS);
    setZones(DEFAULT_ZONES);
    setSettings(DEFAULT_SETTINGS);
    setStoreOpen(true);
    showToast('Demo data restored to defaults');
  };

  const value = {
    currentView,
    setCurrentView,
    adminTab,
    setAdminTab,
    meals,
    orders,
    cart,
    settings,
    zones,
    storeOpen,
    wishlist,
    selectedZoneId,
    setSelectedZoneId,
    selectedZone,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    selectedMealDetails,
    setSelectedMealDetails,
    orderConfirmation,
    setOrderConfirmation,
    toastMessage,
    showToast,
    isAdminMealModalOpen,
    setIsAdminMealModalOpen,
    editingMeal,
    setEditingMeal,
    selectedAdminOrder,
    setSelectedAdminOrder,
    cartSubtotal,
    cartCount,
    deliveryFee,
    cartTotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    createOrder,
    updateOrderStatus,
    addMeal,
    updateMeal,
    deleteMeal,
    toggleMealStock,
    toggleStoreOpen,
    updateSettings,
    updateZone,
    addZone,
    deleteZone,
    resetDemoData,
    formatNaira,
    formatWhatsAppOrderMessage,
    getWhatsAppLink
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
