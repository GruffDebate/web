import { request } from '../utils/api'

export const login = ({ email, password }) => {
  return request({
    method: 'post',
    baseUrl: 'api',
    route: 'auth',
    payload: {
      email,
      password,
    },
  })
}

export const signup = async (payload) => {
  return request({
    method: 'post',
    baseUrl: 'api',
    route: 'users',
    payload,
  })
}
