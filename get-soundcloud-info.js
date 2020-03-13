const puppeteer = require('puppeteer')

const SoundCloudScraping = async (page, URL) => {
  await page.goto(URL)
  return await page.evaluate(() => {
    const returnData = {
      url: null,
      uploader: null,
      title: null
    }
    // 見つからなかったらエラー吐きます
    returnData.uploader = document.querySelector('.soundTitle__username').innerText
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

    const getData = await SoundCloudScraping(page, URL)
    getData.url = URL
    // console.log(getData.artist)
    // console.log(getData.title)

    browser.close()
    return getData
  } catch (e) {
    console.log(`Not found URL: ${URL}`)
    // console.error(e)
  }
}

module.exports = getSoundCloudInfo
