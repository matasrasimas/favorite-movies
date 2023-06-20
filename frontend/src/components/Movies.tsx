import React, {useState, useEffect, useContext} from 'react';
import {Movie as MovieType} from '../types/Movie';
import {AuthContext} from '../App';
import axios from 'axios';
import {User as UserType} from '../types/User';
import Movie from './Movie';
import Navbar from './Navbar';
import ConfirmationModal from './ConfirmationModal';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Movies = () => {


    const [movies, setMovies] = useState<MovieType[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const [movieToDelete, setMovieToDelete] = useState<MovieType | null>(movies[0]);

    const {loggedUser} = useContext(AuthContext) as {
      loggedUser: UserType | null;
      setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    };

    useEffect(() => {

        if(!loggedUser) {
          return; // Do not execute the rest of the code if loggedUser is null
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/movies/user/${loggedUser.id}`);
                setMovies(response.data);
            } catch(error) {
                console.log('There was an error when fetching data', error);
            }
        };

        fetchData();
    }, [loggedUser])


    const onDelete = (movie: MovieType) => {
      setMovieToDelete(movie);
    }

    const onConfirm = async(id: number): Promise<void> => {

      try {
        const response = await axios.delete(`http://localhost:3000/movies/${id}`);

        if(response.status === 200) {
          // Remove movie from the state
          setMovies(movies.filter(movie => movie.id !== id));
          setMovieToDelete(null);
          console.log('Movie delete successfully.');
        } else {
          console.log('Failed to delete the movie');
        }

      } catch(error) {
        console.error('An error occured while deleting the movie: ', error);
      }

    }

    const filteredMovies: MovieType[] = movies.filter((movie) =>
       movie.name.toLowerCase().includes(searchQuery.toLowerCase()));

    
    // disable scrolling and tab navigation when confirmation modal is active
    if (movieToDelete) {
      document.body.style.overflow = 'hidden';
      document.body.tabIndex = -1;
      document.addEventListener('keydown', preventTab);
    } else {
      document.body.style.overflow = '';
      document.body.tabIndex = 0;
      document.removeEventListener('keydown', preventTab);
    }
    
    function preventTab(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        e.preventDefault();
      }
    }

    return (
    <>

      <Navbar/>

      <div className='main-movies-cnt'>
        <header className='primary-header'>
            List of your favorite movies:
        </header>

        <div className='main-movies-cnt-options'>
            
              <div className="search-cnt">
                <input
                  type="text"
                  placeholder='Search...'
                  maxLength={30}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
              </div>            

            <div className="add-movie-cnt">
                <Link to='/movies/create' className='add-movie-btn'>Add movie</Link>
            </div>

        </div>

        {movies.length > 0 &&

        <div className="main-movies-cnt-items">
          {filteredMovies.map((movie, index) => {

            return <Movie
                      key={index} 
                      movie={movie}
                      onDelete={onDelete}/>
          })}
        </div>
        
        }

      </div>

      {movieToDelete && (
        <ConfirmationModal
          message={`Are you sure want to delete movie: ${movieToDelete.name}?`}
          onConfirm={() => onConfirm(movieToDelete.id)}
          onCancel={() => setMovieToDelete(null)}
          
        />
      )}

    </>);
}

export default Movies;