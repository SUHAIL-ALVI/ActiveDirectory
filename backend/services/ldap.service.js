const { createLDAPClient } = require('../config/ldap')

const bindUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const client = createLDAPClient()

    client.bind(process.env.LDAP_ADMIN_DN, process.env.LDAP_ADMIN_PASSWORD, (err) => {
      if (err) { client.destroy(); return reject(new Error('Admin bind failed')) }

      const opts = { filter: `(uid=${username})`, scope: 'sub', attributes: ['dn', 'mail', 'cn'] }

      client.search(process.env.LDAP_BASE_DN, opts, (err, res) => {
        if (err) { client.destroy(); return reject(new Error('Search failed')) }

        let userDN = null, userEmail = null

//         res.on('searchEntry', (entry) => {
//   console.log('LDAP ENTRY:', entry);

//   userDN = entry.dn.toString();

//   console.log('OBJECT:', entry.object);

//   userEmail = entry.object?.mail;
// });

      res.on('searchEntry', (entry) => {
  console.log('========== LDAP RAW ==========')
  console.dir(entry, { depth: null })
  console.log('==============================')

  userDN = entry.dn.toString()

  try {
    console.log('ENTRY JSON:', entry.pojo)

    if (entry.pojo && entry.pojo.attributes) {
      const mailAttr = entry.pojo.attributes.find(
        attr => attr.type === 'mail'
      )

      if (mailAttr) {
        userEmail = mailAttr.values[0]
      }
    }

    console.log('EXTRACTED EMAIL:', userEmail)

  } catch (err) {
    console.log('EMAIL PARSE ERROR:', err.message)
  }
})


        res.on('end', () => {
          if (!userDN) { client.destroy(); return reject(new Error('User not found')) }

          client.bind(userDN, password, (err) => {
            client.destroy()
            if (err) return reject(new Error('Wrong password'))
            resolve({ userDN, userEmail })
          })
        })
      })
    })
  })
}

module.exports = { bindUser }