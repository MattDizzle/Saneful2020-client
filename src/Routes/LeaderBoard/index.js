import React, { useEffect, useState } from 'react';
import convertTime from '../../Utils/convert-time';
import SaveApiService from '../../services/save-service';

import './LeaderBoard.scss';

const LeaderBoard = () => {

  const [list, setList] = useState([]);

  useEffect(() => {
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
          <p>{player.user_name} | {`${convertedTime.days} day(s), ${convertedTime.hours} hours ${convertedTime.mins} mins`} | {player.dead ? 'deceased' : 'alive'}</p>
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