import api from './api'

export const login = (username, password) =>
  api.post('/api/auth/login', {
    username,
    password,
  })

export const getDashboard = (token) =>
  api.get('/api/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })