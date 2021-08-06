const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'radio',
    run: async (client, message, args) => {

        const radioEmbed = new MessageEmbed()
        .setTitle('Started Playing radio!')

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send("You must be in a voice channel!");

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.reply('I am missing permission!');

        var connection = await voiceChannel.join();
        await connection.voice.setSelfDeaf(true);
        connection.play("https://streams.ilovemusic.de/iloveradio14.mp3").setVolumeLogarithmic(1);

        await message.channel.send(radioEmbed)
    }
}