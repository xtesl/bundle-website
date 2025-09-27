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
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/AdminDashboard.vue"),

  },{
     path: '/auth/register-agent',
     component: () => import('../views/AgentRegistration.vue'),
     name: 'register-agent'
  },
  {  
     path: "/user/orders",
     component: () => import('../views/Orders.vue'),
     name: "orders"
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;