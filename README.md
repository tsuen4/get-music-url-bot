# music-info-collection bot

Discord サーバーに送信されたメッセージに YouTube または SoundCloud の URL が含まれていたら、そのタイトルと投稿者の情報を Firebase Realtime Database に記録する Discord bot です。（身内用に作りました。）

YouTube の情報は [YouTube Data API](https://developers.google.com/youtube/v3/getting-started) を利用して取得し、SoundCloud の情報は [Puppeteer](https://github.com/puppeteer/puppeteer) でスクレイピングして取得しました。（API Key の新規取得ができないため）

[フロントのリポジトリはこちらです。](https://github.com/tsuen4/music-info-collection-front)

![preview](https://i.imgur.com/rtIYdAj.gif)

## 必要なもの

- Firebase のプロジェクト (Firebase Realtime Database URL -> firebase.js)
- Firebase Admin SDK の秘密鍵 (-> auth.json)
- Discord Bot Token (-> .env/DISCORD_TOKEN="")
- YouTube API Key (-> .env/YOUTUBE_API_KEY="")

## 起動

```bash
npm install
npm start
```
