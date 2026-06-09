const express    = require('express')
const router     = express.Router()
const adminMiddleware = require('../middleware/admin.middleware')
const {
  login, getAll, addUser, updateRole, removeUser
} = require('../controllers/admin.controller')


router.post('/login', login)

//Secured Route.
router.get('/',              adminMiddleware, getAll)
router.post('/',             adminMiddleware, addUser)
router.patch('/:email',      adminMiddleware, updateRole)
router.delete('/:email',     adminMiddleware, removeUser)

module.exports = router