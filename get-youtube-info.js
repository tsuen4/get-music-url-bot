const https = require('https')

const reqYouTube = {
  base: 'https://www.googleapis.com/youtube/v3/videos?id=',
  fields: 'items(snippet(title,channelTitle))',
  part: 'snippet'
}

const getJSON = async (URI, want) => {
  if (URI.match(/^.+:\/+$/)) {
    return `Error: Invalid URL => ${URI}`
  }

  const wrappedGet = (URI, want) => {
    return new Promise((resolve, reject) => {
      const req = https.request(URI, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          resolve(YouTubeJSON(data, want))
        })
      }).on('error', (err) => {
        reject(`Error: Failed connection => ${URI}`)
      })
      req.end()
    })
  }
  return await wrappedGet(URI, want).catch(err => err)
}

const YouTubeJSON = (data, want) => {
  try {
    const json = JSON.parse(data)
    if (want == '') {
      return (json)
    } else if (json[want] === undefined) {
      return (`Error: Not found key => ${want}`)
    } else {
      return (json[want])
    }
  } catch (err) {
    return (`Error: Not REST API`)
  }
}

const getYouTubeInfoById = async (YouTubeId, APIKey) => {
  const reqURL = `${reqYouTube.base}${YouTubeId}&key=${APIKey}&fields=${reqYouTube.fields}&part=${reqYouTube.part}`
  const YouTubeURL = `https://youtu.be/${YouTubeId}`
  const getData = (await getJSON(reqURL, 'items'))[0]
  if (getData === undefined) {
    console.log(`Not found URL: https://youtu.be/${YouTubeId}`)
    return null
  }
  return {
    url: YouTubeURL,
    uploader: getData.snippet.channelTitle,
    title: getData.snippet.title
  }
}

module.exports = getYouTubeInfoById