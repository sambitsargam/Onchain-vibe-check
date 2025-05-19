import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Sparkles, BarChart, TrendingUp } from 'lucide-react';

interface VibeCardPreviewProps {
  type: string;
  username: string;
  badges: string[];
}

const VibeCardPreview: React.FC<VibeCardPreviewProps> = ({ 
  type = 'meme-oracle',
  username = 'anon.eth',
  badges = []
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Patterns and colors based on vibe type
  const vibePatterns: Record<string, { 
    gradient: string, 
    icon: React.ReactNode,
    description: string,
    stats: { label: string, value: string }[]
  }> = {
    'meme-oracle': {
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      icon: <Sparkles className="text-yellow-300" size={24} />,
      description: 'High emoji usage, chaotic energy, and always ahead of the trend curve.',
      stats: [
        { label: 'Meme Quality', value: '94%' },
        { label: 'Emojis / Post', value: '6.2' },
        { label: 'Trend Setter', value: '★★★★★' }
      ]
    },
    'builder': {
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      icon: <BarChart className="text-cyan-300" size={24} />,
      description: 'Technical casts, frequent GitHub links, and always building in public.',
      stats: [
        { label: 'Commit Freq', value: '28/wk' },
        { label: 'Tech Posts', value: '54%' },
        { label: 'Builder Rank', value: '★★★★☆' }
      ]
    },
    'maximalist': {
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      icon: <BadgeCheck className="text-amber-300" size={24} />,
      description: 'ETH-aligned, minimal social interaction, strong conviction in your holdings.',
      stats: [
        { label: 'Hodl Time', value: '3.4 yrs' },
        { label: 'ETH Ratio', value: '89%' },
        { label: 'Conviction', value: '★★★★★' }
      ]
    },
    'degenerate': {
      gradient: 'from-red-500 via-pink-500 to-red-600',
      icon: <TrendingUp className="text-pink-300" size={24} />,
      description: 'NFT flipper, token hoarder, and always looking for the next moon shot.',
      stats: [
        { label: 'Flip Speed', value: '12 hrs' },
        { label: 'Gas Spent', value: '2.4 ETH' },
        { label: 'Risk Level', value: '★★★★★' }
      ]
    }
  };

  const currentVibe = vibePatterns[type] || vibePatterns['meme-oracle'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const badgeElements = badges.map((badge) => {
    switch (badge) {
      case 'og':
        return <span key="og" className="badge-og">OG</span>;
      case 'dao':
        return <span key="dao" className="badge-dao">DAO Lover</span>;
      case 'whale':
        return <span key="whale" className="badge-whale">Whale</span>;
      case 'anon':
        return <span key="anon" className="badge-anon">Anon</span>;
      default:
        return null;
    }
  });

  return (
    <div className="vibe-card" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div 
        className="vibe-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Front of card */}
        <motion.div 
          className={`absolute inset-0 p-6 bg-gradient-to-br ${currentVibe.gradient} text-white rounded-2xl`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="holographic"></div>
          
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              {currentVibe.icon}
              <h3 className="text-xl font-bold">The {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              Vibe Check
            </div>
          </div>
          
          <div className="mt-8">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">{username.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">{username}</h2>
            <div className="flex gap-2 mb-4">
              {badgeElements}
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="space-y-2 mb-4">
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-medium text-white/80">
                <span>Vibe Strength</span>
                <span>78%</span>
              </div>
            </div>
            
            <div className="text-sm text-white/70 mt-4">
              Minted on Base • {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div 
          className={`absolute inset-0 p-6 bg-gradient-to-br ${currentVibe.gradient} text-white rounded-2xl`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="holographic"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold">Vibe Analysis</h3>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {username}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-white/90">{currentVibe.description}</p>
          </div>
          
          <div className="space-y-4">
            {currentVibe.stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-white/80">{stat.label}</span>
                  <span className="font-bold">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-4">
            <div className="text-sm text-white/70 mt-4 flex justify-between">
              <span>Onchain Vibe Check</span>
              <span>#{(Math.random() * 10000).toFixed(0).padStart(4, '0')}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VibeCardPreview;
