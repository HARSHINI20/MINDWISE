import React, { useState } from "react";
import axios from "axios";
import "./SMMonitoring.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const SMMonitoring = () => {
    const [username, setUsername] = useState("");
    const [redditData, setRedditData] = useState(null);
    const [sentimentData, setSentimentData] = useState([]);

    const fetchRedditData = async () => {
        if (!username.trim()) {
            alert("Please enter a Reddit username");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/reddit-user-info", { username });
            setRedditData(response.data);

            // Generate Sentiment Data for Graph
            const graphData = [
                ...response.data.recent_posts.map((post, index) => ({
                    name: `Post ${index + 1}`,
                    sentiment: post.sentiment === "Positive 😊" ? 1 : post.sentiment === "Negative 😞" ? -1 : 0
                })),
                ...response.data.recent_comments.map((comment, index) => ({
                    name: `Comment ${index + 1}`,
                    sentiment: comment.sentiment === "Positive 😊" ? 1 : comment.sentiment === "Negative 😞" ? -1 : 0
                }))
            ];

            setSentimentData(graphData);
        } catch (error) {
            console.error("Error fetching Reddit data:", error);
        }
    };

    return (
        <div className="monitoring-container">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter Reddit username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={fetchRedditData}>Search</button>
            </div>

            {/* Content Display */}
            {redditData && (
                <div className="content-container">
                    {/* Left Section: User Info + Posts */}
                    <div className="left-section">
                        {/* User Information */}
                        <div className="section user-info">
                            <h3>User Information</h3>
                            <p><strong>Username:</strong> {redditData.user_info.username}</p>
                            <p><strong>Post Karma:</strong> {redditData.user_info.post_karma}</p>
                            <p><strong>Comment Karma:</strong> {redditData.user_info.comment_karma}</p>
                        </div>

                        {/* Recent Posts */}
                        <div className="section posts">
                            <h3>Recent Posts</h3>
                            {redditData.recent_posts.slice(0, 5).map((post, index) => (
                                <div key={index} className="content-card">
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>
                                    <p><strong>Subreddit:</strong> {post.subreddit}</p>
                                    <p><strong>Sentiment:</strong> {post.sentiment}</p>
                                    <p><strong>Upvotes:</strong> {post.upvotes}</p>
                                </div>
                            ))}
                        </div>
                        {/* Mental Health Recommendations */}
                        {redditData.recommendation && (
                            <div className="section recommendation-section">
                                <h3>🧠 Mental Health Recommendations</h3>
                                <div className="recommendation-content">
                                    {redditData.recommendation.split("\n").map((rec, index) => (
                                        index >= 0 && rec.trim() !== "" ? (
                                            <p key={index}><strong>{rec.replace(/\*/g, '')}</strong></p>
                                        ) : null
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Section: Comments */}
                    <div className="right-section">
                        {/* Recent Comments */}
                        <div className="section comments">
                            <h3>Recent Comments</h3>
                            {redditData.recent_comments.slice(0, 5).map((comment, index) => (
                                <div key={index} className="content-card">
                                    <p>{comment.content}</p>
                                    <p><strong>Subreddit:</strong> {comment.subreddit}</p>
                                    <p><strong>Sentiment:</strong> {comment.sentiment}</p>
                                    <p><strong>Upvotes:</strong> {comment.upvotes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Sentiment Graph */}
            {redditData && sentimentData.length > 0 && (
                <div className="sentiment-graph-section">
                    <h3>📊 Sentiment Analysis Over Time</h3>
                    <p>This graph represents the sentiment trends based on the user's recent posts and comments.</p>

                    <ResponsiveContainer width="80%" height={300}>
                        <LineChart data={sentimentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[-1, 1]} tickFormatter={(tick) => tick === 1 ? "Positive" : tick === -1 ? "Negative" : "Neutral"} />
                            <Tooltip />
                            <Line type="monotone" dataKey="sentiment" stroke="#1e90ff" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default SMMonitoring;
