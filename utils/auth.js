const isBrowser = typeof window !== `undefined`

const getUser = () =>
  window.localStorage.gruff_auth ? JSON.parse(window.localStorage.gruff_auth) : {}

const setUser = (user) => (window.localStorage.gruff_auth = JSON.stringify(user))

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()

  return !!user
}

export const getCurrentUser = () => isBrowser && getUser()
