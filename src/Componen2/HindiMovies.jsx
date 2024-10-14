import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "./Slider";

function HindiMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  async function fetchMovies(endpoint, setState) {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&with_original_language=hi&region=IN&sort_by=${endpoint}.desc`;
      const result = await fetch(url);

      if (!result.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await result.json();
      setState(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchMovies("popularity", setPopularMovies);
    fetchMovies("vote_average", setTrendingMovies);
    fetchMovies("release_date", setUpcomingMovies);
  }, []);

  const MovieSection = ({ title, movies }) => {
    const scrollRef = useRef(null);

    const handleMouseDown = (e) => {
      scrollRef.current.isDown = true;
      scrollRef.current.startX = e.pageX - scrollRef.current.offsetLeft;
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
      scrollRef.current.isDown = false;
    };

    const handleMouseUp = () => {
      scrollRef.current.isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!scrollRef.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - scrollRef.current.startX) * 2; // Adjust the scroll speed
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - walk;
    };

    return (
      <div style={{ marginBottom: "40px" }}>
        <h2>{title}</h2>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "hidden",
            cursor: "grab",
            paddingBottom: "20px",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
          className="movie-section"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              style={{
                minWidth: "200px",
                scrollSnapAlign: "start",
              }}
            >
              <Link to={`/movie/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                  style={{ width: "200px", height: "300px" }}
                />
              </Link>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <Slider movies={popularMovies} />
      <MovieSection title="Popular Movies" movies={popularMovies} />
      <MovieSection title="Trending Movies" movies={trendingMovies} />
      <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  );
}

export default HindiMovies;
