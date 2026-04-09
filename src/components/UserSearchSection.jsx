import { UserCard } from "./UserCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { EmptyState } from "./EmptyState";

export function UserSearchSection({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  language,
  onLanguageChange,
  users,
  selectedUser,
  onUserSelect,
  loading,
  error,
  debouncedQuery,
  currentPage,
  onPageChange,
}) {
  return (
    <>
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
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: "100%", marginBottom: "12px" }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
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

      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && users.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "12px",
              marginBottom: "24px",
            }}>
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={onUserSelect}
                isSelected={selectedUser?.id === user.id}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "24px",
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
        </>
      )}

      {!loading && !error && users.length === 0 && debouncedQuery && (
        <EmptyState message="Start typing to search for users" />
      )}
    </>
  );
}
