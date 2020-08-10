import { thunk, action } from 'easy-peasy'
import {
  ListContext,
  FilterContext,
  GetContext,
  CreateContext,
  UpdateContext,
  DeleteContext,
} from '../services/context'
import { get } from 'lodash'
import { toaster } from 'evergreen-ui'
import { handleRequestError } from '../utils/api'

const context = {
  isLoading: false,
  isLoadingForm: false,
  isShow: false,
  error: '',
  contexts: [],
  context: {
    name: '',
    title: '',
    desc: '',
    url: '',
    mid: '',
    qid: '',
  },
  list: thunk(async (action) => {
    try {
      const response = await ListContext()
      action.setList(response.data)
    } catch (error) {
      handleRequestError(error)
    }
  }),
  filter: thunk(async (action, payload) => {
    try {
      const response = await FilterContext(payload.search)
      action.setList(response.data)
    } catch (error) {
      handleRequestError(error)
    }
  }),
  get: thunk(async (action, payload) => {
    try {
      const response = await GetContext(payload.id)
      action.setModel(response.data)
      if (payload.show) {
        action.setShow(true)
      }
    } catch (error) {
      handleRequestError(error)
    }
  }),
  create: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await CreateContext(payload)
      action.setShow(false)
      action.setLoadingForm({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingForm({ loading: false })
    }
  }),
  update: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await UpdateContext(payload._key, {
        name: payload.model.name,
        title: payload.model.title,
        desc: payload.model.desc,
        url: payload.model.url,
        mid: payload.model.mid,
        qid: payload.model.qid,
        _key: payload.model._key,
      })
      action.setShow(false)
      action.setLoadingForm({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingForm({ loading: false })
    }
  }),
  delete: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await DeleteContext(payload)
      action.setLoadingForm({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingForm({ loading: false })
    }
  }),
  setList: action((state, payload) => {
    state.contexts = payload.results || []
    console.dir(state.contexts)
  }),
  setModel: action((state, payload) => {
    state.context = payload || {}
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
  clear: action((state) => {
    state.context = {
      name: '',
      title: '',
      desc: '',
      url: '',
      mid: '',
      qid: '',
    }
  }),
}

export default context
