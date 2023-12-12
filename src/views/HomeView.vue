<script setup lang="ts">
import SignInButton from '@/components/SignInButton.vue';
import SignOutButton from '@/components/SignOutButton.vue';
import WelcomeName from '@/components/WelcomeName.vue';
import { useIsAuthenticated } from '@/composables/useIsAuthenticated';

const isAuthenticated = useIsAuthenticated();
</script>

<template>
  <main>
    <div v-if="isAuthenticated">
      <WelcomeName />
      <SignOutButton />
    </div>
    <div v-else>
      <SignInButton />
    </div>
  </main>
</template>
