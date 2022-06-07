import React, { useState, useEffect } from "react";
import instance from "../../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await instance.get(fetchURL);
      //console.table(response.data.results);
      setMovies(response.data.results);
      return response;
    };
    fetchMovies();
    //console.log(movies);
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const imgClickHandler = (movie) => {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(movie.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const vidId = urlParams.get("v");
          setTrailerURL(vidId);
          console.log(vidId);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {/*row_posters*/}
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => imgClickHandler(movie)}
            />
          ))}
        </div>
        {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
