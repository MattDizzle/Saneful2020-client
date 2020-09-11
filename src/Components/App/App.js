import React from "react";
import { Switch, Route, Link } from "react-router-dom";
// import GameWindow from '../GameWindow/GameWindow';
import LeaderBoard from "../../Routes/LeaderBoard";
import Login from "../../Routes/Login";
import MainGame from "../../Routes/MainGame";
import Dashboard from "../../Routes/Dashboard";
import Register from "../../Routes/Register";
import Header from "../../Components/Header";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicRoute from "../PublicRoute/PublicRoute";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/maingame" component={MainGame} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/leaderBoard" component={LeaderBoard} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
