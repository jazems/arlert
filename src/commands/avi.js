module.exports = {
    name: "avi",
    description: "Member avi.",
    async execute(message, args) {

        if (!message.guild) return;

        const Discord = require('discord.js');
        const { bot_info, color } = require('../config.json');

        let aviEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('avi')
        .setTimestamp()
        .setFooter(`${bot_info.name} ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');
    
        let { member, guild , mentions } = message;
        let target = member;

        if (args.length == 0) {
            aviEmbed.addFields( 
                { name: 'Requested by', value: `${member.user.tag}`, inline: true })
            .setImage(target.user.displayAvatarURL( {size: 1024, dynamic: true} ))
            message.channel.send(aviEmbed);
            return;
        }

        target = mentions.members.first();

        if (!target) {
            try {
                target = await guild.members.fetch(args[0]);
                aviEmbed.addFields( 
                    { name: 'Requested by', value: `${member.user.tag}`, inline: true })
                .setImage(target.user.displayAvatarURL( {size: 1024, dynamic: true} ))
                message.channel.send(aviEmbed);
                return;
            } catch (error) {
                console.log(error);
                aviEmbed.setDescription(`Invalid userID.`)
                message.channel.send(aviEmbed);
                return;
            }
        } else {
            aviEmbed.addFields( 
                { name: 'Requested by', value: `${member.user.tag}`, inline: true })
            .setImage(target.user.displayAvatarURL( {size: 1024, dynamic: true} ))
            message.channel.send(aviEmbed);
            return;
        }
    }
}