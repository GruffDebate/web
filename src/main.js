// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* globals localStorage */
import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import App from './App';
import auth from './auth';

Vue.use(VueRouter);
// Vue.prototype.$http = instance;

/* eslint-disable no-new */
const storage = localStorage.getItem('gruff_token');
let token = '';
axios.defaults.headers.common['X-Gruff'] = 'Gruff';

if (storage !== null) {
  auth.loggedIn();
  token = JSON.parse(storage).token;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App.components.Home },
    { path: '/gruff/:id', component: App.components.Gruff },
    { path: '/user', component: App.components.User, beforeEnter: requireAuth },
    { path: '/context', component: App.components.Context, beforeEnter: requireAuth },
    { path: '/context/manager/:id', component: App.components.ContextManager, beforeEnter: requireAuth },
    { path: '/login', component: App.components.Login },
    { path: '/signup', component: App.components.Signup },
    { path: '/logout',
      beforeEnter(to, from, next) {
        auth.logout();
        next('/');
      },
    },
  ],
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

export default router;

