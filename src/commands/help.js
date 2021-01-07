module.exports = {
    name: 'help',
    description: 'Help embed.',
    execute(message, args) {
        message.channel.send({embed: {
            color: 3447003,
            description: "A very simple Embed!"
            }});
    }
};