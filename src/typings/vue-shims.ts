import type { MsalContext } from '@/plugins/msalPlugin';

declare module 'vue' {
  interface ComponentCustomProperties {
    $msal: MsalContext;
  }
}
