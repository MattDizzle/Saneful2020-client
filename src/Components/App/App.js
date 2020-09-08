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
  const [playerPosX, setPlayerPosX] = useState(0);
  const [playerPosY, setPlayerPosY] = useState(0);

  useEffect(() => {
    if (playerPosX < 9 && playerPosY < 9) {
      const interval = setInterval(() => {
        movePlayer(1, 0);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

  }, [playerPosX, playerPosY]);

  const movePlayer = (xDir, yDir) => {
    const newCells = cells.slice(); //copy cells
    const currentCell = newCells[playerPosX][playerPosY];

    setPlayerPosX(playerPosX + xDir);
    setPlayerPosY(playerPosY + yDir);

    newCells[playerPosX][playerPosY].name = 'Player';

    setCells(newCells);

    currentCell.name = 'empty';
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