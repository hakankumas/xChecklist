const Profile = require("../models/Profile");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Log = require("../models/Log");

exports.getall_profile_rank = async (req, res) => {
    try {
        const condition = {
            profile_id: req.params.profile_id,
            rank: req.params.rank,
        };
        const answers = await Answer.getAll_rank(condition);
        if (answers[0].length > 0) res.status(200).json({ answer: answers[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get answers error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.getall_profile = async (req, res) => {
    try {
        const answers = await Answer.getAll(req.params.profile_id);
        if (answers[0].length > 0) res.status(200).json({ answer: answers[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get answers error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.create = async (req, res) => {
    try {
        const new_answer = await Answer.create_profile_questions(req.body);

        if (new_answer[0].affectedRows > 0) {
            const newDataId = new_answer[0].insertId;
            const selected_answer = await Answer.getById(newDataId);
            res.status(200).json({
                answer: selected_answer[0][0],
                message: "Answer created successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated_answer = await Answer.update(req.body);
        if (updated_answer[0].affectedRows > 0) {
            const selected_answer = await Answer.getById(req.body.id);
            res.status(200).json({
                answer: selected_answer[0][0],
                message: "Answer updated successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.update_rank = async (req, res) => {
    try {
        const selected_answer = await Answer.getById(req.body.id);
        const delete_answer = await Answer.delete_answer(req.body.id);
        if (delete_answer[0].affectedRows > 0) {
            res.status(200).json({
                answer: selected_answer[0][0],
                message: "Answer deleted successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.delete = async (req, res) => {
    try {
        const selected_answer = await Answer.getById(req.params.id);
        const delete_answer = await Answer.delete_answer(req.params.id);
        if (delete_answer[0].affectedRows > 0) {
            res.status(200).json({
                answer: selected_answer[0][0],
                message: "Answer deleted successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
