const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
  name: "help-test",
  category: 'Help Commands Info',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {

    const button1 = new MessageButton()
        .setStyle('url')
        .setEmoji('862859342919368766')
        .setLabel('Invite')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=837564399833055272&permissions=8&scope=bot');

    const button2 = new MessageButton()
        .setStyle('url')
        .setEmoji('862952568078598145')
        .setLabel('Upvote')
        .setURL('https://discord.ly/cgh');

    let member = message.mentions.users.first() || message.author

    const helpEmbed = new MessageEmbed()
        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))

        .setDescription('<a:arrow:852776046814035994> **__Prefix of CGH Bot is__**:  `gh-` \n <a:arrow:852776046814035994> **Have any questions about bot? Welcome to contact ``ChinGH | YT#1123`` !**')

        .setColor('#2F3136')

        .addField(`🖼️ IMAGES / GIF`, '`help image`', true)

        .addField(`<a:820871637569372170:864685501131128842> MINI GAMES / FUN`, '`help fun-games`', true)

        .addField(`💡 LEARNS`, '`help learns`', true)

        .addField(`<a:BanKitty:859428401051992084> MODERATIONS`, '`help moderate`', true)

        .addField(`<a:musicgif:859425768076476436> MUSIC `, '`help music`', true)

        .addField(`<:emoji_14:826004987107606528>  OTHERS`, '`help others`', true)

        .setFooter(member.username, member.avatarURL())
        .setTimestamp()
    
    message.channel.send({embed: helpEmbed, buttons: [button1, button2]}).then(message.react('861577287598211092'))
  }
}