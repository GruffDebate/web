import { thunk, action } from 'easy-peasy'
import { GetMe } from '../services/user'
import { get } from 'lodash'
import { toaster } from 'evergreen-ui'
// import { setInLocalStorage } from "../utils/localstorage";

const user = {
  isLoading: false,
  error: '',
  user: {},
  getMe: thunk(async (action, payload) => {
    try {
      const response = await GetMe()
      if (response.status > 399) {
        toaster.danger('Something wrong with your user, please do login again.', {
          duration: 5,
          id: 'error-me',
        })
        if (typeof window !== `undefined`) {
          localStorage.removeItem('gruff_auth')
          window.location.href = '/login'
        }
      } else {
        action.setModel(response.data.results)
      }
    } catch (error) {
      action.setError({ message: 'Error' })
    }
  }),
  setModel: action((state, payload) => {
    state.user = payload
  }),
  setLoading: action((state, payload) => {
    const loading = get(payload, 'loading', false)
    state.isLoading = loading
  }),
  setError: action((state, payload) => {
    const message = get(payload, 'message', false)
    state.error = message
  }),
}

export default user
