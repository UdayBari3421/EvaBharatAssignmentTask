export function Header({ theme, onThemeToggle, selectedUser, onBack }) {
  return (
    <header>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>🔍 GitHub Explorer</h1>
          <button
            onClick={onThemeToggle}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              cursor: "pointer",
              fontSize: "16px",
            }}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {selectedUser && (
          <button
            onClick={onBack}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              padding: "6px 12px",
              borderRadius: "var(--radius)",
              cursor: "pointer",
                fontSize: "14px",
                color: "green"
            }}>
            ← Back to Search
          </button>
        )}
      </div>
    </header>
  );
}
