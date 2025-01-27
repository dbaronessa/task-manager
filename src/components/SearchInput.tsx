
import React from "react";

interface SearchInputProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search tasks"
                value={searchQuery}
                onChange={onSearchChange}
            />
        </div>
    );
};

export default SearchInput;
