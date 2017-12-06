<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Sign Up</h2>
    <p>Sign up for a free account to get some great debates.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your name"
        v-model="credentials.name"
      >
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your username"
        v-model="credentials.username"
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
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="submit()">Sign Up</button>

  </div>
</template>

<script>
import auth from '../auth';

export default {

  data() {
    return {
      credentials: {
        name: '',
        email: '',
        username: '',
        password: '',
      },
      error: '',
    };
  },

  methods: {
    submit() {
      const credentials = {
        name: this.credentials.name,
        email: this.credentials.email,
        username: this.credentials.username,
        password: this.credentials.password,
      };
      auth.signup(this, credentials, '/');
    },
  },
};

</script>