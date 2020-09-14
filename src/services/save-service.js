import config from '../config';
import TokenService from './token-service';

const SaveApiService = {
  // get save
  //  returns saved game data
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
  }

  // post new save
  //  takes body: {
  //     current_x_coord,
  //     current_y_coord,
  //     money_counter,
  //     health_points,
  //     health_points_max,
  //     sanity_points,
  //     sanity_points_max,
  //     elapsed_time,
  //   }
  //  returns save game obj


  // update save
  //  takes save_id param
  //  returns nothing

  // get leaderboard
  //   returns leaderboard
};