import React from "react";
import { selectTasks } from "../store/slices/taskSlice";
import TaskItem from "./TaskItem.tsx";
import {useAppSelector} from "../store/store.ts";

const TaskList: React.FC = () => {
    const tasks = useAppSelector(selectTasks);


    return (
        <div className="wrapper">
            <ul>
                <h2>Task list</h2>
                {tasks.length > 0 ? (
                    tasks.map((task) => <TaskItem key={task.id} task={task} />)
                ) : (
                    <p>No tasks available</p>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
