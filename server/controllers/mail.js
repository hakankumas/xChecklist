const Profile = require("../models/Profile");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Log = require("../models/Log");
const Mail = require("../models/Mail");
const send_mail = require("../utilities/mailer");

exports.send = async (req, res) => {
    try {
        await send_mail(req.body);
        // Mail içeriği database'e kaydediliyor.
        const create_mail = await Mail.create(req.body);
        if (create_mail[0].affectedRows > 0) {
            // Ön Analiz Raporu Log Kaydı
            if (req.body.step_no === 1) {
                try {
                    await Log.create({
                        profile_id: req.body.profile_id,
                        log: `Ön Analiz Raporu Maili Gönderildi.`,
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            // Detaylı Analiz Raporu Log Kaydı
            if (req.body.step_no === 2) {
                try {
                    await Log.create({
                        profile_id: req.body.profile_id,
                        log: `Detaylı Analiz Raporu Maili Gönderildi.`,
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            const newDataId = create_mail[0].insertId;
            const selected_mail = await Mail.getById(newDataId);
            res.status(200).json({
                mail: selected_mail[0][0],
                message: "Mail created successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        console.error("Send mail error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};
