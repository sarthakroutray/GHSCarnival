import React, { useState } from 'react';
import NavBar from '../components/NavBar';

// --- Type Definitions ---

interface TeamStats {
  score: string;
  detail: string;
}

interface NowPlaying {
  title: string;
  teamA: TeamStats;
  teamB: TeamStats;
  venue: string;
}

interface NextMatch {
  time: string;
  match: string;
}

interface SportData {
  title: string;
  icon: string;
  now: NowPlaying;
  next: NextMatch[];
}

interface MockDataMap {
  [key: string]: SportData;
}

// --- Data (All 11 Sports) ---

const MOCK_DATA: MockDataMap = {
  boxcricket: {
    title: 'Box Cricket',
    icon: '🏏',
    now: { title: 'B2 v/s B4', teamA: { score: '127/9', detail: '60 balls' }, teamB: { score: '24/2', detail: '18 balls' }, venue: 'Bluespring Turf | 10 Overs' },
    next: [{ time: '10:00', match: 'B8 v/s B10' }, { time: '12:00', match: 'B6 v/s B3' }, { time: '12:00', match: 'B6 v/s B10' }]
  },
  futsal: {
    title: 'Futsal',
    icon: '⚽',
    now: { title: 'A1 v/s A3', teamA: { score: '2', detail: 'HT' }, teamB: { score: '1', detail: 'HT' }, venue: 'Courtyard 1 | 2x15m' },
    next: [{ time: '10:30', match: 'A2 v/s A4' }, { time: '11:30', match: 'A5 v/s A6' }, { time: '12:30', match: 'A7 v/s A8' }]
  },
  basketball: {
    title: 'Basketball',
    icon: '🏀',
    now: { title: 'C2 v/s C4', teamA: { score: '48', detail: 'Q3 02:12' }, teamB: { score: '39', detail: 'Q3 02:12' }, venue: 'Main Court | 4Q' },
    next: [{ time: '11:00', match: 'C1 v/s C3' }, { time: '12:00', match: 'C5 v/s C6' }, { time: '13:00', match: 'C7 v/s C8' }]
  },
  volleyball: {
    title: 'Volleyball',
    icon: '🏐',
    now: { title: 'D2 v/s D5', teamA: { score: '1', detail: 'Set 3' }, teamB: { score: '1', detail: 'Set 3' }, venue: 'Ground 2 | Bo3' },
    next: [{ time: '10:00', match: 'D1 v/s D3' }, { time: '11:30', match: 'D4 v/s D6' }, { time: '13:00', match: 'D7 v/s D8' }]
  },
  tabletennis: {
    title: 'Table Tennis',
    icon: '🏓',
    now: { title: 'TT1 v/s TT3', teamA: { score: '2', detail: 'Game 4' }, teamB: { score: '1', detail: 'Game 4' }, venue: 'Hall A | Bo5' },
    next: [{ time: '10:00', match: 'TT2 v/s TT4' }, { time: '11:00', match: 'TT5 v/s TT6' }, { time: '12:00', match: 'TT7 v/s TT8' }]
  },
  powerlifting: {
    title: 'Power Lifting',
    icon: '🏋️',
    now: { title: 'WL1 v/s WL3', teamA: { score: '145kg', detail: 'Snatch' }, teamB: { score: '138kg', detail: 'Snatch' }, venue: "Gym Hall | Men's 73kg" },
    next: [{ time: '10:00', match: 'WL2 v/s WL4' }, { time: '11:00', match: 'WL5 v/s WL6' }, { time: '12:00', match: 'WL7 v/s WL8' }]
  },
  pool: {
    title: 'Pool',
    icon: '🎱',
    now: { title: 'PL1 v/s PL3', teamA: { score: '3', detail: 'Frame 4' }, teamB: { score: '2', detail: 'Frame 4' }, venue: 'Recreation Hall | Bo5' },
    next: [{ time: '10:00', match: 'PL2 v/s PL4' }, { time: '11:00', match: 'PL5 v/s PL6' }, { time: '12:00', match: 'PL7 v/s WL8' }]
  },
  badminton: {
    title: 'Badminton',
    icon: '🏸',
    now: { title: 'BD1 v/s BD3', teamA: { score: '1', detail: 'Set 2' }, teamB: { score: '0', detail: 'Set 2' }, venue: 'Court 1 | Bo3' },
    next: [{ time: '10:00', match: 'BD2 v/s BD4' }, { time: '11:00', match: 'BD5 v/s BD6' }, { time: '12:00', match: 'BD7 v/s BD8' }]
  },
  squash: {
    title: 'Squash',
    icon: '🎾',
    now: { title: 'SQ1 v/s SQ3', teamA: { score: '2', detail: 'Game 4' }, teamB: { score: '1', detail: 'Game 4' }, venue: 'Squash Court | Bo5' },
    next: [{ time: '10:00', match: 'SQ2 v/s SQ4' }, { time: '11:00', match: 'SQ5 v/s SQ6' }, { time: '12:00', match: 'SQ7 v/s SQ8' }]
  },
  tugofwar: {
    title: 'Tug of War',
    icon: '🪢',
    now: { title: 'TW1 v/s TW3', teamA: { score: '1', detail: 'Round 2' }, teamB: { score: '0', detail: 'Round 2' }, venue: 'Main Ground | Bo3' },
    next: [{ time: '10:00', match: 'TW2 v/s TW4' }, { time: '11:00', match: 'TW5 v/s TW6' }, { time: '12:00', match: 'TW7 v/s TW8' }]
  },
  chess: {
    title: 'Chess',
    icon: '♟️',
    now: { title: 'CH1 v/s CH3', teamA: { score: '1', detail: 'Move 25' }, teamB: { score: '0', detail: 'Move 25' }, venue: 'Hall B | Classical' },
    next: [{ time: '10:00', match: 'CH2 v/s CH4' }, { time: '11:00', match: 'CH5 v/s CH6' }, { time: '12:00', match: 'CH7 v/s CH8' }]
  }
};

const LiveScores: React.FC = () => {
  const [activeSport, setActiveSport] = useState<string>('boxcricket');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const data = MOCK_DATA[activeSport] || MOCK_DATA.boxcricket;
  const bgImage = "WhatsApp Image 2026-01-13 at 11.38.30 PM.jpeg";

  const handleSportChange = (key: string): void => {
    setIsAnimating(true);
    setActiveSport(key);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="min-h-screen bg-fixed font-poppins text-gray-900 overflow-x-hidden" 
         style={{ 
           backgroundImage: `url('${bgImage}')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
         }}>
      
      {/* Mobile-Responsive Container */}
      <div className="w-full max-w-full md:max-w-[420px] mx-auto flex flex-col min-h-screen bg-white/20 backdrop-blur-md shadow-2xl">
        
        <header className="px-4 py-6 pb-2">
          <div className="flex items-center">
            <img src="ghs carnival.png" alt="GHS CARNIVAL" className="h-9 w-auto max-w-full" />
          </div>
        </header>

        {/* Scrollable Sports Tabs */}
        <div className="flex gap-[12px] overflow-x-auto px-4 py-3 no-scrollbar touch-pan-x">
          {Object.keys(MOCK_DATA).map((key) => (
            <button
              key={key}
              onClick={() => handleSportChange(key)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-[85px] h-[85px] rounded-xl border transition-all duration-300 
                ${activeSport === key 
                  ? 'bg-[#ffe9df] border-[#fdcfba] shadow-[0_0_0_4px_rgba(255,122,61,0.25)] scale-105' 
                  : 'bg-white/70 border-white/50 hover:bg-white/90'}`}
            >
              <span className="text-2xl mb-1">{MOCK_DATA[key].icon}</span>
              <span className="text-[10px] font-bold text-center leading-tight uppercase">
                {MOCK_DATA[key].title}
              </span>
            </button>
          ))}
        </div>

        <main className="flex-1 px-4 py-4 pb-12">
          <div className="text-[12px] font-bold text-gray-600 uppercase tracking-widest mb-4">
            Now Playing: {data.title}
          </div>

          {/* Now Playing Card */}
          <section 
            className={`relative overflow-hidden rounded-[24px] border border-white/40 p-5 transition-opacity duration-300 shadow-xl
            ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            style={{ 
              backgroundImage: `linear-gradient(135deg, rgba(255,122,61,0.15), rgba(155,92,246,0.15)), url('${bgImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Glossy Glass Effect */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-md" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[12px] text-gray-500 font-semibold mb-4">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_0_4px_rgba(220,38,38,0.2)] animate-pulse" />
                <span>{data.now.title}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="bg-white/90 rounded-2xl p-4 text-center shadow-sm border border-white">
                  <div className="text-[38px] md:text-[42px] font-black leading-none text-gray-800">{data.now.teamA.score}</div>
                  <div className="text-[11px] text-orange-600 mt-2 font-bold uppercase tracking-tight">{data.now.teamA.detail}</div>
                </div>
                <div className="bg-white/90 rounded-2xl p-4 text-center shadow-sm border border-white">
                  <div className="text-[38px] md:text-[42px] font-black leading-none text-gray-800">{data.now.teamB.score}</div>
                  <div className="text-[11px] text-orange-600 mt-2 font-bold uppercase tracking-tight">{data.now.teamB.detail}</div>
                </div>
              </div>

              <div className="text-[12px] text-gray-600 mt-5 flex items-center gap-2 font-medium bg-white/50 w-fit px-3 py-1 rounded-full border border-white/40">
                📍 {data.now.venue}
              </div>
            </div>
          </section>

          <div className="text-[12px] font-bold text-gray-600 uppercase tracking-widest mt-8 mb-4">Up Next</div>
          
          {/* Next Matches Grid */}
          <div className="grid grid-cols-3 gap-3">
            {data.next.map((match, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm border border-white/50 p-3 rounded-2xl hover:-translate-y-1 transition-all shadow-sm group">
                <div className="text-[12px] font-bold text-orange-600 group-hover:text-orange-700">{match.time}</div>
                <div className="text-[11px] text-gray-700 font-semibold leading-tight mt-1">{match.match}</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <NavBar/>
    </div>
  );
};

export default LiveScores;