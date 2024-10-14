import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "./Slider";

function Hero() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  async function Fetchfunction() {
    try {
      const url = "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";
      console.log("Fetching data from:", url);
      const result = await fetch(url);

      if (!result.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await result.json();
      console.log("Fetched data:", data);
      setMovies(data.results);
      setFilteredMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    Fetchfunction();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <>
      <Slider movies={movies}></Slider>

      <div style={{ color: "white" }}>
        <h1>Popular Movies</h1>
        <input
          type="search"
          placeholder="Search here"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "260px",
            height: "30px",
            marginBottom: "20px",
            marginLeft: "50px"
          }}
        />
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "80px" }}>
          {filteredMovies.map((item, id) => (
            <div className="moviediv" key={id}>
              <Link to={`/movie/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                />
              </Link>
              <p>{item.title}</p>
              <p>{item.release_date}</p>
              <p>Rating: {item.vote_average}</p>
              <p>Movie Overview: {item.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
