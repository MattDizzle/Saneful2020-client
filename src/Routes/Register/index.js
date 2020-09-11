import React from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';
import AuthApiService from '../../services/auth-service';

import './Register.scss';

const Register = () => {
  const history = useHistory();
  const { values, handleChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    const { username, email, password, } = values;
    e.preventDefault();
    console.log(
      "username: ",
      username,
      "email: ",
      email,
      "password: ",
      password,
    );

    AuthApiService.postUser({
      user_name: username,
      user_email: email,
      user_password: password
    })
      .then(res => console.log(res));;

    reset();
    history.goBack();
  };

  return (
    <div className="Register">
      <img src={logo} className="logo" alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username..."
          onChange={handleChange}
          value={values.username}
        />
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
        <button type="submit" className='registerButton'>Register</button>
      </form>
    </div>
  );
};

export default Register;