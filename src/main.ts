import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/router';
import { msalInstance } from './config/auth';
import { EventType, type AuthenticationResult } from '@azure/msal-browser';
import { CustomNavigationClient } from './router/NavigationClient';
import { msalPlugin } from './plugins/msalPlugin';

// The next 2 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
const navigationClient = new CustomNavigationClient(router);
msalInstance.setNavigationClient(navigationClient);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

console.log('[main.ts] Creating Vue app...');

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(msalPlugin, msalInstance);

console.log('[main.ts] Awaiting router ready event!');
router.isReady().then(() => {
  console.log('[main.ts] Router is ready!');
  console.log('[main.ts] Mounting Vue app ...');
  app.mount('#app');
  console.log('[main.ts] Vue app mounted!');
});
