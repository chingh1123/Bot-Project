// Using *npm i moment* Package

const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible",
    cooldown: 5000,
};

module.exports = {
        name: "userinfo",
        description: "userinfo",
        category: 'Search Command',
        usage: "m/whois <mention a member/member id>",
        aliases: ['ui', 'whois'],

    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const user = message.mentions.users.first() || message.author;

        const flags = {
            DISCORD_STAFF: '<:DiscordStaff:865600341718466570>',
	          DISCORD_EMPLOYEE: 'Discord Employee',
	          DISCORD_PARTNER: '<:Partner:865598375251410984>',
	          BUGHUNTER_LEVEL_1: '<:BugHunter1:865597855505711194>',
	          BUGHUNTER_LEVEL_2: '<:BugHunter2:865598109177348146>',
	          HYPESQUAD_EVENTS: '<:HypeSquad:865596357125341204>',
	          HOUSE_BRAVERY: '<:Bravery:865597545741156372>',
	          HOUSE_BRILLIANCE: '<:Brilliance:865597355003871252>',
	          HOUSE_BALANCE: '<:Balance:865597097016557619>',
	          EARLY_SUPPORTER: '<:EarlySupporter:865598696513863700>',
	          TEAM_USER: 'Team User',
	          SYSTEM: 'System',
	          VERIFIED_DEVELOPER: '<:early_developer_badge:865598697189539880>'
        };

        const userFlags = user.flags.toArray();
      
        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Server Owner';
        }
    
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setFooter(`User Info`, message.client.user.avatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('__User:__ ', `<@${member.user.id}>`, true)
            .addField('__User ID:__ ', `${message.author.id}`, true)
            .addField('__Joined at:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('__Created On:__', member.user.createdAt.toLocaleString(), true)
            .addField('__Badges:__', `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
            .addField("\n__Acknowledgements:__ ", `${acknowledgements}`)
            .addField("\n__Permissions:__ ", `${permissions.join(` **|** `)}`, true);
            
        message.channel.send({embed});
    
    }
    }
