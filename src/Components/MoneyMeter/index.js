import React from 'react';

import './MoneyMeter.scss';

const MoneyMeter = (props) => {

  return (
    <p>{`Money: $${props.currentMoney}`}</p>
  );
};

export default MoneyMeter;