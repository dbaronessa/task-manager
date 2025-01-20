import "../assets/styles/TaskPanel.css";
import { Task } from "../types/task.ts";
import React from "react";
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => { // Убрали второй аргумент
    return (
        <div className="wrapper">
            <ul>
                <h2>Task list</h2>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
