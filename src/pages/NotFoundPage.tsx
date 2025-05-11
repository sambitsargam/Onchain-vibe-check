import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center">
      <motion.div 
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
            <span className="text-6xl">🤔</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you're looking for. The link might be broken,
          or the page may have been removed.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <HomeIcon size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;