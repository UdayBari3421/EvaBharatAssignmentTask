export function UserCard({ user, onSelect, isSelected }) {
  return (
    <div
      onClick={() => onSelect(user)}
      style={{
        cursor: "pointer",
        textAlign: "center",
        padding: "16px",
        borderRadius: "var(--radius)",
        border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
        backgroundColor: isSelected ? "rgba(3, 102, 214, 0.05)" : "var(--bg-secondary)",
        transition: "var(--transition)",
        transform: "scale(0.98)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(0.98)";
        e.currentTarget.style.boxShadow = "none";
      }}>
      <img
        src={user.avatar_url}
        alt={user.login}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          marginBottom: "12px",
          border: "2px solid var(--border)",
        }}
      />
      <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "4px" }}>{user.login}</p>
      <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
        {user.score ? `Score: ${user.score.toFixed(1)}` : "GitHub User"}
      </p>
    </div>
  );
}
