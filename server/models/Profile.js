const connection = require("../database/db");

module.exports = class Profile {
    static getAll() {
        return connection.execute(`SELECT * FROM profiles `);
    }
    static getById(id) {
        return connection.execute(`SELECT *  FROM profiles  WHERE id = ?`, [
            id,
        ]);
    }
    static create_profile(condition) {
        let { domain_name, google_account, email } = condition;
        domain_name = domain_name ? domain_name : "-";
        google_account = google_account ? google_account : "-";
        email = email ? email : "-";
        return connection.execute(
            `
            INSERT INTO profiles (domain_name, google_account, email) 
            VALUES (?,?,?)
            `,
            [domain_name, google_account, email]
        );
    }
    static update_profile(condition) {
        let { domain_name, google_account, email, id } = condition;
        domain_name = domain_name ? domain_name : "-";
        google_account = google_account ? google_account : "-";
        email = email ? email : "-";
        return connection.execute(
            `
            UPDATE profiles 
            SET domain_name = ?, google_account = ?, email = ?
            WHERE id = ?
            `,
            [domain_name, google_account, email, id]
        );
    }
    static delete_profile(id) {
        return connection.execute(
            `
            DELETE FROM profiles 
            WHERE id = ?
            `,
            [id]
        );
    }
    static update_profile_stepno(condition) {
        let { id, step_no } = condition;
        return connection.execute(
            `
            UPDATE profiles 
            SET step_no = ?
            WHERE id = ?
            `,
            [step_no, id]
        );
    }
};
