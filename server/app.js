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

app.get("/profile-getall", async (req, res) => {
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

app.get("/profile-get/:id", async (req, res) => {
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

app.post("/profile-create", async (req, res) => {
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

app.post("/profile-update", async (req, res) => {
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

app.get("/profile-delete/:id", async (req, res) => {
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

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
