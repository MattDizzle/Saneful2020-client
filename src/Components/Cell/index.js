import React from 'react';
// import Exclamation from '../../../public/images/pixel-elements/exclamation.png';

import './Cell.scss';

const Cell = (props) => {

  return (
    <div onClick={() => props.onClick(props.row, props.col, props.action)} className={props.class}>
      <img useRef='images/pixel-elements/exclamation.png' alt='action'></img>
      {/* {props.name} */}
    </div>
  );
};

export default Cell;