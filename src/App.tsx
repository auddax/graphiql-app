import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import WelcomePage from './pages/WelcomePage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Message from './components/Message';
import { CheckingAuth } from './hoc/CheckingAuth';

const App = () => {
  return (
    <>
      <Message />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route
          path="/main"
          element={
            <CheckingAuth auth={true} otherPath={'/auth/login'}>
              <MainPage />
            </CheckingAuth>
          }
        />
        <Route
          path="/auth/:page"
          element={
            <CheckingAuth auth={false} otherPath={'/welcome'}>
              <AuthPage />
            </CheckingAuth>
          }
        />
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
