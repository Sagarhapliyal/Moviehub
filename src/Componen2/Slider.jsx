import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Slider({ movies }) {
  const [slides, setSlides] = useState(0);
 

  // Function to handle next slide
  const handleNext = () => {
    setSlides((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  // Function to handle previous slide
  const handlePrev = () => {
    setSlides((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  // Set up interval for auto-sliding
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 4000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [movies]); // Reset interval if movies change

  if (!movies || movies.length === 0) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  return (
    <div style={{ margin: "50px" }}>
      <div style={{ position: "relative", width: "1300px", overflow: "hidden" }}>
        <p onClick={handlePrev} style={{ cursor: "pointer", fontSize: "100px", position: "absolute", top: "20%", left: "20px", transform: "translateY(-50%)", color: "white", zIndex: 1 }}>{"<"}</p>
        <Link to={`/movie/${movies[slides].id}`}>
          <img
            style={{ height: "500px", width: "1300px", display: "block" }}
            src={`https://image.tmdb.org/t/p/original/${movies[slides].backdrop_path}`}
            alt={movies[slides].title}
          />
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", padding: "10px", zIndex: 1 }}>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{movies[slides].original_title}</p>
          <p>Release Date: {movies[slides].release_date}</p>
          <p>{movies[slides].overview.slice(0, 100)}...</p>
        </div>
        <p onClick={handleNext} style={{ cursor: "pointer", fontSize: "100px", position: "absolute", top: "20%", right: "20px", transform: "translateY(-50%)", color: "white", zIndex: 1 }}>{">"}</p>
      </div>
    </div>
  );
}

export default Slider;
