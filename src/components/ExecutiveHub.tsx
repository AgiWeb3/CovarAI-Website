import React, { useState } from 'react';
import { Language, IndustryScenarioId } from '../types';
import {
  ArrowLeft,
  Briefcase,
  TrendingDown,
  Calculator,
  ShieldCheck,
  Building2,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { TcoRoiCalculator } from './TcoRoiCalculator';
import { IndustryScenariosSection } from './IndustryScenariosSection';
import { CrisisSection } from './CrisisSection';
import { DeploymentCTA } from './DeploymentCTA';

interface ExecutiveHubProps {
  lang: Language;
  onBackToHome: () => void;
  onRequestDemo: (details?: string) => void;
  onOpenWhitepaper: () => void;
}

export const ExecutiveHub: React.FC<ExecutiveHubProps> = ({
  lang,
  onBackToHome,
  onRequestDemo,
  onOpenWhitepaper,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryScenarioId>('legal');

  return (
    <div className="animate-fade-in">
      {/* Top Header Navigation Strip */}
      <div className="pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-3 sm:p-4 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 flex flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 hover:text-white border border-emerald-500/20 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Main Portal' : lang === 'zh-TW' ? '返回首頁' : '返回首页'}</span>
            </button>
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-300">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'Executive & Business Decision Portal (CFO / CEO)' : lang === 'zh-TW' ? '商業與管理決策門戶 (CFO / CEO)' : '商业与管理决策门户 (CFO / CEO)'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onRequestDemo('Executive ROI Consultation')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Book CFO Briefing' : lang === 'zh-TW' ? '預約算力財務評估' : '预约算力财务评估'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section for Business Leaders */}
      <section className="pt-12 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-4">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'en' ? 'CAPEX ZERO · 70%+ TCO SAVINGS · 1-DAY GO-LIVE' : lang === 'zh-TW' ? '零硬體墊資 · 綜合成本降低 70%+ · 1 天即刻上線' : '零硬件垫资 · 综合成本降低 70%+ · 1 天即刻上线'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400">
              {lang === 'en'
                ? 'Eliminate Heavy GPU CapEx. Unlock Frontier MoE Intelligence.'
                : lang === 'zh-TW'
                ? '告別千萬級重資產機房採購，以公有雲彈性成本釋放 671B 大模型紅利'
                : '告别千万级重资产机房采购，以公有云弹性成本释放 671B 大模型红利'}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {lang === 'en'
              ? 'Private GPU clusters cost millions in upfront hardware, require specialized MLOps payroll, and take 6 months to procure. CovarAI provides a 100% zero-plaintext confidential cloud with zero hardware CapEx and 70%+ net savings.'
              : lang === 'zh-TW'
              ? '自建私有化算力集群面臨數百萬美元硬體墊資、漫長的供應鏈採購以及每年數十萬美元的 MLOps 運維團隊開銷。CovarAI 透過零明文密態主權雲，讓企業在零硬體資產投入下，享有彈性算力與 70%+ 的 TCO 節省。'
              : '自建私有化算力集群面临数百万美元硬件垫资、漫长的供应链采购以及每年数十万美元的 MLOps 运维团队开销。CovarAI 通过零明文密态主权云，让企业在零硬件资产投入下，享有弹性算力与 70%+ 的 TCO 节省。'}
          </p>
        </div>

        {/* 4 Key Executive Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: lang === 'en' ? 'Hardware CapEx Upfront' : '初始硬件采购资产 (CapEx)',
              val: '$0.00',
              sub: lang === 'en' ? 'Pure OpEx elasticity' : '纯 OpEx 按需弹性',
              color: 'text-emerald-400',
            },
            {
              label: lang === 'en' ? 'Average Net TCO Reduction' : '平均综合成本节约率 (TCO)',
              val: '70% ~ 78%',
              sub: lang === 'en' ? 'Verified on 64-GPU scale' : '基于 64 卡 H800 集群验证',
              color: 'text-cyan-400',
            },
            {
              label: lang === 'en' ? 'Deployment Lead Time' : '业务上线与交付周期',
              val: '1 Day',
              sub: lang === 'en' ? 'vs 180-day hardware lead' : '对比自建机房 180 天采购',
              color: 'text-emerald-300',
            },
            {
              label: lang === 'en' ? 'Privilege Exemption Guarantee' : '法律特权失效赔偿风险',
              val: '$0.00',
              sub: lang === 'en' ? 'FRE 502 / HIPAA Safe Harbor' : 'FRE 502 特权全流程存续',
              color: 'text-teal-300',
            },
          ].map((m, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 text-center">
              <div className={`text-2xl sm:text-3xl font-black font-mono ${m.color} mb-1`}>{m.val}</div>
              <div className="text-xs font-bold text-white mb-0.5">{m.label}</div>
              <div className="text-[10px] font-mono text-gray-400">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Core TCO Calculator (Interactive) */}
        <div className="mb-14">
          <TcoRoiCalculator
            lang={lang}
            onRequestDemo={onRequestDemo}
          />
        </div>

        {/* Executive Dilemma & Hidden Costs of On-Premises */}
        <div className="mb-14">
          <CrisisSection lang={lang} />
        </div>

        {/* Industry Vertical Solutions & Case Studies */}
        <div className="mb-14">
          <IndustryScenariosSection
            lang={lang}
            selectedIndustry={selectedIndustry}
            onSelectIndustry={setSelectedIndustry}
            onRequestDemo={onRequestDemo}
          />
        </div>

        {/* 7-Day POC Guaranteed Roadmap & Delivery */}
        <DeploymentCTA
          lang={lang}
          onOpenWhitepaper={onOpenWhitepaper}
        />
      </section>
    </div>
  );
};
