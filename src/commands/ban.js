module.exports = {
    name: 'ban',
    description: 'ban a member.',
    async execute(message, args) {

        if (!message.guild) return; 

        if (args.length == 0) {
            message.reply(`You must specify a user to ban.`);
            return;
        }

        const { member, mentions, guild } = message;
        let target = mentions.users.first();
        let reason = args.slice(1).join(' ');
        
        if (!target) {
            try {
                target = await guild.members.fetch(args[0]);
            } catch (error) {
                message.reply("Invalid userID.");
                console.log(error);
            }
        }

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