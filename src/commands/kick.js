module.exports = {
    name: 'kick',
    description: 'kick a member.',
    async execute(message, args) {
        if (!message.guild) return;

        const Discord = require('discord.js');
        const { bot_info, color } = require(`./../config.json`);
        
        const { member, mentions, guild } = message;

        message.delete();

        if (!member.hasPermission('KICK_MEMBERS') || !member.hasPermission('ADMINISTRATOR')) {
            message.reply("You do not have permission to kick.");
            return;
        }

        if (args.length == 0) {
            message.reply(`You must specify a user to kick.`);
            return;
        }

        let target = mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!reason) {
            reason = undefined;
        }

        let kickEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('User kicked')
        .setTimestamp()
        .setFooter(`Arlert Toolkit ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');

        if (!target) {
            try {
                target = await guild.members.fetch(args[0]);
                target.kick(reason);
                kickEmbed.setDescription(`\`${target.user.tag}\` was kicked by \`${member.user.tag}\` for \`${reason}\`.`)
                message.channel.send(kickEmbed);
                return;
            } catch (error) {
                kickEmbed.setDescription(`Invalid userID.`)
                message.channel.send(kickEmbed);
                return;
            }
        } else {
            target.kick(reason);
            kickEmbed.setDescription(`\`${target.user.tag}\` was kicked by \`${member.user.tag}\` for \`${reason}\`.`)
            message.channel.send(kickEmbed);
            return;
        }
    }
}