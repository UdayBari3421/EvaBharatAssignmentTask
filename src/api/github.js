const API_BASE = 'https://api.github.com';

export const searchUsers = async (query, page = 1) => {
    const response = await fetch(
        `${API_BASE}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=12`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!response.ok) throw new Error('API Error');
    return response.json();
};

export const getUserRepos = async (username, sort = 'stars', page = 1) => {
    const response = await fetch(
        `${API_BASE}/users/${username}/repos?sort=${sort}&order=desc&page=${page}&per_page=12`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!response.ok) throw new Error('Failed to fetch repos');
    return response.json();
};

export const getUser = async (username) => {
    const response = await fetch(`${API_BASE}/users/${username}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!response.ok) throw new Error('User not found');
    return response.json();
};
