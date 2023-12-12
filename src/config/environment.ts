type Environment = {
  authClientId: string;
  authRedirectUri: string;
  authTenantName: string;
  authPolicySignUpSignIn: string;
};

export const environment: Environment = {
  authClientId: import.meta.env.VITE_AZURE_AUTH_CLIENT_ID,
  authRedirectUri: import.meta.env.VITE_AZURE_AUTH_REDIRECT_URI,
  authTenantName: import.meta.env.VITE_AZURE_AUTH_TENANT_NAME,
  authPolicySignUpSignIn: import.meta.env.VITE_AZURE_AUTH_POLICY_SIGNUPSIGNIN
};
