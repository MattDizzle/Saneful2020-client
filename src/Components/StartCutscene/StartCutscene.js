import React from 'react';
import cutscene_start from './cutscene_start.mp4';
import './StartCutscene.scss';

const StartCutscene = (props) => {

  return (
  <section>
    <div className="fullscreen-bg">
      <video autoPlay={true} muted loop src={cutscene_start} className="fullscreen-bg__video" type="video.mp4" />
    </div>
    <button className="startButton" type="button" onClick={() => props.setStartPressed(true)}>Start</button>
  </section>
  );
};

export default StartCutscene;