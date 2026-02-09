import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import keycloak from './app/authentication/keycloak';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

keycloak.init({
  onLoad: 'check-sso',
  pkceMethod: 'S256',
}).then(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
