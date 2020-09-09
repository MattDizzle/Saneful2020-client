import React, { useState, useEffect } from 'react';
import { MAX_COLS, MAX_ROWS, playerMoveSpeed, playerStartPos } from '../../Constants';
import Player from '../Player';
import generateCells from '../../Utils/generate-cells';
import Cell from '../Cell';

import './App.scss';

/* 
Grid 
- each square 52px
- 10x10
*/

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [playerPos, setPlayerPos] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [playerTarget, setPlayerTarget] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [live, setLive] = useState(false);

  useEffect(() => {
    const update = setInterval(() => {
      if (!live) {
        start();
      }

      movePlayer(0, 0);

      if (playerPos.row < playerTarget.row) {
        movePlayer(1, 0);
      }
      else if (playerPos.row > playerTarget.row) {
        movePlayer(-1, 0);
      }
      else if (playerPos.col < playerTarget.col) {
        movePlayer(0, 1);
      }
      else if (playerPos.col > playerTarget.col) {
        movePlayer(0, -1);
      }

    }, playerMoveSpeed);

    return () => {
      clearInterval(update);
    };

  }, [playerPos]);

  const start = () => {
    setLive(true);
    movePlayer(playerStartPos.row, playerStartPos.col);
  };

  const movePlayer = (rowDir, colDir) => {
    const newCells = cells.slice(); //copy cells
    const currentCell = newCells[playerPos.row][playerPos.col];

    setPlayerPos({ row: playerPos.row + rowDir, col: playerPos.col + colDir });

    newCells[playerPos.row][playerPos.col].name = 'Player';
    newCells[playerPos.row][playerPos.col].hasPlayer = true;

    setCells(newCells);

    currentCell.name = 'empty';
    currentCell.hasPlayer = false;
  };

  const handleCellClick = (rowTarget, colTarget) => {
    setPlayerTarget({ row: rowTarget, col: colTarget });
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
        />
      ))
    );
  };

  return (
    <main className='App'>
      <div>
        <img className='cells' src='images/grid_10x10.png' alt='background'></img>
        <Player />
        <div className="cells">{renderCells()}</div>
      </div>
    </main>
  );
};

export default App;