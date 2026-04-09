import light from "../icons/light.svg";
import dark from "../icons/dark.svg";
import github from "../icons/github.svg";

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
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}>
            <img
              src={github}
              alt="GitHub"
              style={{
                width: "50px",
                height: "50px",
                marginRight: "8px",
                background: "white",
                padding: "4px",
                borderRadius: "50%",
              }}
            />
            GitHub Explorer
          </h1>
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
            <img
              src={theme === "light" ? dark : light}
              alt="Theme toggle"
              style={{ width: "20px", height: "20px" }}
            />
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
              color: "green",
            }}>
            ← Back to Search
          </button>
        )}
      </div>
    </header>
  );
}
