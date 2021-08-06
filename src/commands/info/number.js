const { MessageEmbed } = require("discord.js");

  module.exports = {
    name: "commandcount", 
    category: "Information", 
    aliases: ["cmdcount", "commandamount", "cmdamount"], 
    usage: "commandcount", 
    description: "Shows the Amount of Commands an Categories", //the 
    memberpermissions: [], 
    requiredroles: [], 
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
      try {
        message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter("If bot doesnt shows, please dm bot owner ")
          .setTitle("Command Counter")
          .setDescription(`:gear: **[${client.categories.length}] Categories**`)
          .addField(`:gear: Commands`, `**${client.commands.size} Commands**`)
        );
      } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
          .setColor("red").setFooter("Check again..")
          .setTitle(`:no: An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
    }
  }
