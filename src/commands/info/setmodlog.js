const Discord = require('discord.js');

module.exports = {
    name: "set-modlog",
    description: "set a moderation log channel.",

    run: async(client, message, args) => {
        let webhook = await message.guild.fetchWebhooks();

        const first = webhook.find((first) => first.name === "CGH Logging Test")

        let channel = message.mentions.channels.first();
        if(!channel && !first){
            return message.channel.send(`Please mention a channel to set it to modlog!`)
        } else {
            channel.createWebhook("CGH Logging Test", {
                channel: channel
            })
            message.channel.send(`${channel} has been set to modlog channel!`);
        }
    }
}