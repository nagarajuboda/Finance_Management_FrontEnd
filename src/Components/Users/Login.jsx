import React from 'react';
import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../../assets/Styles/Login.css'


const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
  };

  return (
    <div className="mainContainer">
        <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* Logo */}
      <img src="src/assets/Images/ArchentsLogo.png" alt="Logo" className="logo" /> 

      <div className="welcomeMessage">
        <div id='welcome'>Welcome back!</div>
        <div className="Text">Please login using your account.</div>
      </div>

      {/* Login form */}
      <div className="loginForm">
        <input type="text" placeholder="Email Address" className="inputField" />
        <input type="password" placeholder="Password" className="inputField" />
        <button onClick={onButtonClick} className="loginButton">
          Login
        </button>
      </div>

      <div className="forgotResetContainer">
        <div className="forgotPassword">Forgot your password?</div>
        <div className="resetLink">Reset here</div>
      </div>


      {/* Conditional rendering based on login status */}
      {loggedIn ? <div>Your email address is {email}</div> : <div />}
    </div>
  );
};

export default Home;
