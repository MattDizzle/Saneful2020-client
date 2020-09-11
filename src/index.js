import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './Components/App/App';
import './index.scss';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));