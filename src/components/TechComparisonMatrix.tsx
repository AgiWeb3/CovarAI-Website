import React, { useState } from 'react';
import { Language } from '../types';
import {
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Server,
  Lock,
  Cpu,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';

interface TechComparisonMatrixProps {
  lang: Language;
  onRequestDemo?: () => void;
}

export const TechComparisonMatrix: React.FC<TechComparisonMatrixProps> = ({
  lang,
  onRequestDemo,
}) => {
  const [selectedTech, setSelectedTech] = useState<'covar' | 'fhe' | 'tee' | 'smpc'>('covar');
  const [activeHoverRow, setActiveHoverRow] = useState<number | null>(null);

  const t = {
    tag: lang === 'en' ? 'PRIVACY COMPUTING TECH COMPARISON' : lang === 'zh-TW' ? '主流隱私計算技術路線全維對比' : '主流隐私计算技术路线全维对比',
    title: lang === 'en' ? 'Why CovarAI vs. FHE, Pure TEE & SMPC' : lang === 'zh-TW' ? '全維度解析：為什麼千億大模型時代需要 CovarAI？' : '全维度解析：为什么千亿大模型时代需要 CovarAI？',
    subtitle: lang === 'en'
      ? 'A rigorous architectural comparison between Fully Homomorphic Encryption (FHE), Pure Hardware TEE, SMPC, and CovarAI Hybrid Covariance Architecture.'
      : lang === 'zh-TW'
      ? '深度剖析全同態加密 (FHE)、純硬件 TEE 飛地、安全多方計算 (SMPC) 與 CovarAI「代數協變混淆 + 混合飛地」在 671B+ 大模型時代的性能、安全性與工程落地差異。'
      : '深度剖析全同态加密 (FHE)、纯硬件 TEE 飞地、安全多方计算 (SMPC) 与 CovarAI「代数协变混淆 + 混合飞地」在 671B+ 大模型时代的性能、安全性与工程落地差异。',
    benchmarkBadge: lang === 'en' ? 'Enterprise Engineering Verdict' : lang === 'zh-TW' ? '企業架構選型結論' : '企业架构选型结论',
    techRoutes: {
      covar: {
        name: 'CovarAI (代数协变 + 混合飞地)',
        nameEn: 'CovarAI Hybrid Covariance',
        badge: lang === 'en' ? '★ Production-Grade SOTA' : lang === 'zh-TW' ? '★ 最佳生產級架構' : '★ 最佳生产级架构',
        verdict: lang === 'en'
          ? 'Near-zero latency (<3.5%), native support for 671B MoE & 2M context, dual mathematical + physical perimeter.'
          : lang === 'zh-TW'
          ? '微秒級延遲損耗 (<3.5%)，原生支持 DeepSeek 671B MoE 與 200K~2M 超長上下文，具備數學不可逆與物理飛地雙重防線。'
          : '微秒级延迟损耗 (<3.5%)，原生支持 DeepSeek 671B MoE 与 200K~2M 超长上下文，具备数学不可逆与物理飞地双重防线。',
      },
      fhe: {
        name: '全同态加密 (FHE)',
        nameEn: 'Fully Homomorphic Encryption',
        badge: lang === 'en' ? 'Theoretically Sound · Impractical' : lang === 'zh-TW' ? '理論完備 · 算力瓶頸無法落地' : '理论完备 · 算力瓶颈无法落地',
        verdict: lang === 'en'
          ? 'Ciphertext expansion of 100x~1000x and computation latency of 1,000x~10,000x make it impossible to run modern 671B MoE inference.'
          : lang === 'zh-TW'
          ? '密文膨脹百倍至千倍，計算延遲高達 1000x~10000x，算力開銷指數級爆炸，目前完全無法支撐千億級 MoE 推理。'
          : '密文膨胀百倍至千倍，计算延迟高达 1000x~10000x，算力开销指数级爆炸，目前完全无法支撑千亿级 MoE 推理。',
      },
      tee: {
        name: '纯硬件 TEE 飞地 (SGX/H100 TEE)',
        nameEn: 'Pure Hardware Enclaves (TEE)',
        badge: lang === 'en' ? 'Hardware Lock-in · Side-Channel Risks' : lang === 'zh-TW' ? '單一硬件綁定 · 存在側信道盲區' : '单一硬件绑定 · 存在侧信道盲区',
        verdict: lang === 'en'
          ? 'Constrained by enclave VRAM limits, vulnerable to Spectre/Cache side-channel attacks, and tightly bound to specific foreign GPU chip suppliers.'
          : lang === 'zh-TW'
          ? '受限於 TEE 顯存物理上限，面臨 Spectre/Meltdown 等微架構側信道嗅探威脅，且深度依賴特定海外芯片供應鏈，斷供風險高。'
          : '受限于 TEE 显存物理上限，面临 Spectre/Meltdown 等微架构侧信道嗅探威胁，且深度依赖特定海外芯片供应链，断供风险高。',
      },
      smpc: {
        name: '安全多方计算 (SMPC)',
        nameEn: 'Secure Multi-Party Computation',
        badge: lang === 'en' ? 'High Network Comms Barrier' : lang === 'zh-TW' ? '通信風暴 · 吞吐極度受限' : '通信风暴 · 吞吐极度受限',
        verdict: lang === 'en'
          ? 'Secret-sharing rounds generate massive inter-node network traffic, failing under modern sub-100ms real-time conversational SLAs.'
          : lang === 'zh-TW'
          ? '多方密鑰分片在矩陣乘法時產生海量網絡通信輪次（Communication Storm），無法滿足大模型實時對話的毫秒級響應要求。'
          : '多方密钥分片在矩阵乘法时产生海量网络通信轮次（Communication Storm），无法满足大模型实时对话的毫秒级响应要求。',
      },
    },
    dimensions: [
      {
        id: 'moe_scale',
        title: lang === 'en' ? '671B+ MoE Model Scale Support' : lang === 'zh-TW' ? '萬億/千億 MoE 大模型支持度' : '万亿/千亿 MoE 大模型支持度',
        desc: lang === 'en' ? 'Ability to run DeepSeek-V3/R1 671B, Kimi 480B, Qwen 72B' : lang === 'zh-TW' ? '原生流暢運行 DeepSeek-671B、Kimi-480B 等前沿 MoE 模型' : '原生流畅运行 DeepSeek-671B、Kimi-480B 等前沿 MoE 模型',
        covar: { status: 'pass', text: lang === 'en' ? 'Native Full Support (671B+)' : lang === 'zh-TW' ? '原生全量支持 (671B+)' : '原生全量支持 (671B+)', highlight: true },
        fhe: { status: 'fail', text: lang === 'en' ? 'Impossible (<1B toy models only)' : lang === 'zh-TW' ? '完全不支持 (僅限 <1B 玩具模型)' : '完全不支持 (仅限 <1B 玩具模型)' },
        tee: { status: 'warn', text: lang === 'en' ? 'Partial (VRAM Bound & Slow)' : lang === 'zh-TW' ? '部分支持 (顯存受限/需昂貴卡群)' : '部分支持 (显存受限/需昂贵卡群)' },
        smpc: { status: 'fail', text: lang === 'en' ? 'Impossible (Network explosion)' : lang === 'zh-TW' ? '極難支持 (通信複雜度隨參數量爆炸)' : '极难支持 (通信复杂度随参数量爆炸)' },
      },
      {
        id: 'latency',
        title: lang === 'en' ? 'Inference Latency Overhead' : lang === 'zh-TW' ? '端到端推理延遲損耗' : '端到端推理延迟损耗',
        desc: lang === 'en' ? 'Time delay compared to plaintext inference' : lang === 'zh-TW' ? '相較於公網明文推理的額外延遲開銷' : '相较于公网明文推理的额外延迟开销',
        covar: { status: 'pass', text: lang === 'en' ? '< 3.5% (Near-zero overhead)' : lang === 'zh-TW' ? '< 3.5% (微秒級近零損耗)' : '< 3.5% (微秒级近零损耗)', highlight: true },
        fhe: { status: 'fail', text: lang === 'en' ? '1,000x ~ 10,000x (Minute-level per token)' : lang === 'zh-TW' ? '1,000x ~ 10,000x (單 Token 需數分鐘)' : '1,000x ~ 10,000x (单 Token 需数分钟)' },
        tee: { status: 'warn', text: lang === 'en' ? '15% ~ 35% (Page Faults & Memory Isolation)' : lang === 'zh-TW' ? '15% ~ 35% (顯存換頁與飛地拷貝損耗)' : '15% ~ 35% (显存换页与飞地拷贝损耗)' },
        smpc: { status: 'fail', text: lang === 'en' ? '20x ~ 100x (RTT Network Bound)' : lang === 'zh-TW' ? '20x ~ 100x (受制於跨節點網絡 RTT)' : '20x ~ 100x (受制于跨节点网络 RTT)' },
      },
      {
        id: 'context_window',
        title: lang === 'en' ? 'Ultra-Long Context Window (200K~2M)' : lang === 'zh-TW' ? '超長上下文支持 (200K~2M Tokens)' : '超长上下文支持 (200K~2M Tokens)',
        desc: lang === 'en' ? 'Processing full legal contracts, books, EHR history' : lang === 'zh-TW' ? '處理萬頁合同底稿、完整病歷歷史與海量源代碼' : '处理万页合同底稿、完整病历历史与海量源代码',
        covar: { status: 'pass', text: lang === 'en' ? 'Full 2M Token Support (MLA Preserved)' : lang === 'zh-TW' ? '支持 200K~2M (MLA 注意力無損)' : '支持 200K~2M (MLA 注意力无损)', highlight: true },
        fhe: { status: 'fail', text: lang === 'en' ? '< 512 Tokens (Ciphertext blowup)' : lang === 'zh-TW' ? '< 512 Tokens (內存爆炸崩潰)' : '< 512 Tokens (内存爆炸崩溃)' },
        tee: { status: 'warn', text: lang === 'en' ? '32K ~ 64K Max (Enclave VRAM Capped)' : lang === 'zh-TW' ? '最大 32K~64K (受限於飛地顯存容量)' : '最大 32K~64K (受限于飞地显存容量)' },
        smpc: { status: 'fail', text: lang === 'en' ? '< 4K Tokens' : lang === 'zh-TW' ? '< 4K Tokens (通信包體過大)' : '< 4K Tokens (通信包体过大)' },
      },
      {
        id: 'hardware_agnostic',
        title: lang === 'en' ? 'Hardware & GPU Agnosticism' : lang === 'zh-TW' ? '異構算力與國產芯片適配' : '异构算力与国产芯片适配',
        desc: lang === 'en' ? 'Runs on NVIDIA, Huawei Ascend, AMD, Hygon' : lang === 'zh-TW' ? '兼容 NVIDIA、華為昇騰、寒武紀、海光等異構算力' : '兼容 NVIDIA、华为昇腾、寒武纪、海光等异构算力',
        covar: { status: 'pass', text: lang === 'en' ? '100% Agnostic (Runs on Any GPU/NPU)' : lang === 'zh-TW' ? '100% 跨架構適配 (GPU/NPU/CPU 通用)' : '100% 跨架构适配 (GPU/NPU/CPU 通用)', highlight: true },
        fhe: { status: 'warn', text: lang === 'en' ? 'Requires Custom ASIC Accelerators' : lang === 'zh-TW' ? '需專用 ASIC 密碼學加速芯片' : '需专用 ASIC 密码学加速芯片' },
        tee: { status: 'fail', text: lang === 'en' ? 'Locked to Specific TEE SKUs (H100/SGX)' : lang === 'zh-TW' ? '高度綁定特定海外芯片 (H100 TEE)' : '高度绑定特定海外芯片 (H100 TEE)' },
        smpc: { status: 'warn', text: lang === 'en' ? 'High Network Bandwidth Bound' : lang === 'zh-TW' ? '受制於高帶寬專線網絡' : '受制于高带宽专线网络' },
      },
      {
        id: 'security_model',
        title: lang === 'en' ? 'Security & Defense Strength' : lang === 'zh-TW' ? '密碼學與物理雙重防線' : '密码学与物理双重防线',
        desc: lang === 'en' ? 'Resistance against state inversion (VMA/IA) and side-channels' : lang === 'zh-TW' ? '防禦內部狀態逆向提取 (VMA/IA) 與微架構側信道嗅探' : '防御内部状态逆向提取 (VMA/IA) 与微架构侧信道嗅探',
        covar: { status: 'pass', text: lang === 'en' ? 'Algebraic Irreversible + Enclave Dual Defense' : lang === 'zh-TW' ? '代數不可逆擾動 + 物理飛地雙重保障' : '代数不可逆扰动 + 物理飞地双重保障', highlight: true },
        fhe: { status: 'pass', text: lang === 'en' ? 'Lattice-based Theoretical Hardness' : lang === 'zh-TW' ? '格密碼學數學困難問題 (理論高)' : '格密码学数学困难问题 (理论高)' },
        tee: { status: 'warn', text: lang === 'en' ? 'Vulnerable to Cache/Side-Channel Attacks' : lang === 'zh-TW' ? '存在側信道攻擊/物理探針逆向隱患' : '存在侧信道攻击/物理探针逆向隐患' },
        smpc: { status: 'pass', text: lang === 'en' ? 'Threshold Cryptography Guarantees' : lang === 'zh-TW' ? '門限密碼學保證 (需假設誠實節點數)' : '门限密码学保证 (需假设诚实节点数)' },
      },
      {
        id: 'migration_cost',
        title: lang === 'en' ? 'Non-Invasive Migration Cost' : lang === 'zh-TW' ? '業務改造與工程侵入成本' : '业务改造与工程侵入成本',
        desc: lang === 'en' ? 'Ease of integrating existing apps and Agent workflows' : lang === 'zh-TW' ? '現有業務代碼、Prompt 與 Agent 工具鏈集成難度' : '现有业务代码、Prompt 与 Agent 工具链集成难度',
        covar: { status: 'pass', text: lang === 'en' ? '3 Lines of Code (0 Refactoring)' : lang === 'zh-TW' ? '3 行代碼透明代理 (0 業務侵入)' : '3 行代码透明代理 (0 业务侵入)', highlight: true },
        fhe: { status: 'fail', text: lang === 'en' ? 'Requires Rewriting Model into Boolean Circuits' : lang === 'zh-TW' ? '需全量重構算子為同態電路 (極端複雜)' : '需全量重构算子为同态电路 (极端复杂)' },
        tee: { status: 'warn', text: lang === 'en' ? 'Requires Enclave Driver & SDK Rebuild' : lang === 'zh-TW' ? '需重編譯驅動並適配特定飛地運行庫' : '需重编译驱动并适配特定飞地运行库' },
        smpc: { status: 'fail', text: lang === 'en' ? 'Requires Complex Multi-Party Protocol Redesign' : lang === 'zh-TW' ? '需重新設計多方交互協議與通信流' : '需重新设计多方交互协议与通信流' },
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    if (status === 'pass') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
    }
    if (status === 'warn') {
      return <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />;
    }
    return <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />;
  };

  return (
    <section id="comparison" className="py-24 bg-zinc-950/90 border-t border-slate-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="text-gradient-cyan">{t.title}</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Tech Route Selector Cards (Mobile & Interactive Focus) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" data-aos="fade-up">
          {(['covar', 'fhe', 'tee', 'smpc'] as const).map((key) => {
            const tech = t.techRoutes[key];
            const isSelected = selectedTech === key;
            const isCovar = key === 'covar';

            return (
              <div
                key={key}
                onClick={() => setSelectedTech(key)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? isCovar
                      ? 'bg-zinc-900/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                      : 'bg-zinc-900/80 border-slate-600 shadow-md ring-1 ring-slate-600'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isCovar
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/60'
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}
                    >
                      {tech.badge}
                    </span>
                    {isCovar && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <h3 className={`text-sm font-bold mb-1 ${isCovar ? 'text-cyan-200' : 'text-white'}`}>
                    {lang === 'en' ? tech.nameEn : tech.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                    {tech.verdict}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-gray-500'}>
                    {isSelected ? (lang === 'en' ? '● Currently Active' : '● 当前选定') : (lang === 'en' ? 'Click to inspect' : '点击查看详情')}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Comprehensive Comparison Table */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="rounded-2xl border border-slate-800 bg-zinc-950/80 overflow-hidden shadow-2xl backdrop-blur-xl mb-12"
        >
          {/* Table Header Bar */}
          <div className="p-4 sm:p-5 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                {lang === 'en' ? 'Comprehensive Matrix: Architectural & Performance Metrics' : '全维度技术参数与架构能力对照矩阵'}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {lang === 'en' ? 'SOTA Supported' : '生产可用'}
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Severe Trade-off' : '存在瓶颈'}
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <XCircle className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Incompatible' : '完全不可行'}
              </span>
            </div>
          </div>

          {/* Responsive Table Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-gray-400 bg-black/40">
                  <th className="py-3.5 px-4 sm:px-6 w-[28%] font-semibold">
                    {lang === 'en' ? 'Evaluation Dimension' : '核心评估维度'}
                  </th>
                  <th className="py-3.5 px-4 w-[24%] text-cyan-300 font-bold bg-cyan-950/20 border-x border-cyan-500/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CovarAI (混合架构)</span>
                    </div>
                  </th>
                  <th className="py-3.5 px-4 w-[16%]">全同态加密 (FHE)</th>
                  <th className="py-3.5 px-4 w-[16%]">纯硬件 TEE (SGX/H100)</th>
                  <th className="py-3.5 px-4 w-[16%]">安全多方计算 (SMPC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs">
                {t.dimensions.map((dim, dIdx) => (
                  <tr
                    key={dim.id}
                    onMouseEnter={() => setActiveHoverRow(dIdx)}
                    onMouseLeave={() => setActiveHoverRow(null)}
                    className={`transition-colors ${
                      activeHoverRow === dIdx ? 'bg-white/[0.04]' : 'bg-transparent'
                    }`}
                  >
                    {/* Dimension Description */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-gray-200 text-xs sm:text-sm mb-0.5">
                        {dim.title}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono leading-tight">
                        {dim.desc}
                      </div>
                    </td>

                    {/* CovarAI Column */}
                    <td className="py-4 px-4 bg-cyan-950/20 border-x border-cyan-500/20">
                      <div className="flex items-center gap-2 font-bold text-cyan-200">
                        {getStatusIcon(dim.covar.status)}
                        <span className="leading-snug">{dim.covar.text}</span>
                      </div>
                    </td>

                    {/* FHE Column */}
                    <td className="py-4 px-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(dim.fhe.status)}
                        <span className="leading-snug text-gray-400">{dim.fhe.text}</span>
                      </div>
                    </td>

                    {/* TEE Column */}
                    <td className="py-4 px-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(dim.tee.status)}
                        <span className="leading-snug text-gray-400">{dim.tee.text}</span>
                      </div>
                    </td>

                    {/* SMPC Column */}
                    <td className="py-4 px-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(dim.smpc.status)}
                        <span className="leading-snug text-gray-400">{dim.smpc.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Architectural Summary Note */}
          <div className="p-4 sm:p-5 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Summary: CovarAI combines dynamic algebraic covariance on the client with lightweight hardware enclaves in the cloud, achieving the industry-first <3.5% latency overhead on 671B MoE.'
                  : lang === 'zh-TW'
                  ? '架構選型小結：CovarAI 在客戶端採用代數協變混淆，雲端結合輕量機密飛地，業界首創在 671B MoE 大模型上達成 <3.5% 延遲損耗與 100% 零明文暴露。'
                  : '架构选型小结：CovarAI 在客户端采用代数协变混淆，云端结合轻量机密飞地，业界首创在 671B MoE 大模型上达成 <3.5% 延迟损耗与 100% 零明文暴露。'}
              </span>
            </div>
            {onRequestDemo && (
              <button
                onClick={onRequestDemo}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition-all shadow-md cursor-pointer"
              >
                <span>{lang === 'en' ? 'Get Technical Dossier' : '获取技术白皮书'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
