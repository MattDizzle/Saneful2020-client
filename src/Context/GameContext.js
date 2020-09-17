import React, { Component } from 'react';
import SaveApiService from '../services/save-service';

const GameContext = React.createContext({

  gameData: {
    saved_game_id: 0,
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
        saved_game_id: 0,
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
    this.setState({
      gameData: {
        saved_game_id: gameData.saved_game_id,
        current_x_coord: gameData.current_x_coord,
        current_y_coord: gameData.current_y_coord,
        money_counter: gameData.money_counter,
        health_points: gameData.health_points,
        health_points_max: gameData.health_points_max,
        sanity_points: gameData.sanity_points,
        sanity_points_max: gameData.sanity_points_max,
        dead: gameData.dead,
        character_skin: gameData.character_skin,
        elapsed_time: gameData.elapsed_time,
      }
    });
  };

  newGame = async (newGameData = {
    current_x_coord: 0,
    current_y_coord: 2,
    money_counter: 0,
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
        this.setGameData(currentGame);
        console.log('loading current game...', currentGame);
      }
      else {
        this.newGame();
        console.log('no current game');
      }

    } catch (error) {
      console.error(error);
    }

  };

  saveGame = async () => {
    try {
      await SaveApiService.patchGameData(this.state.gameData);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const value = {
      gameData: this.state.gameData,
      setGameData: this.setGameData,
      newGame: this.newGame,
      loadGame: this.loadGame,
      saveGame: this.saveGame,
      currentGameExists: this.currentGameExists,
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}