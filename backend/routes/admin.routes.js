const express = require('express')
const router  = express.Router()
const adminMiddleware = require('../middleware/admin.middleware')
const { getAll, addUser, removeUser } = require('../controllers/admin.controller')

router.use(adminMiddleware)
router.get('/',          getAll)
router.post('/',         addUser)
router.delete('/:email', removeUser)

module.exports = router