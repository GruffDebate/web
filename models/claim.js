import { thunk, action } from 'easy-peasy'
import {
  ListClaims,
  GetClaim,
  GetClaimParents,
  CreateClaim,
  UpdateClaim,
  DeleteClaim,
} from '../services/claim'
import { get } from 'lodash'
import { toaster } from 'evergreen-ui'
import { handleRequestError } from '../utils/api'

const claim = {
  isLoading: false,
  isLoadingForm: false,
  isLoadingDelete: false,
  isShow: false,
  error: '',
  claims: [],
  claim: {
    title: '',
    desc: '',
    img: '',
    start: null,
    end: null,
    contexts: [],
  },
  parents: [],
  listClaims: thunk(async (action, payload) => {
    try {
      const response = await ListClaims()
      action.setClaims(response.data)
    } catch (error) {
      handleRequestError(error)
    }
  }),
  getClaim: thunk(async (action, payload) => {
    try {
      const response = await GetClaim(payload.id)
      action.setClaim(response.data)
      if (payload.show) {
        action.setShow(true)
      }
    } catch (error) {
      handleRequestError(error)
    }
  }),
  getClaimParents: thunk(async (action, payload) => {
    try {
      const response = await GetClaimParents(payload.id)
      action.setClaimParents(response.data)
    } catch (error) {
      handleRequestError(error)
    }
  }),
  createClaim: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await CreateClaim(payload)
      action.setShow(false)
      action.setLoadingForm({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingForm({ loading: false })
    }
  }),
  updateClaim: thunk(async (action, payload) => {
    try {
      action.setLoadingForm({ loading: true })
      await UpdateClaim(payload.id, {
        title: payload.model.title,
        desc: payload.model.desc,
        img: payload.model.img,
        start: payload.model.start,
        end: payload.model.end,
        contexts: payload.model.contexts,
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
      await DeleteClaim(payload)
      action.setLoadingDelete({ loading: false })
    } catch (error) {
      handleRequestError(error)
      action.setLoadingDelete({ loading: false })
    }
  }),
  setClaims: action((state, payload) => {
    state.claims = payload.results || []
  }),
  setClaim: action((state, payload) => {
    state.claim = payload || {}
  }),
  setClaimParents: action((state, payload) => {
    state.parents = payload || []
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
  clearClaim: action((state) => {
    state.claim = {
      title: '',
      desc: '',
      img: '',
      start: null,
      end: null,
      contexts: [],
    }
  }),
}

export default claim
