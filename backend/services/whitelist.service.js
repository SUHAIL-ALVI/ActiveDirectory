const Whitelist = require('../models/whitelist.model')

// CHECK
const isWhitelisted = async (email) => {
  if (!email) return false

  const found = await Whitelist.findOne({
    email: email.toLowerCase()
  })

  return !!found
}

// GET ALL users
const getAllUsers = async () => {
  return await Whitelist.find().sort({ addedAt: -1 })
}

// ADD user...
const addUser = async (email, role = 'Employee', addedBy = 'admin') => {
  return await Whitelist.create({
    email: email.toLowerCase(),
    role,
    addedBy
  })
}

// REMOVE users...
const removeUser = async (email) => {
  return await Whitelist.findOneAndDelete({
    email: email.toLowerCase()
  })
}

// UPDATE ROLE 
const updateRole = async (email, role) => {
  return await Whitelist.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role },
    { new: true }
  )
}

module.exports = {
  isWhitelisted,
  getAllUsers,
  addUser,
  removeUser,
  updateRole
}