const firebase = require('./firebase')

const reg = {
  YouTube: [
    /(https:\/\/youtu\.be\/[^&]*)&?.*/,
    /(https:\/\/(m\.)?youtube\.com\/watch\?v=[^&]*)&?.*/,
    /(https:\/\/(m\.)?youtube\.com\/playlist\?list=[^&]*)&?.*/,
  ],
  SoundCloud: /(https:\/\/(m\.)?soundcloud\.com\/.+)/,
}

const isMatch = (guildId, service, matchedText) => {
  if (matchedText) {
    const url = matchedText[1]
    const data = {
      guildId: guildId,
      service: service,
      url: url
    }
    firebase.submit(data)
  }
}

const is = {
  YouTube (msg, guildId) {
    for (let el of reg.YouTube) {
      const match = msg.match(el)
      isMatch(guildId, 'youtube', match)
    }
  },
  SoundCloud (msg, guildId) {
    const match = msg.match(reg.SoundCloud)
    isMatch(guildId, 'soundcloud', match)
  },
  Spotify (msg, guildId) {
    const match = msg.match(reg.Spotify)
    isMatch(guildId, 'spotify', match)
  }
}

module.exports = is
