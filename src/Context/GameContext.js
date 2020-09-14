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
    elapsed_time: 0,
  },
  setGameData: () => { },
  newGame: () => { },
  loadGame: () => { },
  saveGame: () => { },
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
        elapsed_time: 0,
      }
    };
  }

  setGameData = (gameData) => {
    this.setState(gameData);
    console.log(gameData);
  };

  newGame = async () => {
    let result;

    try {
      result = await SaveApiService.postNewGameData();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    this.setGameData(result);
  };

  loadGame = async () => {
    let result;

    try {
      result = await SaveApiService.getSaveGameData();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    this.setGameData(result);
  };

  saveGame = async (gameData) => {

  };

  render() {
    const value = {
      gameData: this.state.gameData,
      setGameData: this.setGameData,
      newGame: this.newGame,
      loadGame: this.loadGame,
      saveGame: this.saveGame
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}