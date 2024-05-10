const Discord = require("discord.js");
const Gamedig = require("gamedig");

module.exports = {
    name: "stats",
    run(client, message, args) {
    const ip = args[0];

    if (!ip) {
      message.channel.send("**Ex: [.stats 123.123.123.123] | قم بكتابة الايبي الخاص بالسيرفر من فضلك**");
      return;
    }

    Gamedig.query({
      type: "mtasa", 
          host: ip,
          port: "22003",
        })

    .then((state) => {
          let developerField = state["Developer"]
          if (typeof developerField === "undefined") {
          developerField = "غير معلوم";
          }
          let passwordField = state["password"] ? ":green_square:  موجود" : ":red_square:  غير موجود";
          let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle(state["name"])
            .setThumbnail('https://media.discordapp.net/attachments/860156555512119346/1156602825032339456/BraveLogo.png?ex=651591d2&is=65144052&hm=39b8c879876b56f2b8f5a381497d93f1bf1b29210b63fe0d0f75e2b0b987dcf8&=')
            .addField("الحالة", "Online :green_square:", true)
            .addField("الماب", state["map"] + " :earth_africa:", true)
            .addField("البنج",state["ping"] + " :cloud_tornado:",true)
            .addField(
              "اللاعبين",
              state["raw"]["numplayers"] + "/" + state["maxplayers"] + " :bust_in_silhouette:",
              true
            )
            .addField("القفل", passwordField)
            .addField(`المبرمج :`,developerField,true)
            .addField("الايبي","mtasa://" + state["connect"] + " :computer:")
            .setFooter(`Requested by ${message.member.user.tag}`,message.member.user.avatarURL());

           message.reply({ embed });
          console.log("Someone check server with ip : " + ip);
      })
      .catch((error) => {
        console.log(error);
        message.reply("**<:no:1074395811854692402>   السيرفر مقفل او البوت يواجه مشاكل داخل الهوست   <:no:1074395811854692402>**" );
      });
  },
};
