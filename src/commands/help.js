module.exports = {
    name: 'help',
    description: 'Help embed.',
    execute(message, args) {
        const Discord = require(`discord.js`);
        const fs = require(`fs`);
        //const { bot_info, token, prefix } = require(__dirname);
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        .setDescription('Administrative toolkit designed to automate the bot flipping process.')
        .setTimestamp()
        .addField('\u200B', '\u200B')
        //.setFooter(`Arlert Toolkit ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');

        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
        console.log(commandFiles);
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            helpEmbed.addField(`${command.name}`, `${command.description}`, false);
        }

        helpEmbed.addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Github', value: 'https://github.com/jazems/discordjs', property: false },
            { name: 'Twitter', value: 'https://twitter.com/botvest', property: false },
        )

        message.channel.send(helpEmbed);
    }
};