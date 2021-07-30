// Can change to client, it is up to you

const { Collection, Client, MessageEmbed } = require('discord.js');

const inlinereply = require('discord-reply');

const Discord = require('discord.js');

const bot = new Discord.Client({
  disableMention: 'everyone',
  shards: 'auto',
  restTimeOffset: 0
});

const { token } = require('./config.json');

const { readdirSync, read } = require('fs');

const { join } = require('path');

const Timeout = new Collection();

const ms = require('ms');

bot.snipes = new Collection();

bot.commands = new Discord.Collection();

const prefix = 'gh ';

require('discord-buttons')(bot)

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file =>
  file.endsWith('.js')
);

for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`));
  bot.commands.set(command.name, command);
}

const keepAlive = require('./keepAlive.js');

//------------------------------------------------------------------------------
bot.on('ready', () => {
  console.log('GH Bot is Online!');

  const arrayOfStatus = [
    `Over ${bot.guilds.cache.size} servers!`,
    `💖 gh info 💖`,
    `💝 gh help 💝`
  ];

  let index = 0;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    //console.log(status);
    bot.user.setActivity(status, { type: 'PLAYING' }).catch(console.error);
    index++;
  }, 5000); //in ms
});
//------------------------------------------------------------------------------

bot.on('message', async message => {
  if (message.channel.type === 'dm') return;
  if (message.author.bot || message.author === bot.user) return;
  if (message.content === `<@${bot.user.id}>` || message.content === `<@!${bot.user.id}>`) {
    message.channel.send(`${message.author} My Prefix is **${prefix}**`);
  };

  if (message.content.startsWith(prefix)) {
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);

    const cmd = args.shift().toLowerCase();

    let command = bot.commands.get(cmd)

    if (command) {
      if (command.cooldown) {
        if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
        command.run(bot, message, args)
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
        setTimeout(() => {
          Timeout.delete(`${command.name}${message.author.id}`)
        }, command.cooldown)
      } else command.run(bot, message, args);
    }
  }
});

bot.on("message", (message) => {
  if (message && message.guild) {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    if (message.author.bot || !message.guild) return

    let args = message.content.substring(prefix.length).split(" ")

    switch (args[0].toLowerCase()) {
      case "ship":
        break;
    }
  }
})

bot.on('message', msg => {
  if (msg.content === 'gh help-learns') {
    msg.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`Learns Commands`, bot.user.avatarURL({ dynamic: true }))
        .setDescription('```json\n"translate" - Translate any languages to English!``````json\n"wiki" - Search anything with use wiki!``````json\n"trivia" - RANDOM quiz with difficulty hard, easy!``````json\n"binary" - Type any text to convert to binary codes!```')
    );
  }
});

bot.on('message', msg => {
  if (msg.content === 'gh help-moderate') {
    msg.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`Moderations Commands`, bot.user.avatarURL({ dynamic: true }))
        .setDescription('```json\n"createch" - Create a channel in your server!``````json\n"delete" - Delete the channel messages!``````json\n"deletech" - Delete a current channel!``````json\n"kick" - Kick a specified user from the server!``````json\n"steal-emoji" - Steal emoji from the other servers! (recommended nitro user)``````json\n"createvc" - Create a vc channel in your server!``````json\n"addrole" - Add a role to a specified user!``````json\n"slowmode" - Slowmode the current channel!``````json\n"tempmute" - Set a time with mute a specified user!``````json\n"unmute" - Unmute a specified muted user!```')
    );
  }
});

bot.on('message', msg => {
  if (msg.content === 'gh gtp') {
    const djs = require('djs-fun-v12')
    djs.gtp(msg, {
      loadingMessage: "<a:vaporeon:867621393901813781> Loading question..."
    })
  }
})

keepAlive();

bot.login(token);
