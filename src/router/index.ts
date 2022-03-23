import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const Home = () => import('../views/HomePage.vue');
const Form = () => import('../views/DataForm.vue');
const List = () => import('../views/DataList.vue');
const Details = () => import('../views/DataDetails.vue');
const Signin = () => import('../views/AdminSignIn.vue');
const Signup = () => import('../views/AdminSignUp.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'home',
            url: '/',
        },
    },
    {
        path: '/form',
        name: 'form',
        component: Form,
        meta: {
            title: 'form',
            url: '/form',
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
        path: '/details/:account',
        name: 'details',
        component: Details,
        meta: {
            title: 'details',
            url: '/details/:account',
        },
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin,
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
    const publicPages = ['/', '/form', '/signin', '/signup'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');

    if (authRequired && !token) {
        next('/signin');
    } else {
        next();
    }
});

export default router;
