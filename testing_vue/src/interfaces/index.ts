export interface Group {
  id: number
  name: string
  isActive: boolean
}

export interface User {
  id: number
  username: string
  fullname: string
  age: number
  imagePath: string
  isActive: boolean
  groups: Group[]
}

export interface NewUser {
  username: string
  fullname: string
  password: string
  age?: number | null
  groupIds?: number[]
}

export interface Token {
  accessToken: string
  tokenType: string
}

export interface ChangePassword {
  oldPassword: string
  newPassword: string
}