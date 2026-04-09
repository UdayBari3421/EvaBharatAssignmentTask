import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { EmptyState } from "./EmptyState";
import { RepositoryCard } from "./RepositoryCard";

export function RepositoryList({
  repos,
  sortBy,
  language,
  bookmarkedRepos,
  onBookmark,
  isLoading,
  error,
}) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!repos.length) return <EmptyState message="No repositories found for this user" />;

  let filtered = [...repos];

  if (language) {
    filtered = filtered.filter(
      (repo) => repo.language && repo.language.toLowerCase().includes(language.toLowerCase()),
    );
  }

  if (sortBy === "stars") {
    filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === "forks") {
    filtered.sort((a, b) => b.forks_count - a.forks_count);
  }

  if (!filtered.length) {
    return <EmptyState message={`No repositories found for language: ${language}`} />;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
      }}>
      {filtered.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repo={repo}
          isBookmarked={bookmarkedRepos.includes(repo.id)}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  );
}
