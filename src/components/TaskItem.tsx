import React, { useState, useEffect } from "react";
import { Task } from "../types/task.ts";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "../services/api";
import TaskModal from "./TaskModal";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [updateTask, { isSuccess: isUpdated }] = useUpdateTaskMutation();
  const [deleteTask, { isSuccess: isDeleted }] = useDeleteTaskMutation();
  const { refetch } = useGetTasksQuery({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isUpdated || isDeleted) {
      refetch();
    }
  }, [isUpdated, isDeleted, refetch]);

  const handleCheckboxChange = async () => {
    try {
      await updateTask({
        id: task.id,
        isCompleted: !task.isCompleted,
      }).unwrap();
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="div2">
      <li>
        <p>{task.title}</p>
        <fieldset>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleCheckboxChange}
          />
          <label>{task.isCompleted ? "Completed" : "Active"}</label>
        </fieldset>
        <div className="task-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </li>

      {isEditing && (
        <TaskModal task={task} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default TaskItem;
