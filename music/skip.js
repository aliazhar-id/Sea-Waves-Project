module.exports = {
	name: 'skip',
	description: 'Skip a song!',
  aliases: ['s'],
	execute(message) {
		if (message.channel.id === '762841675994234913' || message.channel.id === '755087414011363489') {
    const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
		if (!serverQueue) return message.channel.send('There is no song that I could skip!');
		serverQueue.connection.dispatcher.end();
    }	},
};
