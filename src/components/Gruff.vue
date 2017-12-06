<template>
  <div id="gruff" class="container-fluid">
    <div class="col-md-12 left">
      <h1>{{debate.title}}</h1>
      <h4>{{debate.desc}}</h4>
      <p>Tags: </p>
    </div>

    <!-- ProTruth -->
    <div class="col-md-6">
      <div class="col-md-12">
        <div>
          <h3>Arguments in Favor</h3>
          <button @click="argumentFavor()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Add a new Argument</button>
        </div>
      </div>
      <div class="col-md-12 space-20 left" v-if="formFavor">
        <div v-if="isError1" class="alert alert-danger" role="alert">
          {{favorError}}
        </div>
        <h4>Add a New Debate</h4>
        <div class="form-group">
          <label>Argument Title</label>
          <input type="text" class="form-control" placeholder="Title" v-model="argFavor.title">
        </div>
        <div class="form-group">
          <label>Argument Description</label>
          <input type="text" class="form-control" placeholder="Description" v-model="argFavor.desc">
        </div>
        <button @click="saveFavor()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Send It</button>
        <button @click="cancel()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cancel</button>
      </div>
      <div class="col-md-12 space left">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: 100%;">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Arguments</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <ul v-for="item in debate.protruth" v-bind:key="item.uuid">
              <i v-show="item.createdById == userIdLogged" class="fa fa-pencil" aria-hidden="true" style="margin-right:10px; cursor: pointer;" @click="edit('favor', item)"></i>
              <a @click="item.isShow = !item.isShow" v-if="item.title != ''">{{item.title}} -
                <span v-if="item.claim != undefined" style="color:#000;">Truth: {{item.claim.truth}}</span>
              </a>
              <a @click="item.isShow = !item.isShow" v-else>{{item.claim.title}} -
                <span v-if="item.claim != undefined" style="color:#000;">Truth: {{item.claim.truth}}</span>
              </a>
              <!-- <ul style="list-style: none; margin-left: 25px;">
                <li>Impact: {{item.impact}}</li>
                <li>Relevance: {{item.relevance}}</li>
              </ul> -->
              <ul style="list-style: none; margin-left: 25px;" v-show="item.isShow">
                <li v-if="item.desc != ''">{{item.desc}}</li>
                <li v-else>{{item.claim.desc}}</li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- ConTruth -->
    <div class="col-md-6">
      <div class="col-md-12">
        <div>
          <h3>Arguments in Against</h3>
          <button @click="argumentAgainst()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Add a new Argument</button>
        </div>
      </div>
      <div class="col-md-12 left space-20" v-if="formAgainst">
        <div v-if="isError2" class="alert alert-danger" role="alert">
          {{favorError}}
        </div>
        <h4>Add a New Debate</h4>
        <div class="form-group">
          <label>Argument Title</label>
          <input type="text" class="form-control" placeholder="Title" v-model="argAgainst.title">
        </div>
        <div class="form-group">
          <label>Argument Description</label>
          <input type="text" class="form-control" placeholder="Description" v-model="argAgainst.desc">
        </div>
        <button @click="saveAgainst()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Send It</button>
        <button @click="cancel()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cancel</button>
      </div>
      <div class="col-md-12 space left">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: 100%;">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Arguments</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <ul v-for="item in debate.contruth" v-bind:key="item.uuid">
              <i v-show="item.createdById == userIdLogged" class="fa fa-pencil" aria-hidden="true" style="margin-right:10px; cursor: pointer;" @click="edit('against', item)"></i>
              <a @click="item.isShow = !item.isShow" v-if="item.title != ''">{{item.title}} -
                <span v-if="item.claim != undefined" style="color:#000;">Truth: {{item.claim.truth}}</span>
              </a>
              <a @click="item.isShow = !item.isShow" v-else>{{item.claim.title}} -
                <span v-if="item.claim != undefined" style="color:#000;">Truth: {{item.claim.truth}}</span>
              </a>
              <!-- <ul style="list-style: none; margin-left: 25px;">
                <li>Impact: {{item.impact}}</li>
                <li>Relevance: {{item.relevance}}</li>
              </ul> -->
              <ul style="list-style: none; margin-left: 25px;" v-show="item.isShow">
                <li v-if="item.desc != ''">{{item.desc}}</li>
                <li v-else>{{item.claim.desc}}</li>
                <li v-if="item.claim != undefined"></li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth';

const API_URL = 'http://localhost:8080/api';

export default {
  name: 'gruff',
  data() {
    return {
      debate: {},
      formFavor: false,
      formAgainst: false,
      isError1: false,
      isError2: false,
      argFavor: {},
      argAgainst: {},
      userIdLogged: 0,
    };
  },

  created() {
    this.userIdLogged = auth.getLoggedId();
    this.list();
  },

  methods: {
    list() {
      axios.get(`${API_URL}/claims/${this.$route.params.id}`).then((response) => {
        const debate = response.data;
        for (let i = 0; i < debate.protruth.length; i += 1) {
          debate.protruth[i].isShow = false;
        }

        for (let i = 0; i < debate.contruth.length; i += 1) {
          debate.contruth[i].isShow = false;
        }
        this.debate = debate;
      });
    },

    argumentFavor() {
      this.argFavor = {};
      this.formAgainst = false;
      this.formFavor = true;
    },

    argumentAgainst() {
      this.argAgainst = {};
      this.formFavor = false;
      this.formAgainst = true;
    },

    edit(type, item) {
      if (type === 'favor') {
        this.argumentFavor();
        this.argFavor.uuid = item.uuid;
        if (item.title !== '') {
          this.argFavor.title = item.title;
        } else {
          this.argFavor.title = item.claim.title;
        }

        if (item.desc !== '') {
          this.argFavor.desc = item.desc;
        } else {
          this.argFavor.desc = item.claim.desc;
        }
      } else {
        this.argumentAgainst();
        this.argAgainst.uuid = item.uuid;
        if (item.title !== '') {
          this.argAgainst.title = item.title;
        } else {
          this.argAgainst.title = item.claim.title;
        }

        if (item.desc !== '') {
          this.argAgainst.desc = item.desc;
        } else {
          this.argAgainst.desc = item.claim.desc;
        }
      }
    },

    saveFavor() {
      const model = {
        targetClaimID: this.$route.params.id,
        type: 1,
        claim: {
          title: this.argFavor.title,
          desc: this.argFavor.desc,
        },
      };

      if (this.argFavor.uuid === undefined) {
        axios.post(`${API_URL}/arguments`, model).then(() => {
          this.formFavor = false;
          this.argFavor = {};
          this.list();
        }, () => {
          this.isError1 = true;
          this.favorError = 'You must be logged.';
          setTimeout(() => {
            this.isError1 = false;
          }, 2000);
        });
      } else {
        const modelUpdate = {
          title: this.argFavor.title,
          desc: this.argFavor.desc,
        };
        axios.put(`${API_URL}/arguments/${this.argFavor.uuid}`, modelUpdate).then(() => {
          this.formFavor = false;
          this.argFavor = {};
          this.list();
        }, () => {
          this.isError1 = true;
          this.favorError = 'You must be logged.';
          setTimeout(() => {
            this.isError1 = false;
          }, 2000);
        });
      }
    },

    saveAgainst() {
      const model = {
        targetClaimID: this.$route.params.id,
        type: 2,
        claim: {
          title: this.argAgainst.title,
          desc: this.argAgainst.desc,
        },
      };

      if (this.argAgainst.uuid === undefined) {
        axios.post(`${API_URL}/arguments`, model).then(() => {
          this.formAgainst = false;
          this.argAgainst = {};
          this.list();
        }, () => {
          this.isError2 = true;
          this.againstError = 'You must be logged.';

          setTimeout(() => {
            this.isError2 = false;
          }, 2000);
        });
      } else {
        const modelUpdate = {
          title: this.argAgainst.title,
          desc: this.argAgainst.desc,
        };

        axios.put(`${API_URL}/arguments/${this.argAgainst.uuid}`, modelUpdate).then(() => {
          this.formAgainst = false;
          this.argAgainst = {};
          this.list();
        }, () => {
          this.isError2 = true;
          this.againstError = 'You must be logged.';

          setTimeout(() => {
            this.isError2 = false;
          }, 2000);
        });
      }
    },

    cancel() {
      this.formAgainst = false;
      this.formFavor = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #gruff ul {
    padding:0;
  }
  #gruff a {
    cursor: pointer;
  }

  .left {
    text-align: left;
  }

  .space-20 {
    margin-top: 20px;
  }

  .space {
    margin-top: 40px;
  }
</style>
