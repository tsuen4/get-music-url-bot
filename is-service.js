const firebase = require('./firebase')

const getYouTubeInfoById = require('./get-youtube-info')
const getSoundCloudInfo = require('./get-soundcloud-info')

const regYouTube = [/.*e\/([^&]*)&?.*$/, /.*watch\?v=([^&]*)&?.*/]
const regSoundCloud = /(https:\/\/soundcloud\.com\/.+)/

const is = {
  async YouTube (msg, APIKey) {
    for (let el of regYouTube) {
      const matchYouTube = msg.content.match(el)
      if (matchYouTube) {
        const YouTubeId = matchYouTube[1]
        const getData = await getYouTubeInfoById(YouTubeId, APIKey)
        if (!getData) { return null }
        firebase.submit(getData, msg.guild.id, 'youtube')
      }
    }
  },
  async SoundCloud (msg) {
    const matchSoundCloud = msg.content.match(regSoundCloud)
    if (matchSoundCloud) {
      const SoundCloudUrl = matchSoundCloud[1]
      const getData = await getSoundCloudInfo(SoundCloudUrl)
      if (!getData) { return null }
      firebase.submit(getData, msg.guild.id, 'soundcloud')
    }
  }
}

module.exports = is
