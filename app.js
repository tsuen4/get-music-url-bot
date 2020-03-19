const firebase = require('./firebase')
firebase.init()

const Discord = require('discord.js')
const client = new Discord.Client()

const is = require('./is-service')

require('dotenv').config()
const discordToken = process.env.DISCORD_TOKEN
if (!discordToken) {
  console.error("Not found Discord token.")
  process.exit(1)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async msg => {
  const guildId = msg.guild.id
  if (msg.author.bot) {
    return
  } if (msg.content === '!list') {
    msg.channel.send(`list => https://music-info-collection-bot.firebaseapp.com/${guildId}/youtube`)
  } else {
    // console.log(`message: ${msg.content}`)
    const content = msg.content.split('\n')

    for (line of content) {
      is.YouTube(line, guildId)
      is.SoundCloud(line, guildId)
    }
  }
})

client.login(discordToken)
