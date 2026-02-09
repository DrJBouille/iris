import { useEffect, useRef } from 'react';
import axios from 'axios';
import keycloak from './keycloak';

export function useSyncUser() {
  const synced = useRef(false)

  useEffect(() => {
    if (!keycloak.authenticated) return;
    if (synced.current) return;

    synced.current = true

    axios.get("http://localhost:9000/api/users/me", {
      headers: { Authorization: `Bearer ${keycloak.token}` }
    }).then(() => {
      synced.current = true
    }).catch(console.error);
  }, [keycloak?.authenticated]);
}
