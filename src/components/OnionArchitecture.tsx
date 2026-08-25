import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import {
  Layers,
  Shield,
  Server,
  Binary,
  Zap,
  Lock,
  Cpu,
  CheckCheck,
  ShieldAlert,
  Activity,
  Award,
  BarChart3,
  Sparkles,
  Eye,
  Radio,
  RefreshCw,
  UserCheck,
  FileCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Network,
  ArrowRight,
  ArrowLeftRight,
  Key,
  Bot,
  Database,
  Workflow,
  BrainCircuit,
  Boxes,
} from 'lucide-react';

interface OnionArchitectureProps {
  lang: Language;
}

export const OnionArchitecture: React.FC<OnionArchitectureProps> = ({ lang }) => {
  const currentTrans = translations[lang] || translations['zh-CN'];
  const t = currentTrans.onion || translations['zh-CN'].onion;
  const [selectedLayer, setSelectedLayer] = useState<'trustgate' | 'enclavex' | 'covarpri'>('covarpri');
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);
  
  // Benchmark Display Mode: 'axis-break' | 'log-scale' | 'throughput'
  const [benchmarkView, setBenchmarkView] = useState<'axis-break' | 'log-scale' | 'throughput'>('axis-break');

  const layerData = t.layers[selectedLayer] || t.layers.covarpri;

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-purple-400" />;
      case 'Key':
        return <Lock className="w-5 h-5 text-purple-400" />;
      case 'CheckCheck':
        return <CheckCheck className="w-5 h-5 text-purple-400" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-purple-400" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-sky-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-sky-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-sky-400" />;
      default:
        return <Shield className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="onion" className="py-28 bg-black relative overflow-hidden">
      {/* Background Lighting Aura & Dynamic Quantum Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-radial-gradient blur-3xl pointer-events-none opacity-40" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Canvas Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5"
          >
            <span className="text-gradient-cyan">{t.title}</span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
          >
            {t.subtitle}
          </p>
        </div>

        {/* 3-Layer Interactive Onion Geometry & Depth Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          
          {/* Left Column: Visual Onion Graphic with Multi-Layer Nested Rings (6 Cols) */}
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            {/* Onion Stage Visualizer Container */}
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-gradient-to-b from-slate-950/90 via-black to-slate-950/90 border border-slate-800/80 p-4 sm:p-6 shadow-2xl flex items-center justify-center overflow-hidden">
              
              {/* Outer Subtle Radar / Scan Beam */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[120%] h-[120%] rounded-full border border-cyan-500/10 animate-spin-slow" />
                <div className="absolute w-[95%] h-[95%] rounded-full border border-purple-500/10 animate-spin-reverse-slow" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent rounded-full animate-radar-scan" />
              </div>

              {/* Central Multi-Layered Onion SVG Diagram */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* SVG Onion Shield Shells with Organic Multi-layered Contours */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full max-w-[380px] max-h-[380px] drop-shadow-[0_0_35px_rgba(6,182,212,0.25)] select-none"
                >
                  <defs>
                    {/* Gradients */}
                    <radialGradient id="onionCoreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="85%" stopColor="#0f172a" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
                    </radialGradient>

                    <linearGradient id="ringGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>

                    <linearGradient id="ringGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>

                    <linearGradient id="ringGradCore" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>

                    <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* LAYER 1: OUTER LAYER (TrustGate) - Radius ~170px */}
                  <g
                    className="cursor-pointer transition-all duration-500"
                    onClick={() => setSelectedLayer('trustgate')}
                    onMouseEnter={() => setHoveredRing('trustgate')}
                    onMouseLeave={() => setHoveredRing(null)}
                  >
                    {/* Background Soft Shell Fill */}
                    <circle
                      cx="200"
                      cy="200"
                      r="170"
                      fill={selectedLayer === 'trustgate' ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255, 255, 255, 0.01)'}
                      className="transition-colors duration-500"
                    />

                    {/* Outer Dashed Orbit Track */}
                    <circle
                      cx="200"
                      cy="200"
                      r="170"
                      fill="none"
                      stroke={selectedLayer === 'trustgate' ? '#06b6d4' : '#1e293b'}
                      strokeWidth={selectedLayer === 'trustgate' ? '2.5' : '1.5'}
                      strokeDasharray={selectedLayer === 'trustgate' ? '8 6' : '4 6'}
                      className={selectedLayer === 'trustgate' ? 'animate-spin-slow' : ''}
                      style={{ transformOrigin: 'center' }}
                      filter={selectedLayer === 'trustgate' ? 'url(#glowFilter)' : undefined}
                    />

                    {/* Outer Security Sensor Nodes */}
                    <g className={selectedLayer === 'trustgate' ? 'animate-spin-reverse-slow' : ''} style={{ transformOrigin: 'center' }}>
                      <circle cx="200" cy="30" r="4.5" fill="#06b6d4" />
                      <circle cx="370" cy="200" r="4.5" fill="#06b6d4" />
                      <circle cx="200" cy="370" r="4.5" fill="#06b6d4" />
                      <circle cx="30" cy="200" r="4.5" fill="#06b6d4" />
                    </g>
                  </g>

                  {/* LAYER 2: MIDDLE LAYER (EnclaveX TEE) - Radius ~120px */}
                  <g
                    className="cursor-pointer transition-all duration-500"
                    onClick={() => setSelectedLayer('enclavex')}
                    onMouseEnter={() => setHoveredRing('enclavex')}
                    onMouseLeave={() => setHoveredRing(null)}
                  >
                    {/* Middle Ring Enclave Shroud */}
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      fill={selectedLayer === 'enclavex' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(15, 23, 42, 0.4)'}
                      className="transition-colors duration-500"
                    />

                    {/* Concentric Double Border */}
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      fill="none"
                      stroke={selectedLayer === 'enclavex' ? '#c084fc' : '#334155'}
                      strokeWidth={selectedLayer === 'enclavex' ? '3' : '1.5'}
                      className={selectedLayer === 'enclavex' ? 'animate-pulse-subtle' : ''}
                      filter={selectedLayer === 'enclavex' ? 'url(#glowFilter)' : undefined}
                    />

                    <circle
                      cx="200"
                      cy="200"
                      r="112"
                      fill="none"
                      stroke={selectedLayer === 'enclavex' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(51, 65, 85, 0.3)'}
                      strokeWidth="1"
                      strokeDasharray="6 4"
                      className="animate-spin-medium"
                      style={{ transformOrigin: 'center' }}
                    />

                    {/* Middle Hardware Anchor Nodes */}
                    <g className={selectedLayer === 'enclavex' ? 'animate-spin-reverse-medium' : ''} style={{ transformOrigin: 'center' }}>
                      <rect x="195" y="80" width="10" height="6" rx="2" fill="#a855f7" />
                      <rect x="314" y="195" width="6" height="10" rx="2" fill="#a855f7" />
                      <rect x="195" y="314" width="10" height="6" rx="2" fill="#a855f7" />
                      <rect x="80" y="195" width="6" height="10" rx="2" fill="#a855f7" />
                    </g>
                  </g>

                  {/* LAYER 3: CORE NUCLEUS (CovarPri Algebraic Kernel) - Radius ~65px */}
                  <g
                    className="cursor-pointer transition-all duration-500"
                    onClick={() => setSelectedLayer('covarpri')}
                    onMouseEnter={() => setHoveredRing('covarpri')}
                    onMouseLeave={() => setHoveredRing(null)}
                  >
                    {/* Core Glowing Orb */}
                    <circle
                      cx="200"
                      cy="200"
                      r="65"
                      fill="url(#onionCoreGlow)"
                      className="transition-all duration-500"
                      filter={selectedLayer === 'covarpri' ? 'url(#glowFilter)' : undefined}
                    />

                    {/* Inner Harmonic Wave Rings */}
                    <circle
                      cx="200"
                      cy="200"
                      r="65"
                      fill="none"
                      stroke={selectedLayer === 'covarpri' ? '#38bdf8' : '#1e40af'}
                      strokeWidth={selectedLayer === 'covarpri' ? '2.5' : '1.5'}
                      className="animate-pulse"
                    />

                    <circle
                      cx="200"
                      cy="200"
                      r="52"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="1"
                      strokeDasharray="4 3"
                      className="animate-spin-slow"
                      style={{ transformOrigin: 'center' }}
                    />

                    {/* Core Mathematical Glyph */}
                    <text
                      x="200"
                      y="192"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="var(--font-latin)"
                      letterSpacing="0.05em"
                    >
                      COVARPRI
                    </text>
                    <text
                      x="200"
                      y="207"
                      textAnchor="middle"
                      fill="#38bdf8"
                      fontSize="9"
                      fontFamily="var(--font-code)"
                      fontWeight="bold"
                    >
                      P·(A⊗B)·P⁻¹
                    </text>
                    <text
                      x="200"
                      y="220"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="7.5"
                      fontFamily="var(--font-code)"
                    >
                      NON-INVERTIBLE
                    </text>
                  </g>

                  {/* Onion Cross-Section Cut lines & Dimensional Rays */}
                  <line
                    x1="200"
                    y1="30"
                    x2="200"
                    y2="135"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <line
                    x1="200"
                    y1="265"
                    x2="200"
                    y2="370"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                </svg>

                {/* Floating Dynamic HUD Layer Tags */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-cyan-300">
                  <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>LIVE ONION SHIELD TOPOLOGY</span>
                </div>

                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-500 bg-black/60 px-2 py-0.5 rounded border border-white/5">
                  CLICK RINGS TO INSPECT
                </div>
              </div>
            </div>

            {/* Onion Layer Interactive Quick Selector Ribbon */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[480px] mt-5">
              {/* Button 1: TrustGate */}
              <button
                onClick={() => setSelectedLayer('trustgate')}
                className={`py-2.5 px-2 rounded-xl text-center border transition-all duration-300 cursor-pointer ${
                  selectedLayer === 'trustgate'
                    ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  {lang === 'en' ? 'Layer 1 · Outer' : lang === 'zh-TW' ? 'Layer 1 · 外層' : 'Layer 1 · 外层'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === 'en' ? 'TrustGate Gateway' : lang === 'zh-TW' ? 'TrustGate 網關' : 'TrustGate 网关'}
                </div>
              </button>

              {/* Button 2: EnclaveX */}
              <button
                onClick={() => setSelectedLayer('enclavex')}
                className={`py-2.5 px-2 rounded-xl text-center border transition-all duration-300 cursor-pointer ${
                  selectedLayer === 'enclavex'
                    ? 'bg-purple-950/60 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                  {lang === 'en' ? 'Layer 2 · Enclave' : lang === 'zh-TW' ? 'Layer 2 · 夾層' : 'Layer 2 · 夹层'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === 'en' ? 'EnclaveX TEE' : lang === 'zh-TW' ? 'EnclaveX 飛地' : 'EnclaveX 飞地'}
                </div>
              </button>

              {/* Button 3: CovarPri */}
              <button
                onClick={() => setSelectedLayer('covarpri')}
                className={`py-2.5 px-2 rounded-xl text-center border transition-all duration-300 cursor-pointer ${
                  selectedLayer === 'covarpri'
                    ? 'bg-sky-950/60 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)] scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                  {lang === 'en' ? 'Layer 3 · Kernel' : lang === 'zh-TW' ? 'Layer 3 · 核心' : 'Layer 3 · 内核'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === 'en' ? 'CovarPri Obfuscation' : lang === 'zh-TW' ? 'CovarPri 混淆' : 'CovarPri 混淆'}
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Deep-Dive Architectural Spec & Security Guarantee (6 Cols) */}
          <div
            data-aos="fade-left"
            data-aos-delay="250"
            className="lg:col-span-6"
          >
            <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
              
              {/* Dynamic Top Glow Strip based on active layer */}
              <div
                className={`absolute top-0 left-8 right-8 h-[2px] rounded-full transition-all duration-500 ${
                  selectedLayer === 'trustgate'
                    ? 'bg-cyan-400 shadow-[0_0_15px_#06b6d4]'
                    : selectedLayer === 'enclavex'
                    ? 'bg-purple-400 shadow-[0_0_15px_#a855f7]'
                    : 'bg-sky-400 shadow-[0_0_15px_#38bdf8]'
                }`}
              />

              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-800">
                <div>
                  <span
                    className={`text-xs font-mono uppercase tracking-widest block mb-1 font-semibold ${
                      selectedLayer === 'trustgate'
                        ? 'text-cyan-400'
                        : selectedLayer === 'enclavex'
                        ? 'text-purple-400'
                        : 'text-sky-400'
                    }`}
                  >
                    {layerData.level}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {layerData.name}
                  </h3>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-mono font-medium">
                  {layerData.tagline}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {layerData.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-3.5 mb-6">
                {layerData.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0 mt-0.5 shadow-md">
                      {getFeatureIcon(feat.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Line */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="text-slate-500">底层技术标准:</span>
                <span className="text-cyan-300 font-semibold">{layerData.techSpec}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Empirical Benchmarks Section */}
        <div id="performance" className="pt-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div
              data-aos="fade-up"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-400 text-xs font-mono uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>EMPIRICAL BENCHMARKS</span>
            </div>

            <h3
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3"
            >
              <span className="text-gradient-purple">{t.metricsTitle}</span>
            </h3>

            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="text-xs sm:text-sm text-slate-400 font-mono"
            >
              {t.metricsSubtitle}
            </p>
          </div>

          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.metrics.map((metric, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100 + 200}
                className="rounded-2xl bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-black border border-slate-800 p-6 sm:p-8 text-center relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300 shadow-xl"
              >
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 font-mono tracking-tight mb-3">
                  {metric.value}
                </div>

                <div className="text-base sm:text-lg font-bold text-white mb-2">
                  {metric.label}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {metric.subtext}
                </p>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400/90 flex items-center justify-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{metric.verifiedOn}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Empirical Benchmark Visualizer with Dynamic Modes */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
          >
            {/* Benchmark Header & Scale Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg sm:text-xl font-extrabold text-white">
                    {lang === 'en' ? 'Inference Latency & Throughput Benchmark' : '推理延迟 (TPOT) 与吞吐量 (TPS) 深度基准'}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                    DeepSeek 671B MoE
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {lang === 'en'
                    ? 'Empirical comparison: CovarPri Covariance vs Native Plaintext vs Homomorphic Encryption (FHE)'
                    : '实测对比：CovarPri 代数协变混淆 vs 原生明文 GPU vs 传统全同态加密 (FHE)'}
                </p>
              </div>

              {/* Visualization Scale Mode Selector */}
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 self-start lg:self-auto">
                <button
                  onClick={() => setBenchmarkView('axis-break')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    benchmarkView === 'axis-break'
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? '⚡ Linear (Axis Break)' : '⚡ 线性破轴截断'}
                </button>
                <button
                  onClick={() => setBenchmarkView('log-scale')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    benchmarkView === 'log-scale'
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? '📈 Log Scale (log₁₀)' : '📈 对数标尺 (log₁₀)'}
                </button>
                <button
                  onClick={() => setBenchmarkView('throughput')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    benchmarkView === 'throughput'
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? '🚀 Throughput (Tokens/s)' : '🚀 吞吐速率 (tok/s)'}
                </button>
              </div>
            </div>

            {/* Visual Charts Display */}
            <div className="space-y-6 mb-8">
              
              {/* ITEM 1: CovarPri */}
              {/* ITEM 1: CovarPri Covariant Obfuscation */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-bold text-white text-sm">
                      {lang === 'en'
                        ? 'CovarPri Algebraic Covariant Obfuscation (Our Scheme)'
                        : lang === 'zh-TW'
                        ? 'CovarPri 代數協變混淆 (Our Scheme)'
                        : 'CovarPri 代数协变混淆 (Our Scheme)'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-[10px] border border-cyan-700">
                      {lang === 'en'
                        ? 'Zero-Leak Confidential · Production Ready'
                        : lang === 'zh-TW'
                        ? '密態零洩漏 · 工業生產可用'
                        : '密态零泄露 · 工业生产可用'}
                    </span>
                  </div>
                  <div className="text-cyan-300 font-bold text-sm">
                    {benchmarkView === 'throughput' ? (
                      <span>
                        138.8 Tokens/sec{' '}
                        <span className="text-slate-400 text-xs font-normal">
                          ({lang === 'en' ? '98.6% Native Speed' : lang === 'zh-TW' ? '98.6% 原生吞吐' : '98.6% 原生吞吐'})
                        </span>
                      </span>
                    ) : (
                      <span>
                        7.2 ms / token{' '}
                        <span className="text-slate-400 text-xs font-normal">
                          ({lang === 'en' ? 'Overhead < 1.4%' : lang === 'zh-TW' ? '開銷 < 1.4%' : '开销 < 1.4%'})
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                    style={{
                      width:
                        benchmarkView === 'throughput'
                          ? '98.6%'
                          : benchmarkView === 'log-scale'
                          ? '28.5%'
                          : '72%',
                    }}
                  />
                </div>
              </div>

              {/* ITEM 2: Native Plaintext GPU Baseline */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <span className="font-bold text-slate-200 text-sm">
                      {lang === 'en'
                        ? 'Traditional Plaintext GPU Baseline (Public Cloud)'
                        : lang === 'zh-TW'
                        ? '傳統原生公有雲明文基準 (Plaintext GPU)'
                        : '传统原生公有云明文基线 (Plaintext GPU)'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      {lang === 'en'
                        ? 'Native Baseline · Plaintext Exposure Risk'
                        : lang === 'zh-TW'
                        ? '原生基準 · 存在明文暴露風險'
                        : '原生基准 · 存在明文暴露风险'}
                    </span>
                  </div>
                  <div className="text-slate-300 font-bold text-sm">
                    {benchmarkView === 'throughput' ? (
                      <span>
                        140.8 Tokens/sec{' '}
                        <span className="text-slate-500 text-xs font-normal">
                          ({lang === 'en' ? '100% Baseline' : lang === 'zh-TW' ? '100% 基準' : '100% 基线'})
                        </span>
                      </span>
                    ) : (
                      <span>
                        7.1 ms / token{' '}
                        <span className="text-slate-500 text-xs font-normal">
                          ({lang === 'en' ? '0% Overhead' : lang === 'zh-TW' ? '基準 0% 損耗' : '基准 0% Overhead'})
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
                  <div
                    className="h-full bg-slate-500 rounded-full transition-all duration-700"
                    style={{
                      width:
                        benchmarkView === 'throughput'
                          ? '100%'
                          : benchmarkView === 'log-scale'
                          ? '28.0%'
                          : '71%',
                    }}
                  />
                </div>
              </div>

              {/* ITEM 3: Fully Homomorphic Encryption (FHE) with Broken Axis / 1000x Exploded View */}
              <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/40 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="font-bold text-red-300 text-sm">
                      {lang === 'en'
                        ? 'Traditional Fully Homomorphic Encryption (FHE Schemes)'
                        : lang === 'zh-TW'
                        ? '傳統全同態加密方案 (FHE Schemes)'
                        : '传统全同态加密方案 (FHE Schemes)'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 text-[10px] border border-red-800 font-bold">
                      {lang === 'en'
                        ? '⚠️ 1000x Latency Cliff · Unviable for Production'
                        : lang === 'zh-TW'
                        ? '⚠️ 1000x 延遲斷崖 · 生產不可用'
                        : '⚠️ 1000x 延迟断崖 · 生产不可用'}
                    </span>
                  </div>
                  <div className="text-red-400 font-bold text-sm">
                    {benchmarkView === 'throughput' ? (
                      <span>
                        0.14 Tokens/sec{' '}
                        <span className="text-red-500 text-xs font-normal">
                          ({lang === 'en' ? '7.2 sec per token' : lang === 'zh-TW' ? '需 7.2 秒生成 1 個字' : '需 7.2 秒生成 1 个字'})
                        </span>
                      </span>
                    ) : (
                      <span>
                        7,200.0 ms / token{' '}
                        <span className="text-red-500 text-xs font-normal">
                          ({lang === 'en' ? '1000x Slower / +99,900%' : lang === 'zh-TW' ? '慢 1000 倍 / +99,900%' : '慢 1000 倍 / +99,900%'})
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Dynamic Bar Representation */}
                {benchmarkView === 'axis-break' ? (
                  /* Broken Axis Visual: Extends with broken lightning marks & Out of bounds badge */
                  <div className="relative">
                    <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
                      <div className="h-full bg-gradient-to-r from-red-600 via-red-500 to-rose-400 rounded-l-full w-[85%] relative flex items-center justify-end pr-2">
                        <span className="text-[9px] font-mono font-black text-black bg-white/90 px-1.5 py-0.2 rounded">
                          {lang === 'en' ? '// ⚡ 1000x Axis Break (Truncated)' : '// ⚡ 1000x 越界截斷 (Axis Break)'}
                        </span>
                      </div>
                      <div className="w-[15%] h-full bg-stripes-red animate-pulse flex items-center justify-center">
                        <span className="text-[10px] text-red-400 font-bold font-mono">
                          {lang === 'en' ? '>> OVERFLOW' : '>> 爆表'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-red-400/90">
                      <span>
                        {lang === 'en'
                          ? '* Note: On a 1:1 linear scale, the FHE bar would extend >72 meters (>100x screen width)'
                          : lang === 'zh-TW'
                          ? '* 註：若按真實 1:1 線性比例繪製，FHE 柱長需向右延伸超過 72 米（螢幕寬度的 100 倍）'
                          : '* 注：若按真实 1:1 线性比例绘制，FHE 柱长需向右延伸超过 72 米（屏幕宽度的 100 倍）'}
                      </span>
                      <span className="font-bold text-red-300">1000x Slowdown</span>
                    </div>
                  </div>
                ) : benchmarkView === 'log-scale' ? (
                  /* Log Scale: Shows true 3-order-of-magnitude bar ~ 100% */
                  <div>
                    <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-700 w-[100%] shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>log₁₀(7200ms) ≈ 3.86</span>
                      <span className="text-red-400 font-bold">
                        {lang === 'en' ? '3 Orders of Magnitude Latency Gap' : lang === 'zh-TW' ? '3 個數量級效能鴻溝 (3 Orders of Magnitude)' : '3 个数量级性能鸿沟 (3 Orders of Magnitude)'}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Throughput TPS: Bar is a microscopic sliver (0.1%) */
                  <div>
                    <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-700 w-[0.2%] min-w-[4px]"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-red-400">
                      <span>
                        {lang === 'en'
                          ? 'Throughput is only 0.14 tokens/sec (unusable)'
                          : lang === 'zh-TW'
                          ? '吞吐量僅 0.14 字元/秒（幾乎停滯）'
                          : '吞吐量仅 0.14 字符/秒（几乎停滞）'}
                      </span>
                      <span className="font-bold">
                        {lang === 'en' ? 'Only 0.1% of Native TPS' : lang === 'zh-TW' ? '僅為原生速度的 0.1%' : '仅为原生速度的 0.1%'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scientific Architecture Comparison Matrix Table */}
            <div className="rounded-2xl bg-black/60 border border-slate-800 p-4 sm:p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-white font-bold">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  {lang === 'en'
                    ? 'Confidential LLM Engineering Benchmark Matrix'
                    : lang === 'zh-TW'
                    ? '大模型密態計算工程全維度矩陣對比 (Engineering Benchmark Matrix)'
                    : '大模型密态计算工程全维度矩阵对比 (Engineering Benchmark Matrix)'}
                </span>
                <span className="text-[11px] text-cyan-400">DeepSeek-671B MoE / Qwen-2.5-MoE</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 pr-4">{lang === 'en' ? 'Comparison Dimension' : lang === 'zh-TW' ? '對比維度' : '对比维度'}</th>
                      <th className="pb-3 px-4 text-cyan-400 font-bold">{lang === 'en' ? 'CovarPri (Our Scheme)' : lang === 'zh-TW' ? 'CovarPri (本方案)' : 'CovarPri (本方案)'}</th>
                      <th className="pb-3 px-4 text-slate-300">{lang === 'en' ? 'Native Plaintext GPU' : lang === 'zh-TW' ? '傳統公有雲明文 (Plaintext)' : '传统公有云明文 (Plaintext)'}</th>
                      <th className="pb-3 pl-4 text-red-400">{lang === 'en' ? 'Fully Homomorphic (FHE)' : lang === 'zh-TW' ? '全同態加密 (FHE)' : '全同态加密 (FHE)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-3 pr-4 font-bold text-white">
                        {lang === 'en' ? 'Time Per Output Token (TPOT)' : lang === 'zh-TW' ? '單 Token 延遲 (TPOT)' : '单 Token 延迟 (TPOT)'}
                      </td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">7.2 ms <span className="text-[10px] text-emerald-400">(+1.4%)</span></td>
                      <td className="py-3 px-4 text-slate-400">7.1 ms ({lang === 'en' ? 'Baseline' : lang === 'zh-TW' ? '基準' : '基准'})</td>
                      <td className="py-3 pl-4 text-red-400 font-bold">7,200.0 ms <span className="text-[10px] text-red-500">({lang === 'en' ? '1000x Slower' : lang === 'zh-TW' ? '1000x 慢' : '1000x 慢'})</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-white">
                        {lang === 'en' ? 'Time to First Token (TTFT)' : lang === 'zh-TW' ? '首字生成延遲 (TTFT)' : '首字生成延迟 (TTFT)'}
                      </td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">32 ms <span className="text-[10px] text-emerald-400">({lang === 'en' ? 'Instant Response' : lang === 'zh-TW' ? '瞬時響應' : '瞬时响应'})</span></td>
                      <td className="py-3 px-4 text-slate-400">30 ms</td>
                      <td className="py-3 pl-4 text-red-400 font-bold">45,000 ms <span className="text-[10px] text-red-500">({lang === 'en' ? '45s Stall' : lang === 'zh-TW' ? '卡頓45秒' : '卡顿45秒'})</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-white">
                        {lang === 'en' ? 'Generation Throughput (TPS)' : lang === 'zh-TW' ? '生成吞吐速率 (TPS)' : '生成吞吐速率 (TPS)'}
                      </td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">138.8 tok/s <span className="text-[10px] text-emerald-400">({lang === 'en' ? 'Ultra Fast' : lang === 'zh-TW' ? '打字機極速' : '打字机极速'})</span></td>
                      <td className="py-3 px-4 text-slate-400">140.8 tok/s</td>
                      <td className="py-3 pl-4 text-red-400 font-bold">0.14 tok/s <span className="text-[10px] text-red-500">({lang === 'en' ? 'Nearly Stalled' : lang === 'zh-TW' ? '幾乎停滯' : '几乎停滞'})</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-white">
                        {lang === 'en' ? 'Cloud Plaintext Exposure Risk' : lang === 'zh-TW' ? '雲端明文洩漏風險' : '云端明文泄露风险'}
                      </td>
                      <td className="py-3 px-4 text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 0% ({lang === 'en' ? 'Mathematically Obfuscated' : lang === 'zh-TW' ? '數學級亂碼態' : '数学级乱码态'})
                      </td>
                      <td className="py-3 px-4 text-rose-400 font-bold flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-400" /> 100% ({lang === 'en' ? 'Unprotected Plaintext' : lang === 'zh-TW' ? '完全裸奔' : '完全裸奔'})
                      </td>
                      <td className="py-3 pl-4 text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 0% ({lang === 'en' ? 'Encrypted State' : lang === 'zh-TW' ? '密態計算' : '密态计算'})
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold text-white">
                        {lang === 'en' ? '671B MoE Production Feasibility' : lang === 'zh-TW' ? '超大模型 (70B/671B) 生產可用性' : '超大模型 (70B/671B) 生产可用性'}
                      </td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {lang === 'en' ? '✅ Plug-and-Play Production' : lang === 'zh-TW' ? '✅ 即插即用生產落地' : '✅ 即插即用生产落地'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-amber-400">
                        <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                          {lang === 'en' ? '⚠️ Compliance Blocked' : lang === 'zh-TW' ? '⚠️ 合規攔截受限' : '⚠️ 合规拦截受限'}
                        </span>
                      </td>
                      <td className="py-3 pl-4 text-red-400">
                        <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                          {lang === 'en' ? '❌ Compute Exploded (Unusable)' : lang === 'zh-TW' ? '❌ 算力爆炸無法商用' : '❌ 算力爆炸无法商用'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Insight Callout */}
              <div className="mt-4 space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-slate-300 text-xs leading-relaxed">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {lang === 'en' ? (
                      <>
                        <strong>Scientific Insight: </strong>Traditional Fully Homomorphic Encryption (FHE) suffers from polynomial ring noise explosion and exorbitant multiplication bootstrapping costs, causing a 1,000x to 10,000x latency penalty. <strong>CovarPri</strong> uses algebraic covariant matrix perturbations where obfuscation factors cancel out naturally inside the Attention dot-product, achieving practical zero-plaintext confidential inference for 671B-class frontier MoE models with <strong>&lt; 1.4%</strong> overhead.
                      </>
                    ) : lang === 'zh-TW' ? (
                      <>
                        <strong>科學解析：</strong>傳統全同態加密 (FHE) 會造成多項式環上的噪聲爆炸與高昂乘法自舉 (Bootstrapping) 開銷，導致 1000~10000 倍的延遲劇增。<strong>CovarPri</strong> 採用代數協變矩陣擾動，使混淆因子在注意力機制點積內部自發抵消，以 <strong>&lt; 1.4%</strong> 極微小損耗實現了首個面向 671B 級超大模型的實用化零明文推理。
                      </>
                    ) : (
                      <>
                        <strong>科学解析：</strong>传统全同态加密 (FHE) 会造成多项式环上的噪声爆炸与高昂乘法自举 (Bootstrapping) 开销，导致 1000~10000 倍的延迟剧增。<strong>CovarPri</strong> 采用代数协变矩阵扰动，使混淆因子在注意力机制点积内部自发抵消，以 <strong>&lt; 1.4%</strong> 极微小损耗实现了首个面向 671B 级超大模型的实用化零明文推理。
                      </>
                    )}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed font-mono">
                  <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cyan-300 font-bold block mb-0.5">
                      {lang === 'en' ? '[Architecture Scope & Model Management Governance]' : lang === 'zh-TW' ? '【架構邊界說明 · 模型納管分工】' : '【架构边界说明 · 模型纳管分工】'}
                    </span>
                    <span>
                      {lang === 'en' ? (
                        <>
                          • <strong>CovarPri Algebraic Obfuscation</strong>: Tailored for <strong>open-weight & controllable MoE models</strong> (e.g., DeepSeek-V3/R1 671B MoE, Qwen-2.5-MoE, Mixtral 8x22B enterprise private/hosted instances), performing covariant transformations on underlying operators and tensors.<br />
                          • <strong>Closed-Source Black-Box APIs (OpenAI / Claude)</strong>: Because third-party proprietary weights and kernels are completely opaque, <strong>CovarPri tensor obfuscation does not apply</strong>. The platform utilizes <strong>TrustGate Intent Firewall</strong> on the client-side for millisecond-level PII/PHI neural redaction, format-preserving tokenization, and Tool Calling action locks.
                        </>
                      ) : lang === 'zh-TW' ? (
                        <>
                          • <strong>CovarPri 代數混淆</strong>：專用於<strong>最新開源與可控權重 MoE 架構</strong>（如 DeepSeek-V3/R1 671B MoE, Qwen-2.5-MoE, Mixtral 8x22B 等企業私有化或託管實例），因需對模型底層算子與權重張量進行協變變換。<br />
                          • <strong>閉源黑盒 API (OpenAI / Claude)</strong>：因第三方商業模型權重與底層計算過程完全封閉，<strong>CovarPri 張量混淆對其無效</strong>。系統統籌由 <strong>TrustGate 意圖防火牆</strong>在客戶端實施毫秒級 PII/PHI 實體動態脫敏、格式保留加密與 Tool Calling 動作鎖兜底。
                        </>
                      ) : (
                        <>
                          • <strong>CovarPri 代数混淆</strong>：专用于<strong>最新开源与可控权重 MoE 架构</strong>（如 DeepSeek-V3/R1 671B MoE, Qwen-2.5-MoE, Mixtral 8x22B 等企业私有化或托管实例），因需对模型底层算子与权重张量进行协变变换。<br />
                          • <strong>闭源黑盒 API (OpenAI / Claude)</strong>：因第三方商业模型权重与底层计算过程完全封闭，<strong>CovarPri 张量混淆对其无效</strong>。系统统一由 <strong>TrustGate 意图防火墙</strong>在客户端实施毫秒级 PII/PHI 实体动态脱敏、格式保留加密与 Tool Calling 动作锁兜底。
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 CORE NARRATIVE INNOVATIONS & ENTERPRISE 3-TIER TOPOLOGY */}
            <div className="mt-12 pt-10 border-t border-slate-800">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono mb-3">
                  <Network className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'ENTERPRISE DEPLOYMENT TOPOLOGY' : lang === 'zh-TW' ? '企業級三級部署拓撲與前沿範式' : '企业级三级部署拓扑与前沿范式'}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {lang === 'en'
                    ? 'Sovereign 3-Tier Topology & Frontier AI Defense'
                    : lang === 'zh-TW'
                    ? '企業三級主權部署拓撲與前沿 AI 密態護城河'
                    : '企业三级主权部署拓扑与前沿 AI 密态护城河'}
                </h3>
                <p className="text-sm text-slate-400">
                  {lang === 'en'
                    ? 'From Agentic MCP protocol auditing to Reasoning Model CoT shielding and MLA tensor obfuscation.'
                    : lang === 'zh-TW'
                    ? '從 Multi-Agent MCP 協議零信任治理、Reasoning 模型長思維鏈防窺探，到 MLA 潛變量張量混淆的全棧落地方案。'
                    : '从 Multi-Agent MCP 协议零信任治理、Reasoning 模型长思维链防窥探，到 MLA 潜变量张量混淆的全栈落地方案。'}
                </p>
              </div>

              {/* 3-Tier Interactive Topology Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                
                {/* TIER 1 */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 flex flex-col justify-between">
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded bg-cyan-500 text-black text-[11px] font-mono font-bold">
                    Tier 1 · Sovereign Domain
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4 mt-2">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">
                          {lang === 'en' ? 'Enterprise Sovereign Intranet / Edge' : lang === 'zh-TW' ? '企業主權內網 / 邊緣安全域' : '企业主权内网 / 边缘安全域'}
                        </h4>
                        <span className="text-[11px] text-cyan-400 font-mono">100% On-Premise Sovereign Gateway</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <UserCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>TrustGate Intent/PII Ingress: </strong>Real-time Neural NER masks PII/PHI and blocks prompt injection & unauthorized instructions.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>TrustGate 意圖/PII 准入：</strong>神經 NER 實時遮蔽敏感實體，攔截越權指令。</>
                          ) : (
                            <><strong>TrustGate 意图/PII 准入：</strong>神经 NER 实时遮蔽敏感实体，拦截越权指令。</>
                          )}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Bot className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>MCP Protocol Sovereign Gateway: </strong>Applies zero-trust cryptographic signatures & action locks on Agent Tool Calling & DB access.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>MCP 協議密態網關：</strong>對 Agent Tool Calling 與資料庫讀寫施加零信任簽名與動作鎖。</>
                          ) : (
                            <><strong>MCP 协议密态网关：</strong>对 Agent Tool Calling 与数据库读写施加零信任签名与动作锁。</>
                          )}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Key className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>CovarPri Local Obfuscator: </strong>Generates orthogonal perturbation matrix $P$; secrets never leave enterprise perimeter.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>CovarPri 本地混淆器：</strong>生成正交排列矩陣 $P$ 與擾動，金鑰永不出企業內網。</>
                          ) : (
                            <><strong>CovarPri 本地混淆器：</strong>生成正交排列矩阵 $P$ 与扰动，密钥永不出企业内网。</>
                          )}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-300/80 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Output: Irreversible Obfuscated Tensors' : lang === 'zh-TW' ? '輸出：不可逆密態張量流' : '输出：不可逆密态张量流'}</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* TIER 2 */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-purple-500/30 flex flex-col justify-between">
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded bg-purple-500 text-white text-[11px] font-mono font-bold">
                    Tier 2 · Zero-Trust Channel
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4 mt-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <ArrowLeftRight className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">
                          {lang === 'en' ? 'Zero-Trust Encrypted Transport Channel' : lang === 'zh-TW' ? '零信任加密傳輸信道' : '零信任加密传输信道'}
                        </h4>
                        <span className="text-[11px] text-purple-400 font-mono">Zero Plaintext on Public Network</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>Bidirectional mTLS 1.3: </strong>End-to-end encrypted tunnels guarding against wiretapping and MITM tampering.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>雙向 mTLS 1.3 傳輸：</strong>端到端加密信道，防止鏈路竊聽與中間人劫持。</>
                          ) : (
                            <><strong>双向 mTLS 1.3 传输：</strong>端到端加密信道，防止链路窃听与中间人劫持。</>
                          )}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Binary className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>Pure Algebraic Perturbation Flow: </strong>No plaintext characters on wire; intercepts yield high-dimensional mathematical entropy.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>純代數擾動資料流：</strong>傳輸介質上無明文字元，截獲即為無意義高維數學亂碼。</>
                          ) : (
                            <><strong>纯代数扰动数据流：</strong>传输介质上无明文字符，截获即为无意义高维数学乱码。</>
                          )}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>Remote Hardware Attestation: </strong>Continuously verifies cryptographic measurement of cloud GPU hosts.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>遠程硬體度量驗真：</strong>實時校驗雲端 GPU 宿主物理環境雜湊值未被篡改。</>
                          ) : (
                            <><strong>远程硬件度量验真：</strong>实时校验云端 GPU 宿主物理环境哈希值未被篡改。</>
                          )}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-300/80 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Security: Mathematical + Protocol Dual-Immunity' : lang === 'zh-TW' ? '信道安全性：數學 + 協議雙重免疫' : '信道安全性：数学 + 协议双重免疫'}</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </div>
                </div>

                {/* TIER 3 */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-blue-500/30 flex flex-col justify-between">
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded bg-blue-500 text-white text-[11px] font-mono font-bold">
                    Tier 3 · Public GPU Cloud
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4 mt-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">
                          {lang === 'en' ? 'Untrusted Public GPU Cloud Cluster' : lang === 'zh-TW' ? '不可信公有雲 / GPU 算力集群' : '不可信公有云 / GPU 算力集群'}
                        </h4>
                        <span className="text-[11px] text-blue-400 font-mono">DeepSeek-671B MoE / H100 Cluster</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <Server className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>EnclaveX TEE Physical Isolation: </strong>Prevents CSPs and host OS from snooping long Chain-of-Thought (&lt;think&gt; CoT).</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>EnclaveX TEE 硬體物理隔離：</strong>雲廠商與宿主 OS 無法窺視長思維鏈 (&lt;think&gt; CoT)。</>
                          ) : (
                            <><strong>EnclaveX TEE 硬件物理隔离：</strong>云厂商与宿主 OS 无法窥视长思维链 (&lt;think&gt; CoT)。</>
                          )}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Boxes className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>MLA & MoE Confidential Operators: </strong>Ultra-fast computation on obfuscated Latent KV Cache & dynamic routing gates.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>MLA & MoE 密態算子：</strong>在混淆的 Latent KV Cache 與動態路由門控上極速計算。</>
                          ) : (
                            <><strong>MLA & MoE 密态算子：</strong>在混淆的 Latent KV Cache 与动态路由门控上极速计算。</>
                          )}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'en' ? (
                            <><strong>Dot-Product Self-Cancellation: </strong>Output tensors stream back to sovereign domain for recovery; zero plaintext on cloud.</>
                          ) : lang === 'zh-TW' ? (
                            <><strong>點積自發抵消還原：</strong>輸出張量流回主權域解密，雲端全程零明文接觸。</>
                          ) : (
                            <><strong>点积自发抵消还原：</strong>输出张量流回主权域解密，云端全程零明文接触。</>
                          )}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-blue-300/80 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Efficiency: 98.6% Native GPU Throughput' : lang === 'zh-TW' ? '算力利用率：98.6% 原生吞吐' : '算力利用率：98.6% 原生吞吐'}</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                </div>

              </div>

              {/* 3 Pillars Deep Tech Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Pillar 1: Reasoning CoT */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                    <BrainCircuit className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Reasoning Model CoT Privacy' : lang === 'zh-TW' ? 'Reasoning 模型思維鏈 (CoT) 隱私' : 'Reasoning 模型思维链 (CoT) 隐私'}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'en'
                      ? 'Confidential encapsulation of ultra-long intermediate <think> tokens in models like DeepSeek-R1 and OpenAI o1, eliminating risk of trade secret reasoning capture on cloud.'
                      : lang === 'zh-TW'
                      ? '針對 DeepSeek-R1、OpenAI o1 等推理模型的超長 <think> 中間推理 token 進行全密態封裝，杜絕商業機密推理與敏感反思過程在雲端被捕獲。'
                      : '针对 DeepSeek-R1、OpenAI o1 等推理模型的超长 <think> 中间推理 token 进行全密态封装，杜绝商业机密推理与敏感反思过程在云端被捕获。'}
                  </p>
                </div>

                {/* Pillar 2: Agent & MCP Protocol */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
                    <Workflow className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Agent & MCP Zero-Trust Anti-Poisoning' : lang === 'zh-TW' ? 'Agent & MCP 協議零信任防投毒' : 'Agent & MCP 协议零信任防投毒'}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'en'
                      ? 'Deep support for Anthropic MCP protocol traffic auditing, applying real-time indirect prompt injection interception and circuit breaker action locks during tool calling and DB queries.'
                      : lang === 'zh-TW'
                      ? '深度支援 Anthropic MCP 協議流量審計，在 Agent 進行 Tool Calling、網頁檢索及資料庫操作時實施上下文投毒（Indirect Injection）動態攔截與雙向熔斷動作鎖。'
                      : '深度支持 Anthropic MCP 协议流量审计，在 Agent 进行 Tool Calling、网页检索及数据库操作时实施上下文投毒（Indirect Injection）动态拦截与双向熔断动作锁。'}
                  </p>
                </div>

                {/* Pillar 3: MLA & MoE Optimization */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                    <Zap className="w-4 h-4" />
                    <span>{lang === 'en' ? 'MLA Latent KV & MoE Gating Synergy' : lang === 'zh-TW' ? 'MLA 潛變量與 MoE 動態門控協同' : 'MLA 潜变量与 MoE 动态门控协同'}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'en'
                      ? 'Proprietary adaptation for DeepSeek-V3/R1 671B compressed Multi-Head Latent Attention (MLA) and MoE sparse gating, delivering native CUDA confidential tensor acceleration and microsecond-level reconstruction.'
                      : lang === 'zh-TW'
                      ? '獨家適配 DeepSeek-V3/R1 671B 的 MLA 壓縮 KV Cache 與 MoE 稀疏專家激活門控，實現超大規模混合專家架構的原生 CUDA 密態張量加速與微秒級點積還原。'
                      : '独家适配 DeepSeek-V3/R1 671B 的 MLA 压缩 KV Cache 与 MoE 稀疏专家激活门控，实现超大规模混合专家架构的原生 CUDA 密态张量加速与微秒级点积还原。'}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
