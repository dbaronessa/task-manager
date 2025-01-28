import { Task } from "../types/task.ts";
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    updateTaskStatus: (id: number) => void;
    onTaskClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
                                               tasks,
                                               deleteTask,
                                               updateTaskStatus,
                                               onTaskClick,
                                           }) => {
    return (
        <div className="wrapper">
            <ul>
                <h2>Task list</h2>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        updateTaskStatus={updateTaskStatus}
                        onTaskClick={onTaskClick}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
