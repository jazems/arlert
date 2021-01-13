const { DiscordAPIError } = require("discord.js");

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

        if (!target) {
            try {
                target = await guild.members.fetch(args[0]);
            } catch (error) {
                message.reply("Invalid userID.");
                console.log(error);
                return;
            }
        }

        let reason = args.slice(1).join(' ');

        if (!reason) {
            reason = undefined;
        }
        
        let banEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('User banned')
        .setDescription(`\`${target.user.tag}\` was banned by \`${member.user.tag}\` for \`${reason}\`.`)
        .setTimestamp()
        .setFooter(`Arlert Toolkit ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');

        message.channel.send(banEmbed);

        //guild.member.ban(target, { reason: reason });

        /*
        if (member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('BAN_MEMBERS')) {
            if (reason != null) {
                message.channel.send(`<@${target}> was banned for ${reason}.`);
            } else {
                message.channel.send(`<@${target}> was banned.`);
            }
            guild.members.ban(target, { reason: reason } );
        } else {
            message.reply('Insufficient permissions.');
        }
        */
    }
}