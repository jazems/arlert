const { Client, DiscordAPIError } = require('discord.js');
const client = new Client();
const { bot_info, token, prefix } = require('./config.json');

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    console.log(`Launching ${bot_info.name} - Version ${bot_info.version}`);
});

client.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`); 

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (args.length === 0) {
        message.reply(`You have not input any arguments. Type ${prefix}help for a list of commands.`);
    }

    if (message.content.startsWith('ping', 1)) {
        message.reply(`latency = ${Date.now() - message.createdTimestamp}ms`);
    }

    else if (message.content.startsWith('coinflip', 1)) {
        var outcome = Math.floor(Math.random() * 2);
        if (outcome === 0) {
            message.reply(`Heads!`);
        } else {
            message.reply(`Tails!`);
        }
    }

    else if (message.content.startsWith('help', 1)) {
        message.channel.send({embed: {
            color: 3447003,
            description: "A very simple Embed!"
            }});
    }
});
 
client.login(token);