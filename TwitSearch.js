// *npm i - node-superfetch - common-tags - twitter-api.js*

const Discord = require("discord.js");
const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
const twitter = require("twitter-api.js");

module.exports = {
  name: "twitsearch",
  cooldown: 5000,
  run: async (client, message, args) => {
    let user = args[0]
    if (!user) return message.channel.send("<:AAcross_box:864690410232610836> Error. Please provide twitter username.")
    const yesno = {
      true: "Yes",
      false: "No"
    }
    try {
      const body = await twitter.users(user)
      const url = body.url ? `[Here](${body.url})` : "None";
      const tweet = new Discord.MessageEmbed()
        .setColor("1590e0")
        .setTitle(body.screen_name)
        .setURL('https://twitter.com/' + body.screen_name)
        .addField('Name:', body.screen_name, true)
        .addField('Location:', body.location ? body.location : "None", true)
        .addField('Followers:', body.followers_count, true)
        .addField('Friends:', body.friends_count, true)
        .addField('Favourites:', body.favourites_count, true)
        .addField('Tweets:', body.statuses_count, true)
        .addField('Verified:', yesno[body.verified], true)
        .addField('Created At:', body.created_at, true)
        .addField('Featured URL:', url, true)
        .addField('Description:', body.description ? body.description : "None")
        .setThumbnail(body.profile_image_url_https.replace('_normal', ''))

      message.channel.send(tweet)
    } catch (e) {
      if (e.status === 403) return message.channel.send("This user private mode, or deleted account")
      else if (e.status === 404) return message.channel.send("404 NOT FOUND")
      else return message.channel.send(`There was an unknown error: \`${e.message}\``)
    }
  }
}
