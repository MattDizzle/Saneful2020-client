import React from 'react';
import GameWindow from '../../Components/GameWindow/GameWindow';

import './MainGame.scss';

const MainGame = () => {
  //if the player reloads the game basically breaks so we need to bring them back to dashboard on reload

  return (
    <section className='MainGame'>
      <GameWindow />
    </section>
  );
};

export default MainGame;