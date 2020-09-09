import React from 'react';

import './Player.scss';

const Player = (props) => {

  return (
    <div className='player-animation'>
      <img className='Player' src={props.currentFrame} alt='player'></img>
    </div>
  );
};

export default Player;