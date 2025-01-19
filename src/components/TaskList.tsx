import "../assets/styles/TaskPanel.css"
import {Task} from "../types/task.ts";
import React from "react";
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({tasks}: TaskListProps)=> {

    return (
        <div className="wrapper">
            <h1>Task list</h1>
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}

            </ul>
        </div>
    );
}

export default TaskList;

//кнопка добавить, сортировка (все, выполненные, не выполненные), фильтрация по названию задачи)
