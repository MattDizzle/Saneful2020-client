import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GameContext from '../../Context/GameContext';
import { useHistory } from "react-router-dom";

import './Dashboard.scss';

const Dashboard = () => {
  const gameContext = useContext(GameContext);
  const history = useHistory();

  const handleLoadGame = () => {
    gameContext.loadGame();
  };

  const handleNewGame = () => {
    const newGame = {
      current_x_coord: 0,
      current_y_coord: 2,
      money_counter: 200,
      health_points: 100,
      health_points_max: 100,
      sanity_points: 100,
      sanity_points_max: 100,
      elapsed_time: 0
    };

    gameContext.newGame(newGame)
      .then(() => {
        history.push('/maingame');
      });
  };

  return (
    <section className='Dashboard'>
      <p>Dashboard</p>
      <div>
        <button onClick={handleNewGame}>New Game</button>
      </div>
      <div>
        <Link to='mainGame'>
          <button onClick={handleLoadGame}>Continue</button>
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;