import { request } from "../utils/api";

export const GetArgument = id => {
  return request({
    method: "get",
    baseUrl: "api",
    route: `arguments/${id}`
  });
};

export const CreateArgument = payload => {
  return request({
    method: "post",
    baseUrl: "api",
    route: "arguments",
    payload
  });
};

export const UpdateArgument = (id, payload) => {
  return request({
    method: "put",
    baseUrl: "api",
    route: `arguments/${id}`,
    payload
  });
};
