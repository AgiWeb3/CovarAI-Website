import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Binary,
  Shield,
  Bot,
  Zap,
  Sparkles,
  Server,
  ArrowRight,
  UserCheck,
  Building2,
  HeartPulse,
  Code2,
  Scale,
  Cpu,
  Layers,
} from 'lucide-react';
import { Language } from '../types';

interface PromptSandboxMatrixProps {
  lang: Language;
}

type ScenarioId = 'healthcare' | 'finance' | 'codeAudit' | 'legal';
type PipelineStage = 'raw' | 'trustgate' | 'covarpri' | 'cloudGpu' | 'decrypted';

export const PromptSandboxMatrix: React.FC<PromptSandboxMatrixProps> = ({ lang }) => {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('healthcare');
  const [currentStage, setCurrentStage] = useState<PipelineStage>('covarpri');
  const [isSimulating, setIsSimulating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  const scenarios = {
    healthcare: {
      id: 'healthcare' as const,
      name: lang === 'en' ? 'Clinical / PHI Diagnosis' : '医疗 / PHI 真实病历研判',
      icon: HeartPulse,
      color: 'emerald',
      rawPrompt: '患者: 张*华, 身份证: 110108198403125678, 确诊非小细胞肺癌(NSCLC) EGFR L858R突变，现评估特异性第三代靶向药奥希替尼与PD-L1联合给药方案及药物相互作用毒性分析。',
      sensitiveEntities: ['张*华', '110108198403125678', 'NSCLC EGFR L858R', '奥希替尼'],
      trustGateScrubbed: '患者: [PHI_USER_FPE_984], 身份证: [ID_TOKEN_FPE_441], 确诊[ONCOLOGY_BIOMARKER_L858R]，现评估特异性第三代靶向药[DRUG_CODE_AZD9291]与PD-L1联合给药方案及相互作用毒性。',
      covarTokens: [
        'TENSOR_P[0x88A1] · X[L858R] · Q⁻¹',
        'GAUSSIAN_PERTURB_σ=0.038 // ENTROPY=99.98%',
        'MLA_LATENT_KV[0x4F12] · MATMUL_OBF',
        'MOE_GATE_ROUTER[EXP_14, EXP_29] // MASKED',
      ],
      cloudGpuView: 'Executing 671B MoE Forward Pass on Encrypted Tensors. Intermediate activations = Pure Mathematical High-Entropy Noise (Loss=0.00, Privacy Leakage=0.000%).',
      decryptedOutput: '【临床决策支持建议】基于密态表征推演：三代EGFR-TKI联合PD-L1具有潜在间质性肺炎(ILD)叠加风险，建议维持靶向单药维持治疗，并监测外周血ctDNA丰度以动态评估耐药突变。',
      complianceTag: 'HIPAA Safe Harbor · GDPR Art.9 Certified',
    },
    finance: {
      id: 'finance' as const,
      name: lang === 'en' ? 'M&A / Valuation Secrets' : '投行 / 金融绝密并购底稿',
      icon: Building2,
      color: 'cyan',
      rawPrompt: '【绝密并购底稿 Project Titan】标的公司 ABC Global 2026年EBITDA预估 $1.45B，未公开协同溢价估值上限 $18.6B，隐性衍生品负债敞口 $320M，测算杠杆收购(LBO) IRR收益率与破产清算边界。',
      sensitiveEntities: ['Project Titan', 'ABC Global', '$1.45B', '$18.6B', '$320M'],
      trustGateScrubbed: '【绝密并购底稿 [M&A_CODE_44A]】标的公司 [TARGET_ENTITY_ENC] 2026年EBITDA预估 [FIN_VAL_1], 未公开协同溢价上限 [FIN_VAL_2], 隐性衍生品敞口 [FIN_VAL_3], 测算LBO IRR与清算边界。',
      covarTokens: [
        'MATRIX_COVAR_P[TITAN] · W_WEIGHTS · Q⁻¹',
        'FPE_FLOAT_OBFUSCATION[1.45B] // NOISE_SIG',
        'MLA_KV_COMPRESS[VALUATION_DCF] · PERMUTED',
        'MCP_ACTION_LOCK[EXTERNAL_EXPORT=DENIED]',
      ],
      cloudGpuView: 'Processing financial tensor products. Cloud nodes only see randomized matrices with zero semantic arbitrage capability.',
      decryptedOutput: '【LBO财务模型结论】基准情景下IRR达24.8%，债务杠杆倍数(Debt/EBITDA)为4.8x；当衍生品负债触发清算条款时，需在第3年注入$150M过桥资金以维持偿债覆盖率(DSCR > 1.35x)。',
      complianceTag: 'SEC Insider Trading Defense · Strict NDA',
    },
    codeAudit: {
      id: 'codeAudit' as const,
      name: lang === 'en' ? 'Core IP / Zero-Day Audit' : '代码审计 / 高频交易核心资产',
      icon: Code2,
      color: 'purple',
      rawPrompt: '审查高频量化撮合引擎关键内核: `MatchOrderBook(Order* incoming, RingBuffer<Order>& book)`，检查纳秒级无锁队列中的内存逃逸漏洞及私有动态滑点补偿公式 `alpha = (depth_ask - depth_bid) * gamma_spread` 是否存在零日竞态利用点。',
      sensitiveEntities: ['MatchOrderBook', 'RingBuffer<Order>& book', 'alpha = (depth_ask - depth_bid) * gamma_spread'],
      trustGateScrubbed: '审查高频撮合关键内核: `[CORE_KERNEL_FPE_01]`，检查纳秒级无锁队列中的内存逃逸漏洞及私有动态补偿公式 `[ALPHA_SECRET_FORMULA_99]` 是否存在零日竞态利用点。',
      covarTokens: [
        'AST_NODE_PERMUTATION[MATCH_ENGINE]',
        'TENSOR_ORTHOGONAL_P · EMBED(ALPHA) · Q⁻¹',
        'ZERO_KNOWLEDGE_KV_STREAM // 0xCC741',
        'COT_THINK_CHAIN[CONFIDENTIAL_ENCLAVE_LOCKED]',
      ],
      cloudGpuView: 'Synthesizing C++ AST vulnerability graphs within secure confidential enclaves. No proprietary algorithmic alpha leaked.',
      decryptedOutput: '【安全审计与补丁报告】发现无锁队列在极端并发下存在 ABA 问题导致内存屏障失效。已生成密态安全补丁：引入 `std::atomic<uint64_t> seq_tag` 实现版本双字 CAS，同时保持纳秒级吞吐不变。',
      complianceTag: 'Proprietary IP Shield · Zero Alpha Leakage',
    },
    legal: {
      id: 'legal' as const,
      name: lang === 'en' ? 'Legal / Deposition Strategy' : '律所特权 / 司法研判口供',
      icon: Scale,
      color: 'blue',
      rawPrompt: '【律师-客户特权材料 PRIVILEGED & CONFIDENTIAL】证人李某在半导体光刻胶侵权案中的宣誓口供笔录，客户最高和解底线 $45,000,000，我方秘密抗辩论据基于美国证据规则 FRE 502 及先例案 Qualcomm v. Broadcom，评估陪审团反驳策略。',
      sensitiveEntities: ['李某', '光刻胶侵权案', '$45,000,000', 'FRE 502', 'Qualcomm v. Broadcom'],
      trustGateScrubbed: '【律师-客户特权材料 [PRIVILEGED_SEAL]】证人 [WITNESS_TOKEN_9] 在 [PATENT_CASE_ENC] 中的宣誓口供笔录，客户最高和解底线 [SETTLEMENT_ENC], 我方秘密抗辩论据基于 [EVIDENCE_RULE] 与先例，评估反驳策略。',
      covarTokens: [
        'LEGAL_PRIVILEGE_SEAL[FRE_502_IMMUNE]',
        'NON_INVERTIBLE_TENSOR · W_MOE · P⁻¹',
        'REASONING_COT_SHIELD[<think> PROTECTED]',
        'STREAM_TENSOR_HASH[SHA256_ATTESTED]',
      ],
      cloudGpuView: 'Generating multi-jurisdictional legal precedents. Cloud provider has zero evidentiary access, maintaining absolute attorney-client privilege.',
      decryptedOutput: '【司法抗辩研判备忘录】根据 FRE 502(a)，本密态交互不构成特权弃权；建议在动议听证会中重点攻击原告关于均等论(Doctrine of Equivalents)的举证瑕疵，并将和解交涉节点设定在陪审团筛选程序之前。',
      complianceTag: 'FRE 502 Non-Waiver · Attorney-Client Privilege',
    },
  };

  const currentScenarioData = scenarios[activeScenario];
  const displayPrompt = isCustom ? customPrompt : currentScenarioData.rawPrompt;

  const handleSimulate = () => {
    setIsSimulating(true);
    setCurrentStage('trustgate');

    setTimeout(() => {
      setCurrentStage('covarpri');
    }, 600);

    setTimeout(() => {
      setCurrentStage('cloudGpu');
    }, 1200);

    setTimeout(() => {
      setCurrentStage('decrypted');
      setIsSimulating(false);
    }, 1800);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentStage('covarpri');
    setIsCustom(false);
    setCustomPrompt('');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 glow-cyan relative">
      {/* Sandbox Toolbar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="font-mono text-xs text-gray-300 pl-2">
            COVARPRI-MULTI-SCENARIO-EMULATOR // v3.2
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 hidden sm:inline-block">
            {currentScenarioData.complianceTag}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-md text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'en' ? 'RESET' : '重置状态'}</span>
          </button>
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="px-4 py-1.5 rounded-md text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-black flex items-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSimulating ? (
              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Play className="w-3 h-3 fill-current" />
            )}
            <span>{isSimulating ? (lang === 'en' ? 'STREAMING...' : '密态流式计算中...') : (lang === 'en' ? 'RUN PROVABLE PIPELINE' : '运行全链路密态仿真')}</span>
          </button>
        </div>
      </div>

      {/* Scenario Presets Selector */}
      <div className="my-6">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
          {lang === 'en' ? 'Select Production Prompt Scenario:' : '选择真实生产环境业务场景：'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(Object.keys(scenarios) as ScenarioId[]).map((key) => {
            const sc = scenarios[key];
            const isSelected = activeScenario === key && !isCustom;
            const Icon = sc.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveScenario(key);
                  setIsCustom(false);
                  setCurrentStage('covarpri');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500 text-white glow-cyan'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{sc.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5-Step Pipeline Flow Selector */}
      <div className="mb-6 p-2 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between overflow-x-auto gap-2 text-xs font-mono">
        <button
          onClick={() => setCurrentStage('raw')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            currentStage === 'raw' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>1. {lang === 'en' ? 'Plaintext Raw' : '端侧原始输入'}</span>
        </button>

        <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />

        <button
          onClick={() => setCurrentStage('trustgate')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            currentStage === 'trustgate' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>2. {lang === 'en' ? 'TrustGate & MCP' : 'TrustGate/MCP 准入'}</span>
        </button>

        <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />

        <button
          onClick={() => setCurrentStage('covarpri')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            currentStage === 'covarpri' ? 'bg-purple-950 text-purple-200 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Binary className="w-3.5 h-3.5 text-purple-400" />
          <span>3. {lang === 'en' ? 'CovarPri Tensor' : 'CovarPri 代数扰动'}</span>
        </button>

        <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />

        <button
          onClick={() => setCurrentStage('cloudGpu')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            currentStage === 'cloudGpu' ? 'bg-blue-950 text-blue-200 border border-blue-800 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-blue-400" />
          <span>4. {lang === 'en' ? 'Cloud MoE GPU' : '不可信云端 671B 算力'}</span>
        </button>

        <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />

        <button
          onClick={() => setCurrentStage('decrypted')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
            currentStage === 'decrypted' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>5. {lang === 'en' ? 'Lossless Output' : '主权端无损还原'}</span>
        </button>
      </div>

      {/* Split Screen Matrix: Input & Selected Pipeline View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Client Input & Highlighting */}
        <div className="flex flex-col justify-between rounded-xl bg-black/70 border border-white/10 p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                <Shield className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Sovereign Client Boundary (In-Memory Guard)' : '企业端侧主权边界 (内存卫士激活)'}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                0% LEAKAGE RISK
              </span>
            </div>

            <div className="mb-3 text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase mb-1">Active Prompt Payload:</div>
              <p className="text-white">{displayPrompt}</p>
            </div>

            <div className="pt-2">
              <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                <span>{lang === 'en' ? 'Identified High-Risk Entities:' : '识别的高敏实体 / 商业机密靶点：'}</span>
                <span className="text-cyan-400 font-bold">{currentScenarioData.sensitiveEntities.length} ENTITIES</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentScenarioData.sensitiveEntities.map((entity, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] font-mono"
                  >
                    🔒 {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>Chars: {displayPrompt.length}</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              MCP Token Guard: Active
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Stage Output Visualizer */}
        <div className="flex flex-col justify-between rounded-xl bg-black/90 border border-purple-500/40 p-5 relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-purple-300 flex items-center gap-1.5 font-bold">
                {currentStage === 'raw' && <Lock className="w-3.5 h-3.5 text-cyan-400" />}
                {currentStage === 'trustgate' && <UserCheck className="w-3.5 h-3.5 text-cyan-400" />}
                {currentStage === 'covarpri' && <Binary className="w-3.5 h-3.5 text-purple-400" />}
                {currentStage === 'cloudGpu' && <Server className="w-3.5 h-3.5 text-blue-400" />}
                {currentStage === 'decrypted' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>
                  {currentStage === 'raw' && (lang === 'en' ? 'Stage 1: Raw Plaintext Payload' : '阶段 1：端侧明文待发送载荷')}
                  {currentStage === 'trustgate' && (lang === 'en' ? 'Stage 2: TrustGate Scrubbed & MCP Lock' : '阶段 2：TrustGate 神经脱敏与 MCP 锁定')}
                  {currentStage === 'covarpri' && (lang === 'en' ? 'Stage 3: CovarPri Covariant Obfuscated Tensor' : '阶段 3：CovarPri 代数协变混淆张量流')}
                  {currentStage === 'cloudGpu' && (lang === 'en' ? 'Stage 4: Untrusted Cloud 671B MoE Forward Pass' : '阶段 4：公有云 GPU 671B MoE 密态矩阵乘法')}
                  {currentStage === 'decrypted' && (lang === 'en' ? 'Stage 5: Lossless Reconstructed Output' : '阶段 5：主权端微秒级无损还原决策输出')}
                </span>
              </span>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                PROVABLE MATH
              </span>
            </div>

            {/* Stage-Specific Content */}
            <div className="font-mono text-xs text-slate-300 py-1 space-y-2">
              {currentStage === 'raw' && (
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 leading-relaxed text-xs">
                  {displayPrompt}
                </div>
              )}

              {currentStage === 'trustgate' && (
                <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-800/50 text-cyan-200 leading-relaxed text-xs space-y-2">
                  <p>{currentScenarioData.trustGateScrubbed}</p>
                  <div className="text-[10px] text-cyan-400 pt-1 border-t border-cyan-900/50 flex items-center justify-between">
                    <span>NER FPE Masking: 100% Applied</span>
                    <span>MCP Intent Lock: Validated</span>
                  </div>
                </div>
              )}

              {currentStage === 'covarpri' && (
                <div className="space-y-1.5">
                  {currentScenarioData.covarTokens.map((token, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded bg-purple-950/50 border border-purple-800/50 text-[11px] text-purple-200 flex items-center justify-between"
                    >
                      <span>{token}</span>
                      <span className="text-[9px] text-emerald-400 font-bold">P·X·Q⁻¹ NON-INVERTIBLE</span>
                    </div>
                  ))}
                </div>
              )}

              {currentStage === 'cloudGpu' && (
                <div className="p-3.5 bg-blue-950/40 rounded-lg border border-blue-800/60 text-blue-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-blue-300 font-bold">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>DeepSeek-671B MoE / H100 Public Cluster</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{currentScenarioData.cloudGpuView}</p>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Attention Dot-Product Self-Canceling: Running in O(1)
                  </div>
                </div>
              )}

              {currentStage === 'decrypted' && (
                <div className="p-3.5 bg-emerald-950/30 rounded-lg border border-emerald-500/40 text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sovereign Lossless Output</span>
                  </div>
                  <p className="text-white text-xs leading-relaxed">{currentScenarioData.decryptedOutput}</p>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Accuracy Loss: 0.00% · Output Entropy: Intact
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="text-cyan-400">Client Latency Overhead: &lt;1.8ms</span>
            <span className="text-purple-300 font-bold">Plaintext Exposure: 0.00%</span>
          </div>
        </div>

      </div>

      {/* Sandbox Bottom Live Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
            {lang === 'en' ? 'Plaintext Leakage' : '明文泄露率'}
          </span>
          <span className="text-base sm:text-xl font-bold font-mono text-emerald-400">
            0.00%
          </span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
            {lang === 'en' ? 'Latency Overhead' : '端侧延迟开销'}
          </span>
          <span className="text-base sm:text-xl font-bold font-mono text-cyan-400">
            1.8ms
          </span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
            {lang === 'en' ? 'Accuracy Delta' : '模型精度损耗'}
          </span>
          <span className="text-base sm:text-xl font-bold font-mono text-purple-300">
            0.00%
          </span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">
            {lang === 'en' ? 'Mathematical Entropy' : '信息熵纯度'}
          </span>
          <span className="text-base sm:text-xl font-bold font-mono text-yellow-400">
            99.98%
          </span>
        </div>
      </div>
    </div>
  );
};
