const Profile = require("../models/Profile");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Log = require("../models/Log");

exports.get = async (req, res) => {
    try {
        const log = await Log.getById(req.params.id);
        if (log[0].length > 0) res.status(200).json({ log: log[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get log error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};
