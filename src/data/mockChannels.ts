import { YouTubeChannel, NicheIdea } from '../types';

export const INITIAL_CHANNELS: YouTubeChannel[] = [
  {
    id: 'ch-wealth-code',
    name: 'Wealth Code Shorts',
    handle: '@WealthCodeVault',
    youtubeUrl: 'https://www.youtube.com/@WealthCodeVault/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-amber-600 to-yellow-500',
    niche: 'Finanza & Guadagni Online',
    language: 'Italian / Global',
    totalSubscribers: 420000,
    totalShortsUploaded: 48, // SOLTANTO Shorts / Reel (esclusi video lunghi)
    totalShortsViews: 142000000, // SOLTANTO Views da Shorts / Reel (video orizzontali esclusi)
    averageViewsPerShort: 2958333, // ~2.95M views/video! Incredibile efficienza calcolata unicamente sui Reel/Shorts
    viewsToSubRatio: 7.04,
    efficiencyScore: 98,
    estimatedMonthlyShortsIncomeUsd: 14200,
    averageRpm: 0.12,
    dominantPacing: 'Hyper-Fast (0.8s cuts)',
    keySuccessSecret: 'Inizia sempre mostrando l\'estratto conto o il bancomat nei primi 1.2 secondi con sound effect "Cha-ching", poi rivela l\'arbitraggio prima che l\'utente realizzi.',
    popularShorts: [
      {
        id: 'sh-wc-1',
        title: 'Il trucco della carta di credito che le banche odiano',
        views: 8900000,
        likes: 720000,
        durationSeconds: 29,
        retentionRatePct: 124,
        hookText: 'Non pagare mai questa tassa bancaria o sei un pazzo...',
        viralFactor: 'Rabbia finanziaria + FOMO immediata',
        estimatedEarningsUsd: 1150,
        publishedDaysAgo: 14,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-wc-2',
        title: 'Come 17enni guadagnano 5000€/mese con Google Maps',
        views: 6400000,
        likes: 540000,
        durationSeconds: 34,
        retentionRatePct: 118,
        hookText: 'Apri Google Maps ora se vuoi 300€ entro stasera...',
        viralFactor: 'Azione immediata riproducibile dallo smartphone',
        estimatedEarningsUsd: 830,
        publishedDaysAgo: 28,
        loopType: 'sentence_continuation',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-wc-3',
        title: 'Perché i milionari non comprano mai case di proprietà',
        views: 4800000,
        likes: 390000,
        durationSeconds: 31,
        retentionRatePct: 112,
        hookText: 'Se compri casa a 25 anni ti sei appena rovinato la vita.',
        viralFactor: 'Opinione contrariana polarizzante',
        estimatedEarningsUsd: 620,
        publishedDaysAgo: 45,
        loopType: 'cliffhanger',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  },
  {
    id: 'ch-dark-psycho',
    name: 'Psiche & Dark Influence',
    handle: '@DarkMindShorts',
    youtubeUrl: 'https://www.youtube.com/@DarkMindShorts/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-purple-900 to-indigo-900',
    niche: 'Psicologia & Persuasione',
    language: 'Italian / Multi',
    totalSubscribers: 310000,
    totalShortsUploaded: 36, // Solo Shorts caricati
    totalShortsViews: 92000000, // Solo Shorts views
    averageViewsPerShort: 2555555,
    viewsToSubRatio: 8.24,
    efficiencyScore: 96,
    estimatedMonthlyShortsIncomeUsd: 9200,
    averageRpm: 0.10,
    dominantPacing: 'Narrative Arc (1.5s cuts)',
    keySuccessSecret: 'Usa frasi in seconda persona ("Se qualcuno ti guarda le labbra...") e musica a 432Hz con riverbero, inducendo un senso di urgenza relazionale.',
    popularShorts: [
      {
        id: 'sh-dp-1',
        title: 'Il segnale del corpo che dice se qualcuno mente al 100%',
        views: 7800000,
        likes: 640000,
        durationSeconds: 38,
        retentionRatePct: 131,
        hookText: 'Guarda bene dove muove gli occhi quando fa questa domanda...',
        viralFactor: 'Paranoia quotidiana + validazione sociale',
        estimatedEarningsUsd: 780,
        publishedDaysAgo: 21,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-dp-2',
        title: 'La tecnica del silenzio di 4 secondi per vincere qualsiasi litigio',
        views: 5200000,
        likes: 410000,
        durationSeconds: 32,
        retentionRatePct: 115,
        hookText: 'Non rispondere mai subito se ti insultano. Fai questo...',
        viralFactor: 'Potere personale immediato',
        estimatedEarningsUsd: 520,
        publishedDaysAgo: 35,
        loopType: 'sentence_continuation',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-dp-3',
        title: '3 frasi per entrare nella testa di chiunque in 60 secondi',
        views: 4300000,
        likes: 380000,
        durationSeconds: 27,
        retentionRatePct: 122,
        hookText: 'Se dici queste 3 parole esatte, ti daranno ragione.',
        viralFactor: 'Scorciatoia mentale irresistibile',
        estimatedEarningsUsd: 430,
        publishedDaysAgo: 60,
        loopType: 'visual_cycle',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  },
  {
    id: 'ch-ai-revolution',
    name: 'AI Automation Vault',
    handle: '@AiMoneyFast',
    youtubeUrl: 'https://www.youtube.com/@AiMoneyFast/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-cyan-600 to-blue-700',
    niche: 'Intelligenza Artificiale & Tech',
    language: 'English / IT Subs',
    totalSubscribers: 580000,
    totalShortsUploaded: 62, // Solo Shorts verticali
    totalShortsViews: 198000000,
    averageViewsPerShort: 3193548,
    viewsToSubRatio: 5.5,
    efficiencyScore: 95,
    estimatedMonthlyShortsIncomeUsd: 23800,
    averageRpm: 0.16,
    dominantPacing: 'Hyper-Fast (0.8s cuts)',
    keySuccessSecret: 'Registrazioni schermo iper-velocizzate con cursori ingranditi e overlay "ChatGPT non vuole che tu veda questo". Conclusione con prompt nei commenti.',
    popularShorts: [
      {
        id: 'sh-ai-1',
        title: '3 AI gratuite che sembrano illegali da quanto sono potenti',
        views: 11200000,
        likes: 950000,
        durationSeconds: 42,
        retentionRatePct: 128,
        hookText: 'Scommetto 100€ che non conosci il sito numero 2...',
        viralFactor: 'Sfida gamificata + valore pratico tech',
        estimatedEarningsUsd: 1792,
        publishedDaysAgo: 10,
        loopType: 'sentence_continuation',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-ai-2',
        title: 'Come creare un libro su Amazon KDP in 12 minuti con DeepSeek',
        views: 7400000,
        likes: 620000,
        durationSeconds: 48,
        retentionRatePct: 114,
        hookText: 'Non fare l\'università prima di aver visto questo prompt.',
        viralFactor: 'Sostituzione lavoro / reddito passivo',
        estimatedEarningsUsd: 1184,
        publishedDaysAgo: 25,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  },
  {
    id: 'ch-mystery-files',
    name: 'Misteri & Documentari Lampo',
    handle: '@DeepMysteryShorts',
    youtubeUrl: 'https://www.youtube.com/@DeepMysteryShorts/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-emerald-900 to-slate-900',
    niche: 'Misteri, Crimini & Curiosità',
    language: 'Italian',
    totalSubscribers: 280000,
    totalShortsUploaded: 29, // Solo 29 Shorts
    totalShortsViews: 68000000,
    averageViewsPerShort: 2344827,
    viewsToSubRatio: 8.37,
    efficiencyScore: 94,
    estimatedMonthlyShortsIncomeUsd: 6800,
    averageRpm: 0.09,
    dominantPacing: 'Curiosity Hook (1.2s cuts)',
    keySuccessSecret: 'Inizia con audio di emergenza o radio della polizia (effetto disturbato) e una foto storica restaurata in 4K con zoom lento inquietante.',
    popularShorts: [
      {
        id: 'sh-mf-1',
        title: 'L\'isola dove chiunque metta piede scompare entro 24 ore',
        views: 8100000,
        likes: 690000,
        durationSeconds: 44,
        retentionRatePct: 135,
        hookText: 'Questo punto su Google Earth è stato censurato per un motivo agghiacciante...',
        viralFactor: 'Curiosità proibita + censura governativa',
        estimatedEarningsUsd: 729,
        publishedDaysAgo: 18,
        loopType: 'cliffhanger',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-mf-2',
        title: 'Il miliardario che ha finto la sua morte ed è stato trovato qui',
        views: 5900000,
        likes: 470000,
        durationSeconds: 39,
        retentionRatePct: 119,
        hookText: 'La bara era vuota. 12 anni dopo un turista fa questa foto...',
        viralFactor: 'Plot twist narrativo con prova fotografica',
        estimatedEarningsUsd: 531,
        publishedDaysAgo: 32,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  },
  {
    id: 'ch-billionaire-moves',
    name: 'Billionaire Strategy Breakdown',
    handle: '@ApexBusinessMoves',
    youtubeUrl: 'https://www.youtube.com/@ApexBusinessMoves/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-slate-800 to-zinc-900',
    niche: 'Business & Casi Studio',
    language: 'Global English / IT',
    totalSubscribers: 690000,
    totalShortsUploaded: 75,
    totalShortsViews: 215000000,
    averageViewsPerShort: 2866666,
    viewsToSubRatio: 4.15,
    efficiencyScore: 91,
    estimatedMonthlyShortsIncomeUsd: 32000,
    averageRpm: 0.18,
    dominantPacing: 'Contrarian Debate (1.0s cuts)',
    keySuccessSecret: 'Smonta miti aziendali famosi (es. "Rolex non vende orologi", "Red Bull non produce bibite"), svelando il vero modello di monetizzazione nascosto.',
    popularShorts: [
      {
        id: 'sh-bm-1',
        title: 'Perché Ferrari ti fa causa se rivernici la tua macchina',
        views: 14500000,
        likes: 1200000,
        durationSeconds: 46,
        retentionRatePct: 127,
        hookText: 'Hai pagato 400.000€ ma se cambi questo dettaglio te la sequestrano...',
        viralFactor: 'Shock di proprietà + regole assurde dei ricchi',
        estimatedEarningsUsd: 2610,
        publishedDaysAgo: 12,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-bm-2',
        title: 'Il trucco geniale con cui McDonald\'s possiede più terra della Chiesa',
        views: 9200000,
        likes: 790000,
        durationSeconds: 41,
        retentionRatePct: 122,
        hookText: 'McDonald\'s non guadagna con i panini. Ecco il loro vero business...',
        viralFactor: 'Rivelazione di modello di business controintuitivo',
        estimatedEarningsUsd: 1656,
        publishedDaysAgo: 29,
        loopType: 'sentence_continuation',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  },
  {
    id: 'ch-longevity-biohack',
    name: 'Biohack & Supreme Health',
    handle: '@DailyLongevityHacks',
    youtubeUrl: 'https://www.youtube.com/@DailyLongevityHacks/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-emerald-600 to-teal-800',
    niche: 'Salute, Biohacking & Longevità',
    language: 'Italian / Multi',
    totalSubscribers: 195000,
    totalShortsUploaded: 22, // Soli 22 video caricati
    totalShortsViews: 52000000,
    averageViewsPerShort: 2363636,
    viewsToSubRatio: 12.12,
    efficiencyScore: 97,
    estimatedMonthlyShortsIncomeUsd: 8400,
    averageRpm: 0.15,
    dominantPacing: 'Curiosity Hook (1.2s cuts)',
    keySuccessSecret: 'Inizia con un cibo o abitudine quotidiana apparentemente innocua ("Se mangi questo prima di dormire stai distruggendo il tuo testosterone"), con grafica 3D del corpo.',
    popularShorts: [
      {
        id: 'sh-bh-1',
        title: 'Bevi questo alle 7 del mattino per bruciare grasso viscerale',
        views: 6900000,
        likes: 510000,
        durationSeconds: 36,
        retentionRatePct: 129,
        hookText: 'Non bere caffè a stomaco vuoto. Fai questa combinazione di 3 ingredienti...',
        viralFactor: 'Salute pratica immediata a costo zero',
        estimatedEarningsUsd: 1035,
        publishedDaysAgo: 16,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      },
      {
        id: 'sh-bh-2',
        title: 'I 2 minuti serali che riparano il fegato mentre dormi',
        views: 4800000,
        likes: 360000,
        durationSeconds: 33,
        retentionRatePct: 116,
        hookText: 'Questo trucco dei monaci tibetani abbassa il cortisolo dell\'80% in 5 minuti...',
        viralFactor: 'Rituale serale rilassante + segreto antico',
        estimatedEarningsUsd: 720,
        publishedDaysAgo: 40,
        loopType: 'sentence_continuation',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  },
  {
    id: 'ch-stoic-mind',
    name: 'Stoic Discipline Code',
    handle: '@StoicDominance',
    youtubeUrl: 'https://www.youtube.com/@StoicDominance/shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    bannerColor: 'from-stone-800 to-amber-950',
    niche: 'Crescita Personale & Stoicismo',
    language: 'Italian / Global',
    totalSubscribers: 340000,
    totalShortsUploaded: 41,
    totalShortsViews: 88000000,
    averageViewsPerShort: 2146341,
    viewsToSubRatio: 6.31,
    efficiencyScore: 92,
    estimatedMonthlyShortsIncomeUsd: 7900,
    averageRpm: 0.11,
    dominantPacing: 'Narrative Arc (1.5s cuts)',
    keySuccessSecret: 'Busto di Marco Aurelio animato con voce profonda baritonale, testo cinematico a comparsa parola per parola (karaoke style) e crescendo musicale orchestrale.',
    popularShorts: [
      {
        id: 'sh-sm-1',
        title: 'Se ti senti bloccato nella vita, ascolta Marco Aurelio',
        views: 6200000,
        likes: 580000,
        durationSeconds: 40,
        retentionRatePct: 125,
        hookText: 'Hai 30 secondi prima che la tua mente trovi un\'altra scusa...',
        viralFactor: 'Chiamata all\'azione brutale e motivazionale',
        estimatedEarningsUsd: 682,
        publishedDaysAgo: 19,
        loopType: 'seamless_audio',
        youtubeShortUrl: 'https://www.youtube.com/hashtag/shorts'
      }
    ]
  }
];

export const INITIAL_NICHES: NicheIdea[] = [
  {
    id: 'niche-fin',
    name: 'Arbitraggio & Segreti Bancari Quotidiani',
    tagline: 'Svelare costi nascosti, cashback, crediti e trucchi legali con lo smartphone.',
    avgRpmUsd: 0.14,
    competitionLevel: 'Medium',
    viralityPotential: 'Very High',
    monetizationRoutes: ['Affiliazioni conti e carte fintech', 'Corsi e community Discord', 'Sponsorizzazioni broker'],
    sampleHook: 'Le banche guadagnano 400€ l\'anno alle tue spalle su questa voce...',
    recommendedFacelessTools: ['CapCut', 'ElevenLabs (Voce Adam/Charlie)', 'Submagic', 'Pexels/Envato']
  },
  {
    id: 'niche-psycho',
    name: 'Micro-Psicologia & Lettura del Linguaggio del Corpo',
    tagline: 'Spiegare le intenzioni nascoste di colleghi, partner e sconosciuti.',
    avgRpmUsd: 0.11,
    competitionLevel: 'Low',
    viralityPotential: 'Very High',
    monetizationRoutes: ['Ebook su seduzione & negoziazione', 'Coaching 1-on-1', 'Programma affiliazione libri Amazon'],
    sampleHook: 'Se incrocia le braccia e inclina la testa, significa solo una cosa...',
    recommendedFacelessTools: ['Midjourney / Leonardo AI', 'ElevenLabs', 'Auto-Captions', 'Audio Jungle SFX']
  },
  {
    id: 'niche-ai-tools',
    name: 'AI Tool Arbitrage & Automazioni Lavorative',
    tagline: 'Mostrare come sostituire 8 ore di lavoro manuale con prompt e software gratuiti.',
    avgRpmUsd: 0.18,
    competitionLevel: 'High',
    viralityPotential: 'Very High',
    monetizationRoutes: ['Link affiliati SaaS (recurring 30%)', 'Newsletter a pagamento', 'Pacchetti prompt digitali'],
    sampleHook: 'Non fare mai più una presentazione PowerPoint a mano: ecco il sito...',
    recommendedFacelessTools: ['Screen Studio', 'ElevenLabs', 'Notion templates', 'CapCut Pro']
  },
  {
    id: 'niche-bcase',
    name: 'Retro-Scena Miliardari & Guerre di Marchi',
    tagline: 'Storie sconosciute di come i grandi brand hanno distrutto la concorrenza o truffato il sistema.',
    avgRpmUsd: 0.16,
    competitionLevel: 'Medium',
    viralityPotential: 'High',
    monetizationRoutes: ['Brand deals con app B2B', 'Merchandising', 'Monetizzazione Shorts Fondo/AdSense'],
    sampleHook: 'Nel 1998 la Pixar ha quasi chiuso per un singolo comando cancellato...',
    recommendedFacelessTools: ['Filmora / Premiere', 'Motion graphics template', 'Storyblocks', 'Artlist']
  },
  {
    id: 'niche-biohack',
    name: 'Protocolli di Longevità & Energia Maschile/Femminile',
    tagline: 'Rimedio naturale, routine di sonno e trucchi biologici a costo zero.',
    avgRpmUsd: 0.15,
    competitionLevel: 'Low',
    viralityPotential: 'Very High',
    monetizationRoutes: ['Integratori in affiliazione (es. MyProtein, iHerb)', 'App fitness partner', 'Piani PDF personalizzati'],
    sampleHook: 'Se ti svegli stanco alle 7:30, stai commettendo questo errore fatale alle 22:00...',
    recommendedFacelessTools: ['D-ID / HeyGen', 'B-roll 4K natura/scienza', 'ElevenLabs', 'CapCut']
  }
];
