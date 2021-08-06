const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'help-modlog',
    description: 'check for modlog information for this bot',

    run: async (client, message, args) => {

        let member = message.mentions.users.first() || message.author;

        // create button
        let button1 = new MessageButton()
            .setStyle('red')
            .setLabel('Role')
            .setID('role')

        let button2 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Channel')
            .setID('channel')

        let button3 = new MessageButton()
            .setStyle('green')
            .setLabel('Member')
            .setID('member')

        let button4 = new MessageButton()
            .setStyle('grey')
            .setLabel('🏘️')
            .setID('home')


        //create embed messages
        const embed1 = new MessageEmbed()
            .setTitle('__Role Update__')
            .setDescription('If any role be deleted in server\nThe bot will send the messages')
            .setImage('https://cdn.discordapp.com/attachments/851287450037911572/872501515976323072/unknown.png')
            .setAuthor(`Modlogs Info`, member.displayAvatarURL())
            .setTimestamp()

        const embed2 = new MessageEmbed()
            .setTitle('Channel Create/Delete')
            .setDescription('If any channel be created or deleted in server\nThe bot will send the messages')
            .setImage('https://media.discordapp.net/attachments/851287403456626717/872505094757822484/unknown.png')
            .setAuthor(`Modlogs Info`, member.displayAvatarURL())
            .setTimestamp()

        const embed3 = new MessageEmbed()
            .setTitle('Member Join/Leaves')
            .setDescription('If any member joined or leaved in server\nThe bot will send the messages')
            .setImage('https://media.discordapp.net/attachments/851287403456626717/872504643446530118/unknown.png')
            .setAuthor(`Modlogs Info`, member.displayAvatarURL())
            .setTimestamp()

        const mainEmbed = new MessageEmbed()
            .setTitle('List of Modlogs [ info ]')
            .setDescription('**1.** __Role Update__\n**2.** __Channel Create/Delete__\n**3.** __Member join/Leaves__')
            .setThumbnail('https://library.kissclipart.com/20180904/krw/kissclipart-notepad-icon-clipart-computer-icons-notepad-978851ae809a87af.jpg')
            .setAuthor(`Modlogs Info`, member.displayAvatarURL())
            .setTimestamp()


        //multiple buttons combine
        let row = new MessageActionRow()
            .addComponents(button4, button1, button2, button3);

        //send main embed message + buttons
        let mybuttonsmsg = await message.channel.send(mainEmbed, row)

        //clickable button
        client.on('clickButton', async(button) => {
            if (button.id === 'role') {
                mybuttonsmsg.edit({ embed: embed1 });
            } else if (button.id === 'channel') {
                mybuttonsmsg.edit({ embed: embed2 });
            } else if (button.id === 'member') {
                mybuttonsmsg.edit({ embed: embed3 });
            } else if (button.id === 'home') {
                mybuttonsmsg.edit({ embed: mainEmbed});
            }
            button.reply.defer();
        })
    }
}