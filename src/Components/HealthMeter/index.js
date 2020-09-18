import React from "react";

import './HealthMeter.scss';

const HealthMeter = (props) => {
  const { currentHealth } = props;

  const fillerStyles = {
    height: '100%',
    borderRadius: '10px',
    transition: '0.25s',
    width: `${currentHealth}%`,
    backgroundColor: '#ab111b',
    textAlign: 'right'
  };

  return (
    //entire bar
    //completed percentage
    <div className="title-barContainer">
      <p>Health:</p>
      <div className="barContainer">
        <div style={fillerStyles}>
          <span className="barLabel">{`${currentHealth}`}</span>
        </div>
      </div>
    </div>

  );
};

export default HealthMeter;