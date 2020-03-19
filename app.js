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
  console.log(`message: ${msg.content}`)
  if (msg.author.bot) {
    return
  } else if (msg.content === '!list') {
    msg.channel.send(`list => https://music-info-collection-bot.firebaseapp.com/${msg.guild.id}/youtube`)
  } else {
    is.YouTube(msg)
    is.SoundCloud(msg)

    console.log(msg.guild.id)
  }
})

client.login(discordToken)
