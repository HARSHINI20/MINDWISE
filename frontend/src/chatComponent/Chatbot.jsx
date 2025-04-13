import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Chatbot.css';
import 'react-calendar/dist/Calendar.css';
import run from './gemini';
import axios from 'axios';

const Chatbot = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [date, setDate] = useState(new Date());
    const [summaries, setSummaries] = useState([]);

    // Fetch last 3 days of summaries from MongoDB
    useEffect(() => {
        if (userId) {
            axios.get(`http://127.0.0.1:3001/summary/${userId}`)
                .then(response => {
                    setSummaries(response.data);
                })
                .catch(error => {
                    console.error('Error fetching summary:', error);
                });
        }
    }, [userId]);

    const handleSendMessage = async () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            setMessages([...messages, newMessage]);

            try {
                const botResponse = await run(input);
                let formattedResponse = botResponse.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*/g, '<br/>');
                const botMessage = { text: formattedResponse, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error fetching response:', error);
                setMessages((prevMessages) => [...prevMessages, { text: 'Error getting response from the API.', sender: 'bot' }]);
            }

            setInput('');
        }
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="chatbot-main">
            <div className="chatbot-container">
                <div className="chat-area">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
                        ))}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                    <div className="info-text">
                        <p>Welcome to the chat! Feel free to ask me anything.</p>
                    </div>
                </div>
                <div className="calendar-area">
                    <h3>Activity Calendar</h3>
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        tileClassName={({ date, view }) => view === 'month' && date.getDate() % 5 === 0 ? 'active' : null}
                    />
                </div>
            </div>

            {/* Display last 3 days summaries under chatbot */}
            <div className="summary-area">
                <h3>📖 Your Diary (Last 3 Days)</h3>
                <div className="summaries">
                    {summaries.length > 0 ? (
                        summaries.map((item, index) => (
                            <div key={index} className="summary-card">
                                <h4>{item.userId.name}</h4>
                                <p><small>{new Date(item.date).toLocaleString()}</small></p>
                                <p>{item.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No recent diary entries found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;