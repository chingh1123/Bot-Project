const { Collection, Client, Discord, MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require("discord-buttons");
const inlinereply = require('discord-reply');
const client = new Client({
    disableMention: 'everyone',
    shards: 'auto',
    restTimeOffset: 0
});
client.on('clickMenu', menu => {
    Nuggies.dropclick(client, menu);
});
client.on("message", async (message) => {
    if (!message.guild || message.author.bot || !message.content.trim().startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(" ")
    const cmd = args.shift().toLowerCase()
    if (cmd == "test") {
        let firstbutton = new MessageButton()
            .setStyle("green")
            .setID("1")
            .setLabel("🢀")

        let secondbutton = new MessageButton()
            .setStyle("blurple")
            .setID("2")
            .setLabel("🢂")

        var buttonarray = [firstbutton, secondbutton]

        let overviewembed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Modlogs Info')
            .setDescription("- Role Delete Detection\n- Channel Create Detection\n- Channel Delete Detection")

        let overviewembed2 = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Modlogs Info')
            .setDescription("- Channel Create Detection\n- Channel Delete Detection")

        let mybuttonsmsg = await message.channel.send({ embed: overviewembed, buttons: buttonarray })

        var embedsarray = [overviewembed]
        for (let i = 0; i < 0; i++)
            embedsarray.push(new MessageEmbed().setColor("RANDOM").setDescription(i))

        var currentPage = 0;

        const collector = mybuttonsmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60e3 });

        collector.on("collect", (b) => {
            b.reply.defer();
            if (b.id == "1") {
                if (currentPage !== 0) {
                    --currentPage;
                    mybuttonsmsg.edit({ embed: overviewembed, buttons: buttonarray })
                } else {
                    currentPage = embedsarray.length - 1;
                    mybuttonsmsg.edit({ embed: overviewembed2, buttons: buttonarray })
                }
            }
            else if (b.id == "2") {
                if (currentPage < embedsarray.length - 1) {
                    currentPage++;
                    mybuttonsmsg.edit({ embed: overviewembed2, buttons: buttonarray })
                } else {
                    currentPage = 0;
                    mybuttonsmsg.edit({ embed: overviewembed, buttons: buttonarray })
                }
            }
        })
    }
    else if (cmd == "toggle") {
        let mybutton = new MessageButton()
            .setStyle("green")
            .setID("1")
            .setLabel("ENABLE")

        let mybuttonsmsg = await message.channel.send("Testing information message", { buttons: [mybutton] })
        const collector = mybuttonsmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60e3 });
        collector.on("collect", (b) => {
            b.reply.defer();
            if (b.id == "1") {
                let mybutton2 = new MessageButton()
                    .setStyle("red")
                    .setID("2")
                    .setLabel("Disable")

                mybuttonsmsg.edit("Testing information message", { buttons: [mybutton2] })
            }
            else if (b.id == "2") {
                mybuttonsmsg.edit("Testing information message", { buttons: [mybutton] })
            }
        })
    }
})

//modlog webhook
// client.on('channelCreate', async channel => {
//     let webhook = await channel.guild.fetchWebhooks();
//     let myWeb = webhook.find((myWeb) => myWeb.name === "CGH Logging");

//     if(myWeb) {
//         myWeb.send(
//             new MessageEmbed()
//                 .setColor('RANDOM')
//                 .setDescription(`**Channel Created**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Name:** ${channel.name}`)
//                 .setTimestamp()
//                 .setAuthor(`Moderation Logs`, client.user.avatarURL({ dynamic: true }))
//         )
//     }
// })

// client.on('channelDelete', async channel => {
//     let webhook = await channel.guild.fetchWebhooks();
//     let myWeb = webhook.find((myWeb) => myWeb.name === "CGH Logging");

//     if(myWeb) {
//         myWeb.send(
//             new MessageEmbed()
//                 .setColor('RANDOM')
//                 .setDescription(`**__Channel Deleted__**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Name:** ${channel.name}`)
//                 .setTimestamp()
//                 .setAuthor(`Moderation Logs`, client.user.avatarURL({ dynamic: true }))
//         )
//     }
// })

// client.on('messageUpdate', async(oldMessage, newMessage) => {
//     const LogChannel = client.channels.cache.get('707182169881182240')
//     const EditedLog = new MessageEmbed()
//     .setTitle("Edited Message")
//     .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
//     .addField("In", oldMessage.channel)
//     .addField('Old Message', oldMessage.content)
//     .addField('New Message', newMessage.content)
//     .setColor('RANDOM')
//     .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
//     await LogChannel.send(EditedLog)

// })
// client.on('messageReactionAdd', async (reaction, user) => {
//     const handleStarboard = async () => {
//         const SBChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
//         const msgs = await SBChannel.messages.fetch({ limit: 100 });
//         const SentMessage = msgs.find(msg => 
//             msg.embeds.length === 1 ?
//             (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
//         if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
//         else {
//             const embed = new MessageEmbed()
//             .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
//             .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
//             .setColor('YELLOW')
//             .setFooter(reaction.message.id)
//             .setTimestamp();
//             if(SBChannel)
//             SBChannel.send('1 - ⭐', embed);
//         }
//     }
//     if(reaction.emoji.name === '⭐') {
//         if(reaction.message.channel.name.toLowerCase() === 'starboard') return;
//         if(reaction.message.partial) {
//             await reaction.fetch();
//             await reaction.message.fetch();
//             handleStarboard();
//         }
//         else
//         handleStarboard();
//     }
// });
// client.on('roleCreate', async channel => {
//     let webhook = await channel.guild.fetchWebhooks();
//     let myWeb = webhook.find((myWeb) => myWeb.name === "CGH Logging");

//     if(myWeb) {
//         myWeb.send(
//             new MessageEmbed()
//                 .setColor('RANDOM')
//                 .setDescription(`**__Role Created__**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Role Name:** ${channel.name}`)
//                 .setTimestamp()
//                 .setAuthor(`Moderation Logs`, client.user.avatarURL({ dynamic: true }))
//         )
//     }
// })

// client.on('guildMemberUpdate', async (channel, oldMember, newMember) => {
//         let webhook = await channel.guild.fetchWebhooks();
//         let myWeb = webhook.find((myWeb) => myWeb.name === "CGH Logging Test");
    
//         if(myWeb) {
//             myWeb.send(
//                 new MessageEmbed()
//                     .setColor('RANDOM')
//                     .setDescription(`**__Member Updated__**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Before:** ${oldMember}\n**After:** ${newMember}`)
//                     .setTimestamp()
//                     .setAuthor(`Moderation Logs`, client.user.avatarURL({ dynamic: true }))
//             )
//         }
//     })


//const { DiscordTogether } = require('discord-together');
const Nuggies = require('nuggies');
require('discord-buttons')(client);
//client.discordTogether = new DiscordTogether(client);
const db = require('quick.db');
const path = require('path')
const fs = require('fs');
const wait = require('util').promisify(setTimeout);
const config = require('./config.json');
module.exports = client;
// const { GiveawaysManager } = require('discord-giveaways');
// client.giveaways = new GiveawaysManager(client, {
//     storage: '../../giveaways.json',
//     updateCountdownEvery: 5000,
//     embedColor: 'RANDOM',
//     embedColorEnd: '#000000',
//     reaction: '🎁'
// })
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
});

client.login(config.token);