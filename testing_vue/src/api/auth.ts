import { apiFetch } from '.'
import { Token } from '../interfaces'

async function login(username: string, password: string): Promise<Token> {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')

  return apiFetch('/token', 'POST', params, {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
}

export { login }
