const https = require('https')

const YouTubeJSON = (data, want) => {
  try {
    const json = JSON.parse(data)
    if (want == '') {
      return (json)
    } else if (typeof json[want] == 'undefined') {
      return (`Error: Not found key => ${want}`)
    } else {
      return (json[want])
    }
  } catch (err) {
    return (`Error: Not REST API`)
  }
}

const getYouTubeInfo = async (URI, want = '', service) => {
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
          if (service === 'youtube') {
            resolve(YouTubeJSON(data, want))
          } else if (service === 'soundcloud') {
            console.log(data)
          }
        })
      }).on('error', (err) => {
        reject(`Error: Failed connection => ${URI}`)
      })
      req.end()
    })
  }
  return await wrappedGet(URI, want).catch(err => err)
}

module.exports = getYouTubeInfo