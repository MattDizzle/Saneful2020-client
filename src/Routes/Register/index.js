import React from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';
import './Register.scss';

const Register = () => {
  const history = useHistory();
  const { values, handleChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
    sprite: ""
  });

  const handleSubmit = (e) => {
    const { username, email, password, sprite } = values;
    e.preventDefault();
    console.log(
      "username: ",
      username,
      "email: ",
      email,
      "password: ",
      password,
      "sprite",
      sprite
    );
    reset();
    history.goBack();
  };

  return (
    <div className="Register">
      <img src={logo} className="logo" alt="logo"/>
      <form onSubmit={handleSubmit}>
        <select name="sprite" onChange={handleChange} value={values.sprite}>
          <option value="c1">c1</option>
          <option value="c2">c2</option>
          <option value="c3">c3</option>
        </select>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;