import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../Context/UserContext';

import './Header.scss';

const Header = () => {

  const userContext = useContext(UserContext);
  const username = userContext.user.username;

  const handleLogoutClick = () => {
    userContext.processLogout();
  };

  const renderLogoutLink = () => {
    return (
      <div>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/leaderBoard">LeaderBoard</Link>
        </li>
        <li>
          {username}
        </li>
        <li>
          <Link
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </li>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <div>
        <li>
          <div><Link to='/'>Login</Link></div>
          <div><Link to='/register'>Sign up</Link></div>
        </li>
      </div>
    );
  };

  return (
    <header className='Header'>
      <nav>
        <ul>
          {TokenService.hasAuthToken()
            ? renderLogoutLink()
            : renderLoginLink()}
        </ul>
      </nav>
    </header >
  );
};

export default Header;