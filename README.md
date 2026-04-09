# 🔍 GitHub Explorer

A modern React.js application for searching GitHub users and exploring their repositories with filtering, sorting, and bookmarking features. Built with a scalable component-based architecture.

## ✨ Features

- **Search GitHub Users** - Debounced search (400ms) with automatic API call optimization
- **Browse Repositories** - Click any user to see their repositories with detailed stats
- **Bookmark Repos** - Save favorite repositories locally (persists across sessions)
- **Smart Filtering** - Sort by Stars, Forks, or Updated date
- **Language Filter** - Filter repositories by programming language
- **Theme Toggle** - Switch between dark/light modes (preference saved)
- **Pagination** - Browse results with 12 items per page
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Real-time Stats** - Display stars, forks, and watchers for each repo

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:5174/ (or next available port)

# Build for production
npm run build

# Run linter
npm run lint
```

## 📁 Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── Header.jsx         # App header with theme toggle & back button
│   ├── UserSearchSection.jsx # Search interface with user results
│   ├── UserDetailSection.jsx # User profile & repositories display
│   ├── SearchBar.jsx      # Search input & filter controls
│   ├── UserCard.jsx       # Individual user profile card
│   ├── RepositoryCard.jsx # Individual repository card
│   ├── RepositoryList.jsx # Repository list container
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── ErrorMessage.jsx   # Error alert component
│   ├── EmptyState.jsx     # Empty state message
│   └── index.js           # Barrel export for components
│
├── hooks/                  # Custom React hooks
│   ├── useDebounce.js     # Debounce hook for search optimization
│   ├── useLocalStorage.js # Local storage state persistence
│   └── index.js           # Barrel export for hooks
│
├── api/                    # API service layer
│   ├── github.js          # GitHub API functions
│   └── index.js           # Barrel export for API
│
├── App.jsx                # Main app component (190 lines, clean & maintainable)
├── main.jsx               # React DOM entry point
├── index.css              # Global styles & CSS variables
└── utils/                 # Utility functions (reserved for future use)
```

## 🏗️ Architecture Overview

### Component Hierarchy

```
App (Main component)
├── Header
│   ├── Theme toggle button
│   └── Back to search button (conditional)
├── main
│   ├── UserSearchSection (when no user selected)
│   │   ├── SearchBar
│   │   ├── User grid
│   │   │   └── UserCard (x12 per page)
│   │   └── Pagination
│   │
│   └── UserDetailSection (when user selected)
│       ├── User profile card
│       ├── Sort & filter controls
│       ├── RepositoryList
│       │   └── RepositoryCard (x12 per page)
│       └── Pagination
│
└── Footer
```

### State Organization

**App.jsx** manages three state groups for clarity:

```javascript
// Theme Management
const [theme, setTheme] = useLocalStorage("theme", "light");

// Search State (users, pagination, errors)
const [searchQuery, setSearchQuery] = useState("");
const [users, setUsers] = useState([]);
const [userPage, setUserPage] = useState(1);
const [searchError, setSearchError] = useState("");

// Repository State (repos, filters, pagination, errors)
const [repos, setRepos] = useState([]);
const [sortBy, setSortBy] = useState("stars");
const [language, setLanguage] = useState("");
const [reposPage, setReposPage] = useState(1);

// UI State (loading, bookmarks)
const [loading, setLoading] = useState(false);
const [bookmarkedRepos, setBookmarkedRepos] = useLocalStorage("bookmarks", []);
```

### Data Flow

1. **User Types** → `searchQuery` state → debounced (400ms)
2. **Debounced Query** → triggers `searchUsers()` API effect
3. **API Response** → populates `users` array
4. **User Clicks Card** → `setSelectedUser()` → triggers `getUserRepos()` effect
5. **Repo Data** → filters & sorts → displayed in `RepositoryList`
6. **Bookmark Click** → saves to localStorage via `useLocalStorage` hook

## 🎯 How It Works

### Search Flow
1. Type a GitHub username in the search bar
2. Input is debounced by 400ms to reduce API calls
3. `searchUsers()` fetches matching users from GitHub API
4. Results display as clickable user cards with avatars and scores
5. Use pagination to browse through results (12 per page)

### Browse Repositories
1. Click any user card to view their profile and repositories
2. See user avatar, login, and link to their GitHub profile
3. Repositories display with:
   - Name and link to repo on GitHub
   - Description (truncated at 120 chars)
   - Primary programming language
   - Topic tags
   - Stars, forks, and watchers count
   - Fork indicator

### Filtering & Sorting
1. **Sort Options** - Stars (↓), Forks (↓), Updated (↓)
2. **Language Filter** - Type language name to filter (e.g., "JavaScript", "Python")
3. Filters reset when switching between views or changing filters

### Bookmarking
1. Click **☆** (empty star) to bookmark a repository
2. Star changes to **⭐** (filled) when bookmarked
3. Bookmarks persist in browser localStorage
4. Survive page refreshes and browser restarts

### Theme Toggle
1. Click **🌙** in header to switch to dark mode
2. Click **☀️** to switch back to light mode
3. Theme preference saved in localStorage

## 🔧 Key Technologies

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 8** | Fast build tool & dev server |
| **GitHub API v3** | User & repository data source |
| **localStorage** | Persistent data storage |
| **ES6+ Hooks** | State management & custom logic |
| **CSS Variables** | Dynamic theming |

## 📝 API Endpoints Used

```javascript
GET https://api.github.com/search/users
  Query: username, page limit 12/page

GET https://api.github.com/users/{username}/repos
  Query: sort (stars/forks/updated), page, limit 12/page

GET https://api.github.com/users/{username}
  Get user profile details
```

## 🎨 Styling

- **CSS Variables** for theme switching:
  - `--bg` - Background color
  - `--text` - Primary text
  - `--primary` - Accent color (blue)
  - `--border` - Border color
  - `--shadow-lg` - Large shadow
  - `--radius` - Border radius
  - `--transition` - Smooth transitions

- **Dark Mode** - Inverted colors for comfortable viewing
- **Light Mode** - Clean, bright interface
- **Responsive Grid** - Adapts to screen size

## 🔄 Component Communication

All props flow from parent (`App.jsx`) to children:
- Search/filter state passed as props
- Change handlers passed as callbacks
- Clean, predictable data flow
- Easy to debug and extend

## 💾 Local Storage Usage

```javascript
// Saved theme preference
localStorage.setItem("theme", "light" | "dark")

// Saved bookmarked repository IDs
localStorage.setItem("bookmarks", [id1, id2, ...])
```

## 🐛 Error Handling

- **Search Errors** - "No users found" or "Failed to search users"
- **Repository Errors** - "Failed to load repositories"
- **Network Errors** - Graceful fallback with error messages
- **Empty States** - "Start typing to search for users"

## 📱 Responsive Breakpoints

- **Mobile** - Single column, touch-friendly buttons
- **Tablet** - 2-3 column grid
- **Desktop** - Full 4-column repository grid

## ✅ Code Quality

- **Component-based** - Reusable, testable components
- **Clean Architecture** - Separation of concerns (components, hooks, api)
- **Well-documented** - Clear comments and structure
- **Performance Optimized** - Debounced search, lazy rendering
- **Maintainable** - Easy to add features or modify

## 🚀 Development Workflow

1. **Hot Module Replacement** - Changes auto-reload in browser
2. **Fast Refresh** - Component state preserved during edits
3. **ESLint** - Code quality checking
4. **Simple Structure** - Easy to navigate and modify

## 📚 Extending the App

**Add a new component:**
```javascript
// Create MyComponent.jsx in components/
// Add to components/index.js for barrel export
// Import and use in App.jsx or parent component
```

**Add a new hook:**
```javascript
// Create useMyHook.js in hooks/
// Add to hooks/index.js for barrel export
// Import and use in components
```

**Add more API calls:**
```javascript
// Add function to api/github.js
// Export from api/index.js
// Use in App.jsx or component effects
```

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify GitHub API rate limits (60 req/hour unauthenticated)
3. Ensure proper network connection
4. Clear localStorage if data seems stale

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React & GitHub API**
