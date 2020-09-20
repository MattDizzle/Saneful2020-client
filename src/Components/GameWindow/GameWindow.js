//SYSTEM
import React, { useState, useEffect, useContext, useRef } from 'react';
import GameContext from '../../Context/GameContext';
//GENERAL
import {
  playerMoveSpeed,
  updateRate,
  healthInterval,
  sanityInterval,
  moneyInterval,
  timeInterval,
  autoSaveInterval
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
import OnlineStoreWindow from '../OnlineStoreWindow';

//CSS
import './GameWindow.scss';

const GameWindow = () => {

  const gameContext = useContext(GameContext);

  const {
    current_x_coord,
    current_y_coord,
    // money_counter,
    // health_points,
    // health_points_max,
    // sanity_points,
    // sanity_points_max,
    // dead,
    // character_skin,
    // elapsed_time,
  } = gameContext;

  /* State Start */
  const [cells, setCells] = useState(generateCells());
  const [live, setLive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // player control
  const [playerHasControl, setPlayerHasControl] = useState(true);

  // player movement
  const [playerPos, setPlayerPos] = useState({ row: (current_y_coord ? current_y_coord : 2), col: (current_x_coord ? current_x_coord : 0) });
  const [playerTarget, setPlayerTarget] = useState({ row: current_y_coord, col: current_x_coord });
  const [playerMoveTick, setPlayerMoveTick] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // player animation
  const [currentPlayerFrame, setCurrentPlayerFrame] = useState(0);
  const [playerFrameLib, setPlayerFrameLib] = useState(c1Frames.right);
  const [playerAnimTick, setPlayerAnimTick] = useState(0);

  // UI
  const [dialogBoxActive, setDialogBoxActive] = useState(false);
  const [onlineStoreWindowActive, setOnlineStoreWindowActive] = useState(false);

  // actions
  const [nextActions, setNextActions] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [nextPromptId, setNextPromptId] = useState(null);
  const [pendingPromptId, setPendingPromptId] = useState(null);

  // time
  const [timeStopped, setTimeStopped] = useState(false);
  const [timeTick, setTimeTick] = useState(0);
  const [autoSaveTick, setAutoSaveTick] = useState(0);
  const [reasonForDeath, setReasonForDeath] = useState('still alive');

  // stats
  const [healthTick, setHealthTick] = useState(0);
  const [sanityTick, setSanityTick] = useState(0);
  const [moneyTick, setMoneyTick] = useState(0);

  const stateService = {
    pendingPromptId,
    nextActions,
    timeStopped,
    setPendingPromptId,
    setDialogBoxActive,
    setOnlineStoreWindowActive,
    setNextActions,
    setPendingActions,
    setPlayerHasControl,
    setTimeStopped
  };

  /* State End */

  let player = document.querySelector('.Player');

  useEffect(() => {
    start();
  }, []
  );

  const start = () => {
    ref1.current.focus(); // auto focus on game window div at game load time so that keyboard movement works immediately
    setLive(true);
    setCurrentPlayerFrame(0);
    setPlayerFrameLib(c1Frames.right);
  };

  useEffect(() => {
    const update = setInterval(() => {

      if (autoSaveTick === autoSaveInterval) {
        saveGame();
      } else {
        setAutoSaveTick(autoSaveTick + 1);
      }

      if (gameContext.health_points <= 0 || gameContext.sanity_points <= 0) {
        if (gameContext.health_points <= 0)
          setReasonForDeath('health');
        if (gameContext.sanity_points <= 0)
          setReasonForDeath('sanity');
        handleGameOver();
      } else {
        // updateGameStateInContext(false);
        if (!timeStopped) {
          // decrement health due to aging
          if (healthTick === healthInterval) {
            gameContext.setHealth(gameContext.health_points - 1);
            // gameContext.setGameData({
            //   health_points: gameContext.gameData.health_points - 1
            // })
            setHealthTick(0);
          } else {
            setHealthTick(healthTick + 1);
          }

          // decrement sanity due to being trapped at home
          if (sanityTick === sanityInterval - Math.floor(gameContext.elapsed_time / 2000)) {
            gameContext.setSanity(gameContext.sanity_points - 1);
            setSanityTick(0);
          } else {
            setSanityTick(sanityTick + 1);
          }

          // decrement money due to bills
          if (moneyTick === moneyInterval) {

            gameContext.setMoney(gameContext.money_counter - 1);
            setMoneyTick(0);
          } else {
            setMoneyTick(moneyTick + 1);
          }

          // decrement time because ...time
          if (timeTick === timeInterval) {
            gameContext.setElapsedTime(gameContext.elapsed_time + 1);
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
            if (nextActions.length > 0 && (playerPos.row === playerTarget.row && playerPos.col === playerTarget.col)) {
              setPendingActions(nextActions);
              setPendingPromptId(nextPromptId);
              setPlayerHasControl(false);
              setDialogBoxActive(true);
              setTimeStopped(true);
            }
          }
        }
      }
    }, updateRate);

    return () => {
      clearInterval(update);
    };
  });

  const handleGameOver = () => {
    if (live) {
      setGameOver(true);
      gameContext.setDead(true);
      saveGame();
      setTimeStopped(true);
      setLive(false);
    }
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

    const newRow = playerPos.row + rowDir;
    const newCol = playerPos.col + colDir;

    setPlayerPos({ row: newRow, col: newCol });
    gameContext.setX(newCol);
    gameContext.setY(newRow);

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

  // const executeAction = (mods) => {

  //   // adjust stats
  //   let newHealth = mods.healthMod;
  //   if (newHealth > maxHealth - health) {
  //     newHealth = maxHealth - health;
  //   }

  //   let newSanity = mods.sanityMod;
  //   if (newSanity > maxSanity - sanity) {
  //     newSanity = maxSanity - sanity;
  //   }

  //   setHealth(health + newHealth);
  //   setSanity(sanity + newSanity);
  //   setMoney(money + mods.moneyMod);
  //   setElapsedTime(elapsedTime + mods.timeMod);

  //   // face the correct direction
  //   setPlayerFrameLib(c1Frames[mods.directionToFace]);

  //   // complete action
  //   noAction();
  // };

  const handleCellClick = (rowTarget, colTarget, actions, promptId) => {
    if (playerHasControl) {
      setPlayerTarget({ row: rowTarget, col: colTarget });
      setNextActions(actions);
      setNextPromptId(promptId);
    }
  };

  // use arrow keys OR awsd to move the character
  const handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        setPlayerTarget({ row: current_y_coord - 1, col: current_x_coord });
        break;
      case 'ArrowDown':
      case 's':
        setPlayerTarget({ row: current_y_coord + 1, col: current_x_coord });
        break;
      case 'ArrowLeft':
      case 'a':
        setPlayerTarget({ row: current_y_coord, col: current_x_coord - 1 });
        break;
      case 'ArrowRight':
      case 'd':
        setPlayerTarget({ row: current_y_coord, col: current_x_coord + 1 });
        break;
      default:
        break;
    }
  };

  const saveGame = () => {
    gameContext.saveGame();
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          class={cell.hasAction ? 'action-cell' : 'cell'}
          key={`${rowIndex}-${colIndex}`}
          walkable={cell.walkable}
          name={cell.name}
          hasPlayer={cell.hasPlayer}
          row={cell.row}
          col={cell.col}
          onClick={handleCellClick}
          hasAction={cell.hasAction}
          actions={cell.actions}
          promptId={cell.promptId}
        />
      ))
    );
  };

  // used in .GameWindow element to autoFocus on the div
  const ref1 = useRef();

  return (
    <section className='GameWindow' onKeyDown={handleKeyDown} tabIndex={0} ref={ref1}>
      <img className='cells' src='images/grid/draft1nogrid.png' alt='background'></img>
      <div className="cells">{renderCells()}</div>
      <Player currentFrame={playerFrameLib[currentPlayerFrame]} />
      <div className='UI'>
        <div className='ui-left'>
          <TimeMeter currentTime={gameContext.elapsed_time} />
        </div>
        <div className='ui-right'>
          <div className='money-save'>
            <MoneyMeter currentMoney={gameContext.money_counter} />
            <button onClick={saveGame}>Save</button>
          </div>
          <SanityMeter currentSanity={gameContext.sanity_points} />
          <HealthMeter currentHealth={gameContext.health_points} />
        </div>
      </div>
      {dialogBoxActive && <DialogBox stateService={stateService} />}
      {onlineStoreWindowActive && <OnlineStoreWindow />}
      {gameOver && <GameOverScreen currentTime={gameContext.elapsed_time} reason={reasonForDeath} />}

    </section>
  );
};

export default GameWindow;