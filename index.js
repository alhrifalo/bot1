const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");
client.prefix = prefix;
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const Gamedig = require("gamedig");

require('discord-buttons')(client);

for (const file of commandFiles) { 
  const command = require(`./commands/${file}`); 

  client.commands.set(command.name, command); 
}

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`); 
	client.user.setActivity('.help', { type: 'WATCHING' }) 
 });

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; 
  const args = message.content.slice(prefix.length).trim().split(/ +/); 
  const command = args.shift().toLowerCase(); 
  if (!client.commands.has(command)) return; 

  try {
    client.commands.get(command).run(client, message, args); 
  } catch (error) {
    console.error(error); 
    message.reply("Error while using the command.."); 
  }
});


client.login(token);
