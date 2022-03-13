import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const Form = () => import('../views/DataForm.vue');
const List = () => import('../views/DataList.vue');
const Details = () => import('../views/DataDetails.vue');
const Login = () => import('../views/AdminLogin.vue');
const Signup = () => import('../views/AdminSignUp.vue');

const routes: Array<RouteRecordRaw> = [
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
        path: '/signin',
        name: 'signin',
        component: Login,
        meta: {
            title: 'signin',
            url: '/signin',
        },
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: {
            title: 'signup',
            url: '/signup',
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
        return {
            left: 0,
            top: 0,
        };
    },
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/signin', '/signup'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');

    if (authRequired && !token) {
        next('/signin');
    } else {
        next();
    }
});

export default router;
