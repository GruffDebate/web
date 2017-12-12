<template>
  <div>
    <div class="container-fluid hero">
      <div class="hero_area">
        <div class="hero-area__content">
          <div class="tag-page__info">
            <h1 class="tag-page__name">Explore Contexts</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-md-1" style="margin-bottom: 20px;">
        <v-btn @click="newPage(0)" color="primary" dark slot="activator" class="blue radius">
          Create Context
        </v-btn>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reset-col">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" v-for="item in contexts" v-bind:key="item.uuid">
          <v-card class="thumbnail">
            <v-card-title>
              <div style="margin-bottom:10px">
                <h3 style="margin-top:0;">{{item.title}}</h3>
                <span class="limit-text">{{item.desc}}</span>
              </div>
              <div class="col-xs-12 reset-col" style="border-top: 1px solid rgba(0,0,0,.1);">
                <a v-bind:href="item.url" target="_blank" class="text-link">{{item.url}}</a>
                <p>{{item.meta_url.title}}</p>
                <img v-bind:src="item.meta_url.image" alt="" class="image_preview"/>
              </div>
            </v-card-title>
            <v-card-actions style="border-top: 1px solid rgba(0,0,0,.1); height: 46px; justify-content: center;">
              <!-- <v-btn flat color="orange" @click="explore(item)">Explore</v-btn> -->
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
      router.push(`/context/${id}`);
    },

    explore(item) {
      router.push(`/context/explore/${item.id}`);
    },

    edit(item) {
      router.push(`/context/${item.id}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-context {
    width: 100%;
  }

  .thumbnail {
    background-color: #fff;
    border-bottom: 1px solid #f1f3f4;
  }

  .card__title {
    align-items: flex-start;
  }

  .card__actions {
    padding: 8px 40px;
  }

  .limit-text {
    max-height: 100px;
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden !important;
    display: inline-block;
  }

  .text-link {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    color: #3498db;
  }

  .image_preview {
    width: auto;
    height: 250px;
    border-radius: 4px;
    display: block;
    margin: 0 auto;
  }
</style>
