/* globals localStorage */
/* eslint-disable no-new */

import VueRouter from 'vue-router';
import axios from 'axios';
import auth from './auth';
import App from './App';

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

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App.components.Home },
    { path: '/tags/:id', component: App.components.ClaimTags },
    { path: '/gruff/:id', component: App.components.Gruff },
    { path: '/profile', component: App.components.Profile, beforeEnter: requireAuth },
    { path: '/password', component: App.components.Password, beforeEnter: requireAuth },
    { path: '/context', component: App.components.Context, beforeEnter: requireAuth },
    { path: '/context/:id', component: App.components.ContextManager, beforeEnter: requireAuth },
    { path: '/claim', component: App.components.Claim, beforeEnter: requireAuth },
    { path: '/claim/:id', component: App.components.ClaimManager, beforeEnter: requireAuth },
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
