const Discord = require("discord.js");
const mysql = require('mysql');
const config = require('../config.json');

module.exports = {
    name: "showfactions",
    run(client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('**<:no:1074395811854692402> ليس لديك الصلاحيات لعمل هذا الامر <:no:1074395811854692402>**');
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
            console.log('Connected to database!');
            const sql = 'SELECT id, name FROM factions';

            db.query(sql, (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    message.channel.send('No factions found in the database.');
                } else {
                    results.forEach(result => {
                        const factionName = result.name;
                        const factionID = result.id;
                        message.channel.send(`**ايدي الفكشن: __${factionID}__, اسم الفكشن: __${factionName}__**`);
                    });
                }
                db.end();
            });
        });
    },
};