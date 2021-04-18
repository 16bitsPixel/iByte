module.exports = {
    name: 'unmute',
    description: 'unmutes a user',
    execute(message) {
        if (!message.member.roles.cache.has('793711730257690697')) return;
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.id === '793691185356079105');
            let muteRole = message.guild.roles.cache.find(role => role.id === '793716658123309086');

            let memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
        }
        else {
            message.channel.send("Can't find that member or member is not muted");
        }
    }
}