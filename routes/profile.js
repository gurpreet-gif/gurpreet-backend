const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// @route    GET api/profile
// @desc     Get profile data
// @access   Public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            // Create a default profile if none exists
            const newProfile = new Profile({});
            await newProfile.save();
            return res.json(newProfile);
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Update profile data
// @access   Private (for now, assume admin-only)
router.post('/', async (req, res) => {
    const { profilePhoto, description, jobTitle, profilePhotoSize, skills } = req.body;
    console.log('Received skills in req.body:', skills);

    try {
        let profile = await Profile.findOne();

        if (profile) {
            // Update existing profile
            profile.profilePhoto = profilePhoto !== undefined ? profilePhoto : profile.profilePhoto;
            profile.description = description !== undefined ? description : profile.description;
            profile.jobTitle = jobTitle !== undefined ? jobTitle : profile.jobTitle;
            profile.profilePhotoSize = profilePhotoSize !== undefined ? profilePhotoSize : profile.profilePhotoSize;
            profile.skills = skills !== undefined ? skills : profile.skills;
            profile.updatedAt = Date.now();
            await profile.save();
            console.log('Profile skills after save:', profile.skills);
            return res.json(profile);
        } else {
            // Create new profile if it doesn't exist
            const newProfile = new Profile({
                profilePhoto,
                description,
                jobTitle,
                profilePhotoSize,
                skills,
            });
            await newProfile.save();
            return res.status(201).json(newProfile);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
