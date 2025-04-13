import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                password
            });
            if (response.data === "Success") {
                console.log('Login successful', response.data);
                setUser({ name: email.charAt(0).toUpperCase() });
                navigate('/');
            } else {
                alert('Incorrect password! Please try again.');
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className='mb-3 text-primary'>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group text-start">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group text-start">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn bt-primary">Login</button>
                </form>
                <p className='container my-2'>Don't have an account?</p>
                <Link to='/register' className="btn bt-secondary">Register</Link>
            </div>
        </div>
    );
};

export default Login;
