import useTasks from "../hooks/useTasks.ts";
import "../assets/styles/TaskPanel.css";
import { useState } from "react";
import TaskList from "./TaskList.tsx";

function TaskPanel() {
    const { addTask, tasks, deleteTask } = useTasks();
    const [title, setTitle] = useState<string>("");

    const addTaskButton = () => {
        if (title.trim()) {
            addTask(title);
            setTitle("");
        }
    };

    return (
        <div className="wrapper">
            <div className="input-div">
                <h2>Add Task</h2>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={addTaskButton}>Add Task</button>
            </div>
            <div>
                <TaskList tasks={tasks} deleteTask={deleteTask} />
            </div>
        </div>
    );
}

export default TaskPanel;
