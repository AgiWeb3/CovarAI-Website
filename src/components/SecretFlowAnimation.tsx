import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Lock, EyeOff, Sparkles, Cpu } from 'lucide-react';
import { Language } from '../types';

interface SecretFlowAnimationProps {
  lang?: Language;
  onExploreTechnology?: () => void;
}

export const SecretFlowAnimation: React.FC<SecretFlowAnimationProps> = ({ 
  lang = 'zh-CN', 
  onExploreTechnology 
}) => {
  const [stage, setStage] = useState<number>(0);

  const t = {
    headerBadge: lang === 'en' ? 'ZERO-KNOWLEDGE TRUST CHAIN' : lang === 'zh-TW' ? '三步看懂：零知識密態防護鏈' : '三步看懂：零知识密态防护链',
    vendorPromise: lang === 'en' ? 'Keys 100% Local · CovarAI Sees 0' : lang === 'zh-TW' ? '密鑰不出內網 · 廠商 0 權限' : '密钥不出内网 · 厂商 0 权限',
    localVault: lang === 'en' ? 'Customer Intranet' : lang === 'zh-TW' ? '企業內網安全域' : '企业内网安全域',
    rawData: lang === 'en' ? '100% Key Custody' : lang === 'zh-TW' ? '本地獨佔密鑰加鎖' : '本地独占密钥加锁',
    zeroEgress: lang === 'en' ? 'Plaintext never leaves' : lang === 'zh-TW' ? '明文與密鑰永不出內網' : '明文与密钥永不出内网',
    covariant: lang === 'en' ? 'Cipher Lock' : lang === 'zh-TW' ? '亂碼變換' : '乱码变换',
    cloudAi: lang === 'en' ? 'Cloud Frontier LLM' : lang === 'zh-TW' ? '雲端旗艦大模型算力' : '云端旗舰大模型算力',
    fullReasoning: lang === 'en' ? 'Blind Inference' : lang === 'zh-TW' ? '密態張量盲算推理' : '密态张量盲算推理',
    surrendered: lang === 'en' ? 'seen by cloud/vendor' : lang === 'zh-TW' ? '雲端與廠商可見' : '云端与厂商可见',
    stage0: lang === 'en' ? '① Local Lock: Data turns into mathematical ciphertext inside your intranet' : lang === 'zh-TW' ? '① 內網加鎖：敏感數據在本地轉化為不可逆數學密態（密鑰不出內網）' : '① 内网加锁：敏感数据在本地转化为不可逆数学密态（密钥不出内网）',
    stage1: lang === 'en' ? '② Blind Compute: Cloud AI reasons over ciphertext; neither cloud nor CovarAI can decrypt' : lang === 'zh-TW' ? '② 雲端盲算：雲端直接對密態數據推理，雲廠商與 CovarAI 均無法解密' : '② 云端盲算：云端直接对密态数据推理，云厂商与 CovarAI 均无法解密',
    stage2: lang === 'en' ? '③ Local Unlock: Results return to intranet and restore with native accuracy' : lang === 'zh-TW' ? '③ 內網還原：結果回傳企業內網毫秒級解鎖還原，原生推理精度、0 明文外洩' : '③ 内网还原：结果回传企业内网毫秒级解锁还原，原生推理精度、0 明文外泄',
    tech: lang === 'en' ? 'Architecture' : lang === 'zh-TW' ? '底層原理' : '底层原理',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[520px] mx-auto select-none transform-gpu">
      <div className="rounded-3xl bg-gradient-to-b from-[#082214]/96 via-[#06180e]/96 to-[#030d07]/98 border border-[#1f794d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(78,228,139,0.12)] p-5 sm:p-6 relative overflow-hidden">
        {/* Top 1px Specular Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4ee48b]/30 to-transparent pointer-events-none" />

        {/* Ambient Glows with high-performance radial gradients */}
        <div 
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-60" 
          style={{ background: 'radial-gradient(circle, rgba(78,228,139,0.18) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-60" 
          style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.16) 0%, transparent 70%)' }}
        />

        {/* Top Executive Header Strip */}
        <div className="flex items-center justify-between gap-2 pb-3.5 mb-2 border-b border-[#1f794d]/30 text-[11px] font-mono">
          <span className="text-[#4ee48b] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t.headerBadge}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#092915] border border-[#1f794d]/60 text-[#80f2b0]">
            {t.vendorPromise}
          </span>
        </div>

        {/* 2 Visual Nodes: Local Vault vs Cloud AI */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 relative py-2">
          {/* Node 1: Local Vault */}
          <div className="rounded-2xl bg-gradient-to-b from-[#092915]/90 to-[#05160b]/95 border border-[#1f794d]/60 p-4 sm:p-5 flex flex-col items-center justify-between min-h-[215px] shadow-lg relative group">
            <div className="w-full flex items-center justify-between text-xs text-[#80f2b0] font-mono">
              <span className="font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ee48b] animate-ping" />
                {t.localVault}
              </span>
              <ShieldCheck className="w-4 h-4 text-[#4ee48b]" />
            </div>

            {/* Document Box Graphic with Glowing Shield */}
            <div className="my-auto flex flex-col items-center">
              <div className="relative w-16 h-20 rounded-xl bg-[#071d10] border-2 border-[#4ee48b]/70 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(78,228,139,0.25)]">
                <div className="w-10 h-1.5 bg-[#4ee48b]/80 rounded mb-1" />
                <div className="w-8 h-1 bg-[#80f2b0]/50 rounded mb-1" />
                <div className="w-6 h-1 bg-gray-400/40 rounded" />
                <Lock className="w-3.5 h-3.5 text-[#4ee48b] mt-2.5" />
              </div>
              <span className="text-xs font-bold text-white mt-3">{t.rawData}</span>
            </div>

            <div className="text-[11px] font-mono text-[#80f2b0] text-center bg-[#061c0e] px-2 py-0.5 rounded border border-[#1f794d]/40">
              {t.zeroEgress}
            </div>
          </div>

          {/* Central Math Barrier Operator Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-[#05160b] border-2 border-[#4ee48b] shadow-[0_0_25px_rgba(78,228,139,0.5)] flex items-center justify-center text-[10px] font-mono font-black text-[#4ee48b] hover:scale-110 transition-transform">
              LOCK
            </div>
            <span className="text-[9px] font-mono text-gray-300 mt-1 uppercase tracking-tighter bg-[#05160b]/90 px-1.5 rounded">
              {t.covariant}
            </span>
          </div>

          {/* Node 2: Cloud AI Frontier Model */}
          <div className="rounded-2xl bg-gradient-to-b from-[#052233]/90 to-[#03131c]/95 border border-[#0099ff]/50 p-4 sm:p-5 flex flex-col items-center justify-between min-h-[215px] shadow-lg relative group">
            <div className="w-full flex items-center justify-between text-xs text-[#38bdf8] font-mono">
              <span className="font-bold flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#00d2ff]" />
                {t.cloudAi}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
            </div>

            {/* Neural Matrix Graphic */}
            <div className="my-auto flex flex-col items-center">
              <div className="w-16 h-20 rounded-xl bg-[#041a29] border-2 border-[#00d2ff]/70 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.25)]">
                <div className="grid grid-cols-3 gap-1.5">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        stage === 1 ? 'bg-[#00d2ff] scale-110 shadow-[0_0_5px_#00d2ff]' : 'bg-[#0099ff]/50'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs font-bold text-white mt-3">{t.fullReasoning}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-[#38bdf8] text-center bg-[#021c2e] px-2 py-0.5 rounded border border-[#0099ff]/40">
              <EyeOff className="w-3 h-3 text-[#00d2ff]" />
              <span className="font-bold">0 CHARS</span>
              <span>{t.surrendered}</span>
            </div>
          </div>
        </div>

        {/* 3-Step Interactive Pill Selector + Status Ticker */}
        <div className="mt-4 pt-3.5 border-t border-[#1f794d]/30 space-y-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setStage(idx)}
                className={`py-1 px-2 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  stage === idx
                    ? 'bg-[#4ee48b] text-[#05160b] shadow-sm'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {idx === 0
                  ? lang === 'en' ? '1. Local Lock' : '① 内网加锁'
                  : idx === 1
                  ? lang === 'en' ? '2. Blind Cloud' : '② 云端盲算'
                  : lang === 'en' ? '3. Local Unlock' : '③ 内网还原'}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#4ee48b] animate-ping shrink-0" />
              <span className="font-medium text-xs leading-snug">
                {stage === 0 && t.stage0}
                {stage === 1 && t.stage1}
                {stage === 2 && t.stage2}
              </span>
            </div>

            {onExploreTechnology && (
              <button
                onClick={onExploreTechnology}
                className="text-[#4ee48b] hover:text-[#80f2b0] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer shrink-0 ml-3 hover:translate-x-0.5 transition-transform"
              >
                <span>{t.tech}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

