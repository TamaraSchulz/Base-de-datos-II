function getStorageItem<T>(
  key: string,
  defaultValue: T | null = null,
  json = false
): T | null {
  if (!['', null].includes(localStorage.getItem(key))) {
    if (json) {
      try {
        return JSON.parse(String(localStorage.getItem(key)))
      } catch (e) {
        return defaultValue
      }
    }
    return localStorage.getItem(key) as T
  } else {
    return defaultValue
  }
}

export { getStorageItem }
