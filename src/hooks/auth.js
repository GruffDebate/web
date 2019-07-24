import { useStore as store } from "easy-peasy";
import { initialState } from "../models/auth";

export const auth = (withHook = true) => {
  if (typeof window !== `undefined`) {
    const authStorage = localStorage.getItem("gruff_auth");
    let auth;
    if (withHook) {
      auth = store(state => state.auth);
    }
    const cachedAuth = JSON.parse(authStorage) || {
      auth: initialState
    };
    return {
      auth,
      cachedAuth
    };
  }

  return {}
};
