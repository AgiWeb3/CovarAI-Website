import React from 'react';
import {
  Compass,
  Scale,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Cpu,
  Sparkles,
  X,
  Layers,
  Calculator,
  Flame,
  BarChart3,
  Boxes,
  ArrowRight,
  ArrowUp,
  Briefcase,
  Code2,
  Home,
  CheckCircle2,
  Lock,
  Binary,
} from 'lucide-react';
import { Language, ActivePageView, IndustryScenarioId } from '../types';
import { translations } from '../translations';

interface MobileQuickDrawerProps {
  lang: Language;
  activeView: ActivePageView;
  selectedIndustry: IndustryScenarioId;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
  onViewChange: (view: ActivePageView) => void;
  onSelectIndustry: (id: IndustryScenarioId) => void;
  onRequestDemo: (scenarioName?: string) => void;
  onOpenWhitepaper: () => void;
}

export const MobileQuickDrawer: React.FC<MobileQuickDrawerProps> = ({
  lang,
  activeView,
  selectedIndustry,
  isOpen,
  onToggleOpen,
  onClose,
  onViewChange,
  onSelectIndustry,
  onRequestDemo,
  onOpenWhitepaper,
}) => {
  const t = translations[lang];

  const handleNavigate = (action: () => void, targetElementId?: string) => {
    action();
    onClose();
    if (targetElementId) {
      setTimeout(() => {
        const el = document.getElementById(targetElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const personaHubs = [
    {
      id: 'home' as const,
      name: lang === 'en' ? 'Overview' : '总览首页',
      badge: lang === 'en' ? 'Main' : '总览',
      icon: Home,
      color: 'text-[#4ee48b]',
      bg: 'border-[#1f794d]/40 bg-[#092915]/50',
    },
    {
      id: 'executive' as const,
      name: lang === 'en' ? 'Business & ROI' : '商业与 ROI',
      badge: 'CFO / CEO',
      icon: Briefcase,
      color: 'text-[#fbbf24]',
      bg: 'border-[#f59e0b]/40 bg-[#241705]/50',
    },
    {
      id: 'security' as const,
      name: lang === 'en' ? 'Security & Trust' : '安全与合规',
      badge: 'CISO / DPO',
      icon: ShieldCheck,
      color: 'text-rose-400',
      bg: 'border-rose-700/40 bg-rose-950/40',
    },
    {
      id: 'developer' as const,
      name: lang === 'en' ? 'Developers' : '架构与开发',
      badge: 'Architect',
      icon: Code2,
      color: 'text-[#00d2ff]',
      bg: 'border-[#0099ff]/30 bg-[#001f3f]/30',
    },
  ];

  return (
    <>
      {/* 1. Universal Floating Bottom Dock (Always visible on mobile & desktop) */}
      <div className="fixed bottom-4 inset-x-3 sm:inset-x-6 z-40 pointer-events-none flex justify-center">
        <div className="w-full max-w-2xl pointer-events-auto bg-gradient-to-r from-[#061c0e]/95 via-[#082414]/95 to-[#061c0e]/95 border border-[#1f794d]/60 backdrop-blur-2xl rounded-2xl p-1.5 sm:p-2 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(78,228,139,0.18)] flex items-center justify-between gap-1 sm:gap-2 transition-all">
          {/* Button: Open Role Navigation Drawer */}
          <button
            onClick={onToggleOpen}
            className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              isOpen
                ? 'bg-gradient-to-r from-[#4ee48b] to-[#38d677] text-[#05160b] font-bold shadow-md shadow-[#4ee48b]/30'
                : 'bg-white/5 hover:bg-[#092915] text-[#80f2b0] border border-[#1f794d]/40'
            }`}
            title={lang === 'en' ? 'Open All Portals & Solutions' : '展开全景导航'}
          >
            <Compass className={`w-3.5 h-3.5 ${isOpen ? 'text-[#05160b]' : 'text-[#4ee48b]'}`} />
            <span className="truncate">{lang === 'en' ? 'Portals' : '快捷导航'}</span>
          </button>

          {/* Quick Hub Jump: Overview (Home) - Visible on tablet/desktop */}
          <button
            onClick={() => handleNavigate(() => onViewChange('home'))}
            className={`hidden md:flex py-2 px-2.5 rounded-xl text-xs font-semibold border items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeView === 'home'
                ? 'bg-gradient-to-r from-[#4ee48b] to-[#38d677] text-[#05160b] font-bold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-[#1f794d]/30'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Home' : '首页'}</span>
          </button>

          {/* Quick Hub Jump: Executive (CFO ROI) */}
          <button
            onClick={() => handleNavigate(() => onViewChange('executive'))}
            className={`flex-1 sm:flex-initial py-2 px-2 sm:px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer ${
              activeView === 'executive'
                ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-black font-bold shadow-md shadow-[#f59e0b]/20'
                : 'bg-white/5 hover:bg-[#201505] text-[#fde68a] border-[#f59e0b]/30'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="truncate">{lang === 'en' ? 'CFO ROI' : 'CFO 测算'}</span>
          </button>

          {/* Quick Hub Jump: Security (CISO) */}
          <button
            onClick={() => handleNavigate(() => onViewChange('security'))}
            className={`flex-1 sm:flex-initial py-2 px-2 sm:px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer ${
              activeView === 'security'
                ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold shadow-md shadow-rose-600/20'
                : 'bg-white/5 hover:bg-rose-950/40 text-rose-300 border-rose-500/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="truncate">{lang === 'en' ? 'CISO' : '安全防御'}</span>
          </button>

          {/* Quick Hub Jump: Developer / Architecture (Architect) - Visible on sm+ */}
          <button
            onClick={() => handleNavigate(() => onViewChange('developer'))}
            className={`hidden sm:flex py-2 px-2.5 rounded-xl text-xs font-semibold border items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeView === 'developer'
                ? 'bg-gradient-to-r from-[#0099ff] to-[#00d2ff] text-white font-bold shadow-md shadow-[#0099ff]/20'
                : 'bg-white/5 hover:bg-[#002444] text-[#38bdf8] border-[#0099ff]/30'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Dev' : '研发'}</span>
          </button>

          {/* CTA: Quick Request Demo POC */}
          <button
            onClick={() => onRequestDemo()}
            className="py-2 px-3 sm:px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#4ee48b] via-[#38d677] to-[#00d2ff] hover:brightness-110 text-[#05160b] flex items-center justify-center gap-1.5 shadow-lg shadow-[#4ee48b]/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#05160b]" />
            <span>{lang === 'en' ? 'POC' : '预约 POC'}</span>
          </button>

          {/* Quick Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-[#1f794d]/30 transition-colors cursor-pointer shrink-0"
            title={lang === 'en' ? 'Scroll to top' : '回到顶部'}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Drawer Modal Sheet (Accessible on both Mobile & Desktop) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* Drawer Content Card */}
          <div className="relative z-10 w-full sm:max-w-2xl max-h-[85vh] bg-gradient-to-b from-[#082213] via-[#05180d] to-[#030d07] border sm:border border-[#1f794d]/60 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 overflow-y-auto shadow-2xl flex flex-col gap-5 animate-slide-up sm:animate-fade-in">
            {/* Top Handle & Close Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1f794d]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1f794d] to-[#4ee48b] p-[1px] shadow-sm">
                  <div className="w-full h-full bg-[#05160b] rounded-[11px] flex items-center justify-center">
                    <Compass className="w-4 h-4 text-[#4ee48b]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {lang === 'en' ? 'Decision Portals & Solutions Hub' : '角色决策专区与垂直行业中心'}
                  </h3>
                  <p className="text-[11px] text-gray-300/80 font-mono">
                    {lang === 'en' ? 'Choose your persona for targeted technical & financial data' : '按需选择业务决策视角，快速直达核心数据'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Persona Portals Grid */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                {lang === 'en' ? 'Target Role Portals' : '角色专属门户'}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {personaHubs.map((hub) => {
                  const Icon = hub.icon;
                  const isSelected = activeView === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onClick={() => handleNavigate(() => onViewChange(hub.id))}
                      className={`p-3 sm:p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/15 border-[#4ee48b] shadow-lg shadow-[#4ee48b]/15'
                          : `${hub.bg} hover:border-white/20 hover:-translate-y-0.5`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${hub.color}`} />
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/50 text-gray-300">
                          {hub.badge}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white">{hub.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry Verticals */}
            <div>
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                {lang === 'en' ? 'Industry Vertical Solutions' : '三大垂直行业落地方案'}
              </div>
              <div className="space-y-2">
                {[
                  {
                    id: 'legal' as const,
                    name: lang === 'en' ? 'Legal & Compliance (FRE 502)' : '法律与涉密法务 (FRE 502 律师特权)',
                    icon: Scale,
                    color: 'text-[#fbbf24]',
                    borderHover: 'hover:border-[#f59e0b]/50',
                  },
                  {
                    id: 'healthcare' as const,
                    name: lang === 'en' ? 'Healthcare & Life Sciences (HIPAA)' : '医疗与生命科学 (HIPAA 病历安全)',
                    icon: HeartPulse,
                    color: 'text-[#38bdf8]',
                    borderHover: 'hover:border-[#0099ff]/50',
                  },
                  {
                    id: 'finance' as const,
                    name: lang === 'en' ? 'Finance & Quant Assets' : '金融与量化资管 (核心因子保护)',
                    icon: Landmark,
                    color: 'text-[#4ee48b]',
                    borderHover: 'hover:border-[#4ee48b]/50',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleNavigate(() => {
                          if (activeView !== 'home') onViewChange('home');
                          onSelectIndustry(item.id);
                        }, 'solutions')
                      }
                      className={`w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 ${item.borderHover} flex items-center justify-between text-left transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs sm:text-sm font-medium text-gray-200">{item.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#1f794d]/20 flex flex-col gap-2.5 pb-2">
              <button
                onClick={() => {
                  onClose();
                  onRequestDemo();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4ee48b] via-[#38d677] to-[#00d2ff] hover:brightness-110 text-[#05160b] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#4ee48b]/20 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#05160b]" />
                <span>{lang === 'en' ? 'Book 7-Day Enterprise POC' : '预约 7 天企业级 POC 方案'}</span>
              </button>

              <div
                className="w-full py-2.5 rounded-xl bg-zinc-900/60 text-zinc-400 border border-zinc-800 font-mono text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none"
                title={lang === 'en' ? 'Technical Whitepaper is currently being updated for official release' : '技术白皮书正在完善中，后续正式放出'}
              >
                <span>{lang === 'en' ? 'Download Whitepaper & Audit Specs' : '获取完整技术白皮书'}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {lang === 'en' ? 'Updating' : '完善中'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

