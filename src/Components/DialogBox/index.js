import React from 'react';

import './DialogBox.scss';

const DialogBox = (props) => {

  let newText = props.text;

  newText = newText.charAt(0).toUpperCase() + newText.slice(1);

  newText = newText += '?';

  return (
    <div className='dialog-box-container'>
      <p>{newText}</p>
      <div className='dialog-buttons'>
        <button onClick={props.yesClick}>Yes</button>
        <button onClick={props.noClick}>No</button>
      </div>
    </div>
  );
};

export default DialogBox;