export interface Token{
  aud: string;
  email: string;
  exp: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":string[];
  iss: string;
  nbf: string;
}