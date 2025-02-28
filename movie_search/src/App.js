import React, { useState } from "react";
import "./MovieSearchApp.css";

const MovieSearchApp = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    if (!query) return;
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=6e78f7fd`);

    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  return (
    <div className="movie-search-container">
      <h1 className="title">Movie Search App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchMovies}>🔍 Search</button>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <h3>{movie.Title} ({movie.Year})</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearchApp;
