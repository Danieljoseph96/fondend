import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
