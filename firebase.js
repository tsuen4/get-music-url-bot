const admin = require('firebase-admin')
const serviceAccount = require('./auth.json')
require('dotenv').config()

exports.init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL,
  })
}

exports.submit = (data, time = new Date().getTime()) => {
  const { service, guildId, url } = data
  console.log(service, guildId, url)

  const database = admin.database()
  database.ref(`guild/`).set({
    [guildId]: true
  })

  database.ref(`tracks/${guildId}`).push({
    service: service,
    url: url,
    time: time
  })
}
