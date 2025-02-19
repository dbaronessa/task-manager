import "../assets/styles/TaskPanel.css";
import { useState } from "react";
import { useCreateTaskMutation, useGetTasksQuery } from "../services/api"; // ✅ Import RTK Query mutation
import TaskList from "./TaskList.tsx";
import FilterDropdown from "./FilterDropDown.tsx";
import SortDropdown from "./SortDropDown.tsx";
import SearchInput from "./SearchInput.tsx";
import TaskModal from "./TaskModal.tsx";

function TaskPanel() {
  const [title, setTitle] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort, setSort] = useState<"name" | "date">("date");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState(null);

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const { refetch } = useGetTasksQuery({ filter, sort, searchQuery });

  const handleAddTask = async () => {
    if (title.trim()) {
      try {
        await createTask({ title }).unwrap();
        setTitle("");
        refetch();
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
      }
    }
  };

  return (
    <>
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />

      <div className="drop-down">
        <FilterDropdown
          onChange={(filter: string) =>
            setFilter(filter as "all" | "active" | "completed")
          }
        />
        <SortDropdown
          onChange={(sort: string) => setSort(sort as "name" | "date")}
        />

        <SearchInput onChange={setSearchQuery} />
      </div>

      <div className="wrapper">
        <div className="input-div">
          <h2>Add Task</h2>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAddTask} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Task"}
          </button>
        </div>

        <div>
          <TaskList filter={filter} sort={sort} searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
}

export default TaskPanel;
