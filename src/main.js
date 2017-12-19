// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* globals localStorage, window */

import Simplert from 'vue2-simplert-plugin';
import vSelect from 'vue-select';
import Vuetify from 'vuetify';
import SocialSharing from 'vue-social-sharing';
import axios from 'axios';

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App';

import '../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Simplert);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(SocialSharing);
Vue.component('v-select', vSelect);

axios.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('gruff_token');
    router.replace('/login');
    window.location.reload();
    return Promise.reject(error);
  }
  return Promise.resolve();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

export default router;

