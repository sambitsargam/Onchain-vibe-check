import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu, X, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white dark:bg-gray-900 shadow-md py-2'
      : 'bg-transparent py-4'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Zap size={28} className="text-primary-500" />
            <span className="text-xl font-bold gradient-text">Vibe Check</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink href="/" label="Home" />
              <NavLink href="/dashboard" label="Dashboard" />
            </div>
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted
              }) => (
                <div className="flex items-center gap-4">
                  {(() => {
                    if (!mounted || !account || !chain) {
                      return (
                        <button 
                          onClick={openConnectModal} 
                          className="btn-primary text-sm"
                        >
                          Connect
                        </button>
                      );
                    }
                    return (
                      <button 
                        onClick={openAccountModal}
                        className="btn-outline text-sm"
                      >
                        {account.displayName}
                      </button>
                    );
                  })()}
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg"
                    aria-label="Toggle menu"
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              )}
            </ConnectButton.Custom>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in-down">
            <div className="flex flex-col space-y-4 py-2">
              <MobileNavLink href="/" label="Home" />
              <MobileNavLink href="/dashboard" label="Dashboard" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`font-medium transition-colors hover:text-primary-600 ${
        isActive 
          ? 'text-primary-500' 
          : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`block py-2 font-medium ${
        isActive 
          ? 'text-primary-500' 
          : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;