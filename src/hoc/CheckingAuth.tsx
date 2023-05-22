import { useLocation, Navigate, redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';

const CheckingAuth = ({
  children,
  auth,
  otherPath,
}: {
  children: JSX.Element;
  auth: boolean;
  otherPath: string;
}) => {
  const store = useContext(StoreContext);
  if (store.authStore.login === !auth) {
    return <Navigate to={`${otherPath}`} />;
  }
  return children;
};

export { CheckingAuth };