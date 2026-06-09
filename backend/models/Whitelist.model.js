const Whitelist = require('../models/whitelist.model')

// GET ALL USERS
const getAllUsers = async () => {
  return await Whitelist.find().sort({ addedAt: -1 })
}

// ADD USER
const addUser = async (email, addedBy = 'admin') => {
  const exists = await Whitelist.findOne({ email: email.toLowerCase() })

  if (exists) {
    const err = new Error('User already exists')
    err.code = 11000
    throw err
  }

  const user = new Whitelist({
    email: email.toLowerCase(),
    addedBy
  })

  return await user.save()
}

// REMOVE USER
const removeUser = async (email) => {
  return await Whitelist.findOneAndDelete({
    email: email.toLowerCase()
  })
}

// CHECK WHITELIST
const isWhitelisted = async (email) => {
  if (!email) return false

  const user = await Whitelist.findOne({
    email: email.toLowerCase()
  })

  return !!user
}

module.exports = {
  getAllUsers,
  addUser,
  removeUser,
  isWhitelisted
}