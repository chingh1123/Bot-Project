const db = require('quick.db');
const Discord = require('discord.js');
const config = require('../../config.json');
const backemo = '860820703317458974'; //your backword emoji id
const foremo = '860820704542195722'; //your forward emoji id
const exitemo = '860821361467064320';// your stop emoji id

module.exports = {
    name: 'botemojilist',
    hidden: false,
    description: 'Use This Command To get All of Bot Emojis!',
    usage: 'botemojilist',
    category: 'Emoji_List',
    permissions: false,
    admin: false,
    mod: false,
    guildowner: false,
    owner: false,
    aliases: ['bel'],
    timeout: false,
    run: async (
        client,
        message,
        args,
        colour,
        commandname,
        embed,
        nickname,
        prefix,
        arrowemoji,
        erroremoji,
        sucessemoji,
        wrongemoji
    ) => {
        let list = [];
        let emojis = client.emojis.cache.array();
        if (emojis.size === 0) {
            return message.channel
                .send(
                    embed
                        .setColor(`${colour}`)
                        .setDescription(
                            `<a:ERROR:${erroremoji}>┊There are no Emojis in this Bot! `
                        )
                        .setAuthor(`Bot Emoji List`, message.author.displayAvatarURL({ dynamic: true }))
                        .setFooter(
                            `┊${commandname}┊  ${client.user.username}`,
                            client.user.displayAvatarURL()
                        )
                )
                .then(m => {
                    m.delete({ timeout: 60000 }).catch(() => undefined);
                });
        }
        emojis = emojis.map(
            (e, i) =>
                `${i + 1})   ${e}\n**NAME:** \`${e.name}\`\n**ID:** \`${e.id
                }\`\n**DOWNLOAD:** [CLICK HERE](${e.url})`);
        for (var i = 0; i < emojis.length; i += 5) {
            const items = emojis.slice(i, i + 5);
            list.push(items.join('\n'));
        }
        const symbols = [`${backemo}`, `${exitemo}`, `${foremo}`];
        let page = 0;
        let park = parseInt(args[0]);
        if (park) {
            if (args[0] > list.length) {
                return message.channel
                    .send(
                        embed
                            .setColor(`${colour}`)
                            .setDescription(
                                `<a:ERROR:${erroremoji}>┊There are only ${list.length} pages! `
                            )
                            .setAuthor(`Bot Emoji List`, message.author.displayAvatarURL())
                            .setFooter(
                                `┊${commandname}┊  ${client.user.username}`,
                                client.user.displayAvatarURL()
                            )
                    )
                    .then(m => {
                        m.delete({ timeout: 60000 }).catch(() => undefined);
                    });
            }

            let e;
            if (args[0] < 1) {
                return message.channel
                    .send(
                        embed
                            .setColor(`${colour}`)
                            .setDescription(
                                `<a:ERROR:${erroremoji}>┊Your selected argument are ${args[0]}! `
                            )
                            .setAuthor(`Bot Emoji List`, message.author.displayAvatarURL())
                            .setFooter(
                                `┊${commandname}┊  ${client.user.username}`,
                                client.user.displayAvatarURL()
                            )
                    )
                    .then(m => {
                        m.delete({ timeout: 60000 }).catch(() => undefined);
                    });
            }
            e = embed

                .setDescription(list[page - 1 + parseInt(args[0])])

                .setAuthor(`Bot Emoji List`, message.author.displayAvatarURL())
                .setColor(`${colour}`)
                .setFooter(
                    `┊Page ${page + parseInt(args[0])} of ${list.length}┊  ${client.user.username
                    }`,
                    client.user.displayAvatarURL()
                );
            const msg = await message.channel.send(e);
            symbols.forEach(symbol => msg.react(symbol));
            let doing = true;
            while (doing) {
                let r;
                const filter = (r, u) =>
                    symbols.includes(r.emoji.id) && u.id == message.author.id;
                try {
                    r = await msg.awaitReactions(filter, {
                        max: 1,
                        time: 120000,
                        errors: ['time']
                    });
                } catch {
                    return msg.delete().catch(() => undefined);
                }
                const u = message.author;
                r = r.first();
                if (r.emoji.id == symbols[2]) {
                    if (!list[park])
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                    else {
                        park++;
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                        let newM = embed
                            .setDescription(list[park - 1])
                            .setAuthor(`Bot Emoji List`, message.author.displayAvatarURL())
                            .setColor(`${colour}`)
                            .setFooter(
                                `┊Page ${park} of ${list.length}┊  ${client.user.username}`,
                                client.user.displayAvatarURL()
                            );
                        msg.edit(newM).catch(() => undefined);
                    }
                } else if (r.emoji.id == symbols[0]) {
                    if (!list[park - 2])
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                    else {
                        park--;
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                        let newM = embed
                            .setDescription(list[park - 1])
                            .setAuthor(`Bot Emoji List`, message.author.displayAvatarURL())
                            .setColor(`${colour}`)
                            .setFooter(
                                `┊Page ${park} of ${list.length}┊  ${client.user.username}`,
                                client.user.displayAvatarURL()
                            );
                        msg.edit(newM).catch(() => undefined);
                    }
                } else if (r.emoji.id == symbols[1]) {
                    msg.delete().catch(() => undefined);
                    return;
                }
            }
        } else {
            let e = new Discord.MessageEmbed()
                .setDescription(list[page])
                .setAuthor(nickname, message.author.displayAvatarURL())
                .setColor(`${colour}`)
                .setFooter(
                    `┊Page ${page + 1} of ${list.length}┊  ${client.user.username}`,
                    client.user.displayAvatarURL()
                );
            const msg = await message.channel.send(e);
            symbols.forEach(symbol => msg.react(symbol));
            let doing = true;
            while (doing) {
                let r;
                const filter = (r, u) =>
                    symbols.includes(r.emoji.id) && u.id == message.author.id;
                try {
                    r = await msg.awaitReactions(filter, {
                        max: 1,
                        time: 120000,
                        errors: ['time']
                    });
                } catch {
                    return msg.delete().catch(() => undefined);
                }
                const u = message.author;
                r = r.first();
                if (r.emoji.id == symbols[2]) {
                    if (!list[page + 1])
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                    else {
                        page++;
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                        let newM = new Discord.MessageEmbed()
                            .setDescription(list[page])
                            .setAuthor(nickname, message.author.displayAvatarURL())
                            .setColor(`${colour}`)
                            .setFooter(
                                `┊Page ${page + 1} of ${list.length}┊  ${client.user.username}`,
                                client.user.displayAvatarURL()
                            );
                        msg.edit(newM).catch(() => undefined);
                    }
                } else if (r.emoji.id == symbols[0]) {
                    if (!list[page - 1])
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                    else {
                        page--;
                        msg.reactions
                            .resolve(r.emoji.id)
                            .users.remove(u.id)
                            .catch(err => { });
                        let newM = new Discord.MessageEmbed()
                            .setDescription(list[page])
                            .setAuthor(nickname, message.author.displayAvatarURL())
                            .setColor(`${colour}`)
                            .setFooter(
                                `┊Page ${page + 1} of ${list.length}┊  ${client.user.username}`,
                                client.user.displayAvatarURL()
                            );
                        msg.edit(newM).catch(() => undefined);
                    }
                } else if (r.emoji.id == symbols[1]) {
                    msg.delete().catch(() => undefined);
                    return;
                }
            }
        }
    }
};