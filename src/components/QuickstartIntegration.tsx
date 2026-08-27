import React, { useState } from 'react';
import { Language } from '../types';
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Play,
  Sparkles,
  ShieldCheck,
  Lock,
  Zap,
  Cpu,
  ArrowRight,
  RefreshCw,
  Layers,
  FileCheck2,
} from 'lucide-react';

interface QuickstartIntegrationProps {
  lang: Language;
  onRequestDemo?: () => void;
}

type TabType = 'python_openai' | 'python_langchain' | 'java_spring' | 'go' | 'typescript' | 'curl';

export const QuickstartIntegration: React.FC<QuickstartIntegrationProps> = ({
  lang,
  onRequestDemo,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('python_openai');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);

  const promptPresets = [
    {
      title: lang === 'en' ? 'M&A Due Diligence (Legal)' : lang === 'zh-TW' ? '併購盡職調查 (法務)' : '并购尽职调查 (法务)',
      prompt: lang === 'en'
        ? 'Analyze target firm ABC Corp\'s confidential patent licensing agreements and audit for $45M undisclosed contingent liabilities.'
        : lang === 'zh-TW'
        ? '穿透審查標的公司 ABC Corp 核心專利交叉許可協議，並核查 4,500 萬美元未披露或有債務風險。'
        : '穿透审查标的公司 ABC Corp 核心专利交叉许可协议，并核查 4,500 万美元未披露或有债务风险。',
      response: lang === 'en'
        ? '【Audit Completed】2 potential patent cross-infringement clauses identified. Contingent liability exposure estimated at $42.8M under Delaware jurisdiction. Attorney-Client Privilege preserved 100%.'
        : lang === 'zh-TW'
        ? '【審計完成】發現 2 處潛在專利交叉侵權排他條款，特拉華州司法管轄下或有債務敞口約 4,280 萬美元。律師-客戶特權 100% 存續。'
        : '【审计完成】发现 2 处潜在专利交叉侵权排他条款，特拉华州司法管辖下或有债务敞口约 4,280 万美元。律师-客户特权 100% 存续。',
    },
    {
      title: lang === 'en' ? 'Clinical Drug Discovery (Healthcare)' : lang === 'zh-TW' ? '臨床靶點篩選 (醫療)' : '临床靶点筛选 (医疗)',
      prompt: lang === 'en'
        ? 'Screen 1,500 patient EHR genomic variants for EGFR exon 20 insertion mutations without exposing patient IDs.'
        : lang === 'zh-TW'
        ? '對 1,500 例罕見腫瘤患者基因序列進行 EGFR 20 號外顯子插入突變靶點篩選，患者真實身份 100% 密態隱匿。'
        : '对 1,500 例罕见肿瘤患者基因序列进行 EGFR 20 号外显子插入突变靶点筛选，患者真实身份 100% 密态隐匿。',
      response: lang === 'en'
        ? '【Screening Finished】Found 37 positive cohort samples matching exon 20 insertion profile. HIPAA & GDPR compliance verified with zero PII exposure.'
        : lang === 'zh-TW'
        ? '【篩選完成】匹配出 37 例陽性突變佇列，靶點親和力評分 92.4。全流程通過 HIPAA 零明文外洩安全驗證。'
        : '【筛选完成】匹配出 37 例阳性突变队列，靶点亲和力评分 92.4。全流程通过 HIPAA 零明文外泄安全验证。',
    },
    {
      title: lang === 'en' ? 'Quant Strategy Backtest (Finance)' : lang === 'zh-TW' ? '量化高頻策略回測 (金融)' : '量化高频策略回测 (金融)',
      prompt: lang === 'en'
        ? 'Run multi-factor alpha signal extraction on Tier-1 hedge fund proprietary L2 order-book tick data.'
        : lang === 'zh-TW'
        ? '在頭部量化私有 L2 訂單簿 Tick 級底稿數據上運行多因子 Alpha 信號提取，確保因子公式物理不落地。'
        : '在头部量化私有 L2 订单簿 Tick 级底稿数据上运行多因子 Alpha 信号提取，确保因子公式物理不落地。',
      response: lang === 'en'
        ? '【Quant Signal Extracted】Sharpe Ratio 3.42, Maximum Drawdown 4.1%. Internal Alpha model weights remained inside EnclaveX without network exposure.'
        : lang === 'zh-TW'
        ? '【信號提取完畢】夏普比率 3.42，最大回撤 4.1%。量化核心因子與交易意圖 100% 鎖在內網，無任何反向工程風險。'
        : '【信号提取完毕】夏普比率 3.42，最大回撤 4.1%。量化核心因子与交易意图 100% 锁在内网，无任何反向工程风险。',
    },
  ];

  const codeSnippets: Record<TabType, { label: string; langTag: string; code: string }> = {
    python_openai: {
      label: 'Python (OpenAI SDK)',
      langTag: 'python',
      code: `# 只需将 base_url 指向本地/内网 TrustGate 代理，业务代码 0 修改
from openai import OpenAI

# 1. 初始化客户端：连接内网 TrustGate 密态网关 (默认 localhost:8080)
client = OpenAI(
    base_url="http://localhost:8080/v1",       # 密态透明代理网关
    api_key="covar-local-kms-token-secure",   # 本地主密钥，终生不出域
)

# 2. 发起标准推理请求：TrustGate 自动完成动态代数混淆与解密还原
response = client.chat.completions.create(
    model="deepseek-v3-confidential",         # 云端 671B MoE 零明文算力池
    messages=[
        {"role": "system", "content": "你是由 CovarAI 密态网关全程保护的企业级智能助手。"},
        {"role": "user", "content": "${promptPresets[selectedPromptIndex].prompt}"}
    ],
    temperature=0.2,
)

print(response.choices[0].message.content)
# 审计日志：已自动生成符合 FRE 502 / HIPAA 的不可篡改密码学证明链`,
    },
    python_langchain: {
      label: 'Python (LangChain / Agent)',
      langTag: 'python',
      code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# 兼容所有主流 Agent 框架 (LangChain, LlamaIndex, CrewAI, AutoGen)
llm = ChatOpenAI(
    base_url="http://localhost:8080/v1",        # TrustGate 密态网关
    api_key="covar-local-kms-token-secure",
    model="deepseek-r1-confidential",
)

prompt = ChatPromptTemplate.from_template("请对以下机密数据进行深度推理：{input}")
chain = prompt | llm

result = chain.invoke({"input": "${promptPresets[selectedPromptIndex].prompt}"})
print(result.content)`,
    },
    java_spring: {
      label: 'Java (Spring AI)',
      langTag: 'java',
      code: `// application.yml 零重构配置
// spring.ai.openai.base-url: http://localhost:8080
// spring.ai.openai.api-key: covar-local-kms-token-secure

@RestController
public class ConfidentialAiController {

    private final OpenAiChatModel chatModel;

    public ConfidentialAiController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @PostMapping("/api/analyze")
    public String analyzeConfidentialDoc(@RequestBody String payload) {
        // 请求自动经过 TrustGate 硬件 KMS 矩阵扰动，云端仅见高斯乱码
        return chatModel.call(payload);
    }
}`,
    },
    go: {
      label: 'Go (go-openai)',
      langTag: 'go',
      code: `package main

import (
    "context"
    "fmt"
    openai "github.com/sashabaranov/go-openai"
)

func main() {
    config := openai.DefaultConfig("covar-local-kms-token-secure")
    config.BaseURL = "http://localhost:8080/v1" // TrustGate Local Proxy

    client := openai.NewClientWithConfig(config)
    resp, err := client.CreateChatCompletion(
        context.Background(),
        openai.ChatCompletionRequest{
            Model: "deepseek-v3-confidential",
            Messages: []openai.ChatCompletionMessage{
                {Role: openai.ChatMessageRoleUser, Content: "${promptPresets[selectedPromptIndex].prompt}"},
            },
        },
    )
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Choices[0].Message.Content)
}`,
    },
    typescript: {
      label: 'TypeScript / Node.js',
      langTag: 'typescript',
      code: `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "http://localhost:8080/v1", // 指向内网 TrustGate 密态代理
  apiKey: process.env.COVAR_LOCAL_KEY, // 本地 KMS 密钥
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek-v3-confidential",
    messages: [
      { role: "user", content: "${promptPresets[selectedPromptIndex].prompt}" },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();`,
    },
    curl: {
      label: 'cURL / REST API',
      langTag: 'bash',
      code: `curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer covar-local-kms-token-secure" \\
  -d '{
    "model": "deepseek-v3-confidential",
    "messages": [
      {
        "role": "user",
        "content": "${promptPresets[selectedPromptIndex].prompt}"
      }
    ],
    "temperature": 0.2
  }'`,
    },
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationCompleted(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationCompleted(true);
    }, 850);
  };

  return (
    <section id="quickstart" className="py-24 bg-black relative overflow-hidden border-t border-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'DEVELOPER & ARCHITECTURE QUICKSTART' : lang === 'zh-TW' ? '極速接入 · 3 行代碼無感遷移' : '极速接入 · 3 行代码无感迁移'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="text-gradient-cyan">
              {lang === 'en' ? '3 Lines of Code. Zero Code Refactoring.' : lang === 'zh-TW' ? '3 行代碼，現有業務系統 0 行重構' : '3 行代码，现有业务系统 0 行重构'}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Fully compatible with OpenAI, Anthropic, and vLLM API standards. Simply point your base_url to the local TrustGate proxy — your prompts, agent workflows, and databases remain completely unchanged.'
              : lang === 'zh-TW'
              ? '完全兼容 OpenAI、Anthropic 及 vLLM 標準 API 協議。僅需將 SDK 的 base_url 指向內網 TrustGate 密態代理，Prompt 工程、業務代碼與 Agent 工具鏈 100% 原樣運行。'
              : '完全兼容 OpenAI、Anthropic 及 vLLM 标准 API 协议。仅需将 SDK 的 base_url 指向内网 TrustGate 密态代理，Prompt 工程、业务代码与 Agent 工具链 100% 原样运行。'}
          </p>
        </div>

        {/* Interactive Dual-Panel Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Panel: Multi-Language Code Snippet (7 Cols) */}
          <div data-aos="fade-up" className="lg:col-span-7 rounded-2xl bg-zinc-950 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between bg-slate-900/90 border-b border-slate-800 px-3 py-2 overflow-x-auto">
              <div className="flex items-center gap-1">
                {(['python_openai', 'python_langchain', 'java_spring', 'go', 'typescript', 'curl'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/80 font-bold shadow-sm'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    {codeSnippets[tab].label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ml-2"
                title={lang === 'en' ? 'Copy snippet' : '复制代码'}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">{lang === 'en' ? 'Copied' : '已复制'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                    <span>{lang === 'en' ? 'Copy' : '复制'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs text-gray-300 overflow-x-auto bg-black/70 leading-relaxed border-b border-slate-800/80">
              <pre className="text-cyan-100 selection:bg-cyan-500/30 selection:text-white whitespace-pre-wrap">
                {codeSnippets[activeTab].code}
              </pre>
            </div>

            {/* Bottom Highlights */}
            <div className="p-4 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-300">
                  {lang === 'en' ? 'SDK Status: Drop-in Replacement Verified' : 'SDK 状态: 即插即用无感替换已验证'}
                </span>
              </div>
              <div className="text-cyan-400">
                {lang === 'en' ? 'BaseURL: http://localhost:8080/v1' : '代理端点: http://localhost:8080/v1'}
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Live Interception & Telemetry Simulator (5 Cols) */}
          <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-5 rounded-2xl bg-zinc-950 border border-cyan-500/30 p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'en' ? 'Live TrustGate Interceptor' : 'TrustGate 密态代理流转实测'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {lang === 'en' ? 'LOCAL KMS ACTIVE' : '本地密钥就绪'}
                </span>
              </div>

              {/* Scenario Presets */}
              <div className="mb-4">
                <label className="block text-[11px] font-mono text-gray-400 mb-2">
                  {lang === 'en' ? 'Select Test Scenario:' : '选择测试业务载荷:'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {promptPresets.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPromptIndex(idx);
                        setSimulationCompleted(false);
                      }}
                      className={`p-2 rounded-lg text-[10px] font-mono text-left transition-all border cursor-pointer ${
                        selectedPromptIndex === idx
                          ? 'bg-cyan-950/80 border-cyan-500/80 text-cyan-200 font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Prompt Preview */}
              <div className="mb-4 p-3 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono">
                <div className="text-[10px] text-gray-500 mb-1 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Local Intranet Plaintext Payload' : '内网业务明文输入 (Local)'}</span>
                  <span className="text-emerald-400">0% Cloud Plaintext</span>
                </div>
                <p className="text-gray-200 text-[11px] leading-relaxed line-clamp-2">
                  "{promptPresets[selectedPromptIndex].prompt}"
                </p>
              </div>

              {/* Simulated Proxy Run Button */}
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer mb-4 glow-cyan"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'en' ? 'Simulating Dynamic Covariance P·X·P⁻¹...' : '正在执行动态代数扰动 P·X·P⁻¹...'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>{lang === 'en' ? 'Simulate Request via TrustGate' : '⚡ 模拟发起 TrustGate 密态代理推理'}</span>
                  </>
                )}
              </button>

              {/* Real-Time Telemetry & Output */}
              {simulationCompleted && (
                <div className="animate-fade-in space-y-3 p-3.5 rounded-xl bg-black/80 border border-emerald-500/40 text-xs font-mono">
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-800 pb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {lang === 'en' ? 'Inference Verified (0 Plaintext)' : '密态推理验证通过 (0 明文泄露)'}
                    </span>
                    <span className="text-gray-400 text-[10px]">Overhead: +1.2ms</span>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-400 bg-white/5 p-2 rounded-lg">
                    <div>
                      <span className="block text-gray-500">混淆耗时</span>
                      <span className="text-cyan-300 font-bold">1.2 ms</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">密文信息熵</span>
                      <span className="text-emerald-400 font-bold">7.9998 bits</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">云端明文暴露</span>
                      <span className="text-emerald-400 font-bold">0 Bytes</span>
                    </div>
                  </div>

                  {/* Restored Output */}
                  <div>
                    <span className="text-[10px] text-gray-400 block mb-1">
                      {lang === 'en' ? 'Restored Decrypted Response:' : '本地自抵消还原业务响应:'}
                    </span>
                    <p className="text-gray-200 text-[11px] leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      {promptPresets[selectedPromptIndex].response}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Audit Proof Stamp */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-cyan-400" />
                <span>Ed25519 Forensic Proof: Valid</span>
              </span>
              <span>Proxy Port: :8080</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
