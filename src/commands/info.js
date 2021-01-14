module.exports = {
	name: 'info',
	description: 'Developer info.',
	execute(message, args) {

        if (!message.guild) return;

        const Discord = require(`discord.js`);
        const { bot_info, color } = require(`./../config.json`);
        const infoEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('About')
        .setDescription('cursed#0002 is a freshman studying CS. This bot was made to automate bot flipping in order to save hours creating bot listings.')
        .setTimestamp()
        .addFields(
            { name: 'Github', value: 'https://github.com/jazems', property: false },
            { name: 'Twitter', value: 'https://twitter.com/botvest', property: false },
        )
        .setFooter(`Arlert Toolkit ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');
        
        message.reply(' ');
        message.channel.send(infoEmbed);
    }
};