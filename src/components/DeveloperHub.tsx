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
      <div className="pt-20 sm:pt-24 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#061c0e]/90 border border-[#1f794d]/40 flex flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-[0_0_20px_rgba(78,228,139,0.1)]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#092915] text-[#80f2b0] hover:text-white border border-[#1f794d]/40 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Main Portal' : lang === 'zh-TW' ? '返回首頁' : '返回首页'}</span>
            </button>
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#80f2b0]">
              <Code2 className="w-3.5 h-3.5 text-[#4ee48b]" />
              <span>{lang === 'en' ? 'Chief Architect & Developer Hub' : lang === 'zh-TW' ? '首席架構師與開發者專區' : '首席架构师与开发者专区'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onRequestDemo('Developer SDK & Architecture Review')}
              className="px-3.5 py-1.5 rounded-xl bg-[#4ee48b] hover:bg-[#38d677] text-[#05160b] font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#4ee48b]/20 transition-all cursor-pointer"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061c0e] border border-[#1f794d]/50 text-[#80f2b0] text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-[#4ee48b]" />
            <span>{lang === 'en' ? '3-LINE TRANSPARENT PROXY · <3.5% LATENCY DELTA · DEEPSEEK V4.1 FLASH / KIMI K3 / QWEN 3.8' : lang === 'zh-TW' ? '3 行代碼透明代理 · 延遲損耗 <3.5% · 原生賦能 DeepSeek-V4.1 / Kimi K3 / Qwen 3.8' : '3 行代码透明代理 · 延迟损耗 <3.5% · 原生赋能 DeepSeek-V4.1 / Kimi K3 / Qwen 3.8'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4ee48b] via-[#80f2b0] to-white">
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
              label: lang === 'en' ? 'Refactoring Lines Required' : lang === 'zh-TW' ? '應用層業務改造代碼量' : '应用层业务改造代码量',
              val: '0 Lines',
              sub: lang === 'en' ? 'Just change base_url proxy' : lang === 'zh-TW' ? '僅需配置代理 base_url' : '仅需配置代理 base_url',
              color: 'text-[#4ee48b]',
            },
            {
              label: lang === 'en' ? 'End-to-End Latency Delta' : lang === 'zh-TW' ? '端到端推理額外延遲損耗' : '端到端推理额外延迟损耗',
              val: '< 3.5%',
              sub: lang === 'en' ? 'DeepSeek-V4.1 Flash @ 78.5 t/s' : lang === 'zh-TW' ? 'DeepSeek-V4.1 Flash 實測 78.5 t/s' : 'DeepSeek-V4.1 Flash 实测 78.5 t/s',
              color: 'text-[#80f2b0]',
            },
            {
              label: lang === 'en' ? 'Max Context Window' : lang === 'zh-TW' ? '超長上下文原生支援' : '超长上下文原生支持',
              val: '200K ~ 2M',
              sub: lang === 'en' ? 'Zero Memory Explosion' : lang === 'zh-TW' ? '零顯存指數級爆炸' : '零显存指数级爆炸',
              color: 'text-[#4ee48b]',
            },
            {
              label: lang === 'en' ? 'Heterogeneous GPU Support' : lang === 'zh-TW' ? '異構算力無縫遷移相容性' : '异构算力无缝迁移兼容性',
              val: '100% Port',
              sub: lang === 'en' ? 'NVIDIA / Ascend / Hygon' : lang === 'zh-TW' ? 'NVIDIA / 華為昇騰 / 海光' : 'NVIDIA / 华为昇腾 / 海光',
              color: 'text-[#80f2b0]',
            },
          ].map((m, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#061c0e]/90 border border-[#1f794d]/40 text-center shadow-lg">
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
