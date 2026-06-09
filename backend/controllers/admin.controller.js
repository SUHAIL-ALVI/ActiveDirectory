const whitelistService = require('../services/whitelist.service')

const getAll = async (req, res) => {
  try {
    const users = await whitelistService.getAllUsers()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const addUser = async (req, res) => {
  try {
    const { email, addedBy } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email required' })
    }

    const user = await whitelistService.addUser(email, addedBy)
    res.status(201).json({ message: 'User added', user })

  } catch (err) {
    console.error("ADD USER ERROR:", err)

    // only treat duplicate properly if Mongo says so
    if (err.code === 11000) {
      return res.status(409).json({ error: 'User already exists' })
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}

const removeUser = async (req, res) => {
  try {
    const result = await whitelistService.removeUser(req.params.email)

    if (!result) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'User removed' })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getAll, addUser, removeUser }