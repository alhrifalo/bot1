const Discord = require("discord.js");
const mysql = require('mysql');
const config = require('../config.json');

module.exports = {
    name: "givemoney",
    run(client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('**<:no:1074395811854692402> ليس لديك الصلاحيات لعمل هذا الامر <:no:1074395811854692402>**');
            return;
        }

        const accountId = args[0];
        const amount = parseInt(args[1]);

        if (!accountId || isNaN(amount)) {
            message.channel.send("**Ex: [.givemoney ID amount] | قم بكتابة الايدي والمبلغ من فضلك**");
            return;
        }

        const dbConfig = config.database;

        const db = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.databaseName,
        });

        db.connect(err => {
            if (err) throw err;
            const selectSql = 'SELECT money FROM characters WHERE account = ?';
            db.query(selectSql, [accountId], (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    message.channel.send("**<:no:1074395811854692402>  هذا الايدي غير موجود في قاعدة البيانات  <:no:1074395811854692402>**");
                } else {
                    const oldMoney = results[0].money;
                    const newMoney = oldMoney + amount;
                    const updateSql = 'UPDATE characters SET money = ? WHERE account = ?';
                    db.query(updateSql, [newMoney, accountId], (err) => {
                        if (err) throw err;
                        let embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("--.givemoney command--")
                        .setThumbnail('https://media.discordapp.net/attachments/860156555512119346/1156602825032339456/BraveLogo.png?ex=651591d2&is=65144052&hm=39b8c879876b56f2b8f5a381497d93f1bf1b29210b63fe0d0f75e2b0b987dcf8&=')
                        .addField("- Account id:", accountId )
                        .addField("- Old Money:", oldMoney, true)
                        .addField("- New Money:", newMoney, true)
                        .setFooter(`Requested by ${message.member.user.tag}`,message.member.user.avatarURL());
                        message.reply({ embed });
                    });
                }
                db.end();
            });
        });
    },
};
