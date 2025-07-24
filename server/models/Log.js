const connection = require("../database/db");

module.exports = class Log {
    static getById(id) {
        return connection.execute(
            `SELECT * FROM logs WHERE profile_id = ? ORDER BY id DESC`,
            [id]
        );
    }
    static create({ profile_id, log }) {
        return connection.execute(
            `
            INSERT INTO logs (profile_id, log) 
            VALUES (?,?)
            `,
            [profile_id, log]
        );
    }
    static search({ profile_id, log }) {
        return connection.execute(
            `
            SELECT * FROM logs
            WHERE profile_id = ? AND log = ?
            `,
            [profile_id, log]
        );
    }
};
