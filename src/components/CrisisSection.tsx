import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { AlertTriangle, ShieldAlert, Cpu, Database, CheckCircle, XCircle, FileWarning, Lock } from 'lucide-react';

interface CrisisSectionProps {
  lang: Language;
}

export const CrisisSection: React.FC<CrisisSectionProps> = ({ lang }) => {
  const t = translations[lang].crisis;

  const getRiskIcon = (id: string) => {
    switch (id) {
      case 'legal':
        return <FileWarning className="w-6 h-6 text-red-400" />;
      case 'hijack':
        return <ShieldAlert className="w-6 h-6 text-amber-400" />;
      case 'weights':
        return <Database className="w-6 h-6 text-rose-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
    }
  };

  return (
    <section id="crisis" className="py-24 bg-black relative overflow-hidden border-t border-slate-900">
      {/* Background Ambience Red/Amber Warning Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-danger-gradient blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-widest mb-4"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
          >
            <span className="text-gradient-danger">{t.title}</span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            {t.subtitle}
          </p>
        </div>

        {/* 3 Warning-Themed Cards in Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {t.cards.map((card, idx) => {
            const isLegal = card.id === 'legal';
            const isHijack = card.id === 'hijack';
            
            const cardTheme = isLegal 
              ? 'bg-red-950/20 border-red-500/30 hover:border-red-500/60 text-red-500 title-red' 
              : isHijack 
              ? 'bg-orange-950/20 border-orange-500/30 hover:border-orange-500/60 text-orange-500 title-orange'
              : 'bg-yellow-950/20 border-yellow-500/30 hover:border-yellow-500/60 text-yellow-500 title-yellow';

            const riskHeader = isLegal ? 'High Risk 01' : isHijack ? 'Critical 02' : 'Sensitive 03';

            return (
              <div
                key={card.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100 + 150}
                className={`relative rounded-xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 group ${
                  isLegal
                    ? 'bg-red-950/20 border-red-500/30 hover:border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
                    : isHijack
                    ? 'bg-orange-950/20 border-orange-500/30 hover:border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.15)]'
                    : 'bg-yellow-950/20 border-yellow-500/30 hover:border-yellow-500/60 shadow-[0_0_25px_rgba(234,179,8,0.15)]'
                }`}
              >
                {/* Highlight Badge for Legal beachhead */}
                {isLegal && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Beachhead · 核心突破口</span>
                  </div>
                )}

                <div>
                  {/* Risk Label */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className={`text-xs font-bold uppercase tracking-widest ${
                      isLegal ? 'text-red-500' : isHijack ? 'text-orange-500' : 'text-yellow-500'
                    }`}>
                      {riskHeader}
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                        isLegal
                          ? 'bg-red-950/60 text-red-300 border-red-800/60'
                          : isHijack
                          ? 'bg-orange-950/60 text-orange-300 border-orange-800/60'
                          : 'bg-yellow-950/60 text-yellow-300 border-yellow-800/60'
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                    {card.tag}
                  </span>

                  <h3
                    className={`text-lg font-bold mb-3 leading-snug ${
                      isLegal ? 'text-red-200' : isHijack ? 'text-orange-200' : 'text-yellow-200'
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Impact Indicator Footer */}
                <div
                  className={`pt-4 border-t ${
                    isLegal
                      ? 'border-red-900/40 text-red-300/90'
                      : isHijack
                      ? 'border-orange-900/40 text-orange-300/90'
                      : 'border-yellow-900/40 text-yellow-300/90'
                  } text-xs font-mono flex items-center gap-2`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 ${
                    isLegal ? 'text-red-400' : isHijack ? 'text-orange-400' : 'text-yellow-400'
                  }`} />
                  <span>{card.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Existing Solutions Compromise Comparison Matrix */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="rounded-2xl bg-slate-950/90 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {t.matrixTitle}
            </h3>
            <p className="text-xs sm:text-sm text-cyan-400 font-mono">
              {t.matrixSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">{t.headers.solution}</th>
                  <th className="py-3 px-4">{t.headers.performance}</th>
                  <th className="py-3 px-4">{t.headers.capability}</th>
                  <th className="py-3 px-4">{t.headers.sovereignty}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/80 font-normal">
                {t.matrixRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.highlight
                        ? 'bg-gradient-to-r from-cyan-950/50 via-slate-900/90 to-purple-950/50 text-white font-semibold shadow-md'
                        : 'text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    <td className="py-4 px-4 font-medium flex items-center gap-2">
                      {row.highlight ? (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      ) : null}
                      <span className={row.highlight ? 'text-cyan-300 font-bold' : ''}>
                        {row.solution}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        {row.performanceOk ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                        <span className={!row.performanceOk ? 'text-red-400 font-mono' : ''}>
                          {row.performance}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        {row.capabilityOk ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                        <span className={!row.capabilityOk ? 'text-red-400 font-mono' : ''}>
                          {row.capability}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        {row.sovereigntyOk ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                        <span className={row.highlight ? 'text-cyan-300 font-medium' : row.sovereigntyOk ? '' : 'text-red-400'}>
                          {row.sovereignty}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
