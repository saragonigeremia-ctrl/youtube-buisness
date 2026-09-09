import React from 'react';
import { Flame, Sparkles, TrendingUp, DollarSign, Printer, Youtube, Video } from 'lucide-react';

interface HeaderProps {
  activeTab: 'channels' | 'analysis' | 'scripts' | 'niches';
  setActiveTab: (tab: 'channels' | 'analysis' | 'scripts' | 'niches') => void;
  selectedChannelName?: string;
  hasAnalysis: boolean;
  onPrint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedChannelName,
  hasAnalysis,
  onPrint
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('channels')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-md">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">Shorts<span className="text-red-500">Cash</span> Blueprint</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Algorithm 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Trova canali ad alta media views/video, clona il pattern di timeline e lancia il tuo business
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center space-x-1.5 ${
                activeTab === 'channels'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Canali & Filtri</span>
            </button>

            <button
              onClick={() => {
                if (hasAnalysis) setActiveTab('analysis');
              }}
              disabled={!hasAnalysis}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center space-x-1.5 ${
                activeTab === 'analysis'
                  ? 'bg-red-600 text-white shadow-sm'
                  : hasAnalysis
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title={!hasAnalysis ? 'Seleziona prima un canale da analizzare' : 'Vedi analisi pattern virale'}
            >
              <Flame className="w-4 h-4" />
              <span>Analisi Pattern</span>
              {selectedChannelName && (
                <span className="hidden md:inline-block max-w-[120px] truncate text-slate-300 text-xs font-normal">
                  ({selectedChannelName})
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('scripts')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center space-x-1.5 ${
                activeTab === 'scripts'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Generatore Script</span>
            </button>

            <button
              onClick={() => setActiveTab('niches')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center space-x-1.5 ${
                activeTab === 'niches'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Idee Nicchie</span>
            </button>

            {hasAnalysis && onPrint && (
              <button
                onClick={onPrint}
                className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Stampa o salva in PDF l'analisi del canale selezionato"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Stampa Report</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
