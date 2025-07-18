const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

// Models
const Profile = require("./models/Profile");
const Question = require("./models/Question");

app.get("/profile/getall", async (req, res) => {
    try {
        const profiles = await Profile.getAll();
        if (profiles[0].length > 0)
            res.status(200).json({ profile: profiles[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get profiles error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/profile/:id", async (req, res) => {
    try {
        const profile = await Profile.getById(req.params.id);
        if (profile[0].length > 0)
            res.status(200).json({ profile: profile[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.post("/profile/create", async (req, res) => {
    try {
        const new_profile = await Profile.create_profile(req.body);

        if (new_profile[0].affectedRows > 0) {
            const newDataId = new_profile[0].insertId;
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
});

app.post("/profile/update", async (req, res) => {
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
});

app.get("/profile/delete/:id", async (req, res) => {
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
});

app.post("/profile/update/stepno", async (req, res) => {
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
});

app.get("/question/getall", async (req, res) => {
    try {
        const questions = await Question.getAll();
        if (questions[0].length > 0)
            res.status(200).json({ question: questions[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.get("/question/:id", async (req, res) => {
    try {
        const question = await Question.getById(req.params.id);
        if (question[0].length > 0)
            res.status(200).json({ question: question[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.post("/question/create", async (req, res) => {
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
});

app.post("/question/update", async (req, res) => {
    try {
        const updated_question = await Question.update_question(req.body);
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
});

app.get("/question/delete/:id", async (req, res) => {
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
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
