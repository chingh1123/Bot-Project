const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick1",
  category: 'Moderation Command',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('<:AAcross_box:864690410232610836> You need ` KICK_MEMBERS ` permission to use this command!!!');

    if (!message.member.permissions.has("KICK_MEMBERS")) return;

    const member = message.mentions.members.first();
    if (!member) return message.reply('<:AAcross_box:864690410232610836> Error. Please mention a member to kick!');
    
    if(
      message.member.roles.highest.position <=
      member.roles.highest.position
    )
      return message.reply(
        "<:AAcross_box:864690410232610836> You cant punish because u either have the same role or your role is lower.."
      );
    
    const reason = args.slice(1).join(" ") || "No reason Provided";

    member.kick({ reason });
    message.channel.send(`**Kicked ${member}** | **Reason: **${reason}`);
  },
};