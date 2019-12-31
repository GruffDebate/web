import { request } from '../utils/api'

export const ListClaims = () => {
  return request({
    method: 'get',
    baseUrl: 'api',
    route: `users/claims`,
  })
}

export const GetClaim = (id) => {
  return request({
    method: 'get',
    baseUrl: 'api',
    route: `claims/${id}`,
  })
}

export const CreateClaim = (payload) => {
  return request({
    method: 'post',
    baseUrl: 'api',
    route: 'claims',
    payload,
  })
}

export const UpdateClaim = (id, payload) => {
  return request({
    method: 'put',
    baseUrl: 'api',
    route: `claims/${id}`,
    payload,
  })
}

export const DeleteClaim = (id) => {
  return request({
    method: 'delete',
    baseUrl: 'api',
    route: `claims/${id}`,
  })
}
