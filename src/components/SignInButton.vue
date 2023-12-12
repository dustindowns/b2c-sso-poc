<script setup lang="ts">
import { useMsal } from '@/composables/useMsal';
import { loginRequest } from '@/config/auth';

const { instance } = useMsal();

const signIn = () => instance.loginRedirect(loginRequest);
</script>

<template>
  <button @click="signIn">Sign In</button>
</template>
