import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { setFilter, selectFilter, Filter } from "../store/slices/taskSlice";

const FilterDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectFilter);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter(event.target.value as Filter));
    };

    return (
        <div>
            <label htmlFor="task-filter">Filter tasks: </label>
            <select id="task-filter" value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default FilterDropdown;
