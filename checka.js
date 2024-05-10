const Discord = require("discord.js");
const mysql = require('mysql');
const config = require('../config.json');

module.exports = {
    name: "checka",
    run(client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('**<:no:1074395811854692402> ليس لديك الصلاحيات لعمل هذا الامر <:no:1074395811854692402>**');
            return;
        }

        // Check if the user provided an account ID
        const accountId = args[0];

        if (!accountId) {
            message.channel.send("**Ex: [.checka ID] | قم بكتابة الايدي الخاص باللاعب من فضلك**");
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
            const sql = 'SELECT * FROM accounts WHERE id = ?';
            db.query(sql, [accountId], (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    message.channel.send("**<:no:1074395811854692402>  هذا الايدي غير موجود  <:no:1074395811854692402>**");
                } else {
                    const accountData = results[0];
                    message.channel.send(`**Account ID: __${accountData.id}__, Username: __${accountData.username}__, Email: __${accountData.email}__, Admin Rank: __${accountData.admin}__, Support Rank: __${accountData.supporter}__, Mapper Rank: __${accountData.mapper}__, Scripter Rank: __${accountData.scripter}__, Serial: __${accountData.mtaserial}__**`);
                }
                db.end();
            });
        });
    },
};