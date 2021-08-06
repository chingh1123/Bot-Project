const Discord = require('discord.js');
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: 'translateto',
  description: 'translate command',

  aliases: [],
  async run(bot, message, args) {
    const txt = args.slice(1).join(" ")
    const lang = args[0]
    if (!lang) return message.channel.send('**Please provide a ISO code of the language! If you dont know what is it, check it out this link! https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes**')
    if (!txt) return message.channel.send('**Please provide a text to translate!**')

    translate(txt, { to: lang }).then(res => {
      const translateEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("T̲r̲a̲n̲s̲l̲a̲t̲i̲o̲n̲")
        .setDescription(res.text)
        .setThumbnail('https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_893cafbdbbd3fe3971a5a188a1b8b95a/google-translate.png')
        .setFooter('💲ChinGH | YT💲')
        .setTimestamp()
      message.channel.send(translateEmbed);
    }).catch(err => {
      message.channel.send('**Please provide a valid ISO Language Code! If you dont know what is it, check it out this link! https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes**')
    });
  },
};