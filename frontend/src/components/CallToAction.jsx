import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CallToAction.css';

const CallToAction = () => {
    return (
        <div className="cta">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Mental Health Journey?</h2>
                    <p className="cta-description">
                        Join thousands of users who are taking control of their mental wellbeing with FeelSync.
                        Sign up today and get access to all our premium features free for 30 days.
                    </p>
                    <div className="cta-buttons">
                        <button className="btn cta-btn-primary">
                            Sign Up Now
                        </button>
                        <button className="btn cta-btn-secondary">
                            Learn More <ArrowRight className="btn-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;