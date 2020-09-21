import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';
import AuthApiService from '../../services/auth-service';
import UserContext from "../../Context/UserContext";

import './Register.scss';


const Register = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [passwordIn, setPasswordIn] = useState(false);

  useEffect(() => {
    userContext.setError(null);
  }, []);

  const { values, handleChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    const { username, email, password, confirmPassword } = values;
    e.preventDefault();

    if (password === confirmPassword) {
      setLoading(true);

      AuthApiService.postUser({
        user_name: username,
        user_email: email,
        user_password: password
      })
        .then(user => {
          setLoading(false);
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
        })
        .catch(res => {
          setLoading(false);
          userContext.setError(res.error);
        });

      reset();
    } else {
      userContext.setError('passwords do not match');
    }
  };

  const active = (e) => {
    let passEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (!passEx.test(e.target.value)) {
      userContext.setError('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
      setPasswordIn(false);
    } else {
      setPasswordIn(true);
    }
  };

  return (

    <div className="Register">
      <img src={logo} className="logo" alt="logo" />
      {loading ? 'Loading...' : <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
          value={values.username}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={values.email}
        />
        <input
          onKeyUp={e => active(e)}
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={values.password}
        />
        {passwordIn && <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleChange}
          value={values.confirmPassword}
        />}
        {passwordIn && <button type="submit" className='registerButton'>Register</button>}
      </form>}
      <div role='alert' className='error-message'>
        {userContext.error && <p>{userContext.error}</p>}
      </div>
    </div>
  );
};

export default Register;