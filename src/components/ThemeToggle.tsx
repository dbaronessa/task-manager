
import { useContext } from "react";
import "../assets/styles/TaskPanel.css";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggleButton = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }

    const { theme, toggleTheme } = context;

    return (
        <div className={`theme-container ${theme}`}>
            <div
                className={`theme-toggle-button ${theme}`}
                onClick={toggleTheme}
            >
                <div className="slider">{theme === 'dark' ? "" : ""}</div>
            </div>
        </div>
    );
};

export default ThemeToggleButton;
