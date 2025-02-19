import { useState } from "react";

const FilterDropdown: React.FC<{ onChange: (filter: string) => void }> = ({
  onChange,
}) => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    onChange(newFilter);
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
