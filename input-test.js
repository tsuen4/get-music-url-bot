const firebase = require('./firebase')
firebase.init()

const is = require('./is-service')


const guildId = ''
const input = require('fs').readFileSync('/dev/stdin', 'utf8')
// 1 行ごとに見る
const content = input.split('\n')
for (const line of content) {
  // どのサービスに当てはまるか判定してもらう
  for (const service of Object.keys(is)) {
    is[service](line, guildId)
  }
}
