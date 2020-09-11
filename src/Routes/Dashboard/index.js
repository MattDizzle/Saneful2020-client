import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.scss';

const Dashboard = () => {

  return (
    <section className='Dashboard'>
      <p>Dashboard</p>
      <div>
        <Link to='mainGame'>New Game</Link>
      </div>
      <div>
        <Link to='mainGame'>Continue</Link>
      </div>
    </section>
  );
};

export default Dashboard;