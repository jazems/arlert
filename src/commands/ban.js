module.exports = {
    name: 'ban',
    description: 'ban a member.',
    async execute(message, args) {
        const Discord = require('discord.js');
        const { bot_info, token, prefix } = require(`./../config.json`);

        if (!message.guild) return;
        
        const { member, mentions, guild } = message;

        if (!member.hasPermission('BAN_MEMBERS') || !member.hasPermission('ADMINISTRATOR')) {
            message.reply("You do not have permission to ban.");
            return;
        }

        if (args.length == 0) {
            message.reply(`You must specify a user to ban.`);
            return;
        }

        let target = mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!reason) {
            reason = undefined;
        }

        let banEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('User banned')
        .setTimestamp()
        .setFooter(`Arlert Toolkit ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');

        if (!target) {
            try {
                target = await guild.members.fetch(args[0]);
                guild.members.ban(target, { reason: reason });
                banEmbed.setDescription(`\`${target.user.tag}\` was banned by \`${member.user.tag}\` for \`${reason}\`.`)
                message.channel.send(banEmbed);
                return;
            } catch (error) {
                try {
                    target = args[0];
                    guild.members.ban(target, { reason: reason });
                    banEmbed.setDescription(`\`${target}\` was banned by \`${member.user.tag}\` for \`${reason}\`.`)
                    message.channel.send(banEmbed);
                    return;
                } catch {
                    banEmbed.setDescription(`Invalid userID.`)
                    message.channel.send(banEmbed);
                    return;
                }
            }
        } else {
            guild.members.ban(target, { reason: reason });
            banEmbed.setDescription(`\`${target.user.tag}\` was banned by \`${member.user.tag}\` for \`${reason}\`.`)
            message.channel.send(banEmbed);
            return;
        }
    }
}