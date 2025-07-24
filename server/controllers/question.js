const Profile = require("../models/Profile");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Log = require("../models/Log");

exports.getall = async (req, res) => {
    try {
        const questions = await Question.getAll();
        if (questions[0].length > 0)
            res.status(200).json({ question: questions[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.get = async (req, res) => {
    try {
        const question = await Question.getById(req.params.id);
        if (question[0].length > 0)
            res.status(200).json({ question: question[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.rank = async (req, res) => {
    try {
        const question = await Question.getById_rank(req.params.id);
        if (question[0].length > 0)
            res.status(200).json({ question: question[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.create = async (req, res) => {
    try {
        const new_question = await Question.create_question(req.body);

        if (new_question[0].affectedRows > 0) {
            const newDataId = new_question[0].insertId;
            const selected_question = await Question.getById(newDataId);
            res.status(200).json({
                question: selected_question[0][0],
                message: "Question created successfully.",
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
        let updated_question;
        if (req.body.name) {
            updated_question = await Question.update_question_name(req.body);
        }
        if (req.body.note) {
            updated_question = await Question.update_question_note(req.body);
        }
        if (updated_question[0].affectedRows > 0) {
            const selected_question = await Question.getById(req.body.id);
            res.status(200).json({
                question: selected_question[0][0],
                message: "Question updated successfully.",
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
        const updated_question_rank = await Question.update_question_rank(
            req.body
        );
        if (updated_question_rank[0].affectedRows > 0) {
            const selected_question = await Question.getById(req.body.id);
            res.status(200).json({
                question: selected_question[0][0],
                message: "Question updated successfully.",
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
        const selected_question = await Question.getById(req.params.id);
        const delete_question = await Question.delete_question(req.params.id);
        if (delete_question[0].affectedRows > 0) {
            res.status(200).json({
                question: selected_question[0][0],
                message: "Question deleted successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
