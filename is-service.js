const firebase = require('./firebase')

const getYouTubeInfo = require('./get-youtube-info')
const getSoundCloudInfo = require('./get-soundcloud-info')

const regYouTube = [/.*e\/([^&]*)&?.*$/, /.*watch\?v=([^&]*)&?.*/]
const regSoundCloud = /(https:\/\/soundcloud\.com\/.+)/

const reqYouTube = {
  base: 'https://www.googleapis.com/youtube/v3/videos?id=',
  fields: 'items(snippet(title,channelTitle))',
  part: 'snippet'
}

const is = {
  async YouTube (msg, key) {
    for (let el of regYouTube) {
      const matchYouTube = msg.content.match(el)
      if (matchYouTube) {
        const id = matchYouTube[1]
        const reqUrl = `${reqYouTube.base}${id}&key=${key}&fields=${reqYouTube.fields}&part=${reqYouTube.part}`

        const YouTubeUrl = `https://youtu.be/${id}`
        const getDataTmp = await getYouTubeInfo(reqUrl, 'items', 'youtube')
        const getData = {
          channel: getDataTmp[0].snippet.channelTitle,
          title: getDataTmp[0].snippet.title
        }
        firebase.submit(YouTubeUrl, getData, msg.guild.id, 'youtube')
      }
    }
  },
  async SoundCloud (msg) {
    const matchSoundCloud = msg.content.match(regSoundCloud)
    if (matchSoundCloud) {
      const SoundCloudUrl = matchSoundCloud[1]
      const getData = await getSoundCloudInfo(SoundCloudUrl)
      firebase.submit(SoundCloudUrl, getData, msg.guild.id, 'soundcloud')
    }
  }
}

module.exports = is
