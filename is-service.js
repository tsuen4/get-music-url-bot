const firebase = require('./firebase')

const reg = {
  YouTube: [
    /(https:\/\/youtu\.be\/[^&]*)&?.*/,
    /(https:\/\/www.youtube\.com\/watch\?v=[^&]*)&?.*/,
    /(https:\/\/www.youtube\.com\/playlist\?list=[^&]*)&?.*/,
  ],
  SoundCloud: /(https:\/\/soundcloud\.com\/.+)/
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
  async YouTube (msg, guildId) {
    for (let el of reg.YouTube) {
      const matchYouTube = msg.match(el)
      isMatch(guildId, 'youtube', matchYouTube)
    }
  },
  async SoundCloud (msg, guildId) {
    const matchSoundCloud = msg.match(reg.SoundCloud)
    isMatch(guildId, 'soundcloud', matchSoundCloud)
  }
}

module.exports = is
