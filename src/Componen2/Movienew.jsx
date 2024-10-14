import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Movienew() {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${category}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
        const result = await fetch(url);
        const data = await result.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchMovies();
  }, [category]);

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h2>{category.replace('_', ' ')} Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', height: '300px' }}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movienew;
