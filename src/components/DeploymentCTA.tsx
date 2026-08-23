import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import {
  Cloud,
  Server,
  Check,
  ArrowRight,
  Shield,
  Lock,
  Mail,
  Building,
  User,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface DeploymentCTAProps {
  lang: Language;
  onOpenWhitepaper: () => void;
}

export const DeploymentCTA: React.FC<DeploymentCTAProps> = ({ lang, onOpenWhitepaper }) => {
  const currentTrans = translations[lang] || translations['zh-CN'];
  const t = currentTrans.deployment;
  const cta = currentTrans.deployment?.ctaSection || translations['zh-CN'].deployment.ctaSection;
  const footer = currentTrans.deployment?.footer || translations['zh-CN'].deployment.footer;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [selectedTier, setSelectedTier] = useState(cta.tierOptions?.[0] || 'SaaS Gateway POC');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="deployment" className="py-24 bg-black relative overflow-hidden border-t border-slate-900">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-radial-gradient blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4"
          >
            <Server className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            <span className="text-gradient-cyan">{t.title}</span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-sm sm:text-base text-slate-300 leading-relaxed"
          >
            {t.subtitle}
          </p>
        </div>

        {/* Dual Mode Delivery Matrix (Left-Right Contrast) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {t.modes.map((mode, idx) => {
            const isSaaS = mode.iconType === 'cloud';
            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150 + 200}
                className={`rounded-2xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative border ${
                  isSaaS
                    ? 'bg-white/5 border-white/10 glow-cyan hover:border-cyan-400/50'
                    : 'bg-white/5 border-white/10 glow-purple hover:border-purple-400/50'
                }`}
              >
                {/* Recommended Badge */}
                {mode.recommendedBadge && (
                  <div
                    className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${
                      isSaaS
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-700/80 shadow-md'
                        : 'bg-purple-950 text-purple-300 border-purple-700/80 shadow-md'
                    }`}
                  >
                    {mode.recommendedBadge}
                  </div>
                )}

                <div>
                  <div className={`flex items-center gap-3 mb-4 pl-4 border-l-2 ${
                    isSaaS ? 'border-cyan-500' : 'border-purple-500'
                  }`}>
                    <div
                      className={`p-3 rounded-xl border ${
                        isSaaS
                          ? 'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                          : 'bg-purple-950/80 text-purple-400 border-purple-800'
                      }`}
                    >
                      {isSaaS ? <Cloud className="w-6 h-6" /> : <Server className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-400 block uppercase">
                        {mode.modeNumber}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {mode.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-mono text-gray-400 block mb-1">
                      {lang === 'en' ? 'Target Audience:' : '目标客群:'}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-cyan-200">
                      {mode.targetAudience}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                    {mode.coreValue}
                  </p>

                  <div className="space-y-3 mb-8">
                    {mode.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isSaaS ? 'bg-cyan-950 text-cyan-400' : 'bg-purple-950 text-purple-400'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTier(mode.title);
                    const formEl = document.getElementById('cta-contact-form');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSaaS
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg glow-cyan'
                      : 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg glow-purple'
                  }`}
                >
                  <span>{lang === 'en' ? 'Select Mode for Evaluation' : '选择该模式预约评估'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Final CTA Banner & Business Email Input Section */}
        <div
          id="cta-contact-form"
          data-aos="fade-up"
          className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 glow-cyan text-center relative overflow-hidden mb-20 backdrop-blur-xl"
        >
          {/* Ambient Lighting Ring */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-4 glow-cyan">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{cta.defendData}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">{cta.finalTitle}</span>
            </h3>

            <p className="text-xs sm:text-base text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              {cta.finalSubtitle}
            </p>

            {/* Interactive Request Form */}
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center max-w-lg mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">
                  {cta.successMsg}
                </h4>
                <p className="text-xs text-gray-300 font-mono mt-2">
                  Channel ID: SEC-ENCLAVE-2026-X7 · NDA Protected
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      {lang === 'en' ? 'Full Name & Title' : '您的姓名 / 职位'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={cta.namePlaceholder}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      {lang === 'en' ? 'Organization / Firm' : '机构 / 律所 / 医院名称'}
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={cta.companyPlaceholder}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-mono text-gray-400 mb-1">
                    {lang === 'en' ? 'Desired Solution / Architecture' : '目标方案 / 部署模式'}
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/20 text-gray-200 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    {(cta.tierOptions || []).map((opt, oIdx) => (
                      <option key={oIdx} value={opt} className="bg-zinc-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email input + CTA Submit */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={cta.emailPlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs sm:text-sm transition-all whitespace-nowrap active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? cta.submitting : cta.submitBtn}
                  </button>
                </div>

                <div className="text-center text-gray-400 text-xs font-mono">
                  {cta.guarantee}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Minimalist Footer */}
        <footer className="pt-10 pb-6 border-t border-white/5 text-gray-400 text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-xs rotate-45 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-black rounded-xs"></div>
              </div>
              <span className="font-bold text-white text-sm">Covar<span className="text-cyan-400">AI</span></span>
              <span className="text-gray-600">|</span>
              <span className="font-mono text-gray-400 text-[11px]">
                {footer?.rights || '© 2026 CovarAI Technologies Inc.'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <button
                onClick={onOpenWhitepaper}
                className="hover:text-cyan-400 text-gray-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{footer?.links?.whitepaper || 'Whitepaper'}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800 font-mono">
                  v3.2
                </span>
              </button>
              <a href="#solutions" className="hover:text-cyan-400 transition-colors">
                {footer?.links?.solutions || 'Solutions'}
              </a>
              <a href="#deployment" className="hover:text-cyan-400 transition-colors">
                {footer?.links?.products || 'Products'}
              </a>
              <span className="hover:text-gray-200 cursor-pointer">
                {footer?.links?.privacy || 'Privacy'}
              </span>
              <span className="hover:text-gray-200 cursor-pointer">
                {footer?.links?.terms || 'Terms'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 font-mono text-[10px] gap-2">
            <span>{footer?.complianceNotice}</span>
            <span className="uppercase tracking-widest text-gray-400">Silicon Valley · Singapore · Hong Kong</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
