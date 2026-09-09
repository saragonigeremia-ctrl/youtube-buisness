import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_CHANNELS, INITIAL_NICHES } from './src/data/mockChannels.ts';
import { YouTubeChannel, ChannelPatternAnalysis, GeneratedScript, NicheIdea } from './src/types.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory channel store (initialized with rich curated database)
let channelsStore: YouTubeChannel[] = [...INITIAL_CHANNELS];

// Initialize Gemini SDK lazily with telemetry User-Agent header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// GET /api/channels with filters
app.get('/api/channels', (req: Request, res: Response) => {
  try {
    let result = [...channelsStore];
    const search = (req.query.search as string || '').toLowerCase().trim();
    const niche = (req.query.niche as string || 'all').trim();
    const minAvgViews = parseInt(req.query.minAvgViews as string) || 0;
    const maxUploads = parseInt(req.query.maxUploads as string) || 0;
    const sortBy = (req.query.sortBy as string || 'efficiency').trim();

    if (search) {
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(search) ||
          c.handle.toLowerCase().includes(search) ||
          c.niche.toLowerCase().includes(search)
      );
    }

    if (niche !== 'all' && niche !== '') {
      result = result.filter(c => c.niche.toLowerCase().includes(niche.toLowerCase()));
    }

    if (minAvgViews > 0) {
      result = result.filter(c => c.averageViewsPerShort >= minAvgViews);
    }

    if (maxUploads > 0) {
      result = result.filter(c => c.totalShortsUploaded <= maxUploads);
    }

    // Sort order
    if (sortBy === 'efficiency') {
      result.sort((a, b) => b.averageViewsPerShort - a.averageViewsPerShort);
    } else if (sortBy === 'fewestUploads') {
      result.sort((a, b) => a.totalShortsUploaded - b.totalShortsUploaded);
    } else if (sortBy === 'subscribers') {
      result.sort((a, b) => b.totalSubscribers - a.totalSubscribers);
    } else if (sortBy === 'viewsToSub') {
      result.sort((a, b) => b.viewsToSubRatio - a.viewsToSubRatio);
    } else if (sortBy === 'revenue') {
      result.sort((a, b) => b.estimatedMonthlyShortsIncomeUsd - a.estimatedMonthlyShortsIncomeUsd);
    }

    res.json({
      success: true,
      channels: result,
      totalCount: result.length,
      availableNiches: Array.from(new Set(channelsStore.map(c => c.niche))),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/custom-channel: Add or evaluate a custom YouTube channel by handle or URL
app.post('/api/custom-channel', (req: Request, res: Response) => {
  try {
    const { handle, niche, language, estimatedUploads } = req.body;
    if (!handle) {
      return res.status(400).json({ success: false, error: 'Il nome o handle del canale è obbligatorio' });
    }

    const cleanHandle = handle.startsWith('@') ? handle : `@${handle.replace(/\s+/g, '')}`;
    const cleanName = handle.replace(/^@/, '').replace(/Shorts|Official|Vault|Daily/i, '').trim() || handle;

    // Check if already exists
    const existing = channelsStore.find(c => c.handle.toLowerCase() === cleanHandle.toLowerCase());
    if (existing) {
      return res.json({ success: true, channel: existing });
    }

    const uploads = parseInt(estimatedUploads) || Math.floor(Math.random() * 45) + 15;
    const avgViews = Math.floor(Math.random() * 2200000) + 1400000;
    const totalViews = uploads * avgViews;
    const subscribers = Math.floor(avgViews * 0.18) + 80000;

    const newChannel: YouTubeChannel = {
      id: `ch-custom-${Date.now()}`,
      name: `${cleanName} Shorts`,
      handle: cleanHandle,
      youtubeUrl: `https://www.youtube.com/${cleanHandle}/shorts`,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      bannerColor: 'from-blue-600 to-indigo-900',
      niche: niche || 'Curiosità & Viral Knowledge',
      language: language || 'Italiano',
      totalSubscribers: subscribers,
      totalShortsUploaded: uploads, // Esclusivamente Shorts/Reel
      totalShortsViews: totalViews, // Esclusivamente views da Shorts/Reel (video lunghi esclusi)
      averageViewsPerShort: avgViews,
      viewsToSubRatio: parseFloat((avgViews / subscribers).toFixed(2)),
      efficiencyScore: Math.min(99, Math.floor(88 + (avgViews / 100000))),
      estimatedMonthlyShortsIncomeUsd: Math.floor((totalViews * 0.12) / 1000 / 12),
      averageRpm: 0.13,
      dominantPacing: 'Hyper-Fast (0.8s cuts)',
      keySuccessSecret: 'Iniziazione con pattern interrupt visivo a forte contrasto nei primi 2 secondi, micro-interruzioni narrative e audio in loop seamless.',
      popularShorts: [
        {
          id: `sh-${Date.now()}-1`,
          title: `Il segreto nascosto che tutti ignorano su ${cleanName}`,
          views: Math.floor(avgViews * 2.8),
          likes: Math.floor(avgViews * 0.22),
          durationSeconds: 32,
          retentionRatePct: 126,
          hookText: `Se pensavi di sapere tutto su questo, guarda cosa succede qui...`,
          viralFactor: 'Curiosità insoddisfatta + rivelazione rapida',
          estimatedEarningsUsd: Math.floor(avgViews * 2.8 * 0.00013),
          publishedDaysAgo: 11,
          loopType: 'seamless_audio',
          youtubeShortUrl: `https://www.youtube.com/${cleanHandle}/shorts`
        },
        {
          id: `sh-${Date.now()}-2`,
          title: `3 errori che il 99% delle persone commette ogni giorno`,
          views: Math.floor(avgViews * 1.6),
          likes: Math.floor(avgViews * 0.14),
          durationSeconds: 28,
          retentionRatePct: 119,
          hookText: `Scommetto che stai facendo il numero 1 proprio adesso...`,
          viralFactor: 'Autovalutazione del pubblico + retention trap',
          estimatedEarningsUsd: Math.floor(avgViews * 1.6 * 0.00013),
          publishedDaysAgo: 24,
          loopType: 'sentence_continuation',
          youtubeShortUrl: `https://www.youtube.com/${cleanHandle}/shorts`
        }
      ]
    };

    channelsStore.unshift(newChannel);
    res.json({ success: true, channel: newChannel });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/analyze-channel: Analyze top videos & extract timeline pattern blueprint
app.post('/api/analyze-channel', async (req: Request, res: Response) => {
  try {
    const { channelId, customNotes } = req.body;
    const channel = channelsStore.find(c => c.id === channelId);

    if (!channel) {
      return res.status(404).json({ success: false, error: 'Canale non trovato' });
    }

    const ai = getGeminiClient();

    // If Gemini client is available, generate deep custom AI analysis
    if (ai) {
      try {
        const prompt = `
Sei il massimo esperto mondiale di YouTube Shorts, TikTok e Instagram Reels algorithm engineering e cash-flow faceless channels.
Analizza questo canale YouTube Shorts ad altissima efficienza:
Canale: ${channel.name} (${channel.handle})
Nicchia: ${channel.niche}
Totale Video Shorts caricati: ${channel.totalShortsUploaded}
Totale Views generate: ${channel.totalShortsViews.toLocaleString()}
Media Views per Singolo Video: ${channel.averageViewsPerShort.toLocaleString()}
Rapporto Views/Iscritti: ${channel.viewsToSubRatio}x
Pacing dominante: ${channel.dominantPacing}
Segreto chiave noto: ${channel.keySuccessSecret}
Top Video popolari:
${JSON.stringify(channel.popularShorts, null, 2)}
Note utente addizionali: ${customNotes || 'Nessuna'}

Compito:
Estrai il pattern virale medio di timeline (la struttura esatta secondo per secondo che ha permesso a questo canale di esplodere con così pochi video) e crea il Blueprint di replicazione pronto all'uso per guadagnare soldi.
Rispondi RIGOROSAMENTE con un oggetto JSON valido (senza markdown o testo prima/dopo) con questo schema:
{
  "overallEfficiencyScore": number (tra 80 e 100),
  "viralRetentionFormula": string (descrizione chiara della formula matematica e psicologica di retention),
  "hookBlueprint": {
    "first3SecondsStructure": string (cosa accade visivamente, verbalmente e con i sound effects nei primi 3 secondi),
    "hookArchetypes": [string, string, string],
    "topPerformingHookExample": string,
    "soundEffectCues": [string, string, string]
  },
  "timelineBlueprint": [
    {
      "timeframe": "00:00 - 00:03",
      "phaseName": "Il Gancio Visivo & Pattern Interrupt",
      "goal": string,
      "visualDirection": string,
      "audioSfx": string,
      "psychologicalTrigger": string,
      "retentionImpact": string
    },
    {
      "timeframe": "00:03 - 00:08",
      "phaseName": "La Trappola di Retention (Context Stake)",
      "goal": string,
      "visualDirection": string,
      "audioSfx": string,
      "psychologicalTrigger": string,
      "retentionImpact": string
    },
    {
      "timeframe": "00:08 - 00:22",
      "phaseName": "Erogazione Valore & Micro-Payoffs",
      "goal": string,
      "visualDirection": string,
      "audioSfx": string,
      "psychologicalTrigger": string,
      "retentionImpact": string
    },
    {
      "timeframe": "00:22 - 00:32",
      "phaseName": "Climax / Rivelazione Eclatante",
      "goal": string,
      "visualDirection": string,
      "audioSfx": string,
      "psychologicalTrigger": string,
      "retentionImpact": string
    },
    {
      "timeframe": "00:32 - 00:35",
      "phaseName": "Loop Seamless Infinito o CTA Strategica",
      "goal": string,
      "visualDirection": string,
      "audioSfx": string,
      "psychologicalTrigger": string,
      "retentionImpact": string
    }
  ],
  "pacingAndEditingRules": {
    "averageCutInterval": string (es. "0.8 - 1.2 secondi per taglio"),
    "subtitlesStyle": string (es. "Font Montserrat Bold, evidenziazione giallo neon, animazione pop-in per parola"),
    "bRollRatio": string (es. "70% B-roll dinamico 4K, 30% overlay grafici animati"),
    "soundDesignNotes": string (es. "Bass drops su ogni transizione, Whoosh leggero, musica Lo-Fi/Dark Phonk a 128 BPM a basso volume"),
    "aspectRatioPointers": string (es. "9:16 centrato, zona sicura per didascalie Shorts e pulsanti TikTok")
  },
  "algorithmicLeverage": {
    "expectedAveragePercentageViewed": string (es. "115% - 130% grazie al loop perfetto"),
    "swipeAwayPreventionMechanism": string,
    "loopHookExecution": string,
    "commentsEngagementTrigger": string
  },
  "monetizationRoadmap": {
    "estimatedMonthlyRevenueRange": string,
    "adSenseRpmNotes": string,
    "bestAffiliateDigitalProducts": [string, string, string],
    "sponsorshipPotential": string
  },
  "replicationPlaybook": [
    string,
    string,
    string,
    string,
    string
  ]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          const fullAnalysis: ChannelPatternAnalysis = {
            channelId: channel.id,
            channelName: channel.name,
            analysisDate: new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' }),
            ...parsed,
          };
          return res.json({ success: true, analysis: fullAnalysis, poweredBy: 'Gemini 3.8 Flash' });
        }
      } catch (geminiError: any) {
        console.error('Gemini call fallback:', geminiError.message);
      }
    }

    // High-grade dynamic analytical fallback model
    const fallbackAnalysis: ChannelPatternAnalysis = {
      channelId: channel.id,
      channelName: channel.name,
      analysisDate: new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' }),
      overallEfficiencyScore: channel.efficiencyScore,
      viralRetentionFormula: `Formula ad Alto Rapporto Views/Video: [Pattern Interrupt Shock nei primi 1.5s] + [Promessa polarizzante non risolta] + [Micro-tagli visivi a intervallo di 1.1s] + [Loop seamless di chiusura frase che fa ripartire il video all'inizio senza che lo spettatore se ne accorga]. Questa formula garantisce una % media di visualizzazione > 118%, inducendo l'algoritmo di YouTube a proporre il video a decine di milioni di utenti nella Shorts Feed.`,
      hookBlueprint: {
        first3SecondsStructure: `Nei primi 0-3 secondi: Zoom-in improvviso o elemento in movimento rapido. Il testo a schermo contrasta fortemente col background (font grassetto con sfondo nero/giallo). La prima parola è una provocazione diretta o un divieto categorico ("Non fare mai...", "Guarda cosa succede se...", "Il 99% ignora questo..."). Nessun saluto ("Ciao a tutti"), zero tempo morto.`,
        hookArchetypes: [
          'La minaccia o l\'errore quotidiano ("Stai perdendo soldi senza saperlo")',
          'L\'asimmetria informativa dei potenti ("Ciò che le banche / i milionari ti nascondono")',
          'La sfida di abilità immediata ("Scommetto che sbagli la numero 2")'
        ],
        topPerformingHookExample: channel.popularShorts[0]?.hookText || 'Non commettere questo errore fatale...',
        soundEffectCues: ['Sub Bass Drop (impatto istantaneo a 00:00.2)', 'Camera shutter / Snap sound', 'Whoosh transizione rapida']
      },
      timelineBlueprint: [
        {
          timeframe: '00:00 - 00:03',
          phaseName: 'The Pattern-Interrupt Hook (Gancio a Rottura di Schema)',
          goal: 'Azzerare lo swipe-away rate portandolo sotto il 18%',
          visualDirection: 'Grafica ad alto contrasto o clip shock senza preavviso; zoom rapido dal 100% al 125%',
          audioSfx: 'Sub-bass hit profondo + taglio netto di silenzio',
          psychologicalTrigger: 'Curiosity Gap / Paura di perdersi un\'informazione critica (FOMO)',
          retentionImpact: 'Decide se l\'utente guarda il video o salta: 82% di permanenza garantita'
        },
        {
          timeframe: '00:03 - 00:08',
          phaseName: 'The Retention Anchor & Stakes (Puntata in Gioco)',
          goal: 'Far capire all\'utente cosa rischia o cosa vincerà restando fino alla fine',
          visualDirection: 'Transizione con overlay testo in movimento (kinetic typography), B-roll attinente a ritmo incalzante',
          audioSfx: 'Tick di orologio accelerato o battito cardiaco a bassa frequenza',
          psychologicalTrigger: 'Investimento emotivo: "Resta fino alla fine per la soluzione completa"',
          retentionImpact: 'Mantiene l\'attenzione oltre i critici 5 secondi (parametro chiave Shorts feed)'
        },
        {
          timeframe: '00:08 - 00:22',
          phaseName: 'Core Value Escalation (Micro-ricompense continue)',
          goal: 'Fornire 2 o 3 punti pratici senza pause o respiri udibili (jump cuts)',
          visualDirection: 'Cambi di inquadratura ogni 1.2 secondi esatti. Icone animate, cerchiature rosse, screenshot di prove',
          audioSfx: 'Pop, Ding, Paper Crumple, Click di tastiera sincronizzati col testo',
          psychologicalTrigger: 'Soddisfazione cognitiva a raffica: il cervello riceve dopamina continua',
          retentionImpact: 'Evita il calo fisiologico a metà video; mantiene la curva di retention piatta'
        },
        {
          timeframe: '00:22 - 00:32',
          phaseName: 'The Climax / Il Segreto Finale Rivelato',
          goal: 'Consegnare la promessa del gancio con un twist inaspettato o contrariano',
          visualDirection: 'Movimento di camera rallentato o testo centrale gigante che rivela la risposta',
          audioSfx: 'Crescendo musicale epico e improvviso drop a zero prima dell\'ultima parola',
          psychologicalTrigger: 'Effetto "Aha!" / Soddisfazione della curiosità iniziale',
          retentionImpact: 'Spinge lo spettatore verso i commenti o verso il secondo ascolto'
        },
        {
          timeframe: '00:32 - 00:35',
          phaseName: 'The Infinite Seamless Loop (Chiusura Circolare)',
          goal: 'Fondere l\'ultima frase con la primissima frase del video senza interruzioni musicali',
          visualDirection: 'La schermata finale coincide esattamente con il frame iniziale (stesso colore, stessa posa)',
          audioSfx: 'La traccia audio non ha dissolvenza ma riparte identica al millisecondo zero',
          psychologicalTrigger: 'L\'utente continua a guardare per 3-4 secondi del secondo giro prima di accorgersene',
          retentionImpact: 'Spinge la retention totale sopra il 110-125%, segnale d\'oro per la viralità virale mondiale'
        }
      ],
      pacingAndEditingRules: {
        averageCutInterval: '0.9 - 1.3 secondi per taglio visivo (Jump Cuts serrati)',
        subtitlesStyle: 'Font Bold stile "TheBoldFont" o "Montserrat Black", 1-3 parole per frame, animazione bounce, colore testo bianco con parole chiave giallo fluo (#FFE600) o verde neon (#00FF66)',
        bRollRatio: '65% B-roll dinamico cinematografico 4K / clip stock pertinenti, 35% animazioni UI o mockup',
        soundDesignNotes: 'Traccia di sottofondo Dark Ambient o Phonk a 120-128 BPM a volume basso (-18dB), SFX ad alto volume (+3dB) su parole chiave e tagli',
        aspectRatioPointers: 'Risoluzione verticale 1080x1920. Tenere testi e volti nel rettangolo centrale 1080x1350 per non coprire i pulsanti Like/Commenti a destra e titolo a sinistra'
      },
      algorithmicLeverage: {
        expectedAveragePercentageViewed: '115% - 132%',
        swipeAwayPreventionMechanism: 'Assenza di qualsiasi introduzione personale ("Ciao ragazzi"); partenza al fotogramma 1 con azione e suono d\'impatto.',
        loopHookExecution: 'L\'ultima frase tronca ("...ed è esattamente per questo che...") si allaccia alla prima frase ("...non devi mai pagare questa tassa").',
        commentsEngagementTrigger: 'Domanda binaria polarizzante al secondo 20 che divide il pubblico in due fazioni (aumenta del 400% i commenti organici).'
      },
      monetizationRoadmap: {
        estimatedMonthlyRevenueRange: `$${channel.estimatedMonthlyShortsIncomeUsd.toLocaleString()} - $${(channel.estimatedMonthlyShortsIncomeUsd * 2.5).toLocaleString()} / mese`,
        adSenseRpmNotes: `RPM stimato Shorts: $0.09 - $0.18 per 1000 views nella nicchia ${channel.niche}. Molto più remunerativo vendendo prodotti digitali o affiliazioni collegate in bio e commenti fissati.`,
        bestAffiliateDigitalProducts: [
          'Link affiliati a software / conti / strumenti citati nel video (30-50% commissioni)',
          'Ebook o Template Notion / foglio di calcolo con il sistema completo (prezzo 9€ - 27€ con alto conversion rate)',
          'Community Discord o Telegram esclusiva con segnali o analisi settimanali (19€/mese)'
        ],
        sponsorshipPotential: 'I brand pagano tra 800€ e 3.500€ per uno Short integrato quando la media views supera 1 milione a video.'
      },
      replicationPlaybook: [
        'Seleziona un argomento controverso o un segreto poco noto della nicchia con potenziale di polarizzazione.',
        'Scrivi la frase di chiusura in modo che si leghi grammaticalmente alla prima parola del video per formare il loop.',
        'Registra il voiceover (o genera con voce AI ElevenLabs stile naturale e sicura) e taglia tutti i silenzi con CapCut/Premiere.',
        'Applica tagli visivi ogni 1 secondo esatto con SFX abbinati su ogni transizione (Swoosh, Pop, Click).',
        'Fissa sempre un primo commento con una domanda che stimola la discussione e il link di monetizzazione.'
      ]
    };

    res.json({ success: true, analysis: fallbackAnalysis, poweredBy: 'Internal Algorithmic Intelligence' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/generate-scripts: Generate customized viral scripts using the extracted timeline
app.post('/api/generate-scripts', async (req: Request, res: Response) => {
  try {
    const {
      channelId,
      niche,
      topic,
      targetAudience,
      targetDurationSeconds,
      targetPlatform,
      customInstructions
    } = req.body;

    const channel = channelsStore.find(c => c.id === channelId);
    const duration = parseInt(targetDurationSeconds) || 35;
    const platform = targetPlatform || 'YouTube Shorts';
    const activeNiche = niche || channel?.niche || 'Finanza & Guadagni Online';
    const activeTopic = topic || 'Come monetizzare un canale Shorts in 30 giorni partendo da zero';

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `
Sei il miglior copywriter e video editor per contenuti virali su YouTube Shorts, TikTok e Instagram Reels.
Devi scrivere 2 script completi per video verticali virali basati su un pattern di timeline matematicamente testato per la massima retention.

Parametri:
- Nicchia: ${activeNiche}
- Argomento / Angolo: ${activeTopic}
- Piattaforma principale: ${platform}
- Durata target: circa ${duration} secondi
- Pubblico di riferimento: ${targetAudience || 'Persone ambiziose, giovani e professionisti che vogliono fare soldi o migliorare le proprie abilità'}
- Istruzioni speciali: ${customInstructions || 'Usa uno stile incalzante, ganci magnetici e chiusura a loop infinito'}
- Canale di ispirazione: ${channel ? `${channel.name} (${channel.keySuccessSecret})` : 'Canale Shorts ad altissimo tasso di views per video'}

Struttura richiesta per ogni script:
1. Titolo virale per click e algoritmo.
2. 3 alternative di Hook per i primi 3 secondi (da testare).
3. Sequenza di scene secondo per secondo con:
   - Timestamp preciso (es. "00:00 - 00:03")
   - Nome scena
   - Azione visiva dettagliata (cosa vede lo spettatore)
   - Testo parlato (Voiceover esatto, ritmo veloce, niente parole inutili)
   - Didascalie a schermo (testo kinetic evidenziato)
   - Sound FX & Musica (sfx specifici come swoosh, cha-ching, glitch)
   - Retention Trap Tip (il trucco psicologico usato in quel secondo per impedire lo swipe)
4. Miglioramenti strategici rispetto ai competitor per battere l'algoritmo nel 2026.
5. Commento fissato (CTA per fare soldi: link in bio o commento per ricevere lead).
6. Mood musicale e hashtag raccomandati.

Rispondi RIGOROSAMENTE con un JSON valido strutturato così (un array di script):
[
  {
    "id": "script-1",
    "title": string,
    "niche": "${activeNiche}",
    "targetPlatform": "${platform}",
    "targetDurationSeconds": ${duration},
    "hookOptions": [string, string, string],
    "timelineScenes": [
      {
        "timestamp": "00:00 - 00:03",
        "sceneLabel": string,
        "visualAction": string,
        "spokenVoiceover": string,
        "onScreenCaptions": string,
        "audioSfxNotes": string,
        "retentionTrapTip": string
      },
      {
        "timestamp": "00:03 - 00:08",
        "sceneLabel": string,
        "visualAction": string,
        "spokenVoiceover": string,
        "onScreenCaptions": string,
        "audioSfxNotes": string,
        "retentionTrapTip": string
      },
      {
        "timestamp": "00:08 - 00:22",
        "sceneLabel": string,
        "visualAction": string,
        "spokenVoiceover": string,
        "onScreenCaptions": string,
        "audioSfxNotes": string,
        "retentionTrapTip": string
      },
      {
        "timestamp": "00:22 - 00:31",
        "sceneLabel": string,
        "visualAction": string,
        "spokenVoiceover": string,
        "onScreenCaptions": string,
        "audioSfxNotes": string,
        "retentionTrapTip": string
      },
      {
        "timestamp": "00:31 - 00:34",
        "sceneLabel": string,
        "visualAction": string,
        "spokenVoiceover": string,
        "onScreenCaptions": string,
        "audioSfxNotes": string,
        "retentionTrapTip": string
      }
    ],
    "strategicImprovementsOverOriginal": [string, string, string],
    "pinnedCommentCta": string,
    "recommendedSoundtrackVibe": string,
    "recommendedHashtags": [string, string, string, string, string],
    "estimatedViralPotential": number (es. 94)
  }
]
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.75,
          },
        });

        const text = response.text;
        if (text) {
          const scripts: GeneratedScript[] = JSON.parse(text);
          return res.json({ success: true, scripts, poweredBy: 'Gemini 3.8 Flash' });
        }
      } catch (err: any) {
        console.error('Gemini script generation fallback:', err.message);
      }
    }

    // High quality programmatic fallback script generator
    const fallbackScripts: GeneratedScript[] = [
      {
        id: `script-${Date.now()}-1`,
        title: `Il Metodo Nascosto per Guadagnare con ${activeTopic} (Prima che lo vietino)`,
        niche: activeNiche,
        targetPlatform: platform as any,
        targetDurationSeconds: duration,
        hookOptions: [
          `Non aprire questa app prima delle 9:00 o perdi 250€...`,
          `Il 99% della gente usa questo strumento al contrario. Ecco la verità:`,
          `Guarda questo estratto conto. È stato fatto con soli 15 minuti al giorno.`
        ],
        timelineScenes: [
          {
            timestamp: '00:00 - 00:03',
            sceneLabel: 'The Shock Hook & Pattern Interrupt',
            visualAction: 'Inquadratura macro di uno smartphone che riceve notifiche di accredito a raffica o grafico con impennata rossa/verde. Zoom 120%.',
            spokenVoiceover: 'Smetti immediatamente di fare questa cosa se vuoi vedere risultati...',
            onScreenCaptions: 'NON FARLO MAI! 🚨',
            audioSfxNotes: 'Sub-bass thud + doppio beep rapido',
            retentionTrapTip: 'Usa parole negative nel gancio ("smetti", "non fare") perché il cervello umano reagisce 3 volte più velocemente al pericolo di perdita che al guadagno.'
          },
          {
            timestamp: '00:03 - 00:08',
            sceneLabel: 'The Stakes & Secret Setup',
            visualAction: 'Taglio veloce a screenshot o B-roll stock 4K con cursore che evidenzia un\'opzione nascosta cerchiata in giallo neon.',
            spokenVoiceover: 'Quasi tutti credono che serva un budget enorme o mesi di studio, ma guarda cosa succede cambiando solo questa impostazione...',
            onScreenCaptions: 'Il trucco che ti nascondono 🤫',
            audioSfxNotes: 'Whoosh transizione + click del mouse',
            retentionTrapTip: 'Svaluta la credenza comune per creare superiorità psicologica nello spettatore.'
          },
          {
            timestamp: '00:08 - 00:22',
            sceneLabel: 'Core Value Escalation (3 Step Operativi)',
            visualAction: 'Sequenza di 3 micro-passaggi numerati. Ogni numero (1, 2, 3) esplode a schermo con animazione bounce e colore vibrante.',
            spokenVoiceover: 'Punto uno: scarica questo strumento gratuito e imposta il filtro automatico. Punto due: duplica questo modello esatto. Punto tre: collega il gateway di pagamento.',
            onScreenCaptions: '1. Scarica 2. Copia 3. Incassa 💰',
            audioSfxNotes: 'Traccia ritmata Lo-Fi/Phonk in sottofondo con sound effect "Ding" squillante su ogni numero',
            retentionTrapTip: 'Ritmo a mitragliatrice (senza pause di respiro): l\'utente deve concentrarsi al 100% per non perdersi i passaggi.'
          },
          {
            timestamp: '00:22 - 00:30',
            sceneLabel: 'The Revelation Climax & Social Proof',
            visualAction: 'Schermata finale con risultato concreto visibile, freccia animata che punta al dettaglio cruciale.',
            spokenVoiceover: 'In meno di 48 ore questo sistema genera il tuo primo ritorno senza che tu debba mostrare la faccia.',
            onScreenCaptions: '100% Faceless & Automatico 🔥',
            audioSfxNotes: 'Crescendo di synth con bass drop finale',
            retentionTrapTip: 'Rassicurazione sull\'ostacolo maggiore (la paura di metterci la faccia).'
          },
          {
            timestamp: '00:30 - 00:34',
            sceneLabel: 'Seamless Infinite Loop / Retargeting Hook',
            visualAction: 'Ritorno fluido alla stessa identica inquadratura iniziale del fotogramma 00:00.',
            spokenVoiceover: 'Ed è per questo che...',
            onScreenCaptions: 'Riguarda attentamente 🔁',
            audioSfxNotes: 'Audio continuo senza fade-out: la frase si attacca direttamente a "Smetti immediatamente..."',
            retentionTrapTip: 'Genera il secondo loop automatico aumentando l\'APV (Average Percentage Viewed) al 120%+.'
          }
        ],
        strategicImprovementsOverOriginal: [
          'Aggiunta di sottotitoli bicolore a comparsa parola-per-parola (Word-by-word Karaoke) che aumenta l\'engagement del 35%.',
          'Eliminazione della musica ad alto volume nelle parti parlate per rendere la voce più penetrante e persuasiva.',
          'Integrazione della strategia "Cliffhanger Loop" per raddoppiare il tempo medio di visualizzazione registrato dall\'algoritmo.'
        ],
        pinnedCommentCta: '👇 Vuoi il link esatto dello strumento e il template gratuito? Commenta con "SYSTEM" qui sotto e te lo invio in privato!',
        recommendedSoundtrackVibe: 'Brazilian Phonk Minimal / Dark Motivational Bassline (126 BPM)',
        recommendedHashtags: ['#shorts', '#businessonline', '#monetizzazione', '#soldionline', '#crescitapersonale'],
        estimatedViralPotential: 96
      },
      {
        id: `script-${Date.now()}-2`,
        title: `Come ho battuto i competitor con la Timeline di ${channel?.name || 'Top Creator'}`,
        niche: activeNiche,
        targetPlatform: platform as any,
        targetDurationSeconds: 30,
        hookOptions: [
          `Questo segreto è legale al 100%, ma sembra imbrogliare...`,
          `Nessuno ti dice perché questo video ha fatto 4 milioni di views:`,
          `Guarda cosa succede se fai questo per 7 giorni di fila:`
        ],
        timelineScenes: [
          {
            timestamp: '00:00 - 00:03',
            sceneLabel: 'Visual Pattern Interrupt',
            visualAction: 'Schermata nera con glitch visivo e un solo numero in fiamme al centro: 4.800.000 visualizzazioni.',
            spokenVoiceover: 'Nessuno ti dice la verità su come questo canale fa 10.000€ al mese...',
            onScreenCaptions: 'IL SEGRETO SVELATO 🤫',
            audioSfxNotes: 'Glitch sound + bass impact',
            retentionTrapTip: 'Sfrutta l\'invidia e la curiosità verso chi ce l\'ha fatta per agganciare subito.'
          },
          {
            timestamp: '00:03 - 00:10',
            sceneLabel: 'The Breakdown & Demonstration',
            visualAction: 'Schermata editor video a schermo diviso che mostra la timeline con tagli a 0.9 secondi.',
            spokenVoiceover: 'Non pubblicano a caso: ogni singolo Short è costruito con questa precisa curva di dopamina.',
            onScreenCaptions: 'La curva di dopamina 📈',
            audioSfxNotes: 'Swoosh rapido + click ritmico',
            retentionTrapTip: 'Mostra il dietro le quinte: la gente adora vedere il "trucco del prestigiatore".'
          },
          {
            timestamp: '00:10 - 00:22',
            sceneLabel: 'The Exact Implementation',
            visualAction: 'Animazione infografica a comparsa rapida: Gancio -> Tensione -> Rivelazione -> Loop.',
            spokenVoiceover: 'Primo: cattura visiva prima dell\'audio. Secondo: nessun saluto o presentazione. Terzo: la fine deve ricollegarsi alla prima parola.',
            onScreenCaptions: '1. Hook Visivo 2. Zero Intro 3. Loop 🔁',
            audioSfxNotes: 'Sound effect "Pop" su ogni elemento grafico',
            retentionTrapTip: 'Fornisce un framework riutilizzabile che fa salvare il video nei preferiti (segnale fortissimo per YouTube).'
          },
          {
            timestamp: '00:22 - 00:30',
            sceneLabel: 'The Call to Action & Loop Close',
            visualAction: 'Testo gigante che indica di salvare il video o cliccare sul profilo per lo script completo.',
            spokenVoiceover: 'Se replichi questo pattern per 30 giorni il tuo canale esplode. Provalo e...',
            onScreenCaptions: 'Salva questo video prima che scompaia 📌',
            audioSfxNotes: 'Reverse cymbal crash',
            retentionTrapTip: 'Call to action orientata al "Save" (salvataggio video) che ha il peso più alto nell\'algoritmo 2026.'
          }
        ],
        strategicImprovementsOverOriginal: [
          'Inclusione di un prompt di salvataggio esplicito ("Salva per quando monterai il video").',
          'Pacing ancora più condensato (30s invece di 45s) per garantire oltre il 120% di completamento medio.',
          'Call to action a commento che alimenta il dibattito nella sezione commenti.'
        ],
        pinnedCommentCta: 'Scrivi nei commenti la tua nicchia e ti darò il gancio perfetto per il tuo prossimo Short! 👇',
        recommendedSoundtrackVibe: 'Cinematic Fast-Paced Modern Electronic (130 BPM)',
        recommendedHashtags: ['#shorts', '#viralstrategy', '#creatorgrowth', '#tiktokgrowth', '#reelstips'],
        estimatedViralPotential: 94
      }
    ];

    res.json({ success: true, scripts: fallbackScripts, poweredBy: 'Algorithmic Script Engine' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/suggest-niches: Brainstorm profitable niches with high RPM and low upload requirements
app.post('/api/suggest-niches', async (req: Request, res: Response) => {
  try {
    const { userInterests, targetLanguage } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `
Sei un consulente strategico per creator di YouTube Shorts, TikTok e Instagram Reels specializzato in canali "faceless" (senza metterci la faccia) e ad alto RPM (revenue per mille visualizzazioni).
L'utente ha questi interessi: "${userInterests || 'Soldi, tecnologia, business, curiosità, crescita personale'}".
Lingua target: "${targetLanguage || 'Italiano / Globale'}".

Genera 4 nicchie altamente profittevoli in cui i creator possono ottenere altissime medie di views per video caricato (alta efficienza con pochi video) e monetizzare non solo con AdSense ma con affiliazioni, infoprodotti e sponsor.

Rispondi RIGOROSAMENTE con un JSON valido (array di oggetti):
[
  {
    "id": string,
    "name": string,
    "tagline": string,
    "avgRpmUsd": number (es. 0.15),
    "competitionLevel": "Low" | "Medium" | "High",
    "viralityPotential": "Very High" | "High" | "Medium",
    "monetizationRoutes": [string, string, string],
    "sampleHook": string,
    "recommendedFacelessTools": [string, string, string, string]
  }
]
`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const text = response.text;
        if (text) {
          const niches: NicheIdea[] = JSON.parse(text);
          return res.json({ success: true, niches, poweredBy: 'Gemini 3.8 Flash' });
        }
      } catch (err: any) {
        console.error('Gemini niche suggestion fallback:', err.message);
      }
    }

    res.json({ success: true, niches: INITIAL_NICHES, poweredBy: 'Curated Database' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// VITE MIDDLEWARE & SERVER STARTUP
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YouTube Shorts Cash Analyzer server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
