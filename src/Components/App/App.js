import React, { useState, useEffect } from 'react';
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
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [playerTarget, setPplayerTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (playerPos.x !== playerTarget.x && playerPos.y !== playerTarget.y) {
      const interval = setInterval(() => {
        movePlayer(0, 0);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

  }, [playerPos]);

  const movePlayer = (xDir, yDir) => {
    const newCells = cells.slice(); //copy cells
    const currentCell = newCells[playerPos.x][playerPos.y];

    setPlayerPos({ x: playerPos.x + xDir, y: playerPos.y + yDir });

    newCells[playerPos.x][playerPos.y].name = 'Player';

    setCells(newCells);

    currentCell.name = 'empty';
  };

  const setPlayerTarget = (xTarget, yTarget) => {
    console.log('x', xTarget);
    console.log('y', yTarget);
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          walkable={cell.walkable}
          name={cell.name}
          hasPlayer={cell.hasPlayer}
          x={cell.x}
          y={cell.y}
          onClick={setPlayerTarget}
        />
      ))
    );
  };

  return (
    <main className='App'>
      <img className='cells' src='images/grid_10x10.png' alt='background'></img>
      <div className="cells">{renderCells()}</div>
    </main>
  );
};

export default App;