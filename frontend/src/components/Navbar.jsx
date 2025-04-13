import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-logo">
                        <Brain className="logo-icon" />
                        <span className="logo-text">FeelSync</span>
                    </div>

                    {/* Desktop menu */}
                    <div className="desktop-menu">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/chatbot" className="nav-link">Chat Bot</Link>
                        <Link to="/smm" className="nav-link">SM Monitoring</Link>
                        <Link to="/helpdesk" className="nav-link">Help Desk</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        {user ? (
                            <div className="user-avatar">{user.name.charAt(0)}</div>
                        ) : (
                            <Link to="/login" className="sign-in-btn">Sign In</Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="mobile-menu-btn">
                        <button
                            onClick={toggleMenu}
                            className="menu-toggle"
                        >
                            {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-links">
                        <Link to="/" className="mobile-nav-link">Home</Link>
                        <Link to="/chatbot" className="mobile-nav-link">Chat Bot</Link>
                        <Link to="/smm" className="mobile-nav-link">SM Monitoring</Link>
                        <Link to="/helpdesk" className="mobile-nav-link">Help Desk</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        {user ? (
                            <div className="user-avatar">{user.name.charAt(0)}</div>
                        ) : (
                            <Link to="/login" className="mobile-sign-in-btn">Sign In</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;