import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  async function Fetchfunction() {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    );
    const data = await result.json();
    setMovies(data.results);
    setFilteredMovies(data.results);
  }
  // const url = "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&region=IN";


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
      <div style={{ color: "white" }}>
        <h1>Upcoming Movies</h1>
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

export default Upcoming;
