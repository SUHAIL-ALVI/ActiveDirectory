require('dotenv').config()
const express         = require('express')
const cors            = require('cors')
const connectDB       = require('./config/db')
const authRoutes      = require('./routes/auth.routes')
const adminRoutes     = require('./routes/admin.routes')
const authMiddleware  = require('./middleware/auth.middleware')
const errorMiddleware = require('./middleware/error.middleware')

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth',            authRoutes)
app.use('/api/admin/whitelist', adminRoutes)

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}! Role: ${req.user.role || 'Employee'}`
  })
})

app.use(errorMiddleware)

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
)