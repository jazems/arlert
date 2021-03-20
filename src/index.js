const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const { bot_info, token, prefix, color } = require('./config.json');
const welcome = require('./commands/welcome')
const mongo = require('./mongo');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log(`${client.user.tag} has logged in.`);
    console.log(`Launching ${bot_info.name} - Version ${bot_info.version}`);
    client.user.setActivity("Fall of Marley", { type: "WATCHING" })

    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')
        } finally {
            mongoose.connection.close()
        }
    })
});

client.on('message', async message => {
    console.log(`[${message.author.tag}]: ${message.content}`); 

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        let unknownCommand = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Arlert')
        .setTimestamp()
        .setFooter(`${bot_info.name} ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png')
        .setDescription(`Command \`${command}\` not found. Type .help for a list of commands.`);
        message.channel.send(unknownCommand);
        return;
    }

    try {
        await client.commands.get(command).execute(message, args);
    } catch (error) {
        let errEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Arlert')
        .setTimestamp()
        .setFooter(`${bot_info.name} ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png')
        .setDescription(`There was an error trying to execute command \`${command}\`.`);
        message.channel.send(errEmbed);
        console.error(error);
    }

});

client.login(token);