import React, { useContext } from "react";
import { Switch } from "react-router-dom";
import LeaderBoard from "../../Routes/LeaderBoard";
import Login from "../../Routes/Login";
import MainGame from "../../Routes/MainGame";
import Dashboard from "../../Routes/Dashboard";
import Register from "../../Routes/Register";
import Header from "../../Components/Header";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import UserContext from '../../Context/UserContext';

import "./App.scss";

const App = () => {
  const context = useContext(UserContext);
  return (
    <div className="App">
      {context.startClicked && <Header />}
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
