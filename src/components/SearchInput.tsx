import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { setSearchQuery, selectSearchQuery } from "../store/slices/taskSlice";

const SearchInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(selectSearchQuery);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search tasks"
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchInput;
