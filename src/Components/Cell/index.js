import React from 'react';

import './Cell.scss';

const Cell = (props) => {

  return (
    <div className='Cell'>
      {props.name}
    </div>
  );
};

export default Cell;