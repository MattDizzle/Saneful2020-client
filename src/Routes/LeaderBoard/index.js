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
    let x = 0;
    let options = ['', 'color-rotate'];

    return list.map((player, index) => {
      let convertedTime = convertTime(player.elapsed_time);

      x = x === 0 ? 1 : 0;

      return (
        <li key={index} className={options[x]}>
          <div className='player-info'>
            <h3>{`${index + 1}. `}{player.user_name}</h3>
            <p>{`${convertedTime.days} day(s), ${convertedTime.hours} hours ${convertedTime.mins} mins`}  {`(${player.dead ? 'deceased' : 'alive'})`}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <section className='LeaderBoard'>
      <h2>Those who made it the longest...</h2>
      <ol className='leader-list'>
        {renderList()}
      </ol>
    </section>
  );
};

export default LeaderBoard;