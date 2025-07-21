const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    profilePhoto: {
        type: String, // URL or path to the image
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    jobTitle: {
        type: String,
        default: '',
    },
    profilePhotoSize: {
        type: Number,
        default: 180, // Default size in pixels
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    skills: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model('Profile', ProfileSchema);
