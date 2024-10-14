import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';

function English() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  async function fetchMovies(endpoint, setState) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
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
    fetchMovies('popular', setPopularMovies);
    fetchMovies('top_rated', setTrendingMovies);
    fetchMovies('upcoming', setUpcomingMovies);
  }, []);

  const MovieSection = ({ title, movies, category }) => {
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
      <div style={{ marginBottom: '40px' }}>
        <h2>
          <Link to={`/movies/${category}`} style={{ color: 'white' }}>
            {title}
          </Link>
        </h2>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'hidden',
            cursor: 'grab',
            paddingBottom: '20px',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
          className="movie-section"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              style={{
                minWidth: '200px',
                scrollSnapAlign: 'start',
              }}
            >
              <Link to={`/movie/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                  style={{ width: '200px', height: '300px' }}
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
    <div style={{ backgroundColor: 'black' }}>
      <div style={{ color: 'white', padding: '20px' }}>
        <Slider movies={popularMovies} />
        <MovieSection title="Popular Movies" movies={popularMovies} category="popular" />
        <MovieSection title="Trending Movies" movies={trendingMovies} category="top_rated" />
        <MovieSection title="Upcoming Movies" movies={upcomingMovies} category="upcoming" />
      </div>
    </div>
  );
}

export default English;
