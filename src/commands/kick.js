module.exports = {
    name: 'kick',
    description: 'Kick a member.',
    execute(message, args) {

        if (!message.guild) return;

        if (args.length == 0) {
            message.reply(`You must specify a user to kick.`);
            return;
        }

        const { member, mentions } = message;
        const target = mentions.members.first();
        let reason;

        if (args.length > 1) {
            reason = args.slice(1).join(' ');
            console.log(reason);
        }

        if (member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('KICK_MEMBERS')) {
            if (reason != null) {
                message.channel.send(`<@${target.id}> was kicked for ${reason}.`);
            } else {
                message.channel.send(`<@${target.id}> was kicked.`);
            }
            target.kick();
        } else {
            message.reply('Insufficient permissions.');
        }

        
    }
}