import React from 'react';

import './GameOverScreen.scss';

const DialogBox = (props) => {

  const renderMessage = () => {

    let deathMessage = '';

    if (props.reason === 'sanity')
      deathMessage = 'you became lost in your own insanity';
    if (props.reason === 'health')
      deathMessage = 'your body degraded and you faded away';

    let timeLeft = props.currentTime;

    const numDays = Math.floor(timeLeft / 1440);
    timeLeft -= (1440 * numDays);
    const numHours = Math.floor(timeLeft / 60);
    timeLeft -= (60 * numHours);
    const numMins = timeLeft;

    return (
      <div className='game-over-message'>
        {/* <p>You lasted {(numDays===1)?`${numDays} day `:' days '}{(numHours===1)?`${numHours} hour`:' hours '} and {(numMins===1)?`${numMins} minute `:' minutes '} before you {deathMessage}...</p> */}
        <p>{`You lasted ${numDays} days ${numHours} hours and ${numMins} minutes before you ${deathMessage}...`}</p>
      </div>
    );

  };

  return (
    <div className='game-over-screen'>
      {renderMessage()}
    </div>
  );
};

export default DialogBox;