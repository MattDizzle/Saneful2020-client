import React, { useContext } from 'react';
import GameContext from '../../Context/GameContext';

import './Inventory.scss';

const Inventory = (props) => {
  const context = useContext(GameContext);

  const renderInventory = () => {
    return context.inventory.map(item => {
      return (
        <button>{item.name}</button>
      );
    });
  };



  return (
    <div className='inventory-container'>
      <div className='inventory-header'>
        <p>Inventory</p>
        <button onClick={() => props.handleClose(false)}>x</button>
      </div>
      <ul className='inventory-list'>
        {renderInventory()}
      </ul>
    </div>
  );
};

export default Inventory;