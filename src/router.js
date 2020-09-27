import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('./views/login.vue');
const NotFound = () => import('./views/404');

const HospitalList = () => import('./views/hospitalList.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'hospitals',
        component: HospitalList,
      },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound,
      },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;