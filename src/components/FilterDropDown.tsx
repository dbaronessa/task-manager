
import React from "react";
import { Filter } from "../hooks/useTasks";

interface FilterDropdownProps {
    filter: Filter;
    onFilterChange: (newFilter: Filter) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filter, onFilterChange }) => {
    return (
        <div>
            <label htmlFor="task-filter">Filter tasks: </label>
            <select
                id="task-filter"
                value={filter}
                onChange={(e) => onFilterChange(e.target.value as Filter)}
            >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default FilterDropdown;
