import React from 'react';

import './DialogBox.scss';

const DialogBox = (props) => {

  return (
    <div className='dialog-box-container'>
      <p>Some text explaining the action.</p>
      <div className='dialog-buttons'>
        <button onClick={props.yesClick}>Yes</button>
        <button onClick={props.noClick}>No</button>
      </div>
    </div>
  );
};

export default DialogBox;