const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route    GET api/reviews
// @desc     Get all reviews
// @access   Public
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/reviews
// @desc     Add a new review
// @access   Public
router.post('/', async (req, res) => {
    const { reviewerName, reviewText, rating } = req.body;

    try {
        const newReview = new Review({
            reviewerName,
            reviewText,
            rating,
        });

        const review = await newReview.save();
        res.status(201).json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
