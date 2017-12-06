<template>

  <div class="container-fluid">
    <div class="col-md-12">
      <div class="col-md-6">
        <h2 style="text-align: left;">Manager Context</h2>
      </div>
      <div class="col-md-2 pull-right" style="margin-top: 20px;">
        <button @click="newPage(0)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Create</button>
      </div>
    </div>
    <div class="col-md-12">
      <table class="table-context mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Title</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
            <th class="mdl-data-table__cell--non-numeric">URL</th>
            <th class="mdl-data-table__cell--non-numeric">Google KG ID</th>
            <th class="mdl-data-table__cell--non-numeric">Wikidata ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in contexts" v-bind:key="item.id">
            <td class="mdl-data-table__cell--non-numeric">{{item.title}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.desc}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.url}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.mid}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.qid}}</td>
          </tr>
        </tbody>
      </table>
      <div v-show="this.contexts.length == 0">
        <h3 class="align-center">You do not have any Context</h3>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import router from '../main';

const API_URL = 'http://localhost:8080/api';

export default {
  name: 'context',
  data() {
    return {
      contexts: [],
    };
  },

  created() {
    this.list();
  },

  methods: {
    list() {
      axios.get(`${API_URL}/contexts`).then((response) => {
        this.contexts = response.data;
      });
    },

    newPage(id) {
      router.push(`/context/manager/${id}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-context {
    width: 100%;
  }
</style>
