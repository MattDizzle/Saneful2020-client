import React, { Component } from 'react';

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
  setGameData: () => { }
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

  render() {
    const value = {
      gameData: this.state.gameData,
      setGameData: this.setGameData,
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}