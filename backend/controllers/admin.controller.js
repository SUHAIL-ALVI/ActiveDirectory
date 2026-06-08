const whitelistService = require('../services/whitelist.service')

const getAll = async (req, res) => {
  const users = await whitelistService.getAllUsers()
  res.json(users)
}

const addUser = async (req, res) => {
  const { email, addedBy } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })
  try {
    const user = await whitelistService.addUser(email, addedBy)
    res.status(201).json({ message: 'User added', user })
  } catch {
    res.status(409).json({ error: 'User already exists' })
  }
}

const removeUser = async (req, res) => {
  const result = await whitelistService.removeUser(req.params.email)
  if (!result) return res.status(404).json({ error: 'User not found' })
  res.json({ message: 'User removed' })
}

module.exports = { getAll, addUser, removeUser }