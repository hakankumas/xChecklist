const connection = require("../database/db");

module.exports = class Question {
    static getAll() {
        return connection.execute(
            `SELECT * FROM questions ORDER BY rank ASC, id ASC`
        );
    }
    static getById(id) {
        return connection.execute(`SELECT *  FROM questions WHERE id = ?`, [
            id,
        ]);
    }
    static getById_rank(id) {
        return connection.execute(`SELECT *  FROM questions WHERE rank = ?`, [
            id,
        ]);
    }
    static create_question(condition) {
        const { name, selection, selected, note, rank } = condition;
        if (!selected) {
            return connection.execute(
                `
                INSERT INTO questions (name, selection, note, rank) 
                VALUES (?,?,?,?)
                `,
                [name, selection, note, rank]
            );
        } else {
            return connection.execute(
                `
                INSERT INTO questions (name, selection, selected, note, rank) 
                VALUES (?,?,?,?,?)
                `,
                [name, selection, selected, note, rank]
            );
        }
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
    static update_question_selection(condition) {
        const { id, selection } = condition;
        return connection.execute(
            `
            UPDATE questions 
            SET selection = ?
            WHERE id = ?
            `,
            [selection, id]
        );
    }
    static update_question_select(condition) {
        const { id, select } = condition;
        return connection.execute(
            `
            UPDATE questions 
            SET selected = ?
            WHERE id = ?
            `,
            [select, id]
        );
    }
    static update_question_note(condition) {
        const { id, note } = condition;
        return connection.execute(
            `
            UPDATE questions 
            SET note = ?
            WHERE id = ?
            `,
            [note, id]
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
