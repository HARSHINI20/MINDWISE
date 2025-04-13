import React from 'react';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <Brain className="logo-icon" />
                            <span className="logo-text">FeelSync</span>
                        </div>
                        <p className="footer-description">
                            Empowering individuals to monitor, understand, and improve their mental wellbeing through technology.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <Facebook className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Twitter className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Instagram className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Linkedin className="social-icon" />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Home</a></li>
                            <li><a href="#" className="footer-link">Features</a></li>
                            <li><a href="#" className="footer-link">About Us</a></li>
                            <li><a href="#" className="footer-link">Testimonials</a></li>
                            <li><a href="#" className="footer-link">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Resources</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Blog</a></li>
                            <li><a href="#" className="footer-link">Mental Health Tips</a></li>
                            <li><a href="#" className="footer-link">FAQ</a></li>
                            <li><a href="#" className="footer-link">Privacy Policy</a></li>
                            <li><a href="#" className="footer-link">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Contact Us</h3>
                        <ul className="contact-info">
                            <li className="contact-item">
                                <MapPin className="contact-icon" />
                                <span className="contact-text">123 Wellness Street, Mental Health District, 10001</span>
                            </li>
                            <li className="contact-item">
                                <Phone className="contact-icon" />
                                <span className="contact-text">(123) 456-7890</span>
                            </li>
                            <li className="contact-item">
                                <Mail className="contact-icon" />
                                <span className="contact-text">support@feelsync.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} FeelSync. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;