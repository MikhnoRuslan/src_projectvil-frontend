export const baseUrl = 'http://localhost:4200';
export const issuer = 'https://localhost:44377';
export const scope = 'AuthApi IdentityApi PetProjectApi GetWayApi';
export const url = 'https://localhost:44387';

export const AppConfig = {
  baseUrl: baseUrl,
  issuer: issuer,
  redirectUri: baseUrl,
  clientId: 'react-client-id',
  scope: scope,
  requireHttps: true,
  secret: 'ProjectivSecret',
  url: url
};
