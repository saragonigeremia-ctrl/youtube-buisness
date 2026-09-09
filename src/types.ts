export interface YouTubeShort {
  id: string;
  title: string;
  views: number;
  likes: number;
  durationSeconds: number;
  retentionRatePct: number;
  hookText: string;
  viralFactor: string;
  estimatedEarningsUsd: number;
  publishedDaysAgo: number;
  loopType: 'seamless_audio' | 'sentence_continuation' | 'visual_cycle' | 'cliffhanger';
  youtubeShortUrl?: string;
}

export interface YouTubeChannel {
  id: string;
  name: string;
  handle: string;
  youtubeUrl: string; // Direct link to https://www.youtube.com/@handle/shorts
  avatarUrl: string;
  bannerColor: string;
  niche: string;
  language: string;
  totalSubscribers: number;
  totalShortsUploaded: number; // Exclusively Shorts / Reels uploaded
  totalShortsViews: number; // Exclusively Shorts / Reels views (long videos excluded)
  averageViewsPerShort: number; // The key metric: Total Shorts Views / Shorts Uploads
  viewsToSubRatio: number; // Average Views / Subscribers
  efficiencyScore: number; // 0 to 100 benchmark score
  estimatedMonthlyShortsIncomeUsd: number;
  averageRpm: number; // $ per 1000 views
  dominantPacing: 'Hyper-Fast (0.8s cuts)' | 'Narrative Arc (1.5s cuts)' | 'Curiosity Hook (1.2s cuts)' | 'Contrarian Debate (1.0s cuts)';
  keySuccessSecret: string;
  popularShorts: YouTubeShort[];
}

export interface TimelineSegment {
  timeframe: string; // e.g., "00:00 - 00:03"
  phaseName: string; // e.g., "The Pattern-Interrupt Hook"
  goal: string;
  visualDirection: string;
  audioSfx: string;
  psychologicalTrigger: string;
  retentionImpact: string;
}

export interface ChannelPatternAnalysis {
  channelId: string;
  channelName: string;
  analysisDate: string;
  overallEfficiencyScore: number;
  viralRetentionFormula: string;
  hookBlueprint: {
    first3SecondsStructure: string;
    hookArchetypes: string[];
    topPerformingHookExample: string;
    soundEffectCues: string[];
  };
  timelineBlueprint: TimelineSegment[];
  pacingAndEditingRules: {
    averageCutInterval: string;
    subtitlesStyle: string;
    bRollRatio: string;
    soundDesignNotes: string;
    aspectRatioPointers: string;
  };
  algorithmicLeverage: {
    expectedAveragePercentageViewed: string;
    swipeAwayPreventionMechanism: string;
    loopHookExecution: string;
    commentsEngagementTrigger: string;
  };
  monetizationRoadmap: {
    estimatedMonthlyRevenueRange: string;
    adSenseRpmNotes: string;
    bestAffiliateDigitalProducts: string[];
    sponsorshipPotential: string;
  };
  replicationPlaybook: string[];
}

export interface GeneratedScript {
  id: string;
  title: string;
  niche: string;
  targetPlatform: 'YouTube Shorts' | 'TikTok' | 'Instagram Reels' | 'Omni-Platform';
  targetDurationSeconds: number;
  hookOptions: string[];
  timelineScenes: {
    timestamp: string;
    sceneLabel: string;
    visualAction: string;
    spokenVoiceover: string;
    onScreenCaptions: string;
    audioSfxNotes: string;
    retentionTrapTip: string;
  }[];
  strategicImprovementsOverOriginal: string[];
  pinnedCommentCta: string;
  recommendedSoundtrackVibe: string;
  recommendedHashtags: string[];
  estimatedViralPotential: number; // 1-100
}

export interface NicheIdea {
  id: string;
  name: string;
  tagline: string;
  avgRpmUsd: number;
  competitionLevel: 'Low' | 'Medium' | 'High';
  viralityPotential: 'Very High' | 'High' | 'Medium';
  monetizationRoutes: string[];
  sampleHook: string;
  recommendedFacelessTools: string[];
}
