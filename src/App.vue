<template>
  <div id="app">
    <v-app>
      <simplert></simplert>
      <navbar></navbar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

import Gruff from './components/Gruff';
import Context from './components/Context';
import ContextManager from './components/ContextManager';
import Claim from './components/Claim';
import ClaimManager from './components/ClaimManager';
import ClaimTags from './components/ClaimTags';

// User
import Profile from './components/Profile';
import Password from './components/Password';

export default {
  name: 'app',
  components: {
    Home,
    Navbar,
    Login,
    Signup,
    Profile,
    Gruff,
    Context,
    ContextManager,
    Claim,
    ClaimManager,
    ClaimTags,
    Password,
  },
};
</script>

<style>
#app {
  font-family: 'MaterialIcons', Roboto, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}

.reset-col {
  margin:0;
  padding:0;
}

.align-center{
  text-align: center;
}

.tags {
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  display: inline;
}

.tags li {
  float: left;
}

.tag {
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: '';
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
}

.tag:hover {
  background-color: crimson;
  color: white;
  text-decoration: none;
}

.tag:hover::after {
  border-left-color: crimson;
}

.hero {
    background-color: #A7A8AA;
    margin-bottom: 40px;
  }

.hero_area {
  height: 140px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 64px;
  color: #fff;
  position: relative;
  z-index: 0;
}

.hero-area__content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  z-index: 0;
}

.tag-page__info {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
}

.tag-page__name {
  font-weight: 400;
  font-size: 45px;
  line-height: 1.2;
  color: inherit;
  text-align: center;
}

@media (max-width: 768px) {
  .tag-page__name {
    font-size: 35px;
  }
}

.form-control, .v-select .dropdown-toggle {
  border: 1px solid #e6e9eb;
  border-radius: 4px;
  box-shadow: none;
  height: 42px;
}

.form-control:focus {
  border-color: #e6e9eb;
  box-shadow: none;
}

.v-select .selected-tag{
  margin: 7px 1px 0 3px;
}

a:hover {
  text-decoration: none;
}

.btn {
  margin: 6px 0px !important;
}
</style>
