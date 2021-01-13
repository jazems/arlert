module.exports = {
    name: 'unban',
    description: 'Unban a member.',
    async execute(message, args) {

        if (!message.guild) return;

        if (args.length == 0) {
            message.reply(`You must specify a user to unban.`);
            return;
        }

        const { guild, mentions, channel } = message;
        let target;

        if (mentions.length == 0) {
            target = mentions.users.first();
        } else {
            target = args.shift();
        }

        let reason = args.slice(1).join(' ');

        console.log(await guild.fetchBans());
        console.log("target " + target);

        guild.members.unban(target);
        channel.send(`${target} was unbanned.`);

        /*
        if (await guild.fetchBans().get(target) == null) {
            message.channel.send("Target is already unbanned.");
        }

        if (await guild.fetchBans().get(target) != null && args.length <= 1) {
            guild.members.unban(target)
            message.channel.send(`${target.tag} was unbanned.`)
        } else if (await guild.fetchBans().has(target) != null && args.length > 1) {
            guild.members.unban(target, reason);
            message.channel.send(`${target.tag} was unbanned for ${reason}`);
        }
        */
    }
}