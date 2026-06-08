const mongoose = require('mongoose')

const whitelistSchema = new mongoose.Schema({
  email:   { type: String, required: true, unique: true, lowercase: true, trim: true },
  addedAt: { type: Date, default: Date.now },
  addedBy: { type: String, default: 'admin' }
})

module.exports = mongoose.model('Whitelist', whitelistSchema)