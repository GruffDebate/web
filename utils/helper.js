import get from 'lodash/get'
import { auth as useAuth } from '../hooks/auth'

export const isBrowser = typeof window !== `undefined`

export const dateTimeFormater = (value) => {
  if (value !== '') {
    return `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`
  }
  return value
}

export const userId = () => {
  const { auth, cachedAuth } = useAuth(false)
  const isAuth = !!get(auth, 'token', false) || !!get(cachedAuth, 'token', false)

  if (isAuth) {
    return get(auth, 'user.id', 0) || get(cachedAuth, 'user.id', 0)
  }

  return 0
}

export const isCurator = () => {
  const { auth, cachedAuth } = useAuth(false)
  const isAuth = !!get(auth, 'token', false) || !!get(cachedAuth, 'token', false)

  if (isAuth) {
    return get(auth, 'user.curator', 0) || get(cachedAuth, 'user.curator', 0)
  }

  return 0
}

export const cleanUrl = (str) => {
  return (
    str &&
    str
      .replace(/ /g, '-')
      .toLowerCase()
      .replace('/', '')
      .replace('__', '-')
  )
}
