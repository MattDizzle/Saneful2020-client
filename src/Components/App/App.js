import React, { useState, useEffect } from 'react';
import { playerMoveSpeed, playerStartPos } from '../../Constants';
import Player from '../Player';
import generateCells from '../../Utils/generate-cells';
import Cell from '../Cell';

import { c1Frames } from '../../Data/animation-data';

import './App.scss';

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [live, setLive] = useState(false);

  // movement
  const [playerPos, setPlayerPos] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [playerTarget, setPlayerTarget] = useState({ row: playerStartPos.row, col: playerStartPos.col });

  // animation
  const [currentPlayerFrame, setCurrentPlayerFrame] = useState(0);
  const [playerFrameLib, setPlayerFrameLib] = useState(c1Frames.right);

  // look up use reducer
  const [nextAction, setNextAction] = useState(() => console.log('test'));

  // TODO:
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

      // move up
      if (playerPos.row < playerTarget.row && cells[playerPos.row + 1][playerPos.col].walkable) {
        movePlayer(1, 0);
        changePlayerMoveFrame();
        setPlayerFrameLib(c1Frames.front);
      }
      // move down
      if (playerPos.row > playerTarget.row && cells[playerPos.row - 1][playerPos.col].walkable) {
        movePlayer(-1, 0);
        changePlayerMoveFrame();
        setPlayerFrameLib(c1Frames.back);
      }
      // move right
      if (playerPos.col < playerTarget.col && cells[playerPos.row][playerPos.col + 1].walkable) {
        movePlayer(0, 1);
        changePlayerMoveFrame();
        setPlayerFrameLib(c1Frames.right);
      }
      // move left
      if (playerPos.col > playerTarget.col && cells[playerPos.row][playerPos.col - 1].walkable) {
        movePlayer(0, -1);
        changePlayerMoveFrame();
        setPlayerFrameLib(c1Frames.left);
      }

    }, playerMoveSpeed);

    return () => {
      clearInterval(update);
    };
  });

  const start = () => {
    setLive(true);
    setCurrentPlayerFrame(0);
    setPlayerFrameLib(c1Frames.right);
  };

  const movePlayer = (rowDir, colDir) => {
    const newCells = cells.slice(); // copy cells
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

  const changePlayerMoveFrame = () => {
    if (currentPlayerFrame < 3)
      setCurrentPlayerFrame(currentPlayerFrame + 1);
    else
      setCurrentPlayerFrame(0);
  };

  const handleCellClick = (rowTarget, colTarget, action) => {
    // console.log(rowTarget, colTarget);
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
        <Player currentFrame={playerFrameLib[currentPlayerFrame]} />
        <div className='UI'>
          <p>12:00PM</p>
          <p>M: $100</p>
          <p>S: 100</p>
          <p>H: 100</p>
        </div>
      </div>
    </main>
  );
};

export default App;