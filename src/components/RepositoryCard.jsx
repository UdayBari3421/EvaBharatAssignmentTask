export function RepositoryCard({ repo, isBookmarked, onBookmark }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "16px",
        transition: "var(--transition)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "12px",
        }}>
        <div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--primary)",
            }}>
            {repo.name}
          </a>
          {repo.fork && (
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                padding: "2px 6px",
                backgroundColor: "var(--bg)",
                borderRadius: "4px",
                color: "var(--text-secondary)",
              }}>
              Forked
            </span>
          )}
        </div>
        <button
          onClick={() => onBookmark(repo.id)}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            padding: "4px",
          }}>
          {isBookmarked ? "⭐" : "☆"}
        </button>
      </div>

      {repo.description && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "12px",
            lineHeight: "1.5",
          }}>
          {repo.description.substring(0, 120)}
          {repo.description.length > 120 ? "..." : ""}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "12px",
          fontSize: "12px",
        }}>
        {repo.language && (
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "var(--primary)",
              color: "white",
              borderRadius: "4px",
            }}>
            {repo.language}
          </span>
        )}
        {repo.topics &&
          repo.topics.slice(0, 2).map((topic) => (
            <span
              key={topic}
              style={{
                padding: "4px 8px",
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-secondary)",
              }}>
              {topic}
            </span>
          ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          fontSize: "13px",
          color: "var(--text-secondary)",
          borderTop: "1px solid var(--border)",
          paddingTop: "12px",
        }}>
        <span>⭐ {repo.stargazers_count}</span>
        <span>🔀 {repo.forks_count}</span>
        <span>👁️ {repo.watchers_count}</span>
      </div>
    </div>
  );
}
