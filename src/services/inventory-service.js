import config from '../config';
import TokenService from './token-service';

const InventoryService = {
  /**
   * Returns inventory data for user
   * @returns {object} inventory data object
   */
  getUsersItems() {
    return fetch(`${config.API_ENDPOINT}/inventory`)
      .then(res => res.json())
        .then(data => {
          
        })
  }
}