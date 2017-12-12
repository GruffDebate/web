<template>
  <div>
    <div class="container-fluid hero">
      <div class="hero_area">
        <div class="hero-area__content">
          <div class="tag-page__info">
            <h1 class="tag-page__name">Debate #{{this.tag.title}}</h1>
            <div class="tag-page__description">These are the entries for the Gruff {{this.tag.title}}!</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reset-col">
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
      tag: {},
    };
  },

  created() {
    this.list();
    this.getTag();
  },

  methods: {
    gruff(id) {
      router.push(`/gruff/${id}`);
    },

    getTag() {
      const tagId = this.$route.params.id;
      axios.get(`${API_URL}/tags/${tagId}`).then((response) => {
        this.tag = response.data;
      });
    },

    list() {
      const tagId = this.$route.params.id;
      axios.get(`${API_URL}/tags/${tagId}/claims`).then((response) => {
        response.data.forEach((item) => {
          item.url = `https://gruff.org/gruff/${item.uuid}`;
        });
        this.claims = response.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hero {
    background-color: #A7A8AA;
    margin-bottom: 40px;
  }

  .hero_area {
    height: 240px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 64px;
    color: #fff;
    position: relative;
    z-index: 0;
  }

  .hero-area__content {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    z-index: 0;
  }

  .tag-page__info {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    height: 100%;
  }

  .tag-page__name {
    font-weight: 400;
    font-size: 45px;
    line-height: 1.2;
    color: inherit;
    text-align: center;
  }

  .tag-page__description {
    font-weight: 300;
    font-size: 22px;
    line-height: 1.4;
    text-align: center;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .thumbnail {
    background-color: #fff;
    border-bottom: 1px solid #f1f3f4;
  }

  .card__title {
    align-items: flex-start;
  }

  .card__actions {
    padding: 8px 20px;
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
</style>
