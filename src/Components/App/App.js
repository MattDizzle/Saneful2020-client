//GENERAL
import React, { useState, useEffect } from 'react';
import { playerMoveSpeed, playerStartPos, updateRate } from '../../Constants';

//GRID
import generateCells from '../../Utils/generate-cells';
import Cell from '../Cell';

// PLAYER
import Player from '../Player';
import { c1Frames } from '../../Data/animation-data';
import DetermineAction from '../Player/Actions';

//UI
import DialogBox from '../DialogBox';

//CSS
import './App.scss';

const App = () => {
  /* State Start */
  const [cells, setCells] = useState(generateCells());
  const [live, setLive] = useState(false);

  // player control
  const [playerHasControl, setPlayerHasControl] = useState(true);

  // player movement
  const [playerPos, setPlayerPos] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [playerTarget, setPlayerTarget] = useState({ row: playerStartPos.row, col: playerStartPos.col });
  const [playerMoveTick, setPlayerMoveTick] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // player animation
  const [currentPlayerFrame, setCurrentPlayerFrame] = useState(0);
  const [playerFrameLib, setPlayerFrameLib] = useState(c1Frames.right);
  const [playerAnimTick, setPlayerAnimTick] = useState(0);

  // UI
  const [dialogBoxActive, setDialogBoxActive] = useState(false);

  // actions
  const [nextAction, setNextAction] = useState('none');
  const [pendingAction, setPendingAction] = useState('none');

  // TODO:
  const [health, setHealth] = useState(100);
  const [sanity, setSanity] = useState(100);
  const [money, setMoney] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);

  // move player movement into player movement script 
  // move player anim into player anim script
  // have ticks in update for health, sanity and money
  // elapsed time will still depend on movement and actions (for now/// could later be transferred into a tick)

  /* State End */

  let player = document.querySelector('.Player');

  // when we reach a cell we simply need to ask if it has an action
  // if so we send the action string of that cell to the player actions script which will perform the action 

  useEffect(() => {
    const update = setInterval(() => {
      if (!live) {
        start();
      }

      // player movement update
      if (playerMoveTick === playerMoveSpeed) {
        playerPositionUpdate();
        setPlayerMoveTick(0);
      } else {
        setPlayerMoveTick(playerMoveTick + 1);
      }

      if (isMoving) {
        // player animation update
        if (playerAnimTick === Math.floor(playerMoveSpeed / 2)) {
          changePlayerMoveFrame();
          setPlayerAnimTick(0);
        } else {
          setPlayerAnimTick(playerAnimTick + 1);
        }
      } else {
        // check for action triggers on current cell
        // this could be put outside of isMoving condition to check every cell we walk over 
        if (cells[playerPos.row][playerPos.col].hasAction) {
          //show player a menu that asks if they want to perform the action
          if (nextAction !== 'none') {
            setPendingAction(nextAction);
            setPlayerHasControl(false);
            setDialogBoxActive(true);
          }
        }
      }
    }, updateRate);

    return () => {
      clearInterval(update);
    };
  });

  const yesAction = () => {
    DetermineAction(pendingAction);
  };

  const noAction = () => {
    setDialogBoxActive(false);
    setPlayerHasControl(true);
    setNextAction('none');
    setPendingAction('none');
  };

  const start = () => {
    setLive(true);
    setCurrentPlayerFrame(0);
    setPlayerFrameLib(c1Frames.right);
  };

  const playerPositionUpdate = () => {
    movePlayer(0, 0);
    setIsMoving(true);

    // move up
    if (playerPos.row < playerTarget.row && cells[playerPos.row + 1][playerPos.col].walkable) {
      movePlayer(1, 0);
      setPlayerFrameLib(c1Frames.front);
    }
    // move down
    else if (playerPos.row > playerTarget.row && cells[playerPos.row - 1][playerPos.col].walkable) {
      movePlayer(-1, 0);
      setPlayerFrameLib(c1Frames.back);
    }
    // move right
    else if (playerPos.col < playerTarget.col && cells[playerPos.row][playerPos.col + 1].walkable) {
      movePlayer(0, 1);
      setPlayerFrameLib(c1Frames.right);
    }
    // move left
    else if (playerPos.col > playerTarget.col && cells[playerPos.row][playerPos.col - 1].walkable) {
      movePlayer(0, -1);
      setPlayerFrameLib(c1Frames.left);
    } else {
      setIsMoving(false);
    }
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
    if (playerHasControl) {
      setPlayerTarget({ row: rowTarget, col: colTarget });
      setNextAction(action);
    }
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
          <p>M:$100</p>
          <p>S:100</p>
          <p>H:100</p>
        </div>
        {dialogBoxActive && <DialogBox yesClick={yesAction} noClick={noAction} />}
      </div>
    </main>
  );
};

export default App;