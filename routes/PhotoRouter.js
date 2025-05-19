const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

// Get all photos of a user
router.get("/photosOfUser/:id", async (request, response) => {
    const user = await User.findById(request.params.id);
    if (!user) {
        return response.status(400).json({
            message: "User not found",
        });
    }
    const photos = await Photo.find({ user_id: request.params.id });
    if (!photos) {
        return response.status(400).json({
            message: "No photos found for this user",
        });
    }
    response.status(200).json({
        message: "Success",
        data: photos,
    });
});

module.exports = router;
