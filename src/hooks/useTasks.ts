import { useState } from "react";
import { Task } from "../types/task.ts";

export type Filter = 'all' | 'active' | 'completed';
export type Sort = 'name' | 'date';

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const addTask = (title: string) => {
        const newTask: Task = {
            id: Date.now(),
            title,
            isCompleted: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const updateTaskStatus = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const updateTaskTitle = (id: number, newTitle: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    const filterTask = (filter: Filter) => {
        let filteredTasks = tasks;
        switch (filter) {
            case "completed":
                filteredTasks = filteredTasks.filter((task) => task.isCompleted);
                break;
            case "active":
                filteredTasks = filteredTasks.filter((task) => !task.isCompleted);
                break;
            default:
                break;
        }
        return filteredTasks;
    };

    const sortTasks = (sort: Sort, filteredTasks: Task[]) => {
        let sortedTasks = [...filteredTasks];
        if (sort === "name") {
            sortedTasks = sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === "date") {
            sortedTasks = sortedTasks.sort((a, b) => a.id - b.id);
        }
        return sortedTasks;
    };

    const searchTasks = (query: string, filteredTasks: Task[]) => {
        return filteredTasks.filter((task) =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    };

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    return {
        tasks,
        addTask,
        deleteTask,
        updateTaskStatus,
        updateTaskTitle,
        filterTask,
        sortTasks,
        searchQuery,
        setSearchQuery,
        searchTasks,
        isModalOpen,
        selectedTask,
        openModal,
        closeModal,
    };
};

export default useTasks;
