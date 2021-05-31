import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import logo from '../../navywhitelogo.png';
import AuthApiService from '../../services/auth-service';
import UserContext from '../../Context/UserContext';
import StartCutscene from '../../Components/StartCutscene/StartCutscene';


import './Login.scss';

const Login = (props) => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userContext.setError(null);
    userContext.setStartClicked(false);
  }, []);

  const { values, handleChange, reset } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();

    userContext.setError(null);
    setLoading(true);

    AuthApiService.postLogin({
      user_email: email,
      user_password: password
    })
      .then(res => {
        userContext.processLogin(res.authToken);
        setLoading(false);
        history.push('/dashboard');
      })
      .catch(res => {
        setLoading(false);
        userContext.setError(res.error);
      });

    reset();
  };


  if (userContext.startClicked === true) {
    return (
      <div className="Login">
        <img src={logo} className="logo" alt="logo" />
        {loading ? 'Loading...' : <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            onChange={handleChange}
            value={values.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
            onChange={handleChange}
            value={values.password}
          />
          <button type="submit" className='loginButton'>Log In</button>
          <div role='alert' className='error-message'>
            {userContext.error && <p>{userContext.error}</p>}
          </div>
          <div className='demo-creds'>
            <h4>guest account</h4>
            <p>email: guest@saneful.com</p>
            <p>password: San3fu!!</p>
          </div>
        </form>}

      </div>
    );
  } else {
    return (
      <StartCutscene />
      // <StartCutscene startPressed={startPressed} setStartPressed={setStartPressed} />

    );
  }
};

export default Login;