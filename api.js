const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

export const getMovies = () => request('/movies');
export const createMovie = (data) => request('/movies', { method: 'POST', body: JSON.stringify(data) });
export const updateMovie = (id, data) => request(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMovie = (id) => request(`/movies/${id}`, { method: 'DELETE' });
