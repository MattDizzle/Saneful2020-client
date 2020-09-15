import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../../Context/GameContext';
import { useHistory } from "react-router-dom";

import './Dashboard.scss';

const Dashboard = () => {
  const gameContext = useContext(GameContext);
  const history = useHistory();
  const [hasCurrent, setHasCurrent] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    determineCurrent();
  }, []);

  const determineCurrent = async () => {
    try {
      let hasCurrent = await gameContext.currentGameExists();
      setHasCurrent(hasCurrent);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
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
      money_counter: 200,
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
      {hasLoaded && <div>
        {hasCurrent && <button onClick={handleLoadGame}>Continue</button>}
        {!hasCurrent && <button onClick={handleNewGame}>New Game</button>}
      </div>}
      {!hasLoaded && <h3>Loading...</h3>}
    </section>
  );
};

export default Dashboard;