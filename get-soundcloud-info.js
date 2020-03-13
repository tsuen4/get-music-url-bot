const puppeteer = require('puppeteer')

const SoundCloudScraping = async (page, URL) => {
  await page.goto(URL)
  return await page.evaluate(() => {
    const returnData = {
      url: URL,
      artist: null,
      title: null
    }
    // 見つからなかったらエラー吐きます
    returnData.artist = document.querySelector('.soundTitle__username').innerText
    returnData.title = document.querySelector('meta[property="og:title"]').getAttribute('content')
    return returnData
  })
}

const getSoundCloudInfo = async (URL) => {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    const page = await browser.newPage()

    const info = await SoundCloudScraping(page, URL)
    // console.log(info.artist)
    // console.log(info.title)

    browser.close()
    return info
  } catch (e) {
    console.log(`Not found URL: ${URL}`)
    // console.error(e)
  }
}

module.exports = getSoundCloudInfo
