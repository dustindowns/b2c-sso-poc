<script setup lang="ts">
import { useMsal } from '@/composables/useMsal';
import { BrowserUtils } from '@azure/msal-browser';
import { onMounted } from 'vue';

console.log('[LogoutView.vue] Component is loaded.');
console.log(`[LogoutView.vue] Component is in iframe: ${BrowserUtils.isInIframe()}`);

const { instance } = useMsal();

onMounted(async () => {
  console.log('[LogoutView.vue] Component is mounted.');

  await instance.initialize();
  await instance.handleRedirectPromise();

  console.log('[LogoutView.vue] Logging out ...');
  instance.logoutRedirect({
    onRedirectNavigate: () => !BrowserUtils.isInIframe(),
    postLogoutRedirectUri: '/'
  });
});
</script>

<template>
  <main>Logging out...</main>
</template>
