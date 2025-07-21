import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsScreen = () => {
    const [reviews, setReviews] = useState([]);
    const [reviewerName, setReviewerName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('/api/reviews');
                setReviews(res.data);
            } catch (err) {
                setError('Failed to fetch reviews.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (reviewerName.trim() === '' || reviewText.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const res = await axios.post('/api/reviews', {
                reviewerName,
                reviewText,
                rating,
            });
            setReviews([res.data, ...reviews]); // Add new review to the top
            setReviewerName('');
            setReviewText('');
            setRating(1);
        } catch (err) {
            setError('Failed to submit review.');
            console.error(err);
        }
    };

    if (loading) return <div className="container text-center mt-5">Loading reviews...</div>;
    if (error) return <div className="container text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Reviews</h1>

            <div className="card p-4 mb-4 shadow-sm">
                <h2 className="mb-3">Submit a Review</h2>
                <form onSubmit={handleSubmitReview}>
                    <div className="mb-3">
                        <label htmlFor="reviewerName" className="form-label">Your Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="reviewerName"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reviewText" className="form-label">Your Review</label>
                        <textarea
                            className="form-control"
                            id="reviewText"
                            rows="3"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <select
                            className="form-select"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>

            <h2 className="text-center mb-4">All Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-center">No reviews yet. Be the first to leave one!</p>
            ) : (
                <div className="row">
                    {reviews.map((review) => (
                        <div key={review._id} className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{review.reviewerName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Rating: {'⭐'.repeat(review.rating)}</h6>
                                    <p className="card-text">{review.reviewText}</p>
                                    <p className="card-text"><small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsScreen;
