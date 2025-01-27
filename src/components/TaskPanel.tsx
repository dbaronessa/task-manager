import useTasks, { Filter, Sort } from "../hooks/useTasks.ts";
import "../assets/styles/TaskPanel.css";
import { useState } from "react";
import TaskList from "./TaskList.tsx";
import FilterDropdown from "./FilterDropDown.tsx";
import SortDropdown from "./SortDropDown.tsx";
import SearchInput from "./SearchInput.tsx";

function TaskPanel() {
    const { addTask, deleteTask, updateTaskStatus, filterTask, sortTasks, searchQuery, setSearchQuery, searchTasks } = useTasks();
    const [title, setTitle] = useState<string>("");
    const [filter, setFilter] = useState<Filter>("all");
    const [sort, setSort] = useState<Sort>("name");

    const addTaskButton = () => {
        if (title.trim()) {
            addTask(title);
            setTitle("");
        }
    };

    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter);
    };

    const handleSortChange = (newSort: Sort) => {
        setSort(newSort);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };


    const filteredTasks = filterTask(filter);

    const sortedTasks = sortTasks(sort, filteredTasks);

    const searchedTasks = searchTasks(searchQuery, sortedTasks);

    return (
        <>
            <div className="drop-down">
            <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
            <SortDropdown sort={sort} onSortChange={handleSortChange} />
            <SearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            </div>
            <div className="wrapper">
                <div className="input-div">
                    <h2>Add Task</h2>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={addTaskButton}>Add Task</button>
                </div>


                <div>
                    <TaskList tasks={searchedTasks} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} />
                </div>
            </div>
        </>
    );
}

export default TaskPanel;
