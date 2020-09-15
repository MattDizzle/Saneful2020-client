import React, { useContext } from 'react';
import GameWindow from '../../Components/GameWindow/GameWindow';
import GameContext from '../../Context/GameContext';

import './MainGame.scss';

const MainGame = () => {
  //if the player reloads the game basically breaks so we need to bring them back to dashboard on reload

  const gameContext = useContext(GameContext);

  const handleSaveGame = (saveObj) => {
    gameContext.saveGame(saveObj);
  };

  return (
    <section className='MainGame'>
      <GameWindow saveGame={handleSaveGame} />
    </section>
  );
};

export default MainGame;