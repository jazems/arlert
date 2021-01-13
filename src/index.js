const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const { bot_info, token, prefix } = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    console.log(`Launching ${bot_info.name} - Version ${bot_info.version}`);
    client.user.setActivity("Fall of Marley", { type: "WATCHING" })
});

client.on('message', async message => {
    console.log(`[${message.author.tag}]: ${message.content}`); 

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.reply(`Command not found. Type .help for a list of commands.`);
        return;
    }

    try {
        await client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`There was an error trying to execute command "${command}".`)
    }

});
 
client.login(token);