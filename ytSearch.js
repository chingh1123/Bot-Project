// Using *npm i ytsr* Package

const Discord = require('discord.js');
const ytsr = require('ytsr');

module.exports = {
  name: 'ytsearch',
  description: "Search for youtube videos in Discord!",
  aliases: ["ys"],
  cooldown: 1500,
  run: async (client, message, args) => {
    const query = args.join(' ');
    if (!query) return message.channel.send("<:AAcross_box:864690410232610836> Error. Provide a search for me to search YouTube!");

     let m = await message.channel.send('**Searching Your YT command.. \n Please Wait..**')
        m.delete({ timeout: 4500 });

    const res = await ytsr(query).catch(e => message.channel.send(`<:AAcross_box:864690410232610836> Error. No results found for ${query}`));
    const video = res.items.filter(i => i.type === 'video')[0];
    const embed = new Discord.MessageEmbed()
      .setTitle(video.title)
      .setURL(video.url)
      .setImage(video.bestThumbnail.url)
      .setDescription(video.description ? video.description : "No Description")
      .addField(`__Video Information:__`,
        `**Creator**: [${video.author.name}](${video.author.url}) ${video.author.verified ? ":white_check_mark: (Verified)" : "\u200b"}
**Length**: ${video.duration} minute(s)
**Uploaded**: ${video.uploadedAt}
**Views**: ${video.views.toLocaleString()}`
      )
      .setThumbnail(video.author.bestAvatar.url)
    message.lineReplyNoMention(embed);
  }
}
