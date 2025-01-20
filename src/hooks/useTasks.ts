import { useState } from "react";
import { Task } from "../types/task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
      const newTask: Task = {
       id: Date.now(),
       title,
       isCompleted: false,
      };

      setTasks((prevTasks) =>  [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    deleteTask,
  }
};

export default useTasks;
