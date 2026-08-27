import React, { useState, useEffect } from 'react';
import { Language, ActivePageView, IndustryScenarioId } from './types';
import { Navbar } from './components/Navbar';
import { BusinessHero } from './components/BusinessHero';
import { PersonaSelectorCards } from './components/PersonaSelectorCards';
import { PromptSandboxMatrix } from './components/PromptSandboxMatrix';
import { IndustryScenariosSection } from './components/IndustryScenariosSection';
import { BusinessValueSection } from './components/BusinessValueSection';
import { DeploymentCTA } from './components/DeploymentCTA';
import { ExecutiveHub } from './components/ExecutiveHub';
import { SecurityHub } from './components/SecurityHub';
import { DeveloperHub } from './components/DeveloperHub';
import { ProductsTechView } from './components/ProductsTechView';
import { WhitepaperModal } from './components/WhitepaperModal';
import { DemoModal } from './components/DemoModal';
import { MobileQuickDrawer } from './components/MobileQuickDrawer';
import { getInitialLanguage, persistLanguage } from './utils/language';

// Declare AOS global for TypeScript
declare global {
  interface Window {
    AOS?: {
      init: (options?: Record<string, unknown>) => void;
      refresh: () => void;
    };
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => getInitialLanguage());
  const [activeView, setActiveView] = useState<ActivePageView>('home');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryScenarioId>('legal');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [preselectedScenario, setPreselectedScenario] = useState<string | undefined>();

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'zh-TW' ? 'zh-TW' : 'en';
    document.documentElement.setAttribute('data-lang', lang);

    // Dynamic SEO Titles & Meta Description Updates for Search Engines & Social Sharing
    if (activeView === 'executive') {
      document.title = lang === 'en'
        ? 'CovarAI Executive — Slash 70%+ GPU TCO with Zero Hardware CapEx'
        : lang === 'zh-TW'
        ? 'CovarAI 商業與管理決策 — 算力 TCO 直降 70%+，告別重資產機房'
        : 'CovarAI 商业与管理决策 — 算力 TCO 直降 70%+，告别重资产机房';
    } else if (activeView === 'security') {
      document.title = lang === 'en'
        ? 'CovarAI Security — Zero-Plaintext in VRAM & FRE 502 Legal Exemption'
        : lang === 'zh-TW'
        ? 'CovarAI 安全與合規中心 — 顯存 0 明文、數學不可逆與特權豁免'
        : 'CovarAI 安全与合规中心 — 显存 0 明文、数学不可逆与特权豁免';
    } else if (activeView === 'developer') {
      document.title = lang === 'en'
        ? 'CovarAI Developer — 3-Line Transparent Proxy & <3.5% Latency'
        : lang === 'zh-TW'
        ? 'CovarAI 架構與開發者 — 3 行代碼無感代理與 671B 微秒級延遲'
        : 'CovarAI 架构与开发者 — 3 行代码无感代理与 671B 微秒级延迟';
    } else if (activeView === 'products') {
      document.title = lang === 'en'
        ? 'CovarAI Tech — Algebraic Covariance & Zero-Plaintext MoE Architecture'
        : lang === 'zh-TW'
        ? 'CovarAI 產品與技術架構 — 代數協變混淆與零明文 MoE 密態計算'
        : 'CovarAI 产品与技术架构 — 代数协变混淆与零明文 MoE 密态计算';
    } else {
      document.title = lang === 'en'
        ? 'CovarAI — Confidential AI Infrastructure for Regulated Enterprises'
        : lang === 'zh-TW'
        ? 'CovarAI — 企業級大模型密態計算與智能體安全基礎設施'
        : 'CovarAI — 企业级大模型密态计算与智能体安全基础设施';
    }

    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic',
        offset: 50,
      });
      window.AOS.refresh();
    }
  }, [lang, activeView, selectedIndustry]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    persistLanguage(newLang);
    setTimeout(() => {
      if (window.AOS) {
        window.AOS.refresh();
      }
    }, 50);
  };

  const handleOpenDemoModal = (scenarioName?: string) => {
    setPreselectedScenario(scenarioName);
    setIsDemoModalOpen(true);
  };

  const handleSelectIndustry = (id: IndustryScenarioId) => {
    setSelectedIndustry(id);
    if (activeView !== 'home') {
      setActiveView('home');
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300 antialiased relative overflow-x-hidden">
      {/* Background Ambient Mesh Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-black to-black pointer-events-none -z-20" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Dynamic Top Navbar */}
      <Navbar
        lang={lang}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLanguageChange={handleLanguageChange}
        onSelectIndustry={handleSelectIndustry}
        onRequestDemo={() => handleOpenDemoModal()}
        onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
      />

      {/* Main View Router */}
      <main>
        {activeView === 'home' && (
          /* Streamlined Landing Page with Persona Fast-Track & Interactive Sandbox */
          <div className="animate-fade-in">
            {/* Section 1: Business Value Hero */}
            <BusinessHero
              lang={lang}
              onRequestDemo={() => handleOpenDemoModal()}
              onSelectIndustry={(id) => {
                setSelectedIndustry(id);
                const el = document.getElementById('solutions');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSwitchToProducts={() => {
                setActiveView('developer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
            />

            {/* Section 2: Persona Fast-Track Gateways (CFO / CISO / Dev) */}
            <PersonaSelectorCards
              lang={lang}
              onSelectView={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRequestDemo={handleOpenDemoModal}
            />

            {/* Section 3: Interactive Light Sandbox Proof */}
            <section className="py-14 bg-black/60 border-y border-white/5 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PromptSandboxMatrix lang={lang} />
              </div>
            </section>

            {/* Section 4: Interactive Vertical Industry Deep Dives */}
            <IndustryScenariosSection
              lang={lang}
              selectedIndustry={selectedIndustry}
              onSelectIndustry={setSelectedIndustry}
              onRequestDemo={handleOpenDemoModal}
            />

            {/* Section 5: Enterprise Business Value Pillars & Client Social Proof */}
            <BusinessValueSection
              lang={lang}
              onSwitchToProducts={() => {
                setActiveView('developer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRequestDemo={() => handleOpenDemoModal()}
            />

            {/* Section 6: Dual-Mode Enterprise Delivery & Booking Footer */}
            <DeploymentCTA
              lang={lang}
              onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
            />
          </div>
        )}

        {activeView === 'executive' && (
          /* Business & Executive Decision Hub (CFO / CEO / Strategy) */
          <ExecutiveHub
            lang={lang}
            onBackToHome={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestDemo={handleOpenDemoModal}
            onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
          />
        )}

        {activeView === 'security' && (
          /* CISO, Security & Compliance Trust Center (CISO / DPO / Red Team) */
          <SecurityHub
            lang={lang}
            onBackToHome={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestDemo={handleOpenDemoModal}
            onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
          />
        )}

        {activeView === 'developer' && (
          /* Chief Architect & Developer Hub (Architect / AI Engineer) */
          <DeveloperHub
            lang={lang}
            onBackToHome={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestDemo={handleOpenDemoModal}
            onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
          />
        )}

        {activeView === 'products' && (
          /* Products & Deep-Tech Sub-page */
          <ProductsTechView
            lang={lang}
            onBackToHome={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestDemo={() => handleOpenDemoModal()}
            onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile Floating Quick Dock & Bottom Sheet Drawer */}
      <MobileQuickDrawer
        lang={lang}
        activeView={activeView}
        selectedIndustry={selectedIndustry}
        isOpen={isMobileDrawerOpen}
        onToggleOpen={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        onClose={() => setIsMobileDrawerOpen(false)}
        onViewChange={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectIndustry={handleSelectIndustry}
        onRequestDemo={() => handleOpenDemoModal()}
        onOpenWhitepaper={() => setIsWhitepaperModalOpen(true)}
      />

      {/* Interactive Modals */}
      <WhitepaperModal
        isOpen={isWhitepaperModalOpen}
        onClose={() => setIsWhitepaperModalOpen(false)}
        lang={lang}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        lang={lang}
        initialScenario={preselectedScenario}
      />
    </div>
  );
}
