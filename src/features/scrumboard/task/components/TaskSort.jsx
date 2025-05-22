export function TaskSort({ onSortChange }) {
  const handleChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <select className="scrumboard-task-sort" onChange={handleChange}>      
      <option value="timestamp-desc">Created (new - old)</option>
      <option value="timestamp-asc">Created (old - new)</option>
      <option value="title-asc">Title (A - Z)</option>
      <option value="title-desc">Title (Z - A)</option>
    </select>
  );
}