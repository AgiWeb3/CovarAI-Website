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

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-emerald-400" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-blue-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="values" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-4 glow-cyan">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
            {t.title}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Mobile Pillars Switcher (Visible on < md screens) */}
      <div className="md:hidden mb-8 p-1 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-1 overflow-x-auto">
        {t.pillars.map((p, pIdx) => (
          <button
            key={pIdx}
            onClick={() => setMobilePillarTab(pIdx)}
            className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mobilePillarTab === pIdx
                ? 'bg-cyan-500 text-black font-bold shadow-md'
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
              ? 'bg-white/20 text-white font-bold'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {lang === 'en' ? 'All' : '全部'}
        </button>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {t.pillars.map((pillar, idx) => {
          const isHiddenOnMobile = mobilePillarTab !== 'all' && mobilePillarTab !== idx;
          return (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className={`${isHiddenOnMobile ? 'hidden md:flex' : 'flex'} p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex-col justify-between group hover:-translate-y-1 relative backdrop-blur-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-black text-cyan-400">
                      {pillar.stat}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 uppercase">
                      {pillar.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-cyan-300 mb-3">
                  {pillar.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
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

      {/* Deep-Tech Bridge Banner */}
      <div
        data-aos="fade-up"
        className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/40 via-black to-cyan-950/40 border border-white/10 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 glow-purple"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'Core Cryptographic & Hardware Engine' : '底层代数密码学与 TEE 物理飞地'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {lang === 'en' ? 'Explore the Products & Deep-Tech Architecture' : '深入探索 CovarAI 专属产品与底层技术架构'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {lang === 'en'
              ? 'Dive into the Algebraic Covariant Obfuscation Sandbox, the 3-Layer Onion Defense, and DeepSeek-V3 671B benchmark validation.'
              : '体验代数协变混淆实时沙箱，查阅洋葱防御三重矩阵（TrustGate + EnclaveX + CovarPri）与 671B 参数实测基准。'}
          </p>
        </div>

        <button
          onClick={onSwitchToProducts}
          className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-cyan-400 font-bold text-sm flex items-center gap-2 shadow-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer self-start lg:self-center"
        >
          <span>{translations[lang].nav.switchToProducts}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Client Testimonials Section */}
      <div className="mb-8" data-aos="fade-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-3">
            <Quote className="w-3.5 h-3.5 text-cyan-400" />
            <span>{testimonials.tag}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
            {testimonials.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            {testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between relative backdrop-blur-xl"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 mb-4">
                  {item.industry}
                </span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 italic">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="font-bold text-white text-sm">
                  {item.author}
                </div>
                <div className="text-xs text-cyan-400 font-mono">
                  {item.role}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {item.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
