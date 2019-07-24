import { thunk, action } from "easy-peasy";
import { ListClaims } from "../services/home";
import { get } from "lodash";

const home = {
  isLoading: false,
  error: "",
  popularClaims: [],
  newClaims: [],
  listClaims: thunk(async (action, { filter }) => {
    try {
      action.setLoading({ loading: true });
      const response = await ListClaims(filter);
      if (filter === 0) {
        action.setPopularClaims(response.data);
      } else {
        action.setNewClaims(response.data);
      }
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Error" });
      action.setLoading({ loading: false });
    }
  }),
  setPopularClaims: action((state, payload) => {
    state.popularClaims = payload;
  }),
  setNewClaims: action((state, payload) => {
    state.newClaims = payload;
  }),
  setLoading: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isLoading = loading;
  }),
  setError: action((state, payload) => {
    const message = get(payload, "message", false);
    state.error = message;
  })
};

export default home;
