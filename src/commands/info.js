module.exports = {
	name: 'info',
	description: 'dev info',
	execute(message, args) {
        const Discord = require(`discord.js`);
        const fs = require(`fs`);
        //const { bot_info, token, prefix } = require(__dirname);
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Info')
        .setDescription('cursed#0002 is a washed dev studying CS at Cal. This bot was made to automate bot flipping in order to save hours creating bot listings.')
        .setTimestamp()
        .addFields(
            { name: 'Github', value: 'https://github.com/jazems/discordjs', property: false },
            { name: 'Twitter', value: 'https://twitter.com/botvest', property: false },
        );
        //.setFooter(`Arlert Toolkit ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');
        
        message.reply(' ');
        message.channel.send(helpEmbed);
    }
};