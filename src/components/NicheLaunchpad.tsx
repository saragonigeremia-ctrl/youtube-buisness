import React, { useState } from 'react';
import { NicheIdea } from '../types';
import { Sparkles, DollarSign, Target, Wrench, ArrowRight, ShieldCheck, Flame, Search, Layers } from 'lucide-react';

interface NicheLaunchpadProps {
  niches: NicheIdea[];
  onSelectNicheForScript: (niche: NicheIdea) => void;
  onGenerateCustomNiches: (interests: string) => Promise<void>;
  isGenerating: boolean;
}

export const NicheLaunchpad: React.FC<NicheLaunchpadProps> = ({
  niches,
  onSelectNicheForScript,
  onGenerateCustomNiches,
  isGenerating
}) => {
  const [userInterests, setUserInterests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInterests.trim()) return;
    onGenerateCustomNiches(userInterests.trim());
  };

  return (
    <div className="space-y-6">
      {/* Header & AI Brainstorm Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-red-500 mb-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Launchpad Nicchie Faceless ad Alto Rendimento (Shorts &amp; TikTok)
            </h1>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Per massimizzare il guadagno, abbina il pattern di timeline a una nicchia con un alto RPM (revenue per mille views) e opportunità di vendita di prodotti digitali o affiliazioni ricorrenti.
          </p>
        </div>

        {/* AI Custom Niche Prompt */}
        <form onSubmit={handleSubmit} className="mt-5 pt-5 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Inserisci i tuoi interessi, passioni o competenze (l'AI suggerirà le nicchie più profittevoli):
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={userInterests}
                onChange={(e) => setUserInterests(e.target.value)}
                placeholder="Es. Finanza personale, intelligenza artificiale, fitness maschile, criminalistica, orologi di lusso..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !userInterests.trim()}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shrink-0 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'Analisi Algoritmica in corso...' : 'Scopri Nicchie con AI'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Niches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {niches.map((niche) => (
          <div
            key={niche.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-sm group"
          >
            <div>
              {/* Niche Header & RPM Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                  {niche.name}
                </h3>
                <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 text-xs font-mono font-bold px-2 py-0.5 rounded shrink-0">
                  RPM ~${niche.avgRpmUsd.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed font-normal">
                {niche.tagline}
              </p>

              {/* Badges */}
              <div className="flex items-center space-x-2 text-[11px] mb-4">
                <span className="bg-slate-950 px-2 py-1 rounded text-slate-400 border border-slate-800">
                  Competizione: <strong className="text-slate-200">{niche.competitionLevel}</strong>
                </span>
                <span className="bg-red-950/40 text-red-400 px-2 py-1 rounded border border-red-900/50 flex items-center gap-1 font-semibold">
                  <Flame className="w-3 h-3" />
                  Viralità: {niche.viralityPotential}
                </span>
              </div>

              {/* Sample Hook */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Esempio Gancio Virale:</span>
                <p className="text-xs text-slate-200 italic">"{niche.sampleHook}"</p>
              </div>

              {/* Monetization Routes */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Canali di Guadagno:</span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {niche.monetizationRoutes.map((route, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <DollarSign className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{route}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Faceless Tools */}
              <div className="mb-4 pt-3 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-cyan-400" />
                  Software Consigliati (100% Senza Faccia):
                </span>
                <div className="flex flex-wrap gap-1">
                  {niche.recommendedFacelessTools.map((tool, i) => (
                    <span key={i} className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Select Niche CTA */}
            <button
              onClick={() => onSelectNicheForScript(niche)}
              className="w-full mt-2 bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border border-slate-700 hover:border-red-500"
            >
              <span>Genera Script per Questa Nicchia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
