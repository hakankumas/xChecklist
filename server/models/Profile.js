const connection = require("../database/db");

module.exports = class Profile {
    static getAll() {
        return connection.execute(`SELECT * FROM profile `);
    }
    static getById(id) {
        return connection.execute(`SELECT *  FROM profile  WHERE id = ?`, [id]);
    }
    static create_profile(condition) {
        const { domain_name, google_account, email } = condition;
        return connection.execute(
            `
            INSERT INTO profile (domain_name, google_account, email) 
            VALUES (?,?,?)
            `,
            [domain_name, google_account, email]
        );
    }
    static update_profile(condition) {
        const { domain_name, google_account, email, id } = condition;
        domain_name = domain_name ? domain_name : null;
        google_account = google_account ? google_account : null;
        email = email ? email : null;
        return connection.execute(
            `
            UPDATE profile 
            SET domain_name = ?, google_account = ?, email = ?
            WHERE id = ?
            `,
            [domain_name, google_account, email, id]
        );
    }
    static delete_profile(id) {
        return connection.execute(
            `
            DELETE FROM profile 
            WHERE id = ?
            `,
            [id]
        );
    }
};
