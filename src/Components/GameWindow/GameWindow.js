//GENERAL
import React, { useState, useEffect } from 'react';
import {
  playerMoveSpeed,
  playerStartPos,
  updateRate,
  healthInterval,
  sanityInterval,
  moneyInterval,
  timeInterval
} from '../../Constants';

//GRID
import generateCells from '../../Utils/generate-cells';
import Cell from '../Cell';

// PLAYER
import Player from '../Player';
import { c1Frames } from '../../Data/animation-data';
import DetermineAction from '../Player/Actions';

//UI
import DialogBox from '../DialogBox';
import HealthMeter from '../HealthMeter';
import SanityMeter from '../SanityMeter';
import MoneyMeter from '../MoneyMeter';
import TimeMeter from '../TimeMeter';
import GameOverScreen from '../GameOverScreen';

//CSS
import './GameWindow.scss';

const GameWindow = () => {
  /* State Start */
  const [cells, setCells] = useState(generateCells());
  const [live, setLive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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

  // time
  const [timeStopped, setTimeStopped] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeTick, setTimeTick] = useState(0);
  const [reasonForDeath, setReasonForDeath] = useState('still alive');

  // stats
  const [health, setHealth] = useState(100);
  const [sanity, setSanity] = useState(100);
  const [money, setMoney] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);
  const [maxSanity, setMaxSanity] = useState(100);
  const [healthTick, setHealthTick] = useState(0);
  const [sanityTick, setSanityTick] = useState(0);
  const [moneyTick, setMoneyTick] = useState(0);

  /* State End */

  let player = document.querySelector('.Player');

  // TODO: 
  // move player movement into player movement script 
  // move player anim into player anim script

  useEffect(() => {
    const update = setInterval(() => {
      if (!live) {
        start();
      }

      if (health <= 0 || sanity <= 0) {
        if (health <= 0)
          setReasonForDeath('health');
        if (sanity <= 0)
          setReasonForDeath('sanity');
        handleGameOver();
      } else {
        if (!timeStopped) {
          // decrement health due to aging
          if (healthTick === healthInterval) {
            setHealth(health - 1);
            setHealthTick(0);
          } else {
            setHealthTick(healthTick + 1);
          }

          // decrement sanity due to being trapped at home
          if (sanityTick === sanityInterval) {
            setSanity(sanity - 1);
            setSanityTick(0);
          } else {
            setSanityTick(sanityTick + 1);
          }

          // decrement money due to bills
          if (moneyTick === moneyInterval) {
            setMoney(money - 1);
            setMoneyTick(0);
          } else {
            setMoneyTick(moneyTick + 1);
          }

          // decrement time because ...time
          if (timeTick === timeInterval) {
            setElapsedTime(elapsedTime + 1);
            setTimeTick(0);
          } else {
            setTimeTick(timeTick + 1);
          }
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
            if (nextAction !== 'none' && (playerPos.row === playerTarget.row && playerPos.col === playerTarget.col)) {
              setPendingAction(nextAction);
              setPlayerHasControl(false);
              setDialogBoxActive(true);
            }
          }
        }
      }

    }, updateRate);

    return () => {
      clearInterval(update);
    };
  });

  const yesAction = () => {
    DetermineAction(pendingAction, executeAction);
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

  const handleGameOver = () => {
    setGameOver(true);
    setLive(false);
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

    newCells[playerPos.row][playerPos.col].hasPlayer = true;

    if (player) {
      player.style.setProperty('--top-int', playerPos.row);
      player.style.setProperty('--left-int', playerPos.col);
    }

    setCells(newCells);

    currentCell.hasPlayer = false;
  };

  const changePlayerMoveFrame = () => {
    if (currentPlayerFrame < 3)
      setCurrentPlayerFrame(currentPlayerFrame + 1);
    else
      setCurrentPlayerFrame(0);
  };

  const executeAction = (mods) => {

    // adjust stats
    let newHealth = mods.healthMod;
    if (newHealth > maxHealth - health) {
      newHealth = maxHealth - health;
    }

    let newSanity = mods.sanityMod;
    if (newSanity > maxSanity - sanity) {
      newSanity = maxSanity - sanity;
    }

    setHealth(health + newHealth);
    setSanity(sanity + newSanity);
    setMoney(money + mods.moneyMod);
    setElapsedTime(elapsedTime + mods.timeMod);

    // face the correct direction
    setPlayerFrameLib(c1Frames[mods.directionToFace]);

    // complete action
    noAction();
  };

  const handleCellClick = (rowTarget, colTarget, action) => {
    if (playerHasControl) {
      setPlayerTarget({ row: rowTarget, col: colTarget });
      setNextAction(action);
    }
  };

  const onSaveClick = () => {
    return {
      health,
      sanity,
      money,
      elapsedTime,
      playerPosRow: playerPos.row,
      playerPosCol: playerPos.col,
    };
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
    <section className='GameWindow'>
      <img className='cells' src='images/grid/draft1nogrid.png' alt='background'></img>
      <div className="cells">{renderCells()}</div>
      <Player currentFrame={playerFrameLib[currentPlayerFrame]} />
      <div className='UI'>
        <TimeMeter currentTime={elapsedTime} />
        <MoneyMeter currentMoney={money} />
        <SanityMeter currentSanity={sanity} />
        <HealthMeter currentHealth={health} />
      </div>
      {dialogBoxActive && <DialogBox yesClick={yesAction} noClick={noAction} text={pendingAction} />}
      {gameOver && <GameOverScreen currentTime={elapsedTime} reason={reasonForDeath} />}
    </section>
  );
};

export default GameWindow;