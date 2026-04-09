export function EmptyState({ message = "No results found" }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        color: "var(--text-secondary)",
      }}>
      <p style={{ fontSize: "18px", marginBottom: "8px" }}>📭</p>
      <p>{message}</p>
    </div>
  );
}
