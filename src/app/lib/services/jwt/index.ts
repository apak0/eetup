import { bFetch } from '../baseFetch'

import { LoginRequest } from './types'

const getCurrentUser = async () => {
  return await bFetch({ url: `/users/me` })
}

const login = async (body: LoginRequest) => {
  return await bFetch({
    url: '/auth/login',
    method: 'POST',
    body,
  })
}

const logout = async () => {
  return await bFetch({
    url: '/auth/logout',
    method: 'POST',
  })
}

const register = async (body: FormData) => {
  return await bFetch({
    url: '/auth/register',
    method: 'POST',
    body,
  })
}

export { getCurrentUser, login, logout, register }
