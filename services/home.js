import { request } from '../utils/api'

export const ListClaims = (filter = 0) => {
  return request({
    method: 'get',
    baseUrl: 'api',
    route: filter === 0 ? 'claims/top' : 'claims',
  })
}
