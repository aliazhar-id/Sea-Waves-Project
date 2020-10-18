module.exports = {
  name: 'say',
  cooldown: 3,
  description: 'say.',
    execute (message, args) {
      if (!message.member.permissions.has("ADMINISTRATOR")) return;
      //if(message.author.id !== process.env.ownerID) return;
      //const { client } = require('discord.js')
     // const prefix = require('./prefix.json')
      //client.prefix = prefix
      const sayMessage = args.join(' ')
      if (!sayMessage) return message.channel.send("type ,say <message>");
      message.delete().catch(O_o => {})
      message.channel.send(sayMessage)
  }
}
