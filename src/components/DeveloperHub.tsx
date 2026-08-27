import React from 'react';
import { Language } from '../types';
import {
  ArrowLeft,
  Code2,
  Cpu,
  Zap,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Boxes,
} from 'lucide-react';
import { QuickstartIntegration } from './QuickstartIntegration';
import { TechComparisonMatrix } from './TechComparisonMatrix';
import { OnionArchitecture } from './OnionArchitecture';
import { DeploymentCTA } from './DeploymentCTA';

interface DeveloperHubProps {
  lang: Language;
  onBackToHome: () => void;
  onRequestDemo: (details?: string) => void;
  onOpenWhitepaper: () => void;
}

export const DeveloperHub: React.FC<DeveloperHubProps> = ({
  lang,
  onBackToHome,
  onRequestDemo,
  onOpenWhitepaper,
}) => {
  return (
    <div className="animate-fade-in">
      {/* Top Header Navigation Strip */}
      <div className="pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-3 sm:p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 flex flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white border border-cyan-500/20 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Main Portal' : lang === 'zh-TW' ? '返回首頁' : '返回首页'}</span>
            </button>
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'Chief Architect & Developer Hub' : lang === 'zh-TW' ? '首席架構師與開發者專區' : '首席架构师与开发者专区'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onRequestDemo('Developer SDK & Architecture Review')}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Request Dev Sandbox Key' : lang === 'zh-TW' ? '獲取沙盒 API Key' : '获取沙盒 API Key'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header for Developers */}
      <section className="pt-12 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? '3-LINE TRANSPARENT PROXY · <3.5% LATENCY DELTA · NATIVE 671B MoE' : lang === 'zh-TW' ? '3 行代碼透明代理 · 延遲損耗 <3.5% · 原生相容 671B MoE' : '3 行代码透明代理 · 延迟损耗 <3.5% · 原生兼容 671B MoE'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-300">
              {lang === 'en'
                ? 'Drop-in Privacy for Modern AI Workflows'
                : lang === 'zh-TW'
                ? '0 行業務重構，為前沿 AI 工作流注入毫秒級密態計算'
                : '0 行业务重构，为前沿 AI 工作流注入毫秒级密态计算'}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {lang === 'en'
              ? 'No complex cryptography code. Replace base_url with http://localhost:8080/v1 to route LangChain, LlamaIndex, OpenAI SDK, and Spring AI requests through local algebraic covariance and confidential enclaves with microsecond latency.'
              : lang === 'zh-TW'
              ? '無需編寫複雜的密碼學校驗代碼。只需將 base_url 重定向至本地內網 http://localhost:8080/v1，即可讓既有的 LangChain、LlamaIndex、OpenAI SDK 與 Spring AI 智慧體無縫穿透代數協變防護層，享受微秒級延遲與全密態推理。'
              : '无需编写复杂的密码学校验代码。只需将 base_url 重定向至本地内网 http://localhost:8080/v1，即可让既有的 LangChain、LlamaIndex、OpenAI SDK 与 Spring AI 智能体无缝穿透代数协变防护层，享受微秒级延迟与全密态推理。'}
          </p>
        </div>

        {/* 4 Developer Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: lang === 'en' ? 'Refactoring Lines Required' : '应用层业务改造代码量',
              val: '0 Lines',
              sub: lang === 'en' ? 'Just change base_url proxy' : '仅需配置代理 base_url',
              color: 'text-cyan-400',
            },
            {
              label: lang === 'en' ? 'End-to-End Latency Delta' : '端到端推理额外延迟损耗',
              val: '< 3.5%',
              sub: lang === 'en' ? 'DeepSeek 671B @ 42.8 t/s' : 'DeepSeek 671B 实测 42.8 t/s',
              color: 'text-sky-300',
            },
            {
              label: lang === 'en' ? 'Max Context Window' : '超长上下文原生支持',
              val: '200K ~ 2M',
              sub: lang === 'en' ? 'Zero Memory Explosion' : '零显存指数级爆炸',
              color: 'text-indigo-400',
            },
            {
              label: lang === 'en' ? 'Heterogeneous GPU Support' : '异构算力无缝迁移兼容性',
              val: '100% Port',
              sub: lang === 'en' ? 'NVIDIA / Ascend / Hygon' : 'NVIDIA / 华为昇腾 / 海光',
              color: 'text-emerald-400',
            },
          ].map((m, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-500/20 text-center">
              <div className={`text-2xl sm:text-3xl font-black font-mono ${m.color} mb-1`}>{m.val}</div>
              <div className="text-xs font-bold text-white mb-0.5">{m.label}</div>
              <div className="text-[10px] font-mono text-gray-400">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* 3-Line Code & Developer SDK Integration */}
        <div className="mb-14">
          <QuickstartIntegration
            lang={lang}
            onRequestDemo={() => onRequestDemo('Developer Quickstart API')}
          />
        </div>

        {/* Mainstream Tech Comparison Matrix (FHE vs TEE vs SMPC vs CovarAI) */}
        <div className="mb-14">
          <TechComparisonMatrix
            lang={lang}
            onRequestDemo={() => onRequestDemo('Architecture Comparison Briefing')}
          />
        </div>

        {/* 5-Layer Onion Architecture Interactive Anatomy */}
        <div className="mb-14">
          <OnionArchitecture lang={lang} />
        </div>

        {/* Delivery Matrix & POC */}
        <DeploymentCTA
          lang={lang}
          onOpenWhitepaper={onOpenWhitepaper}
        />
      </section>
    </div>
  );
};
