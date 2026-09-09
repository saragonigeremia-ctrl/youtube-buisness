import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChannelFilters } from './components/ChannelFilters';
import { ChannelCard } from './components/ChannelCard';
import { PatternAnalysisView } from './components/PatternAnalysisView';
import { ScriptGeneratorView } from './components/ScriptGeneratorView';
import { NicheLaunchpad } from './components/NicheLaunchpad';
import { PrintDossier } from './components/PrintDossier';
import { YouTubeChannel, ChannelPatternAnalysis, GeneratedScript, NicheIdea } from './types';
import { INITIAL_CHANNELS, INITIAL_NICHES } from './data/mockChannels';
import { Flame, Sparkles, TrendingUp, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'channels' | 'analysis' | 'scripts' | 'niches'>('channels');
  const [channels, setChannels] = useState<YouTubeChannel[]>(INITIAL_CHANNELS);
  const [selectedChannel, setSelectedChannel] = useState<YouTubeChannel | null>(INITIAL_CHANNELS[0]);
  const [analysis, setAnalysis] = useState<ChannelPatternAnalysis | null>(null);
  const [scripts, setScripts] = useState<GeneratedScript[]>([]);
  const [niches, setNiches] = useState<NicheIdea[]>(INITIAL_NICHES);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [minAvgViews, setMinAvgViews] = useState(0);
  const [maxUploads, setMaxUploads] = useState(0);
  const [sortBy, setSortBy] = useState('efficiency');

  // Loading states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingScripts, setIsGeneratingScripts] = useState(false);
  const [isGeneratingNiches, setIsGeneratingNiches] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [prefilledNiche, setPrefilledNiche] = useState<string | undefined>(undefined);

  // Fetch channels from server or filter locally
  const fetchChannels = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedNiche !== 'all') params.append('niche', selectedNiche);
      if (minAvgViews > 0) params.append('minAvgViews', minAvgViews.toString());
      if (maxUploads > 0) params.append('maxUploads', maxUploads.toString());
      if (sortBy) params.append('sortBy', sortBy);

      const res = await fetch(`/api/channels?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.channels) {
          setChannels(data.channels);
        }
      }
    } catch (e) {
      console.warn('Backend fetch channels fallback to local filter');
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [search, selectedNiche, minAvgViews, maxUploads, sortBy]);

  // Initial analysis on load for the top channel
  useEffect(() => {
    if (INITIAL_CHANNELS[0] && !analysis) {
      handleAnalyzeChannel(INITIAL_CHANNELS[0], false);
    }
  }, []);

  const handleAnalyzeChannel = async (channel: YouTubeChannel, switchTab: boolean = true) => {
    setSelectedChannel(channel);
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/analyze-channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId: channel.id })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.analysis) {
          setAnalysis(data.analysis);
          if (switchTab) {
            setActiveTab('analysis');
          }
        } else {
          throw new Error(data.error || 'Errore durante l\'analisi del pattern');
        }
      } else {
        throw new Error('Impossibile contattare il server di analisi');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Errore di connessione');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDirectScript = (channel: YouTubeChannel) => {
    setSelectedChannel(channel);
    setPrefilledNiche(channel.niche);
    setActiveTab('scripts');
    if (scripts.length === 0) {
      handleGenerateScripts({
        niche: channel.niche,
        topic: `Come monetizzare nella nicchia ${channel.niche} con il pattern di ${channel.name}`,
        targetPlatform: 'YouTube Shorts',
        targetDurationSeconds: 35,
        targetAudience: 'Spettatori appassionati di contenuti verticali ad alto ritmo',
        customInstructions: `Replica il ritmo serrato di ${channel.name} con un gancio basato su un segreto quotidiano.`
      });
    }
  };

  const handleAddCustomChannel = async (handle: string, nicheInput: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/custom-channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, niche: nicheInput })
      });

      const data = await res.json();
      if (data.success && data.channel) {
        setChannels(prev => [data.channel, ...prev]);
        await handleAnalyzeChannel(data.channel, true);
      } else {
        throw new Error(data.error || 'Impossibile aggiungere il canale');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
      setIsAnalyzing(false);
    }
  };

  const handleSelectNicheForScript = (nicheObj: NicheIdea) => {
    setPrefilledNiche(nicheObj.name);
    setActiveTab('scripts');
    handleGenerateScripts({
      niche: nicheObj.name,
      topic: nicheObj.sampleHook,
      targetPlatform: 'YouTube Shorts',
      targetDurationSeconds: 35,
      targetAudience: 'Pubblico interessato a ' + nicheObj.name,
      customInstructions: `Usa un gancio irresistibile con chiusura circolare a loop.`
    });
  };

  const handleGenerateCustomNiches = async (interests: string) => {
    setIsGeneratingNiches(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/suggest-niches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInterests: interests })
      });

      const data = await res.json();
      if (data.success && data.niches) {
        setNiches(data.niches);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsGeneratingNiches(false);
    }
  };

  const handleGenerateScripts = async (config: {
    niche: string;
    topic: string;
    targetPlatform: string;
    targetDurationSeconds: number;
    targetAudience: string;
    customInstructions: string;
  }) => {
    setIsGeneratingScripts(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: selectedChannel?.id,
          ...config
        })
      });

      const data = await res.json();
      if (data.success && data.scripts) {
        setScripts(data.scripts);
      } else {
        throw new Error(data.error || 'Errore nella generazione dello script');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setIsGeneratingScripts(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const availableNichesList = Array.from(new Set(INITIAL_CHANNELS.map(c => c.niche)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedChannelName={selectedChannel?.name}
        hasAnalysis={!!analysis}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="bg-red-950/80 border border-red-800 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-red-400 hover:text-white underline"
            >
              Chiudi
            </button>
          </div>
        )}

        {/* TAB 1: CHANNELS & FILTERS */}
        {activeTab === 'channels' && (
          <div>
            <ChannelFilters
              search={search}
              setSearch={setSearch}
              selectedNiche={selectedNiche}
              setSelectedNiche={setSelectedNiche}
              minAvgViews={minAvgViews}
              setMinAvgViews={setMinAvgViews}
              maxUploads={maxUploads}
              setMaxUploads={setMaxUploads}
              sortBy={sortBy}
              setSortBy={setSortBy}
              availableNiches={availableNichesList}
              totalChannels={channels.length}
              onAddCustomChannel={handleAddCustomChannel}
            />

            {/* Channels Grid */}
            {isAnalyzing && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center my-6 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                <p className="text-sm font-semibold text-white">
                  Decompilazione del pattern virale e calcolo della timeline in corso...
                </p>
                <p className="text-xs text-slate-400">
                  Analisi delle metriche di retention, loop seamless e formula algoritmica.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  onSelectChannel={(ch) => handleAnalyzeChannel(ch, true)}
                  onDirectScript={handleDirectScript}
                  isSelected={selectedChannel?.id === channel.id}
                />
              ))}
            </div>

            {channels.length === 0 && !isAnalyzing && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                <p className="text-base font-semibold text-slate-300">Nessun canale corrisponde ai filtri selezionati</p>
                <p className="text-xs text-slate-500 mt-1">Prova ad azzerare i filtri o ad aggiungere un canale personalizzato con il pulsante in alto.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PATTERN ANALYSIS VIEW */}
        {activeTab === 'analysis' && (
          <div>
            {analysis && selectedChannel ? (
              <PatternAnalysisView
                channel={selectedChannel}
                analysis={analysis}
                isLoading={isAnalyzing}
                onGoToScriptGenerator={handleDirectScript}
                onPrint={handlePrint}
              />
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                <p className="text-sm text-slate-400 mb-4">Nessun canale selezionato per l'analisi del pattern.</p>
                <button
                  onClick={() => setActiveTab('channels')}
                  className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Torna alla lista canali
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SCRIPT GENERATOR VIEW */}
        {activeTab === 'scripts' && (
          <ScriptGeneratorView
            selectedChannel={selectedChannel || undefined}
            scripts={scripts}
            isGenerating={isGeneratingScripts}
            onGenerateScripts={handleGenerateScripts}
            prefilledNiche={prefilledNiche}
          />
        )}

        {/* TAB 4: NICHE LAUNCHPAD */}
        {activeTab === 'niches' && (
          <NicheLaunchpad
            niches={niches}
            onSelectNicheForScript={handleSelectNicheForScript}
            onGenerateCustomNiches={handleGenerateCustomNiches}
            isGenerating={isGeneratingNiches}
          />
        )}
      </main>

      {/* PRINT-ONLY DOSSIER (Visible only during window.print()) */}
      <PrintDossier
        channel={selectedChannel || undefined}
        analysis={analysis || undefined}
      />
    </div>
  );
}
