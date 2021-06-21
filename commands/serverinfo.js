const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  execute(message, args) {
     if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let channels = message.guild.channels
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size;
        var server = message.guild.id;
    var serverIcon = message.guild.iconURL()
    const InfoEmbed = {
    color: message.guild.me.displayColor,
    author: {
              name: `${message.guild.name}`,
              icon_url: `${serverIcon}`
            },
    fields: [
		{
			name: '**Owner**',
			value: `<@${message.guild.ownerID}>`,
      inline: true,
		},
		{
			name: '**Region**',
			value: `${message.guild.region}`,
			inline: true,
		},
		{
			name: 'Channel Categories',
			value: ` ${category}`,
			inline: true,
		},
		{
			name: '**Text Channel**',
			value: `${text}`,
			inline: true,
		},
    {
		  name: '**Voice Channel**',
			value: `${vc}`,
			inline: true,
		},
    {
			name: '**Members**',
			value: `${message.guild.memberCount}`,
			inline: true,
		}, 
    {
			name: '**Roles**',
			value: `${message.guild.roles.cache.size}`,
			inline: true,
		},   
	],
      
    footer: {
		  text: `ID: ${message.guild.id} | Server Created • ${moment(message.guild.createdAt).format("MM/DD/YYYY")}`,
	},
      
    }
    message.channel.send({ embed: InfoEmbed });
 }
}