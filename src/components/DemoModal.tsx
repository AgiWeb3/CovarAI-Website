import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { X, Sparkles, Building, User, Mail, CheckCircle2, Lock } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialScenario?: string;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialScenario,
}) => {
  const currentTrans = translations[lang] || translations['zh-CN'];
  const cta = currentTrans.deployment?.ctaSection || translations['zh-CN'].deployment.ctaSection;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [tier, setTier] = useState(initialScenario || cta?.tierOptions?.[0] || 'POC');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialScenario) {
      setTier(initialScenario);
    } else if (cta?.tierOptions?.[0]) {
      setTier(cta.tierOptions[0]);
    }
  }, [initialScenario, lang, cta]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              {lang === 'en' ? 'Request Enterprise POC & Evaluation' : '预约行业方案评估与 POC 验证'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                {cta.successMsg}
              </h4>
              <p className="text-xs text-gray-400 font-mono">
                {lang === 'en' ? 'Secured Channel: SEC-COVAR-LIVE-ESTABLISHED' : '加密信道：SEC-COVAR-LIVE-ESTABLISHED'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                {cta.finalSubtitle}
              </p>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">
                  {lang === 'en' ? 'Your Name & Title' : '姓名 / 职位'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={cta.namePlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs focus:border-cyan-500 focus:outline-none"
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">
                  {lang === 'en' ? 'Business Work Email' : '商务工作邮箱'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={cta.emailPlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">
                  {lang === 'en' ? 'Desired Solution / Architecture' : '目标方案 / 部署模式'}
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/80 border border-white/10 text-gray-200 text-xs focus:border-cyan-500 focus:outline-none"
                >
                  {(cta?.tierOptions || []).map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {loading ? cta.submitting : cta.submitBtn}
                </button>
              </div>

              <div className="text-center text-[11px] font-mono text-gray-400 flex items-center justify-center gap-1 pt-1">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>{cta.guarantee}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
