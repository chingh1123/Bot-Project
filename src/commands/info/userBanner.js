const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "banner",
    category: 'info',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || 
        message.guild.members.cache.get(args[0]) || 
        message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || 
        message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || 
        message.member;

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.reply('give user..?');

        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        })
        .then((res) => {
            const { banner, accent_color } = res.data;

            if (banner) {
                const extension = banner.startsWith("a_") ? '.gif?size=1024' : '.png?size=1024';
                const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;

                const embed = new MessageEmbed()
                    .setDescription(`${member.user.tag}'s banner`)
                    .setImage(url)
                    .setColor('RANDOM')

                message.channel.send(embed);
            }
            else {
                if (accent_color) {
                    const embed = new MessageEmbed()
                        .setDescription(`${member.user.tag} just have a banner color !`)
                        .setColor(accent_color);

                    message.channel.send(embed);
                } else return message.reply(`:x: | ${member.user.tag} doesn't banner image/color !`);
            }
        })
    },
};