import React, { useEffect } from "react";
import TaskItem from "./TaskItem.tsx";
import { useGetTasksQuery } from "../services/api";

interface TaskListProps {
  filter: "all" | "active" | "completed";
  sort: "name" | "date";
  searchQuery: string;
}

const TaskList: React.FC<TaskListProps> = ({ filter, sort, searchQuery }) => {
  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useGetTasksQuery({ filter, sort, searchQuery });

  useEffect(() => {
    refetch();
  }, [filter, sort, searchQuery, refetch]);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Failed to load tasks.</p>;
  if (!tasks || tasks.length === 0) return <p>No tasks available</p>;

  return (
    <div className="wrapper">
      <ul>
        <h2>Task List</h2>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
