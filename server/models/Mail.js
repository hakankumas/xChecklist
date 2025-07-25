const connection = require("../database/db");

module.exports = class Mail {
    static getById(id) {
        return connection.execute(
            `
            SELECT *
            FROM mails 
            WHERE id = ?
            `,
            [id]
        );
    }
    static create(condition) {
        const { profile_id, email, subject, message } = condition;
        return connection.execute(
            `
            INSERT INTO mails (profile_id, email, subject, message) 
            VALUES (?,?,?,?)
            `,
            [profile_id, email, subject, message]
        );
    }
};
