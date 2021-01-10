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

        if (member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('KICK_MEMBERS')) {
            const target = mentions.members.first();
            console.log(target);
            message.channel.send(`<@${target.id}> was kicked.`);
            target.kick();
        } else {
            message.reply('Insufficient permissions.');
        }

        
    }
}