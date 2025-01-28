import React, { useState, useEffect } from "react";
import { Task } from "../types/task.ts";

interface TaskModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: number, newTitle: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave }) => {
    const [newTitle, setNewTitle] = useState<string>("");

    useEffect(() => {
        if (task) {
            setNewTitle(task.title);
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSave = () => {
        if (newTitle.trim()) {
            onSave(task.id, newTitle.trim());
            onClose();
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
                    placeholder="Enter new task title"
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
