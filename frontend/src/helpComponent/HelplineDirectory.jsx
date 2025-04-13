import React, { useState } from "react";
import { User, UserCircle, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import "./Helpdesk.css";

const helplines = {
    India: "+91 1860 266 2345",
    USA: "988",
    UK: "116 123",
    Canada: "1-833-456-4566",
    Australia: "13 11 14",
};

const HelplineDirectory = () => {
    const [query, setQuery] = useState("");
    const filteredCountries = Object.keys(helplines).filter((country) =>
        country.toLowerCase().startsWith(query.toLowerCase())
    );

    return (
        <div className="helpline-container">
            <motion.div
                className="icon-box"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <PhoneCall size={50} color="#1e90ff" />
            </motion.div>
            <h2>Search for Helpline Numbers</h2>
            <input
                type="text"
                placeholder="Enter country name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {filteredCountries.map((country) => (
                    <li key={country}>
                        <strong>{country}:</strong> {helplines[country]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HelplineDirectory;