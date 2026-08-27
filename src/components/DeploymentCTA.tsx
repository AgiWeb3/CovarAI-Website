import React, { useState } from 'react';
import { Language, DeploymentModeDetail, PocStep } from '../types';
import { translations } from '../translations';
import {
  Cloud,
  Server,
  Network,
  Check,
  ArrowRight,
  Shield,
  Lock,
  Mail,
  Building,
  User,
  Sparkles,
  CheckCircle2,
  Clock,
  FileCheck2,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';

interface DeploymentCTAProps {
  lang: Language;
  onOpenWhitepaper: () => void;
}

export const DeploymentCTA: React.FC<DeploymentCTAProps> = ({ lang }) => {
  const currentTrans = translations[lang] || translations['zh-CN'];
  const t = currentTrans.deployment;
  const cta = currentTrans.deployment?.ctaSection || translations['zh-CN'].deployment.ctaSection;
  const footer = currentTrans.deployment?.footer || translations['zh-CN'].deployment.footer;

  const [activeModeIndex, setActiveModeIndex] = useState(0);
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

  const activeMode = (t.modes[activeModeIndex] || t.modes[0]) as DeploymentModeDetail;

  return (
    <section id="deployment" className="py-24 bg-black relative overflow-hidden border-t border-slate-900">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[650px] bg-radial-gradient blur-3xl pointer-events-none opacity-30" />

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

        {/* 3 Enterprise Delivery Blueprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {t.modes.map((mode, idx) => {
            const isSelected = activeModeIndex === idx;
            const modeDetail = mode as DeploymentModeDetail;
            const isGateway = modeDetail.iconType === 'cloud';
            const isVPC = modeDetail.iconType === 'network';
            const isAppliance = modeDetail.iconType === 'server';

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100 + 150}
                onClick={() => setActiveModeIndex(idx)}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border cursor-pointer ${
                  isSelected
                    ? isGateway
                      ? 'bg-zinc-900/90 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                      : isVPC
                      ? 'bg-zinc-900/90 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.25)] ring-1 ring-purple-400'
                      : 'bg-zinc-900/90 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                {/* Recommended Badge */}
                {modeDetail.recommendedBadge && (
                  <div
                    className={`absolute -top-3 right-5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                      isGateway
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-600/80 shadow-md'
                        : isVPC
                        ? 'bg-purple-950 text-purple-300 border-purple-600/80 shadow-md'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-600/80 shadow-md'
                    }`}
                  >
                    {modeDetail.recommendedBadge}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-3 rounded-xl border ${
                        isGateway
                          ? 'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                          : isVPC
                          ? 'bg-purple-950/80 text-purple-400 border-purple-800'
                          : 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                      }`}
                    >
                      {isGateway && <Cloud className="w-5 h-5" />}
                      {isVPC && <Network className="w-5 h-5" />}
                      {isAppliance && <Server className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 block uppercase">
                        {modeDetail.modeNumber}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {modeDetail.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-[11px] font-mono text-gray-400 block mb-1">
                      {lang === 'en' ? 'Target Audience:' : '目标客群:'}
                    </span>
                    <span className="text-xs font-medium text-cyan-200 block line-clamp-2">
                      {modeDetail.targetAudience}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                    {modeDetail.coreValue}
                  </p>

                  {/* Specs Snapshot Table */}
                  {modeDetail.specs && (
                    <div className="space-y-1.5 mb-5 p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono">
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'en' ? 'Deployment Time' : '上线周期'}:</span>
                        <span className="text-cyan-300 font-semibold">{modeDetail.specs.setupTime}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'en' ? 'Network Arch' : '网络架构'}:</span>
                        <span className="text-gray-200">{modeDetail.specs.networkReq}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'en' ? 'Sovereignty' : '数据主权'}:</span>
                        <span className="text-emerald-400 font-semibold">{modeDetail.specs.dataSovereignty}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'en' ? 'Compliance' : '合规标准'}:</span>
                        <span className="text-purple-300">{modeDetail.specs.complianceGrade}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-6">
                    {modeDetail.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isGateway
                              ? 'bg-cyan-950 text-cyan-400'
                              : isVPC
                              ? 'bg-purple-950 text-purple-400'
                              : 'bg-emerald-950 text-emerald-400'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModeIndex(idx);
                    setSelectedTier(modeDetail.title);
                    const formEl = document.getElementById('cta-contact-form');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? isGateway
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-md glow-cyan'
                        : isVPC
                        ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-md glow-purple'
                        : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span>{isSelected ? (lang === 'en' ? 'Selected Blueprint · Book POC' : '当前选中 · 预约此方案 POC') : (lang === 'en' ? 'Inspect Details' : '查看拓扑并评估')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Topology & Zero-Leakage Pipeline Flow for Active Mode */}
        {activeMode.topology && (
          <div
            data-aos="fade-up"
            className="rounded-2xl bg-zinc-950/80 border border-slate-800 p-6 sm:p-8 mb-20 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>{t.topologyTitle || '端到端数据流转与零泄露安全边界拓扑'}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {activeMode.title} · {lang === 'en' ? 'Confidential Pipeline Trace' : '密态全链路流转'}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'en' ? 'Security Boundary: 100% Cryptographic Barrier' : '安全边界: 100% 密码学物理/数学强隔离'}</span>
              </div>
            </div>

            {/* Pipeline Stage Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    STAGE 01
                  </span>
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  {lang === 'en' ? 'Intranet Client' : '内网终端 / 业务系统'}
                </h4>
                <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                  {activeMode.topology.client}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
                  ✓ {lang === 'en' ? 'Data Origin: Local' : '数据源头: 严格本地'}
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-900/80 px-2 py-0.5 rounded border border-cyan-700">
                    STAGE 02
                  </span>
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <h4 className="text-xs font-bold text-cyan-200 mb-1">
                  {lang === 'en' ? 'TrustGate KMS Gateway' : 'TrustGate 网关 / KMS'}
                </h4>
                <p className="text-[11px] text-cyan-100/80 leading-relaxed font-mono">
                  {activeMode.topology.gateway}
                </p>
                <div className="mt-3 pt-2 border-t border-cyan-900/60 text-[10px] text-cyan-400 font-mono">
                  ⚡ {lang === 'en' ? 'Local Covariance P·X·P⁻¹' : '本地协变混淆完成'}
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                    STAGE 03
                  </span>
                  <Network className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  {lang === 'en' ? 'Encrypted Transit' : '加密安全传输通道'}
                </h4>
                <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                  {activeMode.topology.transport}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-purple-400 font-mono">
                  🔒 {lang === 'en' ? 'Zero Plaintext in Transit' : '传输层 100% 乱码态'}
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-900/80 px-2 py-0.5 rounded border border-purple-700">
                    STAGE 04
                  </span>
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <h4 className="text-xs font-bold text-purple-200 mb-1">
                  {lang === 'en' ? 'Confidential Compute' : '云端 / 飞地密态算力'}
                </h4>
                <p className="text-[11px] text-purple-100/80 leading-relaxed font-mono">
                  {activeMode.topology.compute}
                </p>
                <div className="mt-3 pt-2 border-t border-purple-900/60 text-[10px] text-purple-300 font-mono">
                  🧠 {lang === 'en' ? 'MLA/MoE Zero-Plaintext Matrix' : '671B 零明文张量乘法'}
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    STAGE 05
                  </span>
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  {lang === 'en' ? 'Local Zero-Loss Recovery' : '本地无损极速自还原'}
                </h4>
                <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                  {activeMode.topology.recovery}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
                  🎯 {lang === 'en' ? '100% Logical Fidelity' : '纳秒级自抵消 · 0 精度损失'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🌟 3-Step 7-Day Enterprise POC Blueprint (3 步极速 POC 落地计划) */}
        {t.pocSteps && t.pocSteps.length > 0 && (
          <div data-aos="fade-up" className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>{t.pocTag || '7-DAY ENTERPRISE POC BLUEPRINT'}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-300 to-white">
                  {t.pocTitle}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {t.pocSubtitle}
              </p>
            </div>

            {/* 3-Step Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {t.pocSteps.map((step: PocStep, sIdx: number) => {
                return (
                  <div
                    key={sIdx}
                    className="rounded-2xl p-6 sm:p-7 bg-zinc-950/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between relative group"
                  >
                    {/* Step Header */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-mono font-bold">
                            {step.day}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400">
                            {step.duration}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                          {step.badge}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                        {step.phase}
                      </h4>

                      {/* Actionable Task Checkpoints */}
                      <div className="space-y-2.5 mb-6">
                        {step.tasks.map((task: string, tIdx: number) => (
                          <div key={tIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <div className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-800/80">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span className="leading-snug">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step Deliverable Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-semibold mb-1">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Phase Deliverable:' : '阶段里程碑交付物:'}</span>
                      </div>
                      <p className="text-gray-200 font-medium leading-relaxed text-[11px]">
                        {step.deliverable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
                  Channel ID: SEC-ENCLAVE-2026-X7 · NDA Protected · Priority Assigned
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
              <span
                className="text-gray-500 hover:text-gray-400 transition-colors cursor-not-allowed flex items-center gap-1 opacity-60 select-none"
                title={lang === 'en' ? 'Whitepaper is currently being updated for official release' : '技术白皮书正在更新中，正式版发布后开放下载'}
              >
                <span>{footer?.links?.whitepaper || 'Whitepaper'}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {lang === 'en' ? 'Updating' : '更新中'}
                </span>
              </span>
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
