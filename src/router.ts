import Vue from 'vue';
import Router from 'vue-router';


import Account from '@/views/Account.vue';
import AccountDetail from '@/views/AccountDetail.vue';
import Dashboard from '@/views/Dashboard.vue';
import Login from "@/views/Login.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Dashboard,
            name: 'dashboard',
            alias: '/home',
            // children: [
            //     { path: 'detail', component: AccountDetail, name: 'new' }
            // ]
        },
        {
            path: '/accounts',
            component: Account,
            name: 'account',
        },
        {
            path: '/accounts/:accountId/details/',
            component: AccountDetail,
            name: 'account-details'
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
        },
    ]
});
