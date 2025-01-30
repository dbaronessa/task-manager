import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { setSort, selectSort } from "../store/slices/taskSlice";
import { Sort } from "../store/slices/taskSlice";
import "../assets/styles/TaskPanel.css";

const SortDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(selectSort);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSort(event.target.value as Sort));
    };

    return (
        <div>
            <label htmlFor="task-sort">Sort tasks: </label>
            <select id="task-sort" value={sort} onChange={handleSortChange}>
                <option value="name">By Name</option>
                <option value="date">By Date</option>
            </select>
        </div>
    );
};

export default SortDropdown;
