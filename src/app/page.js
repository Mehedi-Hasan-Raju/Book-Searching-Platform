
// 'use client'

// import { useState } from 'react';
// import styles from './page.module.css';

// export default function Home() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const searchBooks = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
//       );
      
//       if (!response.ok) throw new Error('Failed to fetch results');
      
//       const data = await response.json();
//       setResults(data.docs || []);
//     } catch (err) {
//       setError(err.message);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Book Search</h1>
      
//       <form onSubmit={searchBooks} className={styles.searchForm}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for books..."
//           className={styles.searchInput}
//         />
//         <button 
//           type="submit" 
//           className={styles.searchButton}
//           disabled={loading}
//         >
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </form>

//       {error && <p className={styles.error}>Error: {error}</p>}

//       {results.length > 0 ? (
//         <div className={styles.resultsGrid}>
//           {results.map((book) => (
//             <div key={book.key} className={styles.bookCard}>
//               <h2>{book.title}</h2>
//               <p className={styles.author}>
//                 {book.author_name?.join(', ') || 'Unknown Author'}
//               </p>
//               {book.first_publish_year && (
//                 <p className={styles.publishYear}>
//                   First published: {book.first_publish_year}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && !error && <p className={styles.noResults}>No books found. Try another search!</p>
//       )}
//     </div>
//   );
// }


// app/page.js

// app/page.js
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
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
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

  const handleReadBook = (bookKey) => {
    window.open(`https://openlibrary.org${bookKey}`, '_blank');
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
              {book.cover_i ? (
                <img 
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className={styles.bookCover}
                  loading="lazy"
                />
              ) : (
                <div className={styles.bookCoverPlaceholder}>
                  No Cover Available
                </div>
              )}
              
              <div className={styles.bookInfo}>
                <h2>{book.title}</h2>
                <p className={styles.author}>
                  {book.author_name?.join(', ') || 'Unknown Author'}
                </p>
                {book.first_publish_year && (
                  <p className={styles.publishYear}>
                    {book.first_publish_year}
                  </p>
                )}
              </div>

              <button 
                onClick={() => handleReadBook(book.key)}
                className={styles.readButton}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p className={styles.noResults}>No books found. Try another search!</p>
      )}
    </div>
  );
}