import "../assets/styles/TaskPanel.css"
import {Task} from "../types/task.ts";
import React from "react";

interface TaskItemProps {
    task: Task;
    deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, deleteTask}) => {

    console.log(task.id);

    return (
        <div className="div2">
            <li>
                    <h2>{task.title}</h2>
                    <fieldset>
                        <div>
                            <input
                                type="checkbox"
                                id="coding"
                                name="interest"
                                value="coding"
                            />
                            <label>{task.isCompleted}</label>
                        </div>
                    </fieldset>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>

        </div>
);
}

export default TaskItem;

//кнопка добавить, сортировка (все, выполненные, не выполненные), фильтрация по названию задачи)
