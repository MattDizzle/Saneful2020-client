import React, { useEffect, useState } from 'react';
import convertTime from '../../Utils/convert-time';
import SaveApiService from '../../services/save-service';

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

  const [list, setList] = useState([]);

  useEffect(() => {
    console.log('test');
    SaveApiService.getLeaderboard()
      .then(res => {
        setList(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderList = () => {
    return list.map((player, index) => {
      let convertedTime = convertTime(player.elapsed_time);
      return (
        <li key={index}>
          <p>{player.user_name} | {`${convertedTime.days} day(s), ${convertedTime.hours} hours ${convertedTime.mins} mins`} | {player.dead ? 'alive' : 'deceased'}</p>
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