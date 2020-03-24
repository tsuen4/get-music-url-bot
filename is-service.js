const firebase = require('./firebase')

const reg = {
  YouTube: [
    /(https:\/\/youtu\.be\/[^&]*)&?.*/,
    /(https:\/\/(m|www)\.youtube\.com\/watch\?v=[^&]*)&?.*/,
    /(https:\/\/(m|www)\.youtube\.com\/playlist\?list=[^&]*)&?.*/,
    /(https:\/\/(m|www)\.youtube\.com\/channel\/[^?]*).*/,
  ],
  SoundCloud: /(https:\/\/(m\.)?soundcloud\.com\/.+)/,
  Spotify: /(https:\/\/open\.spotify\.com\/[^?]+)\??.*/,
  Bandcamp: /(https:\/\/.*\.bandcamp.com\/.*)/,
  AppleMusic: /(https:\/\/music\.apple\.com\/.+)/,
  Beatport: /(https:\/\/www\.beatport\.com\/.+)/,
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
  },
  Bandcamp (msg, guildId) {
    const match = msg.match(reg.Bandcamp)
    isMatch(guildId, 'bandcamp', match)
  },
  AppleMusic (msg, guildId) {
    const match = msg.match(reg.AppleMusic)
    isMatch(guildId, 'applemusic', match)
  },
  Bearport (msg, guildId) {
    const match = msg.match(reg.Beatport)
    isMatch(guildId, 'beatport', match)
  }
}

module.exports = is
