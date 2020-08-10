import axios from 'axios'
import get from 'lodash/get'
import { toaster } from 'evergreen-ui'
import { auth as useAuth } from '../hooks/auth'

export const api = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Gruff': 'Gruff',
  },
  timeout: 20000,
})

api.interceptors.request.use(
  function(config) {
    const { auth, cachedAuth } = useAuth(false)
    const isAuth = !!get(auth, 'token', false) || !!get(cachedAuth, 'token', false)
    if (config.url.includes('login') || config.url.includes('register')) {
      delete config.headers.Authorization
    } else {
      if (isAuth) {
        const token = get(auth, 'token', false) || get(cachedAuth, 'token', false)
        config.headers.Authorization = `Bearer ${token}`
      } else {
        if (isAuth) {
          config.headers.Authorization = `Bearer ${get(auth, 'token', false)}`
        } else {
          if (
            window.location.pathname.includes('claims') ||
            window.location.pathname.includes('contexts')
          ) {
            window.location.href = '/'
          }
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function(response) {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (
          window.location.pathname.includes('claims') ||
          window.location.pathname.includes('contexts')
        ) {
          if (error.response.status === 403) {
            toaster.warning('You do not have permission', { duration: 5 })
            return
          }
          toaster.danger('Session expired', { duration: 5 })
          localStorage.removeItem('gruff_auth')
          window.location.href = '/'
        } else if (!window.location.pathname.includes('login')) {
          if (error.response.status === 403) {
            toaster.warning('You do not have permission', { duration: 5 })
            return
          }
          toaster.danger('Session expired', { duration: 5 })
          localStorage.removeItem('gruff_auth')
          window.location.reload()
        }
      }
    } else {
      if (
        window.location.pathname.includes('claims') ||
        window.location.pathname.includes('contexts')
      ) {
        localStorage.removeItem('gruff_auth')
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  },
)

export const request = (req) => {
  return api({
    url: `${process.env.API_URL}/${req.baseUrl}/${req.route}`,
    data: req.payload || null,
    method: req.method,
  })
}

export const handleRequestError = (error) => {
  if (error.response.data) {
    toaster.danger(error.response.data.message, {
      duration: 4,
      id: 'error-toaster',
    })
  } else {
    toaster.danger('Error: ' + error, {
      duration: 4,
      id: 'error-toaster',
    })
  }
}
