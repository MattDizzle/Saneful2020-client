import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';
import AuthApiService from '../../services/auth-service';

import './Register.scss';
import UserContext from "../../Context/UserContext";

const Register = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userContext.setError(null);
  }, []);

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

    setLoading(true);

    AuthApiService.postUser({
      user_name: username,
      user_email: email,
      user_password: password
    })
      .then(user => {
        // console.log(user);
        setLoading(false);
        AuthApiService.postLogin({
          user_email: email,
          user_password: password
        })
          .then(res => {
            console.log(res);
            userContext.processLogin(res.authToken);
            history.push('/dashboard');
          })
          .catch(res => {
            userContext.setError(res.error);
          });
      })
      .catch(res => {
        setLoading(false);
        userContext.setError(res.error);
      });

    reset();
  };

  return (
    <div className="Register">
      <img src={logo} className="logo" alt="logo" />
      {loading ? 'Loading...' : <form onSubmit={handleSubmit}>
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
      </form>}
      <div role='alert' className='error-message'>
        {userContext.error && <p>{userContext.error}</p>}
      </div>
    </div>
  );
};

export default Register;