// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     name: 'suggest',
//     description: "Suggests something",
//     usage: 'suggestion [Query]',
//     run: async (client, message, args) => {
//         const query = args.join(" ")
//         if (!query) return message.channel.send(`You must send a query to suggest!`)
//         const channel = client.channels.cache.get('840228891515158558')
//         if (!channel) return message.channel.send(`Cannot find suggestion channel. Make sure the server has a channel called \`suggestion\``)
//         channel.send(new MessageEmbed()
//             .setAuthor(message.author.username + `'s Suggestion `, message.author.displayAvatarURL({ dynamic: true }))
//             .setDescription(`**${query}**`)
//             .setColor(`RANDOM`)
//             .setFooter(message.author.id)
//             .setTimestamp()
//         ).then(message => { // Reactions
//             message.react('👍') // Change Emoji
//             message.react('❔')
//             message.react('👎') // Change Emoji
//         })
//         if (channel.id == message.channel.id){
//             return message.delete(args.join(" "));
//         }
//         message.channel.send(`**:white_check_mark: Your Suggestion has been sent to stuff!\nThank You for giving your feedback!**`)
//     }
// }