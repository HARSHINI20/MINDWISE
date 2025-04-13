import { User, UserCircle, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import "./Helpdesk.css";

const MenHelpDesk = () => {
    const problems = [
        { id: 1, problem: "Social Isolation", solution: "Engage in social activities, join support groups." },
        { id: 2, problem: "Lack of Work-Life Balance", solution: "Set work boundaries, prioritize self-care." },
        { id: 3, problem: "Emotional Suppression", solution: "Talk to a therapist, journal emotions, practice mindfulness." },
        { id: 4, problem: "Financial Pressure", solution: "Budget smartly, seek financial advice, explore side incomes." },
        { id: 5, problem: "Toxic Masculinity", solution: "Embrace vulnerability, redefine strength with emotional well-being." },
    ];

    const [hoveredSolution, setHoveredSolution] = useState("");

    return (
        <div className="help-desk-container">
            <div className="image-container">
                <motion.div
                    className="icon-box"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <User size={50} color="#1565c0" />
                </motion.div>
            </div>
            <div className="problems-container">
                <h2>Men's Mental Health Issues</h2>
                <ul>
                    {problems.map((item) => (
                        <li
                            key={item.id}
                            className="problem-item"
                            onMouseEnter={() => setHoveredSolution(item.solution)}
                            onMouseLeave={() => setHoveredSolution("")}
                        >
                            {item.problem}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="solutions-container">
                {hoveredSolution ? <p className="solution-text">{hoveredSolution}</p> : <p>Hover over a problem to see solutions</p>}
            </div>
        </div>
    );
};

export default MenHelpDesk;