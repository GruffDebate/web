const isBrowser = typeof window !== `undefined`

export const checkLocalStorage = (key, defaultValue) =>
  isBrowser && localStorage.getItem(`${key}`)
    ? JSON.parse(localStorage.getItem(`${key}`) || '')
    : defaultValue

export const setInLocalStorage = (key, payload) =>
  isBrowser && localStorage.setItem(`${key}`, JSON.stringify(payload))
