import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BarChart2, Share2, Star } from 'lucide-react';
import VibeCardPreview from '../components/vibe/VibeCardPreview';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]" />
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <motion.h1 
                className="text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="gradient-text">Onchain Vibe Check</span>
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-xl mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Turn your onchain and Farcaster activity into a beautifully animated, 
                shareable identity card. Mint it as an NFT on Base.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/connect" className="btn-primary flex items-center gap-2">
                  Get Your Vibe <ArrowRight size={16} />
                </Link>
                <Link to="/dashboard" className="btn-outline text-white">
                  Explore Vibes
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <VibeCardPreview 
                type="meme-oracle" 
                username="vitalik.eth"
                badges={['og', 'dao']}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Express your Web3 personality through a beautifully designed, 
              dynamic card based on your social and wallet behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Zap className="text-primary-500" />}
              title="Connect"
              description="Link your Farcaster identity and crypto wallet to begin the analysis."
            />
            <FeatureCard 
              icon={<BarChart2 className="text-primary-500" />}
              title="Analyze"
              description="We'll analyze your activity to determine your unique Web3 vibe type."
            />
            <FeatureCard 
              icon={<Star className="text-primary-500" />}
              title="Mint"
              description="Mint your personalized vibe card as an NFT on Base with low gas fees."
            />
            <FeatureCard 
              icon={<Share2 className="text-primary-500" />}
              title="Share"
              description="Share your unique vibe card on Farcaster and compare with friends."
            />
          </div>
        </div>
      </section>

      {/* Vibe Types Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Discover Your Vibe</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Based on your onchain activity and social behavior, you'll be assigned one of these personality types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <VibeTypeCard 
              type="meme-oracle"
              title="The Meme Oracle"
              description="High emoji usage, chaotic energy, and always ahead of the trend curve."
            />
            <VibeTypeCard 
              type="builder"
              title="The Builder"
              description="Technical casts, frequent GitHub links, and always building in public."
            />
            <VibeTypeCard 
              type="maximalist"
              title="The Maximalist"
              description="ETH-aligned, minimal social interaction, strong conviction in your holdings."
            />
            <VibeTypeCard 
              type="degenerate"
              title="The Degenerate"
              description="NFT flipper, token hoarder, and always looking for the next moon shot."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-white">Ready to Discover Your Vibe?</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
            Connect your accounts now and get your personalized vibe card. 
            Share it with your friends and mint it as an NFT on Base.
          </p>
          <Link to="/connect" className="btn bg-white text-primary-600 hover:bg-gray-100 flex items-center gap-2 mx-auto w-fit">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="card p-6 h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="mb-4 p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg w-fit">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

interface VibeTypeCardProps {
  type: string;
  title: string;
  description: string;
}

const VibeTypeCard: React.FC<VibeTypeCardProps> = ({ type, title, description }) => {
  const gradients: Record<string, string> = {
    'meme-oracle': 'from-purple-500 to-pink-500',
    'builder': 'from-blue-500 to-cyan-500',
    'maximalist': 'from-amber-500 to-orange-500',
    'degenerate': 'from-red-500 to-pink-500',
  };

  return (
    <motion.div 
      className="card overflow-hidden h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`h-32 bg-gradient-to-r ${gradients[type]}`}></div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default HomePage;
