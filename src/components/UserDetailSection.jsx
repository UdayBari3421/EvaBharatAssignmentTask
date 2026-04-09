import { RepositoryList } from "./RepositoryList";

export function UserDetailSection({
  selectedUser,
  repos,
  sortBy,
  onSortChange,
  language,
  onLanguageChange,
  bookmarkedRepos,
  onBookmark,
  loading,
  error,
  currentPage,
  onPageChange,
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "32px",
          padding: "20px",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
        }}>
        <img
          src={selectedUser.avatar_url}
          alt={selectedUser.login}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "2px solid var(--primary)",
          }}
        />
        <div>
          <h2 style={{ margin: "0 0 4px 0" }}>{selectedUser.login}</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px" }}>
            <a
              href={`https://github.com/${selectedUser.login}`}
              target="_blank"
              rel="noopener noreferrer">
              View Profile →
            </a>
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <select
          value={sortBy}
          onChange={(e) => {
            onSortChange(e.target.value);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            color: "var(--text)",
          }}>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
          <option value="updated">Sort by Updated</option>
        </select>

        <input
          type="text"
          placeholder="Filter by language..."
          value={language}
          onChange={(e) => {
            onLanguageChange(e.target.value);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            color: "var(--text)",
            flex: 1,
            minWidth: "150px",
          }}
        />
      </div>

      <RepositoryList
        repos={repos}
        sortBy={sortBy}
        language={language}
        bookmarkedRepos={bookmarkedRepos}
        onBookmark={onBookmark}
        isLoading={loading}
        error={error}
      />

      {!loading && repos.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "32px",
          }}>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              background: currentPage === 1 ? "var(--bg-secondary)" : "var(--primary)",
              color: currentPage === 1 ? "var(--text-secondary)" : "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}>
            Previous
          </button>
          <span style={{ padding: "8px 16px", color: "var(--text-secondary)" }}>
            Page {currentPage}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            style={{
              background: "var(--primary)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              cursor: "pointer",
            }}>
            Next
          </button>
        </div>
      )}
    </>
  );
}
