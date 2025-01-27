import { Task } from "../types/task.ts";
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    updateTaskStatus: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, updateTaskStatus }) => {
    return (
        <div className="wrapper">
            <ul>
                <h2>Task list</h2>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
