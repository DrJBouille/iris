import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import keycloak from './keycloak';
import { User } from './type/User';

export function useSyncUser() {
  const synced = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keycloak.authenticated) return;
    if (synced.current) return;

    synced.current = true
    setLoading(true)

    axios.get("http://localhost:9000/api/users/me", {
      headers: { Authorization: `Bearer ${keycloak.token}` }
    }).then((response) => {
      setUser(response.data)
      synced.current = true
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [keycloak?.authenticated]);

  return { user, loading }
}
