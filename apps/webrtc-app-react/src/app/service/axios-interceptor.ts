import axios from 'axios';
import keycloak from '../authentication/keycloak';

const authenticatedAPI = axios.create({
  baseURL : import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

authenticatedAPI.interceptors.request.use(async (config) => {
  if (keycloak.isTokenExpired) await keycloak.updateToken(30);
  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});

export { authenticatedAPI };
