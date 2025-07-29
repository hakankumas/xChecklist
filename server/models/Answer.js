const connection = require("../database/db");

module.exports = class Answer {
    static create_profile_questions(data) {
        const {
            profile_id,
            question_id,
            question_name,
            selection,
            selected,
            note,
            rank,
        } = data;
        return connection.execute(
            `
            INSERT INTO answers (profile_id, question_id, question_name, selection, selected, note, rank) 
            VALUES (?,?,?,?,?,?,?)
            `,
            [
                profile_id,
                question_id,
                question_name,
                selection,
                selected,
                note,
                rank,
            ]
        );
    }
    static getAll(profile_id) {
        return connection.execute(
            `
            SELECT * 
            FROM answers 
            WHERE profile_id = ?
            ORDER BY rank ASC, id ASC
            `,
            [profile_id]
        );
    }
    static getAll_rank(condition) {
        const { profile_id, rank } = condition;
        return connection.execute(
            `
            SELECT * 
            FROM answers 
            WHERE profile_id = ? AND rank = ?
            `,
            [profile_id, rank]
        );
    }
    static getById(id) {
        return connection.execute(
            `
            SELECT * 
            FROM answers 
            WHERE id = ?
            `,
            [id]
        );
    }
    static update_answer_rank(condition) {
        const { id, rank } = condition;
        return connection.execute(
            `
                UPDATE answers 
                SET rank = ?
                WHERE id = ?
                `,
            [rank, id]
        );
    }
    static delete_answer(id) {
        return connection.execute(
            `
            DELETE FROM answers 
            WHERE id = ?
            `,
            [id]
        );
    }
    static update({ id, data }) {
        const { question_name, selection, note, selected } = data;
        if (question_name) {
            return connection.execute(
                `UPDATE answers SET question_name = ? WHERE id = ?`,
                [question_name, id]
            );
        }
        if (selection) {
            return connection.execute(
                `UPDATE answers SET selection = ? WHERE id = ?`,
                [selection, id]
            );
        }
        if (note) {
            return connection.execute(
                `UPDATE answers SET note = ? WHERE id = ?`,
                [note, id]
            );
        }
        if (selected) {
            return connection.execute(
                `UPDATE answers SET selected = ? WHERE id = ?`,
                [selected, id]
            );
        }
    }
};
