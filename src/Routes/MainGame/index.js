import React, { useContext } from 'react';
import GameWindow from '../../Components/GameWindow/GameWindow';
import GameContext from '../../Context/GameContext';

import './MainGame.scss';

const MainGame = () => {

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