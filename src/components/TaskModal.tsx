import React, { useState, useEffect } from "react";
import { Task } from "../types/task";
import { useUpdateTaskMutation, useGetTasksQuery } from "../services/api";

const TaskModal: React.FC<{ task: Task | null; onClose: () => void }> = ({
  task,
  onClose,
}) => {
  const [updateTask, { isSuccess: isUpdated }] = useUpdateTaskMutation();
  const { refetch } = useGetTasksQuery({});
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    if (task) {
      setNewTitle(task.title);
    }
  }, [task]);

  useEffect(() => {
    if (isUpdated) {
      refetch();
      onClose();
    }
  }, [isUpdated, refetch, onClose]);

  if (!task) return null;

  const handleSave = async () => {
    if (newTitle.trim()) {
      try {
        await updateTask({ id: task.id, title: newTitle.trim() }).unwrap();
      } catch (err) {
        console.error("Ошибка при обновлении задачи:", err);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
