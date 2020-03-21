# get-music-url bot on Discord server

Discord サーバー上で、特定サイトの URL がメッセージに含まれていたら、そのサービス名と URL を Firebase Realtime Database に記録する Discord bot です。（身内用に作りました。）
現在は YouTube, SoundCloud, Spotify に対応しています。

Discord 側に表示される埋め込みプレーヤーで遡るのが面倒になってしまったために作ったものです。

[フロントのリポジトリはこちらです。](https://github.com/tsuen4/music-list-on-discord-server)

![preview](https://i.imgur.com/eRNCxpS.gif)

## 必要なもの

- Firebase Admin SDK の秘密鍵 (-> ./auth.json)
- Discord Bot Token (-> .env/DISCORD_TOKEN="")
- Firebase のデータベース URL (-> .env/DB_URL="")
- Web サイトの URL (-> .env/SITE_URL="")

## 起動

```bash
npm install
npm start
```
