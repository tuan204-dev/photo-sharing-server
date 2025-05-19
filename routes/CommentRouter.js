const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const mongoose = require("mongoose");


const router = express.Router();

router.get('/commentsOfUser/:id', async (request, response) => {
    const userId = request.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return response.status(400).json({
            message: "User not found",
        });
    }

    const objectUserId = new mongoose.Types.ObjectId(userId);

    const photos = await Photo.find({ "comments.user_id": objectUserId });

    const result = photos.map(photo => {
        const comments = photo.comments.filter(comment => comment.user_id.equals(userId))

        const { __v, ...photoObj } = photo.toObject()

        return {
            ...photoObj,
            comments
        }
    })

    response.status(200).json({
        message: "Success",
        data: result,
    });
})


module.exports = router;