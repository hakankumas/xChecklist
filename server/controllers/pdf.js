const Profile = require("../models/Profile");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Log = require("../models/Log");
const Pdf = require("../models/Pdf");

const { generatePDF } = require("../utilities/generatePDF");

exports.update = async (req, res) => {
    try {
        // Profil Bilgileri
        const selected_profile = await Profile.getById(req.body.profile_id);
        // Profilin Rank Seviyesinde Sorularını Çeker
        const condition = {
            profile_id: req.body.profile_id,
            rank: req.body.step_no,
        };
        const questions = await Answer.getAll_rank_pdf(condition);

        const fileName = `${req.body.profile_id}-${req.body.step_no}.pdf`;
        await generatePDF(
            selected_profile[0][0].domain_name,
            questions[0],
            fileName
        );

        // Ön Analiz Raporu - PDF Log
        if (req.body.step_no === 1) {
            try {
                await Log.create({
                    profile_id: req.body.profile_id,
                    log: `Ön Analiz Raporu İçin PDF Oluşturuldu.`,
                });
            } catch (error) {
                console.error(error);
            }
        }

        // Detaylı Analiz Raporu - PDF Log
        if (req.body.step_no === 2) {
            try {
                await Log.create({
                    profile_id: req.body.profile_id,
                    log: `Detaylı Analiz Raporu İçin PDF Oluşturuldu.`,
                });
            } catch (error) {
                console.error(error);
            }
        }

        // Profilin pdf alanını günceller
        const updated_pdf = await Pdf.update({ ...req.body, path: fileName });
        if (updated_pdf[0].affectedRows > 0) {
            res.status(200).json({
                pdf: selected_profile[0][0],
                message: "Pdf updated successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
