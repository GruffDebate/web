<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great debates.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your email or username"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="submit()">Log In</button>
  </div>
</template>

<script>
import auth from '../auth';

export default {

  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      error: '',
    };
  },

  methods: {
    submit() {
      const credentials = {
        password: this.credentials.password,
      };

      if (this.credentials.email.indexOf('@') !== -1) {
        credentials.email = this.credentials.email;
      } else {
        credentials.username = this.credentials.email;
      }
      auth.login(this, credentials, '/');
    },
  },

};

</script>
