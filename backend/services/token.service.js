const jwt = require('jsonwebtoken')

// Token for user
const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET)

// admin token..
const signAdminToken = (payload) =>
  jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn: '8h' })

const verifyAdminToken = (token) =>
  jwt.verify(token, process.env.ADMIN_JWT_SECRET)

module.exports = { signToken, verifyToken, signAdminToken, verifyAdminToken }