import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL, ApiKey, ApiToken, movieEndpoint } from './Utils/Base';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/${movieEndpoint}${currentPage}`, {
          headers: {
            Authorization: `Bearer ${ApiToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            api_key: ApiKey,
          },
        });
        const shuffledMovies = shuffleArray(response.data.results); 
        setMovies(shuffledMovies); 
        setTotalPages(response.data.total_pages);
        console.log(shuffledMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);


  useEffect(() => {
    const fetchMovieDetails = async (id) => {
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
        setMovieDetails((prevDetails) => ({
          ...prevDetails,
          [id]: response.data,
        }));
      } catch (error) {
        console.error(`Error fetching details for movie ${id}:`, error);
      }
    };


    movies.forEach((movie) => {
      if (!movieDetails[movie.id]) {
        fetchMovieDetails(movie.id);
      }
    });

  }, [movies]);


  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="container mt-5">
      <h2>Random Movies List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {movies.map((movie) => {
            console.log('Movie ID:', movie.id);

            const details = movieDetails[movie.id];

            return (
              <div key={movie.id} className="col-md-2 mb-3">
                <div className="card">
                  {details ? (
                    <div>
                      <h3>{details.title}</h3>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        alt={details.title}
                        className="card-img-top"
                      />
                      <p>
                        <strong>Release Date:</strong> {details.release_date}
                      </p>
                      <p>
                        <strong>Rating:</strong> {details.vote_average}
                      </p>
                      <p>
                        <strong>Runtime:</strong> {details.runtime} minutes
                      </p>
                    </div>
                  ) : (
                    <p>Loading details...</p>
                  )}
                  <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

   
      <div className="pagination-controls mt-4">
        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
