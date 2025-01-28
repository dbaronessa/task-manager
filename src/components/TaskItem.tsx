import React from "react";
import { Task } from "../types/task.ts";

interface TaskItemProps {
    task: Task;
    deleteTask: (id: number) => void;
    updateTaskStatus: (id: number) => void;
    onTaskClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
                                               task,
                                               deleteTask,
                                               updateTaskStatus,
                                               onTaskClick,
                                           }) => {
    const handleCheckboxChange = () => {
        updateTaskStatus(task.id);
    };

    return (
        <div className="div2" onClick={() => onTaskClick(task)}>
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
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                    }}
                >
                    Delete
                </button>
            </li>
        </div>
    );
};

export default TaskItem;
