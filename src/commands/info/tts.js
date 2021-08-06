const { getAudioUrl } = require('google-tts-api');

module.exports = {
  name: "🎙️",
  category: "fun",

  run: async(client, message, args) => {

    if (!args[0]) return message.channel.send("**Please Enter Something To Convert To Speech!**")

    const string = args.join(" ");
    if (string.length > 200) return message.channel.send('**Please Enter Text Between 0 And 200 Characters!**');

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('Please Join Voice Channel First!');

    const audioURL = await getAudioUrl(string, {
      lang: 'eng',
      slow: false,
      host: 'https://translate.google.com',
    });
    
    const connection = await voiceChannel.join();
    const dispatcher = connection.play(audioURL);

    try {
      voiceChannel.join().then(connection => {
        dispatcher.on('finish', () => {
          voiceChannel.leave();
        });
        dispatcher.on("error", () => {
          voiceChannel.leave();
        });
      });
    }
    catch(e) {
      message.channel.send('**Oh No, An Error Occurred. Try Again Later!**');
      console.error(e);
    };
  }
}