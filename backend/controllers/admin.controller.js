const whitelistService = require('../services/whitelist.service')
const { signAdminToken } = require('../services/token.service')
const logger = require('../utils/logger')

// ── Admin Login ──────────────────────────────────────────
const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' })

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    logger.warn(`Admin login failed: ${username}`)
    return res.status(401).json({ error: 'Invalid admin credentials' })
  }

  const token = signAdminToken({ username, role: 'admin' })
  logger.info(`Admin login success: ${username}`)
  res.json({ token, username })
}

// ── Get all whitelisted users ────────────────────────────
const getAll = async (req, res) => {
  const users = await whitelistService.getAllUsers()
  res.json(users)
}

// ── Add user ─────────────────────────────────────────────
const addUser = async (req, res) => {
  const { email, role, addedBy } = req.body
  if (!email)
    return res.status(400).json({ error: 'Email required' })

  const validRoles = ['Admin', 'Manager', 'Employee']
  const assignedRole = validRoles.includes(role) ? role : 'Employee'

  try {
    const user = await whitelistService.addUser(email, assignedRole, addedBy || 'admin')
    logger.info(`User added: ${email} as ${assignedRole}`)
    res.status(201).json({ message: 'User added', user })
  } catch {
    res.status(409).json({ error: 'User already exists' })
  }
}

// ── Update role ──────────────────────────────────────────
const updateRole = async (req, res) => {
  const { email } = req.params
  const { role }  = req.body

  const validRoles = ['Admin', 'Manager', 'Employee']
  if (!validRoles.includes(role))
    return res.status(400).json({ error: 'Invalid role. Must be Admin, Manager, or Employee' })

  const updated = await whitelistService.updateRole(email, role)
  if (!updated)
    return res.status(404).json({ error: 'User not found' })

  logger.info(`Role updated: ${email} → ${role}`)
  res.json({ message: 'Role updated', user: updated })
}

// ── Remove user ──────────────────────────────────────────
const removeUser = async (req, res) => {
  const result = await whitelistService.removeUser(req.params.email)
  if (!result)
    return res.status(404).json({ error: 'User not found' })

  logger.info(`User removed: ${req.params.email}`)
  res.json({ message: 'User removed' })
}

module.exports = { login, getAll, addUser, updateRole, removeUser }