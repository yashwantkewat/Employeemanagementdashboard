import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const EmployeeFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      alert("Please fill out all fields and provide a rating.");
      return;
    }

    const newFeedback = { name, review, rating };
    setFeedbacks([...feedbacks, newFeedback]);
    setName('');
    setReview('');
    setRating(0);
    setHover(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Employee Feedback</h2>
      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <textarea 
              className="form-control" 
              placeholder="Your Feedback" 
              value={review} 
              onChange={(e) => setReview(e.target.value)} 
              rows="3" 
              required
            />
          </div>
        </div>
        {/* Star Rating */}
        <div className="mb-3">
          <label className="form-label">Rate your experience:</label>
          <div className="d-flex align-items-center">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setRating(ratingValue)} 
                    style={{ display: 'none' }} 
                  />
                  <FaStar 
                    className="star" 
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                    size={30} 
                    onMouseEnter={() => setHover(ratingValue)} 
                    onMouseLeave={() => setHover(null)} 
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit Feedback</button>
        </div>
      </form>

      {/* Display Feedbacks */}
      <h3 className="text-center">Employee Reviews</h3>
      {feedbacks.length > 0 ? (
        <div className="row">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{feedback.name}</h5>
                  <p className="card-text">{feedback.review}</p>
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((star, i) => (
                      <FaStar 
                        key={i} 
                        color={i < feedback.rating ? "#ffc107" : "#e4e5e9"} 
                        size={20} 
                      />
                    ))}
                    <span className="ms-2">{feedback.rating} / 5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No feedback available yet.</p>
      )}
    </div>
  );
};

export default EmployeeFeedback;
