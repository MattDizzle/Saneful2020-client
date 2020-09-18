import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import GameContext from '../../Context/GameContext';
import GameWindow from '../../Components/GameWindow/GameWindow';

import './MainGame.scss';

const MainGame = () => {
  //if the player reloads the game basically breaks so we need to bring them back to dashboard on reload
  const context = useContext(GameContext);
  const history = useHistory();

  if (context.gameData.saved_game_id === 0) {
    context.saveGame();
    history.push('/dashboard');
  }

  return (
    <section className='MainGame'>
      <GameWindow />
    </section>
  );
};

export default MainGame;