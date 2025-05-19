import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Share2, Download } from 'lucide-react';
import VibeCardPreview from '../components/vibe/VibeCardPreview';

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentVibe, setCurrentVibe] = useState<{
    id: string;
    type: string;
    username: string;
    badges: string[];
    created: Date;
    minted: boolean;
  } | null>(null);

  const [mintedVibes, setMintedVibes] = useState<Array<{
    id: string;
    type: string;
    username: string;
    badges: string[];
    created: Date;
    minted: boolean;
  }>>([]);

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentVibe({
        id: 'vibe-1',
        type: 'meme-oracle',
        username: 'user.eth',
        badges: ['dao', 'og'],
        created: new Date(),
        minted: false
      });
      
      setMintedVibes([
        {
          id: 'vibe-2',
          type: 'builder',
          username: 'user.eth',
          badges: ['dao'],
          created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          minted: true
        }
      ]);
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Vibe Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            View, manage, and share your personalized vibe cards. Mint them as NFTs on Base or create new ones.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Current Vibe Section */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-2xl font-semibold mb-6">Current Vibe</h2>
                
                {currentVibe ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <VibeCardPreview 
                        type={currentVibe.type}
                        username={currentVibe.username}
                        badges={currentVibe.badges}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          The {currentVibe.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {getVibeDescription(currentVibe.type)}
                        </p>
                        <div className="mb-6">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Generated on {currentVibe.created.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {!currentVibe.minted && (
                          <Link 
                            to={`/mint/${currentVibe.id}`}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                          >
                            Mint on Base <PlusCircle size={16} />
                          </Link>
                        )}
                        <button className="btn-outline w-full flex items-center justify-center gap-2">
                          Share <Share2 size={16} />
                        </button>
                        <button className="btn-outline w-full flex items-center justify-center gap-2">
                          Download Card <Download size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      You don't have a current vibe yet.
                    </p>
                    <Link to="/connect" className="btn-primary">
                      Create Your Vibe
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Minted Vibes Section */}
            <div>
              <div className="card p-6">
                <h2 className="text-2xl font-semibold mb-6">Minted Vibes</h2>
                
                {mintedVibes.length > 0 ? (
                  <div className="space-y-6">
                    {mintedVibes.map((vibe) => (
                      <div key={vibe.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative overflow-hidden rounded-lg flex-shrink-0">
                            <div className={`absolute inset-0 bg-gradient-to-br ${getVibeGradient(vibe.type)}`}></div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold">
                              The {vibe.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </h3>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Minted on {vibe.created.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Link to={`/vibe/${vibe.id}`} className="btn-outline text-sm py-1 px-3">
                            View
                          </Link>
                          <button className="btn-outline text-sm py-1 px-3 flex items-center gap-1">
                            <Share2 size={14} /> Share
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't minted any vibes yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
function getVibeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    'meme-oracle': 'High emoji usage, chaotic energy, and always ahead of the trend curve.',
    'builder': 'Technical casts, frequent GitHub links, and always building in public.',
    'maximalist': 'ETH-aligned, minimal social interaction, strong conviction in your holdings.',
    'degenerate': 'NFT flipper, token hoarder, and always looking for the next moon shot.'
  };
  
  return descriptions[type] || 'A unique Web3 personality based on your onchain and social activity.';
}

function getVibeGradient(type: string): string {
  const gradients: Record<string, string> = {
    'meme-oracle': 'from-purple-500 to-pink-500',
    'builder': 'from-blue-500 to-cyan-500',
    'maximalist': 'from-amber-500 to-orange-500',
    'degenerate': 'from-red-500 to-pink-500',
  };
  
  return gradients[type] || 'from-gray-500 to-gray-600';
}

export default DashboardPage;
