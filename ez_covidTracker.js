const fetch = require('node-fetch')

const Discord = require('discord.js');

module.exports = {
  name: "covid",
  description: "track a country or worldwide COVID-19 CASES",
  cooldown: 5000,
  category: 'Search Command',

  async run(client, message, args){
    let countries = args.join(" ");

    const noArgs = new Discord.MessageEmbed()
    .setTitle('<:AAcross_box:864690410232610836> Missing Arguments')
    .setColor('RANDOM')
    .setDescription('You are missing some args (ex: gh-covid all || gh-covid Canada)')
    .setTimestamp()

    if (!args[0]) return message.channel.send(noArgs);

    if(args[0] === "world"){
      fetch('https://covid19.mathdro.id/api')
      .then(response => response.json())
      .then(data => {
        let confirmed = data.confirmed.value.toLocaleString()
        let recovered = data.recovered.value.toLocaleString()
        let deaths = data.deaths.value.toLocaleString()

        const embed = new Discord.MessageEmbed()
        .setTitle(`🌎 Worldwide COVID-19 Stats`)
        .addField(`😷 Confirmed Cases`,'➽ '+ confirmed)
        .addField(`😷 Recovered`,'➽ '+ recovered)
        .addField(`😷 Deaths`,'➽ '+ deaths)
        .setColor('RANDOM')
        .setThumbnail('https://img.freepik.com/free-vector/earth-map-countries_1284-34068.jpg?size=626&ext=jpg')
        .setFooter('COVID-19')
        .setTimestamp()

        message.channel.send(embed)
      })
    } else {
        fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
        let confirmed = data.confirmed.value.toLocaleString()
        let recovered = data.recovered.value.toLocaleString()
        let deaths = data.deaths.value.toLocaleString()

        const embed = new Discord.MessageEmbed()
        .setTitle(`COVID-19 Stats for |-**${countries}**-|`)
        .addField(`😷 Confirmed Cases`,'➽ '+ confirmed)
        .addField(`😷 Recovered`,'➽ '+ recovered)
        .addField(`😷 Deaths`,'➽ '+ deaths)
        .setColor('RANDOM')
        .setFooter('COVID-19')
        .setTimestamp()

        message.channel.send(embed)
      }).catch(e => {
          return message.lineReplyNoMention('Invalid Country provided')
    })
    }
  }
}
