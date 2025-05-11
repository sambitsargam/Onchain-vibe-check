import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
import VibeCardPreview from '../components/vibe/VibeCardPreview';

const MintPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [vibe, setVibe] = useState<{
    id: string;
    type: string;
    username: string;
    badges: string[];
  } | null>(null);
  
  const [mintState, setMintState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated data for demo
      setVibe({
        id: id || 'vibe-1',
        type: 'meme-oracle',
        username: 'user.eth',
        badges: ['dao', 'og'],
      });
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [id]);

  const handleMint = async () => {
    setMintState('loading');
    setError(null);
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful transaction
      setTxHash('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef');
      setMintState('success');
      
      // Navigate to the dashboard after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setMintState('error');
      setError('Failed to mint your NFT. Please try again.');
    }
  };

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
              Mint Your Vibe Card
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
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {getVibeDescription(vibe.type)}
                  </p>

                  <div className="mb-6 space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold mb-2">Mint Details</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Network</span>
                          <span>Base</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Gas Fee (est.)</span>
                          <span>~0.0001 ETH</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Mint Price</span>
                          <span>Free</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {mintState === 'idle' && (
                    <button 
                      onClick={handleMint}
                      className="btn-primary w-full"
                    >
                      Mint on Base
                    </button>
                  )}
                  
                  {mintState === 'loading' && (
                    <button 
                      disabled
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Minting...
                    </button>
                  )}
                  
                  {mintState === 'success' && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-success-600 mb-4">
                        <Check size={20} className="text-success-500" />
                        <span className="font-semibold">Minted Successfully!</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Your Vibe Card has been successfully minted on Base.
                        Redirecting to dashboard...
                      </p>
                      {txHash && (
                        <a 
                          href={`https://basescan.org/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:underline text-sm"
                        >
                          View on Basescan
                        </a>
                      )}
                    </div>
                  )}
                  
                  {mintState === 'error' && (
                    <div>
                      <div className="flex items-center justify-center gap-2 text-error-600 mb-4">
                        <AlertCircle size={20} />
                        <span className="font-semibold">Minting Failed</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                        {error}
                      </p>
                      <button 
                        onClick={handleMint}
                        className="btn-primary w-full"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                  
                  <Link to="/dashboard" className="btn-outline block w-full text-center">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper function
function getVibeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    'meme-oracle': 'High emoji usage, chaotic energy, and always ahead of the trend curve.',
    'builder': 'Technical casts, frequent GitHub links, and always building in public.',
    'maximalist': 'ETH-aligned, minimal social interaction, strong conviction in your holdings.',
    'degenerate': 'NFT flipper, token hoarder, and always looking for the next moon shot.'
  };
  
  return descriptions[type] || 'A unique Web3 personality based on your onchain and social activity.';
}

export default MintPage;