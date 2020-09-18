import React from "react";

import './SanityMeter.scss';

const SanityMeter = (props) => {
  const { currentSanity } = props;

  const fillerStyles = {
    height: '100%',
    borderRadius: '10px',
    transition: '0.25s',
    width: `${currentSanity}%`,
    backgroundColor: '#250cc7',
    textAlign: 'right'
  };

  return (
    //entire bar
    //completed percentage
    <div className="title-barContainer">
      <p>Sanity:</p>
      <div className="barContainer">
        <div style={fillerStyles}>
          <span className="barLabel">{`${currentSanity}`}</span>
        </div>
      </div>
    </div>
  );
};

export default SanityMeter;