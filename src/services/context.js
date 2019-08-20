import { request } from "../utils/api";

export const ListContext = () => {
  return request({
    method: "get",
    baseUrl: "api",
    route: `contexts`
  });
};

export const GetContext = id => {
  return request({
    method: "get",
    baseUrl: "api",
    route: `contexts/${id}`
  });
};

export const CreateContext = payload => {
  return request({
    method: "post",
    baseUrl: "api",
    route: "contexts",
    payload
  });
};

export const UpdateContext = (id, payload) => {
  return request({
    method: "put",
    baseUrl: "api",
    route: `contexts/${id}`,
    payload
  });
};

export const DeleteContext = (id) => {
  return request({
    method: "delete",
    baseUrl: "api",
    route: `contexts/${id}`
  });
};
