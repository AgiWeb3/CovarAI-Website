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
  Briefcase,
  Code2,
  Home,
  CheckCircle2,
  Lock,
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

  const personaHubs = [
    {
      id: 'home' as const,
      name: lang === 'en' ? 'Overview' : '总览首页',
      badge: lang === 'en' ? 'Main' : '总览',
      icon: Home,
      color: 'text-cyan-400',
      bg: 'border-cyan-500/30 bg-cyan-950/20',
    },
    {
      id: 'executive' as const,
      name: lang === 'en' ? 'Business & ROI' : '商业与 ROI',
      badge: 'CFO / CEO',
      icon: Briefcase,
      color: 'text-emerald-400',
      bg: 'border-emerald-500/30 bg-emerald-950/20',
    },
    {
      id: 'security' as const,
      name: lang === 'en' ? 'Security & Trust' : '安全与合规',
      badge: 'CISO / DPO',
      icon: ShieldCheck,
      color: 'text-rose-400',
      bg: 'border-rose-500/30 bg-rose-950/20',
    },
    {
      id: 'developer' as const,
      name: lang === 'en' ? 'Developers' : '架构与开发',
      badge: 'Architect',
      icon: Code2,
      color: 'text-sky-400',
      bg: 'border-sky-500/30 bg-sky-950/20',
    },
  ];

  return (
    <>
      {/* 1. Mobile Floating Bottom Bar (Sticky Dock) */}
      <div className="lg:hidden fixed bottom-4 inset-x-3 sm:inset-x-6 z-40 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto bg-zinc-950/90 border border-cyan-500/40 backdrop-blur-2xl rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.2)] flex items-center justify-between gap-1 sm:gap-2 transition-all">
          {/* Button A: Open Drawer Hub */}
          <button
            onClick={onToggleOpen}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isOpen
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate">{lang === 'en' ? 'Roles' : '角色切换'}</span>
          </button>

          {/* Quick Hub Jump (Executive) */}
          <button
            onClick={() => handleNavigate(() => onViewChange('executive'))}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer ${
              activeView === 'executive'
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-white/5 text-emerald-300 border-white/10'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="truncate">{lang === 'en' ? 'CFO ROI' : 'ROI 测算'}</span>
          </button>

          {/* Quick Hub Jump (Security) */}
          <button
            onClick={() => handleNavigate(() => onViewChange('security'))}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer ${
              activeView === 'security'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-white/5 text-rose-300 border-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="truncate">{lang === 'en' ? 'CISO' : '攻防安全'}</span>
          </button>

          {/* Button D: Quick Request Demo CTA */}
          <button
            onClick={() => onRequestDemo()}
            className="py-2 px-3 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center gap-1 shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'POC' : '预约'}</span>
          </button>
        </div>
      </div>

      {/* 2. Bottom Sheet Drawer Modal (Full Categorized Navigation) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* Drawer Content Card */}
          <div className="relative z-10 w-full max-h-[85vh] bg-zinc-950 border-t border-cyan-500/40 rounded-t-3xl p-5 sm:p-6 overflow-y-auto shadow-2xl flex flex-col gap-5 animate-slide-up">
            {/* Top Handle & Close Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
                  <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
                    <Compass className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {lang === 'en' ? 'Decision Portals by Role' : '按角色获取精准内容'}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    {lang === 'en' ? 'Choose your persona for targeted technical & financial data' : '选择您的业务角色，获取定制的 ROI、安全或架构数据'}
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
                {lang === 'en' ? 'Role Portals' : '角色专区'}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {personaHubs.map((hub) => {
                  const Icon = hub.icon;
                  const isSelected = activeView === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onClick={() => handleNavigate(() => onViewChange(hub.id))}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/15 border-cyan-400 ring-1 ring-cyan-400'
                          : `${hub.bg} hover:border-white/20`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${hub.color}`} />
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/50 text-gray-300">
                          {hub.badge}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">{hub.name}</div>
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
                  },
                  {
                    id: 'healthcare' as const,
                    name: lang === 'en' ? 'Healthcare & Life Sciences (HIPAA)' : '医疗与生命科学 (HIPAA 病历安全)',
                    icon: HeartPulse,
                  },
                  {
                    id: 'finance' as const,
                    name: lang === 'en' ? 'Finance & Quant Assets' : '金融与量化资管 (核心因子保护)',
                    icon: Landmark,
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
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-medium text-gray-200">{item.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5 pb-4">
              <button
                onClick={() => {
                  onClose();
                  onRequestDemo();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
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
