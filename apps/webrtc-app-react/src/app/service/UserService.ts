import keycloak from '../authentication/keycloak';

export async function fetchOnlineUsers() {
  if (!keycloak.authenticated) {
    await keycloak.login();
  }

  const response = await fetch('http://localhost:9000/api/users', {
    headers: {
      'Authorization': `Bearer ${keycloak.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
