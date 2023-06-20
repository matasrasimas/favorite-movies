import React, { useState, useEffect, createContext } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import {User as UserType} from './types/User';
import Movies from './components/Movies';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Register from './components/Register';
import CreateMovie from './components/CreateMovie';

export const AuthContext = createContext<{
  loggedUser: UserType | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
} | null>(null);

function App() {

  const [loggedUser, setLoggedUser] = useState<UserType | null>(null);

  const navigate = useNavigate();

  // Load user data from local storage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if(storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [])
   
  return (
    <>
      <AuthContext.Provider
        value={{
          loggedUser,
          setLoggedUser
        }}
      >

        <Routes>
          <Route path='/' element={<Movies/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/movies/create' element={<CreateMovie/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>

      </AuthContext.Provider>

      
    </>
  )
}

export default App
