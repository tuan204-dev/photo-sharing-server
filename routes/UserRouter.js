const express = require("express");
const User = require("../db/userModel");
const router = express.Router();


// Get all users
router.get("/list", async (request, response) => {
    const userList = await User.find({}, "first_name last_name");

    response.status(200).json({
        message: "Success",
        data: userList,
    });
});

// Get a user by ID
router.get("/:id", async (request, response) => {
    const user = await User.findById(request.params.id);

    if (!user) {
        return response.status(404).json({
            message: "User not found",
        });
    }

    response.status(200).json({
        message: "Success",
        data: user,
    });
});

module.exports = router;