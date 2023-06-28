import React, {useState, useEffect, useRef, useContext} from 'react';
import {AuthContext} from '../App';
import Navbar from './Navbar';
import axios from 'axios';
import {Movie as MovieType} from '../types/Movie';
import {User as UserType} from '../types/User';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CreateMovie = () => {

    const {action, id} = useParams();

    const {loggedUser} = useContext(AuthContext) as {
      loggedUser: UserType | null;
      setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    };

    const navigate = useNavigate();


    const [movies, setMovies] = useState<MovieType[]>([]);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imgURL, setImgURL] = useState<string>('');

    const [nameError, setNameError] = useState<string | null>(null);
    const [imgURLError, setImgURLError] = useState<string | null>(null);

    const [mainError, setMainError] = useState<string | null>(null);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLInputElement | null>(null);
    const imgURLRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
      const fetchData = async() => {
        
        if(!loggedUser) {
          return; // Do not execute the rest of the code if loggedUser is null
        }

        
        if(action === 'update' && id !== undefined && !isNaN(+id)) { // Check, if id, passed through URL, is a valid number
          const response = await axios.get(`http://localhost:3000/movies/${id}`);
          if(response.data) {
            setName(response.data.name);
            setDescription(response.data.description);
            setImgURL(response.data.img_url);
          } 
          else navigate('/not-found');
        }
        else if(action !== 'create' || id !== undefined) {
          navigate('/not-found');
        }


        try {
          const response = await axios.get(`http://localhost:3000/movies/user/${loggedUser.id}`);
          setMovies(response.data);
        } catch(error) {
          console.log('Error fetching data: ', error);
        }
      }

      fetchData();
    }, [loggedUser])


    const validateName = () => {
       let errorFound = false;

       if(name.length < 3) {
         errorFound = true;
         setNameError('Name must contain at least 3 characters!');
       }

       else if(action === 'create' && movies.find((movie) => movie.name.toLowerCase() === name.toLowerCase())) {
         errorFound = true;
         setNameError('Movie with this name already exsits in your list!');
       }

       if(errorFound) {
         nameRef.current && nameRef.current.classList.add('is-invalid');
         return false;
       }

       setNameError(null);
       nameRef.current && nameRef.current.classList.remove('is-invalid');
       return true;
    }

    const validateImgURL = () => {

       const imgURLRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

       if(imgURL.length !== 0 && !imgURLRegex.test(imgURL)) {
          setImgURLError('Invalid image URL address!');
          imgURLRef.current && imgURLRef.current.classList.add('is-invalid');
          return false;
       }

       setImgURLError(null);
       imgURLRef.current && imgURLRef.current.classList.remove('is-invalid');
       return true;
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let errorFound = false;

        if(!validateName()) errorFound = true;
        if(!validateImgURL()) errorFound = true;

        if(!errorFound) {

          if(!loggedUser) {
            throw new Error('loggedUser is null');
          }

           const movie = {
              name: name,
              description: description,
              img_url: imgURL,
              user_id: loggedUser.id,
           };

           try {
            const response = action === 'update' ?
             await axios.put(`http://localhost:3000/movies/${id}`, movie) :
             await axios.post('http://localhost:3000/movies', movie);

            if(response.status === 201 || response.status === 200) {
              console.log('Movie added successfully!');
              setMainError(null);
              navigate('/movies');
            } else {
              console.log('Error adding movie.');
              setMainError('Error adding movie. Please try again.');
            }

           } catch(error) {
              console.log('Error adding movie: ', error);
              setMainError('Error adding movie. Please try again.');
           }

        } else {
          setMainError('Please fill all fields correctly!');
        }
        
    }

    return (
    <>

    <Navbar/>

      <div className="main-form-cnt light">
        <div className="form-cnt light">
          <header>
            <h1>
              {action === 'create' ? 'Add movie' : 'Edit movie'}
            </h1>
            <Link to='/movies' className="go-back-cnt">
              <FontAwesomeIcon icon={faArrowLeft} className='go-back-cnt-icon'/>
              <span className='go-back-cnt-txt'>Go back</span>
            </Link>
          </header>

          {mainError && (
          <div className='error-msg-cnt'>
            <p>{mainError}</p>
          </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="inputs-cnt">

                <div className="inputs-cnt-item light">
                    <h3 className='input-label'>Name:</h3>
                    <div className="input-text-cnt">
                        <input
                        type="text"
                        className=''
                        maxLength={50}
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        ref={nameRef}
                        />
                    </div>
                    {nameError && <p className='error-text'>{nameError}</p>}
                </div>

                <div className="inputs-cnt-item light">
                    <h3 className='input-label'>Description (optional):</h3>
                    <div className="input-text-cnt">
                        <input
                        type="text"
                        className=''
                        maxLength={150}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ref={descriptionRef}
                        />
                    </div>
                </div>

                <div className="inputs-cnt-item light">
                    <h3 className='input-label'>Image URL (optional):</h3>
                    <div className="input-text-cnt">
                        <input
                        type="text"
                        className=''
                        maxLength={200}
                        value={imgURL}
                        onChange={(e) => setImgURL(e.target.value)}
                        ref={imgURLRef}
                        />
                    </div>
                    {imgURLError && <p className='error-text'>{imgURLError}</p>}
                </div>

                <div className="login-btn-cnt light">
                    <button>{action === 'update' ? 'Update' : 'Add'}</button>
                </div>

            </div>

          </form>

        </div>

      </div>
    </>
    );
}

export default CreateMovie;