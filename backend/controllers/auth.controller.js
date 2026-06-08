// const { bindUser }      = require('../services/ldap.service')
// const { isWhitelisted } = require('../services/whitelist.service')
// const { signToken }     = require('../services/token.service')
// const logger            = require('../utils/logger')

// const login = async (req, res) => {
//   const { username, password } = req.body

//   if (!username || !password)
//     return res.status(400).json({ error: 'Username and password required' })

//   try {
//     const { userEmail } = await bindUser(username, password)

//     const allowed = await isWhitelisted(userEmail)
//     if (!allowed) {
//       logger.warn(`Whitelist denied: ${username}`)
//       return res.status(401).json({ error: 'Invalid credentials' })
//     }

//     const token = signToken({ username, email: userEmail })
//     logger.info(`Login success: ${username}`)
//     res.json({ token, displayName: username })

//   } catch (err) {
//     logger.warn(`Login failed: ${username} — ${err.message}`)
//     res.status(401).json({ error: 'Invalid credentials' })
//   }
// }

// module.exports = { login }

const { bindUser } = require('../services/ldap.service')
const { isWhitelisted } = require('../services/whitelist.service')
const { signToken } = require('../services/token.service')
const logger = require('../utils/logger')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password required'
    })
  }

  try {
    const { userEmail } = await bindUser(username, password)

    console.log('\n========== LOGIN DEBUG ==========')
    console.log('USERNAME:', username)
    console.log('USER EMAIL:', userEmail)

    const allowed = await isWhitelisted(userEmail)

    console.log('WHITELIST RESULT:', allowed)
    console.log('=================================\n')

    if (!allowed) {
      logger.warn(`Whitelist denied: ${username}`)

      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    const token = signToken({
      username,
      email: userEmail
    })

    logger.info(`Login success: ${username}`)

    return res.json({
      token,
      displayName: username
    })

  } catch (err) {
    console.log('\n========== LOGIN ERROR ==========')
    console.log('USERNAME:', username)
    console.log('ERROR MESSAGE:', err.message)
    console.log('FULL ERROR:', err)
    console.log('=================================\n')

    logger.warn(`Login failed: ${username} — ${err.message}`)

    return res.status(401).json({
      error: 'Invalid credentials'
    })
  }
}

module.exports = { login }