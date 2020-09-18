import React, { Component } from 'react';
import TokenService from '../services/token-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  processLogin: () => { },
  processLogout: () => { },
  setStartClicked: () => { },
});

const nullUser = {
  id: null,
  email: null,
  username: null,
};

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    const state = {
      user: nullUser,
      error: null,
      startClicked: true,
    };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        email: jwtPayload.sub,
        username: jwtPayload.user_name,
      };

    this.state = state;
  }

  setError = error => {
    this.setState({ error });
  };

  setStartClicked = clicked => {
    this.setState({ startClicked: clicked });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = user => {
    this.setState({ user });
  };

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    //need to add username
    this.setUser({
      username: jwtPayload.user_name,
      id: jwtPayload.user_id,
      email: jwtPayload.sub
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    this.setUser({});
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      startClicked: this.state.startClicked,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setStartClicked: this.setStartClicked,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }

}