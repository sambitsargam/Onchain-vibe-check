import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const ConnectPage: React.FC = () => {
  const navigate = useNavigate();
  const [farcasterConnected, setFarcasterConnected] = useState(false);
  const [farcasterLoading, setFarcasterLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFarcasterConnect = async () => {
    setFarcasterLoading(true);
    setError('');
    
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFarcasterConnected(true);
      setFarcasterLoading(false);
    } catch (err) {
      setError('Failed to connect to Farcaster. Please try again.');
      setFarcasterLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Connect Your Accounts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Link your wallet and Farcaster account to generate your personalized vibe.
          </p>
        </div>

        <div className="card mb-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Step 1: Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect your Ethereum wallet to analyze your onchain activity.
          </p>
          
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>

        <div className="card mb-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Step 2: Connect Farcaster</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Link your Farcaster account to analyze your social interactions.
          </p>
          
          {farcasterConnected ? (
            <div className="flex items-center justify-center gap-2 text-success-600 mb-4">
              <CheckCircle2 size={20} />
              <span>Farcaster Connected</span>
            </div>
          ) : (
            <button
              onClick={handleFarcasterConnect}
              disabled={farcasterLoading}
              className="btn-secondary w-full"
            >
              {farcasterLoading ? 'Connecting...' : 'Connect Farcaster'}
            </button>
          )}
          
          {error && (
            <div className="mt-4 text-error-600 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!farcasterConnected}
          className={`w-full btn flex items-center justify-center gap-2 ${
            farcasterConnected 
              ? 'btn-primary' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Your Vibe <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  );
};

export default ConnectPage;
