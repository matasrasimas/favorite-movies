import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {User as UserType} from '../types/User';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Register = () => {

    const navigate = useNavigate();

    const [usersFromDb, setUsersFromDb] = useState<UserType[]>([]);

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const password1Ref = useRef<HTMLInputElement | null>(null);
    const password2Ref = useRef<HTMLInputElement | null>(null);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const [mainError, setMainError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password1Error, setPassword1Error] = useState<string | null>(null);
    const [password2Error, setPassword2Error] = useState<string | null>(null);

    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem('user')) navigate('/');
        const fetchData = async() => {
            const respond = await axios.get('http://localhost:3000/users');
            setUsersFromDb(respond.data);
        }
        fetchData();
    }, [])


    const toggleShowPassword1 = () => {
      setShowPassword1(!showPassword1);
    }

    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    }


    const validateUsername = (): boolean => {

        let errorFound = false;

        if(username.length < 3) {
            setUsernameError('Username must contain at least 3 characters!');
            errorFound = true;
        }

        else if(usersFromDb.find(user => user.name === username)) {
            setUsernameError('This username is already taken!');
            errorFound = true;
        }

        if(errorFound && usernameRef.current) {
            usernameRef.current.classList.add('is-invalid');
            return false;
        }

        setUsernameError(null);
        usernameRef.current && usernameRef.current.classList.remove('is-invalid');
        return true;
    }


    const validateEmail = (): boolean => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {
            setEmailError('Invalid email address!');
            emailRef.current && emailRef.current.classList.add('is-invalid');
            return false;
        }

        setEmailError(null);
        emailRef.current && emailRef.current.classList.remove('is-invalid');
        return true;
    }

    const validatePassword1 = (): boolean => {

        let errorFound: boolean = false;

        // Regex, that checks, if password contains at least one capital letter
        const regex1 = /.*[A-Z].*/;

        // Regex, that checks, if password contains at least one digit
        const regex2 = /.*\d.*/;

        // Regex, that checks, if password contains at least one special character (, . - _ ? !)
        const regex3 = /.*[,.\-_?!].*/;

        const passwordRequirements: string[] = [];

        if(!regex1.test(password1)) {
            passwordRequirements.push('at least 1 capital letter');
        }

        if(!regex2.test(password1)) {
            passwordRequirements.push('at least 1 digit');
        }

        if(!regex3.test(password1)) {
            passwordRequirements.push('at least 1 special character (, . - _ ? !)')
        }


        if(password1.length < 8) {
            setPassword1Error('Password must contain at least 8 characters');
            errorFound = true;
        }

        else if(passwordRequirements.length !== 0) {
            const passwordRequirementsString = `Password must contain:<br> ${passwordRequirements
                .map((req) => `• ${req}`)
                .join("<br>")}`;
            setPassword1Error(passwordRequirementsString);
            errorFound = true;
        }

        if(errorFound) {
            password1Ref.current && password1Ref.current.classList.add('is-invalid');
            return false;
        }
        setPassword1Error(null);
        password1Ref.current && password1Ref.current.classList.remove('is-invalid');
        return true;
    }


    const validatePassword2 = (): boolean => {
        if(password2 !== password1) {
            setPassword2Error('Passwords don\'t match!');
            password2Ref.current && password2Ref.current.classList.add('is-invalid');
            return false;
        }
        setPassword2Error(null);
        password2Ref.current && password2Ref.current.classList.remove('is-invalid');
        return true;
    }


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let errorFound: boolean = false;

        if(!validateUsername()) errorFound = true;
        if(!validateEmail()) errorFound = true;
        if(!validatePassword1()) errorFound = true;
        if(!validatePassword2()) errorFound = true;

        if(!errorFound) {

            const user = {
                name: username,
                email: email,
                password: password1,
            };

            try {
                const response = await axios.post('http://localhost:3000/users', user);

                if(response.status === 201) {
                    console.log('User added successfully!');
                    setMainError(null);
                    navigate('/login');
                } else {
                    console.log('Error adding user.');
                    setMainError('Error adding user. Please try again.');
                }
            } catch(error) {
                console.log('Error adding user: ', error);
                setMainError('Error adding user. Please try again.');
            }
        }
        else {
            setMainError('Please fill all fields correctly!');
        }
    }

    return (
    <>
      <div className="main-form-cnt">
        <div className="form-cnt">
          <header>
            <h1>
              Register
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
                        onChange={(e) => {setUsername(e.target.value)}}
                        ref={usernameRef}
                        />
                    </div>
                    {usernameError && <p className='error-text'>{usernameError}</p>}
                </div>

                <div className="inputs-cnt-item">
                    <h3 className='input-label'>Email:</h3>
                    <div className="input-text-cnt">
                        <input
                        type="text"
                        className=''
                        maxLength={50}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailRef}
                        />
                    </div>
                    {emailError && <p className='error-text'>{emailError}</p>}
                </div>

                <div className="inputs-cnt-item">
                    <h3 className='input-label'>Password:</h3>
                    <div className="input-text-cnt">
                        <input
                        type={showPassword1 ? 'text' : 'password'}
                        className=''
                        maxLength={50}
                        value={password1}
                        onChange={(e) => {setPassword1(e.target.value)}}
                        ref={password1Ref}
                        />
                        <FontAwesomeIcon
                          icon={showPassword1 ? faEyeSlash : faEye}
                          className='eye-icon'
                          onClick={toggleShowPassword1}/>
                    </div>
                    {password1Error &&
                      <p
                         className='error-text'
                         dangerouslySetInnerHTML={{ __html: password1Error }}
                         />}
                </div>

                <div className="inputs-cnt-item">
                    <h3 className='input-label'>Confirm password:</h3>
                    <div className="input-text-cnt">
                        <input
                        type={showPassword2 ? 'text' : 'password'}
                        className=''
                        maxLength={50}
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        ref={password2Ref}
                        />
                        <FontAwesomeIcon
                          icon={showPassword2 ? faEyeSlash : faEye}
                          className='eye-icon'
                          onClick={toggleShowPassword2}/>
                    </div>
                    {password2Error && <p className='error-text'>{password2Error}</p>}
                </div>

                <div className="login-btn-cnt">
                    <button>Create</button>
                </div>

            </div>

          </form>

          <div className="register-link-cnt">
            <p>Already have an account? {''}
                <Link to="/login">Click here to log in!</Link>
            </p>
          </div>


        </div>

      </div>
    </>
    );
}

export default Register;