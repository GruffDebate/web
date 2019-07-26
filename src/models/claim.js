import { thunk, action } from "easy-peasy";
import {
  ListClaims,
  GetClaim,
  CreateClaim,
  UpdateClaim,
  DeleteClaim
} from "../services/claim";
import { get } from "lodash";
import { toaster } from "evergreen-ui";

const claim = {
  isLoading: false,
  isLoadingForm: false,
  isLoadingDelete: false,
  isShow: false,
  error: "",
  claims: [],
  claim: {
    title: "",
    desc: ""
  },
  listClaims: thunk(async (action, payload) => {
    try {
      const response = await ListClaims();
      action.setClaims(response.data);
    } catch (error) {
      action.setError({
        message: "There was an error loading claims."
      });
    }
  }),
  getClaim: thunk(async (action, payload) => {
    try {
      const response = await GetClaim(payload);
      action.setClaim(response.data);
      action.setShow(true);
    } catch (error) {
      action.setError({
        message: "There was an error loading claims."
      });
    }
  }),
  createClaim: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true });
      await CreateClaim(payload);
      action.setShow(false);
      action.setLoadingForm({ loading: false });
    } catch (error) {
      toaster.danger("An error occurred while creating a claim.", {
        duration: 4,
        id: "error-save-claim"
      });
      action.setLoadingForm({ loading: false });
    }
  }),
  updateClaim: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true });
      await UpdateClaim(payload._key, {
        title: payload.model.title,
        desc: payload.model.desc,
        _key: payload.model._key,
      });
      action.setShow(false);
      action.setLoadingForm({ loading: false });
    } catch (error) {
      toaster.danger("An error occurred while updating a claim.", {
        duration: 4,
        id: "error-save-claim"
      });
      action.setLoadingForm({ loading: false });
    }
  }),
  deleteClaim: thunk(async (action, payload) => {
    try {
      action.setLoadingDelete({ loading: true });
      await DeleteClaim(payload);
      action.setLoadingDelete({ loading: false });
    } catch (error) {
      toaster.danger("An error occurred while deleting a claim.", {
        duration: 4,
        id: "error-save-claim"
      });
      action.setLoadingDelete({ loading: false });
    }
  }),
  setClaims: action((state, payload) => {
    state.claims = payload.results || [];
  }),
  setClaim: action((state, payload) => {
    payload.premise = [
      {
        id: 1,
        title: 'Premise 1'
      },
      {
        id: 2,
        title: 'Premise 2'
      },
      {
        id: 3,
        title: 'Premise 3'
      },
      {
        id: 4,
        title: 'Premise 4'
      },
      {
        id: 5,
        title: 'Premise 5'
      }
    ]
    payload.proargs = [
      {
        id: 1,
        title: 'Bernie Sanders has a strong policy platform on issues which matter to American voters.'
      }
    ]
    payload.conargs = [
      {
        id: 1,
        title: 'If Sanders were to implement his policy platform, it could have harmful effects on the economy.'
      }
    ]
    state.claim = payload || {};
  }),
  setLoadingForm: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isLoadingForm = loading;
  }),
  setShow: action((state, payload) => {
    state.isShow = payload;
  }),
  setLoadingDelete: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isLoadingDelete = loading;
  }),
  setError: action((state, payload) => {
    const message = get(payload, "message", false);
    state.error = message;
  }),
  clearClaim: action(state => {
    state.claim = {
      title: "",
      desc: ""
    };
  })
};

export default claim;
