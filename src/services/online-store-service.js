import config from '../config';
import TokenService from './token-service';

const OnlineStoreService = {
  /**
   * Returns available items for sale from online store
   * @returns {object} online store catalog data object
   */
  getAvailableItems() {
    return fetch(`${config.API_ENDPOINT}/store`)
      .then(res => res.json())
      .then(data => {

      });
  }
};

export default OnlineStoreService;