//sets up discord bot
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

//sets up command folder
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
const prefix = 'i';

//sets up counters folder
const memberCounter = require('./counters/member-counter');

//login for the bot
const TOKEN = process.env.TOKEN;
client.login(TOKEN);
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    memberCounter(client);
});

//gives new people the member role
client.on('guildMemberAdd', guildMember => {
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.id === '793691185356079105');
  guildMember.roles.add(welcomeRole);
  guildMember.guild.channels.cache.get('793691049243049995').send(`Welcome to the server <@${guildMember.user.id}>!`);
});

//handles commands being called
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(`Called command: ${command}`);
    
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, Discord, client);
      } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
      }
});