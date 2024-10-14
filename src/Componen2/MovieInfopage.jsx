import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

function MovieInfopage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchMovie();
    fetchTrailers();
    fetchRecommendations();
  }, [id]);

  async function fetchMovie() {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await result.json();
      console.log("Movie Data:", data); // Logging movie data
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  async function fetchTrailers() {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await result.json();
      console.log("Trailers Data:", data); // Logging trailers data
      setTrailers(data.results);
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  }

  async function fetchRecommendations() {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
      );
      const data = await result.json();
      console.log("Recommendations Data:", data); // Logging recommendations data
      setRecommendations(data.results);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-container">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        style={{ height: '400px', width: "600px", marginLeft: "300px" }}
      />
      <h1>{movie.title}</h1>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
      <h2>Trailers</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {trailers
          .filter(trailer => trailer.site === "YouTube" && trailer.type === "Trailer")
          .map(trailer => (
            <div key={trailer.id}>
              <h3>{trailer.name}</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
      <h2>Recommended Movies</h2>
      <div className="recommendations-container">
        {recommendations.map(recMovie => (
          <div key={recMovie.id} className="recommendation">
            <img
              className="recommendation-poster"
              src={`https://image.tmdb.org/t/p/original/${recMovie.poster_path}`}
              alt={recMovie.title}
            />
            <p>{recMovie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieInfopage;
