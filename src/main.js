// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* globals localStorage */

import Simplert from 'vue2-simplert-plugin';
import vSelect from 'vue-select';
import Vuetify from 'vuetify';

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App';

import '../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Simplert);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.component('v-select', vSelect);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

export default router;

