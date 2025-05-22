export function ScrumboardStats({ stats }) {
  return (
    <div className="home-stats">
      <h3>Current Stats:</h3>
      <p>📋 Scrum Boards: {stats.totalScrumboards}</p>
      <p>🟥 New Tasks: {stats.totalNew}</p>
      <p>🟨 Tasks In Progress: {stats.totalInProgress}</p>
      <p>🟩 Finished Tasks: {stats.totalFinished}</p>
    </div>
  );
}