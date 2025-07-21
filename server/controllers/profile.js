const Profile = require("../models/Profile");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

exports.getall = async (req, res) => {
    try {
        const profiles = await Profile.getAll();
        if (profiles[0].length > 0)
            res.status(200).json({ profile: profiles[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get profiles error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.get = async (req, res) => {
    try {
        const profile = await Profile.getById(req.params.id);
        if (profile[0].length > 0)
            res.status(200).json({ profile: profile[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.create = async (req, res) => {
    try {
        const new_profile = await Profile.create_profile(req.body);

        if (new_profile[0].affectedRows > 0) {
            const newDataId = new_profile[0].insertId;
            // Create Edilen Kullanıcı için Default Sorular Atanır
            try {
                const step1Questions = await Question.getById_rank(1);
                for (const s1q of step1Questions[0]) {
                    await Answer.create_profile_questions({
                        profile_id: newDataId,
                        question_id: s1q.id,
                        question_name: s1q.name,
                        rank: s1q.rank,
                    });
                }
            } catch (error) {
                console.error(error);
            }
            try {
                const step2Questions = await Question.getById_rank(2);
                for (const s2q of step2Questions[0]) {
                    await Answer.create_profile_questions({
                        profile_id: newDataId,
                        question_id: s2q.id,
                        question_name: s2q.name,
                        rank: s2q.rank,
                    });
                }
            } catch (error) {
                console.error(error);
            }
            const selected_profile = await Profile.getById(newDataId);
            res.status(200).json({
                profile: selected_profile[0][0],
                message: "Profile created successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        console.error("Create profile error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.update = async (req, res) => {
    try {
        const updated_profile = await Profile.update_profile(req.body);
        if (updated_profile[0].affectedRows > 0) {
            const selected_profile = await Profile.getById(req.body.id);
            res.status(200).json({
                profile: selected_profile[0][0],
                message: "Profile updated successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.delete = async (req, res) => {
    try {
        const selected_profile = await Profile.getById(req.params.id);
        const delete_profile = await Profile.delete_profile(req.params.id);
        if (delete_profile[0].affectedRows > 0) {
            res.status(200).json({
                profile: selected_profile[0][0],
                message: "Profile deleted successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        console.error("Delete profile error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.stepno = async (req, res) => {
    try {
        const updated_profile_stepno = await Profile.update_profile_stepno(
            req.body
        );
        if (updated_profile_stepno[0].affectedRows > 0) {
            const selected_profile = await Profile.getById(req.body.id);
            res.status(200).json({
                profile: selected_profile[0][0],
                message: "Profile updated successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        console.error("Update profile step no error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};
