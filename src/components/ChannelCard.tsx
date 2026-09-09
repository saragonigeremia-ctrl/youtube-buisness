import React from 'react';
import { YouTubeChannel } from '../types';
import { Play, TrendingUp, Users, Video, DollarSign, Sparkles, ChevronRight, Zap, ExternalLink } from 'lucide-react';

interface ChannelCardProps {
  channel: YouTubeChannel;
  onSelectChannel: (channel: YouTubeChannel) => void;
  onDirectScript: (channel: YouTubeChannel) => void;
  isSelected: boolean;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  onSelectChannel,
  onDirectScript,
  isSelected
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const channelShortsUrl = channel.youtubeUrl || `https://www.youtube.com/${channel.handle.startsWith('@') ? channel.handle : '@' + channel.handle}/shorts`;

  return (
    <div
      className={`bg-slate-900 border rounded-2xl p-5 transition-all relative overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-red-500 shadow-md ring-1 ring-red-500'
          : 'border-slate-800 hover:border-slate-700 shadow-sm'
      }`}
    >
      {/* Top banner accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${channel.bannerColor}`} />

      <div>
        {/* Channel Header Info */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={channel.avatarUrl}
              alt={channel.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base leading-snug">{channel.name}</h3>
                <span className="bg-emerald-500/10 text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                  {channel.efficiencyScore}/100 Score
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                <span>{channel.handle}</span>
                <span>•</span>
                <span className="text-slate-300 font-medium">{channel.niche}</span>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-1">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              <DollarSign className="w-3 h-3 mr-0.5" />
              ~${formatNumber(channel.estimatedMonthlyShortsIncomeUsd)}/mo
            </span>

            {/* Direct button to open YouTube Channel Shorts tab */}
            <a
              href={channelShortsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[11px] font-medium text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 px-2 py-0.5 rounded transition"
              title="Apri direttamente il canale su YouTube (sezione Shorts)"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
              <span>YouTube Shorts</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        {/* PRIMARY EFFICIENCY METRIC (Views per video ratio - ONLY SHORTS/REELS) */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>Rendimento Solo Shorts / Reel</span>
              <span className="text-[10px] bg-red-950/80 text-red-400 px-1.5 py-0.2 rounded border border-red-900/40 font-mono">
                No Video Lunghi
              </span>
            </span>
            <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-400" />
              Alta Efficienza
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black text-white tracking-tight">
              {formatNumber(channel.averageViewsPerShort)}{' '}
              <span className="text-xs font-normal text-slate-400">media views / Short</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-red-400 bg-red-950/40 px-2 py-1 rounded">
                Solo {channel.totalShortsUploaded} Shorts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <div>
              <span className="block text-[10px] text-slate-500">Iscritti Totali</span>
              <span className="font-semibold text-slate-200">{formatNumber(channel.totalSubscribers)}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500">Views Totali Shorts</span>
              <span className="font-semibold text-slate-200">{formatNumber(channel.totalShortsViews)}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500">Ratio Views/Sub</span>
              <span className="font-semibold text-amber-400">{channel.viewsToSubRatio}x</span>
            </div>
          </div>
        </div>

        {/* Key Success Secret snippet */}
        <div className="text-xs text-slate-300 bg-slate-800/40 rounded-lg p-2.5 mb-4 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Pattern Chiave:</span>
          <p className="line-clamp-2 italic text-slate-300">"{channel.keySuccessSecret}"</p>
        </div>

        {/* Top 2 Shorts Snapshot */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-slate-400 block mb-2">Shorts Più Popolari di Questo Canale:</span>
          <div className="space-y-1.5">
            {channel.popularShorts.slice(0, 2).map((sh) => (
              <div
                key={sh.id}
                className="flex items-center justify-between text-xs bg-slate-950/70 hover:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800/60"
              >
                <div className="flex items-center space-x-2 truncate mr-2">
                  <Play className="w-3 h-3 text-red-500 shrink-0 fill-red-500" />
                  <span className="text-slate-300 truncate font-medium">{sh.title}</span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-white font-bold">{formatNumber(sh.views)}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1 py-0.5 rounded font-mono">
                    {sh.retentionRatePct}% ret.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => onSelectChannel(channel)}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <span>Analizza Pattern Virale</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onDirectScript(channel)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1 border border-slate-700"
          title="Genera subito script clonando questo pattern di timeline"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Script</span>
        </button>
      </div>
    </div>
  );
};
