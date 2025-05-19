import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import DashboardPage from './pages/DashboardPage';
import VibeCardPage from './pages/VibeCardPage';
import MintPage from './pages/MintPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vibe/:id" element={<VibeCardPage />} />
          <Route path="/mint/:id" element={<MintPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
