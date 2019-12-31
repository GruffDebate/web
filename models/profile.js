import { thunk, action } from "easy-peasy";
import {
  GetProfile,
  SaveProfile,
  EditProfile,
  EditProfilePassword
} from "../services/user";
// import history from "../utils/history";
import { get } from "lodash";
import { toaster } from "evergreen-ui";

const profile = {
  isLoading: false,
  error: "",
  profile: {},
  getProfile: thunk(async (action) => {
    try {
      action.setLoading({ loading: true });
      const response = await GetProfile();
      action.setModel(response);
      action.setLoading({ loading: false });
    } catch (error) {
      if (error.response.status === 401) {
        action.setError({ message: "Erro ao carregar dados" });
      }
    }
  }),
  saveProfileName: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await SaveProfile(payload);
      action.setName(response);
      action.setLoading({ loading: false });
    } catch (error) {
      if (error.response.status === 401) {
        action.setError({ message: "Erro ao carregar dados" });
      }
    }
  }),
  editProfile: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await EditProfile(payload);
      if (response.status > 399) {
        toaster.danger("Something wrong, please do login again.", {
          duration: 4,
          id: "error-update-user"
        });
      } else {
        action.setEditProfile(response.data);
        toaster.success("Successfully updated.", {
          duration: 4,
          id: "save-update-user"
        });
      }
      action.setLoading({ loading: false });
    } catch (error) {
      toaster.danger("Something wrong, please do login again.", {
        duration: 4,
        id: "error-update-user"
      });
      action.setLoading({ loading: false });
    }
  }),
  editProfilePassword: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await EditProfilePassword(payload);
      if (response.status > 399) {
        toaster.danger("Something wrong, please do login again.", {
          duration: 4,
          id: "error-update-user"
        });
      } else {
        action.setEditProfilePassword(response.data);
        toaster.success("Successfully updated.", {
          duration: 4,
          id: "save-update-user"
        });
      }
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Erro ao carregar dados" });
      action.setLoading({ loading: false });
    }
  }),
  setModel: action((state, payload) => {
    const name = get(payload, "results.name", "");
    const email = get(payload, "results.email", "");
    const address = get(payload, "results.ad", {});

    state.profile.name = name;
    state.profile.email = email;
    state.profile.ad = address;
  }),
  setName: action((state, payload) => {
    const name = get(payload, "name", "");

    state.profile.name = name;
  }),
  setEditProfile: action((state, payload) => {
    const email = get(payload, "email", "");
    const name = get(payload, "name", "");
    const phone = get(payload, "phone", null);
    const wallet_id = get(payload, "wallet_id", null);

    state.profile.email = email;
    state.profile.name = name;
    state.profile.phone = phone;
    state.profile.wallet_id = wallet_id;
  }),
  setEditProfilePassword: action((state, payload) => {
    const newpassword = get(payload, "password", "");

    state.profile.newpassword = newpassword;
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

export default profile;
