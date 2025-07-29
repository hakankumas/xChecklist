const connection = require("../database/db");

module.exports = class Pdf {
    static update(condition) {
        const { path, profile_id, step_no } = condition;
        if (step_no === 1) {
            return connection.execute(
                `
                UPDATE profiles 
                SET pdf1 = ?
                WHERE id = ?`,
                [path, profile_id]
            );
        }
        if (step_no === 2) {
            return connection.execute(
                `
                UPDATE profiles 
                SET pdf2 = ?
                WHERE id = ?`,
                [path, profile_id]
            );
        }
    }
};
