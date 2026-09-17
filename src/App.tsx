import React, { useState, useEffect } from 'react';
import { TabType, SiteContent, ProductSystem } from './types';
import {
  INITIAL_SITE_CONTENT,
  PRODUCT_SYSTEMS,
  normalizeSiteContent,
  normalizeProducts,
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomeView } from './components/views/HomeView';
import { CatalogView } from './components/views/CatalogView';
import { AboutView } from './components/views/AboutView';
import { QuoteView } from './components/views/QuoteView';
import { AdminView } from './components/views/AdminView';
import { PinGate } from './components/admin/PinGate';

const LS_CONTENT = 'vya_site_content';
const LS_PRODUCTS = 'vya_catalog';
const SS_UNLOCK = 'vya_admin_unlock';

const isAdminRequested = () =>
  new URLSearchParams(window.location.search).get('admin') === '1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>(() =>
    isAdminRequested() ? 'admin' : 'inicio'
  );
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(
    () => sessionStorage.getItem(SS_UNLOCK) === '1'
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(LS_CONTENT);
      if (saved) {
        return normalizeSiteContent(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return INITIAL_SITE_CONTENT;
  });

  const [products, setProducts] = useState<ProductSystem[]>(() => {
    try {
      const saved = localStorage.getItem(LS_PRODUCTS);
      if (saved) {
        return normalizeProducts(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Error reading catalog from localStorage', e);
    }
    return PRODUCT_SYSTEMS;
  });

  const [catalogFilter, setCatalogFilter] = useState<string>('todos');
  const [quoteProductType, setQuoteProductType] = useState<string>('Ventanas arquitectónicas');

  // Sync content updates to localStorage
  const handleUpdateContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    try {
      localStorage.setItem(LS_CONTENT, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Error writing to localStorage', e);
    }
  };

  // Sync catalog updates to localStorage
  const handleUpdateProducts = (newProducts: ProductSystem[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(newProducts));
    } catch (e) {
      console.warn('Error writing catalog to localStorage', e);
    }
  };

  const handleSelectTab = (tab: TabType) => {
    if (tab === 'cotizar' && !siteContent.quotingEnabled) {
      setCurrentTab('inicio');
      setMobileSidebarOpen(false);
      return;
    }
    setCurrentTab(tab);
    setMobileSidebarOpen(false);
  };

  // If quoting becomes disabled while viewing the quote tab, redirect home
  useEffect(() => {
    if (currentTab === 'cotizar' && !siteContent.quotingEnabled) {
      setCurrentTab('inicio');
      setMobileSidebarOpen(false);
    }
  }, [currentTab, siteContent.quotingEnabled]);

  const handleFilterFromHome = (category: string) => {
    setCatalogFilter(category);
    setCurrentTab('catalogo');
  };

  const handleSelectProductForQuote = (productTitle: string, category: string) => {
    if (!siteContent.quotingEnabled) return;
    const formatted = `${productTitle} (${category.charAt(0).toUpperCase() + category.slice(1)})`;
    setQuoteProductType(formatted);
    setCurrentTab('cotizar');
  };

  const handleUnlockAdmin = () => {
    sessionStorage.setItem(SS_UNLOCK, '1');
    setAdminUnlocked(true);
  };

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-row relative font-sans selection:bg-[#1e3a8a] selection:text-white">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        phone={siteContent.phone}
        email={siteContent.email}
        whatsappNumber={siteContent.whatsappNumber}
        quotingEnabled={siteContent.quotingEnabled}
      />

      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <TopHeader
          currentTab={currentTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onSelectTab={handleSelectTab}
          phone={siteContent.phone}
          email={siteContent.email}
          quotingEnabled={siteContent.quotingEnabled}
        />

        <main className="flex-1 w-full">
          {currentTab === 'inicio' && (
            <HomeView
              content={siteContent}
              onSelectTab={handleSelectTab}
              onFilterCategory={handleFilterFromHome}
              quotingEnabled={siteContent.quotingEnabled}
            />
          )}

          {currentTab === 'catalogo' && (
            <CatalogView
              products={products}
              onSelectTab={handleSelectTab}
              initialFilter={catalogFilter}
              onSelectProductForQuote={handleSelectProductForQuote}
              quotingEnabled={siteContent.quotingEnabled}
            />
          )}

          {currentTab === 'nosotros' && (
            <AboutView
              content={siteContent}
              onSelectTab={handleSelectTab}
              quotingEnabled={siteContent.quotingEnabled}
            />
          )}

          {currentTab === 'cotizar' && (
            <QuoteView
              phone={siteContent.phone}
              email={siteContent.email}
              whatsappNumber={siteContent.whatsappNumber}
              initialProductType={quoteProductType}
            />
          )}

          {currentTab === 'admin' &&
            (adminUnlocked ? (
              <AdminView
                content={siteContent}
                products={products}
                onUpdateContent={handleUpdateContent}
                onUpdateProducts={handleUpdateProducts}
                onSelectTab={handleSelectTab}
              />
            ) : (
              <PinGate
                pin={siteContent.adminPin}
                onUnlock={handleUnlockAdmin}
                onCancel={() => setCurrentTab('inicio')}
              />
            ))}
        </main>

        <Footer
          onSelectTab={handleSelectTab}
          phone={siteContent.phone}
          email={siteContent.email}
          quotingEnabled={siteContent.quotingEnabled}
        />
      </div>

      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        quotingEnabled={siteContent.quotingEnabled}
      />
    </div>
  );
}