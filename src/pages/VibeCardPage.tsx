import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import VibeCardPreview from '../components/vibe/VibeCardPreview';

const VibeCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [vibe, setVibe] = useState<{
    id: string;
    type: string;
    username: string;
    badges: string[];
    created: Date;
    minted: boolean;
    tokenId?: string;
    txHash?: string;
  } | null>(null);

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated data for demo
      setVibe({
        id: id || 'vibe-2',
        type: 'builder',
        username: 'user.eth',
        badges: ['dao'],
        created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        minted: true,
        tokenId: '42',
        txHash: '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      });
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!vibe) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Vibe Card Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find the vibe card you're looking for.
            </p>
            <Link to="/dashboard" className="btn-primary">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
            <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
          </Link>
        </div>

        <motion.div 
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold">
              {vibe.username}'s Vibe Card
            </h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <VibeCardPreview 
                  type={vibe.type}
                  username={vibe.username}
                  badges={vibe.badges}
                />
              </div>

              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    The {vibe.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {getVibeDescription(vibe.type)}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Generated on {vibe.created.toLocaleDateString()}
                    </div>
                    
                    {vibe.minted && (
                      <>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Token ID: #{vibe.tokenId}
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400">View on Etherscan:</span>
                          <a 
                            href={`https://basescan.org/tx/${vibe.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 inline-flex items-center"
                          >
                            {shortenHash(vibe.txHash || '')}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="btn-outline w-full flex items-center justify-center gap-2">
                    Share <Share2 size={16} />
                  </button>
                  <a 
                    href={`https://opensea.io/assets/base/${getVibeContractAddress()}/${vibe.tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full flex items-center justify-center gap-2"
                  >
                    View on OpenSea <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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

function shortenHash(hash: string): string {
  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
}

function getVibeContractAddress(): string {
  // This would be your actual NFT contract address
  return '0x1234567890123456789012345678901234567890';
}

export default VibeCardPage;
