import { createRouter, createWebHistory } from 'vue-router';
import CatImagesPage from '../views/ViewCatsPage.vue';

// Default route to the View Cats Page
const routes = [
  {
    path: '/',
    name: 'CatImages',
    component: CatImagesPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
