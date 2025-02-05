import { useAppDispatch, useAppSelector } from "../store/store.ts";
import {
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTaskTitle,
  setFilter,
  setSort,
  setSearchQuery,
  openModal,
  closeModal,
  selectTasks,
  selectFilter,
  selectSort,
  selectSearchQuery,
  selectIsModalOpen,
  selectSelectedTask,
  fetchTasks,
} from "../store/slices/taskSlice";
import { Task, Filter, Sort } from "../store/slices/taskSlice";
import { useEffect } from "react";

const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const filter = useAppSelector(selectFilter);
  const sort = useAppSelector(selectSort);
  const searchQuery = useAppSelector(selectSearchQuery);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const selectedTask = useAppSelector(selectSelectedTask);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Фильтрация задач
  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isCompleted);
  } else if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isCompleted);
  }

  // Сортировка задач
  if (sort === "name") {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sort === "date") {
    filteredTasks = [...filteredTasks].sort((a, b) => a.id - b.id);
  }

  // Поиск по задачам
  if (searchQuery.trim() !== "") {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return {
    tasks: filteredTasks,
    addTask: (title: string) => dispatch(addTask(title)),
    deleteTask: (id: number) => dispatch(deleteTask(id)),
    updateTaskStatus: (id: number) => dispatch(updateTaskStatus(id)),
    updateTaskTitle: (id: number, title: string) =>
      dispatch(updateTaskTitle({ id, title })),
    setFilter: (filter: Filter) => dispatch(setFilter(filter)),
    setSort: (sort: Sort) => dispatch(setSort(sort)),
    searchQuery,
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    isModalOpen,
    selectedTask,
    openModal: (task: Task) => dispatch(openModal(task)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default useTasks;
