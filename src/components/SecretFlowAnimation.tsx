import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Lock, EyeOff, Sparkles, Cpu } from 'lucide-react';
import { Language } from '../types';

interface SecretFlowAnimationProps {
  lang?: Language;
  onExploreTechnology?: () => void;
}

export const SecretFlowAnimation: React.FC<SecretFlowAnimationProps> = ({ 
  lang = 'zh', 
  onExploreTechnology 
}) => {
  const [stage, setStage] = useState<number>(0);
  const isZh = lang === 'zh' || lang === 'zh-TW';

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 2800);
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

        {/* 2 Visual Nodes: Local Vault vs Cloud AI */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 relative py-2">
          {/* Node 1: Local Vault */}
          <div className="rounded-2xl bg-gradient-to-b from-[#092915]/90 to-[#05160b]/95 border border-[#1f794d]/60 p-4 sm:p-5 flex flex-col items-center justify-between min-h-[220px] shadow-lg relative group">
            <div className="w-full flex items-center justify-between text-xs text-[#80f2b0] font-mono">
              <span className="font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ee48b] animate-ping" />
                {isZh ? '企业本地安全域' : 'Local Vault'}
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
              <span className="text-xs font-bold text-white mt-3">{isZh ? '真实核心数据' : 'Raw Data'}</span>
            </div>

            <div className="text-[11px] font-mono text-[#80f2b0] text-center bg-[#061c0e] px-2 py-0.5 rounded border border-[#1f794d]/40">
              {isZh ? '永不出本地物理边界' : 'Zero egress guarantee'}
            </div>
          </div>

          {/* Central Math Barrier Operator Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-[#05160b] border-2 border-[#4ee48b] shadow-[0_0_25px_rgba(78,228,139,0.5)] flex items-center justify-center text-[10px] font-mono font-black text-[#4ee48b] hover:scale-110 transition-transform">
              P·X
            </div>
            <span className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">
              {isZh ? '单向扰动' : 'Covariant'}
            </span>
          </div>

          {/* Node 2: Cloud AI Frontier Model */}
          <div className="rounded-2xl bg-gradient-to-b from-[#052233]/90 to-[#03131c]/95 border border-[#0099ff]/50 p-4 sm:p-5 flex flex-col items-center justify-between min-h-[220px] shadow-lg relative group">
            <div className="w-full flex items-center justify-between text-xs text-[#38bdf8] font-mono">
              <span className="font-bold flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#00d2ff]" />
                {isZh ? '云端大模型' : 'Cloud Frontier AI'}
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
              <span className="text-xs font-bold text-white mt-3">{isZh ? '100% 满血推理' : 'Full Reasoning'}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-[#38bdf8] text-center bg-[#021c2e] px-2 py-0.5 rounded border border-[#0099ff]/40">
              <EyeOff className="w-3 h-3 text-[#00d2ff]" />
              <span className="font-bold">0 BYTES</span>
              <span>{isZh ? '明文泄露' : 'surrendered'}</span>
            </div>
          </div>
        </div>

        {/* 1-Line Status Live Ticker */}
        <div className="mt-4 pt-3.5 border-t border-[#1f794d]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-[#4ee48b] animate-ping shrink-0" />
            <span className="font-medium text-xs sm:text-[13px] leading-snug">
              {stage === 0 && (isZh ? '① 敏感资产留在本地金库，明文绝不离开物理边界' : '① Data remains local; raw inputs never transmitted')}
              {stage === 1 && (isZh ? '② 经代数协变算子瞬时扰动，密态在云端盲算' : '② Scrambled into mathematical noise for blind cloud inference')}
              {stage === 2 && (isZh ? '③ AI 满血输出，云端无法探知任何单字节真实语义' : '③ Full model reasoning completed with 0 bytes surrendered')}
            </span>
          </div>

          {onExploreTechnology && (
            <button
              onClick={onExploreTechnology}
              className="text-[#4ee48b] hover:text-[#80f2b0] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer shrink-0 ml-3 hover:translate-x-0.5 transition-transform"
            >
              <span>{isZh ? '技术架构' : 'Tech'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

