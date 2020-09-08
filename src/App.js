import React, { useState } from 'react';
import generateCells from './Utils/generate-cells';

/* 
Grid 
- 520px by 780px 
- each square 52px
- 10x15
*/

const App = () => {
  const [cells, setCells] = useState(generateCells());



  return (
    <main className='App'>
      <canvas>

      </canvas>
    </main>
  );
};

export default App;