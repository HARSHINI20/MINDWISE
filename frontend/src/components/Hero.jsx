import React from 'react';
import { Heart, BarChart2, Calendar, Shield } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Monitor Your Mental Wellbeing with <span className="highlight">FeelSync</span>
                    </h1>
                    <p className="hero-subtitle">
                        Track, analyze, and improve your mental health with our comprehensive tools and personalized insights.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">
                            Get Started
                        </button>
                        <button className="btn btn-secondary">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="feature-cards">
                    <div className="feature-card">
                        <div className="feature-icon-container">
                            <Heart className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Mood Tracking</h3>
                        <p className="feature-description">Record your daily emotions and identify patterns over time.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-container">
                            <BarChart2 className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Insightful Analytics</h3>
                        <p className="feature-description">Visualize your mental health data with easy-to-understand charts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-container">
                            <Calendar className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Daily Journal</h3>
                        <p className="feature-description">Document your thoughts and experiences in a secure digital journal.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-container">
                            <Shield className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Privacy First</h3>
                        <p className="feature-description">Your mental health data is encrypted and completely private.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;