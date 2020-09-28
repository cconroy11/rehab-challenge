import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('./views/login.vue');
const NotFound = () => import('./views/404');

const HospitalList = () => import('./views/hospitalList.vue');
const HospitalDetails = () => import('./views/hospitalDetails.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'hospitals',
        component: HospitalList,
    },
    {
        path: '/hospital/:id',
        name: 'hospital-details',
        component: HospitalDetails,
        props: true
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

export default router;