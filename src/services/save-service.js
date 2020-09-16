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
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
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
   * dead,
   * character_skin,
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
  },

  /**
   * Patches existing game data to server
   * body:
   * save_id,
   * current_x_coord,
   * current_y_coord,
   * money_counter,
   * health_points,
   * health_points_max,
   * sanity_points,
   * sanity_points_max,
   * dead,
   * character_skin,
   * elapsed_time
   * @param {object} gameData 
   */
  patchGameData(gameData) {
    return fetch(`${config.API_ENDPOINT}/save/${gameData.saved_game_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(gameData),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : 'received'
      );
  },

  /**
   * Returns leaderboard
   * @returns {object} game data object
   */
  getLeaderboard() {
    return fetch(`${config.API_ENDPOINT}/save/leaderboard`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
};

export default SaveApiService;