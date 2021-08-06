const img = require('images-scraper')


const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    cooldown: 5000,
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        let m = await message.channel.send('**Searching Picture..Please Wait..**')
        m.delete({ timeout: 4500 });

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}