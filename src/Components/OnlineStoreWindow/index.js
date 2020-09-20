import React, { useContext, useEffect } from 'react';
import GameContext from '../../Context/GameContext';
import inventoryService from '../../services/inventory-service';
import storeService from '../../services/store-service';

import './OnlineStoreWindow.scss';

export default function OnlineStoreWindow (props) {
  const context = useContext(GameContext);

  let availableStoreItems;

  useEffect(() => {
    availableStoreItems = inventoryService.getAvailableItems();
  }, []);

  const handleSubmit = e => {
    
  }

  return (
    <form className='online-store-window' onSubmit={handleSubmit}>
      <div>What would you like to buy?</div>
      <ul>
        {availableStoreItems.map(item => (
          <li>
            <div>
              <span>Item:</span><span>{item.name}</span>
            </div>
            <div>
              <span>Description:</span><span>{item.description}</span>
            </div>
            <div>
              <span>Price:</span><span>{item.price}</span>
            </div>
            <div>
              <label htmlFor="qty">Qty: </label>
              <input type="number" id="qty"></input>
            </div>
          </li>
        ))}
      </ul>
      <div>Total: </div>
      <input type="submit">Place Order</input>
    </form>
  )
}