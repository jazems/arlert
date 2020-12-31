const { Client, DiscordAPIError } = require('discord.js');
const client = new Client();
const { bot_info, token, prefix } = require('./config.json');

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    console.log(`Launching ${bot_info.name} - Version ${bot_info.version}`);
});

client.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`); 

    if (message.content.startsWith(prefix)) {
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
        
        else {
            message.reply(`command ${message.content} is not recognized.`);
        }
    }

    if (message.content === 'hello' || message.content === 'hi') {
        message.reply('bye.');
    }
});
 
client.login(token);