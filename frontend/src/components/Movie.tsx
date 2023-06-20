import React from 'react';
import defaultImg from '../assets/default-movie.jpg';
import {Movie as MovieType} from '../types/Movie';

interface MovieProps {
    movie: MovieType;
    onDelete: (movie: MovieType) => void;
}

const Movie: React.FC<MovieProps> = ({movie, onDelete}) => {

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = defaultImg;
    }

    return (
        <div className="movie-cnt">
            <div className="movie-cnt-hdr">
                <img src={movie.img_url} alt={movie.name} onError={handleImageError} />
                <h3>{movie.name}</h3>
            </div>

            <div className="movie-cnt-descr">
                <p>{movie.description}</p>
            </div>

            <div className="movie-cnt-del-btn">
                <button onClick={() => onDelete(movie)}>Delete</button>
            </div>

        </div>
    );
}

export default Movie;