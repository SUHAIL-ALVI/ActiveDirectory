const express    = require('express')
const router     = express.Router()
const adminMiddleware = require('../middleware/admin.middleware')
const {
  login, getAll, addUser, updateRole, removeUser
} = require('../controllers/admin.controller')

// Public — admin login
router.post('/login', login)

// Protected — all below require admin JWT
router.get('/',              adminMiddleware, getAll)
router.post('/',             adminMiddleware, addUser)
router.patch('/:email',      adminMiddleware, updateRole)
router.delete('/:email',     adminMiddleware, removeUser)

module.exports = router