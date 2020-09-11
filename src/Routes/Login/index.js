import React from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';

import './Login.scss';

const Login = () => {
  const history = useHistory();

  const { values, handleChange, reset } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();
    console.log("email: ", email, "password: ", password);
    reset();
    history.goBack();
  };

  return (
    <div className="Login">
      <img src={logo} className="logo" alt="logo"/>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;