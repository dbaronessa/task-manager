import "../assets/styles/App.css";
import TaskPanel from "./TaskPanel.tsx";
import ThemeToggleButton from "./ThemeToggle.tsx";
import "../assets/styles/ThemeToggleButton.css"

function App() {
  return (
      <>
          <div className="theme-container">
              <ThemeToggleButton/>
      <TaskPanel />

          </div>
      </>
  );


}

export default App;
