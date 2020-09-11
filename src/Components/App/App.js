import React from 'react';
import { Route, Link } from 'react-router-dom';
// import GameWindow from '../GameWindow/GameWindow';
import LeaderBoard from '../../Routes/LeaderBoard';
import Login from '../../Routes/Login';
import MainGame from '../../Routes/MainGame';
import Dashboard from '../../Routes/Dashboard';
import Register from '../../Routes/Register';
import Header from '../../Components/Header';

import './App.scss';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <main >
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/maingame" component={MainGame} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/leaderBoard" component={LeaderBoard} />
      </main>
    </div >
  );
};

export default App;