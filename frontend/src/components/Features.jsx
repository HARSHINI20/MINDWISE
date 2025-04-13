import React from 'react';
import { BarChart2, Calendar, Clock, MessageCircle, Shield, Smartphone, Zap, Award } from 'lucide-react';
import './Features.css';

const Features = () => {
    return (
        <div className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Key Features</h2>
                    <div className="divider"></div>
                    <p className="section-subtitle">
                        FeelSync offers a comprehensive suite of tools to help you monitor and improve your mental wellbeing.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <Calendar className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Daily Mood Tracking</h3>
                        <p className="feature-description">Record your emotions and energy levels throughout the day with our intuitive interface.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <BarChart2 className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Advanced Analytics</h3>
                        <p className="feature-description">Visualize trends and patterns in your mental health data with interactive charts and graphs.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <MessageCircle className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Guided Journaling</h3>
                        <p className="feature-description">Express your thoughts with prompts designed by mental health professionals.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <Clock className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Habit Tracking</h3>
                        <p className="feature-description">Monitor daily habits that impact your mental health, from sleep to exercise.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <Zap className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Personalized Insights</h3>
                        <p className="feature-description">Receive tailored recommendations based on your unique mental health patterns.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <Shield className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Privacy Protection</h3>
                        <p className="feature-description">Your data is encrypted and secure, with granular privacy controls.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <Smartphone className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Mobile Access</h3>
                        <p className="feature-description">Track your mental health on the go with our responsive web application.</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-container">
                            <Award className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Achievement System</h3>
                        <p className="feature-description">Stay motivated with rewards for consistent mental health tracking and improvement.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;