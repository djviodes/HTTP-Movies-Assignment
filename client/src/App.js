import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import AddMovie from './Movies/AddMovie';
import MovieForm from './Movies/MovieForm';
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [update, setUpdate] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [update]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} update={update} setUpdate={setUpdate} />
      </Route>

      <Route path='/update-movie/:id'>
        <MovieForm setMovieList={setMovieList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
