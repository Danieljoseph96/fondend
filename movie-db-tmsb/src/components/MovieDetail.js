import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams('3ede23ebc7b9ad9f3cf926dde4525327');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.example.com/movies/${id}`) 
      .then(response => setMovie(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={movie.title} className="img-fluid" />
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetail;
