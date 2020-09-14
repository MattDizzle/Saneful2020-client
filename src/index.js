import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './Context/UserContext';
import { GameProvider } from './Context/GameContext';
import App from './Components/App/App';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'));