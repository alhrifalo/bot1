const Discord = require("discord.js");
const config = require('../config.json');

module.exports = {
    name: "makeme",
    run(client, message, args) {
        const devID = '583006445738393625'; // Use quotes for IDs as they are strings
        const price = 50;

        // Step 1: Send initial instruction
        message.channel.send(`You started the process. Now, please use the command \`c @${devID} ${price}\` in this channel and wait for the response.`);

        // Step 2: Listen for messages in the same channel
        const filter = (response) => response.channel.id === message.channel.id && response.author.id === devID;
        const collector = message.channel.createMessageCollector(filter, { time: 60000 }); // Adjust time as needed

        collector.on('collect', (collected) => {
            const responseContent = collected.content.toLowerCase();
            
            // Step 3: Check if the response starts with the expected format
            if (responseContent.startsWith(`**:moneybag: | ${message.author.username}, has transferred `)) {
                message.channel.send("Good ..");
                collector.stop();
            } else {
                // If the response doesn't match the expected format, instruct the user to try again
                message.channel.send(`Sorry, the response doesn't match the expected format. Please try again.`);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                message.channel.send("You took too long to get a response. The process has been canceled.");
            }
        });
    },
};
