import { environment } from '@/config/environment';
import {
  BrowserCacheLocation,
  LogLevel,
  type Configuration,
  type RedirectRequest,
  PublicClientApplication
} from '@azure/msal-browser';

export const b2cPolicies = {
  names: {
    signUpSignIn: environment.authPolicySignUpSignIn
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${environment.authTenantName}.b2clogin.com/${environment.authTenantName}.onmicrosoft.com/${environment.authPolicySignUpSignIn}`
    }
  },
  authorityDomain: `${environment.authTenantName}.b2clogin.com`
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.authClientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: environment.authRedirectUri
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage
  },
  system: {
    allowRedirectInIframe: true,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

const apiConfig = {
  b2cScopes: {
    datasynqApi: [
      `https://${environment.authTenantName}.onmicrosoft.com/DataSynqAPI/DataSynqAPI.Read`
    ]
  }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest: RedirectRequest = {
  scopes: ['openid', ...apiConfig.b2cScopes.datasynqApi]
};

export const msalInstance = new PublicClientApplication(msalConfig);
