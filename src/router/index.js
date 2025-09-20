import { createRouter, createWebHashHistory } from 'vue-router'
import UserDashboard from '../views/UserDashboard.vue';


const routes = [
     {
    path: '/',
    name: 'home',
    component: UserDashboard,
  },{

    path: '/auth/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  { 
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },{
    path: '/user/profile',
    'name': 'profile',
    component: () => import('../views/Profile.vue')
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;