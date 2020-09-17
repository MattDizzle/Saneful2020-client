import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../../Context/GameContext';
import UserContext from '../../Context/UserContext';
import { useHistory } from "react-router-dom";

import './Dashboard.scss';


const Dashboard = () => {
  const gameContext = useContext(GameContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [hasCurrent, setHasCurrent] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const username = userContext.user.username;

  useEffect(() => {
    determineCurrent();
  }, []);

  const determineCurrent = async () => {
    try {
      let hasCurrent = await gameContext.currentGameExists();
      setHasCurrent(hasCurrent);
      setHasLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadGame = () => {
    gameContext.loadGame()
      .then(() => {
        history.push('/maingame');
      });;
  };

  const handleNewGame = () => {
    const newGame = {
      current_x_coord: 0,
      current_y_coord: 2,
      money_counter: 0,
      health_points: 100,
      health_points_max: 100,
      sanity_points: 100,
      sanity_points_max: 100,
      dead: false,
      character_skin: 1, //this will be passed in by a selection by the user when they create a new game
      elapsed_time: 0
    };

    gameContext.newGame(newGame)
      .then(() => {
        handleLoadGame();
      });
  };

  return (
    <section className='Dashboard'>
      <h2>Dashboard</h2>
      <p>Welcome back {username}!</p>
      {hasLoaded && <div>
        {hasCurrent && <button className='to-game-button' onClick={handleLoadGame}>Continue</button>}
        {!hasCurrent && <button className='to-game-button' onClick={handleNewGame}>New Game</button>}
      </div>}
      {!hasLoaded && <h3>Loading...</h3>}
      <div className='write-up'>
        <h3>The Game</h3>
        <p>You are living in Los Pixels in the year 2020 during a global pandemic. Your goal is to survive in self quarantine. </p>
        <h3>How to Play</h3>
        <p>
          There are 3 metrics that you must maintain: Health, Sanity, Money
          - all three deplete with time.
        </p>
        <p>If health or sanity drop below 0 you will perish…</p>
        <p>
          There are multiple ways to increase and decrease your health, sanity and money and take a few lives to find a good survival strategy... but you are probably smarter than you look!
        </p>
        <p> Beware, difficulty increases with each passing day. </p>
      </div>
    </section>
  );
};

export default Dashboard;