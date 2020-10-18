const { Client, Collection, Permissions} = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const { prefix } = require('./prefix.json')
const { Discord, MessageEmbed } = require('discord.js');
const client = new Client({ disableMentions: 'everyone' })

client.login(process.env.DISCORD_TOKEN)
client.commands = new Collection()
client.prefix = prefix
client.queue = new Map()
const cooldowns = new Collection()
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const express = require("express")
const app = express()

app.get("/", (req, res) => res.sendStatus(200))

app.listen(process.env.PORT)
/**
 * Client Events
 */
// Statement on discord success online


client.on('ready', () => {
  console.log(`${client.user.tag} was Online!\n\nServing of:\n# ${client.guilds.cache.size} servers.\n# ${client.channels.cache.size} channels.\n# ${client.users.cache.size} users`)
  client.user.setPresence({
    status: 'online'
    
    }
  )
})



client.on('ready', () => {

  let statuses = [
    `${prefix}help`,
    `${client.users.cache.size} User`,
    "discord.gg/48YjQ7Y",
    `${client.guilds.cache.size} Server`
  ]
  setInterval(function() {
        let status = statuses [Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "LISTENING"}); // url: "https://www.twitch.tv/aliaz05"}); 
    }, 5000); 
});



client.on('warn', (info) => console.log(info))
client.on('error', console.error)


/**
 * Import all commands on folder commands
 */

const commandFiles = readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
 const command = require(join(__dirname, 'commands', `${file}`))
  client.commands.set(command.name, command)
}


client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`)
  if (!prefixRegex.test(message.content)) return

  const [, matchedPrefix] = message.content.match(prefixRegex)

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection())
  }
  // Add cooldown for every commands handling
  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 1) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(
        `That command is on cooldown for ${timeLeft.toFixed(1)} more seconds!` 
        //`Tolong tunggu ${timeLeft.toFixed(1)} detik untuk menggunakan lagi perintah \`${command.name}\``
      )
    }
  }

  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.channel.send("something wrong with the command").catch(console.error)
  }

})



 client.on('message', message => {
  //const BannedWord = ["darn", "shucks", "frak", "shite"];
  //if( BannedWord.some(word => message.content.includes(word)) ) {
  //message.reply("Oh no you said a bad word!!!");
  // Or just do message.delete();
  //}
  //const lo = ["lo", "lu"];
  //if( lo.some(word => message.content.includes(word)) ) {
  //if (message.author.bot) return
  //message.channel.send("LU");
  //}
  if(message.content === "lo") {
    message.channel.send("Lo >:D");
  }
  if(message.content === "wat") {
    
    message.channel.send("Say what?");
    
  }
  if(message.content === 'lol') {
    message.channel.send('apa elo');
  }
  
  
   
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let tagbot = message.mentions.users.first();
  let auser = message.author;
  if (!tagbot) return;
  if (tagbot.id === auser.id) {
    //message.channel.send(`${auser}, you cant tag yourself!`);
    return;
  } else if (tagbot.id === message.client.user.id) {
    const embed = new MessageEmbed()
    message.reply("Why You Bully Me ?");
    return;
  } 
    
}) 
