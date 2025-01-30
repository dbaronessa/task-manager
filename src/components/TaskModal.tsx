import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { updateTaskTitle, closeModal, selectIsModalOpen, selectSelectedTask } from "../store/slices/taskSlice";

const TaskModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsModalOpen);
    const task = useAppSelector(selectSelectedTask);

    const [newTitle, setNewTitle] = useState<string>("");

    useEffect(() => {
        if (task) {
            setNewTitle(task.title);
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSave = () => {
        if (newTitle.trim()) {
            dispatch(updateTaskTitle({ id: task.id, title: newTitle.trim() }));
            dispatch(closeModal());
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
                    <button onClick={() => dispatch(closeModal())}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
