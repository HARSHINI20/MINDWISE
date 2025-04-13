import React from 'react';
import { Brain, Heart, Lightbulb, Users } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about" id="about">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About FeelSync</h2>
                    <div className="divider"></div>
                    <p className="section-subtitle">
                        FeelSync is a comprehensive mental health monitoring platform designed to help you understand and improve your emotional wellbeing.
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-image">
                        <img
                            src="../images/Homeimage.jpg"
                            alt="Person meditating"
                            className="image"
                        />
                    </div>

                    <div className="about-text">
                        <h3 className="about-subtitle">Our Mission</h3>
                        <p className="about-description">
                            At FeelSync, we believe that mental health is just as important as physical health. Our mission is to make mental health monitoring accessible, engaging, and effective for everyone.
                        </p>

                        <div className="about-features">
                            <div className="about-feature">
                                <div className="feature-icon-wrapper">
                                    <Brain className="feature-icon" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="feature-heading">Science-Based Approach</h4>
                                    <p className="feature-text">Our tools are developed based on psychological research and best practices.</p>
                                </div>
                            </div>

                            <div className="about-feature">
                                <div className="feature-icon-wrapper">
                                    <Heart className="feature-icon" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="feature-heading">Personalized Care</h4>
                                    <p className="feature-text">We provide customized insights and recommendations based on your unique data.</p>
                                </div>
                            </div>

                            <div className="about-feature">
                                <div className="feature-icon-wrapper">
                                    <Lightbulb className="feature-icon" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="feature-heading">Continuous Innovation</h4>
                                    <p className="feature-text">We're constantly improving our platform with new features and insights.</p>
                                </div>
                            </div>

                            <div className="about-feature">
                                <div className="feature-icon-wrapper">
                                    <Users className="feature-icon" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="feature-heading">Community Support</h4>
                                    <p className="feature-text">Connect with others on similar mental health journeys for mutual support.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;