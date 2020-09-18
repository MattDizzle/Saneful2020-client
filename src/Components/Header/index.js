import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../Context/UserContext';

import './Header.scss';

const Header = () => {

  const userContext = useContext(UserContext);
  // const username = userContext.user.username;

  const handleLogoutClick = () => {
    userContext.processLogout();
  };

  const renderLogoutLink = () => {
    return (
      <ul className='nav-bar'>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/leaderBoard">Leader Board</Link>
        </li>
        {/* <li>
            {username}
          </li> */}
        <li>
          <Link
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </li>
      </ul>

    );
  };

  const renderLoginLink = () => {
    return (
      <ul className='nav-bar'>
        <li>
          <Link to='/'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Sign up</Link>
        </li>
      </ul>
    );
  };

  return (
    <header className='Header'>
      <nav>
        {TokenService.hasAuthToken()
          ? renderLogoutLink()
          : renderLoginLink()}
      </nav>
    </header >
  );
};

export default Header;