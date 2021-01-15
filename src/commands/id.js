module.exports = {
	name: 'id',
    description: 'Member info.',
	async execute(message, args) {

        if (!message.guild) return;

        const Discord = require('discord.js');
        const { bot_info, color } = require('./../config.json');

        if (args.length == 0) {
            message.reply(`You must specify a user.`);
            return;
        }

        let { guild , mentions } = message;

        let idEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('id')
        .setTimestamp()
        .setFooter(`${bot_info.name} ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');
        

        let target = mentions.members.first();

        if (!target) {
            try {
                target = await guild.members.fetch(args[0]);
                idEmbed.addFields( 
                    { name: 'tag', value: `${target.user.tag}`, inline: true },
                    { name: 'userID', value: `${target.id}`, inline: true },
                    { name: 'account creation date', value: `${target.user.createdAt}`, inline: false },
                    { name: `server join date`, value: `${target.joinedAt}`, inline: false }
                    )
                .setThumbnail(target.user.displayAvatarURL( {dynamic: true} ))
                message.channel.send(idEmbed);
                return;
            } catch (error) {
                console.log(error);
                idEmbed.setDescription(`Invalid userID.`)
                message.channel.send(idEmbed);
                return;
            }
        } else {
            idEmbed.addFields( 
                { name: 'tag', value: `${target.user.tag}`, inline: true },
                { name: 'userID', value: `${target.id}`, inline: true },
                { name: 'account creation date', value: `${target.user.createdAt}`, inline: false },
                { name: `server join date`, value: `${target.joinedAt}`, inline: false }
                )
            .setThumbnail(target.user.displayAvatarURL( {dynamic: true} ))
            message.channel.send(idEmbed);
            return;
        }
    }
}


