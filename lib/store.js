import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, createTypedHooks } from 'easy-peasy'
import model from '../models'

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks()

export { useStoreActions as useActions, useStoreDispatch as useDispatch, useStoreState as useStore }

const dev = process.env.NODE_ENV !== 'production'

let devTools = {}
if (dev) {
  devTools = {
    compose: composeWithDevTools({ realtime: true, trace: true }),
  }
}

export function initializeStore() {
  return createStore(model, devTools)
}
