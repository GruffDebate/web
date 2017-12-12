<template>
  <div class="container">
    <div class="col-md-8 col-md-offset-2">
      <h3 style="text-align:left; margin-bottom:30px">Manage Password</h3>
      <div class="form-group">
        <label>Old Password</label>
        <input type="password" class="form-control" placeholder="Old Password" v-model="model.oldpassword"></input>
      </div>
      <div class="form-group">
        <label>New Password</label>
        <input type="password" class="form-control" placeholder="New Password" v-model="model.newpassword">
      </div>
      <v-btn @click="save()" color="primary" dark slot="activator" class="blue radius">
        Save
      </v-btn>
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

  methods: {
    save() {
      axios.put(`${API_URL}/users/password`, this.model).then(() => {
        this.backPage();
      }, (err) => {
        if (err.response.data.code === -1000) {
          const obj = {
            title: 'Error',
            message: 'Verify if your password is correct.',
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
