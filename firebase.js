const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {

}

exports.init = () => {
  firebase.initializeApp(firebaseConfig)
}

exports.submit = (data, guildId, service) => {
  const database = firebase.database()
  database.ref(`guild/`).set({
    [guildId]: true
  })

  if (service === 'soundcloud') {
    database.ref(`tracks/soundcloud/${guildId}`).push({
      url: data.url,
      artist: data.artist,
      title: data.title,
    })
  } else if (service === 'youtube') {
    database.ref(`tracks/youtube/${guildId}`).push({
      url: data.url,
      channel: data.channel,
      title: data.title,
    })
  }
}
