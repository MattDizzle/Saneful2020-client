import React from "react";

import './SanityMeter.scss';

const SanityMeter = (props) => {
  const { bgcolor, sanity } = props;

  const fillerStyles = {
    height: '100%',
    width: `${sanity}%`,
    backgroundColor: bgcolor,
    textAlign: 'right'
  }

  return (
    //entire bar
    //completed percentage
    <div className="barContainer pixel-borders">
      <div style={fillerStyles}>
        <span className="barLabel">{`${sanity}`}</span>
      </div>
    </div>
  )
}

export default SanityMeter;