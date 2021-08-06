const regex = /^[\x00-\x7F]{1,25}$/i;
const settingEmoji = '⚙️';
const comments = ["I like it!", "Fancy!", "nice.", ";)", "I love it <3", "It's perfect!", "amazing.", "wow", "Wonderful", "10/10", "🎉"];
const redis = require('redis');

module.exports = {

    name: "prefix",

    args: "{newPrefix}",

    desc: "Change the prefix for the server! Only Server admins are able to use this command.",

    example: ["owo prefix uwu", "owo prefix owo"],

    cooldown: 10000,

    run: async (client, message, args) => {

        const redis = require('redis');
        // display prefix
        if (!args.length) {
            let prefix = await redis.get(message.channel.guild.id, "prefix");
            if (prefix) {
                return message.reply(settingEmoji, `, the current prefix is set to **\`${prefix}\`**!`);
                message.channel.guild.prefix = prefix;
            } else {
                return message.reply(settingEmoji, ", no prefix is set for this server!");
            }
        }

        // Must have manage channels perm
        if (!message.member.permissions.has('manageChannels')) {
            return message.channel.send(", you're not an admin! >:c");
        }

        // parse and validate prefix
        let prefix = args.join('').toLowerCase();
        if (!regex.test(prefix)) {
            return message.reply(", invalid prefix! Custom prefix must be under 25 character and exclude special characters");
        }

        // save pefix
        if (prefix === message.config.prefix) {
            await redis.del(message.channel.guild.id, "prefix");
            message.channel.guild.prefix = false;
        } else {
            await redis.set(message.channel.guild.id, "prefix", prefix);
            message.channel.guild.prefix = prefix;
        }

        message.channel.send(settingEmoji, `, you successfully changed my server prefix to **\`${prefix}\`**! ${comments[Math.floor(Math.random() * comments.length)]}`);
    }

}
