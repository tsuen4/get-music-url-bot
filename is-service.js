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
      const matchYouTube = msg.match(el)
      isMatch(guildId, 'youtube', matchYouTube)
    }
  },
  SoundCloud (msg, guildId) {
    const matchSoundCloud = msg.match(reg.SoundCloud)
    isMatch(guildId, 'soundcloud', matchSoundCloud)
  },
  Spotify (msg, guildId) {
    const matchSpotify = msg.match(reg.Spotify)
    isMatch(guildId, 'spotify', matchSpotify)
  }
}

module.exports = is
