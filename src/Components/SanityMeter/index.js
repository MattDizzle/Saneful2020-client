import React from 'react';

import './SanityMeter.scss';

const SanityMeter = (props) => {

  return (
    <p>{`S:${props.currentSanity}`}</p>
  );
};

export default SanityMeter;