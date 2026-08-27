import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  Binary,
  Radio,
  Eye,
  EyeOff,
  Crosshair,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Activity,
  Terminal,
  Cpu,
  Zap,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

interface RedTeamPlaygroundProps {
  lang: Language;
  onRequestWhitepaper?: () => void;
}

type AttackMethod = 'vma' | 'inversion' | 'gpu_dump' | 'side_channel';
type PayloadPreset = 'legal_mna' | 'health_record' | 'quant_alpha';

export const RedTeamPlayground: React.FC<RedTeamPlaygroundProps> = ({
  lang,
  onRequestWhitepaper,
}) => {
  const [activeRole, setActiveRole] = useState<'red' | 'blue'>('red');
  const [selectedAttack, setSelectedAttack] = useState<AttackMethod>('vma');
  const [selectedPayload, setSelectedPayload] = useState<PayloadPreset>('legal_mna');
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackCompleted, setAttackCompleted] = useState(false);
  const [entropyProgress, setEntropyProgress] = useState(7.9998);

  const payloads = {
    legal_mna: {
      title: lang === 'en' ? 'M&A Deal Memo ($18.5B Valuation)' : lang === 'zh-TW' ? '絕密併購底稿 ($185億估值)' : '绝密并购底稿 ($185亿估值)',
      plaintext: lang === 'en'
        ? 'PROJECT TITAN: Confidential acquisition bid for Target Corp at $18.5B with 22% premium. Unannounced spin-off of EU semiconductor division.'
        : lang === 'zh-TW'
        ? 'PROJECT TITAN: 對目標公司 185 億美元收購要約，溢價率 22%。包含未公開的歐洲半導體事業部剝離條款與 3.2 億或有負債。'
        : 'PROJECT TITAN: 对目标公司 185 亿美元收购要约，溢价率 22%。包含未公开的欧洲半导体事业部剥离条款与 3.2 亿或有负债。',
      covarTensorState: 'TENSOR_PERTURB[0x9F4C] · EIGEN_ROTATION[45.8°] · σ=0.0382 // SVD_RANK_MASKED',
      interceptedDump: '0x8F 0xA3 0x02 0xEE 0x9B 0x71 0xC4 0x5D 0x19 0xFA 0x88 0x01 0xDE 0x73 0x5A 0x90 0x3F 0x8B 0x0C 0x11 ... [100% UNSTRUCTURED GAUSSIAN NOISE]',
    },
    health_record: {
      title: lang === 'en' ? 'EHR Cancer Genomic Profile (PHI)' : lang === 'zh-TW' ? '腫瘤患者全基因組病歷 (PHI)' : '肿瘤患者全基因组病历 (PHI)',
      plaintext: lang === 'en'
        ? 'Patient: John Doe, SSN: 110-84-0312. Diagnosed Stage IV NSCLC with rare EGFR Exon 20 insertion. Testing experimental bispecific antibody.'
        : lang === 'zh-TW'
        ? '患者: 張*華, 身分證: 110108198403125678, 確診 IV 期非小細胞肺癌伴罕見 EGFR 20 外顯子插入突變，測試雙特異性抗體。'
        : '患者: 张*华, 身份证: 110108198403125678, 确诊 IV 期非小细胞肺癌伴罕见 EGFR 20 外显子插入突变，测试双特异性抗体。',
      covarTensorState: 'MLA_LATENT_OBF[0x33B1] · PROJECTION_COVAR_P · NOISE_ENTROPY=7.9998_BITS',
      interceptedDump: '0x3A 0x89 0xDF 0x12 0x7E 0xBC 0x55 0x09 0x91 0xEA 0x64 0x28 0xF3 0x10 0x87 0x4D 0x6A 0x22 0xCD 0x80 ... [ZERO RECOVERABLE PII TOKENS]',
    },
    quant_alpha: {
      title: lang === 'en' ? 'Proprietary HFT Alpha Formula' : lang === 'zh-TW' ? '高頻量化多因子 Alpha 公式' : '高频量化多因子 Alpha 公式',
      plaintext: lang === 'en'
        ? 'Alpha_98 = (Rank(Ts_ArgMax(SignedPower(((Returns < 0) ? StdDev(Returns, 20) : Close), 2.), 5)) - 0.5) * Volume_Imbalance_L2'
        : lang === 'zh-TW'
        ? 'Alpha_98 = (Rank(Ts_ArgMax(SignedPower(((Returns < 0) ? StdDev(Returns, 20) : Close), 2.), 5)) - 0.5) * Volume_Imbalance_L2'
        : 'Alpha_98 = (Rank(Ts_ArgMax(SignedPower(((Returns < 0) ? StdDev(Returns, 20) : Close), 2.), 5)) - 0.5) * Volume_Imbalance_L2',
      covarTensorState: 'ALGEBRAIC_COVAR_X[0xAA02] · P_MATMUL_P_INV // ORTHOGONAL_SPECTRUM_CONSERVED',
      interceptedDump: '0xCC 0x77 0x1B 0x98 0x4F 0x20 0x83 0xD4 0x61 0x0E 0xAB 0x59 0x2C 0xF0 0x81 0x3E 0x95 0x4A 0x17 0x62 ... [WEIGHT MATRIX NON-INVERTIBLE]',
    },
  };

  const attackMethods: Record<
    AttackMethod,
    {
      name: string;
      nameEn: string;
      desc: string;
      threatTier: string;
      mathPrinciple: string;
      plaintextOutcome: string;
      covarOutcome: string;
      interceptEntropy: string;
      leakageRate: string;
    }
  > = {
    vma: {
      name: '词表拓扑反向匹配攻击 (VMA)',
      nameEn: 'Vocabulary Matching Attack (VMA)',
      desc: lang === 'en'
        ? 'Attacker samples token embedding distances and cross-references vocabulary cosine similarity matrices to reconstruct raw prompt tokens.'
        : lang === 'zh-TW'
        ? '攻擊者透過嗅探 Transformer 第一層 Embedding 向量的餘弦相似度矩陣，試圖與開源詞表進行幾何拓撲碰撞，還原 Prompt 明文單詞。'
        : '攻击者通过嗅探 Transformer 第一层 Embedding 向量的余弦相似度矩阵，试图与开源词表进行几何拓扑碰撞，还原 Prompt 明文单词。',
      threatTier: 'SOTA Class A · High',
      mathPrinciple: lang === 'en'
        ? 'CovarAI dynamic non-singular matrix P disturbs the embedding space: P·E(x)·P⁻¹ breaks the isometric distance metric while preserving matrix multiplication.'
        : lang === 'zh-TW'
        ? 'CovarAI 本地非奇異矩陣 P 打亂了 Embedding 的度量空間：P·E(x)·P⁻¹ 破壞了等距餘弦距離，使詞表碰撞完全失效，幾何距離完全均勻化。'
        : 'CovarAI 本地非奇异矩阵 P 打乱了 Embedding 的度量空间：P·E(x)·P⁻¹ 破坏了等距余弦距离，使词表碰撞完全失效，几何距离完全均匀化。',
      plaintextOutcome: lang === 'en' ? '100% Raw Token Vocabulary Reconstructed' : '100% 还原原始 Prompt 关键词',
      covarOutcome: lang === 'en' ? '0% Reconstructed (Cosine similarity collapsed to uniform random distribution)' : '0% 还原 (余弦距离坍缩为均匀随机高斯白噪声)',
      interceptEntropy: '7.9998 bits / byte',
      leakageRate: '0.0000 %',
    },
    inversion: {
      name: '隐层激活逆向网络反演 (Model Inversion)',
      nameEn: 'Intermediate Activation Inversion',
      desc: lang === 'en'
        ? 'Attacker trains a surrogate decoder network to invert intermediate MLA/FFN hidden representations back into human-readable text.'
        : lang === 'zh-TW'
        ? '攻擊者訓練逆向代理神經網絡 (Inversion Decoder)，試圖從 MoE 路由門控與中間隱層張量直接逆向反推輸入數據。'
        : '攻击者训练逆向代理神经网络 (Inversion Decoder)，试图从 MoE 路由门控与中间隐层张量直接逆向反推输入数据。',
      threatTier: 'Academic SOTA · Severe',
      mathPrinciple: lang === 'en'
        ? 'Without the client-side private key (orthogonal basis matrix P), solving the inverse mapping is NP-hard under high-dimensional manifold projection.'
        : lang === 'zh-TW'
        ? '缺少客戶端 Local KMS 專屬密鑰矩陣 P 時，高維流形投影逆向映射在數學上屬於 NP-Hard 困難問題，逆向神經網絡 Loss 恆等於 1.0 (無法收斂)。'
        : '缺少客户端 Local KMS 专属密钥矩阵 P 时，高维流形投影逆向映射在数学上属于 NP-Hard 困难问题，逆向神经网络 Loss 恒等于 1.0 (无法收敛)。',
      plaintextOutcome: lang === 'en' ? '82.4% Semantic Content Recovered via Inversion GAN' : '82.4% 核心语义被逆向网络还原',
      covarOutcome: lang === 'en' ? '0% Semantic Recovery (Training Loss = 1.0, Total Mode Collapse)' : '0% 语义还原 (逆向网络 Loss 恒为 1.0 发生模式坍塌)',
      interceptEntropy: '7.9999 bits / byte',
      leakageRate: '0.0000 %',
    },
    gpu_dump: {
      name: '云端物理显存抓取与冷启动提取 (GPU RAM Cold Dump)',
      nameEn: 'GPU VRAM Memory Dump / Cold Boot',
      desc: lang === 'en'
        ? 'Malicious datacenter administrator or co-tenant performs direct PCIe / HBM3 memory scraping or hypervisor memory capture.'
        : lang === 'zh-TW'
        ? '雲端數據中心惡意運維人員或同物理機租戶，透過 PCIe 總線嗅探、Hypervisor 內存快照或 HBM3 顯存物理探針抓取顯存頁。'
        : '云端数据中心恶意运维人员或同物理机租户，通过 PCIe 总线嗅探、Hypervisor 内存快照或 HBM3 显存物理探针抓取显存页。',
      threatTier: 'Physical / Insider · Critical',
      mathPrinciple: lang === 'en'
        ? 'Data in transit and inside GPU VRAM exists purely as Covariance Obfuscated Tensors + Enclave hardware boundaries. Zero plaintext resides in GPU memory at any microsecond.'
        : lang === 'zh-TW'
        ? '數據在傳輸與 GPU 顯存駐留期間，100% 處於協變代數擾動態與 EnclaveX 機密飛地中。全生命週期內無任何 1 微秒出現明文字符串。'
        : '数据在传输与 GPU 显存驻留期间，100% 处于协变代数扰动态与 EnclaveX 机密飞地中。全生命周期内无任何 1 微秒出现明文字符串。',
      plaintextOutcome: lang === 'en' ? 'Full Plaintext String Extracted from KV-Cache' : '直接提取 KV-Cache 明文字符串与敏感实体',
      covarOutcome: lang === 'en' ? 'Captured only pseudorandom floating-point tensors with 0 semantic meaning' : '仅抓取到无语义伪随机浮点张量矩阵 (0 字节明文)',
      interceptEntropy: '8.0000 bits / byte',
      leakageRate: '0.0000 %',
    },
    side_channel: {
      name: '微架构侧信道与功耗电磁分析 (Side-Channel Attack)',
      nameEn: 'Cache Timing & EM Side-Channel',
      desc: lang === 'en'
        ? 'Attacker monitors GPU instruction cache hits, memory bus timing variance, or voltage fluctuations to deduce token sequences.'
        : lang === 'zh-TW'
        ? '攻擊者透過監控 GPU 指令快取命中延遲、NVLink 總線時序抖動或電磁輻射波動，旁路推測當前生成的 Token 序列。'
        : '攻击者通过监控 GPU 指令快取命中延迟、NVLink 总线时序抖动或电磁辐射波动，旁路推测当前生成的 Token 序列。',
      threatTier: 'Hardware Physical · High',
      mathPrinciple: lang === 'en'
        ? 'CovarAI adds constant-time padding and dynamic algebraic matrix masking, eliminating data-dependent microarchitectural timing variance.'
        : lang === 'zh-TW'
        ? 'CovarAI 注入恆定時序填充 (Constant-Time Padding) 與動態代數矩陣掩碼，抹平所有因明文輸入長度或字符引起的微架構時序特徵差異。'
        : 'CovarAI 注入恒定时序填充 (Constant-Time Padding) 与动态代数矩阵掩码，抹平所有因明文输入长度或字符引起的微架构时序特征差异。',
      plaintextOutcome: lang === 'en' ? 'Correlation Attack Leaks 60%+ Token Timings' : '时序相关性攻击泄漏 60%+ 关键 Token 边界',
      covarOutcome: lang === 'en' ? '0% Correlation Leak (Signal-to-Noise SNR < -45dB)' : '0% 相关性泄漏 (信噪比 SNR < -45dB 完全淹没在背景白噪声中)',
      interceptEntropy: '7.9995 bits / byte',
      leakageRate: '0.0000 %',
    },
  };

  const handleTriggerAttack = () => {
    setIsAttacking(true);
    setAttackCompleted(false);
    setEntropyProgress(7.4);

    const interval = setInterval(() => {
      setEntropyProgress((prev) => {
        if (prev >= 7.9998) {
          clearInterval(interval);
          return 7.9998;
        }
        return prev + 0.15;
      });
    }, 100);

    setTimeout(() => {
      setIsAttacking(false);
      setAttackCompleted(true);
    }, 1000);
  };

  const currentPayload = payloads[selectedPayload];
  const currentMethod = attackMethods[selectedAttack];

  return (
    <section id="redteam" className="py-24 bg-zinc-950/95 border-t border-slate-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>{lang === 'en' ? 'RED/BLUE TEAM ADVERSARIAL PLAYGROUND' : lang === 'zh-TW' ? '紅藍軍攻防對抗實戰模擬靶場' : '红蓝军攻防对抗实战模拟靶场'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-300">
              {lang === 'en' ? 'Simulate Real-World SOTA Attacks' : lang === 'zh-TW' ? '真實 SOTA 級反向工程與顯存竊密攻防實測' : '真实 SOTA 级反向工程与显存窃密攻防实测'}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Switch between Red-Team Attacker and Blue-Team Defender perspectives. Execute Vocabulary Matching (VMA), Model Inversion, and GPU RAM Dump attacks against CovarAI-protected models in real-time.'
              : lang === 'zh-TW'
              ? '自由切換紅軍攻擊者與藍軍防禦者視角。實時對 CovarAI 密態防護層發動詞表拓撲碰撞 (VMA)、隱層激活逆向 (Model Inversion) 與 GPU 物理顯存抓取實戰驗證。'
              : '自由切换红军攻击者与蓝军防御者视角。实时对 CovarAI 密态防护层发动词表拓扑碰撞 (VMA)、隐层激活逆向 (Model Inversion) 与 GPU 物理显存抓取实战验证。'}
          </p>
        </div>

        {/* Role Toggle Switch & Payload Presets */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800" data-aos="fade-up">
          {/* Red/Blue Mode Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveRole('red')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeRole === 'red'
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] border border-rose-400'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Crosshair className="w-4 h-4 text-rose-200" />
              <span>{lang === 'en' ? 'Red Team (Attacker Perspective)' : lang === 'zh-TW' ? '🔴 紅軍攻擊者視角' : '🔴 红军攻击者视角'}</span>
            </button>

            <button
              onClick={() => setActiveRole('blue')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeRole === 'blue'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-200" />
              <span>{lang === 'en' ? 'Blue Team (CovarAI Defender)' : lang === 'zh-TW' ? '🔵 藍軍密態防禦視角' : '🔵 蓝军密态防御视角'}</span>
            </button>
          </div>

          {/* Test Payload Preset Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-[11px] font-mono text-gray-400 whitespace-nowrap">
              {lang === 'en' ? 'Target Payload:' : '靶标载荷:'}
            </span>
            {(['legal_mna', 'health_record', 'quant_alpha'] as PayloadPreset[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedPayload(key);
                  setAttackCompleted(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  selectedPayload === key
                    ? 'bg-white/15 text-white border border-white/25 font-bold shadow-sm'
                    : 'bg-black/40 text-gray-400 border border-white/5 hover:text-gray-200'
                }`}
              >
                {payloads[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Attack Vector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-aos="fade-up">
          {(Object.keys(attackMethods) as AttackMethod[]).map((methodKey) => {
            const method = attackMethods[methodKey];
            const isSelected = selectedAttack === methodKey;

            return (
              <div
                key={methodKey}
                onClick={() => {
                  setSelectedAttack(methodKey);
                  setAttackCompleted(false);
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-zinc-900/90 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.25)] ring-1 ring-rose-500'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/80 text-rose-300 border border-rose-800/80">
                      {method.threatTier}
                    </span>
                    {isSelected && <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">
                    {lang === 'en' ? method.nameEn : method.name}
                  </h3>

                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-3">
                    {method.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? 'text-rose-400 font-bold' : 'text-gray-500'}>
                    {isSelected ? (lang === 'en' ? '● Armed & Ready' : '● 当前选定武器') : (lang === 'en' ? 'Arm Vector' : '点击装载')}
                  </span>
                  <Activity className="w-3 h-3 text-gray-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Attack Execution Simulation Deck */}
        <div data-aos="fade-up" className="rounded-3xl bg-zinc-950 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-12">
          {/* Top Panel Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                <Terminal className="w-4 h-4 text-rose-400" />
                <span>
                  {lang === 'en' ? 'ADVERSARIAL ATTACK SIMULATION CONSOLE' : '攻防对抗实时仿真工作台'}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-rose-400 font-bold">
                  {lang === 'en' ? currentMethod.nameEn : currentMethod.name}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {lang === 'en' ? 'Test Vector vs. CovarAI Covariance Perimeter' : '对抗武器 vs CovarAI 协变安全边界'}
              </h3>
            </div>

            <button
              onClick={handleTriggerAttack}
              disabled={isAttacking}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer glow-rose"
            >
              {isAttacking ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'en' ? 'Executing SOTA Exploitation...' : '正在执行反向神经网络拟合...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{lang === 'en' ? 'Launch Red-Team Exploit' : '⚡ 发动红军实战渗透验证'}</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Dual Sandbox Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-6">
            {/* Left: Unprotected Plaintext Baseline (Attacker Wins) */}
            <div className="p-5 rounded-2xl bg-rose-950/10 border border-rose-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-900/40">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">
                      {lang === 'en' ? 'Unprotected Baseline (Plaintext Cloud)' : '传统公有云 / 明文 API 推理'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">
                    {lang === 'en' ? 'CRITICAL RISK' : '高危严重泄密'}
                  </span>
                </div>

                <div className="space-y-3 text-xs font-mono mb-4">
                  <div>
                    <span className="text-[10px] text-gray-400 block mb-1">
                      {lang === 'en' ? 'Raw Prompt in GPU Memory:' : 'GPU 显存中驻留数据:'}
                    </span>
                    <p className="p-3 rounded-lg bg-black/60 border border-slate-800 text-rose-200 text-[11px] leading-relaxed">
                      "{currentPayload.plaintext}"
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 block mb-1">
                      {lang === 'en' ? 'Attacker Intercept Outcome:' : '攻击者逆向反推结果:'}
                    </span>
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-[11px] leading-relaxed flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{currentMethod.plaintextOutcome}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-rose-900/40 flex items-center justify-between text-[11px] font-mono text-rose-400">
                <span>{lang === 'en' ? 'Information Leakage:' : '敏感信息泄漏率:'} 100.0%</span>
                <span>{lang === 'en' ? 'Legal Privilege:' : '法律特权:'} VOID (豁免失效)</span>
              </div>
            </div>

            {/* Right: CovarAI Protected (Defender Wins 100%) */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/50 flex flex-col justify-between glow-cyan">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-900/40">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                      {lang === 'en' ? 'CovarAI Confidential Enclave' : 'CovarAI 协变密态主权云'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                    {lang === 'en' ? 'ZERO-LEAKAGE' : '100% 零泄露免责'}
                  </span>
                </div>

                <div className="space-y-3 text-xs font-mono mb-4">
                  <div>
                    <span className="text-[10px] text-gray-400 block mb-1">
                      {lang === 'en' ? 'GPU Memory State (Intercepted by Attacker):' : '算力节点与显存抓取抓包 (攻击者仅可见):'}
                    </span>
                    <p className="p-3 rounded-lg bg-black/80 border border-slate-800 text-cyan-300 text-[11px] leading-relaxed break-all">
                      {currentPayload.interceptedDump}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 block mb-1">
                      {lang === 'en' ? 'Attacker Intercept Outcome:' : '攻击者逆向反推结果:'}
                    </span>
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[11px] leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{currentMethod.covarOutcome}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                <span>{lang === 'en' ? 'Entropy:' : '信息熵:'} {entropyProgress.toFixed(4)} bits/byte</span>
                <span className="text-emerald-400 font-bold">{lang === 'en' ? 'Leakage: 0.0000%' : '实际泄露率: 0.0000%'}</span>
              </div>
            </div>
          </div>

          {/* Mathematical Proof Hardness Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gray-300">
              <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                <strong className="text-white">
                  {lang === 'en' ? 'Cryptographic Hardness Principle:' : '密码学不可逆数学机理：'}
                </strong>{' '}
                {currentMethod.mathPrinciple}
              </span>
            </div>

            {onRequestWhitepaper && (
              <button
                onClick={onRequestWhitepaper}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 border border-white/10 text-[11px] whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
              >
                {lang === 'en' ? 'View Adversarial Proofs' : '查阅攻防审计白皮书'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
