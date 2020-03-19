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
  async YouTube (msg) {
    for (let el of reg.YouTube) {
      const matchYouTube = msg.content.match(el)
      isMatch(msg.guild.id, 'youtube', matchYouTube)
    }
  },
  async SoundCloud (msg) {
    const matchSoundCloud = msg.content.match(reg.SoundCloud)
    isMatch(msg.guild.id, 'soundcloud', matchSoundCloud)
  }
}

module.exports = is
