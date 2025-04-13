import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', {
                name,
                email,
                password
            });
            if (response.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            } else {
                alert("Registered successfully! Please Login to proceed.");
                setUser({ name: name.charAt(0).toUpperCase() });
                navigate('/');
            }
        } catch (error) {
            console.error('Registration error', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className='mb-3 text-primary'>{'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group text-start">
                        <label>Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn bt-primary">Register</button>
                </form>
                <p className='container my-2'>Already have an account?</p>
                <Link to='/login' className="btn bt-secondary">Login</Link>
            </div>
        </div>
    );
};

export default Register;
