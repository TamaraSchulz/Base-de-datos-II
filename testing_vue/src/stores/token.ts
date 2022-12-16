import { defineStore } from 'pinia'
import { User } from '@/interfaces'
import { getStorageItem } from './utils'

interface TokenState {
  token: string | null
  tokenType: string | null
  user: User | null
}

export const useTokenStore = defineStore({
  id: 'token',
  state: (): TokenState => ({
    token: getStorageItem<string>('token', null),
    tokenType: getStorageItem<string>('tokenType', null),
    user: getStorageItem<User>('user', null, true),
  }),
  getters: {
    isAuthenticated: (state: TokenState) => state.token != null,
  },
  actions: {
    setToken(token: string, tokenType: string) {
      this.token = token
      this.tokenType = tokenType

      localStorage.setItem('token', token)
      localStorage.setItem('tokenType', tokenType)
    },
    setUser(user: User) {
      this.user = user

      localStorage.setItem('user', JSON.stringify(user))
    },
    clearData() {
      this.user = null
      this.token = null
      this.tokenType = null

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('tokenType')
    },
  },
})
