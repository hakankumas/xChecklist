const connection = require("../database/db");

module.exports = class Answer {
    static create_profile_questions(data) {
        const { profile_id, question_id, question_name, rank } = data;
        return connection.execute(
            `
            INSERT INTO answers (profile_id, question_id, question_name, rank) 
            VALUES (?,?,?,?)
            `,
            [profile_id, question_id, question_name, rank]
        );
    }
    static getAll(profile_id) {
        return connection.execute(
            `
            SELECT * 
            FROM answers 
            WHERE profile_id = ?
            `,
            [profile_id]
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
};
