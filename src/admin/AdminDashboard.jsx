// src/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Utensils, 
  Receipt, 
  MapPin, 
  Settings as SettingsIcon, 
  ArrowLeft, 
  Search, 
  Plus, 
  ShoppingBag, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  AlertCircle,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Phone,
  MessageCircle,
  RefreshCw,
  X,
  Upload
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const {
    adminTab,
    setAdminTab,
    orders,
    meals,
    settings,
    storeOpen,
    toggleStoreOpen,
    formatNaira,
    updateOrderStatus,
    addMeal,
    updateMeal,
    deleteMeal,
    toggleMealStock,
    zones,
    updateZone,
    addZone,
    deleteZone,
    updateSettings,
    resetDemoData
  } = useApp();

  // Search in admin
  const [adminSearch, setAdminSearch] = useState('');
  
  // Modals inside Admin
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Meal Form State
  const [mealForm, setMealForm] = useState({
    name: '',
    category: 'Rice Dishes',
    price: '',
    description: '',
    prepTime: '25-35 mins',
    spiceLevel: 'Medium Spicy',
    tag: 'NEW',
    tagColor: 'orange',
    image: '/images/jollof.jpg',
    inStock: true
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Add Zone Form State
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneFee, setNewZoneFee] = useState('');
  const [newZoneTime, setNewZoneTime] = useState('30-45 mins');

  // Open Edit Meal
  const openEditMeal = (meal) => {
    setEditingMeal(meal);
    setMealForm({
      name: meal.name,
      category: meal.category,
      price: meal.price,
      description: meal.description,
      prepTime: meal.prepTime || '25-35 mins',
      spiceLevel: meal.spiceLevel || 'Medium Spicy',
      tag: meal.tag || '',
      tagColor: meal.tagColor || 'orange',
      image: meal.image,
      inStock: meal.inStock
    });
    setIsAddMealOpen(true);
  };

  const handleMealSubmit = (e) => {
    e.preventDefault();
    if (!mealForm.name || !mealForm.price) return;

    if (editingMeal) {
      updateMeal(editingMeal.id, {
        ...mealForm,
        price: Number(mealForm.price)
      });
    } else {
      addMeal({
        ...mealForm,
        price: Number(mealForm.price)
      });
    }
    setIsAddMealOpen(false);
    setEditingMeal(null);
    setMealForm({
      name: '',
      category: 'Rice Dishes',
      price: '',
      description: '',
      prepTime: '25-35 mins',
      spiceLevel: 'Medium Spicy',
      tag: 'NEW',
      tagColor: 'orange',
      image: '/images/jollof.jpg',
      inStock: true
    });
  };

  // Image Upload handler (Base64)
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMealForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Status Pill Color Helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Preparing': return 'status-badge-orange';
      case 'Confirmed': return 'status-badge-blue';
      case 'Out for delivery': return 'status-badge-purple';
      case 'Delivered': return 'status-badge-green';
      case 'Pending': return 'status-badge-yellow';
      case 'Cancelled': return 'status-badge-red';
      default: return 'status-badge-orange';
    }
  };

  // Calculated Stats
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 186500);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  const ordersCount = orders.length + 20;
  const avgOrder = Math.round(totalSales / (ordersCount || 1));

  return (
    <div className="admin-layout">
      {/* ── Left Sidebar (Exact Screenshot Match) ── */}
      <aside className="admin-sidebar">
        {/* Top Brand Logo */}
        <div className="admin-brand-header">
          <div className="brand-badge light">
            <span className="brand-badge-letter">À</span>
          </div>
          <div className="brand-text">
            <span className="brand-title text-white">Àdùn</span>
            <span className="brand-subtitle text-orange">KITCHEN</span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="admin-nav-list">
          <button 
            onClick={() => setAdminTab('overview')} 
            className={`admin-nav-item ${adminTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </button>

          <button 
            onClick={() => setAdminTab('menu')} 
            className={`admin-nav-item ${adminTab === 'menu' ? 'active' : ''}`}
          >
            <Utensils size={19} />
            <span>Menu items</span>
          </button>

          <button 
            onClick={() => setAdminTab('orders')} 
            className={`admin-nav-item ${adminTab === 'orders' ? 'active' : ''}`}
          >
            <Receipt size={19} />
            <span>Orders</span>
            {pendingOrdersCount > 0 && (
              <span className="admin-nav-counter">{pendingOrdersCount}</span>
            )}
          </button>

          <button 
            onClick={() => setAdminTab('delivery')} 
            className={`admin-nav-item ${adminTab === 'delivery' ? 'active' : ''}`}
          >
            <MapPin size={19} />
            <span>Delivery</span>
          </button>

          <button 
            onClick={() => setAdminTab('settings')} 
            className={`admin-nav-item ${adminTab === 'settings' ? 'active' : ''}`}
          >
            <SettingsIcon size={19} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Sidebar Bottom Profile & View Storefront */}
        <div className="admin-sidebar-bottom">
          <button 
            onClick={onLogout} 
            className="admin-view-storefront-btn"
          >
            <ArrowLeft size={16} />
            <span>Sign out</span>
          </button>

          <div className="admin-user-profile">
            <div className="admin-avatar">AO</div>
            <div className="admin-user-meta">
              <span className="admin-user-name">Amara Okoye</span>
              <span className="admin-user-role">Owner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-title-group">
            <span className="admin-topbar-date">{new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <h1 className="admin-topbar-title">
              {adminTab === 'overview' && 'Overview'}
              {adminTab === 'menu' && 'Menu Items'}
              {adminTab === 'orders' && 'Orders Management'}
              {adminTab === 'delivery' && 'Delivery Zones'}
              {adminTab === 'settings' && 'Kitchen Settings'}
            </h1>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-search-box">
              <Search size={17} className="admin-search-icon" />
              <input 
                type="text" 
                placeholder="Search orders, meals..." 
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="admin-search-input"
              />
            </div>

            {/* Store Open / Closed Status Pill */}
            <button 
              onClick={toggleStoreOpen}
              className={`store-status-pill ${storeOpen ? 'open' : 'closed'}`}
              title="Click to toggle store open/closed"
            >
              <span className="dot"></span>
              <span>{storeOpen ? 'Store open' : 'Store closed'}</span>
            </button>
          </div>
        </header>

        <div className="admin-demo-notice" role="note">
          <AlertCircle size={17} />
          <span><strong>Browser-stored data.</strong> Admin sign-in protects this interface, but menu, settings, and orders are saved only in this browser. They are not shared with other devices or stored in a central database.</span>
        </div>

        {/* ── TAB 1: OVERVIEW (Exact Screenshot Match) ── */}
        {adminTab === 'overview' && (
          <div className="admin-content-container">
            {/* Dark Green Welcome Banner */}
            <div className="admin-welcome-banner">
              <div className="welcome-banner-text">
                <span className="welcome-eyebrow">GOOD MORNING, AMARA</span>
                <h2 className="welcome-title">Your kitchen is doing well today.</h2>
                <p className="welcome-subtitle">
                  You have {pendingOrdersCount} active orders and 2 meals running low.
                </p>
              </div>

              <button 
                onClick={() => {
                  setEditingMeal(null);
                  setMealForm({
                    name: '',
                    category: 'Rice Dishes',
                    price: '',
                    description: '',
                    prepTime: '25-35 mins',
                    spiceLevel: 'Medium Spicy',
                    tag: 'NEW',
                    tagColor: 'orange',
                    image: '/images/jollof.jpg',
                    inStock: true
                  });
                  setIsAddMealOpen(true);
                }} 
                className="btn-add-new-meal-header"
              >
                <span>Add new meal</span>
                <Plus size={18} />
              </button>
            </div>

            {/* 4 Stat Cards */}
            <div className="admin-stats-grid">
              {/* Card 1: Today's sales */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Today's sales</span>
                  <div className="stat-card-icon-circle">
                    <ShoppingBag size={18} />
                  </div>
                </div>
                <div className="stat-card-value">₦186,500</div>
                <div className="stat-card-trend trend-green">
                  <span>+12.5%</span>
                </div>
              </div>

              {/* Card 2: Orders today */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Orders today</span>
                  <div className="stat-card-icon-circle">
                    <Receipt size={18} />
                  </div>
                </div>
                <div className="stat-card-value">24</div>
                <div className="stat-card-trend trend-green">
                  <span>+8.2%</span>
                </div>
              </div>

              {/* Card 3: Average order */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Average order</span>
                  <div className="stat-card-icon-circle">
                    <ShoppingBag size={18} />
                  </div>
                </div>
                <div className="stat-card-value">₦7,770</div>
                <div className="stat-card-trend trend-green">
                  <span>+4.1%</span>
                </div>
              </div>

              {/* Card 4: Pending orders */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Pending orders</span>
                  <div className="stat-card-icon-circle">
                    <Clock size={18} />
                  </div>
                </div>
                <div className="stat-card-value">6</div>
                <div className="stat-card-trend trend-orange">
                  <span>Needs attention</span>
                </div>
              </div>
            </div>

            {/* Split Bottom Section: Recent Orders & Top Meals */}
            <div className="admin-overview-bottom-grid">
              {/* Left Box: Recent Orders Table */}
              <div className="admin-panel recent-orders-panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Recent orders</h3>
                    <p className="panel-subtitle">Manage today's incoming orders.</p>
                  </div>
                  <button 
                    onClick={() => setAdminTab('orders')} 
                    className="panel-view-all-link"
                  >
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-orders-table">
                    <thead>
                      <tr>
                        <th>ORDER</th>
                        <th>CUSTOMER</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr 
                          key={order.id} 
                          onClick={() => setSelectedOrder(order)} 
                          className="clickable-row"
                        >
                          <td className="font-semibold text-gray-900">{order.id}</td>
                          <td>{order.customer}</td>
                          <td className="font-medium">{formatNaira(order.total)}</td>
                          <td>
                            <span className={`status-pill ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Box: Top Meals List */}
              <div className="admin-panel top-meals-panel">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title">Top meals</h3>
                    <p className="panel-subtitle">Best sellers this week</p>
                  </div>
                </div>

                <div className="top-meals-list">
                  {meals.slice(0, 4).map((meal, index) => (
                    <div key={meal.id} className="top-meal-row">
                      <span className="rank-number">{index + 1}</span>
                      <img src={meal.image} alt={meal.name} className="top-meal-thumb" />
                      <div className="top-meal-info">
                        <h4 className="top-meal-name">{meal.name}</h4>
                        <span className="top-meal-orders">{meal.ordersCount || 30} orders</span>
                      </div>
                      <span className="top-meal-revenue">{formatNaira(meal.totalSales || 200000)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: MENU ITEMS ── */}
        {adminTab === 'menu' && (
          <div className="admin-content-container">
            <div className="admin-page-actions-row">
              <div className="action-left">
                <h2 className="admin-section-heading">Manage Kitchen Menu ({meals.length} Meals)</h2>
                <p className="admin-section-sub">Add, edit pricing, update descriptions, and toggle item availability.</p>
              </div>

              <button 
                onClick={() => {
                  setEditingMeal(null);
                  setMealForm({
                    name: '',
                    category: 'Rice Dishes',
                    price: '',
                    description: '',
                    prepTime: '25-35 mins',
                    spiceLevel: 'Medium Spicy',
                    tag: 'NEW',
                    tagColor: 'orange',
                    image: '/images/jollof.jpg',
                    inStock: true
                  });
                  setIsAddMealOpen(true);
                }} 
                className="btn-add-meal-primary"
              >
                <Plus size={18} />
                <span>Add New Meal</span>
              </button>
            </div>

            <div className="admin-panel">
              <div className="admin-table-wrapper">
                <table className="admin-menu-table">
                  <thead>
                    <tr>
                      <th>IMAGE</th>
                      <th>MEAL NAME</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>PREP TIME</th>
                      <th>STOCK</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals.map(meal => (
                      <tr key={meal.id}>
                        <td>
                          <img src={meal.image} alt={meal.name} className="admin-meal-row-thumb" />
                        </td>
                        <td>
                          <div className="font-semibold text-gray-900">{meal.name}</div>
                          {meal.tag && (
                            <span className={`inline-badge badge-${meal.tagColor || 'orange'}`}>
                              {meal.tag}
                            </span>
                          )}
                        </td>
                        <td>{meal.category}</td>
                        <td className="font-semibold text-gray-900">{formatNaira(meal.price)}</td>
                        <td>{meal.prepTime || '25-35 mins'}</td>
                        <td>
                          <button 
                            onClick={() => toggleMealStock(meal.id)}
                            className={`stock-toggle-btn ${meal.inStock ? 'in-stock' : 'out-of-stock'}`}
                            title="Click to toggle stock"
                          >
                            {meal.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td>
                          <div className="table-actions-group">
                            <button 
                              onClick={() => openEditMeal(meal)}
                              className="action-icon-btn edit"
                              title="Edit meal"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Delete "${meal.name}"?`)) deleteMeal(meal.id);
                              }}
                              className="action-icon-btn delete"
                              title="Delete meal"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: ORDERS MANAGEMENT ── */}
        {adminTab === 'orders' && (
          <div className="admin-content-container">
            <div className="admin-page-actions-row">
              <div className="action-left">
                <h2 className="admin-section-heading">Orders Management ({orders.length})</h2>
                <p className="admin-section-sub">Track order statuses, customer contact, and delivery notes.</p>
              </div>

              {/* Status Filter Tabs */}
              <div className="orders-filter-pills">
                {['All', 'Pending', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered', 'Cancelled'].map(st => (
                  <button 
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`filter-pill ${orderStatusFilter === st ? 'active' : ''}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-panel">
              <div className="admin-table-wrapper">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>ORDER REF</th>
                      <th>CUSTOMER</th>
                      <th>PHONE</th>
                      <th>ZONE</th>
                      <th>ITEMS</th>
                      <th>TOTAL</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter(o => orderStatusFilter === 'All' || o.status === orderStatusFilter)
                      .map(order => (
                        <tr key={order.id}>
                          <td className="font-bold text-gray-900">{order.id}</td>
                          <td>{order.customer}</td>
                          <td>
                            <a 
                              href={`https://wa.me/${order.phone?.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="phone-wa-link"
                              title="Chat with customer on WhatsApp"
                            >
                              <MessageCircle size={14} className="text-green-600" />
                              <span>{order.phone}</span>
                            </a>
                          </td>
                          <td>{order.zone}</td>
                          <td>
                            <span className="items-count-badge">
                              {order.items?.reduce((s, i) => s + i.quantity, 0) || 1} items
                            </span>
                          </td>
                          <td className="font-semibold">{formatNaira(order.total)}</td>
                          <td>
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className={`status-select ${getStatusBadgeClass(order.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for delivery">Out for delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="btn-view-order-detail"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: DELIVERY SETTINGS ── */}
        {adminTab === 'delivery' && (
          <div className="admin-content-container">
            <div className="admin-page-actions-row">
              <div className="action-left">
                <h2 className="admin-section-heading">Lagos Delivery Zones & Fees</h2>
                <p className="admin-section-sub">Configure service zones, delivery costs, and estimated times.</p>
              </div>
            </div>

            <div className="delivery-grid-layout">
              {/* Left Column: Existing Zones */}
              <div className="admin-panel">
                <h3 className="panel-title mb-4">Active Delivery Zones ({zones.length})</h3>
                <div className="zones-list">
                  {zones.map(z => (
                    <div key={z.id} className="zone-row-card">
                      <div className="zone-info">
                        <h4 className="zone-name">{z.name}</h4>
                        <span className="zone-time">{z.estTime || '30-45 mins'}</span>
                      </div>
                      <div className="zone-controls">
                        <span className="zone-fee-badge">{formatNaira(z.fee)}</span>
                        <button 
                          onClick={() => deleteZone(z.id)} 
                          className="action-icon-btn delete"
                          title="Delete zone"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Add New Zone */}
              <div className="admin-panel">
                <h3 className="panel-title mb-4">Add New Delivery Area</h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newZoneName || !newZoneFee) return;
                    addZone({
                      name: newZoneName,
                      fee: Number(newZoneFee),
                      estTime: newZoneTime
                    });
                    setNewZoneName('');
                    setNewZoneFee('');
                  }}
                  className="zone-form"
                >
                  <div className="form-group">
                    <label className="form-label">Zone / Neighborhood Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Magodo Phase 2, Ikoyi..." 
                      value={newZoneName}
                      onChange={(e) => setNewZoneName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Fee (₦) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 2000" 
                      value={newZoneFee}
                      onChange={(e) => setNewZoneFee(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Delivery Duration</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 30-45 mins" 
                      value={newZoneTime}
                      onChange={(e) => setNewZoneTime(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <button type="submit" className="btn-primary-orange w-full">
                    <Plus size={17} />
                    <span>Save Delivery Area</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: SETTINGS ── */}
        {adminTab === 'settings' && (
          <div className="admin-content-container">
            <div className="admin-page-actions-row">
              <div className="action-left">
                <h2 className="admin-section-heading">Business & WhatsApp Settings</h2>
                <p className="admin-section-sub">Configure your WhatsApp phone number, operating hours, and kitchen details.</p>
              </div>

              <button 
                onClick={resetDemoData} 
                className="btn-reset-demo"
                title="Restore default sample meals and orders"
              >
                <RefreshCw size={16} />
                <span>Reset Demo Data</span>
              </button>
            </div>

            <div className="admin-panel max-w-2xl">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(settingsForm);
                }} 
                className="settings-form"
              >
                <div className="form-group">
                  <label className="form-label">Kitchen / Business Name</label>
                  <input 
                    type="text" 
                    value={settingsForm.kitchenName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, kitchenName: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>WhatsApp Order Phone Number *</span>
                    <span className="text-xs text-orange ml-2">(Orders are sent here)</span>
                  </label>
                  <input 
                    type="text" 
                    value={settingsForm.whatsappPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappPhone: e.target.value })}
                    className="form-input font-mono"
                    placeholder="+2348142004872"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Display Phone Number</label>
                  <input 
                    type="text" 
                    value={settingsForm.displayPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, displayPhone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kitchen Street Address</label>
                  <input 
                    type="text" 
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Operating Hours</label>
                  <input 
                    type="text" 
                    value={settingsForm.openingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Free Delivery Threshold (₦)</label>
                  <input 
                    type="number" 
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary-orange">
                  <span>Save Kitchen Settings</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL: Add / Edit Meal ── */}
      {isAddMealOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddMealOpen(false)}>
          <div className="modal-card meal-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingMeal ? 'Edit Meal' : 'Add New Meal'}</h3>
              <button onClick={() => setIsAddMealOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMealSubmit} className="meal-admin-form">
              <div className="form-group">
                <label className="form-label">Meal Name *</label>
                <input 
                  type="text" 
                  value={mealForm.name}
                  onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                  placeholder="e.g. Asun Spicy Goat Meat"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select 
                    value={mealForm.category}
                    onChange={(e) => setMealForm({ ...mealForm, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="Rice Dishes">Rice Dishes</option>
                    <option value="Soups">Soups</option>
                    <option value="Swallows">Swallows</option>
                    <option value="Grills">Grills</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Combos">Combos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price in Naira (₦) *</label>
                  <input 
                    type="number" 
                    value={mealForm.price}
                    onChange={(e) => setMealForm({ ...mealForm, price: e.target.value })}
                    placeholder="6500"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Preparation Time</label>
                  <input 
                    type="text" 
                    value={mealForm.prepTime}
                    onChange={(e) => setMealForm({ ...mealForm, prepTime: e.target.value })}
                    placeholder="25-35 mins"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Badge Tag (e.g. BESTSELLER)</label>
                  <input 
                    type="text" 
                    value={mealForm.tag}
                    onChange={(e) => setMealForm({ ...mealForm, tag: e.target.value })}
                    placeholder="BESTSELLER, POPULAR, HOT"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description *</label>
                <textarea 
                  rows={2}
                  value={mealForm.description}
                  onChange={(e) => setMealForm({ ...mealForm, description: e.target.value })}
                  placeholder="Appetizing summary of ingredients and taste..."
                  className="form-textarea"
                  required
                />
              </div>

              {/* Image Preview & Upload */}
              <div className="form-group">
                <label className="form-label">Food Image</label>
                <div className="image-upload-box">
                  <img src={mealForm.image} alt="Preview" className="upload-preview-thumb" />
                  <div className="upload-input-group">
                    <label className="btn-file-upload">
                      <Upload size={16} />
                      <span>Upload from Device</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileChange} 
                        style={{ display: 'none' }}
                      />
                    </label>
                    <input 
                      type="text" 
                      placeholder="Or enter Image URL" 
                      value={mealForm.image.startsWith('data:') ? 'Custom uploaded image' : mealForm.image}
                      onChange={(e) => setMealForm({ ...mealForm, image: e.target.value })}
                      className="form-input mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer-btns">
                <button type="button" onClick={() => setIsAddMealOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-orange">
                  {editingMeal ? 'Update Meal' : 'Add Meal to Kitchen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Order Details ── */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">ORDER DETAILS</span>
                <h3 className="modal-title">{selectedOrder.id} — {selectedOrder.customer}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="order-details-body">
              <div className="order-details-summary-grid">
                <div>
                  <span className="detail-meta-label">Customer Phone</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold">{selectedOrder.phone}</span>
                    <a 
                      href={`https://wa.me/${selectedOrder.phone?.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-chat-wa-sm"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div>
                  <span className="detail-meta-label">Delivery Zone</span>
                  <p className="font-semibold mt-1">{selectedOrder.zone}</p>
                </div>

                <div>
                  <span className="detail-meta-label">Date & Time</span>
                  <p className="font-semibold mt-1">{selectedOrder.date || 'Today'} at {selectedOrder.time}</p>
                </div>

                <div>
                  <span className="detail-meta-label">Payment Preference</span>
                  <p className="font-semibold mt-1">{selectedOrder.paymentMethod || 'Bank Transfer'}</p>
                </div>
              </div>

              <div className="address-box-display mt-3">
                <span className="detail-meta-label">Delivery Street Address</span>
                <p className="font-medium mt-1">{selectedOrder.address}</p>
              </div>

              {selectedOrder.notes && (
                <div className="notes-box-display mt-3">
                  <span className="detail-meta-label">Customer Notes</span>
                  <p className="italic mt-1">"{selectedOrder.notes}"</p>
                </div>
              )}

              <div className="items-breakdown-box mt-4">
                <span className="detail-meta-label">Ordered Items</span>
                <ul className="items-list mt-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <li key={idx} className="item-row">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatNaira(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="items-total-row">
                  <span>Total Amount</span>
                  <span className="font-bold text-orange">{formatNaira(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Status Update */}
              <div className="status-update-box mt-4">
                <label className="form-label">Update Order Status</label>
                <div className="flex gap-2">
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value);
                      setSelectedOrder(prev => ({ ...prev, status: e.target.value }));
                    }}
                    className="form-input flex-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
