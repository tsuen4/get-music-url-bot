const admin = require('firebase-admin')
const serviceAccount = require('./auth.json')

exports.init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://music-info-collection-bot.firebaseio.com",
  })
}

exports.submit = (data, guildId, service) => {
  const database = admin.database()
  database.ref(`guild/`).set({
    [guildId]: true
  })

  database.ref(`tracks/${guildId}/${service}`).push({
    url: data.url,
    uploader: data.uploader,
    title: data.title,
    time: new Date().getTime()
  })
}
