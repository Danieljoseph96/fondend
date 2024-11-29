import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL, ApiKey, ApiToken, movieEndpoint } from './Utils/Base';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${baseURL}/${movieEndpoint}1`, {
          headers: {
            Authorization: `Bearer ${ApiToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            api_key: ApiKey,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, []);


  const truncateDescription = (text, maxLength) => {
    if (!text) return ''; 
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mt-5">
      <h2>Movies List</h2>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card">
    
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="card-img-top" 
              />
              <div className="card-body">
        
                <h5 className="card-title">{movie.title}</h5>
                
         
                <p className="card-text">
                  {truncateDescription(movie.overview, 120)} 
                </p>

           
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
