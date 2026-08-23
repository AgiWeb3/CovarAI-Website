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

type ModelType = 'deepseek671b' | 'qwen236b' | 'llama70b';
type TimeHorizon = '1' | '3' | '5';

export const TcoRoiCalculator: React.FC<TcoRoiCalculatorProps> = ({
  lang,
  onRequestDemo,
}) => {
  // Input States
  const [modelType, setModelType] = useState<ModelType>('deepseek671b');
  const [dailyTokensM, setDailyTokensM] = useState<number>(100); // 10M to 1000M tokens/day
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('3');
  const [isCopied, setIsCopied] = useState(false);

  // Model Specs & Baseline Costs
  const modelData = {
    deepseek671b: {
      name: 'DeepSeek-V3 / R1 (671B MoE)',
      gpuNeeded: '8x 8-GPU Racks (64x H800/H20 80GB)',
      serverHardwareCapex: 1800000, // $1.8M CapEx for on-premise cluster
      annualSysadminOpex: 350000, // $350k/yr MLOps + Infosec team
      annualPowerPueOpex: 160000, // Power & Datacenter cooling
      publicCloudTokenCostPerM: 0.14, // $0.14 per 1M tokens on cloud spot/confidential pool
      covarPriLicensePerM: 0.04, // $0.04 per 1M tokens
      tag: 'Frontier 671B MoE',
    },
    qwen236b: {
      name: 'Qwen-2.5-236B MoE / 72B Dense',
      gpuNeeded: '4x 8-GPU Racks (32x H800/A100 80GB)',
      serverHardwareCapex: 950000,
      annualSysadminOpex: 250000,
      annualPowerPueOpex: 90000,
      publicCloudTokenCostPerM: 0.09,
      covarPriLicensePerM: 0.025,
      tag: 'Enterprise High-Throughput',
    },
    llama70b: {
      name: 'Llama-3.3-70B / Mistral-Large',
      gpuNeeded: '2x 8-GPU Racks (16x H100/A100 80GB)',
      serverHardwareCapex: 520000,
      annualSysadminOpex: 180000,
      annualPowerPueOpex: 50000,
      publicCloudTokenCostPerM: 0.06,
      covarPriLicensePerM: 0.018,
      tag: 'Standard Dense LLM',
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
    const carbonSavedTons = Math.round((dailyTokensM * 365 * years * 0.00042) * (modelType === 'deepseek671b' ? 1.8 : 1.0));
    const daysToDeployPrivate = 120 + (modelType === 'deepseek671b' ? 60 : 0);
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
            <div className="space-y-2">
              {(Object.keys(modelData) as ModelType[]).map((key) => {
                const item = modelData[key];
                const isSelected = modelType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setModelType(key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md glow-cyan'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                        {item.gpuNeeded}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
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
              <span>10M (部门级试用)</span>
              <span>100M (核心生产线)</span>
              <span>500M+ (全行/全院级)</span>
            </div>
          </div>

          {/* Parameter 3: Time Horizon */}
          <div>
            <label className="text-xs font-mono text-emerald-400 block mb-2 font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>3. {lang === 'en' ? 'Evaluation Horizon' : '测算周期与摊销年限'}</span>
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
                  {yr} {lang === 'en' ? 'Year(s)' : '年期'}
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
                {lang === 'en' ? 'Traditional On-Premise' : '传统本地重资产私有化'}
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2">
                  <Server className="w-4 h-4 text-red-400" />
                  <span>{years} 年总拥有成本 (TCO)</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-red-400">
                  {formatCurrency(calculations.privateTotalCost)}
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span>硬件采购 (CapEx):</span>
                  <span className="text-slate-300">{formatCurrency(calculations.privateHardware)}</span>
                </div>
                <div className="flex justify-between">
                  <span>运维与机房 (OpEx):</span>
                  <span className="text-slate-300">{formatCurrency(calculations.privateOpexTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>交付周期:</span>
                  <span className="text-red-400">{calculations.daysToDeployPrivate} 天 (漫长采购配置)</span>
                </div>
              </div>
            </div>

            {/* Option B: CovarAI Sovereign Cloud */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/50 flex flex-col justify-between relative overflow-hidden glow-cyan">
              <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500 text-black text-[10px] font-mono font-bold">
                {lang === 'en' ? 'CovarAI Sovereign Cloud' : 'CovarAI 零明文主权云'}
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                  <Cloud className="w-4 h-4" />
                  <span>{years} 年总拥有成本 (TCO)</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
                  {formatCurrency(calculations.covarTotalCost)}
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-cyan-900/50 pt-3">
                <div className="flex justify-between">
                  <span>硬件固定资产 (CapEx):</span>
                  <span className="text-emerald-400 font-bold">$0 (零重资产垫资)</span>
                </div>
                <div className="flex justify-between">
                  <span>公有算力 + 密态许可:</span>
                  <span className="text-cyan-300">{formatCurrency(calculations.cloudComputeCost + calculations.covarPriSoftwareLicense)}</span>
                </div>
                <div className="flex justify-between">
                  <span>交付周期:</span>
                  <span className="text-cyan-400 font-bold">1 天即刻上线 (Docker 镜像)</span>
                </div>
              </div>
            </div>

          </div>

          {/* High-Impact Savings Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-1">
                <TrendingDown className="w-4 h-4" />
                <span>{years} 年综合净节省开销 (Net Savings)</span>
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
                <span>碳减排优化：~{calculations.carbonSavedTons} 吨 CO₂</span>
              </div>
              <div className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 justify-end mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>特权失效赔偿风险：$0.00</span>
              </div>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400 font-mono">
              * 基于业界标准 671B MoE 算力集群真实能耗、运维及云端竞价实例测算模型
            </span>
            <button
              onClick={() => onRequestDemo?.(`TCO Simulation: ${currentModel.name}, ${dailyTokensM}M tokens/day, ${years}yr horizon`)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-lg glow-cyan transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Request Full TCO Audit Report' : '获取企业专属算力评估报告'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
