import React from 'react';
import convertTime from '../../Utils/convert-time';

import './LeaderBoard.scss';

const temp = [
  {
    username: 'name1',
    elapsedTime: 143,
    alive: false,
  },
  {
    username: 'name2',
    elapsedTime: 456,
    alive: true,
  },
  {
    username: 'name3',
    elapsedTime: 86,
    alive: true,
  }
];

const LeaderBoard = () => {

  const renderList = () => {

    return temp.map((player, index) => {
      let convertedTime = convertTime(player.elapsedTime);
      return (
        <li key={index}>
          <p>{player.username} | {`${convertedTime.days} day(s), ${convertedTime.hours} hours ${convertedTime.mins} mins`} | {player.alive ? 'alive' : 'deceased'}</p>
        </li>
      );
    });
  };

  return (
    <section className='LeaderBoard'>
      <ul className='leader-list'>
        {renderList()}
      </ul>
    </section>
  );
};

export default LeaderBoard;