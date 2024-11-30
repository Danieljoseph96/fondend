import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseURL, ApiKey, ApiToken } from './Utils/Base';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // effect for auto loading movie details when component mounts or when id changes
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

  // Function to format release date
  const formatReleaseDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const maxStars = 10; // Assuming vote_average is out of 10
    const filledStars = Math.round(rating / 2); // Star rating out of 5 stars
    const emptyStars = 5 - filledStars;
    return (
      <>
        {'★'.repeat(filledStars)}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  // Determine the background color based on the rating
  const getBackgroundColor = (rating) => {
    if (rating >= 7) return 'bg-success'; // Green for high ratings
    if (rating >= 4) return 'bg-warning'; // Yellow for medium ratings
    return 'bg-danger'; // Red for low ratings
  };

  return (
    <div className={`min-vh-100 d-flex flex-column ${getBackgroundColor(movie.vote_average)}`}>
      {/* Full screen container */}
      <div className="container mt-5">
        <h1 className="text-center text-white">{movie.title}</h1>
        <div className="row">
          {/* Movie Poster */}
          <div className="col-md-4 mb-3">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="img-fluid"
            />
          </div>

          {/* Movie Details */}
          <div className="col-md-8 mb-3 p-4 text-white">
            <p><strong>Release Date:</strong> {formatReleaseDate(movie.release_date)}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p>
              <strong>Rating:</strong> {renderStars(movie.vote_average)} ({movie.vote_average}/10)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
