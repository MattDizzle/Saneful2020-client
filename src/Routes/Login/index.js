import React, { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';
import AuthApiService from '../../services/auth-service';
import UserContext from '../../Context/UserContext';

import './Login.scss';

const Login = (props) => {
  const history = useHistory();
  const userContext = useContext(UserContext);

  const { values, handleChange, reset } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();

    userContext.setError(null);

    console.log("email: ", email, "password: ", password);

    AuthApiService.postLogin({
      user_email: email,
      user_password: password
    })
      .then(res => {
        userContext.processLogin(res.authToken);
        history.push('/dashboard');
      })
      .catch(res => {
        userContext.setError(res.error);
      });

    reset();
  };

  return (
    <div className="Login">
      <img src={logo} className="logo" alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          onChange={handleChange}
          value={values.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          onChange={handleChange}
          value={values.password}
        />
        <button type="submit" className='loginButton'>Log In</button>
      </form>
      <div role='alert'>
        {userContext.error && <p>{userContext.error}</p>}
      </div>
    </div>
  );
};

export default Login;