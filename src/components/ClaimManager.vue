<template>
  <div class="container-fluid">
    <div class="col-md-8 col-md-offset-2">
      <h3 style="text-align:left; margin-bottom:30px">Create/Edit a claim</h3>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" placeholder="Title" v-model="model.title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" placeholder="Description" v-model="model.desc" rows="4"></textarea>
      </div>
      <!-- <div class="form-group">
        <label>Truth</label>
        <input type="number" class="form-control" placeholder="Description" v-model="model.truth">
      </div> -->
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
    const paramId = this.$route.params.id;
    if (paramId !== '0') {
      this.get(paramId);
    }
  },

  methods: {
    get(id) {
      axios.get(`${API_URL}/claims/${id}`).then((response) => {
        this.model = response.data;
      });
    },

    save() {
      const paramId = this.$route.params.id;
      this.model.truth = parseFloat(this.model.truth);
      if (paramId === '0') {
        axios.post(`${API_URL}/claims`, this.model).then(() => {
          this.backPage();
        });
      } else {
        axios.put(`${API_URL}/claims/${paramId}`, this.model).then(() => {
          this.backPage();
        });
      }
    },

    backPage() {
      router.push('/claim');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
