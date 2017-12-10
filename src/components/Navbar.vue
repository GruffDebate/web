<template>
  <v-toolbar height="64" flat class="topbar">
    <v-toolbar-title>
      <router-link to="/" class="logo">GRUFF</router-link>
    </v-toolbar-title>
    <v-toolbar-title class="hidden-sm-and-down">
      <router-link class="topbar-item" to="/" style="margin-left: 25px;">Home</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated" class="hidden-sm-and-down">
      <router-link class="topbar-item" to="/context" style="margin-left: 25px;">Contexts</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated" class="hidden-sm-and-down">
      <router-link class="topbar-item" to="/claim" style="margin-left: 25px;">Claims</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="!user.authenticated" class="hidden-sm-and-down">
      <router-link class="topbar-item" to="/login" style="margin-left: 25px;">Start your own debate!</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-title v-if="!user.authenticated" class="hidden-sm-and-down">
      <v-btn @click="go('/login')" outline color="primary" slot="activator" class="blue radius">
        Log in
      </v-btn>
    </v-toolbar-title>
    <v-toolbar-title v-if="!user.authenticated" class="hidden-sm-and-down">
      <v-btn @click="go('/signup')" color="primary" dark slot="activator" class="blue radius">
        Sign up
      </v-btn>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated" class="hidden-sm-and-down">
      <router-link class="topbar-item" to="/user">Hi, {{user.name}}</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated" class="hidden-sm-and-down">
      <a class="topbar-item" @click="logout()" style="margin-left: 25px;">Logout</a>
    </v-toolbar-title>

    <v-menu offset-y class="hidden-md-and-up" transition="slide-x-transition" bottom right>
      <v-toolbar-side-icon slot="activator">
      </v-toolbar-side-icon>

      <v-list>
        <v-list-tile v-if="user.authenticated">
          <v-list-tile-title>
            <router-link to="/user">Hi, {{user.name}}</router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="user.authenticated" class="line"></v-divider>
        <v-list-tile>
          <v-list-tile-title>
            <router-link to="/">Home</router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="user.authenticated">
          <v-list-tile-title>
            <router-link to="/claim">Claims</router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="user.authenticated">
          <v-list-tile-title>
            <router-link to="/context">Contexts</router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="user.authenticated" class="line"></v-divider>
        <v-list-tile v-if="user.authenticated">
          <v-list-tile-title>
            <a @click="logout()">Logout</a>
          </v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="!user.authenticated" class="line"></v-divider>
        <v-list-tile v-if="!user.authenticated">
          <v-list-tile-title>
            <router-link to="/login">Log in</router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="!user.authenticated" class="line"></v-divider>
        <v-list-tile v-if="!user.authenticated">
          <v-list-tile-title>
            <router-link to="/login">Sign up</router-link>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>

import auth from '../auth';
import router from '../router';

export default {
  name: 'navbar',
  data() {
    return {
      user: auth.user,
      drawer: false,
    };
  },

  methods: {
    logout() {
      auth.logout();
    },

    go(page) {
      router.push(page);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    color:#333;
    font-size: 30px;
    text-decoration: none;
  }

  .topbar {
    background-color: #fff;
    border-bottom: 1px solid #f1f3f4;
  }

  .topbar-item {
    font-weight: 400;
    font-size: 19px;
    line-height: 1.5;
    color: #a9b0b8;
    text-decoration: none;
    cursor: pointer;
  }

  .topbar-item:hover {
    color: #3d3d3d;
  }

  .mdl-layout__header-row {
    padding: 0 25px 0 25px;
  }

  .radius {
    border-radius: 4px;
  }

  ul {
    margin-bottom: 0;
  }

  .line {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .list__tile {
    height: 30px;
  }
</style>
