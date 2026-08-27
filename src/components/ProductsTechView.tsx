import React from 'react';
import { ArrowLeft, Cpu, ShieldCheck, Sparkles, Layers, Code2, Flame } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { HeroSection } from './HeroSection';
import { CrisisSection } from './CrisisSection';
import { OnionArchitecture } from './OnionArchitecture';
import { RedTeamPlayground } from './RedTeamPlayground';
import { TechComparisonMatrix } from './TechComparisonMatrix';
import { QuickstartIntegration } from './QuickstartIntegration';
import { DeploymentCTA } from './DeploymentCTA';

interface ProductsTechViewProps {
  lang: Language;
  onBackToHome: () => void;
  onRequestDemo: () => void;
  onOpenWhitepaper: () => void;
}

export const ProductsTechView: React.FC<ProductsTechViewProps> = ({
  lang,
  onBackToHome,
  onRequestDemo,
  onOpenWhitepaper,
}) => {
  return (
    <div className="animate-fade-in">
      {/* Top Navigation Strip */}
      <div className="pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-3 sm:p-4 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-row items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white border border-cyan-500/20 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{translations[lang].nav.switchToHome}</span>
            </button>
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{translations[lang].nav.productsTech}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              onClick={onOpenWhitepaper}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{translations[lang].nav.whitepaper}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                {lang === 'en' ? 'Updating' : '更新中'}
              </span>
            </div>
            <button
              onClick={onRequestDemo}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{translations[lang].nav.requestDemo}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deep-Tech Components */}
      <HeroSection
        lang={lang}
        onGetStarted={onRequestDemo}
        onRequestDemo={onRequestDemo}
        onOpenWhitepaper={onOpenWhitepaper}
        isSubPage={true}
      />

      <CrisisSection lang={lang} />

      <OnionArchitecture lang={lang} />

      {/* Red-Blue Team Adversarial Attack & Exploitation Playground */}
      <RedTeamPlayground
        lang={lang}
        onRequestWhitepaper={onOpenWhitepaper}
      />

      {/* Mainstream Privacy Computing Comparison Matrix (FHE vs TEE vs SMPC vs CovarAI) */}
      <TechComparisonMatrix
        lang={lang}
        onRequestDemo={onRequestDemo}
      />

      {/* 3-Line Code & Developer Quickstart Integration */}
      <QuickstartIntegration
        lang={lang}
        onRequestDemo={onRequestDemo}
      />

      <DeploymentCTA
        lang={lang}
        onOpenWhitepaper={onOpenWhitepaper}
      />
    </div>
  );
};
