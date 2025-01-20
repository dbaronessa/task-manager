import { useState } from "react";
import "../assets/styles/ThemeToggleButton.css";

const ThemeToggleButton = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleThemeChange = () => setIsDarkTheme(!isDarkTheme);

    return (
        <div className={`theme-container ${isDarkTheme ? "dark" : "light"}`}>
            <div
                className={`theme-toggle-button ${isDarkTheme ? "dark" : "light"}`}
                onClick={handleThemeChange}
            >
                <div className="slider">{isDarkTheme ? "" : ""}</div>
            </div>
        </div>
    );
};

export default ThemeToggleButton;
