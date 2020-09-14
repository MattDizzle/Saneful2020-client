import React from 'react';
import GameWindow from '../../Components/GameWindow/GameWindow';
import SaveApiService from '../../services/save-service';

import './MainGame.scss';

const MainGame = () => {

  const handleNewGame = () => {


  };

  const handleLoadGame = async () => {
    const result = await SaveApiService.getSaveGameData();
    console.log(result);
  };

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