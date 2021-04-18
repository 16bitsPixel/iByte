const fetch = require('node-fetch');

module.exports = {
    name: 'reddit',
    description: 'gets an image from reddit',
    execute(message, args, Discord) {
        if (args[0]) {
            const apiUrl = `https://www.reddit.com/r/${args[0]}/top.json?t=day&limit=10`;
            const embed = new Discord.MessageEmbed()
                .setColor('#FF5700')
                .setAuthor('Reddit', 'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2');
            fetch(apiUrl)
                .then(data => data.json())
                .then(post => {
                    let index = Math.floor(Math.random() * post.data.children.length);
                    embed
                        .setTitle(post.data.children[index].data.subreddit_name_prefixed)
                        .addFields(
                            {name: 'Author: ', value: post.data.children[index].data.author, inline: true},
                            {name: 'Score: ', value: post.data.children[index].data.score, inline: true}
                        )
                        .setDescription(post.data.children[index].data.title)
                        .setTimestamp()
                        .setURL(post.data.children[index].data.url);
                        if (!post.data.children[index].data.over_18) embed.setImage(post.data.children[index].data.url);
                    message.channel.send(embed);
                })
                .catch(fail => {
                    console.log(fail);
                    message.reply("Enter a subreddit with images");
                });
        }
        else {
            message.reply("Please enter a subreddit!");
        }
    }
}