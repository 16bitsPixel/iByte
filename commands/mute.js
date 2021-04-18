const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'mutes a member',
    execute(message, args) {
        if (!message.member.roles.cache.has('793711730257690697')) return;
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.id === '793691185356079105');
            let muteRole = message.guild.roles.cache.find(role => role.id === '793716658123309086');

            let memberTarget = message.guild.members.cache.get(target.id);

            if(!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return;
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function() {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        }
        else {
            message.channel.send("Can't find that member");
        }
    }
}