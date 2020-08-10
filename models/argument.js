import { thunk, action } from 'easy-peasy'
import { GetArgument, CreateArgument, UpdateArgument } from '../services/argument'
import { get } from 'lodash'
import { toaster } from 'evergreen-ui'
import { handleRequestError } from '../utils/api'

const argument = {
  isLoading: false,
  isLoadingForm: false,
  isShow: false,
  error: '',
  argument: {
    title: '',
    desc: '',
  },
  getArgument: thunk(async (action, payload) => {
    try {
      const response = await GetArgument(payload)
      action.setArgument(response.data)
      action.setShow(true)
    } catch (error) {
      handleRequestError(error)
    }
  }),
  createArgument: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await CreateArgument(payload)
      action.setShow(false)
      action.setLoadingForm({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingForm({ loading: false })
    }
  }),
  updateArgument: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await UpdateArgument(payload._key, {
        title: payload.model.title,
        desc: payload.model.desc,
        _key: payload.model._key,
      })
      action.setShow(false)
      action.setLoadingForm({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingForm({ loading: false })
    }
  }),
  setArgument: action((state, payload) => {
    state.argument = payload || {}
  }),
  setLoadingForm: action((state, payload) => {
    const loading = get(payload, 'loading', false)
    state.isLoadingForm = loading
  }),
  setShow: action((state, payload) => {
    state.isShow = payload
  }),
  setLoadingDelete: action((state, payload) => {
    const loading = get(payload, 'loading', false)
    state.isLoadingDelete = loading
  }),
  setError: action((state, payload) => {
    const message = get(payload, 'message', false)
    state.error = message
  }),
  clearArgument: action((state) => {
    state.argument = {
      title: '',
      desc: '',
    }
  }),
}

export default argument
