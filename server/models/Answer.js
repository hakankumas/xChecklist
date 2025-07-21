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
    static getAll(condition) {
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
};
