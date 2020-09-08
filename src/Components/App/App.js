import React, { useState, useEffect } from 'react';
import generateCells from '../../Utils/generate-cells';
import Cell from '../Cell';

import './App.scss';

/* 
Grid 
- 520px by 780px 
- each square 52px
- 10x15
*/

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = () => {
      movePlayer(1, 0);
    };

    const handleMouseUp = () => {
      //movePlayer(0, 0);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };

  }, []);

  const movePlayer = (xDir, yDir) => {
    const currentCells = cells.slice(); //copy cells
    let currentCell = currentCells[playerPos.x][playerPos.y];

    setPlayerPos({
      x: playerPos.x + xDir,
      y: playerPos.y + yDir
    });

    currentCells[playerPos.x][playerPos.y].name = 'Player';
    currentCell.name = 'empty';
    setCells(currentCells);
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          walkable={cell.walkable}
          name={cell.name}
        />
      ))
    );
  };

  return (
    <main className='App'>
      <img className='background' src='images/background'></img>;
      <div className="cells">{renderCells()}</div>
    </main>
  );
};

export default App;