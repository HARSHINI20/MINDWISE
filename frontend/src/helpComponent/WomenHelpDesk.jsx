import React, { useState } from "react";
import "./Helpdesk.css";

const WomenHelpDesk = () => {
  const problems = [
    { id: 1, problem: "Self-Esteem Issues", solution: "Practice self-love, follow body positivity influencers." },
    { id: 2, problem: "Workplace Discrimination", solution: "Know your rights, join women empowerment groups." },
    { id: 3, problem: "Family & Marriage Pressure", solution: "Communicate with family, focus on personal goals." },
    { id: 4, problem: "Fear of Safety & Harassment", solution: "Learn self-defense, use safety apps, seek legal support." },
    { id: 5, problem: "Balancing Career & Family", solution: "Prioritize tasks, seek flexible work options." },
  ];

  const [hoveredSolution, setHoveredSolution] = useState("");

  return (
    <div className="help-desk-container">
      <div className="image-container">
        <img src="/female_animated.gif" alt="Female Animation" />
      </div>
      <div className="problems-container">
        <h2>Women's Mental Health Issues</h2>
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

export default WomenHelpDesk;