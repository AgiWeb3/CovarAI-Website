import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Scale, HeartPulse, Landmark, CheckCircle2, Cpu, ArrowUpRight, Lock, Zap, Clock, Layers } from 'lucide-react';
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
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-80 transform-gpu"
        style={{
          WebkitMask: 'linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)',
          mask: 'linear-gradient(to bottom, #000 0%, #000 80%, transparent 100%)'
        }}
      >
        <FluidShaderCanvas 
          className="w-full h-full"
          color1="rgb(2, 6, 4)"         // Deep obsidian void (true dark substrate)
          color2="rgb(12, 98, 50)"      // Rich deep matrix emerald (subtle shadow transition)
          color3="rgb(62, 218, 132)"    // Focused high-contrast electric mint ribbon
          speed={0.40}
          scale={0.46}
          swirl={0.34}
          swirlIterations={10}
          proportion={0.21}             // Dominant deep dark expanse for dramatic contrast
          softness={0.88}               // Sharper, crisper contour ridges
          grainOpacity={0.06}
        />
      </div>

      {/* Decorative ambient lighting overlays with zero-cost radial gradients */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] pointer-events-none z-0 transform-gpu opacity-25" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(78,228,139,0.14) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/3 right-10 w-[450px] h-[350px] pointer-events-none z-0 transform-gpu opacity-20" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,210,255,0.14) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
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

        {/* Apple OS Liquid Frosted Glass Metrics Strip */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 max-w-7xl mx-auto mt-12 sm:mt-14 pt-8 border-t border-white/10 text-left"
        >
          {t.stats.map((stat, idx) => {
            const config = [
              {
                icon: ShieldCheck,
                color: '#fbbf24',
                valGradient: 'from-amber-200 via-amber-400 to-yellow-500',
                borderHover: 'hover:border-amber-400/40 hover:shadow-[0_16px_36px_rgba(245,158,11,0.15)]',
                ambientBg: 'from-amber-500/[0.08] via-white/[0.03] to-[#041008]/40',
                iconBg: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
              },
              {
                icon: Zap,
                color: '#4ee48b',
                valGradient: 'from-[#80f2b0] via-[#4ee48b] to-[#38d677]',
                borderHover: 'hover:border-[#4ee48b]/50 hover:shadow-[0_16px_36px_rgba(78,228,139,0.18)]',
                ambientBg: 'from-[#4ee48b]/[0.08] via-white/[0.03] to-[#041008]/40',
                iconBg: 'bg-[#4ee48b]/10 text-[#4ee48b] border-[#4ee48b]/30',
              },
              {
                icon: Clock,
                color: '#00d2ff',
                valGradient: 'from-[#70e1ff] via-[#00d2ff] to-[#0099ff]',
                borderHover: 'hover:border-[#00d2ff]/50 hover:shadow-[0_16px_36px_rgba(0,210,255,0.18)]',
                ambientBg: 'from-[#00d2ff]/[0.08] via-white/[0.03] to-[#041008]/40',
                iconBg: 'bg-[#00d2ff]/10 text-[#00d2ff] border-[#00d2ff]/30',
              },
              {
                icon: Layers,
                color: '#80f2b0',
                valGradient: 'from-white via-[#80f2b0] to-[#4ee48b]',
                borderHover: 'hover:border-[#80f2b0]/50 hover:shadow-[0_16px_36px_rgba(128,242,176,0.18)]',
                ambientBg: 'from-[#80f2b0]/[0.08] via-white/[0.03] to-[#041008]/40',
                iconBg: 'bg-[#80f2b0]/10 text-[#80f2b0] border-[#80f2b0]/30',
              },
            ][idx % 4];

            const Icon = config.icon;

            return (
              <div
                key={idx}
                className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-b ${config.ambientBg} backdrop-blur-2xl border border-white/15 ${config.borderHover} flex flex-col justify-between transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.3),0_12px_32px_rgba(0,0,0,0.45)] hover:-translate-y-1.5 overflow-hidden`}
              >
                {/* Apple OS Specular Glass Shimmer Line */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Subsurface Organic Glow Diffusion */}
                <div 
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity"
                  style={{ background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)` }}
                />

                {/* Top Row: Metric Value + Frosted Glass Icon Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3 relative z-10">
                  <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${config.valGradient}`}>
                    {stat.value}
                  </div>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border ${config.iconBg} backdrop-blur-md flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Bottom Row: Label & Subtitle with Crisp Typographic Refinement */}
                <div className="relative z-10 space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-[11px] text-gray-300/85 leading-snug font-normal line-clamp-2">
                    {stat.sub}
                  </div>
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

