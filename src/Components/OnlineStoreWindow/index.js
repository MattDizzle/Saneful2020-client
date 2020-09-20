import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../../Context/GameContext';
import inventoryService from '../../services/inventory-service';
import storeService from '../../services/store-service';

import './OnlineStoreWindow.scss';

export default function OnlineStoreWindow(props) {
  const context = useContext(GameContext);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState({});

  useEffect(() => {
    sumTotal();
  }, [cart]);

  let availableStoreItems = [
    {
      itemID: 1,
      name: 'Dr.Wiley\'s Self Help Book',
      description: 'A book that will increase the readers max sanity.',
      price: 2000,
      qty: 0
    },
    {
      itemID: 2,
      name: 'Clipp Bar',
      description: 'Tasty snack for people trapped at home.',
      price: 150,
      qty: 0
    }
  ];

  useEffect(() => {
    // availableStoreItems = inventoryService.getAvailableItems();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    // reduce player money by total
    // add all items in cart to player inventory
    // use quantity for each item to know how many to add

    console.log(total);
  };

  const quantityChange = e => {

    const currentItem = getItem(Number(e.target.id));
    const itemName = currentItem.name;

    let newCart = { ...cart };
    newCart[itemName] = {
      itemID: currentItem.itemID,
      name: currentItem.name,
      description: currentItem.description,
      price: currentItem.price,
      qty: e.target.value
    };

    setCart(newCart);
  };

  const sumTotal = () => {
    let newTotal = 0;

    Object.keys(cart).forEach(key => {
      let item = cart[key];
      newTotal += (item.price * item.qty);
    });

    setTotal(newTotal);
  };

  const getItem = (itemID) => {
    return availableStoreItems.find(item => item.itemID === itemID);
  };

  return (
    <div className='online-store-window'>
      <form className='online-store-form' onSubmit={handleSubmit}>
        <div className='online-store-header'>What would you like to buy?</div>
        <ul className='online-store-items-list'>
          {availableStoreItems.map((item, index) => (
            <li className='online-store-item' key={index}>
              <div>
                <span>Item:</span><span>{item.name}</span>
              </div>
              <div>
                <span>Description:</span><span>{item.description}</span>
              </div>
              <div>
                <span>Price:</span><span>{` $${item.price}`}</span>
              </div>
              <div>
                <label htmlFor="qty">Qty: </label>
                <input type="number" className='qty' min="0" id={item.itemID} onChange={e => quantityChange(e)} value={cart[item.name] ? cart[item.name].qty : 0} />
              </div>
            </li>
          ))}
        </ul>
        <div className='online-store-footer'>
          <div>{`Total: $${total}`} </div>
          <input type="submit" value='Place Order' />
        </div>
      </form>
    </div>
  );
}