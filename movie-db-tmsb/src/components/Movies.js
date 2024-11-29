import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/movies') // Replace with your API URL
      .then(response => setMovies(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Movies List</h2>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={movie.poster} alt={movie.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <Link to={`/movies/${movie.id}`} className="btn btn-primary">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
