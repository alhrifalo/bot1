const Discord = require("discord.js");

module.exports = {
    name: "help",
    run(client, message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle("Brave MTA Helping Section")
            .setThumbnail('https://media.discordapp.net/attachments/860156555512119346/1156602825032339456/BraveLogo.png?ex=651591d2&is=65144052&hm=39b8c879876b56f2b8f5a381497d93f1bf1b29210b63fe0d0f75e2b0b987dcf8&=')
            .addField(".stats", ".stats [ip].")
            .addField(".showfactions", ".showfactions => Show all server factions.")
            .addField(".checka", ".checka [id] => Check account.")
            .addField(".checkp", ".checkp [id] => Check player.")
            .addField(".givemoney", ".givemoney [id] [amount] => Give player money.")
            .addField(".givegc", ".givegc [id] [amount] => Give player gameCoins (GC).")
            .addField(".setadmin", ".setadmin [id] [adminRank] => Set player admin.")
            .addField(".sethours", ".sethours [id] [hoursValue] => Set player hours in server.")
            .addField(".setskin", ".setskin [id] [skinID] => Set player skin.")
            .addField("**BOT GAMEMODE**", "Bot is working on __OWL GAMEMODE__ only.")
            .addField("**BOT DEVELOPER**", "__Brox__ from __brave__ : https://discord.gg/ZBDx6JnpEp.")
            .setFooter(`Requested by ${message.member.user.tag}`,message.member.user.avatarURL());
           message.reply({ embed });
    
  },
};
