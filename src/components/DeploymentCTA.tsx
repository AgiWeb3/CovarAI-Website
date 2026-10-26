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
  const [showDeepBlueprint, setShowDeepBlueprint] = useState(false);
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
    <section id="deployment" className="py-24 bg-transparent relative overflow-hidden border-t border-[#1f794d]/30">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[650px] bg-[#4ee48b]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061c0e] border border-[#1f794d]/40 text-[#4ee48b] text-xs font-mono uppercase tracking-widest mb-4"
          >
            <Server className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">{t.title}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
                      ? 'bg-[#061c0e]/95 border-[#4ee48b] shadow-[0_0_30px_rgba(78,228,139,0.25)] ring-1 ring-[#4ee48b]'
                      : isVPC
                      ? 'bg-[#061c0e]/95 border-[#0099ff] shadow-[0_0_30px_rgba(0,153,255,0.25)] ring-1 ring-[#0099ff]'
                      : 'bg-[#061c0e]/95 border-[#80f2b0] shadow-[0_0_30px_rgba(128,242,176,0.25)] ring-1 ring-[#80f2b0]'
                    : 'bg-[#061c0e]/60 border-[#1f794d]/30 hover:border-[#1f794d]/60 hover:bg-[#061c0e]/80'
                }`}
              >
                {/* Recommended Badge */}
                {modeDetail.recommendedBadge && (
                  <div
                    className={`absolute -top-3 right-5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                      isGateway
                        ? 'bg-[#092915] text-[#4ee48b] border-[#1f794d] shadow-md'
                        : isVPC
                        ? 'bg-[#001f3f] text-[#0099ff] border-[#0099ff]/50 shadow-md'
                        : 'bg-[#092915] text-[#80f2b0] border-[#1f794d] shadow-md'
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
                      {lang === 'en' ? 'Best For:' : '适用机构:'}
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
                        <span>{lang === 'en' ? 'Setup Time' : '上线周期'}:</span>
                        <span className="text-cyan-300 font-semibold">{modeDetail.specs.setupTime}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>{lang === 'en' ? 'Key Custody' : '密钥归属'}:</span>
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
                    setSelectedTier(cta.tierOptions?.[idx] || modeDetail.title);
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
                  <span>{isSelected ? (lang === 'en' ? 'Selected · Get Key / Book POC' : '当前选中 · 获取测试 Key / 评估') : (lang === 'en' ? 'Select This Mode' : '选择此交付形态')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Progressive Disclosure Toggle for 5-Stage Network Topology & 7-Day POC Plan */}
        <div className="text-center mb-16">
          <button
            type="button"
            onClick={() => setShowDeepBlueprint((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#061c0e] hover:bg-[#092915] border border-[#1f794d]/60 text-[#80f2b0] hover:text-white text-xs font-mono transition-all cursor-pointer shadow-md"
          >
            <Layers className="w-3.5 h-3.5 text-[#4ee48b]" />
            <span>
              {showDeepBlueprint
                ? lang === 'en'
                  ? 'Hide Detailed Network Topology & 7-Day POC Timeline ▲'
                  : '收起详细网络边界拓扑与 7 天 POC 流程 ▲'
                : lang === 'en'
                ? 'Expand Detailed Network Topology & 7-Day Red-Team POC Plan ▼'
                : '展开查看：端到端安全边界拓扑图 & 7 天红队盲测 POC 计划 ▼'}
            </span>
          </button>
        </div>

        {/* Collapsible Topology & 7-Day POC Blueprint */}
        {showDeepBlueprint && (
          <div className="animate-fade-in">
            {activeMode.topology && (
              <div className="rounded-2xl bg-zinc-950/80 border border-slate-800 p-6 sm:p-8 mb-14 relative overflow-hidden">
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
                    <span>{lang === 'en' ? 'Zero-Knowledge Boundary: Keys Never Leave Stage 02' : '安全边界: 密钥永不出内网阶段 02'}</span>
                  </div>
                </div>

                {/* Pipeline Stage Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
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
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-900/80 px-2 py-0.5 rounded border border-cyan-700">
                        STAGE 02
                      </span>
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <h4 className="text-xs font-bold text-cyan-200 mb-1">
                      {lang === 'en' ? 'Local Gateway / KMS' : '内网密态网关 / 本地 KMS'}
                    </h4>
                    <p className="text-[11px] text-cyan-100/80 leading-relaxed font-mono">
                      {activeMode.topology.gateway}
                    </p>
                  </div>

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
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-900/80 px-2 py-0.5 rounded border border-purple-700">
                        STAGE 04
                      </span>
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <h4 className="text-xs font-bold text-purple-200 mb-1">
                      {lang === 'en' ? 'Blind Cloud Compute' : '云端 / 飞地盲算'}
                    </h4>
                    <p className="text-[11px] text-purple-100/80 leading-relaxed font-mono">
                      {activeMode.topology.compute}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        STAGE 05
                      </span>
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">
                      {lang === 'en' ? 'Local Intranet Unlock' : '内网无损解锁还原'}
                    </h4>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                      {activeMode.topology.recovery}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3-Step 7-Day Enterprise POC Blueprint */}
            {t.pocSteps && t.pocSteps.length > 0 && (
              <div className="mb-20">
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.pocTag || '7-DAY ENTERPRISE POC BLUEPRINT'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                    {t.pocTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    {t.pocSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  {t.pocSteps.map((step: PocStep, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="rounded-2xl p-6 bg-zinc-950/90 border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-mono font-bold">
                            {step.day}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                            {step.badge}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-3">
                          {step.phase}
                        </h4>
                        <div className="space-y-2 mb-5">
                          {step.tasks.map((task: string, tIdx: number) => (
                            <div key={tIdx} className="flex items-start gap-2 text-xs text-gray-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold mb-0.5">
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Deliverable:' : '交付物:'}</span>
                        </div>
                        <p className="text-gray-200 text-[11px]">{step.deliverable}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Final Low-Friction Executive Evaluation & Sandbox Key Section */}
        <div
          id="cta-contact-form"
          data-aos="fade-up"
          className="rounded-3xl bg-white/5 border border-[#1f794d]/50 p-8 sm:p-12 glow-cyan text-center relative overflow-hidden mb-20 backdrop-blur-xl"
        >
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#092915] border border-[#4ee48b]/40 text-[#4ee48b] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#4ee48b]" />
              <span>{cta.defendData}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">{cta.finalTitle}</span>
            </h3>

            <p className="text-xs sm:text-base text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
              {cta.finalSubtitle}
            </p>

            {/* Quick Low-Friction Action Pills */}
            {!submitted && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto mb-6">
                {(cta.tierOptions || []).slice(0, 3).map((opt, idx) => {
                  const labels =
                    lang === 'en'
                      ? ['🔑 Free Sandbox API Key', '📄 5-Min CIO/CISO Brief', '🛡️ 7-Day Red-Team POC']
                      : lang === 'zh-TW'
                      ? ['🔑 免費申領測試 API Key', '📄 下載 5 分鐘高管簡報', '🛡️ 預約 7 天紅隊盲測 POC']
                      : ['🔑 免费申领测试 API Key', '📄 下载 5 分钟高管简报', '🛡️ 预约 7 天红队盲测 POC'];
                  const isActive = selectedTier === opt;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTier(opt)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#4ee48b] text-[#05160b] border-[#4ee48b] shadow-lg shadow-[#4ee48b]/20'
                          : 'bg-black/40 text-gray-300 border-white/15 hover:border-[#4ee48b]/50'
                      }`}
                    >
                      {labels[idx]}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Interactive Request Form */}
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center max-w-lg mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">
                  {cta.successMsg}
                </h4>
                <p className="text-xs text-gray-300 font-mono mt-2">
                  Channel ID: SEC-ENCLAVE-2026-X7 · Zero-Knowledge NDA Active
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      {lang === 'en' ? 'Your Name & Title' : '您的姓名与职务'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={cta.namePlaceholder}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:border-[#4ee48b] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      {lang === 'en' ? 'Organization' : '所属企业 / 机构'}
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={cta.companyPlaceholder}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:border-[#4ee48b] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-mono text-gray-400 mb-1">
                    {lang === 'en' ? 'Selected Evaluation Option' : '选择您希望获取的内容'}
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/20 text-gray-200 text-xs sm:text-sm focus:border-[#4ee48b] focus:outline-none"
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
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:border-[#4ee48b] focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg bg-[#4ee48b] text-[#05160b] hover:bg-[#38d677] font-bold text-xs sm:text-sm transition-all whitespace-nowrap active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#4ee48b]/20"
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
        <footer className="pt-10 pb-6 border-t border-[#1f794d]/20 text-gray-400 text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-[#1f794d] to-[#4ee48b] rounded-xs rotate-45 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 bg-[#05160b] rounded-xs"></div>
              </div>
              <span className="font-bold text-white text-sm">Covar<span className="text-[#4ee48b]">AI</span></span>
              <span className="text-gray-600">|</span>
              <span className="font-mono text-gray-400 text-[11px]">
                {footer?.rights || '© 2026 CovarAI Technologies Inc.'}
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-gray-400 hover:text-[#4ee48b] transition-colors inline-flex items-center gap-1.5 group"
                title="中华人民共和国工业和信息化部全国网络交易监管平台 / ICP备案查询"
              >
                <svg className="w-3.5 h-3.5 text-[#4ee48b]/70 group-hover:text-[#4ee48b] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="underline decoration-zinc-700 underline-offset-4 group-hover:decoration-[#4ee48b]">
                  {footer?.icp || '沪ICP备17051813号-6'}
                </span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <span
                className="text-zinc-500 hover:text-zinc-400 transition-colors cursor-not-allowed flex items-center gap-1 select-none"
                title={lang === 'en' ? 'Whitepaper is currently being updated for official release' : lang === 'zh-TW' ? '技術白皮書正在完善中，後續正式發布' : '技术白皮书正在完善中，后续正式放出'}
              >
                <span>{footer?.links?.whitepaper || (lang === 'en' ? 'Whitepaper' : lang === 'zh-TW' ? '技術白皮書' : '技术白皮书')}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {lang === 'en' ? 'Updating' : lang === 'zh-TW' ? '完善中' : '完善中'}
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

          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 font-mono text-[10px] gap-2 pt-4 border-t border-white/[0.04]">
            <span>{footer?.complianceNotice}</span>
            <span className="uppercase tracking-widest text-gray-400 text-center sm:text-right">Silicon Valley · Singapore · Hong Kong · Shanghai</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
