const puppeteer = require('puppeteer')

const getMusicInfo = async (page, url) => {
  await page.goto(url)
  return await page.evaluate(() => {
    const getData = {
      artist: document.querySelector('.soundTitle__username').innerText,
      title: document.querySelector('meta[property="og:title"]').getAttribute('content')
    };
    return getData
  })
}

const getSoundCloudInfo = async (url) => {
  try {
    const browser = await puppeteer.launch({ 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    const page = await browser.newPage()

    const info = await getMusicInfo(page, url)
    // console.log(info.artist)
    // console.log(info.title)

    browser.close()
    return info
  } catch (e) {
    console.error(e)
  }
}

module.exports = getSoundCloudInfo
