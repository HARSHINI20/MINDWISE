import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Helpdesk from './helpComponent/Helpdesk';
import Login from './secondContent/Login';
import Register from './secondContent/Registration'
import Chatbot from './chatComponent/Chatbot';
import SMMonitoring from './smComponent/SMMonitoring'
import Profile from './profileComponent/Profile'

function App() {
    const [user, setUser] = useState(null);

    return (
            <Router>
                <div className="main">
                    <Navbar user={user} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/smm" element={<SMMonitoring />} />
                        <Route path="/helpdesk" element={<Helpdesk />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register setUser={setUser} />} />
                    </Routes>
                </div>
            </Router>
    );
}

export default App;
