import api from './api'

// ===== TOKEN STORAGE =====
let adminToken = null

export const setAdminToken = (token) => {
  adminToken = token
}

export const getAdminToken = () => {
  return adminToken
}

export const clearAdminToken = () => {
  adminToken = null
}

// ===== HEADERS =====
const adminHeaders = () => ({
  headers: {
    Authorization: `Bearer ${adminToken}`
  }
})

// ===== AUTH =====
export const adminLogin = (username, password) => {
  return api.post('/api/admin/whitelist/login', { username, password })
}

// ===== WHITELIST =====
export const getWhitelist = () => {
  return api.get('/api/admin/whitelist', adminHeaders())
}

export const addToWhitelist = (email, role) => {
  return api.post('/api/admin/whitelist', { email, role }, adminHeaders())
}

export const updateUserRole = (email, role) => {
  return api.patch(
    `/api/admin/whitelist/${encodeURIComponent(email)}`,
    { role },
    adminHeaders()
  )
}

export const removeFromWhitelist = (email) => {
  return api.delete(
    `/api/admin/whitelist/${encodeURIComponent(email)}`,
    adminHeaders()
  )
}