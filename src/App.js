import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com?apikey=b80859b4`;

function App() {

  const [movies, setmovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setmovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {
        movies.length > 0 ?
          (
            <div className="container">
              {
                movies.map((movie, idex) => (<MovieCard key={idex} movie={movie} />))
              }
            </div>
          )
          :
          (
            <div className="empty">
              <h2> No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;
