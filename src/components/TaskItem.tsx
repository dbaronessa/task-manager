import React from "react";
import { Task } from "../types/task.ts";

interface TaskItemProps {
    task: Task;
    deleteTask: (id: number) => void;
    updateTaskStatus: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTaskStatus }) => {

    const handleCheckboxChange = () => {
        updateTaskStatus(task.id);
    };

    return (
        <div className="div2">
            <li>
                <p>{task.title}</p>
                <fieldset>
                    <div>
                        <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={handleCheckboxChange}
                        />
                        <label>{task.isCompleted ? "Completed" : "Active"}</label>
                    </div>
                </fieldset>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
        </div>
    );
};

export default TaskItem;
