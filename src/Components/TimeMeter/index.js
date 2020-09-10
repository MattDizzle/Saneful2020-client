import React from 'react';

import './TimeMeter.scss';

const TimeMeter = (props) => {

  const renderDayAndTime = () => {

    let timeLeft = props.currentTime;

    const numDays = Math.floor(timeLeft / 1440);
    timeLeft -= (1440 * numDays);
    const numHours = Math.floor(timeLeft / 60);
    timeLeft -= (60 * numHours);
    const numMins = timeLeft;

    const hourString = numHours.toString().padStart(2, '0');
    const minString = numMins.toString().padStart(2, '0');

    return (
      <div>
        <p>{`Day ${numDays}`}</p>
        <p>{`${hourString}:${minString}`}</p>
      </div>
    );

  };

  return (
    <>
      {renderDayAndTime()}
    </>
  );
};

export default TimeMeter;