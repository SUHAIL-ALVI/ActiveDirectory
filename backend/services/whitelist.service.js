// const Whitelist = require('../models/Whitelist')

// const isWhitelisted = async (email) => {
//   const found = await Whitelist.findOne({ email: email.toLowerCase() })
//   return !!found
// }

// const getAllUsers = async () => {
//   return await Whitelist.find().sort({ addedAt: -1 })
// }

// const addUser = async (email, addedBy = 'admin') => {
//   return await Whitelist.create({ email, addedBy })
// }

// const removeUser = async (email) => {
//   return await Whitelist.findOneAndDelete({ email: email.toLowerCase() })
// }

// module.exports = { isWhitelisted, getAllUsers, addUser, removeUser }

const Whitelist = require('../models/whitelist.model')

const isWhitelisted = async (email) => {
  if (!email) return false

  const user = await Whitelist.findOne({
    email: email.toLowerCase()
  })

  return !!user
}

module.exports = { isWhitelisted }