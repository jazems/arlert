module.exports = {
	name: 'clear',
    description: 'Clear messages.',
	execute(message, args) {

        if (!message.guild) return;

        const Discord = require('discord.js');
        const { bot_info, color } = require('./../config.json');

        let numDelete;

        if (args.length == 0 || isNaN(parseInt(args[0])) || parseInt(args[0]) < 1) {
            numDelete = 1;
        } else {
            numDelete = parseInt(args[0]);
        }

        async function clear() {
            message.delete();
            message.channel.bulkDelete(numDelete + 1, true)

            let returnEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('Clear')
            .setTimestamp()
            .setFooter(`Arlert Toolkit Version ${bot_info.version}`, 'https://i.pinimg.com/originals/83/70/cb/8370cb432131e814c78379eb78a4bdbe.png');
            returnEmbed.setDescription(`Deleted ${numDelete} message(s).`)
            
            message.reply(returnEmbed)
            .then(message => {
                message.delete( { timeout: 5000 } );
            });
        }

        clear();
    }
}


