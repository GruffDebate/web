<template>
  <div class="container-fluid">
    <div class="col-md-8 col-md-offset-2">
      <h3 style="text-align:left; margin-bottom:30px">User Settings</h3>
      <div class="form-group">
        <h4>Username: {{model.username}}</h4>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" placeholder="Email" v-model="model.email"></input>
      </div>
      <div class="form-group">
        <label>Url</label>
        <input type="text" class="form-control" placeholder="Url" v-model="model.url">
      </div>
      <button @click="save()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Save</button>
      <button @click="backPage()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

/* eslint-disable no-undef */
const API_URL = API;

export default {
  data() {
    return {
      model: {},
    };
  },

  created() {
    this.get();
  },

  methods: {
    get() {
      axios.get(`${API_URL}/users/me`).then((response) => {
        this.model = response.data;
      });
    },

    save() {
      axios.put(`${API_URL}/users/me`, this.model).then(() => {
        this.backPage();
      }, (err) => {
        if (err.response.data.code === -2005) {
          const obj = {
            title: 'Error',
            message: err.response.data.message,
            type: 'error',
          };
          this.$Simplert.open(obj);
        }
      });
    },

    backPage() {
      router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
