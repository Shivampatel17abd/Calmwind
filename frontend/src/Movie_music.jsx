import React, { useState } from "react";

//movie
const movies = [
  {
    
  }
];

//song
const songs = [
    {

    }
];

function MoviesMusic() {
  const [activeTab, setActiveTab] = useState("movies");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const movieCategories = [
    "All", "Motivation", "Emotions", "Kindness", "Self Discovery"
  ];

  const songCategories = [
    "All", "Motivation", "Relax", "Happy"
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || movie.category === category;

    return matchesSearch && matchesCategory;
  });

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || song.mood === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="soothe-media">

      <section className="media-hero">
        <span className="hero-tag">YOUR LITTLE HAPPY SPACE ✨</span>
        <h1>Find Your Happy Place</h1>
        <p>
          Sometimes all we need is a good movie or a beautiful song
          to make our day a little better.
        </p>
      </section>

      <div className="media-tabs">
        <button
          className={activeTab === "movies" ? "active" : ""}
          onClick={() => {
            setActiveTab("movies");
            setCategory("Emotions");
            setSearch("");
          }}
        >
          🎬 Movies
        </button>

        <button
          className={activeTab === "songs" ? "active" : ""}
          onClick={() => {
            setActiveTab("songs");
            setCategory("All");
            setSearch("");
          }}
        >
          🎵 Music
        </button>
      </div>

      <div className="media-content">

        <div className="media-heading">
          <div>
            <h2>
              {activeTab === "movies"
                ? "Movies for your soul"
                : "Music for your mood"}
            </h2>
            <p>
              {activeTab === "movies"
                ? "Stories that inspire, comfort and make you smile."
                : "Find a sound that matches how you feel."}
            </p>
          </div>
        </div>

        <div className="media-categories">
          {(activeTab === "movies"
            ? movieCategories
            : songCategories
          ).map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {activeTab === "movies" ? (
          <div className="media-grid">
            {filteredMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className={`media-art ${movie.color}`}>
                  <span>{movie.poster}</span>
                  <small>{movie.year}</small>
                </div>

                <div className="media-card-info">
                  <span className="media-label">
                    {movie.category}
                  </span>
                  <h3>{movie.title}</h3>
                  <p>{movie.description}</p>
                  <div className="media-card-bottom">
                    <span>⭐ {movie.rating}</span>
                    <a
                      href={`https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Explore ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="media-grid">
            {filteredSongs.map((song) => (
              <div className="song-card" key={song.id}>
                <div className={`song-art ${song.color}`}>
                  <span>{song.emoji}</span>
                </div>

                <div className="media-card-info">
                  <span className="media-label">{song.mood}</span>
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                  <div className="media-card-bottom">
                    <span>🎧 Listen</span>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + " " + song.artist)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Play ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {((activeTab === "movies" && filteredMovies.length === 0) ||
          (activeTab === "songs" && filteredSongs.length === 0)) && (
          <p className="empty-message">
            No recommendations found. Try another search!
          </p>
        )}

      </div>

      <footer className="media-footer">
        <h3>A little reminder 💜</h3>
        <p>
          Take a break, enjoy the little things, and remember
          that you deserve moments of happiness.
        </p>
      </footer>

    </div>
  );
}

export default MoviesMusic;