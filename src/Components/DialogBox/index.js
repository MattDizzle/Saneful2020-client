import React from 'react';

import './DialogBox.scss';

const DialogBox = (props) => {

  // need to do a for each for all passed in actions to display each action as a button

  let newText = props.text;

  newText = newText.charAt(0).toUpperCase() + newText.slice(1);

  newText = newText += ' for an hour?';

  // yes button will be replaced by all action options
  // no button will be replaced by a cancel/exit button

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