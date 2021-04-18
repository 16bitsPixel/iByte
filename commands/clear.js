module.exports = {
    name: 'clear',
    description: 'clears a number of messages',
    async execute(message, args) {
        if (message.member.roles.cache.has('793711730257690697')) {
            if (!args[0]) return message.reply("Please enter the number of messages that you would like to clear");
            else if (isNaN(args[0])) return message.reply("Please enter a real number");
            else if (args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
            else if (args[0] < 1) return message.reply("You must delete at least one message!");

            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages);
            });
        }
        else {
            return;
        }
    }
}