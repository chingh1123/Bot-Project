const { MessageFlags } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run (client, message, args) {
       if(!args[0]) return message.reply('You need to specify a text!')

        let msg;
        let textChannel = message.mentions.channels.first()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.reply(msg)
        }
    }
} 