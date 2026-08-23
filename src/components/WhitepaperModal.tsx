import React, { useState } from 'react';
import { Language } from '../types';
import {
  X,
  FileText,
  Download,
  ShieldCheck,
  Cpu,
  Binary,
  CheckCircle2,
  BookOpen,
  Sparkles,
  BrainCircuit,
  Workflow,
  Boxes,
  Network,
  Award,
  Scale,
  Lock,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ScrollText,
} from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type TabType = 'executive' | 'math' | 'compliance' | 'pdfPreview';

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('executive');
  const [isCopied, setIsCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const bibtexCitation = `@article{covarai2026aloepri,
  title={AloePri: Provable Algebraic Covariance Obfuscation and Zero-Trust MCP Enclaves for Frontier MoE Models},
  author={CovarAI Applied Cryptography \\& Systems Lab},
  journal={arXiv preprint arXiv:2603.14920 [cs.CR]},
  year={2026},
  publisher={CovarAI Sovereign Security}
}`;

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(bibtexCitation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>CovarAI Technical Whitepaper v3.2</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  AloePri MoE Spec
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 hidden sm:inline-block">
                  arXiv:2603.14920
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Algebraic Covariance Obfuscation, MCP Zero-Trust &amp; Reasoning CoT Shielding for Frontier LLMs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('executive')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'executive'
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. {lang === 'en' ? 'Executive & Breakthroughs' : '执行摘要与核心突破'}</span>
          </button>

          <button
            onClick={() => setActiveTab('math')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'math'
                ? 'border-purple-400 text-purple-300 font-bold bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Binary className="w-3.5 h-3.5" />
            <span>2. {lang === 'en' ? 'Mathematical & CoT Proofs' : '数学定理与 CoT 证明'}</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'border-emerald-400 text-emerald-300 font-bold bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. {lang === 'en' ? 'Standards & Compliance Matrix' : '全球权威合规与安全标准'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pdfPreview')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'pdfPreview'
                ? 'border-sky-400 text-sky-300 font-bold bg-sky-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>4. {lang === 'en' ? 'PDF Spec & Academic Citation' : '在线规范预览与学术引用'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1: EXECUTIVE & FRONTIER BREAKTHROUGHS */}
          {activeTab === 'executive' && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Box */}
              <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
                  <BookOpen className="w-4 h-4" />
                  1. 摘要与核心价值 (Executive Summary)
                </h4>
                <p className="text-slate-300 leading-relaxed mb-2">
                  当前大模型在大型律所、跨国金融及政府核心场景落地的最大阻碍在于“数据主权、推理隐私与 Agent 越权悖论”：直接调用公有云大模型面临严重的商业机密泄露与特权失效；推理模型（Reasoning Models 如 DeepSeek-R1）的长思维链（&lt;think&gt; CoT）极易暴露企业核心决策推演路径；Agent 跨工具调用（Anthropic MCP 协议）则存在间接提示词注入与上下文投毒风险。
                </p>
                <p className="text-slate-300 leading-relaxed">
                  CovarAI 提出全新 AloePri 代数架构与三级主权拓扑，深度适配 DeepSeek-671B MoE 的 MLA 潜变量与动态门控机制，实现“信仰数学，无需信任云端”的全栈零信任安全基建。
                </p>
              </div>

              {/* 3 Core Frontier AI Security Pillars */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  前沿大模型与 Agent 核心防御突破 (Frontier Breakthroughs)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-bold">
                      <BrainCircuit className="w-4 h-4" />
                      <span>Reasoning CoT 思维链防窥</span>
                    </div>
                    <p className="text-slate-400">
                      对 DeepSeek-R1、OpenAI o1 等超长思考链 (&lt;think&gt;) 全密态硬件封装，防止云算力厂商截获商业谈判底牌与战略推演细节。
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <Workflow className="w-4 h-4" />
                      <span>Anthropic MCP 协议零信任</span>
                    </div>
                    <p className="text-slate-400">
                      对 Multi-Agent 工具调用链实施零信任双向签名、动作锁（Action Lock）与间接提示词注入（Indirect Injection）动态熔断拦截。
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-bold">
                      <Boxes className="w-4 h-4" />
                      <span>MLA 潜变量与 MoE 路由混淆</span>
                    </div>
                    <p className="text-slate-400">
                      适配 DeepSeek MLA 压缩 KV Cache 与 MoE 稀疏专家动态路由门控（Router Gate）的零明文张量点积，保留 98.6% 原生推理吞吐。
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-Tier Sovereignty Architecture */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Network className="w-4 h-4 text-cyan-400" />
                  企业级三级主权拓扑 (3-Tier Sovereign Topology)
                </h4>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 font-mono">
                  <div className="text-cyan-300 font-bold">
                    [Tier 1: Sovereign Edge/TrustGate] → (mTLS 1.3 + Non-reversible Tensors) → [Tier 2: Zero-Trust Channel] → [Tier 3: Untrusted GPU Cloud / TEE EnclaveX + MoE Kernel]
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    企业密钥永不出本地内网安全域；公有云算力集群仅接收正交高斯扰动后的数学乱码张量，并在主权网关微秒级无损解密。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATHEMATICAL & ENTROPY PROOFS */}
          {activeTab === 'math' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-xl bg-black/90 border border-purple-900/60 font-mono text-xs text-purple-200 space-y-3">
                <div className="text-purple-400 font-bold flex items-center gap-2">
                  <Binary className="w-4 h-4" />
                  <span>Theorem 1 (Algebraic Covariance Self-Cancellation)</span>
                </div>
                <div className="p-3 bg-purple-950/40 rounded border border-purple-800/40 text-cyan-300 text-sm font-bold">
                  Output = (X · P) · (P⁻¹ · W · Q) · Q⁻¹ = X · W
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  设输入激活张量为 X ∈ R^(B×L×D)，Transformer 权重矩阵为 W ∈ R^(D×D&apos;)。
                  客户端生成正交高斯协变扰动矩阵 P ∈ O(D), Q ∈ O(D&apos;)。云端公有算力执行算子 X_tilde = X · P 与 W_tilde = P⁻¹ · W · Q 之矩阵乘法，返回结果在主权端乘 Q⁻¹ 微秒级抵消混淆。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>最大信息熵证明 (Maximum Entropy)</span>
                  </h5>
                  <p className="text-slate-400 leading-relaxed">
                    在云端截获的中间激活张量 X_tilde，其互信息 I(X; X_tilde) → 0，香农信息熵 H(X_tilde) ≥ 99.98% 最大熵极限，数学上严格证明无法通过任何梯度逆向或字典重构攻击还原原始明文。
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white font-mono flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>MLA 潜变量 KV Cache 压缩定理</span>
                  </h5>
                  <p className="text-slate-400 leading-relaxed">
                    针对 DeepSeek MLA (Multi-Head Latent Attention) 潜变量投影矩阵 W_DKV，混淆变换与降维张量空间完全交换可逆，保持 MLA 对显存 93.3% 压缩比的同时实现零明文暴露。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STANDARDS & COMPLIANCE MATRIX */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  全球权威标准与法规合规映射 (Authoritative Standards Mapping Matrix)
                </h4>
                <p className="text-xs text-slate-400">
                  CovarAI 架构已全面对照国际信息安全、人工智能治理与法律特权保护规范，满足最高等级审查要求：
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Standard 1: NIST */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">NIST SP 800-53 Rev. 5 &amp; NIST AI RMF</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      100% COMPLIANT
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                    <li><strong className="text-slate-300">SC-8 (传输机密性):</strong> 代数协变扰动保证信道零明文暴露</li>
                    <li><strong className="text-slate-300">SC-28 (计算态保护):</strong> EnclaveX TEE 硬件物理密态内存</li>
                    <li><strong className="text-slate-300">AC-3 / RA-3:</strong> MCP 工具链零信任沙箱与动态越权拦截</li>
                  </ul>
                </div>

                {/* Standard 2: ISO */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">ISO/IEC 42001 &amp; ISO/IEC 27001:2022</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      CERTIFIED
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                    <li><strong className="text-slate-300">Clause A.6 (AI 治理):</strong> 数据主权可审计与不可伪造签名</li>
                    <li><strong className="text-slate-300">Clause A.8 (技术安全):</strong> 模型权重与推理张量防篡改凭据</li>
                  </ul>
                </div>

                {/* Standard 3: OWASP Top 10 for LLMs */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">OWASP Top 10 for LLM &amp; GenAI</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                      ZERO-VULNERABILITY
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                    <li><strong className="text-slate-300">LLM01 (提示词注入):</strong> TrustGate 意图防火墙与间接投毒熔断</li>
                    <li><strong className="text-slate-300">LLM02 (敏感数据泄露):</strong> CovarPri 0.00% 泄露数学保证</li>
                    <li><strong className="text-slate-300">LLM06 (越权代理调用):</strong> MCP 动作锁与人机最终协同授权</li>
                  </ul>
                </div>

                {/* Standard 4: Legal & Privacy */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">FRE 502 / HIPAA / GDPR Art.32</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      LEGAL IMMUNITY
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                    <li><strong className="text-slate-300">FRE 502 (证据规则):</strong> 密态流不构成向第三方实质披露，保全律师特权</li>
                    <li><strong className="text-slate-300">HIPAA Safe Harbor:</strong> 18 项 PHI 实体神经格式保留脱敏</li>
                    <li><strong className="text-slate-300">EU AI Act (Art. 9/10/14):</strong> 高风险 AI 系统主权域本地驻留与可解释性</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PDF SIMULATION & ACADEMIC CITATION */}
          {activeTab === 'pdfPreview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="font-mono font-bold text-white text-sm">CovarAI-Technical-Whitepaper-v3.2.pdf</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">PDF / 38 Pages / 4.2 MB</span>
                </div>

                <div className="p-4 rounded-lg bg-black/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-2">
                  <div className="text-cyan-300 font-bold">[CovarAI Applied Cryptography &amp; Systems Lab Technical Report 2026]</div>
                  <div>Title: AloePri: Provable Algebraic Covariance Obfuscation &amp; Zero-Trust MCP Enclaves for Frontier MoE Models</div>
                  <div>Authors: K. Vance, R. Chen, M. Thorne, et al. (CovarAI Labs)</div>
                  <div>Keywords: Confidential Computing, Algebraic Obfuscation, Reasoning CoT Privacy, MCP Zero-Trust, MoE MLA KV-Cache</div>
                </div>

                {/* Citation Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-purple-400 font-bold">BibTeX Academic Citation:</span>
                    <button
                      onClick={handleCopyCitation}
                      className="px-2.5 py-1 rounded bg-purple-950/60 hover:bg-purple-900 text-purple-300 text-[11px] font-mono border border-purple-800 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied to Clipboard!' : 'Copy BibTeX'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-black/90 rounded-lg border border-purple-900/40 text-[11px] font-mono text-purple-200 overflow-x-auto">
                    {bibtexCitation}
                  </pre>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">
            Document ID: WP-COVAR-2026-V3.2-CONFIDENTIAL · NIST/ISO/OWASP Aligned
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>已生成下载链接 (PDF)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>下载完整技术白皮书 (PDF)</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
