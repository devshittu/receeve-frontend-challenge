import Vue from 'vue';
import Router from 'vue-router';


import Account from '@/views/Account.vue';
import AccountDetail from '@/views/AccountDetail.vue';
import Dashboard from '@/views/Dashboard.vue';
import SignIn from "@/views/SignIn.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/dashboard',
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
            path: '/',
            component: SignIn,
            name: 'signin',
            alias: '/signin',
        },
    ]
});
