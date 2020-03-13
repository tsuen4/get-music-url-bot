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

  database.ref(`tracks/${guildId}/${service}`).push({
    url: data.url,
    uploader: data.uploader,
    title: data.title,
  })
}
