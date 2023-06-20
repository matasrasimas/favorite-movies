import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../App';
import {User as UserType} from '../types/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  const { loggedUser, setLoggedUser } = useContext(AuthContext) as {
    loggedUser: UserType | null;
    setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className='navbar-cnt'>
        <div className='navbar-cnt-user'>
          <p>{`Hello, ${loggedUser && loggedUser.name}!`}</p>
          <FontAwesomeIcon icon={faCircleUser} className='user-icon' />
        </div>       
         

      <div className='navbar-cnt-logout'>
          <a onClick={handleLogout}>Log out</a>
      </div>

    </div>
  );
};

export default Navbar;