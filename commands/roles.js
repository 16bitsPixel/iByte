module.exports = {
    name: 'roles',
    description: 'gives reaction roles',
    async execute(message, args, Discord, client) {
        if (!message.member.roles.cache.has('793711730257690697')) return;
        const channel = '797271834436698123';

        const Overwatch = message.guild.roles.cache.find(role => role.id === '797272193582759947');
        const Minecraft = message.guild.roles.cache.find(role => role.id === '797287551588630578');
        const AmongUs = message.guild.roles.cache.find(role => role.id === '797272422364741633');

        const AmongUsEmoji = '🧑‍🚀';
        const MinecraftEmoji = '⛏️';
        const OverwatchEmoji = '🌎';

        let embed = new Discord.MessageEmbed()
            .setColor('#54ADC1')
            .setAuthor('Roles', 'https://i.pinimg.com/236x/93/f1/61/93f161fc83e921c6f80e3befd7f0b4f9--my-life-manga-games.jpg')
            .setImage('https://cdn.vox-cdn.com/thumbor/-R6QOFWcK3JsGx5H0gLjHikZuYg=/0x0:2040x1360/1400x933/filters:focal(857x517:1183x843):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/64035800/acastro_190618_1777_cloud_gaming_0003.0.jpg')
            .setDescription('Do you like playing games? Want to meet others and group up? Well look no further!\n\n'
                + 'Just give yourself a role to a designated game using the emojis provided below!\n\n'
                + "Hope you're able to make some new friends and have a fun time!\n")
            .addFields(
                {name: 'Among Us', value: `\t${AmongUsEmoji}`, inline: true},
                {name: 'Minecraft', value: `\t${MinecraftEmoji}`, inline: true},
                {name: 'Overwatch', value: `\t${OverwatchEmoji}`, inline: true}
            );

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(AmongUsEmoji);
        messageEmbed.react(MinecraftEmoji);
        messageEmbed.react(OverwatchEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === AmongUsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(AmongUs);
                }
                if (reaction.emoji.name === MinecraftEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Minecraft);
                }
                if (reaction.emoji.name === OverwatchEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Overwatch);
                }
            }
            else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === AmongUsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(AmongUs);
                }
                if (reaction.emoji.name === MinecraftEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Minecraft);
                }
                if (reaction.emoji.name === OverwatchEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Overwatch);
                }
            }
            else {
                return;
            }
        });
    }
}