import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingDown,
  DollarSign,
  Zap,
  Server,
  Cloud,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';
import { Language } from '../types';

interface TcoRoiCalculatorProps {
  lang: Language;
  onRequestDemo?: (details?: string) => void;
}

type ModelType = 'deepseek671b' | 'kimi_moe' | 'glm4_moe';
type TimeHorizon = '1' | '3' | '5';

export const TcoRoiCalculator: React.FC<TcoRoiCalculatorProps> = ({
  lang,
  onRequestDemo,
}) => {
  // Input States
  const [modelType, setModelType] = useState<ModelType>('deepseek671b');
  const [dailyTokensM, setDailyTokensM] = useState<number>(100); // 10M to 500M tokens/day
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('3');
  const [isCopied, setIsCopied] = useState(false);

  // Model Specs & Baseline Costs (Top Frontier Open-Source MoE Models: DeepSeek, Kimi, GLM)
  const modelData: Record<
    ModelType,
    {
      name: string;
      archBadge: string;
      gpuNeeded: string;
      serverHardwareCapex: number;
      annualSysadminOpex: number;
      annualPowerPueOpex: number;
      publicCloudTokenCostPerM: number;
      covarPriLicensePerM: number;
      tag: string;
      isMoE: boolean;
    }
  > = {
    deepseek671b: {
      name: 'DeepSeek-R1 / V3 (671B MoE · 37B Active)',
      archBadge:
        lang === 'en'
          ? '671B MoE · 128 Experts · MLA Latent Attention'
          : lang === 'zh-TW'
          ? '671B MoE · 128 路由專家 · MLA 潛在注意力'
          : '671B MoE · 128 路由专家 · MLA 潜在注意力',
      gpuNeeded:
        lang === 'en'
          ? '8x 8-GPU Pods (64x NVIDIA H800/H20 80GB + NVLink)'
          : lang === 'zh-TW'
          ? '8組 8卡機櫃 (64x NVIDIA H800/H20 80GB + NVLink)'
          : '8组 8卡机柜 (64x NVIDIA H800/H20 80GB + NVLink)',
      serverHardwareCapex: 1850000, // $1.85M CapEx: 8 high-density servers + 400G InfiniBand
      annualSysadminOpex: 360000, // $360k/yr: 2 Senior MLOps + 1 Infosec specialist
      annualPowerPueOpex: 165000, // Power & Datacenter cooling PUE 1.35
      publicCloudTokenCostPerM: 0.14, // $0.14 per 1M tokens on cloud confidential pool
      covarPriLicensePerM: 0.04, // $0.04 per 1M tokens
      tag: lang === 'en' ? 'DeepSeek 671B MoE' : lang === 'zh-TW' ? 'DeepSeek 671B MoE' : 'DeepSeek 671B MoE',
      isMoE: true,
    },
    kimi_moe: {
      name: 'Kimi k1.5 / Moonshot (480B MoE · 2M Context)',
      archBadge:
        lang === 'en'
          ? '480B MoE · 2M Ultra-Long Context · Agentic SOTA'
          : lang === 'zh-TW'
          ? '480B MoE · 200萬超長上下文 · Agentic SOTA'
          : '480B MoE · 200万超长上下文 · Agentic SOTA',
      gpuNeeded:
        lang === 'en'
          ? '6x 8-GPU Pods (48x NVIDIA H800/H100 80GB SXM5)'
          : lang === 'zh-TW'
          ? '6組 8卡機櫃 (48x NVIDIA H800/H100 80GB SXM5)'
          : '6组 8卡机柜 (48x NVIDIA H800/H100 80GB SXM5)',
      serverHardwareCapex: 1420000, // $1.42M CapEx: 6 SXM5 nodes + RoCE/IB network
      annualSysadminOpex: 310000, // $310k/yr: Long-context KV Cache & distributed reasoning MLOps
      annualPowerPueOpex: 135000, // Long-context high-memory power & datacenter cooling
      publicCloudTokenCostPerM: 0.12, // $0.12 per 1M tokens
      covarPriLicensePerM: 0.035, // $0.035 per 1M tokens
      tag: lang === 'en' ? 'Kimi k1.5 · 2M Context' : lang === 'zh-TW' ? 'Kimi k1.5 · 2M 上下文' : 'Kimi k1.5 · 2M 上下文',
      isMoE: true,
    },
    glm4_moe: {
      name: 'GLM-4.6 / GLM-4-MoE (355B MoE · Zhipu AI)',
      archBadge:
        lang === 'en'
          ? '355B MoE · MIT Open Weights · 200K Context'
          : lang === 'zh-TW'
          ? '355B MoE · MIT 開源權重 · 200K Context'
          : '355B MoE · MIT 开源权重 · 200K Context',
      gpuNeeded:
        lang === 'en'
          ? '4x 8-GPU Pods (32x NVIDIA H800/H100 80GB)'
          : lang === 'zh-TW'
          ? '4組 8卡機櫃 (32x NVIDIA H800/H100 80GB)'
          : '4组 8卡机柜 (32x NVIDIA H800/H100 80GB)',
      serverHardwareCapex: 960000, // $960k CapEx: 4 GPU servers + TOR switches
      annualSysadminOpex: 250000, // $250k/yr: Zhipu AI stack tuning & private inference ops
      annualPowerPueOpex: 92000, // Datacenter rack space & power
      publicCloudTokenCostPerM: 0.09, // $0.09 per 1M tokens
      covarPriLicensePerM: 0.026, // $0.026 per 1M tokens
      tag: lang === 'en' ? 'GLM-4.6 · 355B MoE' : lang === 'zh-TW' ? 'GLM-4.6 · 355B MoE' : 'GLM-4.6 · 355B MoE',
      isMoE: true,
    },
  };

  const years = parseInt(timeHorizon, 10);
  const currentModel = modelData[modelType];

  // Calculations
  const calculations = useMemo(() => {
    const annualTokensM = dailyTokensM * 365;
    const totalTokensM = annualTokensM * years;

    // 1. Private On-Premise Cluster Total Cost
    const privateHardware = currentModel.serverHardwareCapex;
    const privateSysadminTotal = currentModel.annualSysadminOpex * years;
    const privatePowerTotal = currentModel.annualPowerPueOpex * years;
    const privateHardwareDepreciationAndMaintenance = (privateHardware * 0.15) * years;
    const privateTotalCost =
      privateHardware +
      privateSysadminTotal +
      privatePowerTotal +
      privateHardwareDepreciationAndMaintenance;

    // 2. CovarAI Sovereign Confidential Cloud Total Cost
    const cloudComputeCost = totalTokensM * currentModel.publicCloudTokenCostPerM;
    const covarPriSoftwareLicense = totalTokensM * currentModel.covarPriLicensePerM;
    const sovereignEdgeGatewayCost = 25000 * years; // lightweight edge docker proxy server
    const covarTotalCost =
      cloudComputeCost +
      covarPriSoftwareLicense +
      sovereignEdgeGatewayCost;

    // 3. Delta & ROI metrics
    const totalSavings = Math.max(0, privateTotalCost - covarTotalCost);
    const savingsPercent = Math.round((totalSavings / privateTotalCost) * 100);
    const carbonFactor =
      modelType === 'deepseek671b'
        ? 2.0
        : modelType === 'kimi_moe'
        ? 1.6
        : 1.2;
    const carbonSavedTons = Math.round(dailyTokensM * 365 * years * 0.00042 * carbonFactor);
    const daysToDeployPrivate =
      modelType === 'deepseek671b'
        ? 180
        : modelType === 'kimi_moe'
        ? 150
        : 120;
    const daysToDeployCovar = 1;

    return {
      totalTokensM,
      privateTotalCost,
      privateHardware,
      privateOpexTotal: privateSysadminTotal + privatePowerTotal + privateHardwareDepreciationAndMaintenance,
      covarTotalCost,
      cloudComputeCost,
      covarPriSoftwareLicense,
      totalSavings,
      savingsPercent,
      carbonSavedTons,
      daysToDeployPrivate,
      daysToDeployCovar,
    };
  }, [dailyTokensM, modelType, years, currentModel]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopySummary = () => {
    const summaryText = `[CovarAI TCO Assessment Report]
Model Target: ${currentModel.name}
Daily Throughput: ${dailyTokensM} Million tokens/day
Time Horizon: ${years} Years
- Private On-Premise Cluster TCO: ${formatCurrency(calculations.privateTotalCost)} (Capex: ${formatCurrency(calculations.privateHardware)}, Opex: ${formatCurrency(calculations.privateOpexTotal)})
- CovarAI Sovereign Confidential Cloud TCO: ${formatCurrency(calculations.covarTotalCost)}
>>> Net Total Savings: ${formatCurrency(calculations.totalSavings)} (${calculations.savingsPercent}% Cost Reduction)
>>> Time-to-Market: 1 Day vs ${calculations.daysToDeployPrivate} Days
>>> Compliance Legal Penalty Risk: 0.00 (Zero-Plaintext Exemption)`;

    navigator.clipboard?.writeText(summaryText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div id="tco-calculator" className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-black border border-white/10 glow-cyan">
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'ENTERPRISE TCO & ROI SIMULATOR' : '企业 TCO 成本与算力收益对比计算器'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {lang === 'en'
              ? 'Private On-Premise Cluster vs. CovarAI Sovereign Cloud'
              : '传统本地私有化集群 vs CovarAI 零明文主权云'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'en'
              ? 'Calculate 3-year hardware CapEx, MLOps OpEx, cooling, and compute cost differentials in real-time.'
              : '实时测算数亿级 Token 吞吐下，重资产硬件采购、专业运维团队与零信任弹性算力的总拥有成本差距。'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy TCO Summary"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isCopied ? (lang === 'en' ? 'COPIED!' : '已复制测算表') : (lang === 'en' ? 'Export Summary' : '导出测算数据')}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Parameter 1: Model Architecture */}
          <div>
            <label className="text-xs font-mono text-cyan-400 block mb-2.5 font-bold uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>1. {lang === 'en' ? 'Model Scale & Architecture' : '目标大模型基座架构'}</span>
            </label>
            <div className="space-y-2.5">
              {(Object.keys(modelData) as ModelType[]).map((key) => {
                const item = modelData[key];
                const isSelected = modelType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setModelType(key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md glow-cyan'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2 flex-wrap">
                        <span>{item.name}</span>
                        {item.isMoE && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800/80">
                            MoE
                          </span>
                        )}
                        {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-cyan-300/80">
                          {item.archBadge}
                        </span>
                        <span className="text-[10px] text-slate-500 hidden sm:inline">•</span>
                        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                          {item.gpuNeeded}
                        </span>
                      </div>
                    </div>
                    <span className="self-start sm:self-center text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-cyan-300 border border-slate-700/80 whitespace-nowrap">
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parameter 2: Daily Token Throughput Slider */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>2. {lang === 'en' ? 'Daily Token Throughput' : '企业日均 Token 吞吐量'}</span>
              </label>
              <span className="text-base font-mono font-black text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                {dailyTokensM}M <span className="text-[10px] text-slate-400 font-normal">Tokens/Day</span>
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={dailyTokensM}
              onChange={(e) => setDailyTokensM(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>10M ({lang === 'en' ? 'Department Trial' : lang === 'zh-TW' ? '部門級試用' : '部门级试用'})</span>
              <span>100M ({lang === 'en' ? 'Production Line' : lang === 'zh-TW' ? '核心生產線' : '核心生产线'})</span>
              <span>500M+ ({lang === 'en' ? 'Enterprise-Wide' : lang === 'zh-TW' ? '全行/全院級' : '全行/全院级'})</span>
            </div>
          </div>

          {/* Parameter 3: Time Horizon */}
          <div>
            <label className="text-xs font-mono text-emerald-400 block mb-2 font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>3. {lang === 'en' ? 'Evaluation Horizon' : lang === 'zh-TW' ? '測算週期與攤銷年限' : '测算周期与摊销年限'}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['1', '3', '5'] as TimeHorizon[]).map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTimeHorizon(yr)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    timeHorizon === yr
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {yr} {lang === 'en' ? 'Year(s)' : lang === 'zh-TW' ? '年期' : '年期'}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Comparative Results & Real-time Visuals (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Comparison Cards: Private vs CovarAI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Option A: Private On-Premise */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-red-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-red-950/80 border-b border-l border-red-500/30 text-red-400 text-[10px] font-mono">
                {lang === 'en' ? 'Traditional On-Premise' : lang === 'zh-TW' ? '傳統本地重資產私有化' : '传统本地重资产私有化'}
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2">
                  <Server className="w-4 h-4 text-red-400" />
                  <span>{years} {lang === 'en' ? 'Yr Total Cost of Ownership (TCO)' : lang === 'zh-TW' ? '年總擁有成本 (TCO)' : '年总拥有成本 (TCO)'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-red-400">
                  {formatCurrency(calculations.privateTotalCost)}
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Hardware CapEx:' : lang === 'zh-TW' ? '硬體採購 (CapEx):' : '硬件采购 (CapEx):'}</span>
                  <span className="text-slate-300">{formatCurrency(calculations.privateHardware)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'MLOps & Cooling OpEx:' : lang === 'zh-TW' ? '維運與機房 (OpEx):' : '运维与机房 (OpEx):'}</span>
                  <span className="text-slate-300">{formatCurrency(calculations.privateOpexTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Deployment Lead Time:' : lang === 'zh-TW' ? '交付週期:' : '交付周期:'}</span>
                  <span className="text-red-400">
                    {calculations.daysToDeployPrivate} {lang === 'en' ? 'Days (Procurement Lead Time)' : lang === 'zh-TW' ? '天 (漫長採購配置)' : '天 (漫长采购配置)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Option B: CovarAI Sovereign Cloud */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/50 flex flex-col justify-between relative overflow-hidden glow-cyan">
              <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500 text-black text-[10px] font-mono font-bold">
                {lang === 'en' ? 'CovarAI Sovereign Cloud' : lang === 'zh-TW' ? 'CovarAI 零明文主權雲' : 'CovarAI 零明文主权云'}
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                  <Cloud className="w-4 h-4" />
                  <span>{years} {lang === 'en' ? 'Yr Total Cost of Ownership (TCO)' : lang === 'zh-TW' ? '年總擁有成本 (TCO)' : '年总拥有成本 (TCO)'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
                  {formatCurrency(calculations.covarTotalCost)}
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-cyan-900/50 pt-3">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Hardware CapEx:' : lang === 'zh-TW' ? '硬體固定資產 (CapEx):' : '硬件固定资产 (CapEx):'}</span>
                  <span className="text-emerald-400 font-bold">$0 ({lang === 'en' ? 'Zero Hardware Upfront' : lang === 'zh-TW' ? '零重資產墊資' : '零重资产垫资'})</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Compute + Obfuscation License:' : lang === 'zh-TW' ? '公有算力 + 密態許可:' : '公有算力 + 密态许可:'}</span>
                  <span className="text-cyan-300">{formatCurrency(calculations.cloudComputeCost + calculations.covarPriSoftwareLicense)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Deployment Lead Time:' : lang === 'zh-TW' ? '交付週期:' : '交付周期:'}</span>
                  <span className="text-cyan-400 font-bold">
                    {lang === 'en' ? '1 Day (Instant Docker Appliance)' : lang === 'zh-TW' ? '1 天即刻上線 (Docker 鏡像)' : '1 天即刻上线 (Docker 镜像)'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* High-Impact Savings Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-1">
                <TrendingDown className="w-4 h-4" />
                <span>
                  {years} {lang === 'en' ? 'Yr Net Total Savings' : lang === 'zh-TW' ? '年綜合淨節省開銷 (Net Savings)' : '年综合净节省开销 (Net Savings)'}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300">
                {formatCurrency(calculations.totalSavings)}
                <span className="text-lg font-normal text-emerald-400 ml-2">
                  (-{calculations.savingsPercent}%)
                </span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-emerald-500/30 sm:pl-6">
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5 justify-end">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {lang === 'en'
                    ? `Carbon Abatement: ~${calculations.carbonSavedTons} Tons CO₂`
                    : lang === 'zh-TW'
                    ? `碳減排優化：~${calculations.carbonSavedTons} 噸 CO₂`
                    : `碳减排优化：~${calculations.carbonSavedTons} 吨 CO₂`}
                </span>
              </div>
              <div className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 justify-end mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {lang === 'en'
                    ? 'Privilege Penalty Risk: $0.00'
                    : lang === 'zh-TW'
                    ? '特權失效賠償風險：$0.00'
                    : '特权失效赔偿风险：$0.00'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400 font-mono">
              {lang === 'en'
                ? '* Based on frontier MoE cluster specs (64x/48x/32x GPU Pods), InfiniBand network, PUE 1.35 power cooling, and MLOps staff overhead'
                : lang === 'zh-TW'
                ? '* 基於前沿開源 MoE（DeepSeek/Kimi/GLM）真實集群規格（64卡/48卡/32卡 Pods）、InfiniBand 組網、PUE 1.35 能耗與 MLOps 維運測算'
                : '* 基于前沿开源 MoE（DeepSeek/Kimi/GLM）真实集群规格（64卡/48卡/32卡 Pods）、InfiniBand 组网、PUE 1.35 能耗与 MLOps 运维测算'}
            </span>
            <button
              onClick={() => onRequestDemo?.(`TCO Simulation: ${currentModel.name}, ${dailyTokensM}M tokens/day, ${years}yr horizon`)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-lg glow-cyan transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Request Full TCO Audit Report' : lang === 'zh-TW' ? '獲取企業專屬算力評估報告' : '获取企业专属算力评估报告'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
