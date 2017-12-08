<template>
  <!-- <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header topbar">
      <div class="mdl-layout__header-row">
        <router-link to="/" class="mdl-layout-title" style="color:#333; font-size: 30px; text-decoration: none;">
          Gruff
        </router-link>

        <router-link class="mdl-navigation__link topbar-item" to="/" style="margin-left: 25px;">Home</router-link>
        <router-link class="mdl-navigation__link topbar-item" to="/context" v-if="user.authenticated">Contexts</router-link>
        <router-link class="mdl-navigation__link topbar-item" to="/claim" v-if="user.authenticated">Claims</router-link>
        <router-link class="mdl-navigation__link topbar-item" to="/login" v-if="!user.authenticated">Start your own debate!</router-link>

        <div class="mdl-layout-spacer"></div>

        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <router-link class="mdl-navigation__link topbar-item" to="/signup" v-if="!user.authenticated">Register</router-link>
          <router-link class="mdl-navigation__link topbar-item" to="/login" v-if="!user.authenticated">Login</router-link>

          <v-menu offset-y>
            <v-btn color="primary" dark slot="activator">Dropdown</v-btn>
            <v-list>
              <v-list-tile @click="">
                <v-list-tile-title>
                  <router-link class="mdl-navigation__link topbar-item" to="/user" v-if="user.authenticated">Profile</router-link>
                </v-list-tile-title>
                <v-list-tile-title>
                  <a class="mdl-navigation__link topbar-item" @click="logout()" v-if="user.authenticated">Logout</a>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </nav>
      </div>
    </header>
  </div> -->
  <v-toolbar height="64" flat class="topbar">
    <v-toolbar-title>
      <router-link to="/" class="logo">Gruff</router-link>
    </v-toolbar-title>
    <v-toolbar-title>
      <router-link class="topbar-item" to="/" style="margin-left: 25px;">Home</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated">
      <router-link class="topbar-item" to="/context" style="margin-left: 25px;">Contexts</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated">
      <router-link class="topbar-item" to="/claim" style="margin-left: 25px;">Claims</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="!user.authenticated">
      <router-link class="topbar-item" to="/login" style="margin-left: 25px;">Start your own debate!</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-title v-if="!user.authenticated">
      <router-link class="topbar-item" to="/login">Log in</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="!user.authenticated">
      <router-link class="topbar-item" to="/login">Sign up</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated">
      <router-link class="topbar-item" to="/user">Hi, {{user.name}}</router-link>
    </v-toolbar-title>
    <v-toolbar-title v-if="user.authenticated">
      <router-link class="topbar-item" to="/user" style="margin-left: 25px;">Logout</router-link>
    </v-toolbar-title>
    <!-- <v-menu offset-y>
      <v-btn color="primary" dark slot="activator" class="purple">
        Hi, {{user.name}}
      </v-btn>
      <v-list>
        <v-list-tile @click="">
          <v-list-tile-title>
            <router-link class="topbar-item" to="/user" v-if="user.authenticated">Profile</router-link>
          </v-list-tile-title>
          <v-list-tile-title>
            <a class="topbar-item" @click="logout()" v-if="user.authenticated">Logout</a>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu> -->
    <!-- <v-toolbar-items class="hidden-sm-and-down">
      <v-btn outline color="primary">Log in</v-btn>
      <v-btn color="primary">Sign up</v-btn>
    </v-toolbar-items> -->
  </v-toolbar>
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
  }

  .topbar-item:hover {
    color: #3d3d3d;
  }

  .mdl-layout__header-row {
    padding: 0 25px 0 25px;
  }
</style>
