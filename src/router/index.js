import { createRouter, createWebHashHistory } from 'vue-router';

const Form = () => import('../views/data-form.vue');
const List = () => import('../views/data-list.vue');
const Details = () => import('../views/data-details.vue');
const Login = () => import('../views/admin-login.vue');

const routes = [
  {
    path: '/',
    name: 'form',
    component: Form,
    meta: {
      title: 'form',
      url: '/',
    },
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      title: 'list',
      url: '/list',
    },
  },
  {
    path: '/details',
    name: 'details',
    component: Details,
    meta: {
      title: 'details',
      url: '/details',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'login',
      url: '/login',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

export default router;
