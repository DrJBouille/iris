import Keycloak from "keycloak-js";

// @ts-ignore
const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "iris-dev",
  clientId: "frontend",
});

export default keycloak;
