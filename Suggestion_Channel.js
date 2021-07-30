const client = require('../index');
const { MessageEmbed } = require('discord.js');

client.on('message', message => {
    if (message.channel.id === 'CHANNEL_ID') { //PUT YOU CHANNEL ID HERE
        if (message.author.bot) return; // Doesnot Delete BOTs Messages
        message.delete() // Delete Original Message Sent By User

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.content}`)
            .setFooter('Want To Suggest Something? Type In This Channel.')
        message.channel.send(embed).then(message => { // Reactions
            message.react('👍') // Change Emoji
            message.react('❔')
            message.react('👎') // Change Emoji
        })
    }
})
