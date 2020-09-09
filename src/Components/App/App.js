import React, { useState, useEffect } from 'react';
import { playerMoveSpeed, playerStartPos } from '../../Constants';
import Player from '../Player';
import generateCells from '../../Utils/generate-cells';
import Cell from '../Cell';

import './App.scss';

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [playerPos, setPlayerPos] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [playerTarget, setPlayerTarget] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [live, setLive] = useState(false);
  // look up use reducer
  const [nextAction, setNextAction] = useState(() => console.log('test'));
  const [health, setHealth] = useState(100);
  const [sanity, setSanity] = useState(100);
  const [money, setMoney] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);

  let player = document.querySelector('.Player');

  useEffect(() => {
    const update = setInterval(() => {
      if (!live) {
        start();
      }

      movePlayer(0, 0);

      //move up
      if (playerPos.row < playerTarget.row) {
        movePlayer(1, 0);
      }
      //move down
      else if (playerPos.row > playerTarget.row) {
        movePlayer(-1, 0);
      }
      //move right
      else if (playerPos.col < playerTarget.col) {
        movePlayer(0, 1);
      }
      //move left
      else if (playerPos.col > playerTarget.col) {
        movePlayer(0, -1);
      }

    }, playerMoveSpeed);

    return () => {
      clearInterval(update);
    };

  });

  const start = () => {
    setLive(true);
  };

  const movePlayer = (rowDir, colDir) => {
    const newCells = cells.slice(); //copy cells
    const currentCell = newCells[playerPos.row][playerPos.col];

    setPlayerPos({ row: playerPos.row + rowDir, col: playerPos.col + colDir });

    newCells[playerPos.row][playerPos.col].name = 'Player';
    newCells[playerPos.row][playerPos.col].hasPlayer = true;

    if (player) {
      player.style.setProperty('--top-int', playerPos.row);
      player.style.setProperty('--left-int', playerPos.col);
    }

    setCells(newCells);

    currentCell.name = 'empty';
    currentCell.hasPlayer = false;
  };

  const handleCellClick = (rowTarget, colTarget, action) => {
    console.log(rowTarget, colTarget);
    setPlayerTarget({ row: rowTarget, col: colTarget });
    setNextAction(() => action);
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          walkable={cell.walkable}
          name={cell.name}
          hasPlayer={cell.hasPlayer}
          row={cell.row}
          col={cell.col}
          onClick={handleCellClick}
          hasAction={cell.hasAction}
          action={cell.action}
        />
      ))
    );
  };

  return (
    <main className='App'>
      <div>
        <img className='cells' src='images/grid/draft1nogrid.png' alt='background'></img>
        <div className="cells">{renderCells()}</div>
        <Player />
      </div>
    </main>
  );
};

export default App;