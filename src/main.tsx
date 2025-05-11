import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { WagmiConfig } from './components/providers/WagmiProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiConfig>
        <App />
      </WagmiConfig>
    </BrowserRouter>
  </StrictMode>
);