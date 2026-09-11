import React from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  Lock,
  Quote,
  ArrowRight,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { TcoRoiCalculator } from './TcoRoiCalculator';

interface BusinessValueSectionProps {
  lang: Language;
  onSwitchToProducts: () => void;
  onRequestDemo: (details?: string) => void;
}

export const BusinessValueSection: React.FC<BusinessValueSectionProps> = ({
  lang,
  onSwitchToProducts,
  onRequestDemo,
}) => {
  const t = translations[lang].businessValues;
  const testimonials = translations[lang].clientTestimonials;
  const [mobilePillarTab, setMobilePillarTab] = React.useState<number | 'all'>(0);

  const getPillarIcon = (iconName: string, idx: number) => {
    switch (idx) {
      case 0:
        return <ShieldCheck className="w-6 h-6 text-[#4ee48b]" />;
      case 1:
        return <Zap className="w-6 h-6 text-[#00d2ff]" />;
      case 2:
        return <Layers className="w-6 h-6 text-[#fbbf24]" />;
      case 3:
        return <Lock className="w-6 h-6 text-[#80f2b0]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#4ee48b]" />;
    }
  };

  return (
    <section id="values" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#092915]/90 via-[#061c0e]/95 to-[#092915]/90 border border-[#1f794d]/50 text-[#80f2b0] text-xs font-mono mb-4 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4ee48b]" />
          <span>{t.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#80f2b0] to-[#00d2ff]">
            {t.title}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Mobile Pillars Switcher (Visible on < md screens) */}
      <div className="md:hidden mb-8 p-1 rounded-2xl bg-[#061c0e]/80 border border-[#1f794d]/30 flex items-center justify-between gap-1 overflow-x-auto">
        {t.pillars.map((p, pIdx) => (
          <button
            key={pIdx}
            onClick={() => setMobilePillarTab(pIdx)}
            className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mobilePillarTab === pIdx
                ? 'bg-[#4ee48b] text-[#05160b] font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {p.stat}
          </button>
        ))}
        <button
          onClick={() => setMobilePillarTab('all')}
          className={`py-2 px-2.5 rounded-xl text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
            mobilePillarTab === 'all'
              ? 'bg-[#1f794d] text-white font-bold'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {lang === 'en' ? 'All' : '全部'}
        </button>
      </div>

      {/* 4 Pillars Grid with Chromatic Diversity & Visual Depth */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {t.pillars.map((pillar, idx) => {
          const isHiddenOnMobile = mobilePillarTab !== 'all' && mobilePillarTab !== idx;

          // Distinct thematic visual styling per pillar
          const pillarThemes = [
            {
              cardBg: 'bg-gradient-to-b from-[#102d1a]/85 via-[#071a0f]/90 to-[#041008]/95',
              statColor: 'text-[#4ee48b]',
              subColor: 'text-[#80f2b0]',
              borderClass: 'border-[#1f794d]/50 hover:border-[#4ee48b] hover:shadow-[0_10px_35px_rgba(78,228,139,0.18)]',
              iconBox: 'bg-gradient-to-br from-[#184226] to-[#092915] border-[#1f794d]',
              checkColor: 'text-[#4ee48b]',
            },
            {
              cardBg: 'bg-gradient-to-b from-[#06243b]/85 via-[#051720]/90 to-[#040f13]/95',
              statColor: 'text-[#00d2ff]',
              subColor: 'text-[#38bdf8]',
              borderClass: 'border-[#0099ff]/40 hover:border-[#38bdf8] hover:shadow-[0_10px_35px_rgba(0,153,255,0.18)]',
              iconBox: 'bg-gradient-to-br from-[#003460] to-[#00172e] border-[#0099ff]/50',
              checkColor: 'text-[#00d2ff]',
            },
            {
              cardBg: 'bg-gradient-to-b from-[#261705]/85 via-[#131006]/90 to-[#050f09]/95',
              statColor: 'text-[#fbbf24]',
              subColor: 'text-[#fde68a]',
              borderClass: 'border-[#f59e0b]/40 hover:border-[#fbbf24] hover:shadow-[0_10px_35px_rgba(245,158,11,0.18)]',
              iconBox: 'bg-gradient-to-br from-[#3b2308] to-[#1a1104] border-[#f59e0b]/50',
              checkColor: 'text-[#fbbf24]',
            },
            {
              cardBg: 'bg-gradient-to-b from-[#113021]/85 via-[#081c12]/90 to-[#041108]/95',
              statColor: 'text-[#80f2b0]',
              subColor: 'text-[#b4f9d0]',
              borderClass: 'border-[#1f794d]/50 hover:border-[#80f2b0] hover:shadow-[0_10px_35px_rgba(128,242,176,0.18)]',
              iconBox: 'bg-gradient-to-br from-[#16432a] to-[#092915] border-[#1f794d]',
              checkColor: 'text-[#80f2b0]',
            },
          ][idx % 4];

          return (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className={`${isHiddenOnMobile ? 'hidden md:flex' : 'flex'} p-6 sm:p-7 rounded-3xl ${pillarThemes.cardBg} border ${pillarThemes.borderClass} transition-all duration-300 flex-col justify-between group hover:-translate-y-1 relative backdrop-blur-xl shadow-lg overflow-hidden`}
            >
              {/* Top specular highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-2xl ${pillarThemes.iconBox} border group-hover:scale-110 transition-transform shadow-sm`}>
                    {getPillarIcon(pillar.icon, idx)}
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl sm:text-3xl font-mono font-black ${pillarThemes.statColor}`}>
                      {pillar.stat}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                      {pillar.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {pillar.title}
                </h3>
                <div className={`text-xs font-mono ${pillarThemes.subColor} mb-3`}>
                  {pillar.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-gray-300/85 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-1.5 text-xs text-gray-300/80 font-mono">
                <CheckCircle2 className={`w-3.5 h-3.5 ${pillarThemes.checkColor}`} />
                <span>{lang === 'en' ? 'Enterprise Verified' : '企业生产环境实测'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Enterprise TCO & Compute ROI Calculator */}
      <div className="mb-20" data-aos="fade-up">
        <TcoRoiCalculator lang={lang} onRequestDemo={onRequestDemo} />
      </div>

      {/* Deep-Tech Bridge Banner with Rich Aurora Spectrum */}
      <div
        data-aos="fade-up"
        className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e2f1c]/90 via-[#071c10]/95 to-[#052233]/90 border border-[#1f794d]/50 hover:border-[#4ee48b]/60 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden transition-all duration-300 backdrop-blur-xl"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#092915] to-[#041e2e] border border-[#1f794d]/50 text-[#80f2b0] text-xs font-mono mb-3 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#4ee48b]" />
            <span>{lang === 'en' ? 'Core Cryptographic & Hardware Engine' : '底层代数密码学与 TEE 物理飞地'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {lang === 'en' ? 'Explore the Products & Deep-Tech Architecture' : '深入探索 CovarAI 专属产品与底层技术架构'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed">
            {lang === 'en'
              ? 'Dive into the Algebraic Covariant Obfuscation Sandbox, the 3-Layer Onion Defense, and DeepSeek-V3 671B benchmark validation.'
              : '体验代数协变混淆实时沙箱，查阅洋葱防御三重矩阵（TrustGate + EnclaveX + CovarPri）与 671B 参数实测基准。'}
          </p>
        </div>

        <button
          onClick={onSwitchToProducts}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4ee48b] via-[#38d677] to-[#00d2ff] hover:brightness-110 text-[#05160b] font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#4ee48b]/25 transition-all whitespace-nowrap active:scale-95 cursor-pointer self-start lg:self-center shrink-0 relative z-10"
        >
          <span>{translations[lang].nav.switchToProducts}</span>
          <ArrowRight className="w-4 h-4 text-[#05160b]" />
        </button>
      </div>

      {/* Client Testimonials Section with Multi-Industry Distinctive Hues */}
      <div className="mb-8" data-aos="fade-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#092915]/90 via-[#061c0e]/95 to-[#092915]/90 border border-[#1f794d]/50 text-[#80f2b0] text-xs font-mono mb-3 shadow-sm">
            <Quote className="w-3.5 h-3.5 text-[#4ee48b]" />
            <span>{testimonials.tag}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
            {testimonials.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300/85 max-w-xl mx-auto">
            {testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.items.map((item, idx) => {
            // Distinct styling per industry testimonial
            const cardThemes = [
              {
                bg: 'bg-gradient-to-b from-[#221606]/85 via-[#0e1610]/95 to-[#050f09]/98',
                border: 'border-[#f59e0b]/30 hover:border-[#fbbf24]/60',
                badge: 'bg-[#291b08]/80 text-[#fde68a] border-[#f59e0b]/40',
                roleColor: 'text-[#fbbf24]',
              },
              {
                bg: 'bg-gradient-to-b from-[#052136]/85 via-[#06161c]/95 to-[#040f10]/98',
                border: 'border-[#0099ff]/30 hover:border-[#38bdf8]/60',
                badge: 'bg-[#032036]/80 text-[#38bdf8] border-[#0099ff]/40',
                roleColor: 'text-[#00d2ff]',
              },
              {
                bg: 'bg-gradient-to-b from-[#112d1b]/85 via-[#071a0f]/95 to-[#041008]/98',
                border: 'border-[#1f794d]/40 hover:border-[#4ee48b]/60',
                badge: 'bg-[#092915] text-[#80f2b0] border-[#1f794d]/60',
                roleColor: 'text-[#4ee48b]',
              },
            ][idx % 3];

            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-3xl ${cardThemes.bg} border ${cardThemes.border} flex flex-col justify-between relative backdrop-blur-xl transition-all duration-300 shadow-lg hover:-translate-y-1 overflow-hidden`}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded border text-[11px] font-mono mb-4 shadow-sm ${cardThemes.badge}`}>
                    {item.industry}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed mb-6 italic">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white text-sm">
                    {item.author}
                  </div>
                  <div className={`text-xs ${cardThemes.roleColor} font-mono font-medium`}>
                    {item.role}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {item.company}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
