
'use client'

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch results');
      
      const data = await response.json();
      setResults(data.docs || []);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Search</h1>
      
      <form onSubmit={searchBooks} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className={styles.searchInput}
        />
        <button 
          type="submit" 
          className={styles.searchButton}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className={styles.error}>Error: {error}</p>}

      {results.length > 0 ? (
        <div className={styles.resultsGrid}>
          {results.map((book) => (
            <div key={book.key} className={styles.bookCard}>
              <h2>{book.title}</h2>
              <p className={styles.author}>
                {book.author_name?.join(', ') || 'Unknown Author'}
              </p>
              {book.first_publish_year && (
                <p className={styles.publishYear}>
                  First published: {book.first_publish_year}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p className={styles.noResults}>No books found. Try another search!</p>
      )}
    </div>
  );
}