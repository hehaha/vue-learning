import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Profile from './components/profile/Profile.vue';
import ProfileDetail from './components/profile/ProfileDetail.vue';
import ProfilePractice from './components/profile/ProfilePractice.vue';
import Homepage from './components/home/Homepage.vue';
import store from './store/Store';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: 'profile'},
    {path: '/profile', component: Profile, name: "profile"},
    {path: '/profile/detail', component: ProfileDetail, name: "profileDetail"},
    {
        path: '/profile/practice',
        component: ProfilePractice,
        name: "ProfilePractice",
    },
    {path: '/home', component: Homepage, name: "home"},
];

const router = new VueRouter({
    routes
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
