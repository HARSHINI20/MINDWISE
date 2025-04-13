import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
    const date = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let name = month[date.getMonth()];
    const time = date.getDay() + " - " + name + " - " + date.getFullYear();

    const user = {
        name: "ASH",
        bio: "Focused on mental well-being and self-improvement.",
        age: 19,
        location: "Chennai, India",
        moodStatus: "Feeling Calm 😊",
        journalEntries: 15,
        mindfulnessSessions: 8,
        lastCheckIn: time,
        profilePicture: "https://i.pravatar.cc/150?img=2"
    };

    const friends = [
        { id: 1, name: "John Doe", profilePic: "https://i.pravatar.cc/150?img=5", bio: "Loves hiking and outdoor activities." },
        { id: 2, name: "Jane Smith", profilePic: "https://i.pravatar.cc/150?img=8", bio: "Avid reader and coffee enthusiast." },
        { id: 3, name: "Mike Johnson", profilePic: "https://i.pravatar.cc/150?img=4", bio: "Tech geek and gamer." }
    ];

    const [hoveredFriend, setHoveredFriend] = useState(null);

    const handleMouseEnter = (friend) => {
        setHoveredFriend(friend);
    };

    const handleMouseLeave = () => {
        setHoveredFriend(null);
    };

    const renderCalendar = () => {
        const days = Array.from({ length: 30 }, (_, i) => i + 1);
        return (
            <div className="calendar">
                {days.map(day => (
                    <div key={day} className={`calendar-day ${Math.random() > 0.5 ? 'active' : ''}`}>
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const diaryEntries = [
        "Day 1: Reflecting on my goals and aspirations.",
        "Day 2: Practiced mindfulness and stayed present.",
        "Day 3: Achieved a small milestone in my self-improvement journey."
    ];

    return (
        <div className="profile-container">
            <div className="left-section">
                <div className="profile-card">
                    <img src={user.profilePicture} alt="Profile" className="profile-pic" />
                    <h1>{user.name}</h1>
                    <p className="bio">{user.bio}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <p className="mood-status">{user.moodStatus}</p>
                </div>
                <div className="friends-section">
                    <h2>Friends</h2>
                    <div className="friends-list">
                        {friends.map(friend => (
                            <div
                                key={friend.id}
                                className="friend-card"
                                onMouseEnter={() => handleMouseEnter(friend)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img src={friend.profilePic} alt={friend.name} className="friend-pic" />
                                <span>{friend.name}</span>
                                {hoveredFriend?.id === friend.id && (
                                    <div className="friend-details">
                                        <p>{friend.bio}</p>
                                    </div>
                                )}
                                <button>View Profile</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="right-section">
                <div className="activity-section">
                    <h2>Wellness Tracker</h2>
                    <p><strong>Journal Entries:</strong> {user.journalEntries}</p>
                    <p><strong>Mindfulness Sessions:</strong> {user.mindfulnessSessions}</p>
                    <p><strong>Last Check-In:</strong> {user.lastCheckIn}</p>
                    <h2>Streak Calendar</h2>
                    {renderCalendar()}
                </div>
                <div className="diary-section">
                    <h2>Past 3 Diary Entries</h2>
                    <ul>
                        {diaryEntries.map((entry, index) => (
                            <li key={index}>{entry}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
