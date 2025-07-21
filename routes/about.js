const express = require('express');
const router = express.Router();
const About = require('../models/About');

// @route    GET api/about
// @desc     Get About Me content
// @access   Public
router.get('/', async (req, res) => {
    try {
        const aboutContent = await About.findOne();
        if (!aboutContent) {
            return res.json({ content: '' }); // Return empty if no content yet
        }
        res.json(aboutContent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/about
// @desc     Create or Update About Me content
// @access   Private (for now, we'll assume it's admin-only later)
router.post('/', async (req, res) => {
    const { content } = req.body;

    try {
        let aboutContent = await About.findOne();

        if (aboutContent) {
            // Update existing
            aboutContent.content = content;
            aboutContent.updatedAt = Date.now();
            await aboutContent.save();
            return res.json(aboutContent);
        } else {
            // Create new
            aboutContent = new About({
                content,
            });
            await aboutContent.save();
            return res.status(201).json(aboutContent);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
