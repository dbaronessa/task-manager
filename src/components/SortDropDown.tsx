
import React from "react";
import { Sort } from "../hooks/useTasks";
import "../assets/styles/TaskPanel.css";

interface SortDropdownProps {
    sort: Sort;
    onSortChange: (newSort: Sort) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sort, onSortChange }) => {
    return (
        <div>
            <label htmlFor="task-sort">Sort tasks: </label>
            <select
                id="task-sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as Sort)}
            >
                <option value="name">By Name</option>
                <option value="date">By Date</option>
            </select>
        </div>
    );
};

export default SortDropdown;
