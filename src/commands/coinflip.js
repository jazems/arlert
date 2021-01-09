module.exports = {
	name: 'coinflip',
	description: 'Flip a coin!',
	execute(message, args) {
        const Discord = require('discord.js');
        const { bot_info } = require('./../config.json');
        let returnEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Coinflip')
        .setTimestamp()
        .setFooter(`Arlert Toolkit Version ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');
        let outcome = Math.floor(Math.random() * 2);
        if (outcome === 0) {
            returnEmbed.setDescription('`Heads!`');
            message.reply(` `);
            message.channel.send(returnEmbed);
        } else {
            returnEmbed.setDescription('`Tails!`');
            message.reply(` `);
            message.channel.send(returnEmbed);
        }
    }
};