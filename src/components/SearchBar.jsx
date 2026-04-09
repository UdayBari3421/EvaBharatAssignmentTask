export function SearchBar({ value, onChange, onSort, onLanguageChange, sortBy, language }) {
  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        padding: "20px",
        borderRadius: "var(--radius)",
        marginBottom: "24px",
        border: "1px solid var(--border)",
      }}>
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", marginBottom: "12px" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
        }}>
        <select value={sortBy} onChange={(e) => onSort(e.target.value)}>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
          <option value="updated">Sort by Updated</option>
        </select>

        <input
          type="text"
          placeholder="Filter by language..."
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        />
      </div>
    </div>
  );
}
