import React, { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import cutscene_start from './saneful-stars.mp4';
import './StartCutscene.scss';

const StartCutscene = () => {
  const userContext = useContext(UserContext);

  return (
    <section>
      <div className="fullscreen-bg">
        <video playsinline autoPlay={true} muted loop src={cutscene_start} className="fullscreen-bg__video" type="video.mp4" />
        <p>click to start</p>
      </div>
      <button className="startButton" type="button" onClick={() => userContext.setStartClicked(true)}></button>

    </section>
  );
};

export default StartCutscene;