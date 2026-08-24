import React, { useState } from 'react';
import { Language } from '../types';
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
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDemo: (scenario?: string) => void;
  onOpenWhitepaper: () => void;
  activeView: 'home' | 'products';
  onViewChange: (view: 'home' | 'products') => void;
  onSelectIndustry: (id: 'legal' | 'healthcare' | 'finance') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenDemo,
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

  const whitepaperUpdatingText: Record<Language, string> = {
    'zh-CN': '白皮书 (更新中)',
    'zh-TW': '白皮書 (更新中)',
    en: 'Whitepaper (Updating)',
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              onViewChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 group cursor-pointer text-left"
          >
            {/* High-tech Geometric Logo */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <div className="w-5 h-5 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-xs"></div>
                </div>
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Covar<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">AI</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  v3.1
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider block">
                {lang === 'en' ? 'ZERO-TRUST CONFIDENTIAL AGENT INFRA' : '大模型零信任密态基建'}
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {activeView === 'home' ? (
            <>
              {/* Solutions Dropdown Menu */}
              <div className="relative group py-2">
                <a
                  href="#solutions"
                  className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{t.solutions}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
                </a>

                {/* Submenu for specific industries */}
                <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                  <button
                    onClick={() => {
                      onSelectIndustry('legal');
                      const el = document.getElementById('solutions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between"
                  >
                    <span>{t.legal}</span>
                    <span className="text-[10px] font-mono text-cyan-400/80">FRE 502</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectIndustry('healthcare');
                      const el = document.getElementById('solutions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-white/5 hover:text-purple-300 transition-colors flex items-center justify-between"
                  >
                    <span>{t.healthcare}</span>
                    <span className="text-[10px] font-mono text-purple-400/80">HIPAA</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectIndustry('finance');
                      const el = document.getElementById('solutions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-white/5 hover:text-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span>{t.finance}</span>
                    <span className="text-[10px] font-mono text-emerald-400/80">Quant</span>
                  </button>
                </div>
              </div>

              {/* Value & ROI */}
              <a
                href="#values"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1"
              >
                {t.valueProps}
              </a>

              {/* Switch to Deep-Tech View */}
              <button
                onClick={() => {
                  onViewChange('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center gap-1.5 transition-all glow-cyan cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.productsTech}</span>
              </button>
            </>
          ) : (
            <>
              {/* Products View Nav Links */}
              <button
                onClick={() => {
                  onViewChange('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sm font-medium text-cyan-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.switchToHome}</span>
              </button>

              <a
                href="#crisis"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1"
              >
                {t.crisis}
              </a>
              <a
                href="#onion"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1"
              >
                {t.onion}
              </a>
              <a
                href="#performance"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1"
              >
                {t.performance}
              </a>
              <a
                href="#deployment"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1"
              >
                {t.deployment}
              </a>
            </>
          )}

          {/* Whitepaper - Disabled / Updating state until official release */}
          <div
            className="text-sm font-medium text-gray-500 flex items-center gap-1.5 cursor-not-allowed opacity-60 select-none py-1"
            title={lang === 'en' ? 'Whitepaper is currently being updated for official release' : '技术白皮书正在更新中，正式版发布后开放下载'}
          >
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            <span>{t.whitepaper}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-gray-400 border border-zinc-700 flex items-center gap-1 font-mono">
              <Clock className="w-2.5 h-2.5" />
              {lang === 'en' ? 'UPDATING' : '更新中'}
            </span>
          </div>
        </div>

        {/* Right: Language Selector & Request Demo CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-switch-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer"
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

          {/* Primary CTA: Request Demo */}
          <button
            id="nav-request-demo-btn"
            onClick={() => onOpenDemo()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>{t.requestDemo}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-white/10 px-6 py-5 backdrop-blur-2xl animate-fade-in space-y-4">
          {activeView === 'home' ? (
            <>
              <button
                onClick={() => {
                  onViewChange('products');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left py-2.5 text-sm font-semibold text-cyan-300 flex items-center justify-between border-b border-white/5"
              >
                <span>{t.productsTech}</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </button>

              <div className="py-2 border-b border-white/5">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-2">
                  {t.solutions}
                </span>
                <div className="grid grid-cols-1 gap-2 pl-2">
                  <button
                    onClick={() => {
                      onSelectIndustry('legal');
                      setMobileMenuOpen(false);
                      const el = document.getElementById('solutions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left text-sm text-gray-300 hover:text-cyan-400 py-1"
                  >
                    {t.legal}
                  </button>
                  <button
                    onClick={() => {
                      onSelectIndustry('healthcare');
                      setMobileMenuOpen(false);
                      const el = document.getElementById('solutions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left text-sm text-gray-300 hover:text-purple-400 py-1"
                  >
                    {t.healthcare}
                  </button>
                  <button
                    onClick={() => {
                      onSelectIndustry('finance');
                      setMobileMenuOpen(false);
                      const el = document.getElementById('solutions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left text-sm text-gray-300 hover:text-emerald-400 py-1"
                  >
                    {t.finance}
                  </button>
                </div>
              </div>

              <a
                href="#values"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 border-b border-white/5"
              >
                {t.valueProps}
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onViewChange('home');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left py-2 text-sm font-semibold text-cyan-300 flex items-center justify-between border-b border-white/5"
              >
                <span>{t.switchToHome}</span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </button>
              <a
                href="#crisis"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 border-b border-white/5"
              >
                {t.crisis}
              </a>
              <a
                href="#onion"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 border-b border-white/5"
              >
                {t.onion}
              </a>
              <a
                href="#performance"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 border-b border-white/5"
              >
                {t.performance}
              </a>
              <a
                href="#deployment"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 border-b border-white/5"
              >
                {t.deployment}
              </a>
            </>
          )}

          {/* Mobile Whitepaper item - Disabled / Grayed out */}
          <div
            className="w-full py-2 text-sm font-medium text-gray-500 flex items-center justify-between opacity-60 cursor-not-allowed select-none"
          >
            <span>{t.whitepaper}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-gray-400 border border-zinc-700 flex items-center gap-1 font-mono">
              <Clock className="w-2.5 h-2.5" />
              {lang === 'en' ? 'UPDATING' : '更新中'}
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm text-center shadow-lg shadow-cyan-500/20"
            >
              {t.requestDemo}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
