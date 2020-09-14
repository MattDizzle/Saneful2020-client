import config from '../config';
import TokenService from './token-service';


const SaveApiService = {
  /**
   * Returns current save game data for user
   * @returns {object} game data object
   */
  getSaveGameData() {
    return fetch(`${config.API_ENDPOINT}/save`, {
      method: 'GET',
      headers: {
        'athorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  /**
   * Posts new game data to server
   * body:
   * current_x_coord,
   * current_y_coord,
   * money_counter,
   * health_points,
   * health_points_max,
   * sanity_points,
   * sanity_points_max,
   * elapsed_time
   * @param {object} gameData 
   */
  postNewGameData(gameData) {
    return fetch(`${config.API_ENDPOINT}/save`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(gameData),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  }

  // update save
  //  takes save_id param
  //  returns nothing

  // get leaderboard
  //   returns leaderboard
};

export default SaveApiService;