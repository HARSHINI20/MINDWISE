import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Balasubramanian',
            role: 'Teacher',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            quote: 'FeelSync has helped me understand my anxiety triggers and develop healthier coping mechanisms. The mood tracking feature is incredibly intuitive.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Arun Vijay ',
            role: 'Software Engineer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            quote: 'As someone who struggles with work-related stress, FeelSync has been a game-changer. The analytics help me see how my mental health correlates with my work schedule.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Arunpranav',
            role: 'Healthcare Worker',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            quote: 'The guided journaling prompts have helped me process difficult emotions after long shifts. I appreciate how the app reminds me to check in with myself.',
            rating: 4,
        },
    ];

    return (
        <div className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">What Our Users Say</h2>
                    <div className="divider"></div>
                    <p className="section-subtitle">
                        Hear from people who have improved their mental wellbeing with FeelSync.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <img
                                    // src={testimonial.image}
                                    alt={testimonial.name}
                                    className="testimonial-image"
                                />
                                <div className="testimonial-author">
                                    <h4 className="author-name">{testimonial.name}</h4>
                                    <p className="author-role">{testimonial.role}</p>
                                </div>
                            </div>

                            <p className="testimonial-quote">"{testimonial.quote}"</p>

                            <div className="testimonial-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`star ${i < testimonial.rating ? 'star-filled' : 'star-empty'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="testimonials-cta">
                    <button className="btn btn-primary">
                        Read More Success Stories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;