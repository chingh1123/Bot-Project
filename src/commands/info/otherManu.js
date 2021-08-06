const Discord = require('discord.js')
const { MessageMenuOption, MessageMenu, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: 'help-commands',
    description: 'choose the manu button!',

    run: async (client, message, args) => {

        let member = message.mentions.users.first() || message.author;

        let option7 = new MessageMenuOption()
            .setLabel("Main")
            .setValue("Option 7")
            .setDescription("Welcome Back To Home 😁")
            .setDefault()
            .setEmoji("🏡")

        let option1 = new MessageMenuOption()
            .setLabel("Images | Gifs")
            .setValue("Option 1")
            .setDescription("Images or Gifs commands")
            .setDefault()
            .setEmoji("🖼️")

        let option2 = new MessageMenuOption()
            .setLabel("Minigames | Fun")
            .setValue("Option 2")
            .setDescription("Minigames & Fun commands")
            .setDefault()
            .setEmoji("864685501131128842")

        let option3 = new MessageMenuOption()
            .setLabel("Learns")
            .setValue("Option 3")
            .setDescription("Learns Commands")
            .setDefault()
            .setEmoji("💡")

        let option4 = new MessageMenuOption()
            .setLabel("Music")
            .setValue("Option 4")
            .setDescription("Music commands!")
            .setDefault()
            .setEmoji("748534186960486443")

        let option5 = new MessageMenuOption()
            .setLabel("Others")
            .setValue("Option 5")
            .setDescription("Others Commands breeeh")
            .setDefault()
            .setEmoji("826004987107606528")

        let option6 = new MessageMenuOption()
            .setLabel("Moderations")
            .setValue("Option 6")
            .setDescription("Moderations Commands")
            .setDefault()
            .setEmoji("859428401051992084")

        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Choose the type of commands")
            .addOption(option7)
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
            .addOption(option6)
            .addOption(option4)
            .addOption(option5)
            
        let embed = new Discord.MessageEmbed()
            .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
            .setDescription('<a:arrow:852776046814035994> **__Prefix of CGH Bot is__**:  `gh-` \n <a:arrow:852776046814035994> **Have any questions about bot? Welcome to contact ``ChinGH #1123`` !\n<a:arrow:852776046814035994> [Invite](https://discord.com/api/oauth2/authorize?client_id=837564399833055272&permissions=8&scope=bot) | [Upvote](https://discord.ly/cgh)**')
            .setColor('#2F3136')
            .addField(`🖼️ IMAGES / GIF`, '`help-image`', true)
            .addField(`<a:820871637569372170:864685501131128842> MINI GAMES / FUN`, '`help-fun-games`', true)
            .addField(`💡 LEARNS`, '`help learns`', true)
            .addField(`<a:BanKitty:859428401051992084> MODERATIONS`, '`help-moderate`', true)
            .addField(`<a:musicgif:859425768076476436> MUSIC `, '`help-music`', true)
            .addField(`<:emoji_14:826004987107606528>  OTHERS`, '`help-others`', true)
            .setFooter(member.username, member.avatarURL())
            .setTimestamp()

        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch (menu.values[0]) {

                case "Option 1":
                    menu.message.update(
                        new Discord.MessageEmbed()
                        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                        .setDescription('```json\n"Type | gh-help-image | for more info!"```')
                        .addField(`🖼️ __Images Commands__`, '```fix\n| avt | rip | slap | panda | meme | color | changemymind | pikachu | dababy | pooh | sussybaka |```')
                        .addField(`🖼️ __Gifs Commands__`, '```fix\n| anime | kill | yeet | fly | gorilla | trigger |```'), true)
                    break;

                case "Option 2":
                    menu.message.update(
                        new Discord.MessageEmbed()
                        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                        .setDescription('```json\n"Type | gh-help-fun-games | for more info!"```')
                        .addField(`<a:820871637569372170:864685501131128842> __Minigames Commands__`, '```fix\n| ttt / xo | rps | snake | hangman | calculator |```')
                        .addField(`😁 __Fun Commands__`, '```fix\n| 8ball | hack | ascii | hmgay | ship | poll | emojify | dinochrome | fliptext |```'), true)
                    break;

                case "Option 3":
                    menu.message.update(
                        new Discord.MessageEmbed()
                        .setDescription('```json\n"Type | gh-help-learns | for more info!"```')
                        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                        .addField(`💡 LEARNS`, '```fix\n| translate | wiki | math | trivia | binary |```'), true)
                    break;

                case "Option 4":
                    menu.message.update(
                        new Discord.MessageEmbed()
                        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                        .setDescription('```json\n"Type | gh-help-music | for more info!"```')
                        .addField(`<a:musicgif:859425768076476436> MUSIC`,'```fix\n| leave | loop | lyrics | nowplaying | ping | play | pause | playlist | queue | resume | search | stop | skip | skipto |```')
                        .addField(`<a:musicgif:859425768076476436> MANAGEMENT`,'```fix\n| 247 | remove | shuffle | volume |```'), true)
                    break;

                case "Option 5":
                    menu.message.update(
                        new Discord.MessageEmbed()
                        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                        .setDescription('```json\n"Type | gh-help-others | for more info!"```')
                        .addField(`<:emoji_14:826004987107606528>  Others`,  '```fix\n| covid | weather | invite | devices | serverinfo | userinfo | info | spotify | emojiinfo | lb-members | ytsearch | twitsearch |```'), true)
                    break;

                case "Option 6":
                    menu.message.update(
                        new Discord.MessageEmbed()
                        .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                        .setDescription('```json\n"Type | gh-help-moderate | for more info!"```')
                        .addField(`<a:BanKitty:859428401051992084> Moderations`,  '```fix\n| createch | delete | deletech | kick | steal-emoji | createvc | addrole | slowmode | tempmute | unmute |```'), true)
                    break;

                case "Option 7":
                    menu.message.update(
                        new Discord.MessageEmbed()
                            .setAuthor(`BOT COMMANDS`, message.client.user.avatarURL({ dynamic: true }))
                            .setDescription('<a:arrow:852776046814035994> **__Prefix of CGH Bot is__**:  `gh-` \n <a:arrow:852776046814035994> **Have any questions about bot? Welcome to contact ``ChinGH | YT#1123`` !\n<a:arrow:852776046814035994> [Invite](https://discord.com/api/oauth2/authorize?client_id=837564399833055272&permissions=8&scope=bot) | [Upvote](https://discord.ly/cgh)**')
                            .setColor('#2F3136')
                            .addField(`🖼️ IMAGES / GIF`, '`help-image`', true)
                            .addField(`<a:820871637569372170:864685501131128842> MINI GAMES / FUN`, '`help-fun-games`', true)
                            .addField(`💡 LEARNS`, '`help-learns`', true)
                            .addField(`<a:BanKitty:859428401051992084> MODERATIONS`, '`help-moderate`', true)
                            .addField(`<a:musicgif:859425768076476436> MUSIC `, '`help-music`', true)
                            .addField(`<:emoji_14:826004987107606528>  OTHERS`, '`help-others`', true)
                            .setFooter(member.username, member.avatarURL())
                            .setTimestamp(), true)
                    break;
            }
        }

        client.on("clickMenu", (menu) => {
            if (menu.message.id == menumsg.id) {
                if (menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: you are not allowed to pick something", true)
            }
        })
    }
}