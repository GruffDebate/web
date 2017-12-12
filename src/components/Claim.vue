<template>
  <div>
    <div class="container-fluid hero">
      <div class="hero_area">
        <div class="hero-area__content">
          <div class="tag-page__info">
            <h1 class="tag-page__name">Manage Your Claims</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-md-1" style="margin-bottom: 20px;">
        <v-btn @click="newPage(0)" color="primary" dark slot="activator" class="blue radius">
          Create Claim
        </v-btn>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reset-col">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="item in claims" v-bind:key="item.uuid">
          <v-card height="300" class="thumbnail">
            <v-card-title style="height: 247px;">
              <div>
                <h4>{{item.title}}</h4><br>
                <span class="limit-text">{{item.desc}}</span>
              </div>
            </v-card-title>
            <v-card-actions style="border-top: 1px solid rgba(0,0,0,.1); height: 46px; justify-content: center;">
              <v-btn flat color="orange" @click="edit(item)">Edit It</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
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

  .card__title {
    align-items: flex-start;
  }
</style>
