import React from "react";
import { Task } from "../types/task.ts";
import { deleteTask, updateTaskStatus, openModal } from "../store/slices/taskSlice";
import {useAppDispatch} from "../store/store.ts";

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const dispatch = useAppDispatch();

    const handleCheckboxChange = () => {
        dispatch(updateTaskStatus(task.id));
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const handleEdit = () => {
        dispatch(openModal(task));
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
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </li>
        </div>
    );
};

export default TaskItem;
