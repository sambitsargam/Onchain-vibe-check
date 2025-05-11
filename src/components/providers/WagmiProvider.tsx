import React, { ReactNode } from 'react';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createConfig, WagmiConfig as WagmiConfigProvider } from 'wagmi';
import { base, baseGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [base, baseGoerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Onchain Vibe Check',
  projectId: 'vibe-check-app', // Use environment variable in production
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

interface WagmiConfigProps {
  children: ReactNode;
}

export const WagmiConfig = ({ children }: WagmiConfigProps) => {
  return (
    <WagmiConfigProvider config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#8B5CF6', // Primary color from our theme
          accentColorForeground: 'white',
          borderRadius: 'medium'
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfigProvider>
  );
};