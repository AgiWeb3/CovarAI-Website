import React, { useState } from 'react';
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

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/85 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap w-full">
        {/* Left: Brand Logo & Title */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={() => {
              onViewChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer text-left"
          >
            {/* High-tech Geometric Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-xs"></div>
                </div>
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Covar<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">AI</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  v3.2
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-gray-400 font-mono tracking-wider block uppercase whitespace-nowrap">
                {lang === 'en' ? 'Confidential Agent Infra' : '大模型零信任密态基建'}
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Persona Hub Nav Buttons */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0 bg-zinc-950/70 p-1.5 rounded-2xl border border-white/10">
          {navHubs.map((hub) => {
            const Icon = hub.icon;
            const isActive = activeView === hub.id;
            const isEmerald = hub.accent === 'emerald';
            const isRose = hub.accent === 'rose';
            const isCyan = hub.accent === 'cyan';

            let activeClass = 'bg-white/15 text-white shadow-sm border border-white/20';
            if (isActive && isEmerald) activeClass = 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
            if (isActive && isRose) activeClass = 'bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]';
            if (isActive && isCyan) activeClass = 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]';

            return (
              <button
                key={hub.id}
                onClick={() => {
                  onViewChange(hub.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? activeClass
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{hub.label}</span>
                {hub.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono hidden xl:inline-block ${
                    isActive ? 'bg-white/10 text-white' : 'bg-zinc-800 text-gray-400'
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
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-gray-200 hover:bg-white/5 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.solutions}</span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform" />
            </button>

            <div className="absolute top-full left-0 mt-2 w-44 rounded-xl bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
              <button
                onClick={() => {
                  if (activeView !== 'home') onViewChange('home');
                  onSelectIndustry('legal');
                  setTimeout(() => {
                    const el = document.getElementById('solutions');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.legal}</span>
                <span className="text-[10px] font-mono text-cyan-400/80">FRE 502</span>
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
                className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-purple-300 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.healthcare}</span>
                <span className="text-[10px] font-mono text-purple-400/80">HIPAA</span>
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
                className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.finance}</span>
                <span className="text-[10px] font-mono text-emerald-400/80">Quant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Language Selector & Request Demo CTA */}
        <div className="shrink-0 flex items-center space-x-2 sm:space-x-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-switch-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer whitespace-nowrap"
              aria-label="Language Selector"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{languageLabels[lang]}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl py-1 z-50">
                {(['zh-CN', 'zh-TW', 'en'] as Language[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      onLanguageChange(item);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                      lang === item
                        ? 'text-cyan-400 font-semibold bg-white/5'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{languageLabels[item]}</span>
                    {lang === item && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Whitepaper Button */}
          <button
            onClick={onOpenWhitepaper}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'Whitepaper' : '白皮书'}</span>
          </button>

          {/* Request Demo / POC Action Button */}
          <button
            onClick={() => onRequestDemo()}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>{lang === 'en' ? 'Book POC Demo' : '预约方案 POC'}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-zinc-950/98 border-b border-white/10 space-y-3">
          <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider px-2">
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
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isActive
                      ? 'bg-white/10 border-cyan-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400 mb-1" />
                  <div className="text-xs font-bold">{hub.label}</div>
                  {hub.badge && <div className="text-[10px] text-gray-400 font-mono">{hub.badge}</div>}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1">
            <button
              onClick={() => {
                if (activeView !== 'home') onViewChange('home');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left py-2 px-2 text-xs font-medium text-gray-300 hover:text-cyan-300 flex items-center justify-between"
            >
              <span>{t.solutions}</span>
              <span className="text-[10px] text-gray-500 font-mono">Legal / Med / Quant</span>
            </button>
            <button
              onClick={() => {
                onOpenWhitepaper();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-2 text-xs font-medium text-gray-300 hover:text-cyan-300 flex items-center justify-between"
            >
              <span>{lang === 'en' ? 'Security & TCO Whitepaper' : '技术与 TCO 白皮书'}</span>
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
