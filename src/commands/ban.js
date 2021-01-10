module.exports = {
    name: 'ban',
    description: 'ban a member.',
    execute(message, args) {

        if (!message.guild) return;

        if (args.length == 0) {
            message.reply(`You must specify a user to ban.`);
            return;
        }

        const { member, mentions } = message;

        console.log(mentions);

        if (member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('BAN_MEMBERS')) {
            const target = mentions.members.first();
            message.channel.send(`<@${target.id}> was banned.`);
            target.ban();
        } else {
            message.reply('Insufficient permissions.');
        }

        
    }
}