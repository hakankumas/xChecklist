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
    static update_question_name(condition) {
        const { id, name } = condition;
        return connection.execute(
            `
            UPDATE questions 
            SET name = ?
            WHERE id = ?
            `,
            [name, id]
        );
    }
    static update_question_rank(condition) {
        const { id, rank } = condition;
        return connection.execute(
            `
            UPDATE questions 
            SET rank = ?
            WHERE id = ?
            `,
            [rank, id]
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
