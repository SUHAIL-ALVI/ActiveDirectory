import api from './api'

const headers = { 'x-admin-secret': 'adminkey999' }

export const getWhitelist  = ()      => api.get('/api/admin/whitelist', { headers })
export const addToWhitelist    = (email) => api.post('/api/admin/whitelist', { email }, { headers })
export const removeFromWhitelist = (email) => api.delete(`/api/admin/whitelist/${email}`, { headers })