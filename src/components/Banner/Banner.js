import React, { useEffect, useState } from "react";
import instance from "../../axios";
import "./Banner.css";

function Banner({ fetchURL }) {
  const [movieHeader, setMovieHeader] = useState([]);
  useEffect(() => {
    const getHeaderMovie = async () => {
      const response = await instance.get(fetchURL);
      let randNumber = Math.floor(
        Math.random() * response.data.results.length - 1
      );
      console.log(response.data.results[randNumber]);
      setMovieHeader(response.data.results[randNumber]);
    };
    getHeaderMovie();
  }, [fetchURL]);

  //console.log(movieHeader);

  function truncate(str, n) {
    if (!str) {
      return;
    }
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            'https://image.tmdb.org/t/p/original/${movieHeader.backdrop_path}'
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          ({movieHeader.title || movieHeader.name || movieHeader.original_name})
        </h1>
        {/*Two Buttons (play and mylist) */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/*description */}
        <h1 className="banner__description">
          {truncate(movieHeader.overview, 100)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
