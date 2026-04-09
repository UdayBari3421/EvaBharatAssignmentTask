import { useState, useEffect } from "react";
import { useDebounce, useLocalStorage } from "./hooks";
import { searchUsers, getUserRepos } from "./api";
import { Header, UserSearchSection, UserDetailSection } from "./components";

export default function App() {
  // Theme Management
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPage, setUserPage] = useState(1);
  const [searchError, setSearchError] = useState("");

  // Repository State
  const [repos, setRepos] = useState([]);
  const [sortBy, setSortBy] = useState("stars");
  const [language, setLanguage] = useState("");
  const [reposPage, setReposPage] = useState(1);
  const [reposError, setReposError] = useState("");

  // UI State
  const [loading, setLoading] = useState(false);
  const [bookmarkedRepos, setBookmarkedRepos] = useLocalStorage("bookmarks", []);

  const debouncedQuery = useDebounce(searchQuery, 400);

  // Set theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Search users effect
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([]);
      setSearchError("");
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setSearchError("");
      try {
        const data = await searchUsers(debouncedQuery, userPage);
        setUsers(data.items || []);
        if (!data.items?.length) {
          setSearchError("No users found");
        }
      } catch (err) {
        setSearchError("Failed to search users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, userPage]);

  // Fetch repos effect
  useEffect(() => {
    if (!selectedUser) {
      setRepos([]);
      return;
    }

    const fetchRepos = async () => {
      setLoading(true);
      setReposError("");
      try {
        const data = await getUserRepos(selectedUser.login, sortBy, reposPage);
        setRepos(data || []);
      } catch (err) {
        setReposError("Failed to load repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [selectedUser, sortBy, reposPage]);

  // Handlers
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setReposPage(1);
  };

  const handleBackToSearch = () => {
    setSelectedUser(null);
    setRepos([]);
    setSearchQuery("");
    setReposPage(1);
  };

  const handleBookmark = (repoId) => {
    setBookmarkedRepos((prev) =>
      prev.includes(repoId) ? prev.filter((id) => id !== repoId) : [...prev, repoId],
    );
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setReposPage(1);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setReposPage(1);
  };

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "var(--bg)", transition: "var(--transition)" }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        header {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 20px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
      `}</style>

      <Header
        theme={theme}
        onThemeToggle={handleThemeToggle}
        selectedUser={selectedUser}
        onBack={handleBackToSearch}
      />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px" }}>
        {!selectedUser ? (
          <UserSearchSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            language={language}
            onLanguageChange={handleLanguageChange}
            users={users}
            selectedUser={selectedUser}
            onUserSelect={handleSelectUser}
            loading={loading}
            error={searchError}
            debouncedQuery={debouncedQuery}
            currentPage={userPage}
            onPageChange={setUserPage}
          />
        ) : (
          <UserDetailSection
            selectedUser={selectedUser}
            repos={repos}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            language={language}
            onLanguageChange={handleLanguageChange}
            bookmarkedRepos={bookmarkedRepos}
            onBookmark={handleBookmark}
            loading={loading}
            error={reposError}
            currentPage={reposPage}
            onPageChange={setReposPage}
          />
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "32px 16px",
          borderTop: "1px solid var(--border)",
          color: "var(--text-secondary)",
          fontSize: "14px",
          marginTop: "40px",
        }}>
        <p>Built with React & GitHub API. Bookmarked repos are saved locally.</p>
      </footer>
    </div>
  );
}
