import {
  InteractionStatus,
  type AccountInfo,
  type IPublicClientApplication
} from '@azure/msal-browser';
import { getCurrentInstance, toRefs, type Ref } from 'vue';

export type MsalContext = {
  instance: IPublicClientApplication;
  accounts: Ref<AccountInfo[]>;
  inProgress: Ref<InteractionStatus>;
};

export function useMsal(): MsalContext {
  const internalInstance = getCurrentInstance();
  if (!internalInstance) {
    throw 'useMsal() cannot be called outside the setup() function of a component';
  }

  if (!('$msal' in internalInstance.appContext.config.globalProperties)) {
    throw 'Please install the msalPlugin';
  }

  const { instance, accounts, inProgress } = toRefs(
    internalInstance.appContext.config.globalProperties.$msal
  );

  if (inProgress.value === InteractionStatus.Startup) {
    instance.value.initialize().then(() => {
      instance.value.handleRedirectPromise().catch(() => {
        // Errors should be handled by listening to the LOGIN_FAILURE event
        return;
      });
    });
  }

  return {
    instance: instance.value,
    accounts,
    inProgress
  };
}
