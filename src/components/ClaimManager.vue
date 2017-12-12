<template>
  <div class="container">
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
      <div class="form-group">
        <label>Contexts</label>
        <v-select
          :debounce="250"
          :on-search="getOptionsCtx"
          :options="optionsCtx"
          placeholder="Search Context..."
          label="title"
          multiple
          class="select-back"
          v-model="selectedCtx"
        >
        </v-select>
      </div>
      <div class="form-group">
        <label>Tags</label>
        <v-select
          :debounce="250"
          :on-search="getOptionsTag"
          :options="optionsTag"
          placeholder="Search Tags..."
          label="title"
          multiple
          class="select-back"
          ref="tag"
          :close-on-select="true"
          v-model="selectedTag"
        >
          <span slot="no-options">
            Nothing found.
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="addTag">Add New Tag?</button>
          </span>
        </v-select>
      </div>
      <v-btn @click="save()" color="primary" dark slot="activator" class="blue radius">
        Save
      </v-btn>
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
      optionsCtx: [],
      selectedCtx: [],
      optionsTag: [],
      selectedTag: [],
    };
  },

  created() {
    const paramId = this.$route.params.id;
    if (paramId !== '0') {
      this.get(paramId);
    }
    this.getOptionsCtx();
    this.getOptionsTag();
  },

  methods: {
    addTag() {
      const tag = this.$refs.tag.search;
      if ((tag === null || tag === undefined || tag === '') || tag.length <= 2) {
        const obj = {
          title: 'Error',
          message: tag === '' ? 'You need write something' : 'You must enter at least 3 characters',
          type: 'error',
        };
        this.$Simplert.open(obj);
        return;
      }
      axios.post(`${API_URL}/tags`, { title: tag }).then(() => {
        this.optionsTag.push(tag);
        this.$refs.tag.select(tag);
        this.$refs.tag.open = false;
      });
    },

    getOptionsCtx() {
      axios.get(`${API_URL}/contexts`).then((response) => {
        this.optionsCtx = response.data;
      });
    },

    getOptionsTag() {
      axios.get(`${API_URL}/tags`).then((response) => {
        this.optionsTag = response.data;
      });
    },

    get(id) {
      axios.get(`${API_URL}/claims/${id}`).then((response) => {
        this.model = response.data;
        this.selectedCtx = this.model.contexts;
        this.selectedTag = this.model.tags;
      });
    },

    save() {
      const paramId = this.$route.params.id;
      this.model.truth = parseFloat(this.model.truth);
      if (paramId === '0') {
        this.model.contexts = this.selectedCtx;
        this.model.tags = this.selectedTag;

        axios.post(`${API_URL}/claims`, this.model).then(() => {
          this.backPage();
        });
      } else {
        const modelCtxIds = {
          ids: this.selectedCtx !== null ? this.selectedCtx.map(a => a.id) : [],
        };
        const modelTagIds = {
          ids: this.selectedTag !== null ? this.selectedTag.map(a => a.id) : [],
        };
        axios.put(`${API_URL}/claims/${paramId}`, this.model).then(() => {
          axios.put(`${API_URL}/claims/${paramId}/contexts`, modelCtxIds).then(() => {
            axios.put(`${API_URL}/claims/${paramId}/tags`, modelTagIds).then(() => {
              this.backPage();
            });
          });
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
  .select-back {
    background-color: #fff;
  }
</style>
