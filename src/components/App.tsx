// App.tsx
import TaskPanel from "./TaskPanel.tsx";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggleButton from "./ThemeToggle.tsx"; // Импортируем ThemeProvider

function App() {
    return (
        <ThemeProvider>
            <div className="theme-container">
                <ThemeToggleButton/>
                <TaskPanel/>
            </div>
        </ThemeProvider>
    );
}

export default App;
