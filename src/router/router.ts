import { createRouter, createWebHistory } from 'vue-router';
import { registerGuard } from './Guard';
import LogoutView from '@/views/LogoutView.vue';

const HomeView = () => import('../views/HomeView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    }
  ]
});

registerGuard(router);

export default router;
