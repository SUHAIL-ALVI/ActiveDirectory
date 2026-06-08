const ldap = require('ldapjs')

const createLDAPClient = () => {
  return ldap.createClient({ url: process.env.LDAP_URL })
}

module.exports = { createLDAPClient }