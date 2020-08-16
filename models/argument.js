import { thunk, action } from 'easy-peasy'
import { GetArgument, CreateArgument, UpdateArgument, DeleteArgument } from '../services/argument'
import { GetClaim } from '../services/claim'
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
      const response = await GetArgument(payload.id)
      action.setArgument(response.data)
      if (payload.show) {
        action.setShow(true)
      }
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
  deleteClaim: thunk(async (action, payload) => {
    try {
      action.setLoadingDelete({ loading: true })
      await DeleteArgument(payload)
      action.setLoadingDelete({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingDelete({ loading: false })
    }
  }),
  getArgumentTarget: thunk(async (action, payload) => {
    try {
      console.log(payload)
      console.log(payload.claimId)
      if (payload.claimId) {
        const response = await GetClaim(payload.claimId)
        action.setTargetClaim(response.data)
      } else if (payload.argumentId) {
        const response = await GetArgument(payload.argumentId)
        action.setTargetArgument(response.data)
      }
    } catch (error) {
      handleRequestError(error)
    }
  }),
  setArgument: action((state, payload) => {
    state.argument = payload || {}
  }),
  setTargetArgument: action((state, payload) => {
    state.argument.targetArgument = payload || {}
  }),
  setTargetClaim: action((state, payload) => {
    state.argument.targetClaim = payload || {}
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
