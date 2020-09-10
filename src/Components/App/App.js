import React from 'react';
import { Route } from 'react-router-dom';
import GameWindow from '../GameWindow/GameWindow';

import './App.scss';


const App = () => {
  return (
    <div className='App'>
      <header>
        header
      </header >
      <main >
        <GameWindow />
      </main>
    </div >
  );
};

export default App;