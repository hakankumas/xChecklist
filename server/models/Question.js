const connection = require("../database/db");

module.exports = class Question {
    static getAll() {
        return connection.execute(`SELECT * FROM questions `);
    }
    static getById(id) {
        return connection.execute(`SELECT *  FROM questions  WHERE id = ?`, [
            id,
        ]);
    }
    static create_question(condition) {
        let { name } = condition;
        name = name ? name : "-";
        return connection.execute(
            `
            INSERT INTO questions (name) 
            VALUES (?)
            `,
            [name]
        );
    }
    static update_question(condition) {
        let { name } = condition;
        name = name ? name : "-";
        return connection.execute(
            `
            UPDATE questions 
            SET name = ?
            WHERE id = ?
            `,
            [name]
        );
    }
    static delete_question(id) {
        return connection.execute(
            `
            DELETE FROM questions 
            WHERE id = ?
            `,
            [id]
        );
    }
};
