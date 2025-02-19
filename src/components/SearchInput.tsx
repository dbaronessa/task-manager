import React, { useState } from "react";

interface SearchInputProps {
  onChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onChange(query);
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
