import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseURL, ApiKey, ApiToken } from './Utils/Base';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
//effect  auto laoding
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${ApiToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            api_key: ApiKey,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="img-fluid" />
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetail;
