import React from 'react';

import './HealthMeter.scss';

const HealthMeter = (props) => {

  return (
    <p>{`H:${props.currentHealth}`}</p>
  );
};

export default HealthMeter;