<template>
  <div id="app">
    <simplert></simplert>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Gruff from './components/Gruff';
import Context from './components/Context';
import ContextManager from './components/ContextManager';
import Claim from './components/Claim';
import ClaimManager from './components/ClaimManager';
import ClaimTags from './components/ClaimTags';

export default {
  name: 'app',
  components: {
    Home,
    Navbar,
    Login,
    Signup,
    User,
    Gruff,
    Context,
    ContextManager,
    Claim,
    ClaimManager,
    ClaimTags,
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
</style>
