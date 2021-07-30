// Using *npm i weather.js* Paackage

const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
 name: "weather" ,
 description: "weather command",
 category: 'Search Command',
 cooldown: 2000,

run: async (bot, message, args) => {
  let city = args.join(" ");
  let degreetype = "C";

  await weather.find({search: city, degreeType: degreetype}, function(err, result) {
    if (!city) return message.channel.send("<:AAcross_box:864690410232610836> Error. Please insert a city name!!");
    if (err || result === undefined || result.length === 0) return message.channel.send("<:AAcross_box:864690410232610836> Error. Unknown city.. Please try again..")

    let current = result[0].current;
    let location = result[0].location;

    const embed = new Discord.MessageEmbed()
      .setAuthor(current.observationpoint, 'https://icons-for-free.com/iconfiles/png/512/fog+foggy+weather+icon-1320196634851598977.png')
      .setDescription(`**> ${current.skytext}**`)
      .setThumbnail(current.imageUrl)
      .setTimestamp()
      .setColor(0x7289DA)

      embed.addField("Latitude", "➮ "+ location.lat, true)
       .addField("Longitude", "➮ "+ location.long, true)
       .addField("Feels Like", "➮ "+ `${current.feelslike}° Degrees`, true)
       .addField("Degree Type", "➮ "+ location.degreetype, true)
       .addField("Winds", "➮ "+ current.winddisplay, true)
       .addField("Humidity", "➮ "+ `${current.humidity}%`, true)
       .addField("Timezone", "➮ "+ `GMT ${location.timezone}`, true)
       .addField("Temperature", "➮ "+ `${current.temperature}° Degrees`, true)
       .addField("Observation Time", "➮ "+ current.observationtime, true)

       return message.lineReplyNoMention(embed);
  })
 }
}
