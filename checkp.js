const Discord = require("discord.js");
const mysql = require('mysql');
const config = require('../config.json');

module.exports = {
    name: "checkp",
    run(client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('**<:no:1074395811854692402> ليس لديك الصلاحيات لعمل هذا الامر <:no:1074395811854692402>**');
            return;
        }
        const idAccount = args[0];

        if (!idAccount) {
            message.channel.send("**Ex: [.checkp ID] | قم بكتابة الايدي الخاص باللاعب من فضلك**");
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
            const sql = 'SELECT * FROM characters WHERE account = ?';
            db.query(sql, [idAccount], (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    message.channel.send(`No data found for account ID: ${idAccount}`);
                } else {
                    const accountData = results[0];
                    let onlineField = accountData.active;
                    onlineField = onlineField === "1" ? "Online" : "Offline";
        
                    message.channel.send(`**Character Name: __${accountData.charactername}__, Money: __${accountData.money}__, Age: __${accountData.age}__, Health: __${accountData.health}__, Skin ID: __${accountData.skin}__, Job: __${accountData.job}__, Bank Money: __${accountData.bankmoney}__, Hours on server: __${accountData.hoursplayed}__, Status: __${onlineField}__**`);
                }
                db.end();
            });
        });        
    },
};