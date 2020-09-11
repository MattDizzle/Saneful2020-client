import React from 'react';
import { Route, Link } from 'react-router-dom';
// import GameWindow from '../GameWindow/GameWindow';
import LeaderBoard from '../../Routes/LeaderBoard';
import Login from '../../Routes/Login';
import MainGame from '../../Routes/MainGame';
import NewGameContinue from '../../Routes/NewGameContinue';
import Register from '../../Routes/Register';

import './App.scss';


const App = () => {
  return (
    <div className='App'>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/maingame">Main Game</Link>
            </li>
            <li>
              <Link to="/newgamecontinue">New Game Continue</Link>
            </li>
            <li>
              <Link to="/leaderBoard">LeaderBoard</Link>
            </li>
          </ul>
        </nav>
      </header >
      <main >
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/maingame" component={MainGame} />
        <Route path="/newgamecontinue" component={NewGameContinue} />
        <Route path="/leaderBoard" component={LeaderBoard} />
      </main>
    </div >
  );
};

export default App;