# get-music-url bot on Discord server

Discord サーバー上で、特定サイトの URL がメッセージに含まれていたら、そのサービス名と URL を Firebase Realtime Database に記録する Discord bot です。（身内用に作りました。）

[フロントのリポジトリはこちらです。](https://github.com/tsuen4/music-list-on-discord-server)

![preview](https://i.imgur.com/rtIYdAj.gif)

## 必要なもの

- Firebase Admin SDK の秘密鍵 (-> auth.json)
- Discord Bot Token (-> .env/DISCORD_TOKEN="")
- Firebase のデータベース URL (-> .env/DB_URL="")
- Web サイトの URL (-> .env/SITE_URL="")

## 起動

```bash
npm install
npm start
```
