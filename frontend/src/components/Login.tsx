import React, {useState, useContext, useEffect, useRef} from 'react';
import {User as UserType} from '../types/User';
import {AuthContext} from '../App';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login = () => {

  const { setLoggedUser } = useContext(AuthContext) as {
    loggedUser: UserType | null;
    setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  };

  const navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem('user')) navigate('/');
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsersFromDb(response.data);
      } catch(error) {
        console.log('error fetching data: ', error);
      }
    }

    fetchData();

  }, [])


  const [usersFromDb, setUsersFromDb] = useState<UserType[]>([]);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [mainError, setMainError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const validateUsername = (): boolean => {
    if(username.length === 0) {
       setUsernameError('This input field is required!');
       usernameRef.current && usernameRef.current.classList.add('is-invalid');
       return false;
    }

    setUsernameError(null);
    usernameRef.current && usernameRef.current.classList.remove('is-invalid');
    return true;
  }

  const validatePassword = ():boolean => {
    if(password.length === 0) {
      setPasswordError('This input field is required!');
      passwordRef.current && passwordRef.current.classList.add('is-invalid');
      return false;
    }

    setPasswordError(null);
    passwordRef.current && passwordRef.current.classList.remove('is-invalid');
    return true;
  }

  const validateForm = async () => {

     let errorFound = false;
     
     if(!validateUsername()) {
       errorFound = true;
     }

     if(!validatePassword()) {
       errorFound = true;
     }

     if(errorFound) {
        setMainError('Please fill all required fields!');
        return false;
     }

     const userFromDb = usersFromDb.find((user) => user.name === username);
     if(!userFromDb) {
       setMainError('Incorrect username or password!');
       return false;
     }

     try {
        const response = await axios.get(`http://localhost:3000/auth?username=${username}&password=${password}`)
        if(!response.data) {
          setMainError('Incorrect password!');
          return false;
        }

     } catch(error) {
      console.log('An error ocurred while logging in: ', error);
     }

     setMainError(null);
     setLoggedUser(userFromDb);
     localStorage.setItem('user', JSON.stringify(userFromDb));
     return true;

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(await validateForm()) {
      console.log('success!');
      navigate('/');
    }

    console.log('Error!');

  }

    return (
    <>
      <div className="main-form-cnt">
        <div className="form-cnt">
          <header>
            <h1>
              Login
            </h1>
          </header>

          {mainError && (
          <div className='error-msg-cnt'>
            <p>{mainError}</p>
          </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="inputs-cnt">
              <div className="inputs-cnt-item">
                  <h3 className='input-label'>Username:</h3>
                  <div className="input-text-cnt">
                    <input
                      type="text"
                      className=''
                      maxLength={30}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      ref={usernameRef}
                      />
                  </div>
                  {usernameError && <p className='error-text'>{usernameError}</p>}
              </div>

              <div className="inputs-cnt-item">
                  <h3 className='input-label'>Password:</h3>
                  <div className="input-text-cnt">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className=''
                      maxLength={50}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      ref={passwordRef}
                      />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className='eye-icon'
                      onClick={toggleShowPassword}/>
                  </div>
                  {passwordError && <p className='error-text'>{passwordError}</p>}
              </div>

              <div className="login-btn-cnt">
                  <button>Login</button>
              </div>

            </div>

          </form>


          <div className="register-link-cnt">
            <p>Don't have an account yet? {''}
              <Link to="/register">Click here to create one!</Link>
            </p>
          </div>


        </div>

      </div>
    </>
    );
}

export default Login;