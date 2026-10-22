// src/App.jsx
import React from 'react';
import { useApp } from './context/AppContext';

// Storefront Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import FeaturedMenu from './components/FeaturedMenu';
import FamilyFeastPromo from './components/FamilyFeastPromo';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Modals
import CartDrawer from './components/CartDrawer';
import WhatsAppCheckoutModal from './components/WhatsAppCheckoutModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import MealDetailModal from './components/MealDetailModal';

// Admin
import AdminAccess from './admin/AdminAccess';

export default function App() {
  const { currentView, toastMessage, setCurrentView } = useApp();

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast-notification toast-${toastMessage.type || 'success'}`}>
          <div className="toast-dot"></div>
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Main Views */}
      {currentView === 'admin' ? (
        <AdminAccess onExit={() => setCurrentView('storefront')} />
      ) : (
        <div className="storefront-view">
          <Navbar />
          <main>
            <Hero />
            <CategoryFilter />
            <FeaturedMenu />
            <FamilyFeastPromo />
            <HowItWorks />
            <Testimonials />
          </main>
          <Footer />
        </div>
      )}

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <WhatsAppCheckoutModal />
      <OrderConfirmationModal />
      <MealDetailModal />
    </div>
  );
}
