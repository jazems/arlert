require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = ".";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('message', (message) => {
    console.log(`[${message.author.tag}]: ${message.content}`); 

    if (message.content.startsWith(PREFIX)) {
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
        
        else {
            message.reply(`command ${message.content} is not recognized.`);
        }
    }

    if (message.content === 'hello' || message.content === 'hi') {
        message.reply('bye.');
    }
});
 
client.login(process.env.DISCORD_BOT_TOKEN);