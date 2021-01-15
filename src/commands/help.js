module.exports = {
    name: 'help',
    description: 'Command repo.',
    execute(message, args) {

        if (!message.guild) return;

        const Discord = require(`discord.js`);
        const fs = require(`fs`);

        const { bot_info, color } = require(`./../config.json`);

        const helpEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Help')
        .setDescription('Lightweight administrative toolkit.\n ')
        .setTimestamp()
        .setFooter(`${bot_info.name} ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');

        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
        console.log(commandFiles);
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            helpEmbed.addField(`${command.name}`, `\`${command.description}\``, true);
        }

        message.reply(' ');
        message.channel.send(helpEmbed);
    }
};