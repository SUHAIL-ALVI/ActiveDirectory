const { verifyAdminToken } = require('../services/token.service')

const adminMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token)
    return res.status(401).json({ error: 'Admin token required' })

  try {
    req.admin = verifyAdminToken(token)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired admin token' })
  }
}

module.exports = adminMiddleware