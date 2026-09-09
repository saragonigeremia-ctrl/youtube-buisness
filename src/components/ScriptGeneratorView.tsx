import React, { useState } from 'react';
import { GeneratedScript, YouTubeChannel } from '../types';
import {
  Sparkles,
  Video,
  Copy,
  Check,
  Download,
  Share2,
  Sliders,
  Clock,
  Volume2,
  Eye,
  FileText,
  Flame,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface ScriptGeneratorViewProps {
  selectedChannel?: YouTubeChannel;
  scripts: GeneratedScript[];
  isGenerating: boolean;
  onGenerateScripts: (config: {
    niche: string;
    topic: string;
    targetPlatform: string;
    targetDurationSeconds: number;
    targetAudience: string;
    customInstructions: string;
  }) => Promise<void>;
  prefilledNiche?: string;
}

export const ScriptGeneratorView: React.FC<ScriptGeneratorViewProps> = ({
  selectedChannel,
  scripts,
  isGenerating,
  onGenerateScripts,
  prefilledNiche
}) => {
  const [niche, setNiche] = useState(prefilledNiche || selectedChannel?.niche || 'Finanza & Guadagni Online');
  const [topic, setTopic] = useState('Come monetizzare un canale faceless in 30 giorni partendo da zero');
  const [platform, setPlatform] = useState('YouTube Shorts');
  const [duration, setDuration] = useState(35);
  const [audience, setAudience] = useState('Persone ambiziose e creator che vogliono fare soldi con video verticali');
  const [customInstructions, setCustomInstructions] = useState('Includi chiusura in loop infinito seamless e gancio basato su un errore quotidiano.');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeHookIndex, setActiveHookIndex] = useState<{ [scriptId: string]: number }>({});

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateScripts({
      niche,
      topic,
      targetPlatform: platform,
      targetDurationSeconds: duration,
      targetAudience: audience,
      customInstructions
    });
  };

  const copyScriptText = (script: GeneratedScript) => {
    const formatted = `
TITOLO: ${script.title}
PIATTAFORMA: ${script.targetPlatform} | DURATA: ${script.targetDurationSeconds}s | NICCHIA: ${script.niche}
POTENZIALE VIRALE STIMATO: ${script.estimatedViralPotential}/100

ALTERNATIVE DI GANCIO (0-3s):
1. ${script.hookOptions[0]}
2. ${script.hookOptions[1]}
3. ${script.hookOptions[2]}

--- TIMELINE SECONDO PER SECONDO ---
${script.timelineScenes.map(scene => `
[${scene.timestamp}] ${scene.sceneLabel}
• VISIVO: ${scene.visualAction}
• VOCE (VOICEOVER): "${scene.spokenVoiceover}"
• TESTO A SCHERMO: ${scene.onScreenCaptions}
• SFX & AUDIO: ${scene.audioSfxNotes}
• TRUCCO RETENTION: ${scene.retentionTrapTip}
`).join('\n')}

--- MIGLIORAMENTI STRATEGICI RISPETTO AI COMPETITOR ---
${script.strategicImprovementsOverOriginal.map(imp => `• ${imp}`).join('\n')}

COMMENTO FISSATO (CTA MONETIZZAZIONE):
${script.pinnedCommentCta}

MUSICA CONSIGLIATA: ${script.recommendedSoundtrackVibe}
HASHTAG: ${script.recommendedHashtags.join(' ')}
    `.trim();

    navigator.clipboard.writeText(formatted);
    setCopiedId(script.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const downloadScriptTxt = (script: GeneratedScript) => {
    const formatted = `
TITOLO: ${script.title}
PIATTAFORMA: ${script.targetPlatform} | DURATA: ${script.targetDurationSeconds}s | NICCHIA: ${script.niche}

--- TIMELINE SECONDO PER SECONDO ---
${script.timelineScenes.map(scene => `
[${scene.timestamp}] ${scene.sceneLabel}
VISIVO: ${scene.visualAction}
VOICEOVER: ${scene.spokenVoiceover}
SOTTOTITOLI: ${scene.onScreenCaptions}
SFX: ${scene.audioSfxNotes}
TRAP RETENTION: ${scene.retentionTrapTip}
`).join('\n')}

COMMENTO FISSATO: ${script.pinnedCommentCta}
HASHTAG: ${script.recommendedHashtags.join(' ')}
    `.trim();

    const blob = new Blob([formatted], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Script_${script.title.slice(0, 25).replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Generator Configuration Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm no-print">
        <div className="flex items-center space-x-2 text-red-500 mb-2">
          <Sparkles className="w-5 h-5" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            Generatore di Script Virali Basati sul Pattern di Timeline
          </h1>
        </div>
        <p className="text-sm text-slate-400 max-w-3xl mb-5">
          Genera script completi strutturati secondo per secondo per YouTube Shorts, TikTok e Instagram Reels.
          Lo script clona la progressione matematica dell'attenzione e include miglioramenti specifici per battere l'algoritmo del 2026.
        </p>

        {selectedChannel && (
          <div className="bg-slate-950 border border-red-900/40 rounded-xl p-3 mb-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={selectedChannel.avatarUrl}
                alt={selectedChannel.name}
                className="w-9 h-9 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <span className="text-slate-400">Pattern clonato da:</span>{' '}
                <strong className="text-white">{selectedChannel.name}</strong> ({selectedChannel.averageViewsPerShort.toLocaleString()} media views/video)
              </div>
            </div>
            <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md font-medium border border-amber-800/40">
              {selectedChannel.dominantPacing}
            </span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nicchia</label>
              <input
                type="text"
                required
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Es. Finanza, Psicologia, AI, Longevità..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Piattaforma Principale</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="TikTok">TikTok (Creator Rewards)</option>
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="Omni-Platform">Omni-Platform (Shorts + TikTok + Reels)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Durata Target</span>
                <span className="text-amber-400 font-bold">{duration} secondi</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="30">30 secondi (Massima % di Completamento &gt;120%)</option>
                <option value="35">35 secondi (Ottimale per monetizzazione)</option>
                <option value="45">45 secondi (Storytelling &amp; Curiosità profonda)</option>
                <option value="60">60 secondi (Idoneo per TikTok Creator Rewards)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Argomento / Angolo Specifico del Video</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Es. Il trucco con Google Maps per fare 100€ al giorno senza budget"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pubblico di Riferimento</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Es. Giovani ambiziosi, studenti, professionisti..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Istruzioni Extra o Angolo Desiderato</label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Es. Tono misterioso, svela un trucco nel secondo 20, loop circolare..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'Generazione Script & Timeline in corso...' : 'Genera Script Ottimizzati'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Scripts List */}
      <div className="space-y-6">
        {scripts.map((script, scriptIdx) => {
          const activeHook = activeHookIndex[script.id] || 0;

          return (
            <div
              key={script.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden"
            >
              {/* Top Accent */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                      Script #{scriptIdx + 1}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded border border-slate-700">
                      {script.targetPlatform}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      ⏱ {script.targetDurationSeconds}s
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {script.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <div className="text-right mr-2 hidden sm:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Viral Potential</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">
                      {script.estimatedViralPotential}/100
                    </span>
                  </div>

                  <button
                    onClick={() => copyScriptText(script)}
                    className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
                    title="Copia l'intero copione formattato negli appunti"
                  >
                    {copiedId === script.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiato!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copia Tutto</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadScriptTxt(script)}
                    className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
                    title="Scarica file di testo"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>.TXT</span>
                  </button>
                </div>
              </div>

              {/* HOOK VARIATIONS (A/B TESTING) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    Alternative di Gancio per i Primi 3 Secondi (A/B Test):
                  </span>
                  <span className="text-[11px] text-slate-400">Seleziona per testare:</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {script.hookOptions.map((hook, hIdx) => (
                    <button
                      key={hIdx}
                      type="button"
                      onClick={() => setActiveHookIndex({ ...activeHookIndex, [script.id]: hIdx })}
                      className={`text-left p-2.5 rounded-lg text-xs border transition-all ${
                        activeHook === hIdx
                          ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Opzione {hIdx + 1}:
                      </span>
                      "{hook}"
                    </button>
                  ))}
                </div>
              </div>

              {/* TIMELINE SCENES (SECOND-BY-SECOND BREAKDOWN) */}
              <div className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  Timeline di Registrazione &amp; Montaggio:
                </h3>

                <div className="space-y-3">
                  {script.timelineScenes.map((scene, scIdx) => (
                    <div
                      key={scIdx}
                      className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2.5">
                          <span className="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">
                            {scene.timestamp}
                          </span>
                          <span className="font-bold text-white text-xs sm:text-sm">
                            {scene.sceneLabel}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded font-mono">
                          🎯 {scene.retentionTrapTip}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3 pt-2 border-t border-slate-800/60">
                        {/* Spoken Voiceover & Captions */}
                        <div className="space-y-2">
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              🗣 Testo Parlato (Voiceover):
                            </span>
                            <p className="text-slate-100 font-medium leading-relaxed">
                              "{scene.spokenVoiceover}"
                            </p>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                              🔤 Didascalia a Schermo (Kinetic Text):
                            </span>
                            <p className="text-amber-200 font-bold">
                              {scene.onScreenCaptions}
                            </p>
                          </div>
                        </div>

                        {/* Visual & Audio Direction */}
                        <div className="space-y-2">
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1">
                              <Eye className="w-3 h-3 text-cyan-400" />
                              Azione Visiva (Cosa mostrare):
                            </span>
                            <p className="text-slate-300 leading-relaxed">
                              {scene.visualAction}
                            </p>
                          </div>

                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1">
                              <Volume2 className="w-3 h-3 text-red-400" />
                              Audio &amp; Effetti Sonori (SFX):
                            </span>
                            <p className="text-slate-300">
                              {scene.audioSfxNotes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STRATEGIC IMPROVEMENTS OVER ORIGINAL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-800">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-2 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Miglioramenti per Battere i Competitor:
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {script.strategicImprovementsOverOriginal.map((imp, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 block mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Commento Fissato per Monetizzare (CTA):
                    </span>
                    <p className="text-slate-200 italic bg-slate-900 p-2 rounded-lg border border-slate-800">
                      "{script.pinnedCommentCta}"
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {script.recommendedHashtags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
