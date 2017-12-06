<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <router-link to="/" class="mdl-layout-title" style="color:white; text-decoration: none;">
          Gruff
        </router-link>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
        <!-- <router-link class="mdl-navigation__link"  v-if="!user.authenticated" to="/login">Log in</router-link> -->
          <router-link class="mdl-navigation__link" to="/login" v-if="!user.authenticated">Log in to start your own debate!</router-link>
          <router-link class="mdl-navigation__link" to="/signup" v-if="!user.authenticated">Register</router-link>
          <router-link class="mdl-navigation__link" to="/login" v-if="!user.authenticated">Login</router-link>
          <router-link class="mdl-navigation__link" to="/user" v-if="user.authenticated">Hi, {{user.name}}</router-link>
          <router-link class="mdl-navigation__link" to="/context" v-if="user.authenticated">Context</router-link>
          <a class="mdl-navigation__link" @click="logout()" v-if="user.authenticated">Logout</a>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>

import auth from '../auth';

export default {
  name: 'navbar',
  data() {
    return {
      user: auth.user,
    };
  },

  methods: {
    logout() {
      auth.logout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
