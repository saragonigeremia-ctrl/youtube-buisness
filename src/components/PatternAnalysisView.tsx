import React, { useState } from 'react';
import { ChannelPatternAnalysis, YouTubeChannel } from '../types';
import {
  Printer,
  Download,
  Flame,
  Clock,
  Zap,
  Volume2,
  CheckCircle2,
  FileText,
  DollarSign,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Share2,
  Copy,
  Layers,
  BarChart3,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface PatternAnalysisViewProps {
  channel: YouTubeChannel;
  analysis: ChannelPatternAnalysis;
  isLoading: boolean;
  onGoToScriptGenerator: (channel: YouTubeChannel) => void;
  onPrint: () => void;
}

export const PatternAnalysisView: React.FC<PatternAnalysisViewProps> = ({
  channel,
  analysis,
  isLoading,
  onGoToScriptGenerator,
  onPrint
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const channelShortsUrl = channel.youtubeUrl || `https://www.youtube.com/${channel.handle.startsWith('@') ? channel.handle : '@' + channel.handle}/shorts`;

  const handleDownloadMarkdown = () => {
    const mdContent = `
# DOSSIER ANALISI PATTERN VIRALE - YOUTUBE SHORTS
**Canale:** ${channel.name} (${channel.handle})
**Link Canale YouTube (Shorts):** ${channelShortsUrl}
**Data Analisi:** ${analysis.analysisDate}
**Nicchia:** ${channel.niche}
**Media Views per Short / Reel:** ${formatNumber(channel.averageViewsPerShort)} (Conteggio: 100% Solo Shorts/Reels, esclusi video lunghi)
**Totale Shorts Caricati:** ${channel.totalShortsUploaded}
**Punteggio di Efficienza:** ${analysis.overallEfficiencyScore}/100

---

## 1. FORMULA DI RETENTION VIRALE
${analysis.viralRetentionFormula}

---

## 2. BLUEPRINT DELLA TIMELINE SECONDO PER SECONDO
${analysis.timelineBlueprint.map(seg => `
### [${seg.timeframe}] ${seg.phaseName}
- **Obiettivo Algoritmico:** ${seg.goal}
- **Direzione Visiva:** ${seg.visualDirection}
- **Audio & Effetti Sonori (SFX):** ${seg.audioSfx}
- **Trigger Psicologico:** ${seg.psychologicalTrigger}
- **Impatto sulla Retention:** ${seg.retentionImpact}
`).join('\n')}

---

## 3. ARCHITETTURA DEL GANCIO (I PRIMI 3 SECONDI)
- **Struttura:** ${analysis.hookBlueprint.first3SecondsStructure}
- **Archetipi di Gancio Utilizzati:**
${analysis.hookBlueprint.hookArchetypes.map(a => `  * ${a}`).join('\n')}
- **Esempio Efficace del Canale:** "${analysis.hookBlueprint.topPerformingHookExample}"
- **Sound Effect Triggers:** ${analysis.hookBlueprint.soundEffectCues.join(', ')}

---

## 4. REGOLE DI EDITING & PACING
- **Intervallo Medio di Taglio:** ${analysis.pacingAndEditingRules.averageCutInterval}
- **Stile Sottotitoli:** ${analysis.pacingAndEditingRules.subtitlesStyle}
- **Rapporto B-Roll / Grafica:** ${analysis.pacingAndEditingRules.bRollRatio}
- **Sound Design:** ${analysis.pacingAndEditingRules.soundDesignNotes}
- **Safe Zone & Aspect Ratio:** ${analysis.pacingAndEditingRules.aspectRatioPointers}

---

## 5. LEVA ALGORITMICA (SHORTS & TIKTOK 2026)
- **% Media di Visualizzazione Attesa (APV):** ${analysis.algorithmicLeverage.expectedAveragePercentageViewed}
- **Prevenzione Swipe-Away:** ${analysis.algorithmicLeverage.swipeAwayPreventionMechanism}
- **Loop Infinito:** ${analysis.algorithmicLeverage.loopHookExecution}
- **Trigger Commenti:** ${analysis.algorithmicLeverage.commentsEngagementTrigger}

---

## 6. ROADMAP DI MONETIZZAZIONE & CASH FLOW
- **Range Entrate Mensili Stimate:** ${analysis.monetizationRoadmap.estimatedMonthlyRevenueRange}
- **Note RPM AdSense:** ${analysis.monetizationRoadmap.adSenseRpmNotes}
- **Migliori Prodotti Affiliati/Digitali:**
${analysis.monetizationRoadmap.bestAffiliateDigitalProducts.map(p => `  * ${p}`).join('\n')}
- **Potenziale Sponsorizzazioni:** ${analysis.monetizationRoadmap.sponsorshipPotential}

---

## 7. PLAYBOOK DI REPLICAZIONE (5 STEP)
${analysis.replicationPlaybook.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

---
*Generato con YouTube Shorts Cash & Pattern Blueprint*
    `.trim();

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Dossier_Pattern_${channel.handle.replace('@', '')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ channel, analysis }, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `Analisi_${channel.handle.replace('@', '')}.json`);
    link.click();
  };

  const copyShareSummary = () => {
    const text = `Analisi Pattern Virale di ${channel.name}: Media ${formatNumber(channel.averageViewsPerShort)} views/video con soli ${channel.totalShortsUploaded} uploads! Formula: ${analysis.viralRetentionFormula}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <img
              src={channel.avatarUrl}
              alt={channel.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center space-x-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight">{channel.name}</h1>
                <span className="text-slate-400 text-sm font-medium">{channel.handle}</span>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/20">
                  {analysis.overallEfficiencyScore}/100 Efficienza Algoritmica
                </span>
                <span className="bg-red-950/70 text-red-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-900/50">
                  Solo Shorts / Reel (Esclusi Video Lunghi)
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Decompilazione del pattern medio utilizzato nei video più popolari (<strong>conteggio 100% esclusivo su Shorts e Reel verticali</strong>, escludendo qualsiasi video lungo orizzontale) per ottenere{' '}
                <strong className="text-amber-400">{formatNumber(channel.averageViewsPerShort)} views per Short</strong> con soli{' '}
                <strong className="text-white">{channel.totalShortsUploaded} Shorts caricati</strong>.
              </p>
            </div>
          </div>

          {/* Action buttons: Open on YouTube, Print, Download, Go to Scripts */}
          <div className="flex items-center flex-wrap gap-2.5">
            <a
              href={channelShortsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md transition"
              title="Apri direttamente la sezione Shorts di questo canale su YouTube"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>Apri Canale su YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>

            <button
              onClick={onPrint}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
              title="Stampa subito o salva come file PDF"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Stampa / Salva PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
              title="Scarica dossier completo in formato Markdown"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Scarica .MD</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
              title="Scarica dati strutturati in JSON"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Scarica JSON</span>
            </button>

            <button
              onClick={() => onGoToScriptGenerator(channel)}
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Genera Script</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick stats ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-800">
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">Media Views / Short</span>
            <span className="text-xl font-bold text-white">{formatNumber(channel.averageViewsPerShort)}</span>
            <span className="text-[10px] text-emerald-400 block font-mono mt-0.5">Solo video verticali</span>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">Numero Shorts Caricati</span>
            <span className="text-xl font-bold text-red-400">{channel.totalShortsUploaded} Shorts</span>
            <span className="text-[10px] text-slate-500 block font-mono mt-0.5">Esclusi video normali</span>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">Views Totali Solo Shorts</span>
            <span className="text-xl font-bold text-amber-400">{formatNumber(channel.totalShortsViews)}</span>
            <span className="text-[10px] text-amber-400/80 block font-mono mt-0.5">{channel.viewsToSubRatio}x ratio su iscritti</span>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block font-medium">Cash Flow Shorts Stimato</span>
            <span className="text-xl font-bold text-emerald-400">~${formatNumber(channel.estimatedMonthlyShortsIncomeUsd)}/mese</span>
            <span className="text-[10px] text-emerald-400/80 block font-mono mt-0.5">RPM: ${channel.averageRpm}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: VIRAL RETENTION FORMULA */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <Flame className="w-5 h-5 fill-amber-400" />
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
            1. La Formula Matematica di Retention Virale
          </h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800 font-medium">
          {analysis.viralRetentionFormula}
        </p>
      </div>

      {/* SECTION 2: TIMELINE BLUEPRINT (THE CORE SECOND-BY-SECOND PATTERN) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white">
                2. Blueprint della Timeline Media (Secondo per Secondo)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Il pattern temporale costante con cui questo canale struttura la progressione dell'attenzione.
            </p>
          </div>

          {/* Visual Retention Bar */}
          <div className="flex items-center space-x-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>APV Algoritmo Target: <strong className="text-emerald-400">&gt;118%</strong></span>
          </div>
        </div>

        <div className="space-y-4">
          {analysis.timelineBlueprint.map((segment, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all relative overflow-hidden"
            >
              {/* Left edge indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  index === 0
                    ? 'bg-red-500'
                    : index === 1
                    ? 'bg-amber-500'
                    : index === 2
                    ? 'bg-blue-500'
                    : index === 3
                    ? 'bg-purple-500'
                    : 'bg-emerald-500'
                }`}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded-lg shadow-sm">
                    {segment.timeframe}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base">{segment.phaseName}</h3>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-900/50 self-start md:self-auto">
                  {segment.retentionImpact}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    🎥 Azione Visiva &amp; Pacing:
                  </span>
                  <p className="text-slate-300">{segment.visualDirection}</p>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-amber-400" />
                    Audio &amp; Sound FX:
                  </span>
                  <p className="text-slate-300">{segment.audioSfx}</p>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-red-400" />
                    Trigger Psicologico:
                  </span>
                  <p className="text-slate-300">{segment.psychologicalTrigger}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3 & 4: HOOK ARCHITECTURE & EDITING RULES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hook Blueprint */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 text-red-400 mb-4">
            <Zap className="w-5 h-5 fill-red-400" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
              3. Architettura del Gancio (0 - 3 Secondi)
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Cosa accade nel primo secondo:</span>
              <p className="text-slate-200 leading-relaxed">{analysis.hookBlueprint.first3SecondsStructure}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-2">Archetipi di Gancio Principali:</span>
              <ul className="space-y-1.5">
                {analysis.hookBlueprint.hookArchetypes.map((arch, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-950/30 p-3.5 rounded-xl border border-red-900/40">
              <span className="text-[11px] font-bold text-red-400 block mb-1">Esempio Reale del Canale:</span>
              <p className="text-slate-200 italic font-medium">"{analysis.hookBlueprint.topPerformingHookExample}"</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Sound Effect di Rottura Schema:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {analysis.hookBlueprint.soundEffectCues.map((sfx, i) => (
                  <span key={i} className="bg-slate-800 text-amber-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-700">
                    🔊 {sfx}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pacing & Editing Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 text-blue-400 mb-4">
            <Layers className="w-5 h-5" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
              4. Specifiche di Editing &amp; Pacing
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Frequenza dei Tagli:</span>
                <span className="text-slate-200 font-semibold">{analysis.pacingAndEditingRules.averageCutInterval}</span>
              </div>
              <span className="text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded text-[10px] font-mono">Jump Cuts</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Stile dei Sottotitoli (Karaoke Dynamics):</span>
              <p className="text-slate-300">{analysis.pacingAndEditingRules.subtitlesStyle}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Distribuzione B-Roll / Grafiche:</span>
              <p className="text-slate-300">{analysis.pacingAndEditingRules.bRollRatio}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Sound Design &amp; Colonna Sonora:</span>
              <p className="text-slate-300">{analysis.pacingAndEditingRules.soundDesignNotes}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Safe Zone Formato 9:16:</span>
              <p className="text-slate-300">{analysis.pacingAndEditingRules.aspectRatioPointers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5 & 6: MONETIZATION ROADMAP & ALGORITHMIC LEVERAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monetization Roadmap */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 text-emerald-400 mb-4">
            <DollarSign className="w-5 h-5" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
              5. Strategia per Fare Soldi (Monetizzazione Diretta)
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-3.5 rounded-xl">
              <span className="text-[11px] font-bold text-emerald-300 block mb-1">Entrate Mensili Reali Stimate:</span>
              <div className="text-xl font-black text-emerald-400">
                {analysis.monetizationRoadmap.estimatedMonthlyRevenueRange}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">RPM &amp; Fondo Shorts:</span>
              <p className="text-slate-300">{analysis.monetizationRoadmap.adSenseRpmNotes}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-2">Prodotti Affiliati &amp; Infoprodotti Consigliati:</span>
              <ul className="space-y-1.5">
                {analysis.monetizationRoadmap.bestAffiliateDigitalProducts.map((prod, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{prod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Potenziale Sponsorizzazioni Brand:</span>
              <p className="text-slate-300">{analysis.monetizationRoadmap.sponsorshipPotential}</p>
            </div>
          </div>
        </div>

        {/* Algorithmic Leverage */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 text-purple-400 mb-4">
            <BarChart3 className="w-5 h-5" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
              6. Leva Algoritmica per YouTube Shorts &amp; TikTok
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Target % Visualizzata (APV):</span>
              <span className="text-base font-bold text-emerald-400">
                {analysis.algorithmicLeverage.expectedAveragePercentageViewed}
              </span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Come Evita lo Swipe-Away nei Primi 2s:</span>
              <p className="text-slate-300">{analysis.algorithmicLeverage.swipeAwayPreventionMechanism}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Esecuzione del Loop Infinito:</span>
              <p className="text-slate-300">{analysis.algorithmicLeverage.loopHookExecution}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Trigger di Coinvolgimento nei Commenti:</span>
              <p className="text-slate-300">{analysis.algorithmicLeverage.commentsEngagementTrigger}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 7: REPLICATION PLAYBOOK */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-400 mb-4">
          <CheckCircle2 className="w-5 h-5" />
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
            7. Playbook Tattico di Replicazione (Inizia Subito)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {analysis.replicationPlaybook.map((step, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center mb-2 shadow-sm">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{step}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Vuoi creare contenuti identici o migliorati per una nuova nicchia?
          </div>
          <button
            onClick={() => onGoToScriptGenerator(channel)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Genera Script Basati su Questa Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
