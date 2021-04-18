const fetch = require('node-fetch')

module.exports = {
    name: 'lyrics',
    description: 'gets the lyrics of a song and artist',
    execute(message, args, Discord) {
        const embed = new Discord.MessageEmbed();
        const artist = args[0];
        const song = args[1];
        const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

        embed.setColor('#00FFD3').setAuthor(`${song} - ${artist}`).setTimestamp();
        fetch(url)
            .then(data => data.json())
            .then(song => {
                if (song.lyrics === "") {
                    message.reply("Song does not exist or unable to send lyrics!");
                    return;
                }
                embed
                    .setDescription(song.lyrics);
                    message.channel.send(embed);
            })
            .catch(fail => {
                console.log(fail);
            });
    }
}