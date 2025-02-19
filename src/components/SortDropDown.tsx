import React from "react";

interface SortDropdownProps {
  onChange: (sort: "name" | "date") => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as "name" | "date");
  };

  return (
    <div>
      <label htmlFor="task-sort">Sort tasks: </label>
      <select id="task-sort" onChange={handleSortChange}>
        <option value="name">By Name</option>
        <option value="date">By Date</option>
      </select>
    </div>
  );
};

export default SortDropdown;
