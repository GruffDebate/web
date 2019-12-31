import { request } from '../utils/api'

export const GetMe = () => {
  return request({
    method: 'get',
    baseUrl: 'api',
    route: 'users/me',
  })
}

export const GetProfile = async () => {
  return request({
    method: 'get',
    baseUrl: 'api',
    route: 'users/me',
  })
}

export const SaveProfile = async (payload) => {
  return request({
    method: 'put',
    baseUrl: 'api',
    route: 'users/me',
    payload,
  })
}

export const EditProfile = (payload) => {
  return request({
    method: 'put',
    baseUrl: 'api',
    route: 'users',
    payload,
  })
}

export const EditProfilePassword = (payload) => {
  return request({
    method: 'put',
    baseUrl: 'api',
    route: 'users/password',
    payload,
  })
}
