<template>

  <div class="container-fluid">
    <div class="col-md-8 col-md-offset-2">
      <h3 style="text-align:left; margin-bottom:30px">Manager a context</h3>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" placeholder="Title" v-model="model.title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" placeholder="Description" v-model="model.desc">
      </div>
      <div class="form-group">
        <label>Url</label>
        <input type="text" class="form-control" placeholder="Description" v-model="model.url">
      </div>
      <div class="form-group">
        <label>Google KG ID</label>
        <input type="text" class="form-control" placeholder="Google KG ID" v-model="model.mid">
      </div>
      <div class="form-group">
        <label>Wikidata ID</label>
        <input type="text" class="form-control" placeholder="Wikidata ID" v-model="model.qid">
      </div>
      <button @click="save()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Save</button>
      <button @click="backPage()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cancel</button>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import router from '../main';

const API_URL = 'http://localhost:8080/api';

export default {
  name: 'contextManager',
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
      axios.get(`${API_URL}/contexts/${id}`).then((response) => {
        this.model = response.data;
      });
    },

    save() {
      const paramId = this.$route.params.id;
      if (paramId === '0') {
        axios.post(`${API_URL}/contexts`, this.model).then(() => {
          this.backPage();
        });
      } else {
        axios.put(`${API_URL}/contexts/${paramId}`, this.model).then(() => {
          this.backPage();
        });
      }
    },

    backPage() {
      router.push('/context');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
