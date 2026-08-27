import React from 'react';
import { Language, ActivePageView } from '../types';
import {
  Briefcase,
  ShieldCheck,
  Code2,
  Scale,
  ArrowRight,
  TrendingDown,
  Lock,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface PersonaSelectorCardsProps {
  lang: Language;
  onSelectView: (view: ActivePageView) => void;
  onRequestDemo: (role?: string) => void;
}

export const PersonaSelectorCards: React.FC<PersonaSelectorCardsProps> = ({
  lang,
  onSelectView,
  onRequestDemo,
}) => {
  const personas = [
    {
      id: 'executive' as const,
      role: lang === 'en' ? 'CEO / CFO / Executive' : lang === 'zh-TW' ? 'CEO / CFO / 商業決策者' : 'CEO / CFO / 商业决策者',
      badge: lang === 'en' ? 'Business & ROI Hub' : lang === 'zh-TW' ? '商業與投資回報門戶' : '商业与投资回报门户',
      headline:
        lang === 'en'
          ? 'Slash 70%+ TCO vs. Heavy On-Premises GPU Clusters'
          : lang === 'zh-TW'
          ? '算力 TCO 直降 70%+，告別重資產機房與漫長採購'
          : '算力 TCO 直降 70%+，告别重资产机房与漫长采购',
      coreValue:
        lang === 'en'
          ? 'Interactive CapEx vs. OpEx simulator, PUE modeling, MLOps payroll analysis, and guaranteed 7-day POC blueprint.'
          : lang === 'zh-TW'
          ? '硬體固定資產 vs 彈性算力精算、PUE 能耗建模、運維人力成本量化與 7 天確定性 POC 交付。'
          : '硬件固定资产 vs 弹性算力精算、PUE 能耗建模、运维人力成本量化与 7 天确定性 POC 交付。',
      icon: Briefcase,
      accent: 'emerald',
      actionText: lang === 'en' ? 'Explore ROI & TCO Hub' : lang === 'zh-TW' ? '進入商業與 ROI 專區' : '进入商业与 ROI 专区',
      highlights: [
        lang === 'en' ? 'CapEx: $0 Upfront' : '零硬體資產墊資 ($0 CapEx)',
        lang === 'en' ? '1-Day vs 180-Day Lead Time' : '1 天上線 vs 180 天採購週期',
        lang === 'en' ? '70%+ Net Cost Reduction' : '綜合成本節省 70%+',
      ],
    },
    {
      id: 'security' as const,
      role: lang === 'en' ? 'CISO / DPO / Compliance' : lang === 'zh-TW' ? 'CISO / 風控法務 / 合規官' : 'CISO / 风控法务 / 合规官',
      badge: lang === 'en' ? 'Security & Trust Center' : lang === 'zh-TW' ? '安全防禦與特權中心' : '安全防御与特权中心',
      headline:
        lang === 'en'
          ? '0 Plaintext in GPU VRAM & Complete Legal Privilege Exemption'
          : lang === 'zh-TW'
          ? 'GPU 顯存 0 字符明文暴露，司法特權 100% 豁免'
          : 'GPU 显存 0 字符明文暴露，司法特权 100% 豁免',
      coreValue:
        lang === 'en'
          ? 'Red/Blue team adversarial playground, VMA & Inversion GAN hardness, HIPAA / FRE 502 whitepaper, and audit attestation.'
          : lang === 'zh-TW'
          ? '紅藍軍攻防對抗靶場、詞表碰撞與隱層逆向防禦實測、HIPAA / FRE 502 特權免責證明。'
          : '红蓝军攻防对抗靶场、词表碰撞与隐层逆向防御实测、HIPAA / FRE 502 特权免责证明。',
      icon: ShieldCheck,
      accent: 'rose',
      actionText: lang === 'en' ? 'Enter CISO Trust Center' : lang === 'zh-TW' ? '進入 CISO 安全中心' : '进入 CISO 安全中心',
      highlights: [
        lang === 'en' ? 'Adversarial Red-Team Arena' : 'SOTA 攻防對抗實測靶場',
        lang === 'en' ? '7.9998 bits Max Entropy' : '最大白噪聲信息熵 7.9998 bits',
        lang === 'en' ? 'FRE 502 & HIPAA Exemption' : 'FRE 502 律師特權與 HIPAA 豁免',
      ],
    },
    {
      id: 'developer' as const,
      role: lang === 'en' ? 'Chief Architect / AI Engineer' : lang === 'zh-TW' ? '首席架構師 / AI 研發總監' : '首席架构师 / AI 研发总监',
      badge: lang === 'en' ? 'Developer & Docs Hub' : lang === 'zh-TW' ? '架構師與開發者專區' : '架构师与开发者专区',
      headline:
        lang === 'en'
          ? '3-Line Code Proxy & <3.5% Latency on DeepSeek 671B'
          : lang === 'zh-TW'
          ? '3 行代碼無感接入，671B MoE 延遲損耗 <3.5%'
          : '3 行代码无感接入，671B MoE 延迟损耗 <3.5%',
      coreValue:
        lang === 'en'
          ? 'Drop-in transparent proxy for OpenAI SDK / LangChain / Spring AI, FHE vs TEE vs CovarAI matrix, and 5-layer Onion anatomy.'
          : lang === 'zh-TW'
          ? 'OpenAI / LangChain / Spring AI 0 行重構代理，主流隱私計算技術全維矩陣與五層洋蔥架構解剖。'
          : 'OpenAI / LangChain / Spring AI 0 行重构代理，主流隐私计算技术全维矩阵与五层洋葱架构解剖。',
      icon: Code2,
      accent: 'cyan',
      actionText: lang === 'en' ? 'Open Developer Hub' : lang === 'zh-TW' ? '進入架構與開發者專區' : '进入架构与开发者专区',
      highlights: [
        lang === 'en' ? '0-Refactor OpenAI / LangChain' : '0 改造相容 OpenAI SDK',
        lang === 'en' ? 'DeepSeek 671B <3.5% Delta' : '671B MoE 延遲損耗 < 3.5%',
        lang === 'en' ? 'FHE vs TEE vs CovarAI Matrix' : '隱私計算路線全維對比矩陣',
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black via-zinc-950/80 to-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'TAILORED PERSONA PORTALS' : lang === 'zh-TW' ? '角色專屬決策通道' : '角色专属决策通道'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {lang === 'en'
              ? 'Choose Your Role for Focused Technical & Business Data'
              : lang === 'zh-TW'
              ? '按決策角色快速獲取精準數據與專屬工具'
              : '按决策角色快速获取精准数据与专属工具'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            {lang === 'en'
              ? 'No information clutter. Get straight to the ROI models, threat proofs, or SDK code you care about most.'
              : lang === 'zh-TW'
              ? '拒絕資訊過載。直接進入您最關心的財務投資回報、安全威脅證明或工程接入程式碼。'
              : '拒绝信息过载。直接进入您最关心的财务投资回报、安全威胁证明或工程接入代码。'}
          </p>
        </div>

        {/* 3 Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            const isEmerald = p.accent === 'emerald';
            const isRose = p.accent === 'rose';
            const isCyan = p.accent === 'cyan';

            const borderClass = isEmerald
              ? 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]'
              : isRose
              ? 'border-rose-500/30 hover:border-rose-400 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]'
              : 'border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]';

            const iconBg = isEmerald
              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60'
              : isRose
              ? 'bg-rose-950/80 text-rose-400 border-rose-700/60'
              : 'bg-cyan-950/80 text-cyan-400 border-cyan-700/60';

            const btnBg = isEmerald
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : isRose
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'bg-cyan-500 hover:bg-cyan-400 text-black';

            const badgeColor = isEmerald
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-700/50'
              : isRose
              ? 'text-rose-300 bg-rose-950/60 border-rose-700/50'
              : 'text-cyan-300 bg-cyan-950/60 border-cyan-700/50';

            return (
              <div
                key={p.id}
                data-aos="fade-up"
                className={`p-6 rounded-3xl bg-zinc-950/90 border ${borderClass} flex flex-col justify-between transition-all duration-300 group`}
              >
                <div>
                  {/* Top Badge & Role */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-gray-400">{p.role}</div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badgeColor}`}>
                          {p.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors leading-snug">
                    {p.headline}
                  </h3>

                  {/* Core Value Desc */}
                  <p className="text-xs text-gray-400 leading-relaxed mb-5">
                    {p.coreValue}
                  </p>

                  {/* Highlight bullets */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Entry Button */}
                <button
                  onClick={() => onSelectView(p.id)}
                  className={`w-full py-3 px-4 rounded-xl ${btnBg} font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer`}
                >
                  <span>{p.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
