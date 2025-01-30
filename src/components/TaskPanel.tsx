import "../assets/styles/TaskPanel.css";
import { useState } from "react";
import { useAppDispatch } from "../store/store.ts";
import {
    addTask,
} from "../store/slices/taskSlice";
import TaskList from "./TaskList.tsx";
import FilterDropdown from "./FilterDropDown.tsx";
import SortDropdown from "./SortDropDown.tsx";
import SearchInput from "./SearchInput.tsx";
import TaskModal from "./TaskModal.tsx";


function TaskPanel() {
    const dispatch = useAppDispatch();


    const [title, setTitle] = useState<string>("");

    const addTaskButton = () => {
        if (title.trim()) {
            dispatch(addTask(title));
            setTitle("");
        }
    };


    return (
        <>
            <TaskModal />

            <div className="drop-down">
                <FilterDropdown />
                <SortDropdown  />
                <SearchInput />
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
                    <TaskList />
                </div>
            </div>
        </>
    );
}

export default TaskPanel;
