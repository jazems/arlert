module.exports = {
	name: 'coinflip',
	description: 'Flip a coin!',
	execute(message, args) {
        var outcome = Math.floor(Math.random() * 2);
        if (outcome === 0) {
            message.reply(`Heads!`);
        } else {
            message.reply(`Tails!`);
        }
    }
};