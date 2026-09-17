import React, { useState, useEffect } from 'react';
import { TabType, SiteContent, ProductSystem } from './types';
import { INITIAL_SITE_CONTENT, PRODUCT_SYSTEMS } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomeView } from './components/views/HomeView';
import { CatalogView } from './components/views/CatalogView';
import { AboutView } from './components/views/AboutView';
import { QuoteView } from './components/views/QuoteView';
import { AdminView } from './components/views/AdminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('vya_site_content');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return INITIAL_SITE_CONTENT;
  });

  const [products] = useState<ProductSystem[]>(PRODUCT_SYSTEMS);
  const [catalogFilter, setCatalogFilter] = useState<string>('todos');
  const [quoteProductType, setQuoteProductType] = useState<string>('Ventanas arquitectónicas');

  // Sync content updates to localStorage
  const handleUpdateContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    try {
      localStorage.setItem('vya_site_content', JSON.stringify(newContent));
    } catch (e) {
      console.warn('Error writing to localStorage', e);
    }
  };

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    setMobileSidebarOpen(false);
  };

  const handleFilterFromHome = (category: string) => {
    setCatalogFilter(category);
    setCurrentTab('catalogo');
  };

  const handleSelectProductForQuote = (productTitle: string, category: string) => {
    const formatted = `${productTitle} (${category.charAt(0).toUpperCase() + category.slice(1)})`;
    setQuoteProductType(formatted);
    setCurrentTab('cotizar');
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
      {/* SIDEBAR NAVIGATION
          - Sticky and persistent on desktop (lg:flex)
          - Slide-out collapsible drawer on mobile/tablet (desplegable)
      */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        phone={siteContent.phone}
        email={siteContent.email}
      />

      {/* MAIN VIEWPORT
          - Proportioned for desktop with smooth fluid layout
          - Fully responsive across mobile, tablet, and wide desktop screens
      */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header with breadcrumb, direct call, and admin shortcut */}
        <TopHeader
          currentTab={currentTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onSelectTab={handleSelectTab}
          phone={siteContent.phone}
          email={siteContent.email}
        />

        {/* View Content */}
        <main className="flex-1 w-full">
          {currentTab === 'inicio' && (
            <HomeView
              content={siteContent}
              onSelectTab={handleSelectTab}
              onFilterCategory={handleFilterFromHome}
            />
          )}

          {currentTab === 'catalogo' && (
            <CatalogView
              products={products}
              onSelectTab={handleSelectTab}
              initialFilter={catalogFilter}
              onSelectProductForQuote={handleSelectProductForQuote}
            />
          )}

          {currentTab === 'nosotros' && (
            <AboutView
              onSelectTab={handleSelectTab}
              experienceYears={siteContent.experienceYears}
            />
          )}

          {currentTab === 'cotizar' && (
            <QuoteView
              phone={siteContent.phone}
              email={siteContent.email}
              initialProductType={quoteProductType}
            />
          )}

          {currentTab === 'admin' && (
            <AdminView
              content={siteContent}
              onUpdateContent={handleUpdateContent}
              onSelectTab={handleSelectTab}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onSelectTab={handleSelectTab}
          phone={siteContent.phone}
          email={siteContent.email}
        />
      </div>

      {/* Mobile Bottom Navigation (Quick thumb switching on phones as seen in screenshots) */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
