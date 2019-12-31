import { thunk, action } from 'easy-peasy'
import { login, signup } from '../services/auth'
import Router from 'next/router'
import { get } from 'lodash'
import { toaster } from 'evergreen-ui'
import { checkLocalStorage, setInLocalStorage } from '../utils/localstorage'
import { GetMe } from '../services/user'
const isBrowser = typeof window !== `undefined`

// rehydrate the auth state from localStorage if it exist
export const initialState = checkLocalStorage('gruff_auth', {
  token: null,
  isAuthenticated: false,
})

const auth = {
  ...initialState,
  isAuthLoading: false,
  authError: '',
  isValidate: false,
  authenticateUser: thunk(async (action, payload) => {
    action.updateIsAuthLoading({ loading: true })
    try {
      const response = await login(payload)
      action.updateAuth(response.data)
      action.updateIsAuthLoading({ loading: false })
      if (isBrowser) {
        Router.push('/')
      }
    } catch (error) {
      if (error.response) {
        action.updateIsAuthLoading({ loading: false })
        if (error.response.data.message) {
          action.updateAuthError({
            message: error.response.data.message,
          })
        } else {
          action.updateAuthError({
            message: error.response.data.status,
          })
        }
      } else {
        // generic error
        action.updateIsAuthLoading({ loading: false })
        action.updateAuthError({
          message: 'Username or password incorrect.',
        })
      }

      setTimeout(() => {
        action.cleanAuthError()
      }, 3000)
    }
  }),
  createUser: thunk(async (action, payload) => {
    action.updateIsAuthLoading({ loading: true })
    try {
      const response = await signup(payload)
      action.updateAuth(response.data)
      action.updateIsAuthLoading({ loading: false })
      if (isBrowser) {
        Router.push('/')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message.includes('idx_users_email')) {
          action.updateAuthError({
            message: 'Este email ja esta cadastrado.',
          })
        }
      } else {
        action.updateAuthError({
          message: 'An error has occurred, please try again.',
        })
      }
      action.updateIsAuthLoading({ loading: false })
      if (isBrowser) window.scrollTo(0, 0)

      setTimeout(() => {
        action.cleanAuthError()
      }, 3000)
    }
  }),
  getMe: thunk(async (action, payload) => {
    const response = await GetMe()
    if (response.status > 399) {
      toaster.danger('Something wrong with your user, please do login again.', {
        duration: 5,
        id: 'error-me',
      })
      if (isBrowser) {
        localStorage.removeItem('gruff_auth')
        Router.push('/')
      }
    } else {
      action.updateSession(response.data.results)
    }
  }),
  updateSession: action((state, payload) => {
    if (isBrowser) {
      const auth = JSON.parse(localStorage.getItem('gruff_auth'))
      setInLocalStorage('gruff_auth', {
        isAuthenticated: auth.isAuthenticated,
        token: auth.token,
        user: payload,
      })
    }

    state.user = payload
  }),
  updateAuth: action((state, payload) => {
    const token = get(payload, 'token', '')
    const user = get(payload, 'user', '')
    const isAuthenticated = true

    // store the auth state offline
    if (isBrowser)
      setInLocalStorage('gruff_auth', {
        isAuthenticated,
        token,
        user,
      })

    state.isAuthenticated = isAuthenticated
    state.token = token
    state.user = user
  }),
  updateIsAuthLoading: action((state, payload) => {
    const loading = get(payload, 'loading', false)
    state.isAuthLoading = loading
  }),
  updateAuthError: action((state, payload) => {
    const errorMessage = get(payload, 'message', '')
    state.authError = errorMessage
  }),
  cleanAuthError: action((state, payload) => {
    state.authError = ''
  }),
  clearAuth: action((state) => {
    if (isBrowser) localStorage.removeItem('gruff_auth')

    state.token = initialState.token
    state.isAuthenticated = initialState.isAuthenticated
    if (isBrowser) window.location.href = '/'
  }),
}

export default auth
