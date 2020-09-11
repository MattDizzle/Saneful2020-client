import React from 'react';
import GameWindow from '../../Components/GameWindow/GameWindow';

import './MainGame.scss';

const MainGame = () => {

  const handleSaveGame = (saveObj) => {

    //save game
    //call save game service
    //pass saveObj as body
  };

  return (
    <section className='MainGame'>
      <GameWindow saveGame={handleSaveGame} />
    </section>
  );
};

export default MainGame;