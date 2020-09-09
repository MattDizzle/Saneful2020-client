import React from 'react';

import './Cell.scss';

const Cell = (props) => {

  return (
    <div onClick={() => props.onClick(props.row, props.col)} className='Cell'>
      {/* {props.name} */}
    </div>
  );
};

export default Cell;