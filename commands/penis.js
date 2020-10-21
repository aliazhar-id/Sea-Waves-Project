module.exports = {
  name: 'penis',
  cooldown: 3,
  description: "Penis Command",
  aliases: "pp",
  execute(message, args) {
    let user = message.mentions.users.first()

    if(!user) user = message.author
    
    message.channel.send({embed: {
      title: `${user.username} Penis`,
      description: `8${"=".repeat(Math.floor(Math.random() * 18))}D`
    }})
  }
}
