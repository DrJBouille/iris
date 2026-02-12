import keycloak from './keycloak';
import { JSX } from 'react';
import { useSyncUser } from './useSyncUser';
import { AuthContext } from './auth-context';

function AuthProvider({ children }: { children: JSX.Element }) {
  if (!keycloak.authenticated) {
    keycloak.login({
      redirectUri: window.location.href,
    });
    return null;
  }

  const { user, loading } = useSyncUser();
  if (loading || !user) return null;

  return <AuthContext value={user}>
    {children}
  </AuthContext>
}

export default AuthProvider;
