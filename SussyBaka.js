// Using *npm i ultrax* package

const ultrax = require("ultrax");
const Discord = require("discord.js");

module.exports = {
    name: 'sussybaka',
    cooldown: 5000,
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({format: "png"})
        let SussyBaka = new ultrax.sussyBaka(avatar)
        const Image = await SussyBaka.get();
        
        message.channel.send(Image);
    }
};
