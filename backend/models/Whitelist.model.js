const mongoose = require('mongoose')

const whitelistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Employee'],
      default: 'Employee'
    },

    addedAt: {
      type: Date,
      default: Date.now
    },

    addedBy: {
      type: String,
      default: 'admin',
      trim: true
    }
  },
  {
    versionKey: false
  }
)

// safety: prevent duplicate race conditions
whitelistSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('Whitelist', whitelistSchema)