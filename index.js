const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
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

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(error.name);
	}
});

client.login(token);
