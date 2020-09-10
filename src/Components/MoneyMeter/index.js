import React from 'react';

import './MoneyMeter.scss';

const MoneyMeter = (props) => {

  return (
    <p>{`M:$${props.currentMoney}`}</p>
  );
};

export default MoneyMeter;