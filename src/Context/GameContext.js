import React, { Component } from 'react';
import SaveApiService from '../services/save-service';

const GameContext = React.createContext({
  gameData: {
    current_x_coord: 0,
    current_y_coord: 0,
    money_counter: 0,
    health_points: 0,
    health_points_max: 0,
    sanity_points: 0,
    sanity_points_max: 0,
    dead: false,
    character_skin: 1,
    elapsed_time: 0,
  },
  setGameData: () => { },
  newGame: () => { },
  loadGame: () => { },
  saveGame: () => { },
  currentGameExists: () => { },
});

export default GameContext;

export class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: {
        current_x_coord: 0,
        current_y_coord: 0,
        money_counter: 0,
        health_points: 0,
        health_points_max: 0,
        sanity_points: 0,
        sanity_points_max: 0,
        dead: false,
        character_skin: 1,
        elapsed_time: 0,
      }
    };
  }

  setGameData = (gameData) => {
    this.setState(gameData);
  };

  newGame = async (newGameData = {
    current_x_coord: 0,
    current_y_coord: 2,
    money_counter: 200,
    health_points: 100,
    health_points_max: 100,
    sanity_points: 100,
    sanity_points_max: 100,
    dead: false,
    character_skin: 1, //this will be passed in by a selection by the user when they create a new game
    elapsed_time: 0
  }) => {
    let result;

    try {
      result = await SaveApiService.postNewGameData(newGameData);
    } catch (error) {
      console.error(error);
    }

    this.setGameData(result);
  };

  currentGameExists = async () => {
    let result;

    try {
      result = await SaveApiService.getSaveGameData();
      const currentGame = result.find(game => game.dead === false);

      if (currentGame) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
    }
  };

  loadGame = async () => {
    let result;

    try {
      result = await SaveApiService.getSaveGameData();
      const currentGame = result.find(game => game.dead === false);

      if (currentGame) {
        this.setGameData({ gameData: currentGame });
        console.log('loading current game...');
      }
      else {
        this.newGame();
        console.log('no current game');
      }


      console.log(currentGame);
    } catch (error) {
      console.error(error);
    }

  };

  saveGame = async (gameData) => {

  };

  render() {
    const value = {
      gameData: this.state.gameData,
      setGameData: this.setGameData,
      newGame: this.newGame,
      loadGame: this.loadGame,
      saveGame: this.saveGame,
      currentGameExists: this.currentGameExists
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}