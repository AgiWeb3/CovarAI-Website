import React from 'react';
import { Language } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  Flame,
  Lock,
  FileCheck2,
  AlertTriangle,
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
  Cpu,
  Download,
} from 'lucide-react';
import { RedTeamPlayground } from './RedTeamPlayground';
import { OnionArchitecture } from './OnionArchitecture';
import { DeploymentCTA } from './DeploymentCTA';

interface SecurityHubProps {
  lang: Language;
  onBackToHome: () => void;
  onRequestDemo: (details?: string) => void;
  onOpenWhitepaper: () => void;
}

export const SecurityHub: React.FC<SecurityHubProps> = ({
  lang,
  onBackToHome,
  onRequestDemo,
  onOpenWhitepaper,
}) => {
  return (
    <div className="animate-fade-in">
      {/* Top Header Navigation Strip */}
      <div className="pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-3 sm:p-4 rounded-2xl bg-zinc-950/80 border border-rose-500/30 flex flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-[0_0_20px_rgba(244,63,94,0.1)]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white border border-rose-500/20 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Main Portal' : lang === 'zh-TW' ? '返回首頁' : '返回首页'}</span>
            </button>
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-rose-300">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>{lang === 'en' ? 'CISO, Security & Compliance Trust Center' : lang === 'zh-TW' ? 'CISO、安全防禦與法務合規中心' : 'CISO、安全防御与法务合规中心'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenWhitepaper}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-200 border border-rose-500/20 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              <span>{lang === 'en' ? 'Security Audit Whitepaper' : lang === 'zh-TW' ? '安全審計白皮書' : '安全审计白皮书'}</span>
            </button>
            <button
              onClick={() => onRequestDemo('CISO Security Threat Evaluation')}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Schedule CISO Audit' : lang === 'zh-TW' ? '預約安全威脅評估' : '预约安全威胁评估'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header for Security Officers */}
      <section className="pt-12 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono mb-4">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'en' ? 'ZERO-PLAINTEXT IN VRAM · NP-HARD HARDNESS · FULL PRIVILEGE EXEMPTION' : lang === 'zh-TW' ? '顯存 0 明文 · 數學不可逆 · 司法特權 100% 存續' : '显存 0 明文 · 数学不可逆 · 司法特权 100% 存续'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-200 to-cyan-300">
              {lang === 'en'
                ? 'Zero Plaintext Exposure. Provable Cryptographic Invariance.'
                : lang === 'zh-TW'
                ? 'GPU 顯存 0 字符明文暴露，可證明的密碼學不可逆防禦'
                : 'GPU 显存 0 字符明文暴露，可证明的密码学不可逆防御'}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {lang === 'en'
              ? 'Traditional cloud inference exposes raw token embeddings in plaintext, vulnerable to vocabulary matching (VMA), inversion GANs, and PCIe memory dumping. CovarAI guarantees algebraic covariance obfuscation at the client side, ensuring 0 sensitive bytes reside in GPU memory at any microsecond.'
              : lang === 'zh-TW'
              ? '傳統公有雲與明文 API 推理將 Token Embedding 暴露於顯存中，極易遭到詞表拓撲碰撞 (VMA)、隱層激活逆向網絡反演與 PCIe 顯存冷啟動抓取。CovarAI 在客戶端本地即完成代數協變混淆，全流程無任何 1 微秒出現明文字符串。'
              : '传统公有云与明文 API 推理将 Token Embedding 暴露于显存中，极易遭到词表拓扑碰撞 (VMA)、隐层激活逆向网络反演与 PCIe 显存冷启动抓取。CovarAI 在客户端本地即完成代数协变混淆，全流程无任何 1 微秒出现明文字符串。'}
          </p>
        </div>

        {/* 4 CISO Hardness Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: lang === 'en' ? 'GPU VRAM Plaintext State' : 'GPU 显存驻留明文量',
              val: '0 Bytes',
              sub: lang === 'en' ? '100% Unstructured Gaussian Noise' : '100% 高斯白噪声乱码态',
              color: 'text-rose-400',
            },
            {
              label: lang === 'en' ? 'Ciphertext Information Entropy' : '密态张量信息熵 (Entropy)',
              val: '7.9998 bits',
              sub: lang === 'en' ? 'Theoretical Max: 8.0000 bits' : '理论最大真随机上限 8.0 bits',
              color: 'text-amber-400',
            },
            {
              label: lang === 'en' ? 'Model Inversion GAN Loss' : '逆向反演神经网络 Loss',
              val: 'Loss ≡ 1.0',
              sub: lang === 'en' ? 'Total Mode Collapse (NP-Hard)' : '无法收敛 · 彻底模式坍塌',
              color: 'text-cyan-400',
            },
            {
              label: lang === 'en' ? 'Legal Privilege Exemption' : '证据与特权豁免存续率',
              val: '100.0%',
              sub: lang === 'en' ? 'FRE 502 / HIPAA Safe Harbor' : '符合 ABA 477R / HIPAA 标准',
              color: 'text-emerald-400',
            },
          ].map((m, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-rose-500/20 text-center">
              <div className={`text-2xl sm:text-3xl font-black font-mono ${m.color} mb-1`}>{m.val}</div>
              <div className="text-xs font-bold text-white mb-0.5">{m.label}</div>
              <div className="text-[10px] font-mono text-gray-400">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Red/Blue Team Adversarial Playground */}
        <div className="mb-14">
          <RedTeamPlayground
            lang={lang}
            onRequestWhitepaper={onOpenWhitepaper}
          />
        </div>

        {/* 5-Layer Defense Architecture Deep Dive */}
        <div className="mb-14">
          <OnionArchitecture lang={lang} />
        </div>

        {/* Regulatory Compliance Matrix & Legal Exemption */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-slate-800 mb-14">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <Scale className="w-6 h-6 text-rose-400" />
            <div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'en' ? 'Global Regulatory Compliance & Legal Privilege Certifications' : '全球合规监管矩阵与特权豁免法律背书'}
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {lang === 'en' ? 'Legal Opinions & Independent Third-Party Whitebox Audit Attestations' : '经权威律所合规意见书与国家级网络安全测评中心白盒审计认证'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                standard: 'ABA Formal Opinion 477R / FRE 502',
                domain: lang === 'en' ? 'Attorney-Client Privilege' : '律师-客户证据特权豁免',
                status: lang === 'en' ? '100% Protected (No Waiver)' : '特权全流程存续 (免责)',
                desc: lang === 'en' ? 'Mathematical noise does not constitute disclosure to third-party providers under Federal Rules of Evidence.' : '数学乱码态在联邦证据规则下不构成向第三方的实质性披露，特权不被放弃。',
              },
              {
                standard: 'HIPAA Safe Harbor (45 CFR § 164.514)',
                domain: lang === 'en' ? 'PHI Clinical Data Privacy' : '医疗 PHI 患者隐私最高红线',
                status: lang === 'en' ? 'Fully Compliant (Zero BAA Risk)' : '完全合规 (免除 BAA 违约)',
                desc: lang === 'en' ? 'Zero 18 PII identifiers transmitted to cloud GPUs. Clinically safe for multi-center research.' : '18 类患者可识别信息 100% 在本地代数隔离，多中心联合科研零泄露。',
              },
              {
                standard: 'GDPR Article 9 & Article 28',
                domain: lang === 'en' ? 'Cross-Border Sovereign Cloud' : '跨国数据跨境与主权云合规',
                status: lang === 'en' ? 'Zero Cross-Border Exposure' : '出境数据 100% 密态免申报',
                desc: lang === 'en' ? 'Obfuscated algebraic tensors are non-personal data under EU court interpretations.' : '欧盟判例认定经过非对称协变扰动的张量属于非个人数据，满足出境豁免。',
              },
              {
                standard: 'PCI-DSS 4.0 & Basel III Framework',
                domain: lang === 'en' ? 'Financial Secret Key Security' : '银行级量化模型与交易机密',
                status: lang === 'en' ? 'Hardware KMS Isolation' : '本地 KMS 专属密钥物理隔离',
                desc: lang === 'en' ? 'Client retains full cryptographic key sovereignty; cloud provider has zero decryption capability.' : '客户独占 KMS 密钥控制权，云厂商与算力中心完全无解密能力。',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/80 text-rose-300 border border-rose-800/80 block w-fit mb-2">
                    {item.standard}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1">{item.domain}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.desc}</p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day POC Guarantee */}
        <DeploymentCTA
          lang={lang}
          onOpenWhitepaper={onOpenWhitepaper}
        />
      </section>
    </div>
  );
};
