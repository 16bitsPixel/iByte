module.exports = {
    name: 'kick',
    description: 'kicks a user',
    execute(message) {
        if (!message.member.roles.cache.has('793711730257690697')) return;
        const member = message.mentions.users.first();
        if(member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }
        else {
            message.channel.send('Unable to kick a user');
        }
    }
}