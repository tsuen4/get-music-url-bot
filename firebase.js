const admin = require('firebase-admin')
const serviceAccount = require('./auth.json')

exports.init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://music-info-collection-bot.firebaseio.com",
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
