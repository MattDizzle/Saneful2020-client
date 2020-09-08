import React from 'react';

import './Cell.scss';

const Cell = (props) => {

  return (
    <div onClick={() => props.onClick(props.x, props.y)} className='Cell'>
      {props.name}
    </div>
  );
};

export default Cell;