import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Sparkles, Filter, X, ArrowUpDown } from 'lucide-react';

interface ChannelFiltersProps {
  search: string;
  setSearch: (s: string) => void;
  selectedNiche: string;
  setSelectedNiche: (n: string) => void;
  minAvgViews: number;
  setMinAvgViews: (v: number) => void;
  maxUploads: number;
  setMaxUploads: (u: number) => void;
  sortBy: string;
  setSortBy: (sb: string) => void;
  availableNiches: string[];
  totalChannels: number;
  onAddCustomChannel: (handle: string, niche: string) => void;
}

export const ChannelFilters: React.FC<ChannelFiltersProps> = ({
  search,
  setSearch,
  selectedNiche,
  setSelectedNiche,
  minAvgViews,
  setMinAvgViews,
  maxUploads,
  setMaxUploads,
  sortBy,
  setSortBy,
  availableNiches,
  totalChannels,
  onAddCustomChannel
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customHandle, setCustomHandle] = useState('');
  const [customNiche, setCustomNiche] = useState('Finanza & Guadagni');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHandle.trim()) return;
    onAddCustomChannel(customHandle.trim(), customNiche);
    setCustomHandle('');
    setShowAddModal(false);
  };

  const hasActiveFilters = search || selectedNiche !== 'all' || minAvgViews > 0 || maxUploads > 0 || sortBy !== 'efficiency';

  const resetFilters = () => {
    setSearch('');
    setSelectedNiche('all');
    setMinAvgViews(0);
    setMaxUploads(0);
    setSortBy('efficiency');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-red-500" />
              Filtro Canali ad Alto Rendimento (Solo Shorts &amp; Reel)
            </h2>
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-semibold border border-red-500/30">
              {totalChannels} canali analizzati
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Seleziona i canali che con il <strong className="text-slate-200">minor numero di Shorts caricati</strong> hanno ottenuto la <strong className="text-amber-400">media di views per Short più alta</strong> (conteggio 100% esclusivo su video verticali, video normali lunghi esclusi).
          </p>
        </div>

        {/* Custom channel addition */}
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Qualsiasi Canale YouTube</span>
        </button>
      </div>

      {/* Filter grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Cerca Canale o Parola</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Es. Wealth, Dark, Finanza..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Niche selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nicchia / Categoria</label>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="all">Tutte le Nicchie</option>
            {availableNiches.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Minimum Average Views per Video */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Media Minima Views/Video</span>
            {minAvgViews > 0 && <span className="text-amber-400 font-bold">&gt;{(minAvgViews / 1000000).toFixed(1)}M</span>}
          </label>
          <select
            value={minAvgViews}
            onChange={(e) => setMinAvgViews(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="0">Tutte le medie</option>
            <option value="1000000">&gt; 1.000.000 views / video</option>
            <option value="2000000">&gt; 2.000.000 views / video 🔥</option>
            <option value="3000000">&gt; 3.000.000 views / video 🚀</option>
          </select>
        </div>

        {/* Uploads limit */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Massimo Video Caricati</span>
            {maxUploads > 0 && <span className="text-red-400 font-bold">&le;{maxUploads}</span>}
          </label>
          <select
            value={maxUploads}
            onChange={(e) => setMaxUploads(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="0">Qualsiasi volume</option>
            <option value="30">Massimo 30 video (Ultra efficienti)</option>
            <option value="50">Massimo 50 video (Crescita lampo)</option>
            <option value="100">Massimo 100 video</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Ordina Per</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-amber-300 font-medium focus:outline-none focus:border-red-500"
          >
            <option value="efficiency">🏆 Media Views/Video (Decrescente)</option>
            <option value="fewestUploads">⚡ Meno Video Caricati</option>
            <option value="viewsToSub">🔥 Rapporto Views / Iscritti</option>
            <option value="revenue">💰 Reddito Mensile Stimato</option>
            <option value="subscribers">👥 Iscritti Totali</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filtri attivi: mostrati i canali con il rapporto di conversione e views per Shorts più ottimizzato.</span>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 underline underline-offset-2"
          >
            <X className="w-3.5 h-3.5" />
            <span>Azzera filtri</span>
          </button>
        </div>
      )}

      {/* Add Custom Channel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-red-500" />
              Aggiungi Canale YouTube per Analisi
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Inserisci l'handle del canale YouTube (es. <span className="text-amber-400">@MrBeastShorts</span>, <span className="text-amber-400">@FinanzaSvelata</span>) per calcolare la media views per video e decompilarne il pattern.
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Handle o Nome Canale</label>
                <input
                  type="text"
                  required
                  value={customHandle}
                  onChange={(e) => setCustomHandle(e.target.value)}
                  placeholder="Es. @ViralFactsHub o Nome Canale"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nicchia di Riferimento</label>
                <select
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Finanza & Guadagni">Finanza & Guadagni Online</option>
                  <option value="Psicologia & Persuasione">Psicologia & Persuasione</option>
                  <option value="AI & Automazioni">AI & Automazioni Tech</option>
                  <option value="Misteri & Curiosità">Misteri, Crimini & Curiosità</option>
                  <option value="Salute & Biohacking">Salute & Biohacking</option>
                  <option value="Business & Brand">Business & Casi Studio</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-800"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-red-600 hover:bg-red-500 shadow-sm"
                >
                  Aggiungi &amp; Analizza
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
