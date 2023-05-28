import { Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../store/StoreProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const CheckingAuth = ({
  children,
  userAccess,
  otherPath,
}: {
  children: JSX.Element;
  userAccess?: boolean;
  otherPath?: string;
}) => {
  const store = useContext(StoreContext);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    store.authStore.onAuthState();
  }, []);

  useEffect(() => {
    if (loading) {
      store.authStore.toggleLoader(true);
      return;
    }
    store.authStore.toggleLoader(false);
    store.authStore.toggleLogin(!!user);
  }, [user, loading]);

  if (loading) return null;

  if (otherPath === '404') {
    if (store.authStore.user.token && !user) {
      return <Navigate to={'/welcome'} />;
    }
  }

  if (otherPath && !!user === !userAccess && otherPath !== '404')
    if (store.authStore.user.token && !user) {
      store.authStore.clearUser();
      return <Navigate to={'/welcome'} />;
    } else {
      return <Navigate to={`${otherPath}`} />;
    }

  return children;
};

export { CheckingAuth };