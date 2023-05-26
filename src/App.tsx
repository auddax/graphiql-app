import React, { useContext } from 'react';
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
import { StoreContext } from './store/StoreProvider';
import { observer } from 'mobx-react-lite';
import { MySkeleton } from './components/Skeleton';

const App = observer(() => {
  const store = useContext(StoreContext);
  return (
    <>
      {store.authStore.loaderIsReady ? <MySkeleton /> : null}
      <Message />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route
          path="/main"
          element={
            <CheckingAuth userAccess={true} otherPath={'/welcome'}>
              <MainPage />
            </CheckingAuth>
          }
        />
        <Route
          path="/auth/:page"
          element={
            <CheckingAuth userAccess={false} otherPath={'/main'}>
              <AuthPage />
            </CheckingAuth>
          }
        />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/welcome"
          element={
            <CheckingAuth>
              <WelcomePage />
            </CheckingAuth>
          }
        />
        <Route
          path="/404"
          element={
            <CheckingAuth>
              <NotFoundPage />
            </CheckingAuth>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
});

export default App;
