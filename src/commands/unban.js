module.exports = {
    name: 'unban',
    description: 'Unban a member.',
    async execute(message, args) {
        if (!message.guild) return;
        
        const Discord = require('discord.js');
        const { bot_info, color } = require(`./../config.json`);
        
        const { member, mentions, guild } = message;

        message.delete();

        if (!member.hasPermission('BAN_MEMBERS') || !member.hasPermission('ADMINISTRATOR')) {
            message.reply("You do not have permission to unban.");
            return;
        }

        if (args.length == 0) {
            message.reply(`You must specify a user to unban.`);
            return;
        }

        let target = mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!reason) {
            reason = undefined;
        }

        let unbanEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('User unbanned')
        .setTimestamp()
        .setFooter(`${bot_info.name} ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');

        if (!target) {
            try {
                target = args[0];
                guild.members.unban(target, { reason: reason });
                unbanEmbed.setDescription(`\`${target}\` was unbanned by \`${member.user.tag}\` for \`${reason}\`.`)
                message.channel.send(unbanEmbed);
                return;
            } catch (error) {
                unbanEmbed.setDescription(`Invalid userID.`)
                message.channel.send(unbanEmbed);
                return;
            }
        } else {
            guild.members.unban(target, { reason: reason });
            unbanEmbed.setDescription(`\`${target.user.tag}\` was unbanned by \`${member.user.tag}\` for \`${reason}\`.`)
            message.channel.send(unbanEmbed);
            return;
        }
    }
}