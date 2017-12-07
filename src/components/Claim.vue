<template>

  <div class="container-fluid">
    <div class="col-md-12">
      <div class="col-md-6">
        <h2 style="text-align: left;">Manager Claims</h2>
      </div>
      <div class="col-md-1 pull-right" style="margin-top: 20px;">
        <button @click="newPage(0)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Create</button>
      </div>
    </div>
    <div class="col-md-12">
      <table class="table-context mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Title</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
            <th class="mdl-data-table__cell--non-numeric">Truth</th>
            <th class="mdl-data-table__cell--non-numeric">Truth Roll Up</th>
            <th class="mdl-data-table__cell--non-numeric">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in claims" v-bind:key="item.id">
            <td class="mdl-data-table__cell--non-numeric">{{item.title}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.desc}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.truth}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{item.truthRU}}</td>
            <td class="mdl-data-table__cell--non-numeric">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="edit(item)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-show="this.claims.length == 0">
        <h3 class="align-center">You do not have any Claim</h3>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import router from '../router';
import env from '../environment';

const API_URL = env.API_URL;

export default {
  data() {
    return {
      claims: [],
    };
  },

  created() {
    this.list();
  },

  methods: {
    list() {
      axios.get(`${API_URL}/users/claims`).then((response) => {
        this.claims = response.data;
      });
    },

    newPage(id) {
      router.push(`/claim/${id}`);
    },

    edit(item) {
      router.push(`/claim/${item.uuid}`);
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
