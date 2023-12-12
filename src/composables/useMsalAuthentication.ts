import {
  AuthError,
  InteractionStatus,
  InteractionType,
  type AuthenticationResult,
  type PopupRequest,
  type RedirectRequest,
  type SilentRequest
} from '@azure/msal-browser';
import { ref, watch, type Ref } from 'vue';
import { useMsal } from './useMsal';

export type MsalAuthenticationResult = {
  acquireToken: (requestOverride?: PopupRequest | RedirectRequest | SilentRequest) => Promise<void>;
  result: Ref<AuthenticationResult | null>;
  error: Ref<AuthError | null>;
  inProgress: Ref<boolean>;
};

export function useMsalAuthentication(
  interactionType: InteractionType,
  request: PopupRequest | RedirectRequest | SilentRequest
): MsalAuthenticationResult {
  const { instance, inProgress } = useMsal();

  const localInProgress = ref<boolean>(false);
  const result = ref<AuthenticationResult | null>(null);
  const error = ref<AuthError | null>(null);

  const acquireToken = async (requestOverride?: PopupRequest | RedirectRequest | SilentRequest) => {
    if (!localInProgress.value) {
      localInProgress.value = true;
      const tokenRequest = requestOverride || request;

      if (
        inProgress.value === InteractionStatus.Startup ||
        inProgress.value === InteractionStatus.HandleRedirect
      ) {
        try {
          const response = await instance.handleRedirectPromise();
          if (response) {
            result.value = response;
            error.value = null;
            return;
          }
        } catch (e) {
          result.value = null;
          error.value = e as AuthError;
          return;
        }
      }

      try {
        const response = await instance.acquireTokenSilent(tokenRequest);
        result.value = response;
        error.value = null;
      } catch (e) {
        if (inProgress.value !== InteractionStatus.None) {
          return;
        }
        if (interactionType === InteractionType.Redirect) {
          await instance.loginRedirect(tokenRequest).catch((e) => {
            error.value = e;
            result.value = null;
          });
        }
      }
      localInProgress.value = false;
    }
  };

  const stopWatcher = watch(inProgress, () => {
    if (!result.value && !error.value) {
      acquireToken();
    } else {
      stopWatcher();
    }
  });

  acquireToken();

  return {
    acquireToken,
    result,
    error,
    inProgress: localInProgress
  };
}
