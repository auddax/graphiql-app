import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import WelcomePage from './pages/WelcomePage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
