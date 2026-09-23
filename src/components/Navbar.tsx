import React, { useState, useEffect } from 'react';
import { Language, ActivePageView } from '../types';
import { translations } from '../translations';
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  FileText,
  Layers,
  Cpu,
  Clock,
  Briefcase,
  ShieldCheck,
  Code2,
  Sparkles,
  Home,
  Flame,
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onRequestDemo: (scenario?: string) => void;
  onOpenWhitepaper: () => void;
  activeView: ActivePageView;
  onViewChange: (view: ActivePageView) => void;
  onSelectIndustry: (id: 'legal' | 'healthcare' | 'finance') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onRequestDemo,
  onOpenWhitepaper,
  activeView,
  onViewChange,
  onSelectIndustry,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang].nav;

  const languageLabels: Record<Language, string> = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    en: 'English',
  };

  const navHubs = [
    {
      id: 'home' as const,
      label: lang === 'en' ? 'Overview' : lang === 'zh-TW' ? '總覽首頁' : '总览首页',
      icon: Home,
    },
    {
      id: 'executive' as const,
      label: lang === 'en' ? 'Business & ROI' : lang === 'zh-TW' ? '商業與 ROI' : '商业与 ROI',
      badge: 'CFO / CEO',
      icon: Briefcase,
      accent: 'emerald',
    },
    {
      id: 'security' as const,
      label: lang === 'en' ? 'Security & Trust' : lang === 'zh-TW' ? '安全與合規' : '安全与合规',
      badge: 'CISO / DPO',
      icon: ShieldCheck,
      accent: 'rose',
    },
    {
      id: 'developer' as const,
      label: lang === 'en' ? 'Developers' : lang === 'zh-TW' ? '架構與開發' : '架构与开发',
      badge: 'Architect',
      icon: Code2,
      accent: 'cyan',
    },
  ];

  const showSolidBackground = isScrolled || mobileMenuOpen || activeView !== 'home';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
        showSolidBackground
          ? 'bg-[#040e08]/90 backdrop-blur-xl border-b border-[#1f794d]/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Left: Brand Logo & Title */}
        <div className="shrink-0 flex items-center min-w-0">
          <button
            onClick={() => {
              onViewChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 sm:space-x-2.5 lg:space-x-3 group cursor-pointer text-left focus:outline-none"
          >
            {/* High-tech Geometric Logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-[#1f794d] via-[#092915] to-[#4ee48b] p-[1px] shadow-lg shadow-[#4ee48b]/20 group-hover:shadow-[#4ee48b]/40 transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-[#05160b] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-tr from-[#1f794d] to-[#4ee48b] rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#05160b] rounded-xs"></div>
                </div>
                <div className="absolute inset-0 bg-[#4ee48b]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#4ee48b] transition-colors truncate">
                  Covar<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ee48b] to-[#80f2b0]">AI</span>
                </span>
                <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/5 text-[#80f2b0] border border-white/10 shrink-0 backdrop-blur-sm">
                  v3.2
                </span>
              </div>
              <span className="hidden 2xl:block text-[8px] lg:text-[9px] text-[#80f2b0]/70 font-mono tracking-wider uppercase whitespace-nowrap">
                {lang === 'en' ? 'Confidential Agent Infra' : '大模型零信任密态基建'}
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Persona Hub Nav Buttons (Airy Translucent Glass Capsule) */}
        <div className={`hidden xl:flex items-center gap-1 xl:gap-1.5 shrink-0 p-1 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
          showSolidBackground
            ? 'bg-[#061c0e]/80 border-[#1f794d]/40'
            : 'bg-white/[0.04] border-white/10 hover:border-white/20'
        }`}>
          {navHubs.map((hub) => {
            const Icon = hub.icon;
            const isActive = activeView === hub.id;
            const isEmerald = hub.accent === 'emerald';
            const isRose = hub.accent === 'rose';
            const isCyan = hub.accent === 'cyan';

            let activeClass = 'bg-gradient-to-r from-[#4ee48b] to-[#38d677] text-[#05160b] font-bold shadow-md shadow-[#4ee48b]/20';
            if (isActive && isEmerald) activeClass = 'bg-gradient-to-r from-[#80f2b0] to-[#4ee48b] text-[#05160b] font-bold shadow-md shadow-[#4ee48b]/20';
            if (isActive && isRose) activeClass = 'bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold shadow-md shadow-rose-500/20';
            if (isActive && isCyan) activeClass = 'bg-gradient-to-r from-[#0099ff] to-[#00d2ff] text-white font-bold shadow-md shadow-[#0099ff]/20';

            return (
              <button
                key={hub.id}
                onClick={() => {
                  onViewChange(hub.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? activeClass
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{hub.label}</span>
                {hub.badge && (
                  <span className={`text-[8px] xl:text-[9px] px-1 py-0.2 rounded font-mono hidden 2xl:inline-block ${
                    isActive ? 'bg-black/20 text-current' : 'bg-black/30 text-gray-400'
                  }`}>
                    {hub.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Solutions Dropdown */}
          <div className="relative group py-1">
            <button
              onClick={() => {
                if (activeView !== 'home') onViewChange('home');
                setTimeout(() => {
                  const el = document.getElementById('solutions');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.solutions}</span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform shrink-0" />
            </button>

            <div className="absolute top-full left-0 mt-2 w-44 rounded-xl bg-[#061c0e]/95 border border-[#1f794d]/40 shadow-2xl backdrop-blur-xl py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
              <button
                onClick={() => {
                  if (activeView !== 'home') onViewChange('home');
                  onSelectIndustry('legal');
                  setTimeout(() => {
                    const el = document.getElementById('solutions');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#092915] hover:text-[#4ee48b] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.legal}</span>
                <span className="text-[10px] font-mono text-[#fbbf24]">FRE 502</span>
              </button>
              <button
                onClick={() => {
                  if (activeView !== 'home') onViewChange('home');
                  onSelectIndustry('healthcare');
                  setTimeout(() => {
                    const el = document.getElementById('solutions');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#092915] hover:text-[#4ee48b] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.healthcare}</span>
                <span className="text-[10px] font-mono text-[#00d2ff]">HIPAA</span>
              </button>
              <button
                onClick={() => {
                  if (activeView !== 'home') onViewChange('home');
                  onSelectIndustry('finance');
                  setTimeout(() => {
                    const el = document.getElementById('solutions');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#092915] hover:text-[#4ee48b] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.finance}</span>
                <span className="text-[10px] font-mono text-[#4ee48b]">Quant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Language Selector, Whitepaper & Request Demo CTA */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-switch-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all cursor-pointer whitespace-nowrap"
              aria-label="Language Selector"
            >
              <Globe className="w-3.5 h-3.5 text-[#4ee48b] shrink-0" />
              <span className="hidden sm:inline text-xs">{languageLabels[lang]}</span>
              <span className="sm:hidden text-[10px] font-mono">
                {lang === 'en' ? 'EN' : lang === 'zh-TW' ? '繁' : '简'}
              </span>
              <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 shrink-0" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-[#061c0e]/95 border border-[#1f794d]/40 shadow-2xl backdrop-blur-xl py-1 z-50">
                {(['zh-CN', 'zh-TW', 'en'] as Language[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      onLanguageChange(item);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                      lang === item
                        ? 'text-[#4ee48b] font-semibold bg-[#092915]'
                        : 'text-gray-300 hover:bg-[#092915] hover:text-white'
                    }`}
                  >
                    <span>{languageLabels[item]}</span>
                    {lang === item && <span className="w-1.5 h-1.5 rounded-full bg-[#4ee48b]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Whitepaper Button - Disabled / Updating State */}
          <div
            className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 cursor-not-allowed select-none whitespace-nowrap backdrop-blur-md"
            title={lang === 'en' ? 'Technical Whitepaper is currently being updated for official release' : '技术白皮书正在完善中，后续正式放出'}
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{lang === 'en' ? 'Whitepaper' : '白皮书'}</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-zinc-400 border border-white/10 font-mono">
              {lang === 'en' ? 'Updating' : '完善中'}
            </span>
          </div>

          {/* Request Demo / POC Action Button - Multi-Hue Flow Gradient */}
          <button
            onClick={() => onRequestDemo()}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#4ee48b] via-[#38d677] to-[#00d2ff] hover:brightness-110 text-[#05160b] font-bold text-xs flex items-center gap-1 sm:gap-1.5 shadow-lg shadow-[#4ee48b]/20 hover:shadow-[#4ee48b]/35 transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#05160b] shrink-0" />
            <span className="hidden xs:inline">{lang === 'en' ? 'Book POC Demo' : '预约方案 POC'}</span>
            <span className="xs:hidden">{lang === 'en' ? 'Book POC' : '预约 POC'}</span>
          </button>

          {/* Mobile/Tablet Menu Trigger - Visible up to XL screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer backdrop-blur-md"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-3 pb-6 bg-[#040e08]/98 border-b border-[#1f794d]/40 space-y-3 backdrop-blur-2xl">
          <div className="text-[11px] font-mono text-[#4ee48b] uppercase tracking-wider px-2">
            {lang === 'en' ? 'Decision Portals' : '角色专属决策通道'}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navHubs.map((hub) => {
              const Icon = hub.icon;
              const isActive = activeView === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => {
                    onViewChange(hub.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#092915] border-[#4ee48b] text-[#4ee48b]'
                      : 'bg-[#05160b] border-[#1f794d]/30 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#4ee48b] mb-1" />
                  <div className="text-xs font-bold">{hub.label}</div>
                  {hub.badge && <div className="text-[10px] text-gray-400 font-mono">{hub.badge}</div>}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#1f794d]/20 space-y-1">
            <button
              onClick={() => {
                if (activeView !== 'home') onViewChange('home');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left py-2 px-2 text-xs font-medium text-gray-300 hover:text-[#4ee48b] flex items-center justify-between cursor-pointer"
            >
              <span>{t.solutions}</span>
              <span className="text-[10px] text-gray-400 font-mono">Legal / Med / Quant</span>
            </button>
            <div
              className="w-full text-left py-2 px-2 text-xs font-medium text-zinc-500 flex items-center justify-between cursor-not-allowed select-none"
              title={lang === 'en' ? 'Technical Whitepaper is currently being updated for official release' : '技术白皮书正在完善中，后续正式放出'}
            >
              <div className="flex items-center gap-1.5">
                <span>{lang === 'en' ? 'Security & TCO Whitepaper' : '技术与 TCO 白皮书'}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {lang === 'en' ? 'Updating' : '完善中'}
                </span>
              </div>
              <FileText className="w-3.5 h-3.5 text-zinc-600" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
