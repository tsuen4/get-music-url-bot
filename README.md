# music-info-collection bot

Discord サーバー上で、特定サイトの URL がメッセージに含まれていたら、そのサービス名と URL を Firebase Realtime Database に記録する Discord bot です。（身内用に作りました。）

[フロントのリポジトリはこちらです。](https://github.com/tsuen4/music-info-collection-front)

![preview](https://i.imgur.com/rtIYdAj.gif)

## 必要なもの

- Firebase のプロジェクト (Firebase Realtime Database URL -> firebase.js)
- Firebase Admin SDK の秘密鍵 (-> auth.json)
- Discord Bot Token (-> .env/DISCORD_TOKEN="")

## 起動

```bash
npm install
npm start
```
