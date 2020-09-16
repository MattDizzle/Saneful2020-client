import React from 'react';

import './Cell.scss';

const Cell = (props) => {

  return (
    <div onClick={() => props.onClick(props.row, props.col, props.actions)} className={props.class}>
      {props.hasAction && <img src='images/pixel-elements/exclamation.png' alt='action'></img>}
      {/* {props.name} */}
    </div>
  );
};

export default Cell;