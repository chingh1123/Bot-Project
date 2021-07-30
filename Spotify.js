const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'spotify',
    description: 'check spotify status',
    cooldown: 3000,
    run: async (client, message, args) => {

        if (!args[0]) return message.channel.send(
            '<:spotify:864183397398872109> Notice: This command is check for the users spotify activities info!\n <:spotify:864183397398872109> Check users spotify info type `gh-spotify <@user>`! '
        )

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        user.presence.activities.forEach((activity) => {
            if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {

                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",")

                const embed = new Discord.MessageEmbed()
                    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addField('__Song Name:__', `\`\`\`json\n"${trackName}"\n\`\`\``, true)
                    .addField('__Album:__', `\`\`\`json\n"${trackAlbum}"\n\`\`\``, true)
                    .addField('__Author:__', `\`\`\`json\n"${trackAuthor}"\n\`\`\``, true)
                    .addField('__URL Track:__', `${trackURL}`, false)
                    .setTimestamp()
                    .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
                message.lineReplyNoMention(embed);

            }
        })
    }
}
