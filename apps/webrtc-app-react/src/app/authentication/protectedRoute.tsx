import keycloak from './keycloak';
import { JSX } from 'react';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!keycloak.authenticated) {
    keycloak.login({
      redirectUri: window.location.href,
    });
    return null;
  }

  return children;
}

export default ProtectedRoute;
