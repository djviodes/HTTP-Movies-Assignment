import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const initialState = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: '',
};

const AddMovie = ({ setMovieList }) => {
    const { push } = useHistory();
    const [movieState, setMovieState] = useState(initialState);

    const handleChanges = event => {
        setMovieState({
            ...movieState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        let stars = movieState.stars.split(',')
        let movieObj = {...movieState, stars: stars}
        axios
            .post('http://localhost:5000/api/movies', movieObj)
            .then(res => {
                setMovieList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
            push('/');
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={handleChanges}
                    placeholder='Movie Title'
                    value={movieState.title}
                />

                <input 
                    type='text'
                    name='director'
                    onChange={handleChanges}
                    placeholder='Movie Director'
                    value={movieState.director}
                />

                <input 
                    type='text'
                    name='metascore'
                    onChange={handleChanges}
                    placeholder='Movie Metascore'
                    value={movieState.metascore}
                />

                <input 
                    type='text'
                    name='stars'
                    onChange={handleChanges}
                    placeholder='Actors'
                    value={movieState.stars}
                />

                <button>Add</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}

export default AddMovie;