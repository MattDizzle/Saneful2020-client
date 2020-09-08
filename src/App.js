import React, { useState } from 'react';
import generateCells from './Utils/generate-cells';
import Cell from './Components/Cell';

/* 
Grid 
- 520px by 780px 
- each square 52px
- 10x15
*/

const App = () => {
  const [cells, setCells] = useState(generateCells());

  console.log(cells);

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          walkable={cell.walkable}
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