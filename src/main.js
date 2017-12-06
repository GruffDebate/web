// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* globals localStorage */
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App';

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

export default router;

