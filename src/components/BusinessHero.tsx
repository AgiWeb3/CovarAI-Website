import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Scale, HeartPulse, Landmark, CheckCircle2, Cpu, ArrowUpRight, Lock, Zap } from 'lucide-react';
import { Language, IndustryScenarioId } from '../types';
import { translations } from '../translations';
import { FluidShaderCanvas } from './FluidShaderCanvas';
import { SecretFlowAnimation } from './SecretFlowAnimation';

interface BusinessHeroProps {
  lang: Language;
  onRequestDemo: () => void;
  onSelectIndustry: (id: IndustryScenarioId) => void;
  onSwitchToProducts: () => void;
  onOpenWhitepaper: () => void;
}

export const BusinessHero: React.FC<BusinessHeroProps> = ({
  lang,
  onRequestDemo,
  onSelectIndustry,
  onSwitchToProducts,
  onOpenWhitepaper,
}) => {
  const t = translations[lang].businessHero;
  const isZh = lang === 'zh' || lang === 'zh-TW';

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-14 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#040e08]">
      {/* 1. Authentic Capital & Code WebGL Fluid Shader Canvas Background */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-80"
        style={{
          WebkitMask: 'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)',
          mask: 'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)'
        }}
      >
        <FluidShaderCanvas 
          className="w-full h-full"
          color1="rgb(4, 14, 8)"        // Deep obsidian pine night
          color2="rgb(78, 228, 139)"    // Capital & Code Electric Mint (#4ee48b)
          color3="rgb(220, 255, 240)"   // Silk aurora mint highlight
          speed={0.42}
          scale={0.45}
          swirl={0.32}
          swirlIterations={10}
          grainOpacity={0.08}
        />
      </div>

      {/* Decorative ambient lighting overlays */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4ee48b]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-[#0099ff]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Hero Top Bar: Clean Meta Badge & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#061c0e]/90 border border-[#1f794d]/60 text-[#80f2b0] text-xs font-mono backdrop-blur-md shadow-lg shadow-[#4ee48b]/5"
          >
            <span className="w-2 h-2 rounded-full bg-[#4ee48b] animate-ping" />
            <ShieldCheck className="w-3.5 h-3.5 text-[#4ee48b]" />
            <span className="font-semibold">{t.badge}</span>
            <span className="text-white/20">/</span>
            <span className="text-gray-400 hidden sm:inline">ZERO-PLAINTEXT ENCLAVE</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-gray-400">
            <span className="text-[#80f2b0] font-semibold">ENTERPRISE READY</span>
            <span className="text-white/20">•</span>
            <span>COVARIANT CRYPTOGRAPHIC SOVEREIGNTY</span>
          </div>
        </div>

        {/* 2-Column Hero Grid: Left Content + Right Flow Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Business Value, Typography & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] text-balance"
            >
              {lang === 'en' ? (
                <>
                  <span>Deploy Frontier AI. </span>
                  <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#80f2b0] via-[#4ee48b] to-[#00d2ff] drop-shadow-[0_0_35px_rgba(78,228,139,0.3)]">
                    Zero Cloud Leaks. 100% Compliant.
                  </span>
                </>
              ) : (
                <>
                  <span className="block">{translations[lang].businessHero.title.split('，')[0] || translations[lang].businessHero.title}</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#80f2b0] via-[#4ee48b] to-[#00d2ff] mt-2 drop-shadow-[0_0_35px_rgba(78,228,139,0.3)]">
                    {translations[lang].businessHero.title.split('，')[1] || ''}
                  </span>
                </>
              )}
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-sm sm:text-base lg:text-lg text-[#e2e8f0]/85 max-w-2xl leading-relaxed font-light"
            >
              {t.subtitle}
            </p>

            {/* Target Verticals Pills */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="flex flex-wrap items-center gap-2.5 pt-1"
            >
              <span className="text-xs font-mono text-[#80f2b0]/70 uppercase tracking-wider mr-1">
                {lang === 'en' ? 'Target Verticals:' : '垂直行业专区:'}
              </span>
              <button
                onClick={() => onSelectIndustry('legal')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1606]/80 hover:bg-[#2e2208] border border-[#f59e0b]/40 hover:border-[#fbbf24] text-[#fde68a] text-xs font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>{translations[lang].industrySection.tabs.legal}</span>
              </button>
              <button
                onClick={() => onSelectIndustry('healthcare')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#031926]/80 hover:bg-[#052e47] border border-[#0099ff]/40 hover:border-[#38bdf8] text-[#38bdf8] text-xs font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <HeartPulse className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{translations[lang].industrySection.tabs.healthcare}</span>
              </button>
              <button
                onClick={() => onSelectIndustry('finance')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061c0e]/80 hover:bg-[#092915] border border-[#1f794d]/50 hover:border-[#4ee48b] text-[#80f2b0] text-xs font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <Landmark className="w-3.5 h-3.5 text-[#4ee48b]" />
                <span>{translations[lang].industrySection.tabs.finance}</span>
              </button>
            </div>

            {/* CTAs in Capital & Code luxury style */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <button
                onClick={onRequestDemo}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4ee48b] via-[#38d677] to-[#00d2ff] hover:brightness-110 text-[#05160b] font-bold text-sm shadow-[0_0_30px_rgba(78,228,139,0.35)] hover:shadow-[0_0_45px_rgba(78,228,139,0.55)] transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#05160b]" />
                <span>{t.ctaDemo}</span>
                <span className="w-6 h-6 rounded-full bg-[#05160b] text-[#4ee48b] flex items-center justify-center group-hover:translate-x-0.5 transition-transform ml-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={onSwitchToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#061c0e]/90 hover:bg-[#092915] border border-[#1f794d]/60 hover:border-[#4ee48b]/60 text-white font-medium text-sm backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md"
              >
                <Cpu className="w-4 h-4 text-[#4ee48b]" />
                <span>{t.ctaTech}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </button>

              <div
                className="w-full sm:w-auto text-xs text-zinc-400 flex items-center justify-center gap-1.5 font-mono py-2 cursor-not-allowed select-none"
                title={lang === 'en' ? 'Whitepaper is currently being updated for official release' : '技术白皮书正在完善中，后续正式放出'}
              >
                <span>{translations[lang].nav.whitepaper}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/80 font-mono">
                  {lang === 'en' ? 'Updating' : '完善中'}
                </span>
              </div>
            </div>

            {/* Trust checkmarks in plain business language */}
            <div
              data-aos="fade-up"
              data-aos-delay="250"
              className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-300 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ee48b] shrink-0" />
                <span>{isZh ? '云端零明文驻留 · 物理机显存隔离' : 'Zero plaintext in cloud memory'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ee48b] shrink-0" />
                <span>{isZh ? '完整保留司法特权 (FRE 502)' : 'Preserves Attorney-Client Privilege'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ee48b] shrink-0" />
                <span>{isZh ? '端到端延迟低至 < 100ms 无损体验' : 'Sub-100ms latency overhead'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ee48b] shrink-0" />
                <span>{isZh ? '支持 671B 任意模型与多模态扩展' : 'Universal 671B+ & multimodal scale'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Restored Interactive SecretFlowAnimation + Rotating Tech Emblem */}
          <div 
            data-aos="fade-left"
            data-aos-delay="200"
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* The Restored Interactive Secret Flow Visual */}
            <div className="w-full relative">
              <SecretFlowAnimation 
                lang={lang}
                onExploreTechnology={onSwitchToProducts} 
              />

              {/* Floating Spinning Mini-Badge at bottom-right corner for tech discovery */}
              <div className="absolute -bottom-5 -right-3 hidden sm:block select-none pointer-events-auto z-20">
                <button
                  onClick={onSwitchToProducts}
                  className="group relative w-24 h-24 rounded-full border border-[#1f794d]/60 bg-[#061c0e]/95 backdrop-blur-xl flex items-center justify-center cursor-pointer hover:border-[#4ee48b]/80 transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
                  title={isZh ? '探索底层技术架构' : 'Explore Tech Architecture'}
                >
                  <svg 
                    className="absolute inset-0 w-full h-full animate-[spin_16s_linear_infinite] group-hover:animate-[spin_8s_linear_infinite] transition-all"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="textCircleHero"
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      fill="none"
                    />
                    <text className="text-[7.5px] font-mono tracking-[0.2em] uppercase fill-[#80f2b0] group-hover:fill-white transition-colors">
                      <textPath href="#textCircleHero">
                        {isZh ? '• 代数混淆 • 零明文 • 机密计算 ' : '• ZERO-PLAINTEXT • SAFE COMPUTE '}
                      </textPath>
                    </text>
                  </svg>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#4ee48b] transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#05160b] transition-colors" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Commercial Metrics Strip */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12 sm:mt-14 pt-8 border-t border-[#1f794d]/30 text-left"
        >
          {t.stats.map((stat, idx) => {
            const colorScheme = [
              { valColor: 'text-[#fbbf24]', borderGlow: 'hover:border-[#f59e0b]/50', topAccent: 'from-[#f59e0b]/10' },
              { valColor: 'text-[#4ee48b]', borderGlow: 'hover:border-[#4ee48b]/50', topAccent: 'from-[#4ee48b]/10' },
              { valColor: 'text-[#00d2ff]', borderGlow: 'hover:border-[#0099ff]/50', topAccent: 'from-[#0099ff]/10' },
              { valColor: 'text-[#80f2b0]', borderGlow: 'hover:border-[#80f2b0]/50', topAccent: 'from-[#80f2b0]/10' },
            ][idx % 4];

            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-b ${colorScheme.topAccent} via-[#061c0e]/90 to-[#041209]/95 border border-[#1f794d]/40 ${colorScheme.borderGlow} backdrop-blur-md flex flex-col justify-between transition-all duration-300 shadow-lg hover:-translate-y-0.5`}
              >
                <div className={`text-2xl sm:text-3xl font-black font-mono ${colorScheme.valColor} mb-1 tracking-tight`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-300/80 leading-tight font-normal">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Trust Regulatory Badges */}
        <div
          data-aos="fade-up"
          data-aos-delay="350"
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-400 font-mono"
        >
          {t.trustBadges.map((badge, bIdx) => (
            <div key={bIdx} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4ee48b]" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

