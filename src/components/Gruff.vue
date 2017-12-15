<template>
  <div id="gruff" class="container">
    <div class="col-xs-12 claim-content">
      <h2 class="claim-title">{{debate.title}}</h2>
      <p class="claim-desc">{{debate.desc}}</p>
      <ul class="tags" v-for="item in debate.tags" v-bind:key="item.id">
        <li>
          <a class="tag" @click="goTags(item)">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="col-xs-12 claim-arguments">
      <div class="col-xs-6">
        <div class="col-xs-6 col-sm-6 col-md-10 col-lg-10">
          <p class="argument-favor">For</p>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
          <i class="fa fa-plus-square argument-favor-icon" aria-hidden="true" @click="argumentFavor()"></i>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="col-xs-7 col-sm-6 col-md-10 col-lg-10">
          <p class="argument-against">Against</p>
        </div>
        <div class="col-xs-5 col-sm-6 col-md-2 col-lg-2">
          <i class="fa fa-plus-square argument-against-icon" aria-hidden="true" @click="argumentAgainst()"></i>
        </div>
      </div>
    </div>

    <!-- LIST ARGUMENTS -->
    <div class="col-xs-12 reset-col">
      <div class="col-xs-6 reset-col" style="padding-right: 5px;">
        <!-- CREATE FAVOR -->
        <div class="col-xs-12 space-10 left block-favor outline" v-if="formFavor">
          <div v-if="isError1" class="alert alert-danger" role="alert">
            {{favorError}}
          </div>
          <div class="form-group">
            <select class="form-control input-favor" placeholder="Argument type" v-model="argFavor.target">
              <!-- <option disabled value="">Choose one</option> -->
              <option disabled value="1">Target Claim</option>
              <!-- <option>Target Argument</option> -->
            </select>
          </div>
          <div class="form-group">
            <input type="text" class="form-control input-favor" placeholder="Argument title" v-model="argFavor.title">
          </div>
          <div class="form-group">
            <textarea type="text" class="form-control input-favor" placeholder="Argument description" v-model="argFavor.desc" rows="4"></textarea>
          </div>
          <v-btn @click="saveFavor()" outline color="primary" slot="activator" class="blue btn-send-favor-it" :disabled="argFavor.title == undefined || argFavor.title == null || argFavor.title == ''">
            Send it
          </v-btn>
          <v-btn @click="cancel()" outline color="primary" slot="activator" class="blue btn-cancel-it">
            Cancel it
          </v-btn>
        </div>

        <!-- LIST ARGUMENTS FAVOR -->
        <div class="col-xs-12" v-for="item in debate.protruth" v-bind:key="item.id">
          <h2 v-if="item.args.length > 0" style="font-weight: 300; text-transform: uppercase;">{{item.name}}</h2>

          <div class="col-xs-12 space-10 block-favor block-favor-list" v-for="children in item.args" v-bind:key="children.uuid" @click="goClaim(children)">
            <label style="color: #41cc90;">Strength:
              <span style="color: #333; font-size: 12px;">{{children.strength}}</span>
            </label>
            <h4 style="font-weight: 400;">{{children.title}}</h4>
          </div>
        </div>
      </div>
      <div class="col-xs-6 reset-col" style="padding-left: 5px;">
        <!-- CREATE AGAINST -->
        <div class="col-xs-12 space-10 left block-against outline" v-if="formAgainst">
          <div v-if="isError2" class="alert alert-danger" role="alert">
            {{againstError}}
          </div>
          <div class="form-group">
            <select class="form-control input-favor" placeholder="Argument type" v-model="argAgainst.target">
              <!-- <option disabled value="">Choose one</option> -->
              <option disabled value="1">Target Claim</option>
              <!-- <option>Target Argument</option> -->
            </select>
          </div>
          <div class="form-group">
            <input type="text" class="form-control input-against" placeholder="Argument title" v-model="argAgainst.title">
          </div>
          <div class="form-group">
            <textarea type="text" class="form-control input-against" placeholder="Argument description" v-model="argAgainst.desc" rows="4"></textarea>
          </div>
          <v-btn @click="saveAgainst()" outline color="primary" slot="activator" class="blue btn-send-against-it" :disabled="argAgainst.title == undefined || argAgainst.title == null || argAgainst.title == ''">
            Send it
          </v-btn>
          <v-btn @click="cancel()" outline color="primary" slot="activator" class="blue btn-cancel-it">
            Cancel it
          </v-btn>
        </div>

        <!-- LIST ARGUMENTS AGAINST -->

        <div class="col-xs-12" v-for="item in debate.contruth" v-bind:key="item.id">
          <h2 v-if="item.args.length > 0" style="font-weight: 300; text-transform: uppercase;">{{item.name}}</h2>

          <div class="col-xs-12 space-10 block-against block-against-list" v-for="children in item.args" v-bind:key="children.uuid" @click="goClaim(children)">
            <label style="color: #ff725c;">Strength:
              <span style="color: #333; font-size: 12px;">{{children.strength}}</span>
            </label>
            <h4 style="font-weight: 400;">{{children.title}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth';
import router from '../router';

/* eslint-disable no-undef, no-param-reassign */
const API_URL = API;

export default {
  data() {
    return {
      debate: {},
      formFavor: false,
      formAgainst: false,
      isError1: false,
      isError2: false,
      argFavor: {
        target: '1',
      },
      argAgainst: {
        target: '1',
      },
      userIdLogged: 0,
    };
  },

  created() {
    this.userIdLogged = auth.getLoggedId();
    this.list();
  },

  watch: {
    $route: 'list',
  },

  methods: {
    groupBy(args) {
      const newArguments = [];
      const argsVeryWeak = [];
      const argsWeak = [];
      const argsModerate = [];
      const argsStrong = [];
      const argsVeryStrong = [];
      for (let i = 0; i < args.length; i += 1) {
        if (args[i].strength >= 0 && args[i].strength < 1) {
          argsVeryWeak.push(args[i]);
        } else if (args[i].strength >= 1 && args[i].strength < 2) {
          argsWeak.push(args[i]);
        } else if (args[i].strength >= 2 && args[i].strength < 3) {
          argsModerate.push(args[i]);
        } else if (args[i].strength >= 3 && args[i].strength < 4) {
          argsStrong.push(args[i]);
        } else if (args[i].strength >= 4 && args[i].strength < 5) {
          argsVeryStrong.push(args[i]);
        }
      }

      newArguments.push(
        {
          id: 1,
          name: 'Very Strong',
          args: argsVeryStrong,
        },
        {
          id: 2,
          name: 'Strong',
          args: argsStrong,
        },
        {
          id: 3,
          name: 'Moderate',
          args: argsModerate,
        },
        {
          id: 4,
          name: 'Weak',
          args: argsWeak,
        },
        {
          id: 5,
          name: 'Very Weak',
          args: argsVeryWeak,
        },
      );

      return newArguments;
    },

    list() {
      axios.get(`${API_URL}/claims/${this.$route.params.id}`).then((response) => {
        const debate = response.data;
        if (debate.protruth !== undefined) {
          for (let i = 0; i < debate.protruth.length; i += 1) {
            debate.protruth[i].isShow = false;
          }
          debate.protruth = this.groupBy(debate.protruth);
        }

        if (debate.contruth !== undefined) {
          for (let i = 0; i < debate.contruth.length; i += 1) {
            debate.contruth[i].isShow = false;
          }
          debate.contruth = this.groupBy(debate.contruth);
        }

        this.debate = debate;
      });
    },

    argumentFavor() {
      this.argFavor = {
        target: '1',
      };
      this.formAgainst = false;
      this.formFavor = !this.formFavor;
    },

    argumentAgainst() {
      this.argAgainst = {
        target: '1',
      };
      this.formFavor = false;
      this.formAgainst = !this.formAgainst;
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

    goClaim(item) {
      router.push(`/gruff/${item.claimId}`);
    },

    goTags(item) {
      router.push(`/tags/${item.id}`);
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

  .claim-content {
    background-color: #fff;
    height: auto;
    border: 1px solid #e6e9eb;
    cursor: pointer;
  }

  .claim-content:hover {
    /* border: 0.5px solid #999999; */
  }

  .claim-title {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-weight: 400;
    color: #3d3d3d;
    margin-top: 22px;
  }

  .claim-desc {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-weight: 400;
    color: #3d3d3d;
  }

  .claim-arguments {
    height: 65px;
    background-color: #fff;
    box-shadow: 0 0px 0px 0px rgba(0,0,0,.2), 0 0px 0px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
  }

  .claim-arguments > div {
    padding: 16px 16px 1px 24px;
  }

  .claim-arguments > div:first-child {
    border-right: 1px solid #e6e9eb;
  }

  .argument-favor {
    font-weight: 700;
    font-size: 21px;
    line-height: 1.5;
    -webkit-box-flex: 1;
    flex-grow: 1;
    cursor: default;
    color: #41cc90;
  }

  .argument-favor-icon {
    font-size: 38px;
    color: #41cc90;
    cursor: pointer;
  }

  .argument-favor-icon:hover {
    color: #2eac76;
  }

  .argument-against {
    font-weight: 700;
    font-size: 21px;
    line-height: 1.5;
    -webkit-box-flex: 1;
    flex-grow: 1;
    cursor: default;
    color: #ff725c;
  }

  .argument-against-icon {
    font-size: 38px;
    color: #ff725c;
    cursor: pointer;
  }

  .argument-against-icon:hover {
    color: #ff4629;
  }

  .left {
    text-align: left;
  }

  .space-10 {
    margin-top: 10px;
  }

  .space-15 {
    margin-top: 15px;
  }

  .space-20 {
    margin-top: 20px;
  }

  .space {
    margin-top: 40px;
  }

  .block-favor {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 1px 1px -3px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
    transition: width .2s linear,margin-left .2s linear;
  }

  .block-favor.outline {
    border: 1px solid #41cc90;
  }

  .block-favor-list:hover {
    border: 1px solid #41cc90;
    padding: 19px;
    cursor: pointer;
  }

  .block-against {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 1px 1px -3px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
    transition: width .2s linear,margin-left .2s linear;
  }

  .block-against.outline {
    border: 1px solid #ff725c;
  }

  .block-against-list:hover {
    border: 1px solid #ff725c;
    padding: 19px;
    cursor: pointer;
  }

  input, textarea {
    border: 1px solid #e6e9eb;
    border-radius: 4px;
    box-shadow: none;
  }
  .input-favor:focus {
    border-color: #e6e9eb;
    box-shadow: none;
  }
  .input-against:focus {
    border-color: #e6e9eb;
    box-shadow: none;
  }

  .btn-send-favor-it {
    border-color: #41cc90 !important;
    border-radius: 4px;
    color: #41cc90;
    font-weight: 800;
  }

  .btn-send-against-it {
    border-color: #ff725c !important;
    border-radius: 4px;
    color: #ff725c;
    font-weight: 800;
  }

  .btn-cancel-it {
    border-color: #a9b0b8 !important;
    border-radius: 4px;
    color: #a9b0b8;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    .claim-arguments > div {
      padding: 16px 0px 1px 0px;
    }
  }
</style>
