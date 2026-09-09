import React from 'react';
import { ChannelPatternAnalysis, YouTubeChannel } from '../types';

interface PrintDossierProps {
  channel?: YouTubeChannel;
  analysis?: ChannelPatternAnalysis;
}

export const PrintDossier: React.FC<PrintDossierProps> = ({ channel, analysis }) => {
  if (!channel || !analysis) return null;

  return (
    <div className="hidden print:block text-slate-900 bg-white p-8 max-w-4xl mx-auto print-break-inside-avoid">
      {/* Header Document */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950">
            Dossier Analisi Pattern Virale &amp; Blueprint di Monetizzazione
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Studio di Ingegneria Algoritmica per YouTube Shorts, TikTok &amp; Instagram Reels
          </p>
        </div>
        <div className="text-right text-xs text-slate-500 font-mono">
          <div>Data: {analysis.analysisDate}</div>
          <div>Efficiency Index: {analysis.overallEfficiencyScore}/100</div>
        </div>
      </div>

      {/* Channel Summary Metrics */}
      <div className="bg-slate-100 p-4 rounded-lg mb-6 grid grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-slate-500 font-bold uppercase text-[10px]">Canale Analizzato</div>
          <div className="font-black text-sm text-slate-900">{channel.name}</div>
          <div className="text-slate-600">{channel.handle}</div>
          <div className="text-[10px] text-red-600 font-mono mt-1 break-all">{channel.youtubeUrl}</div>
        </div>
        <div>
          <div className="text-slate-500 font-bold uppercase text-[10px]">Media Views per Short</div>
          <div className="font-black text-base text-red-600">{channel.averageViewsPerShort.toLocaleString()}</div>
          <div className="text-slate-600">su {channel.totalShortsUploaded} Shorts caricati</div>
          <div className="text-[9px] text-emerald-700 font-semibold mt-0.5">100% Solo Shorts (No Video Lunghi)</div>
        </div>
        <div>
          <div className="text-slate-500 font-bold uppercase text-[10px]">Views / Iscritti</div>
          <div className="font-black text-base text-slate-900">{channel.viewsToSubRatio}x</div>
          <div className="text-slate-600">{channel.totalSubscribers.toLocaleString()} iscritti</div>
          <div className="text-[9px] text-slate-500 mt-0.5">Views Shorts: {channel.totalShortsViews.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-slate-500 font-bold uppercase text-[10px]">Cash Flow Shorts Stimato</div>
          <div className="font-black text-base text-emerald-700">~${channel.estimatedMonthlyShortsIncomeUsd.toLocaleString()}/mo</div>
          <div className="text-slate-600">RPM: ${channel.averageRpm}</div>
        </div>
      </div>

      {/* 1. Formula di Retention */}
      <div className="mb-6 print-break-inside-avoid">
        <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
          1. Formula di Retention Virale del Canale
        </h2>
        <p className="text-xs text-slate-800 leading-relaxed italic bg-slate-50 p-3 border-l-4 border-red-600">
          "{analysis.viralRetentionFormula}"
        </p>
      </div>

      {/* 2. Timeline Blueprint */}
      <div className="mb-6 print-break-inside-avoid">
        <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
          2. Struttura della Timeline Secondo per Secondo
        </h2>
        <table className="w-full text-left text-xs border border-slate-300">
          <thead className="bg-slate-200 text-slate-800 font-bold text-[10px] uppercase">
            <tr>
              <th className="p-2 border-r border-slate-300 w-24">Tempo</th>
              <th className="p-2 border-r border-slate-300 w-40">Fase &amp; Obiettivo</th>
              <th className="p-2 border-r border-slate-300">Azione Visiva</th>
              <th className="p-2 border-r border-slate-300">Audio / SFX</th>
              <th className="p-2">Trigger Psicologico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {analysis.timelineBlueprint.map((seg, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="p-2 font-mono font-bold text-red-600 border-r border-slate-200">{seg.timeframe}</td>
                <td className="p-2 font-semibold text-slate-900 border-r border-slate-200">
                  {seg.phaseName}
                  <div className="text-[10px] font-normal text-slate-500">{seg.goal}</div>
                </td>
                <td className="p-2 text-slate-700 border-r border-slate-200">{seg.visualDirection}</td>
                <td className="p-2 text-slate-700 border-r border-slate-200">{seg.audioSfx}</td>
                <td className="p-2 text-slate-700">{seg.psychologicalTrigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Architettura del Gancio & Regole di Editing */}
      <div className="grid grid-cols-2 gap-4 mb-6 print-break-inside-avoid">
        <div className="border border-slate-200 p-3 rounded text-xs">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] mb-2 border-b border-slate-200 pb-1">
            3. Architettura del Gancio (0-3s)
          </h3>
          <p className="text-slate-700 mb-2"><strong>Meccanica:</strong> {analysis.hookBlueprint.first3SecondsStructure}</p>
          <div className="text-slate-700 mb-1"><strong>Archetipi:</strong> {analysis.hookBlueprint.hookArchetypes.join(', ')}</div>
          <div className="text-slate-700"><strong>Sound Cues:</strong> {analysis.hookBlueprint.soundEffectCues.join(', ')}</div>
        </div>

        <div className="border border-slate-200 p-3 rounded text-xs">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] mb-2 border-b border-slate-200 pb-1">
            4. Regole di Editing &amp; Pacing
          </h3>
          <div className="text-slate-700 mb-1"><strong>Tagli:</strong> {analysis.pacingAndEditingRules.averageCutInterval}</div>
          <div className="text-slate-700 mb-1"><strong>Sottotitoli:</strong> {analysis.pacingAndEditingRules.subtitlesStyle}</div>
          <div className="text-slate-700 mb-1"><strong>B-Roll:</strong> {analysis.pacingAndEditingRules.bRollRatio}</div>
          <div className="text-slate-700"><strong>Soundtrack:</strong> {analysis.pacingAndEditingRules.soundDesignNotes}</div>
        </div>
      </div>

      {/* 5. Monetizzazione & Replicazione */}
      <div className="border border-slate-200 p-4 rounded text-xs print-break-inside-avoid">
        <h3 className="font-bold text-slate-900 uppercase text-[11px] mb-2 border-b border-slate-200 pb-1">
          5. Roadmap di Monetizzazione &amp; Istruzioni di Replicazione
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="font-bold text-slate-800">Entrate Stimate: {analysis.monetizationRoadmap.estimatedMonthlyRevenueRange}</div>
            <p className="text-slate-600 mt-1">{analysis.monetizationRoadmap.adSenseRpmNotes}</p>
          </div>
          <div>
            <div className="font-bold text-slate-800">Canali di Guadagno Consigliati:</div>
            <ul className="list-disc list-inside text-slate-600 mt-1">
              {analysis.monetizationRoadmap.bestAffiliateDigitalProducts.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-200">
          <div className="font-bold text-slate-800 mb-1">Playbook di Replicazione:</div>
          <ol className="list-decimal list-inside text-slate-700 space-y-1">
            {analysis.replicationPlaybook.map((st, i) => (
              <li key={i}>{st}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-3 border-t border-slate-300 text-center text-[10px] text-slate-500">
        Report generato automaticamente da Shorts Blueprint Cash Engine • Conforme agli algoritmi YouTube Shorts e TikTok 2026
      </div>
    </div>
  );
};
