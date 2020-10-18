module.exports = {
	name: 'nowplaying',
	description: 'Get the song that is playing.',
  aliases: ['np'],
	execute(message) {
		if (message.channel.id === '762841675994234913' || message.channel.id === '755087414011363489') {
    const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
	}},
}; //apappa
