export function TaskFilter({ onFilterChange }) {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
      <select id="filter" className="scrumboard-task-filter" onChange={handleChange}>
        <option value="all">All Tasks</option>
        <option value="frontend">Frontend Tasks</option>
        <option value="backend">Backend Tasks</option>
        <option value="ux">UX Tasks</option>
        <option value="member">Team Members Tasks</option>
      </select>
  );
}