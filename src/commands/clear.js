async function clear() {
    message.delete();
    const fetched = await message.channel.fetchMessages({limit: num});
    message.channel.bulkDelete(fetched);
}

module.exports = {
	name: 'clear',
    description: 'Clear messages.',
	execute(message, args) {

        let numDelete; 

        if (args.length == 0 || isNaN(parseInt(args[0])) || parseInt(args[0]) < 1) {
            numDelete = 1;
        } else {
            numDelete = parseInt(args[0]);
        }

        console.log(numDelete);

        async function clear() {
            message.delete();
            message.channel.bulkDelete(numDelete + 1, true)
            message.reply(`deleted ${numDelete} message(s).`)
            .then(message => {
                message.delete( { timeout: 5000 } );
            });
        }

        clear();
    }
}


