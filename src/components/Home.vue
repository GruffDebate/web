<template>
  <div class="container">
    <div class="col-xs-10 reset-col" style="margin-bottom:30px;">
      <ul class="tags">
        <li>
          <a class="filter-title" v-bind:class="{ active: isActivePopular }" @click="list('popular')">Popular</a>
        </li>
        <li>
          <a class="filter-title" v-bind:class="{ active: isActiveNew }" @click="list('new')">New</a>
        </li>
      </ul>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 reset-col">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" v-for="item in claims" v-bind:key="item.uuid">
        <v-card height="300" class="thumbnail">
          <v-card-title style="height: 247px;">
            <div>
              <h4>{{item.title}}</h4><br>
              <span class="limit-text">{{item.desc}}</span>
            </div>
          </v-card-title>
          <v-card-actions style="border-top: 1px solid rgba(0,0,0,.1); height: 46px;">
            <v-flex xs6>
              <v-btn flat color="orange" @click="gruff(item.uuid)">Gruff It</v-btn>
            </v-flex>
            <v-flex xs6 text-xs-right>
              <social-sharing v-bind:url="item.url"
                  v-bind:title="item.title"
                  v-bind:description="item.desc"
                  inline-template>
                <div>
                  <network network="facebook">
                    <i class="fa fa-facebook" style="font-size: 22px;
                      padding: 5px 11px;
                      background-color: #3b5998;
                      border-radius: 4px;
                      color: #fff;
                      cursor: pointer;">
                    </i>
                  </network>
                  <network network="twitter">
                    <i class="fa fa-twitter" style="font-size: 22px;
                      padding: 5px 7px;
                      background-color: #1DA1F2;
                      border-radius: 4px;
                      color: #fff;
                      cursor: pointer;">
                    </i>
                  </network>
                </div>
              </social-sharing>
            </v-flex>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <div class="col-xs-2 hidden-xs hidden-sm" style="padding-left: 30px;">
      <p class="popular-title">Popular Tags</p>
      <ul class="popular-tags" v-for="item in tags" v-bind:key="item.id">
        <li>
          <a class="popular-tag" @click="goTags(item)">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import router from '../router';

/* eslint-disable no-undef, no-param-reassign */
const API_URL = API;

export default {
  data() {
    return {
      claims: [],
      tags: [],
      isActivePopular: true,
      isActiveNew: false,
      share: false,
    };
  },

  created() {
    this.list('popular');
    this.listTags();
  },

  methods: {
    gruff(id) {
      router.push(`/gruff/${id}`);
    },

    list(filter) {
      if (filter === 'new') {
        axios.get(`${API_URL}/claims`).then((response) => {
          this.isActiveNew = true;
          this.isActivePopular = false;
          response.data.forEach((item) => {
            item.url = `https://gruff.org/gruff/${item.uuid}`;
          });
          this.claims = response.data;
        });
      } else {
        axios.get(`${API_URL}/claims/top`).then((response) => {
          this.isActiveNew = false;
          this.isActivePopular = true;
          response.data.forEach((item) => {
            item.url = `https://gruff.org/gruff/${item.uuid}`;
          });
          this.claims = response.data;
        });
      }
    },

    listTags() {
      axios.get(`${API_URL}/tags?start=0&limit=20`).then((response) => {
        this.tags = response.data.results;
      });
    },

    goTags(item) {
      router.push(`/tags/${item.id}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-title {
    color: #2196f3;
    display: inline-block;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5;
    margin: 10px 14px;
    letter-spacing: 0;
    text-decoration: none;
    -webkit-transition: color 0.2s;
    cursor: pointer;
  }

  .filter-title:hover, .filter-title.active {
    color: #3d3d3d;
  }

  .thumbnail {
    background-color: #fff;
    border-bottom: 1px solid #f1f3f4;
  }

  .card__title {
    align-items: flex-start;
  }

  .card__actions {
    justify-content: center;
  }

  .limit-text {
    max-height: 100px;
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden !important;
    display: inline-block;
  }

  .popular-title {
    color: #a9b0b8;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.3;
    margin-bottom: 9px;
  }

  .popular-tags {
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  .popular-tag {
    color: #52a3ff;
    font-weight: 800;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: .5px;
    line-height: 32px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }
  .popular-tag:hover{
    color: #1f88ff;
  }

  .icon-facebook {
    font-size: 22px;
    padding: 5px 11px;
    background-color: #3b5998;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }

  .icon-twitter {
    font-size: 22px;
    padding: 5px 11px;
    background-color: #1DA1F2;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
</style>
