import TaskPanel from "./TaskPanel.tsx";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggleButton from "./ThemeToggle.tsx";
import {Provider} from "react-redux";
import {store} from "../store/store.ts"; // Импортируем ThemeProvider

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <div className="theme-container">
                    <ThemeToggleButton/>
                    <TaskPanel/>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
