import {
  InteractionType,
  PublicClientApplication,
  type PopupRequest,
  type RedirectRequest
} from '@azure/msal-browser';
import { type Router } from 'vue-router';
import { loginRequest, msalInstance } from '../config/auth';

export function registerGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
      console.log(`[Guard.ts] ${to} requires authentication`);
      const request = {
        ...loginRequest,
        redirectStartPage: to.fullPath
      };
      const shouldProceed = await isAuthenticated(msalInstance, InteractionType.Redirect, request);
      console.log(`[Guard.ts] ${to} ${shouldProceed ? 'AUTHORIZED' : 'BLOCKED'}`);
      return shouldProceed;
    }

    return true;
  });
}

export async function isAuthenticated(
  instance: PublicClientApplication,
  interactionType: InteractionType,
  loginRequest: PopupRequest | RedirectRequest
): Promise<boolean> {
  // If your application uses redirects for interaction, handleRedirectPromise must be called and awaited on each page load before determining if a user is signed in or not
  return instance
    .handleRedirectPromise()
    .then(() => {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        return true;
      }

      // User is not signed in and attempting to access protected route. Sign them in.
      if (interactionType === InteractionType.Redirect) {
        return instance
          .loginRedirect(loginRequest)
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      }

      return false;
    })
    .catch(() => {
      return false;
    });
}
