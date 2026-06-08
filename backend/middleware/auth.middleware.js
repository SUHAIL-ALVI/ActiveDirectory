const { verifyToken } = require('../services/token.service')

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = authMiddleware