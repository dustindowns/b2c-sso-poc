<script setup lang="ts">
import { useMsal } from '@/composables/useMsal';
import { BrowserUtils } from '@azure/msal-browser';

const { instance } = useMsal();

const signOut = () =>
  instance.logoutRedirect({ onRedirectNavigate: () => !BrowserUtils.isInIframe() });
</script>

<template>
  <button @click="signOut">Sign Out</button>
</template>
